(function () {
    class Gen extends Observer {
        constructor(layers, settings) {
            super();
            if (!settings) settings = {};
            this.layers = layers;
            this.score = 0;
        }

        train(input, output, minMax) {
            if (!(input instanceof Array))
                input = [input];
            if (!(output instanceof Array))
                output = [output];

            let processOutput = [];
            this.layers.forEach((layer, i) => {
                i = parseInt(i);
                if(0 === i) {
                    layer.setValues(input);
                }
                layer.activate();
                if(this.layers.length - 1 === i) {
                    processOutput = layer.getOutput(input);
                }
            });
            this.calcScore(output, processOutput, minMax);
            console.log(this.score);
        }

        calcScore(modelOutput, output, minMax) {
            if(!(modelOutput instanceof Array)) {
                modelOutput = [modelOutput];
            }
            output = normArray(output, minMax.min, minMax.max);
            let diff = 0;
            output.forEach((o, i) => {
                const mo = modelOutput[i];
                diff += Math.abs(mo - o);
            });
            diff /= output.length;
            this.score = diff;
            return this.score;
        }

        mutate() {
        }
    }

    window.Gen = Gen;
})();