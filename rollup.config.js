import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import browsersync from 'rollup-plugin-browsersync'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import sveltePreprocess from 'svelte-preprocess'
import postcss from 'rollup-plugin-postcss'

const watch = process.env.WATCH
const mainpath = watch ? 'docs/index.js' : pkg.main
const dedupe = [ 'svelte' ]

const scssOptions = {
  transformers: {
    scss: {
      includePaths: [
        'node_modules',
        'src'
      ]
    },
    postcss: {
      plugins: [
        require('autoprefixer')
      ]
    }
  }
}

export default [
	{
		input: 'src/index.js',
		output: {
			name: 'GradientPicker',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			commonjs(), // so Rollup can convert `ms` to an ES module
			svelte({
				preprocess: sveltePreprocess(scssOptions)
			}),
			resolve(), // so Rollup can find `ms`
			postcss(),
			terser()
		]
	},
];

// Uncomment lines below to setup es and iife builds
// export default {
// 	input: 'src/index.js',
// 	output: [
// 		{ file: pkg.module, format: 'es' },
// 		{ file: mainpath, format: 'iife' }
// 	],
// 	plugins: [
// 		commonjs(),
// 		svelte({
// 			preprocess: sveltePreprocess(scssOptions)
// 		}),
// 		resolve({
// 			dedupe
// 		}),
// 		postcss(),
// 		watch && browsersync({ server: 'docs' }),
// 		!watch && terser()
// 	]
// }
