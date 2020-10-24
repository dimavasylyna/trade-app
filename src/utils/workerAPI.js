if (typeof(Worker)==="undefined") {
    alert("Ops, your browser doesn't support HTML5 Web Worker! Please choose another modern browser and try again.");
}

function withWebWorker() {
    preStart();
    var worker = new Worker("worker.js");
    worker.onmessage = function(e) {
        afterStop(e.data, true);
    };

    worker.postMessage("start");
}





