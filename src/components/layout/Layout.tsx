import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import socket from "@/lib/socket";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Chat from "@/pages/Chat";
import { MessageSquare, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, isSignedIn } = useUser();

  const [openChat, setOpenChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // sync user
  useEffect(() => {
    if (isSignedIn && user) {
      axios.post(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    }
  }, [isSignedIn, user]);

  // socket
  useEffect(() => {
    if (!isSignedIn || !user) return;

    if (!socket.connected) socket.connect();

    socket.emit("join", user.id);

    const handleReceive = (msg: { sender: string; text: string }) => {
      if (msg.sender === "admin") {
        const audio = new Audio("/notification.mp3");
        audio.play();

        if (!openChat) setUnreadCount((prev) => prev + 1);

        if (Notification.permission === "granted") {
          new Notification("New Support Message", {
            body: msg.text,
            icon: "/favicon.ico",
          });
        }
      }
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [isSignedIn, user, openChat]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const handleChatToggle = () => {
    if (!isSignedIn) {
      setShowLoginPopup(true);
      return;
    }

    if (!openChat) setUnreadCount(0);

    setOpenChat(!openChat);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">{children}</main>

      <Footer />

      {/* LOGIN POPUP */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[90%] max-w-md bg-[#151515] border border-white/10 rounded-2xl p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl font-semibold text-white text-center mb-3">
              Login Required
            </h2>

            <p className="text-muted-foreground text-center mb-8">
              Please login to continue chatting with support.
            </p>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowLoginPopup(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CHAT */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">

        {/* CHAT WINDOW ONLY WHEN OPEN */}
        {openChat && (
          <div className="pointer-events-auto w-[380px] h-[600px] mb-4 rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)] bg-[#111] animate-in fade-in zoom-in duration-300">

            {/* HEADER */}
            <div className="h-16 bg-[#151515] border-b border-white/10 flex items-center justify-between px-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-white text-sm font-semibold">
                  Support Chat
                </h3>
              </div>

              <button
                onClick={() => setOpenChat(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CHAT BODY */}
            <div className="h-[calc(100%-64px)]">
              <Chat
                openChat={openChat}
                setUnreadCount={setUnreadCount}
              />
            </div>
          </div>
        )}

        {/* FLOATING BUTTON */}
        <button
          onClick={handleChatToggle}
          className="pointer-events-auto relative w-16 h-16 rounded-full bg-primary text-white shadow-[0_10px_40px_rgba(255,0,0,0.35)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <MessageSquare className="w-7 h-7" />

          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 min-w-[24px] h-[24px] px-1 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-[#111]">
              {unreadCount > 99 ? "99+" : unreadCount}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};