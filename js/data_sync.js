function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("js/map_worker.js");
        }

        w.onmessage = function(event) {

            //console.log("DOM received: "+event.data);
            if (!event.data.startsWith("NODATA") ) 
            {
                transfers = JSON.parse(event.data);
                for (var i=0; i<transfers.length; i++) {
                    var j = transfers[i];
                    pub2 = j["sender"];
                    sub2 = j["receiver"];

                    addData(pub2, sub2);

                }
               //console.log(transfers);

            }
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
}

startWorker();

