import { describe, expect, it } from 'vitest';
import { buildListingHtml, formatBytes, type ArchiveEntry } from './build-listing';

describe('formatBytes', () => {
  it.each([
    [0, '0 B'],
    [512, '512 B'],
    [1024, '1.0 KB'],
    [1536, '1.5 KB'],
    [1048576, '1.0 MB'],
  ])('formatBytes(%i) → %s', (bytes, expected) => {
    expect(formatBytes(bytes)).toBe(expected);
  });
});

describe('buildListingHtml', () => {
  const entries: readonly ArchiveEntry[] = [
    { name: 'b.txt', size: 2048 },
    { name: 'a.txt', size: 100 },
  ];

  it('renders a row per entry with an accessible header', () => {
    const html = buildListingHtml(entries);
    expect(html).toContain('<th scope="col">Name</th>');
    expect(html).toContain('a.txt');
    expect(html).toContain('b.txt');
    expect(html).toContain('2 entries');
  });

  it('sorts by name by default', () => {
    const html = buildListingHtml(entries, 'name');
    expect(html.indexOf('a.txt')).toBeLessThan(html.indexOf('b.txt'));
  });

  it('sorts by size descending when requested', () => {
    const html = buildListingHtml(entries, 'size');
    expect(html.indexOf('b.txt')).toBeLessThan(html.indexOf('a.txt'));
  });

  it('escapes entry names', () => {
    const html = buildListingHtml([{ name: '<script>.js', size: 1 }]);
    expect(html).toContain('&lt;script&gt;.js');
    expect(html).not.toContain('<script>.js');
  });
});
