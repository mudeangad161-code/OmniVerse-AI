import { useEffect, useState } from "react";

export default function Splash() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        opacity: fade ? 0 : 1,
      }}
    >
      <div style={styles.logo}>
        OmniVerse AI
      </div>

      <div style={styles.tagline}>
        Created by Angad Mude
      </div>

      <div style={styles.loading}>
        Initializing AI...
      </div>
    </div>
  );
}


const styles: { [key: string]: React.CSSProperties } = {

  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at center, #1e293b, #020617)",
    color: "white",
    transition: "opacity 1s ease",
  },


  logo: {
    fontSize: "48px",
    fontWeight: "800",
    letterSpacing: "2px",
    textShadow:
      "0 0 20px #38bdf8",
  },


  tagline: {
    marginTop: "15px",
    fontSize: "18px",
    opacity: 0.8,
  },


  loading: {
    marginTop: "40px",
    fontSize: "14px",
    opacity: 0.6,
  },

};