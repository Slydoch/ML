(function () {
    class Observer {
        constructor() {
            this.reg = {};
        }

        register(id, callback) {
            if (!this.reg[id])
                this.reg[id] = [];
            this.reg[id].push(callback);
            return this;
        }

        propagate(id, arg) {
            if (!this.reg[id])
                return;
            this.reg[id].forEach((callback) => {
                callback(arg);
            });
            return this;
        }
    }

    window.Observer = Observer;
})();