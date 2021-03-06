class App extends React.Component {
    constructor(props) {
      super(props);
      this.basic = [
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0],
          [0,0,0,0,0,0]
      ]
      this.state ={
          tourJoueurJaune: true,
          endGame: 0,
          board: this.basic,
          hoverIndex: null,
          listPlayers : [

          ]
      }
    }
    componentDidUpdate () {
        if (this.state.endGame === 1){
            this.resetBoard()
            alert('Victoire des rouges');
        } else if (this.state.endGame === 2) {
            this.resetBoard()
            alert('Victoire des jaunes');
        }
    }
    resetBoard = () => {
        const newBoard = [
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];
        this.setState({board: newBoard, endGame: 0});
    }
    // handleHover = (x) => {
    //     this.setState({hoverIndex: x})
    // }
    handleMouseLeave = () => {
        this.setState({hoverIndex: null})
    }


    componentDidMount() {
        socket.on("play", (x, player, players) => {
        socket.emit('confirm');
        console.log("PLAYERS : " + players)

        if(players.color != this.state.tourJoueurJaune){
            return;
        }
        const joueur = this.state.tourJoueurJaune;
        let myNewBoard = [...this.state.board];
        const myCol = myNewBoard[x];

        for (let i=myCol.length-1; i>=0; i--) {
            if (myNewBoard[x][i] == 0) {
                (joueur)
                ? myNewBoard[x][i] = 2
                : myNewBoard[x][i] = 1
                break;
            }
        }

        // Victoire en colonne
        for (let col=0; col<myNewBoard.length-2; col++){
            for (let ln=0; ln<myNewBoard[col].length-3; ln++) {
                if (myNewBoard[col][ln] === 1 && myNewBoard[col][ln+1] === 1 && myNewBoard[col][ln+2] === 1 && myNewBoard[col][ln+3] === 1) {
                    this.setState({endGame:1})
                } else if (myNewBoard[col][ln] === 2 && myNewBoard[col][ln+1] === 2 && myNewBoard[col][ln+2] === 2 && myNewBoard[col][ln+3] === 2){
                    this.setState({endGame:2})
                }
            }
        }

        // Victoire en ligne
        for (let col=0; col<myNewBoard.length; col++){
            for (let ln=0; ln<myNewBoard[col].length; ln++) {
                if (myNewBoard[col][ln] === 1 && (myNewBoard[col+1] != null && myNewBoard[col+1][ln] === 1) && (myNewBoard[col+2] != null && myNewBoard[col+2][ln] === 1) && (myNewBoard[col+3] != null && myNewBoard[col+3][ln] === 1)) {
                    this.setState({endGame:1})
                } else if (myNewBoard[col][ln] === 2 && (myNewBoard[col+1] != null && myNewBoard[col+1][ln] === 2) && (myNewBoard[col+2] != null && myNewBoard[col+2][ln] === 2) && (myNewBoard[col+3] != null && myNewBoard[col+3][ln] === 2) ){
                    this.setState({endGame:2})
                }
            }
        }

        // Victoire en diagonale
        for (let col=0; col<myNewBoard.length; col++){
            for (let ln=0; ln<myNewBoard[col].length; ln++) {
                if ((myNewBoard[col] != null && myNewBoard[col][ln] === 1) &&
                 (myNewBoard[col+1] != null && myNewBoard[col+1][ln+1] === 1) &&
                  (myNewBoard[col+2] != null && myNewBoard[col+2][ln+2] === 1) &&
                   (myNewBoard[col+3] != null && myNewBoard[col+3][ln+3] === 1)) {
                    this.setState({endGame:1})
                } else if (myNewBoard[col][ln] != null && myNewBoard[col][ln] === 2 &&
                 (myNewBoard[col+1]!= null && myNewBoard[col+1][ln+1] === 2) &&
                  (myNewBoard[col+2] != null && myNewBoard[col+2][ln+2] === 2) &&
                   (myNewBoard[col+3] != null && myNewBoard[col+3][ln+3] === 2)){
                    this.setState({endGame:2})
                }
            }
        }
        // Victoire en diagonale invers??
        for (let col=0; col<myNewBoard.length; col++){
            for (let ln=0; ln<myNewBoard[col].length; ln++) {
                if (myNewBoard[col] != null && myNewBoard[col][ln] === 1 &&
                    myNewBoard[col+1] != null && myNewBoard[col+1][ln-1] === 1 &&
                    myNewBoard[col+2] != null && myNewBoard[col+2][ln-2] === 1 &&
                    myNewBoard[col+3] != null && myNewBoard[col+3][ln-3] === 1) {
                    this.setState({endGame:1})
                } else if (myNewBoard[col] != null && myNewBoard[col][ln] === 2 &&
                myNewBoard[col+1] != null && myNewBoard[col+1][ln-1] === 2 &&
                myNewBoard[col+2] != null && myNewBoard[col+2][ln-2] === 2 &&
                myNewBoard[col+3] != null && myNewBoard[col+3][ln-3] === 2){
                    this.setState({endGame:2})
                }
            }
        }
        this.setState({board: myNewBoard, tourJoueurJaune: !joueur})



        })
    }
    handleClick = x => {
        socket.on('messageServer',function(nbJoueur){
            if( (nbJoueur[0].color ==true && nbJoueur[1].color==true) || (nbJoueur[0].color ==false && nbJoueur[1].color==false) ){
               let confirm = window.confirm("restart game?");
               if(confirm){
                   window.location.href='http://localhost:3000/';
               }
            }
        })
        socket.emit("play", x, this.state.tourJoueurJaune);
    }

    render() {
        //let turn = <div className=""> {(this.state.tourJoueurJaune) ?  "Tour des jaunes" : "Tour des rouges"}</div>
        socket.on("prompt", (players) => {
           // console.log("players client side : "+ players[socket.id].id)
            console.log("players client side : "+ JSON.stringify(players))
            this.state.listPlayers = [];
            for (let key in players){
                this.setState(prevState => ({
                    listPlayers: [...prevState.listPlayers, players[key]]
                }))
            }
            console.log("here2")
        })
        const board= this.state.board;
        
        return (
            <div className="App">
                    <p> Puissance 4 du feu de dieu </p>
                    <p>In Synaptics we trust</p>
                    <div className=""> {(this.state.tourJoueurJaune) ?  "Tour des jaunes" : "Tour des rouges"}</div>
                    <p>Joueurs connect??s : </p>
                    {this.state.listPlayers.map((obj,i) => <div key={i} className=""> {obj.name} {(obj.color) ? "Jaune" : "Rouge" } </div>)}
                    <div className="board-game">
                        {
                            (board)
                            ? board.map((x, idx) => <div onMouseLeave={this.handleMouseLeave} key={idx}>{x.map((y, key) => <Rond key={key} val={y} hoverIndex={this.state.hoverIndex} col={idx} action={this.handleClick}/>)}</div>)
                            : null
                        }
                    </div>
            </div>
        );
    }

}

const Rond = ({col, val, action, hoverIndex}) => {
    return(
        <div className={`cercle ${(val == 2) ? "jaune" : (val == 1) ? "rouge" : ""} ${(hoverIndex == col && !val) ? "hover-color" : ""}`} id={col} onClick={() => action(col)}></div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  );

