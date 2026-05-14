// AdminLayout.tsx

import {
  ReactNode,
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Settings,
  ClipboardList,
  Mail,
  MessageCircle,
  LogOut,
  Shield,
  ChevronRight,
  TriangleAlert,
  X,
  Menu,

} from "lucide-react";

const API =
  import.meta.env.VITE_API_URL;

export const AdminLayout = ({
  children,
}: {
  children: ReactNode;
}) => {

  const navigate =
    useNavigate();

  // UNREAD CHAT COUNT
  const [
    unreadChats,
    setUnreadChats,
  ] = useState(0);

  // LOGOUT MODAL
  const [
    showLogoutModal,
    setShowLogoutModal,
  ] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // CONFIRM LOGOUT
  const confirmLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      navigate("/admin");
    };

  // FETCH CHAT COUNT
  const fetchUnreadChats =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        const res =
          await fetch(
            `${API}/api/chat/unread/count`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // INVALID TOKEN
        if (
          res.status === 401
        ) {

          localStorage.removeItem(
            "adminToken"
          );

          navigate("/admin");

          return;
        }

        const data =
          await res.json();

        setUnreadChats(
          data?.count || 0
        );

      } catch (err) {

        console.error(
          "Unread count error:",
          err
        );
      }
    };

  useEffect(() => {

    fetchUnreadChats();

    const interval =
      setInterval(() => {

        fetchUnreadChats();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const navItem =
    (
      path: string,
      icon: React.ReactNode,
      label: string,
      badge?: number
    ) => (

      <NavLink
        to={path}
        className={({

          isActive,

        }) =>
          `
          group
          relative
          overflow-hidden
          flex
          items-center
          justify-between
          px-4
          py-3.5
          rounded-2xl
          transition-all
          duration-300
          border
          ${
            isActive
              ? `
                bg-gradient-to-r
                from-red-600/20
                to-red-500/5
                border-red-500/20
                text-white
                shadow-[0_0_25px_rgba(239,68,68,0.15)]
              `
              : `
                border-transparent
                text-slate-400
                hover:bg-white/[0.03]
                hover:border-white/10
                hover:text-white
              `
          }
        `
        }
      >

        {/* GLOW */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-red-500/10
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
          "
        />

        {/* LEFT */}
        <div
          className="
            relative
            z-10
            flex
            items-center
            gap-4
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-white/[0.04]
              flex
              items-center
              justify-center
              text-red-400
            "
          >

            {icon}

          </div>

          <span
            className="
              font-medium
              tracking-wide
            "
          >
            {label}
          </span>

        </div>

        {/* RIGHT */}
        <div
          className="
            relative
            z-10
            flex
            items-center
            gap-2
          "
        >

          {/* CHAT BADGE */}
          {badge !== undefined &&
            badge > 0 && (

              <div
                className="
                  min-w-[24px]
                  h-[24px]
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-[11px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  animate-pulse
                  shadow-[0_0_20px_rgba(239,68,68,0.45)]
                "
              >
                {badge}
              </div>
            )}

          <ChevronRight
            className="
              w-4
              h-4
              text-slate-600
              group-hover:text-white
              transition-all
              group-hover:translate-x-1
            "
          />

        </div>

      </NavLink>
    );

  return (

    <>
      <div
        className="
          flex
          min-h-screen
          bg-[#020617]
          text-white
        "
      >

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#020617] border-b border-white/10 p-4">
        <button onClick={() => setMobileSidebarOpen(true)}>
          <Menu className="w-7 h-7 text-white" />
        </button>
      </div>

        {/* SIDEBAR */}
        <aside
          className={`
            fixed md:relative
            top-0 left-0
            h-full
            w-[290px]
            flex flex-col
            z-50
            border-r border-white/10
            bg-[#020617]
            transition-transform duration-300
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >

        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="md:hidden absolute top-5 right-5 z-50"
        >
          <X className="w-6 h-6 text-white" />
        </button>

          {/* GLOW */}
          <div
            className="
              absolute
              top-[-120px]
              left-[-120px]
              w-[260px]
              h-[260px]
              bg-red-600/10
              blur-3xl
              rounded-full
            "
          />

          {/* GRID */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.03]
            "
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",

              backgroundSize:
                "40px 40px",
            }}
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              flex
              flex-col
              h-full
              p-6
            "
          >

            {/* NAVIGATION */}
            <nav
              className="
                flex
                flex-col
                gap-3
              "
            >

              {navItem(
                "/admin/dashboard",
                <LayoutDashboard
                  size={18}
                />,
                "Dashboard"
              )}

              {navItem(
                "/admin/services",
                <Settings
                  size={18}
                />,
                "Services"
              )}

              {navItem(
                "/admin/orders",
                <ClipboardList
                  size={18}
                />,
                "Orders"
              )}

              {navItem(
                "/admin/enquiries",
                <Mail
                  size={18}
                />,
                "Enquiries"
              )}

              {navItem(
                "/admin/chat",
                <MessageCircle
                  size={18}
                />,
                "Chat",
                unreadChats
              )}

              {navItem(
                "/admin/change-password",
                <Shield
                  size={18}
                />,
                "Security"
              )}

            </nav>

            {/* FOOTER */}
            <div className="mt-auto">

              {/* LOGOUT */}
              <button
                onClick={() =>
                  setShowLogoutModal(
                    true
                  )
                }
                className="
                  relative
                  overflow-hidden
                  group
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-3
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-700
                  via-red-600
                  to-red-500
                  text-white
                  font-semibold
                  shadow-[0_0_30px_rgba(239,68,68,0.25)]
                  hover:scale-[1.02]
                  transition-all
                  duration-300
                "
              >

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-3
                  "
                >

                  <LogOut
                    size={18}
                  />

                  Logout

                </span>

                {/* SHINE */}
                <div
                  className="
                    absolute
                    inset-0
                    translate-x-[-100%]
                    group-hover:translate-x-[100%]
                    transition-transform
                    duration-1000
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                  "
                />

              </button>

              {/* COPYRIGHT */}
              <p
                className="
                  text-center
                  text-xs
                  text-slate-500
                  mt-5
                "
              >
                AIM FZC Industrial Panel
              </p>

            </div>

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 bg-[#020617] pt-16 md:pt-0">
          {children}
        </main>

      </div>

      {/* LOGOUT MODAL */}
      {/* LOGOUT MODAL */}
{showLogoutModal && (

  <div
    className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-md
      px-4
    "
  >

    {/* MODAL CARD */}
    <div
      className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#020617]
        shadow-[0_0_60px_rgba(239,68,68,0.18)]
        animate-in
        fade-in
        zoom-in-95
        duration-300
      "
    >

      {/* RED TOP LINE */}
      <div
        className="
          h-1
          w-full
          bg-gradient-to-r
          from-red-700
          via-red-500
          to-red-700
        "
      />

      {/* GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-[220px]
          h-[220px]
          bg-red-500/10
          blur-3xl
          rounded-full
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          p-10
          text-center
        "
      >

        {/* ICON */}
        <div
          className="
            mx-auto
            mb-6
            w-20
            h-20
            rounded-full
            bg-red-500/10
            border
            border-red-500/20
            flex
            items-center
            justify-center
          "
        >

          <TriangleAlert
            className="
              w-10
              h-10
              text-red-400
            "
          />

        </div>

        {/* TITLE */}
        <h2
          className="
            text-3xl
            font-black
            text-white
            tracking-tight
          "
        >
          Confirm Logout
        </h2>

        {/* TEXT */}
        <p
          className="
            text-slate-400
            mt-4
            leading-relaxed
          "
        >
          Are you sure you want
          to log out from the
          admin panel?
        </p>

        {/* BUTTONS */}
        <div
          className="
            mt-8
            flex
            gap-4
          "
        >

          {/* CANCEL */}
          <button
            onClick={() =>
              setShowLogoutModal(
                false
              )
            }
            className="
              flex-1
              py-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              hover:bg-white/[0.06]
              text-white
              transition-all
            "
          >
            Cancel
          </button>

          {/* LOGOUT */}
          <button
            onClick={
              confirmLogout
            }
            className="
              flex-1
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-red-700
              via-red-600
              to-red-500
              hover:scale-[1.02]
              transition-all
              text-white
              font-semibold
              shadow-[0_0_25px_rgba(239,68,68,0.35)]
            "
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  </div>
)}
    </>
  );
};