<script>
    import { onMount } from "svelte";
    import Pelanggan from "./Pelanggan.svelte";

    const pagename = "Daftar Transaksi Pengambilan";
    const api = "AIzaSyAI85XgiG2zNlph1Xa7dNn4uFjm2frRsF8";
    const sheetid = "1GXnRO2U0Qmciu2Zq5USCNuOG-ZqB_nyD57l_AtmxUd8";
    const range = "transaksi";

    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetid}/values/${range}?key=${api}`;

    let transaksis = [];
    let caridata = "";
    let limit = 10;

    async function FecthTransaksi() {
        // const response = await fetch("/api/transaksi");
        const response = await fetch(endpoint);
        const json = await response.json();
        const [header, ...rows] = json.values;

        transaksis = rows.map((row) =>
            Object.fromEntries(header.map((h, i) => [h, row[i] ?? ""])),
        );
    }

    function handleScroll() {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 50
        ) {
            if (limit < filterpengambilan.length) {
                limit += 10;
            }
        }
    }

    function FormatHarga(harga) {
        return Intl.NumberFormat("id-ID").format(Number(harga || 0));
    }

    onMount(() => {
        FecthTransaksi();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    // reset limit saat search berubah
    $: caridata, (limit = 10);

    $: filterpengambilan = transaksis.filter(
        (d) =>
            d.picked && d.picked.toLowerCase().includes(caridata.toLowerCase()),
    );

    $: datatampil = filterpengambilan.slice(0, limit);

    $: totalbayar = datatampil.reduce(
        (sum, t) => sum + Number(t.total || 0),
        0,
    );
</script>

<section class="transaksi my-5 pb-5">
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h5 class="spx">{pagename}</h5>
                <Pelanggan />
            </div>
        </div>

        <div class="row my-2">
            <div class="col-lg-12">
                <input
                    type="search"
                    class="form-control form-control-sm"
                    autocomplete="off"
                    bind:value={caridata}
                    placeholder="Cari Data (Masukan Nama yang melakukan Pengambilan...)"
                />
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="text-center">
                            <tr>
                                <td>#</td>
                                <td>Kode Transaksi</td>
                                <td>Waktu Ambil</td>
                                <td>Di Ambil Oleh</td>
                                <td class="text-left">Item</td>
                                <td>Harga</td>
                                <td>Qty</td>
                                <td>Total</td>
                            </tr>
                        </thead>

                        <tbody class="text-center">
                            {#if datatampil.length < 1}
                                <tr>
                                    <td colspan="8">Belum ada Transaksi</td>
                                </tr>
                            {:else}
                                {#each datatampil as trx, i}
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{trx.kode_transaksi}</td>
                                        <td>{trx.tgl_ambil}</td>
                                        <td>{trx.picked}</td>
                                        <td class="text-left">{trx.produk}</td>
                                        <td>{FormatHarga(trx.harga)}</td>
                                        <td>{trx.qty}</td>
                                        <td>{FormatHarga(trx.total)}</td>
                                    </tr>
                                {/each}
                            {/if}

                            {#if limit < filterpengambilan.length}
                                <tr>
                                    <td colspan="8" class="text-center">
                                        <small
                                            >Scroll untuk load data berikutnya…</small
                                        >
                                    </td>
                                </tr>
                            {/if}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td colspan="6" class="gt-text">Grand Total</td>
                                <td colspan="2" class="text-center gt-text">
                                    {FormatHarga(totalbayar)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .transaksi {
        min-height: 100vh;
    }
</style>
