var cheerio = require('cheerio');
var he = require('he');
var loaderUtils = require('loader-utils');
var Prism = require('prismjs');

module.exports = function (input) {
  input = input || '';

  this.cacheable();

  var $ = cheerio.load(input, {
    decodeEntities: false
  });

  $('pre').replaceWith(function (index, elem) {
    var elemjQuery = $(elem);
    var text = elemjQuery.text();

    if (text.split('\n').length < 2) {
      return $(`<code>${he.encode(text)}</code>`);
    }

    var codeElem = elemjQuery.find('code').eq(0);
    var lang = codeElem.attr('class').split('lang-').filter(id)[0];

    return $(`<pre class="language-${lang}"><code class="language-${lang}">${highlightCode(text, lang)}</code></pre>`);
  });
  return '<div>' + $('body').html() + '</div>';
};

function id(a) { return a; }

function highlightCode(code, lang) {
  return Prism.highlight(code, Prism.languages[lang])
}
