(function () {
    class Batch extends Observer {
        constructor(layers, batchSize, inputs, outputs) {
            super();
            this.batchSize = batchSize;
            this.inputs = inputs;
            this.outputs = outputs;
            this.entities = [];
            this.bScore = Infinity;
            for (let i = 0; i < this.batchSize; i++) {
                let layersClones = [];
                for(let l = 0; l < layers.length; l++) {
                    const layer = layers[l];
                    layersClones.push(Object.assign(Object.create(Object.getPrototypeOf(layer)), layer));
                }
                this.entities.push({
                    layers: layersClones,
                    expected: [],
                    output: [],
                    score: []
                });
            }
        }

        display() {
            this.entities[this.entities.length - 1].layers.forEach((layer) => {
                layer.display();
            });
        }

        train(mutation) {
            this.entities.forEach((entity) => {
                for (let i = 0; i < this.inputs.length; i++) {
                    let input = this.inputs[i];
                    let output = this.outputs[i];

                    if (!(input instanceof Array))
                        input = [input];
                    if (!(output instanceof Array))
                        output = [output];


                    let processOutput = [];
                    entity.layers.forEach((layer) => {
                        if (layer.input) {
                            layer.setValues(input);
                        }

                        layer.activate(mutation);

                        if (layer.output) {
                            entity.expected.push(output);
                            entity.output.push(layer.calcOutput());
                            entity.score.push(layer.calcScore(output));
                        }
                    });
                }
            });

        }

        getBest(batch) {
            batch.entities.forEach((entity) => {
                let score = entity.score.sum();
                if(score < this.bScore) {
                    console.log(score);
                    this.bScore = score;
                    this.best = entity;
                }
            });
            return this.best;
        }

        mutate(prev) {
            let bestEntity = this.getBest(prev);
            if(bestEntity) {
                this.entities = [];
                for (let i = 0; i < this.batchSize; i++) {
                    let layersClones = [];
                    bestEntity.layers.forEach((layer) => {
                        layersClones.push(Object.assign(Object.create(Object.getPrototypeOf(layer)), layer));
                    });
                    this.entities.push({
                        expected: [],
                        layers: layersClones,
                        output: [],
                        score: []
                    });
                }
            }
        }
    }

    window.Batch = Batch;
})();