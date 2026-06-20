import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ─────────────────────────────────────────────
   Inline styles as a design-token object
   ───────────────────────────────────────────── */
const tokens = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  accent: "#06b6d4",
  gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)",
};

/* ─────────────────────────────────────────────
   Toast Component
   ───────────────────────────────────────────── */
const Toast = ({ message, type, onDismiss }) => {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  const colors = {
    error: { bg: "#fef2f2", border: "#fca5a5", text: "#dc2626", icon: "✕" },
    success: { bg: "#f0fdf4", border: "#86efac", text: "#16a34a", icon: "✓" },
  };
  const c = colors[type] || colors.error;

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 20px",
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        animation: "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        maxWidth: 360,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: c.text,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: 13,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {c.icon}
      </span>
      <span style={{ color: "#1e293b", fontSize: 14, fontWeight: 500 }}>
        {message}
      </span>
      <button
        onClick={onDismiss}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#94a3b8",
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Animated Floating Books (pure CSS/SVG)
   ───────────────────────────────────────────── */
const FloatingBook = ({ x, y, rotation, delay, color, size = 1 }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      animation: `float ${3 + delay}s ease-in-out ${delay}s infinite alternate`,
      transformOrigin: "center",
    }}
  >
    <svg
      width={40 * size}
      height={52 * size}
      viewBox="0 0 40 52"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
        opacity: 0.9,
      }}
    >
      <rect x="4" y="2" width="32" height="48" rx="3" fill={color} />
      <rect x="4" y="2" width="6" height="48" rx="2" fill="rgba(0,0,0,0.2)" />
      <rect x="12" y="14" width="18" height="2" rx="1" fill="rgba(255,255,255,0.5)" />
      <rect x="12" y="20" width="14" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
      <rect x="12" y="26" width="16" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
    </svg>
  </div>
);

const books = [
  { x: 8,  y: 12, rotation: -18, delay: 0,   color: "#a78bfa", size: 1.1 },
  { x: 75, y: 8,  rotation: 14,  delay: 0.6, color: "#67e8f9", size: 0.85 },
  { x: 15, y: 68, rotation: -8,  delay: 1.2, color: "#f9a8d4", size: 0.95 },
  { x: 80, y: 60, rotation: 22,  delay: 0.3, color: "#6ee7b7", size: 1.0  },
  { x: 50, y: 5,  rotation: -5,  delay: 1.8, color: "#fcd34d", size: 0.75 },
  { x: 60, y: 78, rotation: 10,  delay: 0.9, color: "#c4b5fd", size: 0.8  },
  { x: 3,  y: 42, rotation: -25, delay: 1.5, color: "#93c5fd", size: 0.7  },
  { x: 88, y: 35, rotation: 18,  delay: 0.5, color: "#fdba74", size: 0.9  },
];

/* ─────────────────────────────────────────────
   Orb (ambient glow blobs)
   ───────────────────────────────────────────── */
const Orb = ({ top, left, size, color, blur, opacity, delay }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      filter: `blur(${blur}px)`,
      opacity,
      animation: `orbPulse ${4 + delay}s ease-in-out ${delay}s infinite alternate`,
      pointerEvents: "none",
    }}
  />
);

/* ─────────────────────────────────────────────
   Icons (inline SVG)
   ───────────────────────────────────────────── */
const EmailIcon = ({ color = "#94a3b8" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const LockIcon = ({ color = "#94a3b8" }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ open = true, color = "#94a3b8" }) =>
  open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const SpinnerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" style={{ animation: "spin 1s linear infinite" }} />
  </svg>
);

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="url(#logoGrad)" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <rect x="7" y="8" width="4" height="16" rx="1.5" fill="white" opacity="0.9" />
    <rect x="13" y="8" width="4" height="16" rx="1.5" fill="white" opacity="0.7" />
    <rect x="19" y="10" width="6" height="12" rx="1.5" fill="white" opacity="0.5" />
    <rect x="7" y="22" width="18" height="2" rx="1" fill="white" opacity="0.6" />
  </svg>
);

/* ─────────────────────────────────────────────
   CSS keyframes injected once
   ───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes float {
      from { transform: translateY(0px) rotate(0deg); }
      to   { transform: translateY(-18px) rotate(4deg); }
    }
    @keyframes orbPulse {
      from { transform: scale(1) translate(0,0); opacity: var(--op, 0.4); }
      to   { transform: scale(1.15) translate(8px, -8px); opacity: calc(var(--op, 0.4) * 1.3); }
    }
    @keyframes toastIn {
      from { opacity: 0; transform: translateX(60px) scale(0.9); }
      to   { opacity: 1; transform: translateX(0)    scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes heroGlow {
      from { opacity: 0.6; }
      to   { opacity: 1; }
    }

    .lf-input:focus { outline: none; }
    .lf-input::placeholder { color: #94a3b8; }
    .lf-btn:disabled { cursor: not-allowed; }
    .lf-btn:not(:disabled):hover { filter: brightness(1.08); transform: translateY(-1px); }
    .lf-btn:not(:disabled):active { transform: translateY(0px); }

    /* Light theme forced — no dark mode overrides */

    @media (max-width: 768px) {
      .lf-left  { display: none !important; }
      .lf-right { width: 100% !important; min-height: 100vh; padding: 32px 20px !important; }
      .lf-card  { padding: 32px 24px !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   Main Login Component
   ───────────────────────────────────────────── */
const Login = () => {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPw, setFocusPw]       = useState(true);
  const [toast, setToast]           = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();
  const emailRef  = useRef();

  useEffect(() => { emailRef.current?.focus(); }, []);

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Redirect to backend Google OAuth endpoint
    window.location.href = "https://library-backend-niy2.onrender.com/api/auth/google";
  };

  const showToast = (message, type = "error") => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please fill in all fields.", "error");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://library-backend-niy2.onrender.com/api/auth/login",
        { email, password }
      );
      login(data.user, data.token);
      showToast("Welcome back! Redirecting…", "success");
      setTimeout(() => navigate("/dashboard"), 900);
    } catch (error) {
      console.log(error);
      showToast("Invalid email or password. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Shared input field style factory ── */
  const inputWrap = (focused) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: `1.5px solid ${focused ? tokens.primary : "#e2e8f0"}`,
    borderRadius: 12,
    background: focused ? "rgba(99,102,241,0.04)" : "#f8fafc",
    transition: "all 0.2s ease",
    boxShadow: focused ? `0 0 0 4px rgba(99,102,241,0.12)` : "none",
  });

  return (
    <>
      <GlobalStyles />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      {/* ── Root container ── */}
      <div style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>

        {/* ════════════════════════════════
            LEFT PANEL — Illustration
        ════════════════════════════════ */}
        <div
          className="lf-left"
          style={{
            width: "52%",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #0f0a2e 0%, #1a0538 40%, #0a1a3e 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 56px",
          }}
        >
          {/* Ambient orbs */}
          <Orb top="10%"  left="20%"  size={320} color={tokens.primary}   blur={90} opacity={0.25} delay={0}   />
          <Orb top="55%"  left="55%"  size={280} color={tokens.secondary}  blur={80} opacity={0.2}  delay={1.5} />
          <Orb top="75%"  left="5%"   size={200} color={tokens.accent}     blur={70} opacity={0.18} delay={0.8} />
          <Orb top="-5%"  left="60%"  size={240} color="#8b5cf6"           blur={80} opacity={0.2}  delay={2}   />

          {/* Floating books */}
          {books.map((b, i) => <FloatingBook key={i} {...b} />)}

          {/* Center hero stack */}
          <div style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            animation: "heroGlow 2s ease-in-out infinite alternate",
          }}>
            {/* Central book stack illustration */}
            <div style={{ marginBottom: 40, display: "flex", justifyContent: "center" }}>
              <svg width="200" height="180" viewBox="0 0 200 180" fill="none" style={{ filter: "drop-shadow(0 20px 40px rgba(99,102,241,0.5))" }}>
                {/* Shelf */}
                <rect x="10" y="152" width="180" height="8" rx="4" fill="rgba(255,255,255,0.15)" />
                {/* Book 1 — tall indigo */}
                <rect x="28" y="60" width="28" height="92" rx="4" fill="#6366f1" />
                <rect x="28" y="60" width="8"  height="92" rx="3" fill="rgba(0,0,0,0.2)" />
                <rect x="38" y="78" width="12" height="2"  rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="38" y="84" width="9"  height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                <rect x="38" y="90" width="11" height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                {/* Book 2 — violet */}
                <rect x="62" y="44" width="32" height="108" rx="4" fill="#8b5cf6" />
                <rect x="62" y="44" width="9"  height="108" rx="3" fill="rgba(0,0,0,0.2)" />
                <rect x="73" y="62" width="14" height="2"  rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="73" y="68" width="11" height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                <rect x="73" y="74" width="13" height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                {/* Book 3 — cyan */}
                <rect x="100" y="30" width="30" height="122" rx="4" fill="#06b6d4" />
                <rect x="100" y="30" width="8"  height="122" rx="3" fill="rgba(0,0,0,0.2)" />
                <rect x="110" y="50" width="13" height="2"  rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="110" y="56" width="10" height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                <rect x="110" y="62" width="12" height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                {/* Book 4 — pink */}
                <rect x="136" y="56" width="26" height="96" rx="4" fill="#a78bfa" />
                <rect x="136" y="56" width="7"  height="96" rx="3" fill="rgba(0,0,0,0.2)" />
                <rect x="145" y="74" width="11" height="2"  rx="1" fill="rgba(255,255,255,0.5)" />
                <rect x="145" y="80" width="9"  height="2"  rx="1" fill="rgba(255,255,255,0.3)" />
                {/* Glow beneath */}
                <ellipse cx="100" cy="160" rx="70" ry="10" fill="rgba(99,102,241,0.3)" />
              </svg>
            </div>

            <h1 style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 16,
              background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 60%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              LibraFlow
            </h1>

            <p className="lf-tagline" style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              maxWidth: 360,
              margin: "0 auto 40px",
              fontWeight: 400,
            }}>
              The Campus library platform built for institutions that move fast — catalogue, track, and deliver knowledge at scale.
            </p>

            {/* Feature pills */}
            {[
              { icon: "📚", text: "100K+ catalogued titles" },
              { icon: "⚡", text: "Real-time availability" },
              { icon: "🔒", text: "Role-based access control" },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 100,
                  padding: "8px 18px",
                  marginBottom: 10,
                  marginRight: 6,
                  backdropFilter: "blur(8px)",
                  animation: `slideIn 0.6s ease ${0.3 + i * 0.15}s both`,
                }}
              >
                <span style={{ fontSize: 14 }}>{f.icon}</span>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom brand mark */}
          <div style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.06em",
          }}>
            Campus LIBRARY MANAGEMENT
          </div>
        </div>

        {/* ════════════════════════════════
            RIGHT PANEL — Login Form
        ════════════════════════════════ */}
        <div
          className="lf-right"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            padding: "40px 32px",
            position: "relative",
            overflowY: "auto",
          }}
        >
          {/* Subtle background pattern */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.06) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }} />

          {/* Card */}
          <div
            className="lf-card"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 440,
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.7)",
              borderRadius: 24,
              padding: "44px 44px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.02), 0 24px 64px rgba(99,102,241,0.12), 0 8px 24px rgba(0,0,0,0.06)",
              animation: "fadeUp 0.55s cubic-bezier(0.34,1.26,0.64,1) both",
            }}
          >
            {/* Logo + brand */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <LogoIcon />
              <span style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.5px",
                background: tokens.gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                LibraFlow
              </span>
            </div>

            <h2 style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.8px",
              marginBottom: 6,
            }}>
              Welcome back
            </h2>
            <p className="lf-tagline" style={{ fontSize: 14, color: "#64748b", marginBottom: 32 }}>
              Sign in to your workspace to continue.
            </p>

            <form onSubmit={handleSubmit} autoComplete="on">

              {/* Email */}
              <div style={{ marginBottom: 18 }}>
                <label className="lf-label" style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  marginBottom: 7,
                  letterSpacing: "0.01em",
                }}>
                  Email address
                </label>
                <div style={inputWrap(focusEmail)}>
                  <span style={{ paddingLeft: 14, display: "flex", flexShrink: 0 }}>
                    <EmailIcon color={focusEmail ? tokens.primary : "#94a3b8"} />
                  </span>


                  <input
                    ref={emailRef}
                    className="lf-input"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => setFocusEmail(false)}
                      style={{
    flex: 1,
    border: "none",
    outline: "none",   // 👈 add this
    boxShadow: "none", // 👈 optional
    background: "transparent",
    padding: "13px 14px",
    fontSize: 15,
    color: "#0f172a",
    width: "100%",
  }}
                  />



                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
                  <label className="lf-label" style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    letterSpacing: "0.01em",
                  }}>
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="lf-link"
                    style={{
                      fontSize: 13,
                      color: tokens.primary,
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={inputWrap(focusPw)}>
                  <span style={{ paddingLeft: 14, display: "flex", flexShrink: 0 }}>
                    <LockIcon color={focusPw ? tokens.primary : "#94a3b8"} />
                  </span>
                  <input
                    className="lf-input"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusPw(true)}
                    onBlur={() => setFocusPw(false)}
                    style={{
    flex: 1,
    border: "none",
    outline: "none",   // 👈 add this
    boxShadow: "none", // 👈 optional
    background: "transparent",
    padding: "13px 14px",
    fontSize: 15,
    color: "#0f172a",
    width: "100%",
  }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    style={{
                      padding: "0 14px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                      opacity: 0.7,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPw} color={focusPw ? tokens.primary : "#64748b"} />
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                <div
                  onClick={() => setRemember(!remember)}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: `2px solid ${remember ? tokens.primary : "#d1d5db"}`,
                    background: remember ? tokens.primary : "transparent",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  {remember && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="M1 4.5l3 3 6-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className="lf-remember"
                  style={{ fontSize: 14, color: "#64748b", cursor: "pointer", userSelect: "none" }}
                  onClick={() => setRemember(!remember)}
                >
                  Keep me signed in for 30 days
                </span>
              </div>

              {/* Submit */}
              <button
                className="lf-btn"
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  borderRadius: 12,
                  background: loading
                    ? "#a5b4fc"
                    : `linear-gradient(135deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`,
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transition: "all 0.2s ease",
                  boxShadow: loading ? "none" : "0 4px 18px rgba(99,102,241,0.4)",
                  letterSpacing: "0.01em",
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
                    Signing in…
                  </>
                ) : (
                  "Sign in to LibraFlow →"
                )}
              </button>

            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "28px 0" }}>
              <div className="lf-or-line" style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              <span className="lf-or-text" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.08em" }}>
                OR
              </span>
              <div className="lf-or-line" style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            </div>

            {/* Google SSO button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              style={{
                width: "100%",
                padding: "13px",
                border: "1.5px solid #e2e8f0",
                borderRadius: 12,
                background: googleLoading ? "#f8fafc" : "#ffffff",
                color: "#374151",
                fontSize: 14,
                fontWeight: 500,
                cursor: googleLoading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                transition: "all 0.2s ease",
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                opacity: googleLoading ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (!googleLoading) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#c7d2fe"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(99,102,241,0.12)"; } }}
              onMouseLeave={(e) => { if (!googleLoading) { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; } }}
            >
              {googleLoading ? (
                <SpinnerIcon />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
            </button>
          </div>

          {/* Bottom legal */}
          <p className="lf-footer" style={{
            marginTop: 28,
            fontSize: 12,
            color: "#94a3b8",
            textAlign: "center",
            lineHeight: 1.8,
          }}>
            By signing in, you agree to our{" "}
            <a href="/terms" className="lf-link" style={{ color: "#94a3b8", textDecoration: "underline" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="lf-link" style={{ color: "#94a3b8", textDecoration: "underline" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;