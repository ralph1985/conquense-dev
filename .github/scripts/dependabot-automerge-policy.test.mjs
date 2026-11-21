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

const accepted = (input) => assert.equal(evaluateDependabotAutomerge(input).eligible, true);
const rejected = (input) => assert.equal(evaluateDependabotAutomerge(input).eligible, false);

test('admite patch, minor y major en producción, desarrollo e indirectas', () => {
  for (const updateType of [
    'version-update:semver-patch',
    'version-update:semver-minor',
    'version-update:semver-major',
  ]) {
    for (const dependencyType of ['direct:production', 'direct:development', 'indirect']) {
      accepted(npmCandidate({ updatedDependencies: [npmUpdate({ updateType, dependencyType })] }));
    }
  }
});

test('admite grupos si cada actualización tiene metadatos válidos, incluso con major', () => {
  const dependencyGroup = 'all-dependencies';
  accepted(npmCandidate({
    dependencyGroup,
    dependencyNames: 'astro, postcss',
    updatedDependencies: [
      npmUpdate({ dependencyName: 'astro', dependencyType: 'direct:development', updateType: 'version-update:semver-major', dependencyGroup }),
      npmUpdate({ dependencyName: 'postcss', dependencyType: 'indirect', updateType: 'version-update:semver-patch', dependencyGroup }),
    ],
  }));
});

test('admite actualizaciones de seguridad, incluidas las críticas, si los checks pasan', () => {
  accepted(npmCandidate({ updatedDependencies: [npmUpdate({
    updateType: 'version-update:semver-major',
    alertState: 'OPEN',
    ghsaId: 'GHSA-test-test-test',
    cvss: 10,
  })] }));
});

test('admite dependencias sensibles bajo la política de automatización ampliada', () => {
  accepted(npmCandidate({ updatedDependencies: [npmUpdate({ dependencyName: 'nodemailer' })] }));
});

test('admite actualizaciones de GitHub Actions limitadas a referencias uses del workflow', () => {
  const input = {
    author: 'dependabot[bot]',
    baseRef: 'main',
    packageEcosystem: 'github_actions',
    dependencyNames: 'actions/checkout',
    dependencyGroup: '',
    updatedDependencies: [{
      dependencyName: 'actions/checkout',
      dependencyType: 'indirect',
      updateType: 'version-update:semver-major',
      packageEcosystem: 'github_actions',
      targetBranch: 'main',
      dependencyGroup: '',
    }],
    files: [{
      filename: '.github/workflows/ci.yml',
      patch: [
        '@@ -1 +1 @@',
        '-        uses: actions/checkout@old-sha # v5',
        '+        uses: actions/checkout@new-sha # v6',
      ].join('\n'),
    }],
  };
  accepted(input);
  accepted({ ...input, files: [{ ...input.files[0], filename: '.github/actions/release/action.yml' }] });
});

test('bloquea cambios de workflow ajenos a la actualización de Actions', () => {
  const input = {
    author: 'dependabot[bot]',
    baseRef: 'main',
    packageEcosystem: 'github_actions',
    dependencyNames: 'actions/checkout',
    dependencyGroup: '',
    updatedDependencies: [{
      dependencyName: 'actions/checkout',
      dependencyType: 'direct:production',
      updateType: 'version-update:semver-patch',
      packageEcosystem: 'github_actions',
      targetBranch: 'main',
      dependencyGroup: '',
    }],
    files: [{
      filename: '.github/workflows/ci.yml',
      patch: '-        run: echo old\n+        run: echo changed',
    }],
  };
  rejected(input);
  rejected({ ...input, files: [{ ...input.files[0], patch: '-        uses: actions/checkout@old\n+        uses: evil/action@new' }] });
});

test('rechaza autor ajeno, rama destino incorrecta y archivos npm ajenos', () => {
  rejected(npmCandidate({ author: 'contributor' }));
  rejected(npmCandidate({ baseRef: 'develop' }));
  rejected(npmCandidate({ files: [{ filename: '.github/workflows/ci.yml', patch: '' }] }));
});

test('rechaza metadatos ausentes, desconocidos o inconsistentes en grupos', () => {
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
