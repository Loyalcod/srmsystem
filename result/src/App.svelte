<script>
	import Home from "./pages/Home.svelte";
	import Result from "./pages/Result.svelte";
	import page from 'page'

	let current;
	let urlparams;

	page('/', () => (current = Home))

	page('/result/:email/:regNo', (getParams, next)=>{
		urlparams = getParams.params;
		next()
	},
	() => (current = Result)
	)

	page.start()
</script>

<main>
	<svelte:component this = {current} urlparams = {urlparams}/>
</main>