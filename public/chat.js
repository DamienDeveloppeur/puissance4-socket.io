class Chat extends React.Component {
    constructor(props) {
        super();
        this.myRef = React.createRef();
        this.listMessage = React.createRef();
        this.state = {
            message : [
                {msg: "test"},
                {msg:"toast"}
            ]
        }
    }
    componentDidMount(){
        
        socket.on('messageSend', (message) => {
            //this.setState({message: node});
            // const node = this.myRef.current.value;
            // console.log("node : " +node)
            this.setState(prevState => ({
                message: [...prevState.message, {msg: message}]
              }))
              console.log(this.state.message)
            console.log('Message received from server: ', message);
            socket.emit('confirm');

          });
    }

    send = () => {
        const node = this.myRef.current.value;

        console.log("Ok msg");
        console.log(node)
        
        socket.emit("messageSend", node)
        

    }
    render() {
        const message = this.state.message;
        //console.log(message)
        return (
            <div className="Chat">
                <div id="zone-text">
                <input type="text" id="ref" ref={this.myRef} ></input>
                <button id="send" onClick={() => {this.send()}} >Send</button>
                </div>
                
                <div id="message" ref={this.listMessage}>
                    {message.map((obj,i) => obj.msg )}
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Chat />,
    document.getElementById('chat')
  );