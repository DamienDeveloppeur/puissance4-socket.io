class Chat extends React.Component {
    constructor(props) {
        super();
        this.myRef = React.createRef();
        this.listMessage = React.createRef();
        this.state = {
            message : [
                {autor: "Le trolleur", msg:"Hello le test"}
            ]
        }
    }
    componentDidMount(){
        
        socket.on('messageSend', (message, players) => {
            //this.setState({message: node});
            // const node = this.myRef.current.value;
             console.log("PLAYERS : " +players)
            this.setState(prevState => ({
                message: [...prevState.message, {msg: message, autor: players.name}]
              }))
            console.log(this.state.message)
            console.log('Message received from server: ', message);
            socket.emit('confirm');

          });
    }

    send = () => {
        const node = this.myRef.current.value;
        socket.emit("messageSend", node)
        console.log(node)
    }
    render() {
        const message = this.state.message;
        //console.log(message)
        return (
            <div className="Chat">
                <h1>Messagerie</h1>
                <div id="zone-text">
                    <input type="text" id="ref" ref={this.myRef} ></input>
                    <button id="send" onClick={() => {this.send()}} >Send</button>
                </div>

                <div id="message" ref={this.listMessage}>
                    {message.map((obj,i) =>
                        <div className="message-autor">{obj.autor} : {obj.msg}</div>
                    )}
                </div>
               
            </div>
        );
    }
}

ReactDOM.render(
    <Chat />,
    document.getElementById('chat')
  );