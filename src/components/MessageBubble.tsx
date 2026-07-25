import MessageActions from "./MessageActions";
import type { Message } from "../types/chat";

type Props = {
  message: Message;
};

function MessageBubble({ message }: Props) {
  return (
    <div className={`message-box ${message.role}`}>
      <div className="avatar">
        {message.role === "user" ? "👤" : "🌌"}
      </div>

      <div className="message-content">
        <div className="message">
          {message.text}
        </div>

        {message.role === "ai" && (
          <MessageActions message={message.text} />
        )}
      </div>
    </div>
  );
}

export default MessageBubble;