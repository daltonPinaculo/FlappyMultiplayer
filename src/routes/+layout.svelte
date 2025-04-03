<script lang="ts">
	import Toaster from '$components/Toaster.svelte';
	import toast from '$lib/utils/toast.svelte';
	import '../app.css';
	let { children } = $props();
	toast.success("Novo jogador entrou na partida","")
</script>
<Toaster/>
{@render children()}
