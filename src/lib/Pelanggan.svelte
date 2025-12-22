<script>
    import { onMount } from "svelte";
    const range = "pelanggan";
    const idpelanggan = "1GXnRO2U0Qmciu2Zq5USCNuOG-ZqB_nyD57l_AtmxUd8";
    const key = "AIzaSyAI85XgiG2zNlph1Xa7dNn4uFjm2frRsF8";
    const uri = `https://sheets.googleapis.com/v4/spreadsheets/${idpelanggan}/values/${range}?key=${key}`;

    let dataclient = {};

    async function hitPelanggan() {
        const data = await fetch(uri);
        const json = await data.json();
        const [header, row] = json.values;

        dataclient = Object.fromEntries(header.map((h, i) => [h, row[i]]));
    }

    onMount(() => {
        hitPelanggan();
    });
    const message = "Data Ini Di Ambil Dari Api OmaDianaGalonsupplier";
    const message2 =
        "Perubahan Data Akan Terjadi Setiap ada transaksi,Lakukan Refresh Berkala";
</script>

<section>
    <div class="card my-1 wicard">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-4">
                    <h6 class="text-dark">
                        <i class="bx bxs-user-pin circle text-white"></i>
                        {dataclient.pelanggan}
                    </h6>
                    <h6 class="text-dark">
                        <i class="bx bx-calendar-event text-dark"></i>
                        Periode {dataclient.periode}
                    </h6>
                    <hr />
                    <p class="text-dark ref mb-1 mt-2">
                        <i class="bx bx-calendar-exclamation"></i>
                        {message}
                    </p>
                    <p class="ref text-dark">
                        <i class="bx bx-calendar-exclamation"></i>
                        {message2}
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .wicard {
        position: relative;
        overflow: hidden;
    }
    .ref {
        font-size: 0.7rem !important;
    }
</style>
