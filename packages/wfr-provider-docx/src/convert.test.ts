import { describe, expect, it } from 'vitest';
import { documentXmlToHtml } from './convert';

const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

const doc = (body: string): string =>
  `<?xml version="1.0"?><w:document xmlns:w="${W_NS}"><w:body>${body}</w:body></w:document>`;

describe('documentXmlToHtml', () => {
  it('maps heading styles to heading tags', () => {
    const html = documentXmlToHtml(
      doc('<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Title</w:t></w:r></w:p>'),
    );
    expect(html).toBe('<h1>Title</h1>');
  });

  it('renders bold and italic runs', () => {
    const html = documentXmlToHtml(
      doc(
        '<w:p><w:r><w:t>plain </w:t></w:r>' +
          '<w:r><w:rPr><w:b/></w:rPr><w:t>bold</w:t></w:r>' +
          '<w:r><w:t> </w:t></w:r>' +
          '<w:r><w:rPr><w:i/></w:rPr><w:t>italic</w:t></w:r></w:p>',
      ),
    );
    expect(html).toBe('<p>plain <strong>bold</strong> <em>italic</em></p>');
  });

  it('escapes text content', () => {
    const html = documentXmlToHtml(doc('<w:p><w:r><w:t>a &lt; b</w:t></w:r></w:p>'));
    expect(html).toBe('<p>a &lt; b</p>');
  });

  it('renders a simple table', () => {
    const html = documentXmlToHtml(
      doc(
        '<w:tbl><w:tr><w:tc><w:p><w:r><w:t>A</w:t></w:r></w:p></w:tc>' +
          '<w:tc><w:p><w:r><w:t>B</w:t></w:r></w:p></w:tc></w:tr></w:tbl>',
      ),
    );
    expect(html).toBe('<table><tr><td><p>A</p></td><td><p>B</p></td></tr></table>');
  });

  it('throws without a body', () => {
    expect(() => documentXmlToHtml('<x/>')).toThrow();
  });
});
