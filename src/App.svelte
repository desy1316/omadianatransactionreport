<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "boxicons/css/boxicons.css";
  import Splash from "./lib/Splash.svelte";
  import Transaksi from "./lib/Transaksi.svelte";

  let loading = true;
  onMount(async () => {
    await new Promise((r) => setTimeout(r, 3000));
    loading = false;
  });
</script>

{#if loading}
  <div out:fade={{ duration: 1000 }}>
    <Splash />
  </div>
{:else}
  <div in:fade={{ duration: 1400 }}>
    <Transaksi />
  </div>
{/if}
