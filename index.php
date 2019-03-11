<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ML</title>
    <script src="/node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="/js/Observer.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/helper.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Layer.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Archi.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Batch.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Neur.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Gen.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Syn.js?t=<?= time() ?>" type="text/javascript"></script>
    <style>
        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .archi {

        }
        .layer {
            display: inline-block;
            width: 16px;
            margin: 0 16px;
            vertical-align: middle;
            position: relative;
        }
        .neur {
            width: 16px;
            height: 16px;
            display: inline-block;
            border-radius: 16px;
            border: 1px solid #d4d4d4;
        }
        .syn {
            position: absolute;
            height: 1px;
            background: #d4d4d4;
        }
    </style>
</head>
<body>
<script>
    try {
        window.archi = new Archi();
        archi.layout([
            1,
            5,
            5,
            5,
            1
        ]);
        archi.build();
        setTimeout(() => {
            archi.run(
                [-1, 2, 4, 5, 6, 7, 8, 9, 10],
                [-2, 4, 8, 10, 12, 14, 16, 18, 20],
                1000
            );
        }, 1000);
    } catch (e) {
        console.group("Catch error");
        console.error(e);
        console.groupEnd();
    }
</script>
</body>
</html>