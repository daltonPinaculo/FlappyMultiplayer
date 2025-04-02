import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { webSocketServer } from './src/server';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(),webSocketServer],
	resolve:{
		alias:{
			"xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js",
		}
	}
});
