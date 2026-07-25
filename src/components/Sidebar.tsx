import { useState } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type ChatHistory = {
  _id: string;
  title: string;
  updatedAt: string;
};

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  newChat: () => void;

  chats: ChatHistory[];
  openChat: (id: string) => void;

  activeChatId: string | null;
};

function Sidebar({
  collapsed,
  setCollapsed,
  newChat,
  chats,
  openChat,
  activeChatId,
}: SidebarProps) {
  const [showHistory, setShowHistory] = useState(true);

  return (
    <aside className={collapsed ? "collapsed" : ""}>
      <div className="sidebar-header">
        <button
          className="menu-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
        </button>

        {!collapsed && <h2>OmniVerse AI</h2>}
      </div>

      <button
        className="new-chat-btn"
        onClick={newChat}
      >
        <Plus size={18} />
        {!collapsed && <span>New Chat</span>}
      </button>

      {!collapsed && (
        <>
          <button
            className="history-btn recent-chat-item"
            onClick={() => setShowHistory(!showHistory)}
          >
            <MessageSquare size={18} />
            <span>Recent Chats</span>

            {showHistory ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {showHistory && (
            <ul className="chat-history">
              {chats.length === 0 ? (
                <li>No chats yet</li>
              ) : (
                chats.map((chat) => (
                  <li
                    key={chat._id}
                    onClick={() => openChat(chat._id)}
                    className={
                      activeChatId === chat._id
                        ? "active-chat"
                        : ""
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {chat.title}
                  </li>
                ))
              )}
            </ul>
          )}
        </>
      )}

      <div className="sidebar-footer">
        <button className="settings-btn">
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;