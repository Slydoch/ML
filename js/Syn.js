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
            this.force = settings.force || 0.5 + (Math.random() / 0.1 - Math.random() / 0.2);
            this.value = settings.value || 0.5 + (Math.random() / 0.1 - Math.random() / 0.2);
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