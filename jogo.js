var timeId=null; //variavel que armazena a chamada função timeout

function iniciaJogo(){
    var url = window.location.search;
    var nivel_jogo = url.replace("?",""); //recebendo o nivel de dificuldade
    var tempo_segundos= 0 ;
    if(nivel_jogo == 1){ //1 - fácil -> 120 segundos
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){ //2 - normal -> 60segundos
        tempo_segundos = 60;
       
    }
    if(nivel_jogo == 3){ //3- dificil -> 30 segundos
        tempo_segundos = 30; 
    }
      
    //inserindo segundos no span
    document.getElementById("cronometro").innerHTML = tempo_segundos;
    //quantidade de balões 
    var qtde_baloes = 80;
    criar_baloes(qtde_baloes);
    document.getElementById("baloes_inteiros").innerHTML = qtde_baloes;
    document.getElementById("baloes_estourados").innerHTML = 0;    
    contagem_tempo(tempo_segundos+1);
    
}

function criar_baloes(qtde_baloes){
    for(var i = 1;i<=qtde_baloes;i++){
        var balao = document.createElement("img"); 
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = "10px"
        balao.id ="b"+i;
        balao.onclick = function(){estourar_balao(this)}
        document.getElementById('cenario').appendChild(balao);
    }
}
function estourar_balao(e){
    var id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick","");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";
    pontuacao(-1);
    
}
function pontuacao(acao){
    var baloes_inteiro = document.getElementById("baloes_inteiros").innerHTML;
    var baloes_estourado = document.getElementById("baloes_estourados").innerHTML;
   
    baloes_inteiro = parseInt(baloes_inteiro);
    baloes_estourado = parseInt(baloes_estourado);
   
    baloes_inteiro = baloes_inteiro + acao;
    baloes_estourado = baloes_estourado - acao;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiro;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourado;
   
    situacao_jogo(baloes_inteiro);
}
function situacao_jogo(baloes_inteiro){
    if(baloes_inteiro == 0){
        alert("Parabéns, você é o cara!!");
        pararJogo();
    }
}
function pararJogo(){
    clearTimeout(timerId);
}
function contagem_tempo(segundos){   
    segundos--;
    if(segundos == -1 ){
        clearTimeout(timerId);
        gameOver();
        return false;
    }
    document.getElementById("cronometro").innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);
    
}
function gameOver(){
    removerEventos();
    alert("Fim de Jogo !");
}
function removerEventos(){
    var i = 1;
    while(document.getElementById("b"+i)){
        document.getElementById("b"+i).onclick = "";
        i++
    }
}