import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * Flat config.
 *
 * eslint-config-next v16 ships native flat config, so these are imported
 * directly rather than wrapped in FlatCompat — the compat shim chokes on the
 * plugin's circular references.
 *
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
];

export default config;
