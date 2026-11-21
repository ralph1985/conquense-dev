const sensitivePackages = new Set([
  '@vercel/analytics',
  'nodemailer',
  'typescript',
]);

const allowedFiles = new Set(['package.json', 'pnpm-lock.yaml']);

export function evaluateDependabotAutomerge(input) {
  const deny = (reason) => ({ eligible: false, reason });

  if (input.author !== 'dependabot[bot]') return deny('PR author is not Dependabot');
  if (input.packageEcosystem !== 'npm') return deny('Only npm dependency PRs are eligible');
  if (input.dependencyGroup) return deny('Grouped dependency PRs require manual review');
  if (!Array.isArray(input.files) || input.files.length === 0) return deny('Changed files are unavailable');
  if (!input.files.every((file) => allowedFiles.has(file))) {
    return deny('PR changes files outside package.json and pnpm-lock.yaml');
  }

  const name = input.dependencyNames?.trim();
  if (!name || name.includes(',')) return deny('Expected exactly one dependency');
  if (sensitivePackages.has(name) || name.startsWith('@astrojs/') || name === 'astro') {
    return deny(`Sensitive dependency requires manual review: ${name}`);
  }

  const updateType = input.updateType;
  if (
    updateType === 'version-update:semver-patch'
    && ['direct:production', 'direct:development'].includes(input.dependencyType)
  ) {
    return { eligible: true, reason: 'Patch update passed policy' };
  }
  if (
    updateType === 'version-update:semver-minor'
    && input.dependencyType === 'direct:development'
  ) {
    return { eligible: true, reason: 'Development minor update passed policy' };
  }
  if (updateType === 'version-update:semver-major') {
    return deny('Major updates always require manual review');
  }
  if (updateType === 'version-update:semver-minor') {
    return deny('Production or indirect minor updates require manual review');
  }

  return deny('Missing or unsupported Dependabot update metadata');
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
