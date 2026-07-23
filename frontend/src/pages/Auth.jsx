import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, BarChart3, MapPin } from "lucide-react";
import { useAuth } from "../context/authContext.jsx";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-1.6 4.6-6 7.9-11.3 7.9-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.6 6.5 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 5.9 4.3C13.8 15.4 18.5 12.5 24 12.5c3.1 0 5.9 1.2 8 3.1l5.1-5.1C33.6 6.5 29 4.5 24 4.5c-7.7 0-14.4 4.4-17.7 10.2z"
      />
      <path
        fill="#4CAF50"
        d="M24 43.5c4.9 0 9.4-1.9 12.8-4.9l-5.9-5c-2 1.5-4.5 2.4-6.9 2.4-5.3 0-9.7-3.4-11.3-8.1l-5.9 4.6C10 39 16.4 43.5 24 43.5z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20.4H24v7.2h11.3c-.8 2.3-2.2 4.2-4.1 5.6l5.9 5c-.4.4 6.4-4.6 6.4-14.2 0-1.2-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div
      className="flex items-center gap-2 px-3"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #d9c1c2",
        borderRadius: "0.25rem",
        height: "44px",
      }}
    >
      <Icon size={16} strokeWidth={1.8} style={{ color: "#877273" }} />
      <input
        {...props}
        className="flex-1 h-full outline-none bg-transparent"
        style={{ color: "#1d1b18", fontFamily: "Inter", fontSize: "14px" }}
      />
    </div>
  );
}

function FeatureChip({ icon: Icon, title, description }) {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: "0.5rem",
      }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(255,255,255,0.12)",
          color: "#ffffff",
          borderRadius: "0.375rem",
        }}
      >
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <p
        className="mt-3"
        style={{
          color: "#ffffff",
          fontFamily: "Inter",
          fontSize: "14px",
          fontWeight: 700,
        }}
      >
        {title}
      </p>
      <p
        className="mt-1"
        style={{
          color: "rgba(255,255,255,0.65)",
          fontFamily: "Inter",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, signUp, authError, authLoading } = useAuth();

  const isLogin = mode === "login";

  async function handleSubmit(e) {
    e.preventDefault();
    const ok = isLogin
      ? await login({ email, password })
      : await signUp({ name, email, password });
    if (ok) navigate("/dashboard");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ backgroundColor: "#fef8f3" }}>
      {/* Left: form */}
      <div className="flex items-center justify-center px-6 md:px-12 py-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2">
            <GraduationCap size={22} strokeWidth={2} style={{ color: "#530f1d" }} />
            <span
              style={{
                color: "#530f1d",
                fontFamily: "Inter",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              PrepRoom
            </span>
          </div>

          <h1
            className="mt-8"
            style={{
              color: "#1d1b18",
              fontFamily: "Inter",
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            {isLogin ? "Welcome back" : "Create account"}
          </h1>
          <p
            className="mt-1.5"
            style={{ color: "#544244", fontFamily: "Inter", fontSize: "14px" }}
          >
            {isLogin
              ? "Sign in to resume your interview preparation."
              : "Join the community of elite professionals."}
          </p>

          {/* Tabs */}
          <div
            className="mt-6 grid grid-cols-2 p-1"
            style={{ backgroundColor: "#ede7e2", borderRadius: "0.25rem" }}
          >
            <button
              type="button"
              onClick={() => setMode("login")}
              className="py-2"
              style={{
                backgroundColor: isLogin ? "#ffffff" : "transparent",
                color: isLogin ? "#530f1d" : "#877273",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "0.2rem",
              }}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="py-2"
              style={{
                backgroundColor: !isLogin ? "#ffffff" : "transparent",
                color: !isLogin ? "#530f1d" : "#877273",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "0.2rem",
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <div>
                <label
                  style={{
                    color: "#1d1b18",
                    fontFamily: "Inter",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Full Name
                </label>
                <div className="mt-1.5">
                  <Input
                    icon={User}
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label
                style={{
                  color: "#1d1b18",
                  fontFamily: "Inter",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Email Address
              </label>
              <div className="mt-1.5">
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="name@academic.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  style={{
                    color: "#1d1b18",
                    fontFamily: "Inter",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  Password
                </label>
                {isLogin && (
                  <a
                    href="#"
                    style={{
                      color: "#530f1d",
                      fontFamily: "Inter",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="mt-1.5">
                <Input
                  icon={Lock}
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {authError && (
              <p
                style={{
                  color: "#ba1a1a",
                  fontFamily: "Inter",
                  fontSize: "13px",
                }}
              >
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60"
              style={{
                backgroundColor: "#530f1d",
                color: "#ffffff",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 700,
                borderRadius: "0.25rem",
              }}
            >
              {authLoading
                ? "Please wait..."
                : isLogin
                ? "Log In →"
                : "Start Your Journey →"}
            </button>
          </form>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: "#e7e2dc" }} />
            <span
              style={{
                color: "#877273",
                fontFamily: "Inter",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.03em",
              }}
            >
              INSTITUTIONAL LOGIN
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "#e7e2dc" }} />
          </div>

          <button
            type="button"
            className="mt-5 w-full py-3 flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d9c1c2",
              borderRadius: "0.25rem",
              color: "#1d1b18",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p
            className="mt-6 text-center"
            style={{ color: "#877273", fontFamily: "Inter", fontSize: "12px", lineHeight: "18px" }}
          >
            By continuing, you agree to PrepRoom's{" "}
            <a href="#" style={{ color: "#530f1d", fontWeight: 600 }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" style={{ color: "#530f1d", fontWeight: 600 }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right: showcase */}
      <div
        className="hidden md:flex flex-col justify-center px-12 py-16 relative overflow-hidden"
        style={{ backgroundColor: "#702632" }}
      >
        <div
          className="p-8"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            borderLeft: "3px solid #fe8392",
            borderRadius: "0.5rem",
          }}
        >
          <p
            className="italic"
            style={{
              color: "#f8d9dd",
              fontFamily: "Inter",
              fontSize: "20px",
              lineHeight: "30px",
              fontWeight: 500,
            }}
          >
            "Preparation is the foundation of confidence, and confidence is
            the catalyst for success."
          </p>
          <div className="flex items-center gap-3 mt-6">
            <img
              src="https://i.pravatar.cc/64?img=12"
              alt=""
              className="w-10 h-10 rounded-md object-cover"
            />
            <div>
              <p style={{ color: "#ffffff", fontFamily: "Inter", fontSize: "13px", fontWeight: 700 }}>
                Dr. Alistair Vance
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "Inter",
                  fontSize: "11px",
                  letterSpacing: "0.03em",
                }}
              >
                DIRECTOR OF CAREER EXCELLENCE
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <FeatureChip
            icon={BarChart3}
            title="AI Feedback"
            description="Real-time tone and content analysis."
          />
          <FeatureChip
            icon={MapPin}
            title="Behavioral Prep"
            description="Master the STAR method with ease."
          />
        </div>
      </div>
    </div>
  );
}