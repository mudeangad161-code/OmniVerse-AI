import { useState } from "react";
import { register } from "../services/auth";

type SignupProps = {
  onBackToLogin: () => void;
};

export default function Signup({ onBackToLogin }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !mobile || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register(name, email, mobile, password);

      alert("Registration successful! Please login.");

      onBackToLogin();
    } catch (err: any) {
      setError(err.message || "Registration failed.");
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
          Create your account
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, marginTop: 14 }}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{ ...styles.input, marginTop: 14 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, marginTop: 14 }}
        />

        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        <button
          style={styles.primaryButton}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <button
          style={styles.secondaryButton}
          onClick={onBackToLogin}
        >
          Already have an account? Login
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
    width: "400px",
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

  error: {
    color: "#dc2626",
    marginTop: "12px",
    marginBottom: "8px",
    fontSize: "14px",
  },

  primaryButton: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryButton: {
    marginTop: "12px",
    width: "100%",
    padding: "14px",
    background: "#374151",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
  },
};