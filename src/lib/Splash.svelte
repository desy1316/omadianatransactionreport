<script>
    import oma from "../../public/oma.webp";
    const devname = "Developed By MidunKopipahit@bakunase";
</script>

<section class="splash">
    <div class="splash-content">
        <img src="./oma.webp" alt="oma" />
    </div>
    <div id="developer">
        <h6 class="text-white font-weight-lighter">{devname}</h6>
    </div>
</section>

<style>
    .splash {
        min-height: 100vh;
        background-color: orangered;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    #developer {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }

    h6 {
        font-size: 0.9rem;
    }

    .splash img {
        width: 300px;
        height: auto;
    }
</style>
