(function () {
    class Gen extends Observer {
        constructor(archi, layers, batchSize, settings) {
            super();
            if (!settings) settings = {};
            this.archi = archi || 1;
            this.batchSize = batchSize || 1;
            this.layers = layers;
            this.inputs = settings.inputs || [];
            this.outputs = settings.outputs || [];
            this.layers = layers;

            this.prevBatch = null;
            this.batch = new Batch(
                this.layers,
                this.batchSize,
                this.inputs,
                this.outputs
            );
            this.score = 0;
        }

        display() {
            this.batch.display();
        }

        train(mutation) {
            this.propagate("train start");
            this.batch.train(mutation);
            const b = this.batch.getBest(this.batch);
            this.propagate("train end", b);
        }

        mutate() {
            this.prevBatch = Object.assign(Object.create(Object.getPrototypeOf(this.batch)), this.batch);
            this.batch.mutate(this.prevBatch);
        }
    }

    window.Gen = Gen;
})();