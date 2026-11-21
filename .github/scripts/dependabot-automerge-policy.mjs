const updateTypes = new Set([
  'version-update:semver-patch',
  'version-update:semver-minor',
]);

const ecosystems = {
  npm: new Set(['npm_and_yarn', 'npm']),
  'github-actions': new Set(['github_actions', 'github-actions']),
};

const npmFiles = new Set(['package.json', 'pnpm-lock.yaml']);
const actionReferenceChange = /^[+-]\s*uses:\s*([^\s]+)(?:\s+#.*)?$/;

function parseUpdates(input) {
  let updates = input.updatedDependencies;
  if (typeof updates === 'string') {
    try {
      updates = JSON.parse(updates);
    } catch {
      return null;
    }
  }
  return Array.isArray(updates) ? updates : null;
}

function namesMatch(inputNames, updates) {
  if (typeof inputNames !== 'string' || !inputNames.trim()) return false;
  const expected = inputNames.split(',').map((name) => name.trim()).sort();
  const actual = updates.map((update) => update.dependencyName).sort();
  return expected.length === actual.length && expected.every((name, index) => name === actual[index]);
}

function validActionWorkflowChanges(files, updates) {
  const actionFile = (filename) => (
    /^\.github\/workflows\/[^/]+\.ya?ml$/.test(filename)
    || /^\.github\/actions\/.+\/action\.ya?ml$/.test(filename)
    || /^action\.ya?ml$/.test(filename)
  );
  if (!files.every((file) => actionFile(file.filename))) return false;

  const updateNames = new Set(updates.map((update) => update.dependencyName.toLowerCase()));
  let changedReferences = 0;

  for (const file of files) {
    if (typeof file.patch !== 'string') return false;
    for (const line of file.patch.split('\n')) {
      if (!line.startsWith('+') && !line.startsWith('-')) continue;
      if (line.startsWith('+++') || line.startsWith('---')) continue;
      const match = line.match(actionReferenceChange);
      if (!match) return false;
      const reference = match[1];
      const separator = reference.lastIndexOf('@');
      if (separator < 1) return false;
      const actionName = reference.slice(0, separator).toLowerCase();
      if (!updateNames.has(actionName)) return false;
      changedReferences += 1;
    }
  }

  return changedReferences > 0;
}

export function evaluateDependabotAutomerge(input) {
  const deny = (reason) => ({ eligible: false, reason });

  if (input.author !== 'dependabot[bot]') return deny('PR author is not Dependabot');
  if (input.baseRef !== 'main') return deny('Dependabot PRs must target main');
  if (!Array.isArray(input.files) || input.files.length === 0) return deny('Changed files are unavailable');

  const ecosystemKind = Object.entries(ecosystems)
    .find(([, aliases]) => aliases.has(input.packageEcosystem))?.[0];
  if (!ecosystemKind) return deny('Unsupported Dependabot ecosystem');

  const updates = parseUpdates(input);
  if (!updates?.length || !namesMatch(input.dependencyNames, updates)) {
    return deny('Dependabot update metadata is missing or inconsistent');
  }

  for (const update of updates) {
    if (!update || !update.dependencyName || !updateTypes.has(update.updateType)) {
      return deny('Only patch and minor updates are eligible; majors require manual review');
    }
    if (!ecosystems[ecosystemKind].has(update.packageEcosystem)) {
      return deny('Update ecosystem metadata is inconsistent');
    }
    if (update.targetBranch !== 'main') return deny('Every update must target main');
    if (!['direct:production', 'direct:development', 'indirect'].includes(update.dependencyType)) {
      return deny('Dependency type metadata is missing or unsupported');
    }
    if ((update.dependencyGroup ?? '') !== (input.dependencyGroup ?? '')) {
      return deny('Dependency group metadata is inconsistent');
    }
  }

  if (ecosystemKind === 'npm') {
    if (!input.files.every((file) => npmFiles.has(file.filename))) {
      return deny('npm PRs may only change package.json and pnpm-lock.yaml');
    }
  } else if (!validActionWorkflowChanges(input.files, updates)) {
    return deny('GitHub Actions PRs may only change matching uses references in workflow files');
  }

  return {
    eligible: true,
    reason: `All ${updates.length} ${updates.length === 1 ? 'update' : 'updates'} passed policy`,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let input;
  try {
    input = JSON.parse(process.env.AUTOMERGE_POLICY_INPUT ?? '');
  } catch {
    console.error('Invalid policy input JSON');
    process.exit(2);
  }

  const result = evaluateDependabotAutomerge(input);
  console.log(`${result.eligible ? 'ELIGIBLE' : 'MANUAL REVIEW'}: ${result.reason}`);
  if (!result.eligible) process.exit(1);
}
