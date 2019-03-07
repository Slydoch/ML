<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ML</title>
    <script src="/js/Observer.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/helper.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Layer.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Archi.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Neur.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Gen.js?t=<?= time() ?>" type="text/javascript"></script>
    <script src="/js/Syn.js?t=<?= time() ?>" type="text/javascript"></script>
</head>
<body>
<script>
    try {
        let archi = new Archi();
        archi.layout([
            1,
            5,
            1
        ]);
        archi.build();
        archi.run(
            [-1, 2, 4, 5, 6, 10],
            [-2, 4, 8, 10, 12, 20]
        );
        console.log(archi);
    } catch (e) {
        console.group("Catch error");
        console.error(e);
        console.groupEnd();
    }
</script>
</body>
</html>