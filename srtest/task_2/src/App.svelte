<script>
	import { onMount } from 'svelte';

	let baseCurrency = 'USD';
	let targetCurrency = 'EUR';
	let amountFrom = 1;
	let amountTo = 0;
	let exchangeRates = {};

	async function fetchExchangeRates() {
		const response = await fetch(`https://v6.exchangerate-api.com/v6/712c1f95f5693f3478c7759a/latest/${baseCurrency}`);
		const data = await response.json();
		exchangeRates = data.conversion_rates;
		updateConversion();
	}

	function updateConversion() {
		const fromRate = exchangeRates[baseCurrency];
		const toRate = exchangeRates[targetCurrency];
		amountTo = (amountFrom * (toRate / fromRate)).toFixed(2);
	}

	onMount(fetchExchangeRates);

	$: updateConversion();
</script>

<h1>Currency Converter</h1>

<div>
	<label for="baseCurrency">From:</label>
	<select id="baseCurrency" bind:value={baseCurrency} on:change={fetchExchangeRates}>
		{#each Object.keys(exchangeRates) as currency}
			<option value={currency}>{currency}</option>
		{/each}
	</select>
	<input type="number" bind:value={amountFrom} on:input={updateConversion}>
</div>

<div>
	<label for="targetCurrency">To:</label>
	<select id="targetCurrency" bind:value={targetCurrency} on:change={updateConversion}>
		{#each Object.keys(exchangeRates) as currency}
			<option value={currency}>{currency}</option>
		{/each}
	</select>
	<input type="number" bind:value={amountTo} on:input={updateConversion}>
</div>