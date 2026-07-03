import { useState } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const [showHistory, setShowHistory] = useState(false);

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

      <button className="new-chat-btn">
        <Plus size={18} />
        {!collapsed && <span>New Chat</span>}
      </button>

      {!collapsed && (
        <>
          <button
            className="history-btn"
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
            <ul>
              <li>AI Project</li>
              <li>React Help</li>
              <li>Scholarship</li>
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