<script>
    import oma from "../../public/oma.webp";
</script>

<section class="splash">
    <div class="splash-content">
        <img src={oma} alt="oma" />
    </div>
</section>

<style>
    .splash {
        min-height: 100vh;
        background-color: orangered;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* .splash-content {
        display: flex;
        justify-content: center;
        align-items: center;
    } */

    .splash img {
        width: 300px;
        height: auto;
    }

    @media (max-width: 576px) {
        .splash img {
            margin-top: 250px;
        }
    }
</style>
