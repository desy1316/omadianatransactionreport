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
    }

    .splash-content {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .splash img {
        margin-top: 120px;
        width: 300px;
    }

    @media (max-width: 576px) {
        .splash img {
            margin-top: 250px;
        }
    }
</style>
