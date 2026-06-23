import type { FileDescriptor, FileSource } from '@web-file-reader/core';
import { describe, expect, it } from 'vitest';
import { descriptor } from './index';

const source: FileSource = { kind: 'text', text: '' };

const fileWith = (overrides: Partial<FileDescriptor>): FileDescriptor => ({
  id: 'f',
  name: 'doc',
  source,
  ...overrides,
});

const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

describe('descriptor', () => {
  it('exposes the expected identity', () => {
    expect(descriptor.id).toBe('docx');
    expect(descriptor.name).toBe('Word');
    expect(descriptor.priority).toBe(1);
  });

  const cases: readonly { readonly file: FileDescriptor; readonly expected: boolean }[] = [
    { file: fileWith({ name: 'report.docx' }), expected: true },
    { file: fileWith({ extension: 'DOCX' }), expected: true },
    { file: fileWith({ mimeType: DOCX_MIME }), expected: true },
    { file: fileWith({ name: 'old.doc' }), expected: false },
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
