//import * from 'globe';
function fetch_data() {

	while(true) {
		console.log("In Fetch");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				/* document.getElementById("demo").innerHTML =
				   this.responseText;
				 */
				postMessage(this.responseText);

			};
		}
		xhttp.open("GET", "../receive_sync.php", false);
		xhttp.send();
	}

};
fetch_data();
