<script>
	export let el;
	let colors = ["#5B24C2", "#7018A0"];

	$: {
		el.value = colors.join(",");
	}

	const isColor = (strColor) => {
		const s = new Option().style;
		s.color = strColor;
		return s.color !== "";
	};

	function handleColorChanged(e, index) {
		const color = e.target.value;
		if (isColor(color)) colors[index] = color;
		else colors[index] = "#000";
	}

	$: gradient = colors
		.map((color, idx) => {
			return `${color} ${(idx * 100) / (colors.length - 1)}%`;
		})
		.join(", ");
</script>

<div id="gradientInputWrapper">
	<div>
		{#each colors as color, index}
			<div class="input-group">
				<input type="color" bind:value={color} />
				<!-- on:change={handleColorChanged} -->
				<input
					type="text"
					value={color}
					on:change={(e) => handleColorChanged(e, index)}
				/>
			</div>
		{/each}
	</div>

	<div
		id="gradientPreview"
		style="background: linear-gradient(90deg, {gradient})"
	/>
</div>

<style>
	#gradientInputWrapper,
	#gradientInputWrapper > div:first-child {
		display: flex;
	}

	#gradientInputWrapper {
		border: 2px solid #ddd;
		border-radius: 3px;
	}

	#gradientInputWrapper > div:first-child {
		flex: 1;
	}

	.input-group {
		display: flex;
		margin-right: 0.2rem;
	}

	.input-group:first-of-type {
		border-right: 1px solid #bbb;
	}

	.input-group input[type="color"] {
		border: none;
		padding: 0;
		width: 30px;
		height: 30px;
		margin-left: 0.15rem;
	}

	.input-group input[type="text"] {
		text-transform: uppercase;
		height: 30px;
		width: 100%;
		flex: 1;
		font-size: 20px;
		border: none;
		background: transparent;
		padding-left: 0.5rem;
	}

	#gradientPreview {
		flex-shrink: 0;
		width: 60px;
		margin: 0.1rem;
		border-radius: 3px;
	}
</style>
