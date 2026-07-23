import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessagesSquare,
  History,
  UserRound,
  HelpCircle,
  LogOut,
  Bell,
  Settings,
  ClipboardList,
  Zap,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  House,
  UserStar,
} from "lucide-react";
import { useAuth } from "../context/authContext.jsx";
import { useState } from "react";
import { useEffect } from "react";

const colors = {
  surface: "#fef8f3",
  surfaceContainer: "#f3ede7",
  surfaceContainerHigh: "#ede7e2",
  onSurface: "#1d1b18",
  onSurfaceVariant: "#544244",
  outlineVariant: "#e7e2dc",
  primary: "#530f1d",
  onPrimaryContainer: "#f38e99",
};

// ---- Sidebar ----------------------------------------------------------

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Practice", icon: MessagesSquare, path: "/practice" },
  { label: "Profile", icon: UserRound, path: "/profile" },
];

function Sidebar({ active = "Dashboard" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside
      className="w-60 shrink-0 flex flex-col justify-between px-4 py-6"
      style={{ backgroundColor: colors.surfaceContainer, borderRight: `1px solid ${colors.outlineVariant}` }}
    >
      <div>
        <div className="px-2">
          <p style={{ color: colors.primary, fontFamily: "Inter", fontSize: "18px", fontWeight: 700 }}>
            PrepRoom
          </p>
          <p style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "12px" }}>
            Interview Practice
          </p>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const isActive = item.label === active;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5"
                style={{
                  backgroundColor: isActive ? "#f8d9dd" : "transparent",
                  color: isActive ? colors.primary : colors.onSurfaceVariant,
                  borderRadius: "0.375rem",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <Icon size={18} strokeWidth={1.8} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => navigate("/practice")}
          className="w-full mt-6 py-3"
          style={{
            backgroundColor: colors.primary,
            color: "#ffffff",
            borderRadius: "0.25rem",
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          Start Practice
        </button>
      </div>

      <div className="space-y-1">
        <button
          type="button"
          onClick={async () => {
            await logout();
            navigate("/login");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5"
          style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "14px" }}
        >
          <LogOut size={18} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}

// ---- Header -------------------------------------------------------------

function Header() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Scholar";
  const navigate=useNavigate();

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "28px", fontWeight: 700 }}>
          Welcome back, {firstName}
        </h1>
        <p className="mt-1" style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "14px" }}>
          Ready to start your first practice session?
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" aria-label="Home" onClick={()=>navigate('/')} style={{ color: colors.onSurfaceVariant }}>
          <House size={20} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}

// ---- Stat cards -----------------------------------------------------------

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div
      className="p-5"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.outlineVariant}`, borderRadius: "0.5rem" }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center"
        style={{ backgroundColor: colors.surfaceContainer, color: accent || colors.primary, borderRadius: "0.375rem" }}
      >
        <Icon size={16} strokeWidth={1.8} />
      </div>
      <p className="mt-3" style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "13px" }}>
        {label}
      </p>
      <p className="mt-1" style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "24px", fontWeight: 700 }}>
        {value}
      </p>
    </div>
  );
}

// ---- Accuracy by topic ------------------------------------------------

function AccuracyByTopic({ topics }) {
  const hasData = topics && topics.length > 0;

  return (
    <div
      className="p-6"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.outlineVariant}`, borderRadius: "0.5rem" }}
    >
      <div className="flex items-center justify-between">
        <h2 style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "18px", fontWeight: 700 }}>
          Accuracy by Topic
        </h2>
        {hasData && (
          <a href="#" style={{ color: colors.primary, fontFamily: "Inter", fontSize: "13px", fontWeight: 600 }}>
            Full Report →
          </a>
        )}
      </div>

      {hasData ? (
        <div className="mt-5 space-y-5">
          {topics.map((t) => (
            <div key={t.name}>
              <div className="flex items-center justify-between">
                <span style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "14px", fontWeight: 500 }}>
                  {t.name}
                </span>
                <span style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "13px" }}>
                  {t.accuracy}%
                </span>
              </div>
              <div className="mt-2 h-2 w-full" style={{ backgroundColor: colors.surfaceContainerHigh, borderRadius: "9999px" }}>
                <div
                  className="h-2"
                  style={{ width: `${t.accuracy}%`, backgroundColor: colors.primary, borderRadius: "9999px" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-4"
          text="No practice sessions yet — complete a session to see your accuracy broken down by topic."
        />
      )}
    </div>
  );
}

// ---- Critical weak areas ------------------------------------------------

function WeakAreas({ areas }) {
  if (!areas || areas.length === 0) return null; // nothing to warn about yet

  return (
    <div
      className="p-6"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.outlineVariant}`, borderRadius: "0.5rem" }}
    >
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} strokeWidth={2} style={{ color: "#ba1a1a" }} />
        <h2 style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "18px", fontWeight: 700 }}>
          Critical Weak Areas
        </h2>
      </div>
      <p className="mt-1" style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "14px" }}>
        Topics below 50% accuracy requiring immediate academic attention.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {areas.map((a) => (
          <div
            key={a.name}
            className="p-4 flex items-center justify-between"
            style={{ backgroundColor: colors.surfaceContainer, borderRadius: "0.375rem" }}
          >
            <div>
              <p style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "14px", fontWeight: 600 }}>
                {a.name}
              </p>
              <p style={{ color: "#ba1a1a", fontFamily: "Inter", fontSize: "13px" }}>{a.accuracy}% Accuracy</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Review today sidebar ------------------------------------------------

function ReviewToday({ sessions }) {
  const navigate = useNavigate();
  const hasSessions = sessions && sessions.length > 0;

  return (
    <div
      className="p-6 flex flex-col"
      style={{ backgroundColor: "#ffffff", border: `1px solid ${colors.outlineVariant}`, borderRadius: "0.5rem", minHeight: "320px" }}
    >
      <h2 style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "16px", fontWeight: 700 }}>
        Review Today
      </h2>
      <p style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "12px" }}>
        Recommended focus session
      </p>

      {hasSessions ? (
        <div className="mt-5 space-y-4 flex-1">
          {sessions.map((s) => (
            <div key={s.title} className="flex items-start gap-3">
              <div
                className="w-9 h-9 shrink-0 flex items-center justify-center"
                style={{ backgroundColor: colors.primary, color: "#ffffff", borderRadius: "0.375rem" }}
              >
                <ClipboardList size={16} strokeWidth={1.8} />
              </div>
              <div>
                <p style={{ color: colors.onSurface, fontFamily: "Inter", fontSize: "13px", fontWeight: 600 }}>
                  {s.title}
                </p>
                <p style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "12px" }}>
                  {s.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6 flex-1"
          icon={Sparkles}
          text="You haven't practiced yet. Start your first session and we'll recommend focus areas here."
        />
      )}

      <button
        type="button"
        onClick={() => navigate("/practice")}
        className="mt-6 w-full py-3 flex items-center justify-center gap-2"
        style={{ backgroundColor: colors.primary, color: "#ffffff", borderRadius: "0.25rem", fontFamily: "Inter", fontSize: "14px", fontWeight: 700 }}
      >
        {hasSessions ? "Start Focused Session" : "Start Your First Session"}
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

// ---- Shared empty state ------------------------------------------------

function EmptyState({ text, icon: Icon = ClipboardList, className = "" }) {
  return (
    <div className={`flex flex-col items-center text-center justify-center py-6 ${className}`}>
      <div
        className="w-10 h-10 flex items-center justify-center"
        style={{ backgroundColor: colors.surfaceContainer, color: colors.onSurfaceVariant, borderRadius: "9999px" }}
      >
        <Icon size={18} strokeWidth={1.6} />
      </div>
      <p className="mt-3 max-w-220px" style={{ color: colors.onSurfaceVariant, fontFamily: "Inter", fontSize: "13px", lineHeight: "20px" }}>
        {text}
      </p>
    </div>
  );
}

// ---- Page ------------------------------------------------------------

export default function Dashboard({}) {
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [stats, setStats] =useState({totalQuestions: 0, dailyStreak: 0, avgAccuracy: 0});
    const [topic,setTopic]=useState([]);
    const [weakareas,setWeakAreas]=useState([]);
    const [reviewSessions, setReviewSessions] = useState([]);

    useEffect(()=>{
        const getDashboard=async()=>{
            try {
                const res=await api.get('//api/attempts/dashboard');
                const {noofAttempts, topicStats,streak,dueForReview}= res.data;
                const topicsArr= Object.entries(topicStats).filter(([,s])=> s.total>0)
                .map(([name, s]) => ({ name, accuracy: s.accuracy }));
                const weakareasArr= Object.entries(weakareas).filter(([,s])=> s.isWeak)
                .map(([name, s]) => ({ name, accuracy: s.accuracy }));

                const totalCorrect = Object.values(topicStats).reduce((sum, s) => sum + s.correct, 0);
                const totalRated = Object.values(topicStats).reduce((sum, s) => sum + s.total, 0);
                const avgAccuracy = totalRated > 0 ? Math.round((totalCorrect / totalRated) * 100) : 0;

                setStats({ totalQuestions: noofAttempts, dailyStreak: streak, avgAccuracy });
                setTopic(topicsArr);
                setWeakAreas(weakareasArr);
                setReviewSessions(
                    dueForReview.map((a) => ({
                        id: a._id,
                        title: a.questionId?.questionText?.slice(0, 60) || "Review question",
                        tag: a.questionId?.topic || "",
                    }))
                );


            } catch (error) {
                setError(error.response?.data?.message || "Failed to load dashboard");
            }finally{
                setLoading(false);
            }
        }
        getDashboard();
    },[])
    

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: colors.surface }}>
      <Sidebar active="Dashboard" />

      <main className="flex-1 px-10 py-8 space-y-6">
        <Header />

        <div className="grid grid-cols-3 gap-5">
          <StatCard icon={ClipboardList} label="Total Questions" value={stats.totalQuestions} />
          <StatCard icon={Zap} label="Daily Streak" value={`${stats.dailyStreak} days`} accent="#ba1a1a" />
          <StatCard icon={TrendingUp} label="Avg. Accuracy" value={`${stats.avgAccuracy}%`} />
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6 items-start">
          <div className="space-y-6">
            <AccuracyByTopic topics={topic} />
            <WeakAreas areas={weakareas} />
          </div>
          <ReviewToday sessions={reviewSessions} />
        </div>
      </main>
    </div>
  );
}