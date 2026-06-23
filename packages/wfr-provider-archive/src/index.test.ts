import type { FileDescriptor, FileSource } from '@web-file-reader/core';
import { describe, expect, it } from 'vitest';
import { descriptor } from './index';

const source: FileSource = { kind: 'text', text: '' };

const fileWith = (overrides: Partial<FileDescriptor>): FileDescriptor => ({
  id: 'f',
  name: 'archive',
  source,
  ...overrides,
});

describe('descriptor', () => {
  it('exposes the expected identity', () => {
    expect(descriptor.id).toBe('archive');
    expect(descriptor.name).toBe('Archive');
    expect(descriptor.priority).toBe(1);
  });

  const cases: readonly { readonly file: FileDescriptor; readonly expected: boolean }[] = [
    { file: fileWith({ name: 'bundle.zip' }), expected: true },
    { file: fileWith({ extension: 'ZIP' }), expected: true },
    { file: fileWith({ mimeType: 'application/zip' }), expected: true },
    { file: fileWith({ name: 'a.tar' }), expected: false },
    { file: fileWith({ name: 'a.txt' }), expected: false },
  ];

  it.each(cases)('canHandle($file.name) → $expected', ({ file, expected }) => {
    expect(descriptor.canHandle(file)).toBe(expected);
  });

  it('load() resolves the lazy module', async () => {
    const resolved = await descriptor.load();
    expect(typeof resolved.render).toBe('function');
    expect(resolved.settingsSchema.length).toBeGreaterThan(0);
  });
});
