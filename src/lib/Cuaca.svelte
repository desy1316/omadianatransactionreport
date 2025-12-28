<script>
    import { onMount } from "svelte";
    const lat = -10.352334935271987;
    const lon = 123.46148412139581;

    let cuaca = null;
    let loading = true;

    function cuacaIcon(code) {
        if (code === 0) return "☀️";
        if (code <= 2) return "🌤️";
        if (code <= 3) return "☁️";
        if (code <= 45) return "🌫️";
        if (code <= 55) return "🌦️";
        if (code <= 65) return "🌧️";
        if (code <= 75) return "❄️";
        if (code <= 95) return "⛈️";
        return "❓";
    }

    async function loadCuaca() {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
        );
        const data = await res.json();
        cuaca = data.current_weather;
        loading = false;
    }

    onMount(loadCuaca);
</script>

{#if loading}
    <small>Cuaca Kupang...</small>
{:else}
    <div>
        <p class="lead">Cuaca Kupang hari ini .....</p>
    </div>

    <div class="weather">
        <h3 class="display-4">
            {cuacaIcon(cuaca.weathercode)}
            {Math.round(cuaca.temperature)}°C
        </h3>
    </div>
{/if}

<style>
    .weather {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        font-size: 14px;
    }
    .icon {
        font-size: 18px;
    }
</style>
