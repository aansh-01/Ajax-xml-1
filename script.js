var landscapeMenuElem;
//var landscapeElem;
//var cityMenuElem;
//var cityElem;
var cityResultElem;

function init() {
  landscapeMenuElem = document.getElementById("landscapeMenu");
//  landscapeElem = document.getElementById("landscape");
  cityResultElem = document.getElementById("cityresult");

  addListener(landscapeMenuElem, "change", selectLandscape);
}
addListener(window,"load",init);


function selectLandscape() {
  var landscape;
  landscape = this.value;
  requestLandscapeData(landscape);
 
  //this.selectedIndex = 0; //återställer menyn
}

function requestLandscapeData(landscape) {
  var request;
  if(XMLHttpRequest) { request = new XMLHttpRequest(); }
  else if (ActiveXObject) { request = new ActiveXObject("Microsoft.XMLHTTP"); }
  else { alert("Tyvärr inget stöd för AJAX, så data kan inte läsas in"); return false; }

  request.open("GET", "xml/town/" + landscape + ".xml", true);
  request.send(null);
  request.onreadystatechange = function() {
    if(request.readyState == 4 || request.readyState == "complete")
      if(request.status == 200) getDataLandscape(request.responseXML);
        else landscapeElem.innerHTML = "Den begärda resursen finns inte";
  };
}


function getDataLandscape(XMLcode) {
  var cityElems;
  var nameElem;
  var i;
  var HTMLcode = [];			// Textsträng med ny HTML-kod som skapas

 	cityElems = XMLcode.getElementsByTagName("city");

  for (i=0; i<cityElems.length; i++) {
    type = cityElems[i].getAttribute("type");
    nameElem = cityElems[i].getElementsByTagName("name")[0];
    HTMLcode += nameElem.firstChild.data + "<br>";
  }
  cityResultElem.innerHTML = HTMLcode;
}
