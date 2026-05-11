// Chat.tsx

import { useEffect, useRef, useState } from "react";
import socket from "../lib/socket";
import axios from "axios";

import {
  useUser,
} from "@clerk/clerk-react";

type Message = {
  sender: "user" | "admin";
  text: string;
  seen?: boolean;
  createdAt?: string;
};

type ChatProps = {
  openChat?: boolean;
  setUnreadCount?: React.Dispatch<React.SetStateAction<number>>;
};

export default function Chat({
  openChat = false,
  setUnreadCount,
}: ChatProps) {

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const { user, isSignedIn } = useUser();

  const userId = user?.id;

  const bottomRef =
    useRef<HTMLDivElement | null>(null);

  // PREVENT DUPLICATE SOCKET EVENTS
  const receivedMessageIds =
    useRef<Set<string>>(new Set());

  // FORMAT TIME
  const formatTime = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // HANDLE TYPING
  const handleTyping = (value: string) => {
    setText(value);

    socket.emit("typing", {
      userId,
      sender: "user",
    });
  };

  // LOAD SAVED UNREAD COUNT
  useEffect(() => {
    if (!userId || !setUnreadCount) return;

    const savedCount = localStorage.getItem(
      `unread_${userId}`
    );

    if (savedCount) {
      setUnreadCount(Number(savedCount));
    }
  }, [userId, setUnreadCount]);

  // SOCKET + FETCH
  useEffect(() => {

    if (!userId || !isSignedIn) return;

    // CONNECT SOCKET
    if (!socket.connected) {
      socket.connect();
    }

    // JOIN USER ROOM
    socket.emit("join", userId);

    // FETCH OLD MESSAGES
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/chat/${userId}`)
      .then((res) => {

        if (Array.isArray(res.data)) {
          setMessages(res.data);
        }

      })
      .catch(() => {
        setMessages([]);
      });

    // RECEIVE MESSAGE
    const handleReceive = (msg: Message) => {

      // CREATE UNIQUE KEY
      const uniqueKey =
        `${msg.sender}-${msg.text}-${msg.createdAt}`;

      // PREVENT DUPLICATE
      if (
        receivedMessageIds.current.has(uniqueKey)
      ) {
        return;
      }

      receivedMessageIds.current.add(uniqueKey);

      // ADD MESSAGE
      setMessages((prev) => [...prev, msg]);

      // ADMIN MESSAGE
      if (msg.sender === "admin") {

        // PLAY SOUND
        try {

          const audio = new Audio(
            "/notification.mp3"
          );

          audio.volume = 1;

          audio.play().catch(() => {});

        } catch {
          console.log("Audio blocked");
        }

        // BROWSER NOTIFICATION
        if (
          document.hidden &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {

          new Notification(
            "New Support Message",
            {
              body: msg.text,
              icon: "/favicon.ico",
            }
          );
        }

        // UNREAD COUNT
        if (
          !openChat &&
          setUnreadCount
        ) {

          setUnreadCount((prev) => {

            const newCount = prev + 1;

            localStorage.setItem(
              `unread_${userId}`,
              String(newCount)
            );

            return newCount;
          });
        }
      }
    };

    // TYPING
    const handleTypingEvent = (
      sender: string
    ) => {

      if (sender === "admin") {

        setTyping(true);

        setTimeout(() => {
          setTyping(false);
        }, 1500);
      }
    };

    // SEEN
    const handleSeen = () => {

      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender === "user"
            ? { ...msg, seen: true }
            : msg
        )
      );
    };

    socket.on(
      "receiveMessage",
      handleReceive
    );

    socket.on(
      "typing",
      handleTypingEvent
    );

    socket.on(
      "seen",
      handleSeen
    );

    return () => {

      socket.off(
        "receiveMessage",
        handleReceive
      );

      socket.off(
        "typing",
        handleTypingEvent
      );

      socket.off(
        "seen",
        handleSeen
      );
    };

  }, [
    userId,
    isSignedIn,
    openChat,
    setUnreadCount,
  ]);

  // AUTO SCROLL
  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // RESET UNREAD WHEN CHAT OPEN
  useEffect(() => {

    if (
      openChat &&
      setUnreadCount &&
      userId
    ) {

      setUnreadCount(0);

      localStorage.setItem(
        `unread_${userId}`,
        "0"
      );
    }

  }, [
    openChat,
    setUnreadCount,
    userId,
  ]);

  // REQUEST NOTIFICATION PERMISSION
  useEffect(() => {

    if (
      "Notification" in window &&
      Notification.permission !== "granted"
    ) {

      Notification.requestPermission();
    }

  }, []);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!text.trim()) return;

    socket.emit("sendMessage", {
      userId,
      text,
      sender: "user",
      name: user?.fullName,
      email:
        user?.primaryEmailAddress
          ?.emailAddress,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0f0f]">

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

        {messages.map((m, i) => {

          const isUser =
            m.sender === "user";

          return (

            <div
              key={i}
              className={`flex ${
                isUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`
                  max-w-[80%]
                  px-4
                  py-3
                  rounded-2xl
                  text-sm
                  shadow-lg
                  ${
                    isUser
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-[#1b1b1b] text-gray-200 rounded-bl-md border border-white/5"
                  }
                `}
              >

                <p className="leading-relaxed break-words">
                  {m.text}
                </p>

                <div className="flex items-center justify-end gap-1 mt-2 text-[10px] opacity-70">

                  <span>
                    {m.createdAt
                      ? formatTime(
                          m.createdAt
                        )
                      : ""}
                  </span>

                  {isUser && (
                    <span
                      className={
                        m.seen
                          ? "text-blue-400"
                          : ""
                      }
                    >
                      ✔✔
                    </span>
                  )}

                </div>

              </div>

            </div>
          );
        })}

        {/* TYPING */}
        {typing && (

          <div className="flex justify-start">

            <div
              className="
                bg-[#1b1b1b]
                border
                border-white/5
                px-4
                py-2
                rounded-2xl
                text-sm
                text-gray-300
                animate-pulse
              "
            >
              Admin typing...
            </div>

          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-white/10 bg-[#151515] flex items-center gap-3">

        <input
          value={text}
          onChange={(e) =>
            handleTyping(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          className="
            flex-1
            bg-[#1b1b1b]
            border
            border-white/10
            rounded-full
            px-5
            py-3
            text-sm
            text-white
            outline-none
            focus:border-primary
            transition-colors
          "
        />

        <button
          onClick={sendMessage}
          className="
            bg-primary
            text-white
            px-6
            py-3
            rounded-full
            hover:scale-105
            active:scale-95
            transition-all
            font-medium
          "
        >
          Send
        </button>

      </div>

    </div>
  );
}