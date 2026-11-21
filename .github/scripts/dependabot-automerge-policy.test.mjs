import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateDependabotAutomerge } from './dependabot-automerge-policy.mjs';

const npmUpdate = (overrides = {}) => ({
  dependencyName: 'postcss',
  dependencyType: 'direct:development',
  updateType: 'version-update:semver-patch',
  packageEcosystem: 'npm_and_yarn',
  targetBranch: 'main',
  dependencyGroup: '',
  ...overrides,
});

function npmCandidate(overrides = {}) {
  const updates = overrides.updatedDependencies ?? [npmUpdate()];
  return {
    author: 'dependabot[bot]',
    baseRef: 'main',
    packageEcosystem: 'npm_and_yarn',
    dependencyNames: updates.map(({ dependencyName }) => dependencyName).join(', '),
    dependencyGroup: updates[0]?.dependencyGroup ?? '',
    updatedDependencies: updates,
    files: [
      { filename: 'package.json', patch: '@@ dependency update @@' },
      { filename: 'pnpm-lock.yaml', patch: '@@ lockfile update @@' },
    ],
    ...overrides,
  };
}

const actionUpdate = (overrides = {}) => ({
  dependencyName: 'actions/checkout',
  dependencyType: 'indirect',
  updateType: 'version-update:semver-patch',
  packageEcosystem: 'github_actions',
  targetBranch: 'main',
  dependencyGroup: '',
  ...overrides,
});

function actionsCandidate(updates = [actionUpdate()]) {
  const group = updates[0]?.dependencyGroup ?? '';
  const patch = updates.flatMap(({ dependencyName }) => [
    `-        uses: ${dependencyName}@old-sha`,
    `+        uses: ${dependencyName}@new-sha`,
  ]).join('\n');
  return {
    author: 'dependabot[bot]',
    baseRef: 'main',
    packageEcosystem: 'github_actions',
    dependencyNames: updates.map(({ dependencyName }) => dependencyName).join(', '),
    dependencyGroup: group,
    updatedDependencies: updates,
    files: [{ filename: '.github/workflows/ci.yml', patch }],
  };
}

const accepted = (input) => assert.equal(evaluateDependabotAutomerge(input).eligible, true);
const rejected = (input) => assert.equal(evaluateDependabotAutomerge(input).eligible, false);

test('admite patch y minor en producción, desarrollo e indirectas de npm', () => {
  for (const updateType of ['version-update:semver-patch', 'version-update:semver-minor']) {
    for (const dependencyType of ['direct:production', 'direct:development', 'indirect']) {
      accepted(npmCandidate({ updatedDependencies: [npmUpdate({ updateType, dependencyType })] }));
    }
  }
});

test('rechaza cualquier major individual, también si es una actualización de seguridad', () => {
  for (const dependencyType of ['direct:production', 'direct:development', 'indirect']) {
    rejected(npmCandidate({ updatedDependencies: [npmUpdate({
      dependencyType,
      updateType: 'version-update:semver-major',
      alertState: 'OPEN',
      ghsaId: 'GHSA-test-test-test',
      cvss: 10,
    })] }));
  }
});

test('admite grupos patch/minor y bloquea el grupo entero si contiene un major', () => {
  const dependencyGroup = 'all-dependencies';
  const patch = npmUpdate({ dependencyName: 'postcss', dependencyGroup });
  const minor = npmUpdate({
    dependencyName: 'astro',
    dependencyType: 'direct:production',
    updateType: 'version-update:semver-minor',
    dependencyGroup,
  });
  accepted(npmCandidate({ updatedDependencies: [patch, minor] }));

  const major = npmUpdate({
    dependencyName: 'typescript',
    updateType: 'version-update:semver-major',
    alertState: 'OPEN',
    cvss: 10,
    dependencyGroup,
  });
  rejected(npmCandidate({ updatedDependencies: [patch, major] }));
});

test('admite patch y minor de GitHub Actions, también agrupadas', () => {
  for (const updateType of ['version-update:semver-patch', 'version-update:semver-minor']) {
    for (const dependencyType of ['direct:production', 'direct:development', 'indirect']) {
      accepted(actionsCandidate([actionUpdate({ updateType, dependencyType })]));
    }
  }

  const dependencyGroup = 'workflow-actions';
  accepted(actionsCandidate([
    actionUpdate({ dependencyGroup }),
    actionUpdate({
      dependencyName: 'actions/setup-node',
      updateType: 'version-update:semver-minor',
      dependencyGroup,
    }),
  ]));
});

test('rechaza majors de GitHub Actions, individuales o agrupadas con security metadata', () => {
  rejected(actionsCandidate([actionUpdate({
    updateType: 'version-update:semver-major',
    alertState: 'OPEN',
    cvss: 10,
  })]));

  const dependencyGroup = 'workflow-actions';
  rejected(actionsCandidate([
    actionUpdate({ dependencyGroup }),
    actionUpdate({
      dependencyName: 'actions/setup-node',
      updateType: 'version-update:semver-major',
      alertState: 'OPEN',
      cvss: 10,
      dependencyGroup,
    }),
  ]));
});

test('admite dependencias sensibles para patch/minor bajo la política ampliada', () => {
  accepted(npmCandidate({ updatedDependencies: [npmUpdate({ dependencyName: 'nodemailer' })] }));
});

test('bloquea cambios de workflow ajenos a la actualización de Actions', () => {
  const input = actionsCandidate();
  rejected({ ...input, files: [{ ...input.files[0], patch: '-        run: echo old\n+        run: echo changed' }] });
  rejected({ ...input, files: [{ ...input.files[0], patch: '-        uses: actions/checkout@old\n+        uses: evil/action@new' }] });
});

test('rechaza autor ajeno, rama destino incorrecta y archivos npm ajenos', () => {
  rejected(npmCandidate({ author: 'contributor' }));
  rejected(npmCandidate({ baseRef: 'develop' }));
  rejected(npmCandidate({ files: [{ filename: '.github/workflows/ci.yml', patch: '' }] }));
});

test('rechaza metadata ausente, desconocida o inconsistente en grupos', () => {
  rejected(npmCandidate({ updatedDependencies: [] }));
  rejected(npmCandidate({ updatedDependencies: [npmUpdate({ updateType: 'unknown' })] }));
  rejected(npmCandidate({ updatedDependencies: [npmUpdate({ targetBranch: 'develop' })] }));
  rejected(npmCandidate({
    dependencyGroup: 'all-dependencies',
    updatedDependencies: [npmUpdate({ dependencyGroup: '' })],
  }));
  rejected(npmCandidate({
    dependencyNames: 'postcss, astro',
    updatedDependencies: [npmUpdate()],
  }));
});
