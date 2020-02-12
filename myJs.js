function loginStart() {
	document.getElementById("login").style.display="block"
	document.getElementById("menu").style.display="none"
}

function loginOver() {
	document.getElementById("login").style.display="none";
	document.getElementById("menu").style.display="block";
}

function configStart(){
	document.getElementById("config1").style.display="block";
	document.getElementById("menu").style.display="none";
}

function configOver(){
	document.getElementById("config1").style.display="none";
	document.getElementById("menu").style.display="block";
}

function instrucoesStart(){
	document.getElementById("instrucoes").style.display="block";
	document.getElementById("menu").style.display="none";
}

function instrucoesOver(){
	document.getElementById("instrucoes").style.display="none";
	document.getElementById("menu").style.display="block";
}

function scoresStart(){
	document.getElementById("classificacao").style.display="block";
	document.getElementById("menu").style.display="none";
}

function scoresOver(){
	document.getElementById("classificacao").style.display="none";
	document.getElementById("menu").style.display="block";
}


function mygameOver(){
	document.getElementById("base").style.display="none";
	document.getElementById("menu").style.display="block";
	document.getElementById("backb").style.display="none";
	document.getElementById("backb2").style.display="none";
	document.getElementById("turnoonline").style.display="none";
}


function groupStart(){
	document.getElementById("mp_menu").style.display="block";
	document.getElementById("menu").style.display="none";
	document.getElementById("login").style.display="none";
}

function groupOver(){
	document.getElementById("mp_menu").style.display="none";
	mygameStart(1);
}

function openInstruct(){
	document.getElementById("instrucoes2").style.display="block";
}

function instructOver(){
	document.getElementById("instrucoes2").style.display="none";
}

function rankingOver(){
	document.getElementById("mytable2").style.display="none";
	document.getElementById("login").style.display="block";
}

function backtoMenu(){
	document.getElementById("mp_menu").style.display="none";
	document.getElementById("menu").style.display="block";
}