import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateDependabotAutomerge } from './dependabot-automerge-policy.mjs';

function candidate(overrides = {}) {
  return {
    author: 'dependabot[bot]',
    packageEcosystem: 'npm',
    dependencyGroup: '',
    dependencyNames: 'postcss',
    dependencyType: 'direct:development',
    updateType: 'version-update:semver-patch',
    files: ['package.json', 'pnpm-lock.yaml'],
    ...overrides,
  };
}

test('admite un patch con todos los controles estructurales', () => {
  assert.equal(evaluateDependabotAutomerge(candidate()).eligible, true);
  assert.equal(evaluateDependabotAutomerge(candidate({
    dependencyType: 'direct:production',
  })).eligible, true);
});

test('admite un minor de desarrollo', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({
    updateType: 'version-update:semver-minor',
  })).eligible, true);
});

test('mantiene major y minor de producción en revisión manual', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({
    updateType: 'version-update:semver-major',
  })).eligible, false);
  assert.equal(evaluateDependabotAutomerge(candidate({
    updateType: 'version-update:semver-minor',
    dependencyType: 'direct:production',
  })).eligible, false);
});

test('bloquea PR agrupadas incluso si el tipo agregado parece permitido', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({
    dependencyGroup: 'development-minor-and-patch',
    dependencyNames: 'postcss, astro',
  })).eligible, false);
});

test('bloquea cambios fuera de manifiesto y lockfile', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({
    files: ['package.json', 'pnpm-lock.yaml', '.github/workflows/security-checks.yml'],
  })).eligible, false);
});

test('bloquea cambios de autor ajeno a Dependabot', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({ author: 'contributor' })).eligible, false);
});

test('bloquea dependencias sensibles independientemente del semver', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({ dependencyNames: 'astro' })).eligible, false);
  assert.equal(evaluateDependabotAutomerge(candidate({ dependencyNames: 'nodemailer' })).eligible, false);
});

test('bloquea metadatos ausentes o tipos de actualización desconocidos', () => {
  assert.equal(evaluateDependabotAutomerge(candidate({ updateType: '' })).eligible, false);
  assert.equal(evaluateDependabotAutomerge(candidate({ dependencyType: 'indirect' })).eligible, false);
});
