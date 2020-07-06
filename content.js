var active = true;
var id = '33eae942-8f16-4ec3-a98b-0b6409e74095';


var onlyRolesInGroundTruth = true;

var windowWidth = window.innerWidth;

// to reset the DOM
var firstDOM = document.body.cloneNode(true);


var drawOn = true;
var start = {};
var end = {};

var div = document.createElement("div");
//div.setAttribute("id", id);
document.body.appendChild(div);


// in a content script, at run_at:document_start
window.addEventListener('mousedown', function(e) {
	if (active && drawOn) {
		start.x = e.clientX;
		start.y = e.clientY;
		let i = div.getElementsByTagName('select')[0];
		if (i != undefined) {
			i.remove();	
		}
	}
    event.stopImmediatePropagation();
}, true);

window.addEventListener('mouseup', function(e) {
	if (active && drawOn) {
		drawOn = false;
		end.x = e.clientX;
		end.y = e.clientY;

		var inp = document.createElement('select');
		inp.setAttribute('id', 'role');
		let o = document.createElement('option');
		o.setAttribute('value', 'main');
		o.innerHTML = 'main';
		inp.appendChild(o);
		let o1 = document.createElement('option');
		o1.setAttribute('value', 'header');
		o1.innerHTML = 'header';
		inp.appendChild(o1);
		let o2 = document.createElement('option');
		o2.setAttribute('value', 'footer');
		o2.innerHTML = 'footer';
		inp.appendChild(o2);				
		div.appendChild(inp);

		let s = document.createElement('button');
		s.setAttribute('type', 'submit');
		s.innerHTML = 'Save';
		s.addEventListener("click", saveDiv);
		div.appendChild(s);
	

		drawnOn = false;
	}
    event.stopImmediatePropagation();
}, true);

window.addEventListener('mousemove', function(e) {
	if (active && drawOn) {
		var w = e.clientX - start.x;
		var h = e.clientY - start.y;
		var s = 'position:absolute; top:' + start.y +'px;left: ' + start.x + 'px;background-color:red; height: '+ h +'px; width: ' + w + 'px;';
		div.setAttribute("style", s);
	}

    event.stopImmediatePropagation();
}, true);



function saveDiv() {
	/*
	chrome.runtime.sendMessage(
		{
			action: 'xhttp',
			method: 'POST', 
			data: myBody,
			url: 'http://localhost:8081'
		}, function(segments) {
	*/
}

function deleteDiv() {
	console.log('remove');
}

/** 
 * Switch on the extension
 */
function on(id) {
	switch (id) {
		case 'on':
			active = true;
			alert(active);
			break;
		case 'off':
			alert(active);
			break;
			 
	}
}

