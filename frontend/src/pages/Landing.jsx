import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Bell,
  Settings,
  ArrowRight,
  Shapes,
  NotebookPen,
  Lightbulb,
  BarChart3,
  Pointer,
} from "lucide-react";

const stripedTexture = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 6px)",
};

function GlobeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function Navbar() {
    const navigate=useNavigate();
  const linkStyle = (active) => ({
    color: active ? "#530f1d" : "#544244",
    fontFamily: "Inter",
    fontSize: "14px",
    fontWeight: active ? 600 : 500,
    borderBottom: active ? "2px solid #530f1d" : "2px solid transparent",
    paddingBottom: "4px",
  });

  return (
    <header
      className="sticky top-0 z-10"
      style={{ backgroundColor: "#fef8f3", borderBottom: "1px solid #e7e2dc" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <span
            style={{
              color: "#530f1d",
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: 700,
            }}
          >
            PrepRoom
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" aria-label="Notifications" style={{ color: "#544244" }}>
            <Bell size={20} strokeWidth={1.6} />
          </button>
          <button type="button" aria-label="Settings" style={{ color: "#544244" }}>
            <Settings size={20} strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/login", { state: { mode: "signup" } })}
            className="px-4 py-2"
            style={{
              backgroundColor: "#530f1d",
              color: "#ffffff",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "0.25rem",
              cursor: "pointer"
            }}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
    const navigate=useNavigate();
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5"
          style={{
            backgroundColor: "#f3ede7",
            color: "#530f1d",
            fontFamily: "Inter",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.03em",
            borderRadius: "9999px",
          }}
        >
          <GraduationCap size={14} strokeWidth={2} />
          ACADEMIC EXCELLENCE REDEFINED
        </span>

        <h1
          className="mt-5"
          style={{
            color: "#1d1b18",
            fontFamily: "Inter",
            fontSize: "44px",
            lineHeight: "52px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Master the Art of the{" "}
          <span style={{ color: "#530f1d", fontStyle: "italic" }}>
            Scholarly Interview.
          </span>
        </h1>

        <p
          className="mt-5 max-w-md"
          style={{
            color: "#544244",
            fontFamily: "Inter",
            fontSize: "16px",
            lineHeight: "26px",
          }}
        >
          A focused environment for researchers and professional students to
          refine their thesis defense and career narratives through rigorous
          AI-driven peer simulation.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/login", { state: { mode: "signup" } })}
            className="inline-flex items-center gap-2 px-6 py-3"
            style={{
              backgroundColor: "#530f1d",
              color: "#ffffff",
              fontFamily: "Inter",
              fontSize: "15px",
              fontWeight: 600,
              borderRadius: "0.25rem",
              cursor: "pointer"
            }}
          >
            Sign Up Now
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e7e2dc",
            padding: "10px",
            transform: "rotate(1.5deg)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&q=80"
            alt="Desk with laptop and notebook, set up for focused study"
            className="w-full h-64 md:h-72 object-cover rounded"
          />
        </div>

        <div
          className="absolute -bottom-6 left-6 md:left-10 px-6 py-4 max-w-xs"
          style={{
            backgroundColor: "#530f1d",
            borderRadius: "0.25rem",
            transform: "rotate(-1.5deg)",
          }}
        >
          <p
            className="italic"
            style={{
              color: "#ffffff",
              fontFamily: "Inter",
              fontSize: "17px",
              fontWeight: 600,
            }}
          >
            "Precision in every syllable."
          </p>
        </div>
      </div>
    </section>
  );
}

const lifecycleSteps = [
  {
    icon: Shapes,
    title: "1. Pick Topic",
    description:
      "Select from a curated database of 500+ academic disciplines and specific defense scenarios.",
    bullets: ["Thesis Defenses", "Grant Interviews", "Faculty Applications"],
  },
  {
    icon: NotebookPen,
    title: "2. Write Answer",
    description:
      "Craft your response in our distraction-free editor. Use LaTeX support for technical citations and formal structuring.",
    quote:
      "The articulation of complex hypotheses requires a medium that respects silence and clarity.",
  },
  {
    icon: Lightbulb,
    title: "3. Get AI Feedback",
    description:
      "Receive immediate, peer-level critique on logic flow, professional tone, and evidence-based argumentation.",
    tags: ["Tone: Formal (98%)", "Logic: Robust", "Clarity: High"],
    dark: true,
  },
  {
    icon: BarChart3,
    title: "4. Track Progress",
    description:
      "Monitor your growth with quantitative analytics and qualitative milestones.",
    bars: [30, 45, 65, 55, 90],
  },
];

function LifecycleCard({ step }) {
  const Icon = step.icon;
  const dark = Boolean(step.dark);

  return (
    <div
      className="p-7"
      style={{
        backgroundColor: dark ? "#530f1d" : "#ffffff",
        border: dark ? "none" : "1px solid #e7e2dc",
        borderRadius: "0.5rem",
      }}
    >
      <div
        className="w-9 h-9 flex items-center justify-center"
        style={{
          backgroundColor: dark ? "rgba(255,255,255,0.15)" : "#f3ede7",
          color: dark ? "#ffffff" : "#530f1d",
          borderRadius: "0.375rem",
        }}
      >
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <h3
        className="mt-4"
        style={{
          color: dark ? "#ffffff" : "#1d1b18",
          fontFamily: "Inter",
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        {step.title}
      </h3>

      <p
        className="mt-2"
        style={{
          color: dark ? "rgba(255,255,255,0.75)" : "#544244",
          fontFamily: "Inter",
          fontSize: "15px",
          lineHeight: "24px",
        }}
      >
        {step.description}
      </p>

      {step.bullets && (
        <ul
          className="mt-4 pt-4 space-y-1.5"
          style={{ borderTop: "1px solid #e7e2dc" }}
        >
          {step.bullets.map((b) => (
            <li
              key={b}
              style={{ color: "#544244", fontFamily: "Inter", fontSize: "13px" }}
            >
              • {b}
            </li>
          ))}
        </ul>
      )}

      {step.quote && (
        <div className="mt-5 flex gap-3">
          <img
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&q=80"
            alt=""
            className="hidden md:block w-24 h-16 object-cover rounded"
            style={{ border: "1px solid #e7e2dc" }}
          />
        </div>
      )}
      {step.quote && (
        <p
          className="mt-4 pl-3 italic"
          style={{
            borderLeft: "2px solid #530f1d",
            color: "#544244",
            fontFamily: "Inter",
            fontSize: "14px",
          }}
        >
          "{step.quote}"
        </p>
      )}

      {step.tags && (
        <div className="mt-6 flex flex-wrap gap-2">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5"
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                fontFamily: "Inter",
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "0.25rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {step.bars && (
        <div className="mt-6 flex items-end gap-2 h-24">
          {step.bars.map((h, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i === step.bars.length - 1 ? "#530f1d" : "#d9c1c2",
                borderRadius: "0.25rem 0.25rem 0 0",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Lifecycle() {
  return (
    <section style={{ backgroundColor: "#f3ede7" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2
            style={{
              color: "#1d1b18",
              fontFamily: "Inter",
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            The Preparatory Lifecycle
          </h2>
          <p
            className="mt-3"
            style={{
              color: "#544244",
              fontFamily: "Inter",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Our four-stage iterative methodology designed to move your
            performance from "sufficient" to "distinguished."
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {lifecycleSteps.map((step) => (
            <LifecycleCard key={step.title} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
 const navigate=useNavigate();
  return (
    <div style={{ backgroundColor: "#fef8f3" }}>
      <Navbar />
      <Hero />
      <Lifecycle />

      {/* Testimonial */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div
          className="pl-6 md:pl-8"
          style={{ borderLeft: "2px solid #a13b4c" }}
        >
          <p
            className="italic"
            style={{
              color: "#1d1b18",
              fontFamily: "Inter",
              fontSize: "28px",
              lineHeight: "38px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            "PrepRoom transformed my defense from a point of anxiety into a
            moment of academic triumph. The AI feedback was indistinguishable
            from my committee's most rigorous questions."
          </p>

          <div className="flex items-center gap-3 mt-8">
            <img
              src="https://i.pravatar.cc/64?img=47"
              alt=""
              className="w-11 h-11 rounded-md object-cover"
            />
            <div>
              <p
                style={{
                  color: "#1d1b18",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Rahul Dinkar
              </p>
              <p
                style={{
                  color: "#544244",
                  fontFamily: "Inter",
                  fontSize: "13px",
                }}
              >
                SDE II
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#702632" }}
      >
        <div className="absolute inset-0" style={stripedTexture} />
        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-28 text-center">
          <h2
            style={{
              color: "#ffffff",
              fontFamily: "Inter",
              fontSize: "40px",
              lineHeight: "48px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Begin Your Preparation
            <br />
            Today.
          </h2>

          <p
            className="mt-5 max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "Inter",
              fontSize: "16px",
              lineHeight: "26px",
            }}
          >
            Join a community of scholars dedicated to precise communication
            and professional mastery.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login", { state: { mode: "signup" } })}
            className="mt-8 px-7 py-3.5 rounded"
            style={{
              backgroundColor: "#ffffff",
              color: "#530f1d",
              fontFamily: "Inter",
              fontSize: "16px",
              fontWeight: 700,
              borderRadius: "0.25rem",
              cursor: "pointer"
            }}
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
}

