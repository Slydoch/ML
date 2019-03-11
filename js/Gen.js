(function () {
    class Gen extends Observer {
        constructor(layers, batchSize, settings) {
            super();
            if (!settings) settings = {};
            this.batchSize = batchSize || 1;
            this.entities = [];
            this.layers = layers;
            this.inputs = settings.inputs || [];
            this.outputs = settings.outputs || [];
            this.layers = layers;
            for(let i = 0; i < this.batchSize; i++) {
                let layersClones = [];
                this.layers.forEach((layer) => {
                    layersClones.push(Object.assign(Object.create(Object.getPrototypeOf(layer)), layer));
                });
                this.entities.push(layersClones);
            }
            this.batch = new Batch(this.entities, this.inputs, this.outputs);
            this.score = 0;
        }

        train() {
            batch.train();
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
            return diff;
        }

        mutate() {
            this.entities.forEach((entity) => {

            });
        }
    }

    window.Gen = Gen;
})();