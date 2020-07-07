var active = true;
var id = '33eae942-8f16-4ec3-a98b-0b6409e74095';
// the webpage to analize
var url = window.location.toString().split('#')[0];


var windowWidth = window.innerWidth;

// to reset the DOM
var firstDOM = document.body.cloneNode(true);


var drawOn = true;
var start = {};
var end = {};
var inp;

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

		inp = document.createElement('select');
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
		// Create a record for the evaluation
		// Send to the server the coordinates of the blocks
		var pUrl = 'http://localhost/helloroles/server/resource/evaluations?single&key=df9795cc-d73a-48d1-82b9-e9e5b0b72d8a';
		var gUrl = 'http://localhost/helloroles/server/resource/evaluations?key=df9795cc-d73a-48d1-82b9-e9e5b0b72d8a';
		var send = {};
		send.url = url;
		send.role = inp.value;
		send.tool = 'segments';
		send.block = '(' + start.x + ',' + start.y + '),' + ' (' + end.x + ',' + end.y + ')';
		console.log(start, end, send.block);
		chrome.runtime.sendMessage(
			{
				action: 'xhttp',
				method: 'POST',
				data: send,
				url: pUrl
			}, function(page) {
				chrome.runtime.sendMessage(
					{
						action: 'xhttp',
						method: 'GET',
						url: gUrl + '&tool=segments&url=' + url
 					}, function(list) {
						drawBlocks(list);
					}
				);
			}
		);
}

function drawBlocks(list) {
	//document.body = firstDOM.cloneNode(true);
	for (let i=0; i<list.length; i++) {
		let co = list[i].block.replace(/[\(\)]/g, '').split(',');
		let d = document.createElement("div");
		document.body.appendChild(d);
		let h = co[1] - co[3];
		let w = co[0] - co[2];
		let a = 'position:absolute; top:' + co[3] +'px;left: ' + co[2] + 'px;background-color:red; height: '+ h +'px; width: ' + w + 'px;';
		console.log(a);
		d.setAttribute("style", a);
	}
}

function deleteDiv() {
		// Create a record for the evaluation
		var gtUrl = 'http://localhost/helloroles/server/resource/evaluations?single&key=df9795cc-d73a-48d1-82b9-e9e5b0b72d8a&delete&url=' + url;
		chrome.runtime.sendMessage (
			{
				action: 'xhttp',
				method: 'POST',
				url: gtUrl
			}, function(page) {
					// Send to the server the coordinates of the blocks
					var tUrl = 'http://localhost/helloroles/server/resource/evaluations?single&key=df9795cc-d73a-48d1-82b9-e9e5b0b72d8a';
					var send = {};
					send.url = url;
					send.role = inp.value;
					send.tool = 'segments';
					send.block = '(' + end.x + ',' + end.y + '),' + ' (' + start.x + ',' + start.y + ')';
					chrome.runtime.sendMessage(
						{
							action: 'xhttp',
							method: 'POST',
							data: send,
							url: tUrl
						}, function(page) {
						
						}
					);
				}			
		);
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

