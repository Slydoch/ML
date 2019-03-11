(function () {
    class Layer extends Observer {
        constructor(neursCount, settings) {
            super();
            if (!settings) settings = {};
            this.neurs = [];
            this.index = 0;
            this.nextLayer = settings.nextLayer || false;
            this.prevLayer = settings.prevLayer || false;
            this.input = settings.input || false;
            this.output = settings.output || false;
            this.processedOutput = false;
            this.score = Infinity;
            if(this.output && this.input) {
                throw 'Layer cannot be input and output';
            }
            this.neursCount = neursCount;
            this.init();
        }


        init() {
            for(let i = 0; i < this.neursCount; i++) {
                this.addNeur(new Neur());
            }
            return this;
        }

        addNeur(neur) {
            this.neurs.push(neur);
            return this;
        }

        calcOutput() {
            this.processedOutput = [];
            if(this.output) {
                this.neurs.forEach((neur) => {
                    const val = neur.getValue();
                    this.processedOutput.push(val);
                });
            }
            return this.processedOutput;
        }

        calcScore(output) {
            if (!(this.processedOutput instanceof Array)) {
                this.processedOutput = [this.processedOutput];
            }

            if (!(output instanceof Array)) {
                output = [output];
            }


            // console.log("diff", output, this.processedOutput);

            let diff = 0;
            this.processedOutput.forEach((o, i) => {
                const oo = output[i];
                diff += Math.abs(oo - o);
            });
            diff /= this.processedOutput.length;
            this.score = diff;
            return diff;
        }

        display() {
            let ni = 0;
            this.neurs.forEach(neur => {
                neur.display(this.index, ni);
                ni++;
            });
        }

        setValues(inputs) {
            if(this.neurs.length !== inputs.length)
                throw 'inputs and neurs inputs count must match';

            inputs.forEach((input, k) => {
                this.neurs[parseInt(k)].value = input;
            });
            return this;
        }

        activate(mutation) {
            this.propagate("activate");
            let ni = 0;
            this.neurs.forEach(neur => {
                neur.mutate(mutation);
                neur.activate();
                ni++;
            });
            this.propagate("activated");
            return this;
        }

        setNextLayer(layer) {
            if (!this.nextLayer) {
                this.nextLayer = layer;
                layer.setPrevLayer(this);
            }
            return this;
        }

        setPrevLayer(layer) {
            if (!this.prevLayer) {
                this.prevLayer = layer;
                layer.setNextLayer(this);
            }
            return this;
        }

        build() {
            this.linkNeurs();
            return this;
        }

        linkNeurs() {
            if (this.prevLayer) {
                this.syns = [];
                this.prevLayer.neurs.forEach((prevNeur) => {
                    this.neurs.forEach((neur) => {
                        let syn = new Syn({
                            from: prevNeur,
                            to: neur
                        });
                        prevNeur.outSyns.push(syn);
                        neur.inSyns.push(syn);
                    });
                });
            }
            return this;
        }
    }

    window.Layer = Layer;
})();