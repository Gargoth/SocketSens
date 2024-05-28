import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	kit: {
		adapter: adapter({
			// see below for options that can be set here
		})
	},
	preprocess: vitePreprocess()
};
