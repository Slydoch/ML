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