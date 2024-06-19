import React, { useEffect, useState } from 'react';


function Test() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765?screen=Manual");

        socket.onopen = () => {
            setSocket(socket)
            console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
            setResponse(event.data);
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        const obj = {
            MMF: 1
        }
        // const socket = new WebSocket("ws://192.168.29.75:8765?screen=Manual");

        socket.send(obj);

    };

    return (
        <div className="App">

            <h1>WebSocket Client</h1>

            <button onClick={sendMessage}>Send Message</button>
            <p>Response: {response}</p>
            <button onClick={() => {
                // const socket = new WebSocket("ws://192.168.29.75:8765?screen=Manual");
                socket.close()
            }}>close</button>
        </div>
    );
}

export default Test;