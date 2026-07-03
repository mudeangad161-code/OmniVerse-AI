import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function Chat() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="chat-page">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="main-content">
        <Navbar />

        <ChatWindow />

        <ChatInput />
      </div>
    </div>
  );
}

export default Chat;
