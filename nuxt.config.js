const path = require('path');

const webpack = require('webpack');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  // add materialize to the vendor bundle
  build: {
    vendor: ['materialize-css'],
    /*
    ** Run ESLint on save
    */
    extend(config, ctx) {
      config.resolveLoader = {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')],
      };

      if (ctx.isClient) {
        config.plugins.push(new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }));

        if (ctx.dev) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: ['eslint-loader'],
            exclude: /(node_modules)/,
          });
        }
      }

      // Markdown to html with syntax highlighting
      config.module.rules.push({
        test: /\.md$/,
        use: [
          'vue-loader',
          'html-to-vue-loader',
          'prism-loader',
          'markdown-loader',
        ],
      });
    },
  },

  // include css from libraries
  css: ['materialize-css/dist/css/materialize.min.css', 'prismjs/themes/prism.css'],
};
