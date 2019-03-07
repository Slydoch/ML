(function () {
    class Gen extends Observer {
        constructor(layers, settings) {
            super();
            if (!settings) settings = {};
            this.layers = layers;
            this.score = 0;
        }

        train(input, output) {
            if (!(input instanceof Array))
                input = [input];
            if (!(output instanceof Array))
                output = [output];

            let processOutput = 0;
            this.layers.forEach((layer, i) => {
                i = parseInt(i);
                if(0 === i) {
                    layer.setValues(input);
                }
                layer.activate();
                if(this.layers.length === i) {
                    processOutput = layer.getOutput(input);
                }
            });
            this.calcScore(output, processOutput);
        }

        calcScore(modelOutput, output) {

        }

        mutate() {
        }
    }

    window.Gen = Gen;
})();