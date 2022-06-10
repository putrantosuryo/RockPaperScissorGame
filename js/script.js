class Configuration {
    static index = 0;
    static playerChoice = document.querySelectorAll(".playerChoice");
    static computerChoice = document.querySelectorAll(".computerChoice");
    static restartElement = document.querySelector('.reset')
    static resultElement = document.querySelector('.gameResult')
    static tes = document.getElementsByClassName("com0");
    static listPicture = ["Batu","Kertas","Gunting"];
    static tempCom = "Gunting";
}

class StartGame{
    static start(){
        Configuration.index=0;
        Configuration.restartElement.addEventListener("click",Utilities.restartGame)
        Configuration.playerChoice.forEach((choice) => {
            choice.addEventListener("click", this.handleClick, { once: true });
            choice.classList.add("player"+Configuration.index);
            choice.innerHTML += "<input hidden id='player"+Configuration.index+"' value='"+Configuration.listPicture[Configuration.index]+"'> "
            Configuration.index++;
          });
          Configuration.index=0;
          Configuration.computerChoice.forEach((choice) => {
            choice.classList.add("com"+Configuration.index);
            choice.id="idCom"+Configuration.index
            choice.innerHTML += "<input hidden id='Com"+Configuration.index+"' value='"+Configuration.listPicture[Configuration.index]+"'> "
            Configuration.index++;
          });
    }
    static handleClick(e) {
        const pilihan = e.target;
        const pilihanComputer = Utilities.computerRandom();
        pilihan.classList.add('selected');
        document.getElementById("idCom"+pilihanComputer).classList.add('selected')
        Utilities.checkWinner(document.getElementById(pilihan.classList[1]).value,document.getElementById("Com"+pilihanComputer).value);
      }
}

class Utilities{

    static restartGame() {
        Configuration.index=0;
        Configuration.playerChoice.forEach((choice) => {
            choice.classList.remove('selected','disabled','player'+Configuration.index)
            choice.classList.add("playerChoice")
            Configuration.index++;
          });
          Configuration.computerChoice.forEach((choice) => {
            choice.classList.remove('selected')
          });
        
        Configuration.resultElement.classList.remove('gameResultDraw','gameResultPlayer','gameResultComputer')
        Configuration.resultElement.classList.add('gameResult')
        StartGame.start();

      }

    static computerRandom(){
        return Math.floor(Math.random() * (2 + 1));;
    }

    static checkWinner(player,com){

        if(player != com ){
            if(player == "Batu" && com == "Kertas")console.log("Computer Win"),Configuration.resultElement.classList.add('gameResultComputer'),this.disabled();
            if(player == "Kertas" && com == "Gunting")console.log("Computer Win"),Configuration.resultElement.classList.add('gameResultComputer'),this.disabled();
            if(player == "Gunting" && com == "Batu")console.log("Computer Win"),Configuration.resultElement.classList.add('gameResultComputer'),this.disabled();

            if(player == "Batu" && com == "Gunting")console.log("Player Win"),Configuration.resultElement.classList.add('gameResultPlayer'),this.disabled();
            if(player == "Kertas" && com == "Batu")console.log("Player Win"),Configuration.resultElement.classList.add('gameResultPlayer'),this.disabled();
            if(player == "Gunting" && com == "Kertas")console.log("Player Win"),Configuration.resultElement.classList.add('gameResultPlayer'),this.disabled();
        }else{
            console.log("DRAW")
            Configuration.resultElement.classList.add('gameResultDraw'),this.disabled();
        }
        console.log("Pilihan Player : "+player)
        console.log("Pilihan Computer : "+com)
    }

    static disabled(){
        Configuration.playerChoice.forEach((choice) => {
            Configuration.resultElement.classList.remove('gameResult')
            choice.removeEventListener("click", StartGame.handleClick);
            choice.classList.add("disabled");
            choice.classList.remove("playerChoice")
            });
    }
}

StartGame.start();
