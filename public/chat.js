class Chat extends React.Component {
    constructor(props) {
        super();
        this.myRef = React.createRef();
        this.listMessage = React.createRef();
    }
    send = () => {
        const node = this.myRef.current.value;

        console.log("Ok msg");
        console.log(node)
        socket.emit("messageSend", node)

    }

   
    
    render() {
        return (
            <div className="Chat">
                <div id="zone-text">
                <input type="text" id="ref" ref={this.myRef} ></input>
                <button id="send" onClick={() => {this.send()}} >Send</button>
                </div>
                
                <div id="message" ref={this.listMessage}>
                    test message
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Chat />,
    document.getElementById('chat')
  );