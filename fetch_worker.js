function fetch_data() {

	while(true) {
		console.log("In Fetch");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			 /* document.getElementById("demo").innerHTML =
			  this.responseText;
			 */
			console.log("Received data : "+this.responseText);
		};
		}
		xhttp.open("GET", "receive2.php", false);
		xhttp.send();
	}

};
	fetch_data();
