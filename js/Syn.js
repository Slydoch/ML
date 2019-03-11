(function () {
    class Syn extends Observer {
        constructor(settings) {
            super();
            if (!settings) settings = {};
            this.from = settings.from || false;
            if (!this.from)
                throw 'Missing from';
            this.to = settings.to || false;
            if (!this.to)
                throw 'Missing to';
            this.force = settings.force || 0.5;
            this.value = settings.value || 0.5;
        }

        mutate(force) {
            this.force += ((Math.random() * force * 2) - (force));
            if(this.force > 1) {
                this.force = 1;
            } else if(this.force < 0) {
                this.force = 0;
            }
        }

        activate() {
            this.propagate("activate");
            if(this.from.on()) {
                this.value = this.force;
            } else {
                this.value = 0;
            }
            this.propagate("activated");
            return this;
        }
    }

    window.Syn = Syn;
})();