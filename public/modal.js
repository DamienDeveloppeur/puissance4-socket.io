class ModalDialogue extends  React.Component{

    constructor(props) {
        super(props);
        this.nom=React.createRef();
        //this.tokenColor=React.createRef();
        this.tokenColor=true;
        this.state = {
            choice : {value:true}
        }
    }//end construnctor
    componentDidMount(){
        socket.emit('confirm');
    }

    handleChange = e =>{
        //console.log("e : "); console.log(e.target);
        if(e.target.value==="rouge"){
            this.tokenColor=false;
        }
    }
    close(){

        const nom=this.nom.current.value;
        const token=this.tokenColor;

        let doc = document.querySelector('#modal');
        console.log(nom +" "+token);
        socket.emit("player",nom,token);
        doc.style.display="none";
    }

    render() {
        return (
            <div className="Modal">
                <div className="modal_container">
                    <div className="modal_body">
                        <label>Votre nom</label>
                        <input type="text" id="nom" ref={this.nom} />
                        <p>choissez la couleur de vos jetons</p>

                        <div>
                            <input type="radio" name="token" value="bleu" onChange={this.handleChange} />
                            <label>Bleu</label>
                        </div>
                        <div>
                            <input type="radio" name="token" value="rouge" onChange={this.handleChange} />
                            <label>Rouge</label>
                        </div>

                        <button id="valider" onClick={()=>this.close()}>Valider</button>
                    </div>
                </div>
            </div>
        );
    }//end render
}

ReactDOM.render(
    <ModalDialogue />,
    document.getElementById('modal')
);