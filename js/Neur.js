(function () {
    class Neur extends Observer {
        constructor(settings) {
            super();
            if (!settings) settings = {};
            this.threshold = settings.threshold || 0.5;
            this.outSyns = [];
            this.inSyns = [];
            this.input = false;
            this.output = false;
            this.value = settings.value || 0.5;
        }

        on() {
            return (this.value >= this.threshold);
        }

        getValue() {
            return (this.value >= this.threshold) ? this.value : 0;
        }

        set_threshold(v) {
            this.threshold = v;
            if(this.threshold > 1) this.threshold = 1;
            else if (this.threshold < 0) this.threshold = 0;
        }

        mutate(force) {
            this.set_threshold(this.threshold + (Math.random() * force * 2) - (force));
            if(this.inSyns && this.inSyns.length) {
                this.inSyns.forEach((syn) => {
                    syn.mutate(force);
                });
            }
        }

        display(li, ni) {
            Archi.setColor(jQuery('.archi [data-trigger=l_'+li+'] [data-trigger=n_'+ni+']'), this.getValue());
            if(this.inSyns && this.inSyns.length) {
                this.inSyns.forEach((syn) => {
                });
            }
        }

        activate() {
            this.propagate("activate");


            if(this.inSyns && this.inSyns.length) {
                this.input = false;
                let sum = 0;
                this.inSyns.forEach((syn) => {
                    sum += syn.value;
                });
                this.value = sum / this.inSyns.length;
            } else {
                this.input = true;
            }


            if(this.outSyns && this.outSyns.length) {
                this.output = false;
                this.outSyns.forEach((syn) => {
                    syn.activate();
                });
            } else {
                this.output = true;
            }


            this.propagate("activated");
            return this;
        }
    }

    window.Neur = Neur;
})();