const cheerio = require('cheerio');
const he = require('he');
const Prism = require('prismjs');

function id(a) {
  return a;
}

function highlightCode(code, lang) {
  return Prism.highlight(code, Prism.languages[lang]);
}

// We can't use an arrow function here because
// "this.cacheable();" won't work correctly
// eslint-disable-next-line func-names
module.exports = function(input = '') {
  this.cacheable();

  const $ = cheerio.load(input, {
    decodeEntities: false
  });

  $('pre').replaceWith((index, elem) => {
    const elemjQuery = $(elem);
    const text = elemjQuery.text();

    if (text.split('\n').length < 2) {
      return $(`<code>${he.encode(text)}</code>`);
    }

    const codeElem = elemjQuery.find('code').eq(0);
    const lang = codeElem
      .attr('class')
      .split('lang-')
      .filter(id)[0];

    return $(
      `<pre class="language-${lang}"><code class="language-${lang}">${highlightCode(
        text,
        lang
      )}</code></pre>`
    );
  });
  return `<div>${$('body').html()}</div>`;
};
