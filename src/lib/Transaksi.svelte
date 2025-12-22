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
    let jumlahdataperhalaman = 10;

    async function FecthTransaksi() {
        const response = await fetch(endpoint);
        const json = await response.json();
        const [header, ...rows] = json.values;

        transaksis = rows.map((row) => {
            return Object.fromEntries(header.map((data, i) => [data, row[i]]));
        });
    }

    onMount(() => {
        FecthTransaksi();
    });

    function FormatHarga(harga) {
        return `${Intl.NumberFormat("id-Id").format(harga)}`;
    }

    $: filterpengambilan = transaksis.filter((data) =>
        data.picked.toLowerCase().includes(caridata.toLowerCase()),
    );

    $: tampildata = filterpengambilan.slice(0, jumlahdataperhalaman);

    $: totalbayar = filterpengambilan.reduce(
        (sum, transaksi) => sum + Number(transaksi.total),
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
                                <td>
                                    <i class="bx bx-code-alt bx-border-circle"
                                    ></i>
                                    Kode Transaksi
                                </td>

                                <td>
                                    <i
                                        class="bx bx-calendar-event bx-border-circle"
                                    ></i>
                                    Waktu Ambil
                                </td>

                                <td
                                    ><i
                                        class="bx bx-user-circle bx-border-circle"
                                    ></i>
                                    Di Ambil Oleh
                                </td>

                                <td class="text-left"
                                    ><i class="bx bx-package bx-border-circle"
                                    ></i>
                                    Item
                                </td>
                                <td
                                    ><i class="bx bxs-wallet bx-border-circle"
                                    ></i>
                                    Harga
                                </td>
                                <td>
                                    <i class="bx bx-sort bx-border-circle"></i>
                                    Qty
                                </td>
                                <td>
                                    <i
                                        class="bx bx-wallet bx border-circle bx-border-circle"
                                    ></i>
                                    Total
                                </td>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            {#each tampildata as trx, i}
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
                        </tbody>

                        {#if jumlahdataperhalaman > filterpengambilan.length && filterpengambilan.length > 0}
                            <tfoot>
                                <tr>
                                    <td colspan="6" class="gt-text"
                                        >Grand Total</td
                                    >
                                    <td colspan="2" class="text-center gt-text"
                                        >{FormatHarga(totalbayar)}</td
                                    >
                                </tr>
                            </tfoot>
                        {/if}
                    </table>

                    {#if jumlahdataperhalaman < filterpengambilan.length}
                        <button
                            type="button"
                            class="btn btn-outline-dark btn-sm"
                            on:click={() => (jumlahdataperhalaman += 10)}
                        >
                            <i class="bx bxs-chevrons-down bx-tada"></i>
                            Tampilkan Transaksi Berikut
                        </button>
                    {/if}
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
