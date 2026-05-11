// Admin.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
} from "lucide-react";

import {
  Search,
  Package,
  Clock3,
  CheckCircle2,
  Mail,
  Trash2,
  TrendingUp,
  LogOut,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  useNavigate,
} from "react-router-dom";

import {
  AdminLayout,
} from "@/components/layout/AdminLayout";

import {
  useToast,
} from "@/hooks/use-toast";

const API_URL =
  import.meta.env.VITE_API_URL;

const Admin = () => {

  interface Order {
    _id: string;
    status: string;
  }

  interface Enquiry {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    createdAt: string;
  }

  const {
    toast,
  } = useToast();

  const [enquiries,
    setEnquiries] =
    useState<Enquiry[]>([]);

  const [orders,
    setOrders] =
    useState<Order[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const [showLogoutModal,
    setShowLogoutModal] =
    useState(false);

  const token =
    localStorage.getItem(
      "adminToken"
    );

  const navigate =
    useNavigate();

  // LOGOUT
const handleLogout = () => {

  localStorage.removeItem(
    "adminToken"
  );

  toast({
    title: "Logged Out",
    description:
      "Admin session ended successfully",
  });

  navigate("/admin");
};

  // DELETE
  const handleDelete =
    async (id: string) => {

      const confirmDelete =
        window.confirm(
          "Delete this enquiry?"
        );

      if (!confirmDelete)
        return;

      try {

        const res =
          await fetch(
            `${API_URL}/api/admin/enquiries/${id}`,
            {
              method:
                "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        if (!res.ok) {
          throw new Error(
            "Delete failed"
          );
        }

        setEnquiries(
          (prev) =>
            prev.filter(
              (e) =>
                e._id !== id
            )
        );

        toast({
          title:
            "Enquiry Deleted",

          description:
            "The enquiry was removed successfully",
        });

      } catch (err) {

        console.error(err);

        toast({
          title:
            "Delete Failed",

          description:
            "Something went wrong",

          variant:
            "destructive",
        });

      }
    };

  // FETCH DATA
  useEffect(() => {

    if (!token) {

      navigate("/admin");

      return;
    }

    // ENQUIRIES
    fetch(
      `${API_URL}/api/admin/enquiries`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    )
      .then((res) =>
        res.json()
      )
      .then((data) => {

        setEnquiries(
          data?.data || []
        );

        setLoading(false);

      });

    // ORDERS
    fetch(
      `${API_URL}/api/orders`
    )
      .then((res) =>
        res.json()
      )
      .then(setOrders);

  }, []);

  // STATS
  const totalOrders =
    orders.length;

  const pendingOrders =
    orders.filter(
      (o) =>
        o.status ===
        "Pending"
    ).length;

  const completedOrders =
    orders.filter(
      (o) =>
        o.status ===
        "Completed"
    ).length;

  // FILTER
  const filtered =
    enquiries.filter(
      (item) =>
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.subject
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <AdminLayout>

      <div
        className="
          min-h-screen
          relative
          overflow-hidden
          bg-[#020617]
          text-white
          p-6
          md:p-10
        "
      >

        {/* BACKGROUND GLOW */}
        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]
            w-[320px]
            h-[320px]
            bg-red-600/10
            blur-3xl
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-[-120px]
            left-[-120px]
            w-[320px]
            h-[320px]
            bg-red-500/5
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
        <div className="relative z-10 space-y-8">

          {/* HEADER */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >

            <div>

              {/* SMALL LABEL */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  border-red-500/20
                  bg-red-500/10
                  text-red-400
                  text-sm
                  mb-5
                "
              >

                <div
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-red-500
                    animate-pulse
                  "
                />

                AIM FZC Admin Panel

              </div>

              {/* TITLE */}
              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  tracking-tight
                "
              >
                Admin
                <span className="text-red-500">
                  {" "}Dashboard
                </span>
              </h1>

              {/* DESC */}
              <p
                className="
                  text-slate-400
                  mt-4
                  max-w-2xl
                  leading-relaxed
                "
              >
                Manage industrial orders,
                customer enquiries,
                platform activity,
                and service operations
                from one centralized admin panel.
              </p>

            </div>

            {/* LOGOUT CARD */}
            <div
              className="
                bg-white/[0.03]
                border
                border-white/10
                rounded-[28px]
                p-6
                backdrop-blur-xl
                w-full
                lg:w-[320px]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >

                <div>

                  <p className="text-slate-400 text-sm">
                    Secure Session
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      mt-2
                    "
                  >
                    Administrator Access
                  </h3>

                </div>

                <button
                  onClick={() =>
                    setShowLogoutModal(true)
                  }
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-red-500/10
                    hover:bg-red-500/20
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group
                  "
                >

                  <LogOut
                    className="
                      text-red-400
                      group-hover:scale-110
                      transition-transform
                    "
                  />

                </button>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-6
            "
          >

            <StatCard
              title="Total Orders"
              value={totalOrders}
              icon={<Package />}
              glow="from-red-500/20 to-red-500/5"
            />

            <StatCard
              title="Pending Orders"
              value={pendingOrders}
              icon={<Clock3 />}
              glow="from-yellow-500/20 to-yellow-500/5"
            />

            <StatCard
              title="Completed"
              value={completedOrders}
              icon={<CheckCircle2 />}
              glow="from-green-500/20 to-green-500/5"
            />

            <StatCard
              title="Enquiries"
              value={enquiries.length}
              icon={<Mail />}
              glow="from-blue-500/20 to-blue-500/5"
            />

          </div>

          {/* SEARCH */}
          <div className="relative max-w-md">

            <Search
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-4
                h-4
                text-slate-500
              "
            />

            <Input
              placeholder="Search enquiries..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                pl-11
                h-12
                bg-white/[0.03]
                border-white/10
                rounded-2xl
                text-white
                placeholder:text-slate-500
                focus:border-red-500/50
                focus:ring-red-500/20
              "
            />

          </div>

          {/* TABLE */}
          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-[28px]
              backdrop-blur-xl
              overflow-hidden
            "
          >

            {/* TOP */}
            <div
              className="
                px-8
                py-6
                border-b
                border-white/5
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Recent Enquiries
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-1
                  "
                >
                  Customer contact activity
                </p>

              </div>

              <TrendingUp
                className="
                  text-red-400
                "
              />

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead
                  className="
                    border-b
                    border-white/5
                    text-slate-400
                    text-sm
                  "
                >

                  <tr>

                    <th className="text-left px-8 py-5">
                      Name
                    </th>

                    <th className="text-left px-8 py-5">
                      Email
                    </th>

                    <th className="text-left px-8 py-5">
                      Phone
                    </th>

                    <th className="text-left px-8 py-5">
                      Subject
                    </th>

                    <th className="text-left px-8 py-5">
                      Date
                    </th>

                    <th className="text-right px-8 py-5">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filtered.map(
                    (item) => (

                      <tr
                        key={item._id}
                        className="
                          border-b
                          border-white/5
                          hover:bg-white/[0.03]
                          transition-all
                        "
                      >

                        <td className="px-8 py-5 font-medium">
                          {item.name}
                        </td>

                        <td className="px-8 py-5 text-slate-300">
                          {item.email}
                        </td>

                        <td className="px-8 py-5 text-slate-400">
                          {item.phone ||
                            "-"}
                        </td>

                        <td className="px-8 py-5 text-slate-400">
                          {item.subject ||
                            "-"}
                        </td>

                        <td className="px-8 py-5 text-slate-500">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-8 py-5 text-right">

                          <button
                            onClick={() =>
                              handleDelete(
                                item._id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-4
                              py-2
                              rounded-xl
                              bg-red-500/10
                              text-red-400
                              hover:bg-red-500/20
                              transition-all
                            "
                          >

                            <Trash2
                              className="
                                w-4
                                h-4
                              "
                            />

                            Delete

                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* EMPTY */}
            {!loading &&
              filtered.length === 0 && (

                <div
                  className="
                    py-16
                    text-center
                  "
                >

                  <p className="text-slate-500">
                    No enquiries found
                  </p>

                </div>
              )}

          </div>

        </div>

      </div>

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
            <div className="relative z-10 p-10 text-center">

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

                <AlertTriangle
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
                to  log out?
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
                    setShowLogoutModal(false)
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
                  onClick={handleLogout}
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

    </AdminLayout>
  );
};

/* STAT CARD */
const StatCard = ({
  title,
  value,
  icon,
  glow,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  glow: string;
}) => {

  return (

    <div
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-red-500/20
      `}
    >

      {/* GLOW */}
      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${glow}
          opacity-40
        `}
      />

      <div className="relative z-10">

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-white/5
            flex
            items-center
            justify-center
            text-red-400
            mb-5
          "
        >

          {icon}

        </div>

        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <h2
          className="
            text-4xl
            font-black
            mt-3
          "
        >
          {value}
        </h2>

      </div>

    </div>
  );
};

export default Admin;