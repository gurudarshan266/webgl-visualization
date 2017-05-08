function handleMsg(msg) {
	if (VISIBLE) {
		pub = [30.666266,-84.199219]
		sub = [[23.795398,72.597656]]
		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		
			if (this.readyState == 4 && this.status == 200) {
				//document.getElementById("demo").innerHTML = this.responseText;
				if (!this.responseText.startsWith("NODATA") ) 
				{
					j = JSON.parse(this.responseText);
					pub2 = j["sender"];
					sub2 = [j["receiver"]];

					addData(pub2, sub2);
					console.log(j);
				}
			}
		};
		xhttp.open("GET", "receive.php", true);
		xhttp.send();

		//addData(pub, sub);
		//addData(msg.pub, msg.subs);
	}
}

var pubnub = PUBNUB.init({
  publish_key   : "demo",
  subscribe_key : "e19f2bb0-623a-11df-98a1-fbd39d75aa3f",
  ssl           : true
});
var timeStamps = [];
pubnub.subscribe({
  channel  : "rts-xNjiKP4Bg4jgElhhn9v9-geo-map",
  callback : function(msg){
    timeStamps = timeStamps.concat(msg.geo_map);
  }
});
var k;
var z = setInterval(function() {
  var x = exPubSub(timeStamps);
  timeStamps = [];
  var count = 0;
  clearInterval(k);
  k = setInterval(function() {
    if (count >= 30) {
      clearInterval(k);
    }
    if (typeof(x[count]) === "undefined") {
      clearInterval(k);
    }
    else {
      handleMsg(x[count]);
      count++;
    }
  }, 1000);
}, 30000);
