(function () {
    class Archi extends Observer {
        constructor(settings) {
            super();
            if (!settings) settings = {};
            this.layers = [];
            this.mutation = 0.05;
            this.dom = null;
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
            this.generateDom();
            return this;
        }

        static setColor($element, force) {
            let color = Math.round(Math.abs(force * 255));
            // console.log(color);
            if(color > 255) color = 255;
            if(color < 0) color = 0;
            color = 255 - color;
            $element.css({
               "background-color": 'rgb('+color+','+color+','+color+')'
            });
        }

        layout(layout) {
            if (!layout instanceof Array) throw 'Layout must be an Array';
            for (let l = 0; l < layout.length; l++) {
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

                layer.index = l;
                this.addLayer(layer);
            }
            return this;
        }

        generateDom() {
            this.dom = jQuery("<div></div>").addClass("archi")
                .appendTo(jQuery('body'));
            for(let l = 0; l < this.layers.length; l++) {
                const layer = jQuery("<div></div>").addClass("layer")
                    .attr('data-trigger', 'l_' + l)
                    .appendTo(this.dom);
                for(let n = 0; n < this.layers[l].neurs.length; n++) {
                    const neur = jQuery("<div></div>").addClass("neur")
                        .attr('data-trigger', 'n_' + n)
                        .appendTo(layer);
                }
            }
        }

        run(inputs, outputs, tries) {
            if (inputs.length !== outputs.length)
                throw 'inputs and outputs count must match';
            const normalized = normRecurArray([
                inputs,
                outputs
            ]);
            let gen = new Gen(this, this.layers, 10, {
                inputs: normalized[0],
                outputs: normalized[1]
            });
            gen.register("train end", (best) => {
                console.warn(best.score.sum());
               console.log(best.output, best.score);
            });
            for (let t = 0; t < tries; t++) {
                this.propagate("generation start");
                gen.train(this.mutation);
                gen.mutate();
                this.propagate("generation end");
            }
            gen.display();
            console.log("Archi end");
            return this;
        }
    }

    window.Archi = Archi;
})();