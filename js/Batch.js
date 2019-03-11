(function () {
    class Batch extends Observer {
        constructor(entities) {
            super();
            this.entities = entities;
        }
    }

    window.Batch = Batch;
})();