import type { FileDescriptor, FileSource } from '@web-file-reader/core';
import { describe, expect, it } from 'vitest';
import { descriptor } from './index';

const source: FileSource = { kind: 'text', text: '' };

const fileWith = (overrides: Partial<FileDescriptor>): FileDescriptor => ({
  id: 'f',
  name: 'book',
  source,
  ...overrides,
});

describe('descriptor', () => {
  it('exposes the expected identity', () => {
    expect(descriptor.id).toBe('fb2');
    expect(descriptor.name).toBe('FictionBook');
    expect(descriptor.priority).toBe(1);
  });

  const cases: readonly { readonly file: FileDescriptor; readonly expected: boolean }[] = [
    { file: fileWith({ name: 'book.fb2' }), expected: true },
    { file: fileWith({ extension: 'FB2' }), expected: true },
    { file: fileWith({ mimeType: 'application/x-fictionbook+xml' }), expected: true },
    { file: fileWith({ name: 'book.epub' }), expected: false },
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
