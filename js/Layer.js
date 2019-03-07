(function () {
    class Layer extends Observer {
        constructor(neursCount, settings) {
            super();
            if (!settings) settings = {};
            this.neurs = [];
            this.nextLayer = settings.nextLayer || false;
            this.prevLayer = settings.prevLayer || false;
            this.input = settings.input || false;
            this.output = settings.output || false;
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

        getOutput() {
            let output = [];
            if(this.output) {
                this.neurs.forEach((neur) => {
                    output.push(neur.getValue());
                });
            }
            return output;
        }

        setValues(inputs) {
            if(this.neurs.length !== inputs.length)
                throw 'inputs and neurs inputs count must match';

            inputs.forEach((input, k) => {
                this.neurs[parseInt(k)].value = input;
            });
            return this;
        }

        activate() {
            this.propagate("activate");
            this.neurs.forEach(neur => {
                neur.activate();
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