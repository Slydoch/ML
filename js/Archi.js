(function () {
    class Archi extends Observer {
        constructor(settings) {
            super();
            if (!settings) settings = {};
            this.layers = [];
        }

        addLayer(layer) {
            this.layers.push(layer);
            return this;
        }


        build() {
            let prev = false;
            this.layers.forEach((layer) => {
                if (prev) {
                    layer.setPrevLayer(prev);
                }
                prev = layer;
            });
            this.layers.forEach((layer) => {
                layer.build();
            });
            return this;
        }

        layout(layout) {
            if (!layout instanceof Array) throw 'Layout must be an Array';
            for (let l in layout) {
                const layerCount = layout[l];
                let layer = new Layer(layerCount);
                switch (parseInt(l)) {
                    case 0:
                        layer.input = true;
                        break;
                    case (layout.length - 1):
                        layer.output = true;
                        break;
                }
                this.addLayer(layer);
            }
            return this;
        }

        run(inputs, outputs) {
            if (inputs.length !== outputs.length)
                throw 'inputs and outputs count must match';
            const minMax = minMaxArr([
                inputs,
                outputs
            ]);
            const normalized = normArray([
                inputs,
                outputs
            ], minMax.min, minMax.max);
            normalized[0].forEach((input, ik) => {
                let gen = new Gen(this.layers);
                gen.mutate();
                gen.train(input, normalized[1][ik], minMax);
            });
            return this;
        }
    }

    window.Archi = Archi;
})();