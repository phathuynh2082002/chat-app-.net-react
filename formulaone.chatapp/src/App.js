import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WaitingRoom from "./components/waitingroom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useState } from "react";
import * as signalR from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [conn, SetConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const  conn = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl("http://localhost:5298/chat", {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .build();

      conn.on("JoinSpecificChat", (username, msg) => {
        console.log("msg: ", msg);
        setMessages(messages => [...messages, {username, msg}]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChat", {username, chatroom});

      SetConnection(conn);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 mx-5">
            <Col sm="12">
              <h1 className="font-weight-light">Welcome to the F1 ChatApp</h1>
            </Col>
          </Row>
          {
            !conn ?
            <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
