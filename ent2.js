var nick;
var pass;
var group;
var rows=6;
var cols=7;
var game;


function myConfig2(myrows, mycols) {
	rows = myrows;
	cols = mycols;
}

function register(){
	var nick=document.getElementById("mp_nick").value;
	var pass=document.getElementById("mp_pass").value;
	var data = { nick: nick, pass: pass};
	const url = "http://twserver.alunos.dcc.fc.up.pt:8114/register";
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data)
		})
	.then(response => response.json())
	.then(function(response) {
		if(response.error == null) {
			alert("Success!");
			groupStart();
			console.log(response);
		}
		else{
			alert("Wrong password");
			console.log(response.error);
		}
	})
	.catch(console.log);
}


//join
function groupStart2(){
	var nick=document.getElementById("mp_nick").value;
	var pass=document.getElementById("mp_pass").value;
	var group=document.getElementById("mp_grupo").value;
	var data = { group: group, nick: nick, pass: pass, size: { rows: rows, columns: cols} };
	const url = "http://twserver.alunos.dcc.fc.up.pt:8008/join";
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data)
		})
	.then(response => response.json())
	.then(function(response) {
		if(response.error == null) {
			alert("Joining game");
			game = response.game;
			groupOver();
			update();
			console.log(response);

		}
		else{
			alert("Erro, tente de novo");
			console.log(response.error);
		}
	})
	.catch(console.log);
}


function leave(){
	var nick=document.getElementById("mp_nick").value;
	var pass=document.getElementById("mp_pass").value;
	var data = { nick: nick, pass: pass, game: game };
	const url = "http://twserver.alunos.dcc.fc.up.pt:8008/leave";
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data)
		})
	.then(response => response.json())
	.then(function(response) {
		if(response.error == null) {
			console.log(response);

		}
		else{
			console.log(response.error);
		}
	})
	.catch(console.log);

}

function ranking(){
	var data = {size: {rows: rows, columns: cols}};
	const url = "http://twserver.alunos.dcc.fc.up.pt:8114/ranking";
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data)
		})
	.then(response => response.json())
	.then(function(response) {
		if(response.error == null) {
			console.log(response);
			makeTable(response);

		}
		else{
			alert("Invalid size");
			console.log(response.error);
		}
	})
	.catch(console.log);
}

function makeTable(response){
	var tbl = document.getElementById("mytable");
	var tblBody = document.createElement("tbody");
	for (var j = 0; j < 10; j++) {
      var row = document.createElement("tr");
      for (var i = 0; i < 3; i++) {
        var cell = document.createElement("td");
        var cellText;
        if (i == 0) {
            cellText = response.ranking[j].nick;
        }
        else if (i == 1) {
            cellText = response.ranking[j].victories;
        }
        else if (i == 2) {
            cellText = response.ranking[j].games;
        }
        var cellText1 = document.createTextNode(cellText);
        cell.appendChild(cellText1);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  document.getElementById("mytable2").style.display="block";
  document.getElementById("login").style.display="none";
}


function notify(col){
	var nick=document.getElementById("mp_nick").value;
	var pass=document.getElementById("mp_pass").value;
	var data = { nick: nick, pass: pass, game: game, column: col };
	const url = "http://twserver.alunos.dcc.fc.up.pt:8008/notify";
	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data)
		})
	.then(response => response.json())
	.then(function(response) {
		if(response.error == null) {
			console.log(response);
			console.log("success");

		}
		else{
			alert("Não é a sua vez de jogar");
			console.log(response.error);
		}
	})
	.catch(console.log);

}


function update(){
	var nick=document.getElementById("mp_nick").value;
	let xd =document.getElementById('turnoonline');
	var flag =0;
	const url="http://twserver.alunos.dcc.fc.up.pt:8008/update?nick="+nick+"&game="+game;
	const eventSource = new EventSource(url);
	eventSource.onmessage = function(event) {
		const data = JSON.parse(event.data);
		if(flag==0){
			xd.innerHTML="Primeiro a jogar: "+data.turn;
			flag=1;
		}
		console.log(data);
		if (!isNaN(data.column)) {
			if(data.turn == nick){
				onlinePlay(data.column);
			}
			if(data.winner==null)
				xd.innerHTML = "É o "+data.turn+" a jogar";
		}
		if(data.winner!=null){
				xd.innerHTML = data.winner+" ganhou o jogo! Irás agora voltar ao menu!";
				eventSource.close();
				setTimeout(function(){
        			myClear();
    			},4000);
		}

	}
}

function buscarturno(player){
		let abc =document.getElementById('turnoonline');
		abc = "Primeiro a começar "+player;	
	}
