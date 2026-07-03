function ChatWindow() {
  return (
    <div className="chat-window">
      <div className="welcome-screen">
        <h1>🌌 Welcome to OmniVerse AI</h1>

        <p>Your Intelligent AI Assistant</p>

        <div className="suggestions">
          <button>💡 Explain React</button>
          <button>💻 Write Python Code</button>
          <button>📄 Summarize PDF</button>
          <button>🎨 Generate Image</button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
