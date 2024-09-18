import MessageContainer from "./MessageContainer";
import { Col, Row } from "react-bootstrap";
import SendMessageForm from "./SendMessageForm";

const ChatRoom = ({messages, sendMessage})  => <div>
  <Row className="px-5 py-5">
    <Col sm="10">
      <h1 className="font-weight-light">ChatRoom</h1>
    </Col>
    <Col>
    
    </Col>
  </Row>
  <Row className="px-5 py-5">
    <Col sm="12">
      <MessageContainer messages={messages}/>
    </Col>
    <Col sm="12">
      <SendMessageForm sendMessage={sendMessage}/>
    </Col>
  </Row>
</div>

export default ChatRoom;