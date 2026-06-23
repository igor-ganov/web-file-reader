import { describe, expect, it } from 'vitest';
import { fb2ToPages } from './convert';

const FB2_NS = 'http://www.gribuser.ru/xml/fictionbook/2.0';

const book = (body: string): string =>
  `<?xml version="1.0" encoding="UTF-8"?><FictionBook xmlns="${FB2_NS}">${body}</FictionBook>`;

describe('fb2ToPages', () => {
  it('produces one page per top-level section', () => {
    const pages = fb2ToPages(
      book(
        '<body>' +
          '<section><title><p>Chapter One</p></title><p>Hello <emphasis>world</emphasis>.</p></section>' +
          '<section><title><p>Chapter Two</p></title><p>Second.</p></section>' +
          '</body>',
      ),
    );
    expect(pages).toHaveLength(2);
    expect(pages[0]?.label).toBe('Chapter One');
    expect(pages[0]?.html).toContain('<em>world</em>');
    expect(pages[1]?.label).toBe('Chapter Two');
  });

  it('falls back to a single page when there are no sections', () => {
    const pages = fb2ToPages(book('<body><p>Just text.</p></body>'));
    expect(pages).toHaveLength(1);
    expect(pages[0]?.html).toContain('<p>Just text.</p>');
  });

  it('prefers the non-notes body', () => {
    const pages = fb2ToPages(
      book(
        '<body><section><p>Main</p></section></body>' +
          '<body name="notes"><section><p>Note</p></section></body>',
      ),
    );
    expect(pages).toHaveLength(1);
    expect(pages[0]?.html).toContain('Main');
  });

  it('escapes text content', () => {
    const pages = fb2ToPages(book('<body><p>a &lt; b &amp; c</p></body>'));
    expect(pages[0]?.html).toContain('a &lt; b &amp; c');
  });

  it('rejects a non-FictionBook root', () => {
    expect(() => fb2ToPages('<html><body/></html>')).toThrow();
  });
});
