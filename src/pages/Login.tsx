import { useState } from "react";
import { login } from "../services/auth";

type LoginProps = {
  onLogin: () => void;
  onSignup: () => void;
};
export default function Login({
  onLogin,
  onSignup,
}: LoginProps) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin();

    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🧠</div>

        <h1 style={styles.title}>OmniVerse AI</h1>

        <p style={styles.subtitle}>
          Smart AI Assistant
          <br />
          Created by <b>Angad Mude</b>
        </p>

        <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={styles.input}
/>

<input
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    ...styles.input,
    marginTop: "15px",
  }}
/>

{error && (
  <p
    style={{
      color: "red",
      marginTop: "12px",
      fontSize: "14px",
    }}
  >
    {error}
  </p>
)}

<button
  style={styles.button}
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Logging in..." : "Login"}
</button>

<button
  style={{
    ...styles.button,
    marginTop: "12px",
    background: "#374151",
  }}
  onClick={onSignup}
>
  Create Account
</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
  },

  card: {
    width: "380px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
  },

  logo: {
    fontSize: "60px",
    marginBottom: "10px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginTop: "12px",
    marginBottom: "30px",
    lineHeight: "24px",
  },

  input: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};