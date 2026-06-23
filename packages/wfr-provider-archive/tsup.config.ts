import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/lazy.ts'],
  format: ['esm'],
  target: 'es2023',
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  splitting: true,
  external: ['@web-file-reader/core'],
});
