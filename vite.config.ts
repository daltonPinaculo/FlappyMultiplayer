import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite'
import { type ViteDevServer, defineConfig } from 'vite'
import { Server } from 'socket.io'
import { webSocketServer } from './src/server/socket';



export default defineConfig({
	plugins: [tailwindcss(), sveltekit(),webSocketServer]
});

