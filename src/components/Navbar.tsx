function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  return (
    <nav>
      <div className="logo">
        <div className="logo-icon">🌌</div>
        <h2>OmniVerse AI</h2>
      </div>

      <div
        className="nav-buttons"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          👋 {user.name || "User"}
        </span>

        <button>🔍 Search</button>

        <button onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;