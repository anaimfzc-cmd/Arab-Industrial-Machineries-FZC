// AdminChat.tsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import socket from "@/lib/socket";

import {
  AdminLayout,
} from "@/components/layout/AdminLayout";

import {
  Input,
} from "@/components/ui/input";

import {
  Search,
  MessageSquare,
  Send,
  User2,
  BellDot,
  MoreVertical,
  X,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  BadgeCheck,
  FileText,
} from "lucide-react";

import {
  useToast,
} from "@/hooks/use-toast";

/* API */
const API =
  import.meta.env.VITE_API_URL;

/* TYPES */
type Service = {
  title: string;
};

type Order = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status?: string;
  description?: string;
  preferredDate?: string;
  createdAt?: string;
  serviceId?: Service;
};

type ChatUser = {
  _id: string;
  user_id: string;
  name?: string;
  email?: string;
  unreadCount?: number;
  order?: Order;
};

type Message = {
  text: string;
  sender: string;
  createdAt?: string;
  userId?: string;
};

export default function AdminChat() {

  const { toast } = useToast();

  const [chats, setChats] = useState<ChatUser[]>([]);
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [typing, setTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* CONNECT SOCKET */
  useEffect(() => {
    if (!socket.connected) socket.connect();
  }, []);

  /* FETCH CHATS */
  useEffect(() => {
    axios.get(`${API}/api/chat`).then((res) => {
      const chatsWithUnread = (res.data || []).map((chat: ChatUser) => ({
        ...chat,
        unreadCount: 0,
      }));
      setChats(chatsWithUnread);
    });
  }, []);

  /* CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* OPEN CHAT */
  const openChat = async (user: ChatUser) => {
    setActiveUser(user);
    setMenuOpen(false);
    setDetailsOpen(false);
    setChats((prev) =>
      prev.map((c) =>
        c.user_id === user.user_id ? { ...c, unreadCount: 0 } : c
      )
    );
    setMessages([]);
    socket.emit("join", user.user_id);
    try {
      const res = await axios.get(`${API}/api/chat/${user.user_id}`);
      setMessages(res.data?.messages || res.data || []);
      socket.emit("seen", { userId: user.user_id });
    } catch {
      setMessages([]);
    }
  };

  /* SEND */
  const sendMessage = () => {
    if (!text.trim() || !activeUser) return;
    socket.emit("sendMessage", {
      userId: activeUser.user_id,
      text,
      sender: "admin",
    });
    setText("");
  };

  /* RECEIVE */
  useEffect(() => {
    socket.off("receiveMessage");
    socket.off("typing");

    const handleReceive = (msg: Message) => {
      if (activeUser && msg.userId === activeUser.user_id) {
        setMessages((prev) => [...prev, msg]);
        socket.emit("seen", { userId: activeUser.user_id });
      } else if (msg.sender === "user") {
        setChats((prev) =>
          prev.map((chat) =>
            chat.user_id === msg.userId
              ? { ...chat, unreadCount: (chat.unreadCount || 0) + 1 }
              : chat
          )
        );
        const audio = new Audio("/notification.mp3");
        audio.volume = 0.5;
        audio.play().catch(() => {});
      }
    };

    const handleTyping = () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 1200);
    };

    socket.on("receiveMessage", handleReceive);
    socket.on("typing", handleTyping);

    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("typing", handleTyping);
    };
  }, [activeUser]);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* FILTER */
  const filteredUsers = chats.filter((c) =>
    (c.name || c.user_id).toLowerCase().includes(search.toLowerCase())
  );

  /* STATS */
  const unreadTotal = chats.reduce((acc, curr) => acc + (curr.unreadCount || 0), 0);

  return (
    <AdminLayout>

      <div className="relative h-full overflow-y-auto overflow-x-hidden bg-[#020617] text-white">

        {/* BACKGROUND GLOWS */}
        <div className="pointer-events-none fixed top-[-120px] right-[-120px] w-[340px] h-[340px] bg-red-600/10 blur-3xl rounded-full z-0" />
        <div className="pointer-events-none fixed bottom-[-120px] left-[-120px] w-[340px] h-[340px] bg-red-500/5 blur-3xl rounded-full z-0" />

        {/* GRID */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 p-6 md:p-10 space-y-8">

          {/* ── HEADER ── */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-sm mb-5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                AIM FZC Live Support
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Admin<span className="text-red-500"> Chat</span>
              </h1>
              <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
                Manage real-time customer communication, industrial support conversations,
                and client assistance from one centralized system.
              </p>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-[28px] p-6 backdrop-blur-xl w-full lg:w-[320px]">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <p className="text-slate-400 text-sm">Active Notifications</p>
                  <h3 className="text-3xl font-black mt-2">{unreadTotal}</h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
                  <BellDot className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* ── CHAT PANEL ── */}
          <div className="h-[calc(100vh-340px)] min-h-[460px] rounded-[34px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl flex shadow-[0_20px_80px_rgba(0,0,0,0.55)]">

            {/* SIDEBAR */}
            <div className="w-[350px] shrink-0 border-r border-white/10 bg-[#071120] flex flex-col">

              <div className="shrink-0 p-5 border-b border-white/5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-11 h-12 bg-white/[0.03] border-white/10 rounded-2xl text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredUsers.map((c) => (
                  <div
                    key={c._id}
                    onClick={() => openChat(c)}
                    className={`
                      relative px-5 py-4 border-b border-white/5 cursor-pointer transition-all duration-300
                      ${
                        activeUser?._id === c._id
                          ? "bg-red-500/10 border-l-4 border-l-red-500"
                          : "hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-sm font-bold shadow-lg">
                        {(c.name || c.user_id).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-[14px] truncate">
                            {c.name || c.user_id}
                          </p>
                          {(c.unreadCount || 0) > 0 && (
                            <div className="shrink-0 min-w-[22px] h-[22px] rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                              {c.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="flex items-center justify-center h-40 text-slate-500 text-sm">
                    No users found
                  </div>
                )}
              </div>

            </div>

            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#020617]">

              {/* TOP BAR */}
              <div className="shrink-0 h-20 border-b border-white/5 px-6 flex items-center justify-between bg-[#071120]">

                {activeUser ? (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400">
                      <User2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {activeUser.name || activeUser.user_id}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activeUser.email || activeUser.order?.email || "Customer"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold text-lg">Select a conversation</h3>
                    <p className="text-sm text-slate-500 mt-1">Choose a user to start chatting</p>
                  </div>
                )}

                {/* THREE DOT MENU */}
                {activeUser && (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen((prev) => !prev)}
                      className="w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] flex items-center justify-center transition-all"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>

                    {/* DROPDOWN */}
                    {menuOpen && (
                      <div className="absolute right-0 top-14 w-[190px] rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden z-50">
                        <button
                          onClick={() => {
                            setMenuOpen(false);
                            setDetailsOpen(true);
                          }}
                          className="w-full text-left px-5 py-4 text-sm text-slate-200 hover:bg-white/[0.06] transition-all flex items-center gap-3"
                        >
                          <User2 className="w-4 h-4 text-red-400" />
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                {!activeUser && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500">
                    <div className="w-20 h-20 rounded-3xl bg-white/[0.03] flex items-center justify-center mb-5">
                      <MessageSquare className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-semibold">No Conversation Selected</h3>
                    <p className="mt-2 text-sm">Select a customer chat from the sidebar</p>
                  </div>
                )}

                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[72%] px-5 py-3.5 rounded-3xl text-[14px] shadow-xl transition-all
                        ${
                          m.sender === "admin"
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white rounded-br-md"
                            : "bg-[#111827] text-slate-100 border border-white/5 rounded-bl-md"
                        }
                      `}
                    >
                      <p className="leading-relaxed">{m.text}</p>
                      <span className="text-[10px] opacity-60 mt-2 block">
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* TYPING */}
              {typing && (
                <p className="shrink-0 px-6 pb-2 text-xs text-slate-500">
                  User is typing...
                </p>
              )}

              {/* INPUT */}
              {activeUser && (
                <div className="shrink-0 p-5 border-t border-white/5 bg-[#071120]">
                  <div className="flex items-center gap-3">
                    <input
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                      placeholder="Type your message..."
                      className="flex-1 h-12 bg-white/[0.03] border border-white/10 rounded-2xl px-5 text-[14px] text-white outline-none transition-all focus:border-red-500/40 placeholder:text-slate-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="shrink-0 h-12 px-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/20"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* ── DETAILS MODAL ── */}
      {detailsOpen && activeUser && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-5"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDetailsOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-[#071120] overflow-hidden shadow-[0_0_80px_rgba(239,68,68,0.15)] max-h-[90vh] flex flex-col">

            {/* GLOW */}
            <div className="pointer-events-none absolute top-[-80px] right-[-80px] w-[200px] h-[200px] bg-red-500/10 blur-3xl rounded-full" />

            {/* MODAL HEADER */}
            <div className="relative shrink-0 px-8 py-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Customer Details</h2>
                {/* <p className="text-slate-400 mt-1 text-sm">Contact & order information</p> */}
              </div>
              <button
                onClick={() => setDetailsOpen(false)}
                className="w-11 h-11 rounded-2xl bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-all group"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition-colors" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="relative overflow-y-auto p-8 space-y-4">

              {/* CONTACT SECTION */}
              <p className="text-xs text-red-400 font-semibold uppercase tracking-widest mb-2">
                Contact Info
              </p>

              <DetailRow
                icon={<User2 className="w-4 h-4" />}
                label="Full Name"
                value={activeUser.order?.name || activeUser.name || "—"}
              />
              <DetailRow
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={activeUser.order?.email || activeUser.email || "—"}
              />
              <DetailRow
                icon={<Phone className="w-4 h-4" />}
                label="Phone"
                value={activeUser.order?.phone || "—"}
              />

              {/* ORDER SECTION
              <p className="text-xs text-red-400 font-semibold uppercase tracking-widest pt-4 mb-2">
                Order Details
              </p>

              <DetailRow
                icon={<ClipboardList className="w-4 h-4" />}
                label="Order ID"
                value={activeUser.order?._id || "—"}
              />
              <DetailRow
                icon={<BriefcaseBusiness className="w-4 h-4" />}
                label="Service"
                value={activeUser.order?.serviceId?.title || "—"}
              />
              <DetailRow
                icon={<BadgeCheck className="w-4 h-4" />}
                label="Status"
                value={activeUser.order?.status || "—"}
                valueClass={
                  activeUser.order?.status === "completed"
                    ? "text-green-400"
                    : activeUser.order?.status === "pending"
                    ? "text-yellow-400"
                    : "text-slate-200"
                }
              />
              <DetailRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Preferred Date"
                value={
                  activeUser.order?.preferredDate
                    ? new Date(activeUser.order.preferredDate).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "long", day: "numeric" }
                      )
                    : "—"
                }
              />
              <DetailRow
                icon={<CalendarDays className="w-4 h-4" />}
                label="Order Placed"
                value={
                  activeUser.order?.createdAt
                    ? new Date(activeUser.order.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "long", day: "numeric" }
                      )
                    : "—"
                }
              /> */}

              {/* DESCRIPTION */}
              {activeUser.order?.description && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 mt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-red-400" />
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Description
                    </p>
                  </div>
                  <p className="text-slate-200 leading-relaxed text-sm">
                    {activeUser.order.description}
                  </p>
                </div>
              )}

            </div>

            {/* MODAL FOOTER */}
            <div className="shrink-0 px-8 py-5 border-t border-white/5">
              <button
                onClick={() => setDetailsOpen(false)}
                className="w-full h-12 rounded-2xl bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 font-medium transition-all text-sm"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </AdminLayout>
  );
}

/* ── DETAIL ROW ── */
const DetailRow = ({
  icon,
  label,
  value,
  valueClass = "text-slate-200",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) => (
  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
    <div className="shrink-0 w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-sm font-medium break-all ${valueClass}`}>{value}</p>
    </div>
  </div>
);