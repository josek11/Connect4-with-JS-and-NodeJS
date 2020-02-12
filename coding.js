var nrows;
var ncols;
var mywidth;
var myheight;
var minhaconfiguracao;
var turno = 0;
var first=0;
var over=0;
var onlinez;
//default de cores(jogador red comp yellow);
var escolher="red";
var escolher1="yellow";


function myTabConfig(myrows, mycols){
    minhaconfiguracao=myrows +"x" + mycols;
    nrows=myrows;
    ncols=mycols;
    mywidth = "100px";
    myheight = nrows*100 + "px";
    
}


minhaconfiguracao="6x7";
nrows=6;
ncols=7;
mywidth = "100px";
myheight = nrows*100 + "px";

function escolherCor(htmlcor){
  if(htmlcor=="0"){escolher="red"; escolher1="yellow";}
  else{escolher="yellow"; escolher1="red";}

}

function primeiroJogador(htmlturno){
  turno = htmlturno;
}

function mygameStart(online){
    if(online==0){
      onlinez=0;}
    else{
      onlinez=1;}
    document.getElementById("base").style.display="block";
    document.getElementById("menu").style.display="none";
    document.getElementById("backb").style.display="block";
    document.getElementById("backb2").style.display="block";
    over=0;
    first=0;
    if(onlinez==1){
      document.getElementById("turnoonline").style.display="block";
    }
    var jogo = new meuJogo("base");
}


function meuJogo(id) {
    var parent = document.getElementById(id);
    for(let i=ncols-1; i>=0; i--){
    var coluna = document.createElement("div");
    coluna.id = "coluna" + i;
    coluna.className = "coluna";
    coluna.style.width = mywidth;
    coluna.style.height = myheight;
    parent.appendChild(coluna);
    var temp = "coluna" + i;

    document.getElementById(temp).addEventListener("click", function() {
    meuTurno(i);
});

    for(var j=0; j<nrows;j++){
        
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.id = "cell" + i + j;
        cell.style.background = "lightblue";
        coluna.appendChild(cell);    
    }
  }
}


function meuTurno(i){
  if(onlinez==0){
  if(turno == 0){
    myColuna(i);
  }
  else if(turno == 1 && first == 0){
    myComputerPlay();
  }

  else{
    myColuna(i);
  }
  }
  else{
    myColuna(i);}
}
//jogada do pc 
function myComputerPlay(){
  if(onlinez==0){
  if(over == 1){return;}
    var rdm = Math.floor(Math.random() * (ncols) ) + 0;
    var flag = 0;
    for(var j=nrows-1; j>= 0; j--) {
        if (flag == 1){break;}
        var tmp = "cell" + rdm + j;
        var check = document.getElementById(tmp);

        if(check.style.background == "lightblue"){
            check.style.background = escolher1;
            flag = 1;
            var x = myWinner(rdm, j, escolher1, 1);
            if(x==1){return;}
        }  
    }
    if(flag == 0) {
        myComputerPlay();
    }
    if(first == 0 && flag == 1){
      first = 1;
    }
    }
}


//jogada do jogador ao carregar na coluna
function myColuna(i) {
  if(over==1 && onlinez==0){return;}
  var flag = 0;
    for(var j=nrows-1; j>= 0; j--) {
        if (flag == 1){break;}
        var tmp = "cell" + i + j;
        var check = document.getElementById(tmp);
        
        if(check.style.background == "lightblue"){
            check.style.background = escolher;
            flag = 1;
            if(onlinez==1){
            notify(i);}
            if(onlinez==0){
            var x = myWinner(i, j, escolher, 0);}
            if(x==1){return;}
        }
    }
    if(flag==0){
      alert("Coluna invalida, por favor jogue de novo.");
      
    }
    if(flag ==1 && onlinez==0){
      myComputerPlay();
    }
}

function onlinePlay(i){
  var flag = 0;
    for(var j=nrows-1; j>= 0; j--) {
        if (flag == 1){break;}
        var tmp = "cell" + i + j;
        var check = document.getElementById(tmp);

        if(check.style.background == "lightblue"){
            check.style.background = escolher1;
            flag = 1;
        }
    }
}


function myWinner(col, celula, escolher, superxd){
  var xdxd = superxd;
  if(over==1){
    return 1;
  }
  var contra;
    if(escolher == "red"){
            contra = "yellow";
    }
    else{
            contra = "red";
    }
    //nota: a celula mais abaixo no tabuleiro tem valor nrows, ou seja a celula em cima comeca a 0 e ao descer no tabuleiro sobe de valor! 
    var winnerCol = document.getElementsByClassName("coluna");
    var myflag=0;
    //vencedor na vertical
    for(var h=0; h<ncols;h++){
        var contador=0;
        if(myflag==1){alert(escolher + " " + "is the winner");over=1;break;}
        for(var g=nrows-1;g>=0;g--){
            if(myflag==1){break;}
            if(winnerCol[h].childNodes[g].style.background == escolher){
                contador++;
            }
            if(winnerCol[h].childNodes[g].style.background == contra){
                contador=0;
            }
            if(contador==4){
                myflag=1;
            }
        }
    }

    if(myflag==1){
      over=1;
      scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

    //vencedor na horizontal
    for(h=nrows-1;h>=0;h--){
        contador =0;
        if(myflag==1){alert(escolher + " " + "is the winner");over=1;break;}
        for(g=0;g<ncols;g++){
            if(myflag==1){break;}
            if(winnerCol[g].childNodes[h].style.background == escolher){
                contador ++;
            }
            if(winnerCol[g].childNodes[h].style.background == contra || winnerCol[g].childNodes[h].style.background == "lightblue"){
                contador=0;
            }
            if(contador==4){
                myflag=1;
            }
        }
    }

    if(myflag==1){
      scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

    var lastChosen = document.getElementById("cell" + col + celula);

  //check lower left
  for (i = 1; i < 5; i++) {
    lowerLeftCell = "cell" + (col - i) + (celula + i);
    if (document.getElementById(lowerLeftCell) === null) {
      break;
    }
    lowerLeftValidation =
      document.getElementById(lowerLeftCell).style.background === escolher;
    if (lowerLeftValidation && i == 3) {
      over=1;
      myflag=1;
      lastChosen.style.background = "green";
      alert(escolher + "is the winner");
    } else if (!lowerLeftValidation) {
      break;
    }
  }

  if(myflag==1){
    scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

  //check lower right
  for (i = 1; i < 5; i++) {
    lowerLeftCell = "cell" + (col + i) + (celula + i);
    if (document.getElementById(lowerLeftCell) === null) {
      break;
    }
    lowerLeftValidation =
      document.getElementById(lowerLeftCell).style.background === escolher;
    if (lowerLeftValidation && i == 3) {
      over=1;
      myflag=1;
      lastChosen.style.background = "green";
      alert(escolher + "is the winner");
    } else if (!lowerLeftValidation) {
      break;
    }
  }

  if(myflag==1){
    scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

  //check upper right
  for (i = 1; i < 5; i++) {
    lowerLeftCell = "cell" + (col + i) + (celula - i);
    if (document.getElementById(lowerLeftCell) === null) {
      break;
    }
    lowerLeftValidation =
      document.getElementById(lowerLeftCell).style.background === escolher;
    if (lowerLeftValidation && i == 3) {
      over=1;
      myflag=1;
      lastChosen.style.background = "green";
      alert(escolher + "is the winner");
    } else if (!lowerLeftValidation) {
      break;
    }
  }

  if(myflag==1){
    scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

  //check upper left
  for (i = 1; i < 5; i++) {
    lowerLeftCell = "cell" + (col - i) + (celula - i);
    if (document.getElementById(lowerLeftCell) === null) {
      break;
    }
    lowerLeftValidation =
      document.getElementById(lowerLeftCell).style.background === escolher;
    if (lowerLeftValidation && i == 3) {
      over=1;
      myflag=1;
      lastChosen.style.background = "green";
      alert(escolher + "is the winner");
    } else if (!lowerLeftValidation) {
      break;
    }
  }
    if(myflag==1){
      scoreContent(xdxd);
        setTimeout(function(){
        myClear();
    },2000);
        return 1;
    }

  }


//limpar o tabuleiro;
function myClear(){
  mygameOver();
    var parent2 = document.getElementById("base");
    for(var y=0;y<ncols-1;){
        parent2.removeChild(parent2.childNodes[y]);
    }
  
}
    

function scoreContent(superxd){
    var buscar = minhaconfiguracao+superxd;
    var conteudo = document.getElementById(buscar).innerHTML;
    conteudo++;
    document.getElementById(buscar).innerHTML = conteudo;  
} 

function prepleave() {
  if(onlinez==1 && over==0){
    leave();
  }
}








 













