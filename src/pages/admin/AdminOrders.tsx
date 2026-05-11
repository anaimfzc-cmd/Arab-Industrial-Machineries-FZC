// AdminOrders.tsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  PackageCheck,
  Clock3,
  CheckCircle2,
  Loader2,
  Eye,
  CalendarDays,
  User2,
  Phone,
  Mail,
  BriefcaseBusiness,
  X,
} from "lucide-react";

import {
  AdminLayout,
} from "@/components/layout/AdminLayout";

import {
  Input,
} from "@/components/ui/input";

import {
  useToast,
} from "@/hooks/use-toast";

/* API */
const API_URL =
  import.meta.env.VITE_API_URL;

/* TYPES */
type Service = {
  title: string;
};

type Status =
  | "Pending"
  | "Approved"
  | "In Progress"
  | "Completed";

type Order = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: Status;
  description?: string;
  preferredDate?: string;
  createdAt?: string;
  serviceId?: Service;
};

const statuses: (
  | "All"
  | Status
)[] = [
  "All",
  "Pending",
  "Approved",
  "In Progress",
  "Completed",
];

const AdminOrders = () => {

  const { toast } =
    useToast();

  const [orders,
    setOrders] =
    useState<Order[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [filter,
    setFilter] =
    useState<
      "All" | Status
    >("All");

  const [selectedOrder,
    setSelectedOrder] =
    useState<Order | null>(
      null
    );

  const [loading,
    setLoading] =
    useState(true);

  /* FETCH */
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/orders`
          );

        setOrders(
          res.data
        );

      } catch (error) {

        console.error(
          error
        );

        toast({
          title:
            "Failed",
          description:
            "Unable to fetch orders",
          variant:
            "destructive",
        });

      } finally {

        setLoading(false);

      }
    };

  /* UPDATE STATUS */
  const updateStatus =
    async (
      id: string,
      status: Status
    ) => {

      try {

        await axios.put(
          `${API_URL}/api/orders/${id}`,
          { status }
        );

        setOrders(
          (prev) =>
            prev.map(
              (o) =>
                o._id === id
                  ? {
                      ...o,
                      status,
                    }
                  : o
            )
        );

        toast({
          title:
            "Order Updated",
          description:
            `Status changed to ${status}`,
        });

      } catch (error) {

        console.error(
          error
        );

        toast({
          title:
            "Update Failed",
          description:
            "Could not update order",
          variant:
            "destructive",
        });

      }
    };

  /* FILTER */
  const filtered =
    orders.filter(
      (o) => {

        const matchesSearch =
          o.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          o.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesFilter =
          filter === "All" ||
          o.status === filter;

        return (
          matchesSearch &&
          matchesFilter
        );
      }
    );

  /* STATS */
  const pending =
    orders.filter(
      (o) =>
        o.status ===
        "Pending"
    ).length;

  const approved =
    orders.filter(
      (o) =>
        o.status ===
        "Approved"
    ).length;

  const completed =
    orders.filter(
      (o) =>
        o.status ===
        "Completed"
    ).length;

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

        {/* BACKGROUND */}
        <div
          className="
            absolute
            top-[-150px]
            right-[-150px]
            w-[400px]
            h-[400px]
            bg-red-600/10
            blur-3xl
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-[-150px]
            left-[-150px]
            w-[400px]
            h-[400px]
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

                AIM FZC Order Control

              </div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  tracking-tight
                "
              >
                Manage
                <span className="text-red-500">
                  {" "}Orders
                </span>
              </h1>

              <p
                className="
                  text-slate-400
                  mt-4
                  max-w-2xl
                  leading-relaxed
                "
              >
                Monitor customer
                requests, manage
                order progress,
                and control industrial
                service operations
                from one premium dashboard.
              </p>

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
              value={orders.length}
              icon={<PackageCheck />}
              glow="from-red-500/20 to-red-500/5"
            />

            <StatCard
              title="Pending"
              value={pending}
              icon={<Clock3 />}
              glow="from-yellow-500/20 to-yellow-500/5"
            />

            <StatCard
              title="Approved"
              value={approved}
              icon={<Loader2 />}
              glow="from-blue-500/20 to-blue-500/5"
            />

            <StatCard
              title="Completed"
              value={completed}
              icon={<CheckCircle2 />}
              glow="from-green-500/20 to-green-500/5"
            />

          </div>

          {/* FILTER + SEARCH */}
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-5
            "
          >

            {/* FILTER */}
            <div className="flex flex-wrap gap-3">

              {statuses.map(
                (s) => (

                  <button
                    key={s}
                    onClick={() =>
                      setFilter(s)
                    }
                    className={`
                      px-5
                      py-2.5
                      rounded-2xl
                      text-sm
                      font-medium
                      transition-all
                      duration-300
                      border
                      ${
                        filter === s
                          ? `
                            bg-red-500/15
                            border-red-500/30
                            text-red-400
                            shadow-[0_0_20px_rgba(239,68,68,0.15)]
                          `
                          : `
                            bg-white/[0.03]
                            border-white/10
                            text-slate-400
                            hover:bg-white/[0.05]
                            hover:text-white
                          `
                      }
                    `}
                  >
                    {s}
                  </button>
                )
              )}

            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:w-[320px]">

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
                placeholder="Search orders..."
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

          </div>

          {/* TABLE */}
          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-[30px]
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
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >
                Order Management
              </h2>

              <p
                className="
                  text-sm
                  text-slate-400
                  mt-2
                "
              >
                Industrial service
                requests and tracking
              </p>

            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead
                  className="
                    border-b
                    border-white/5
                    text-slate-500
                    text-[12px]
                    uppercase
                    tracking-wider
                  "
                >

                  <tr>

                    <th className="text-left px-8 py-5">
                      Customer
                    </th>

                    <th className="text-left px-8 py-5">
                      Service
                    </th>

                    <th className="text-left px-8 py-5">
                      Contact
                    </th>

                    <th className="text-left px-8 py-5">
                      Status
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
                    (order) => (

                      <tr
                        key={order._id}
                        className="
                          border-b
                          border-white/5
                          hover:bg-white/[0.03]
                          transition-all
                        "
                      >

                        {/* CUSTOMER */}
                        <td className="px-8 py-5">

                          <p className="font-semibold">
                            {order.name}
                          </p>

                          <p className="text-sm text-slate-400 mt-1">
                            {order.email}
                          </p>

                        </td>

                        {/* SERVICE */}
                        <td className="px-8 py-5 text-slate-300">
                          {order.serviceId?.title || "N/A"}
                        </td>

                        {/* CONTACT */}
                        <td className="px-8 py-5 text-slate-400">
                          {order.phone}
                        </td>

                        {/* STATUS */}
                        <td className="px-8 py-4">
                          <StatusBadge
                            status={order.status}
                          />
                        </td>

                        {/* DATE */}
                        <td className="px-8 py-5 text-slate-500">

                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                        {/* ACTION */}
                        <td className="px-8 py-5">

                          <div className="flex justify-end gap-3">

                            {/* VIEW */}
                            <button
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-xl
                                bg-blue-500/10
                                text-blue-400
                                hover:bg-blue-500/20
                                transition-all
                              "
                            >

                              <Eye className="w-4 h-4" />

                              View

                            </button>

                            {/* STATUS */}
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateStatus(
                                  order._id,
                                  e.target.value as Status
                                )
                              }
                              className="
                                bg-[#0f172a]
                                border
                                border-white/10
                                text-white
                                px-3
                                py-2
                                rounded-xl
                                outline-none
                              "
                            >

                              {statuses
                                .slice(1)
                                .map((s) => (

                                  <option
                                    key={s}
                                  >
                                    {s}
                                  </option>
                                ))}

                            </select>

                          </div>

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

                <div className="py-20 text-center">

                  <p className="text-slate-500">
                    No orders found
                  </p>

                </div>
              )}

          </div>

        </div>

        {/* MODAL */}
        {selectedOrder && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-md
              flex
              items-center
              justify-center
              z-50
              p-5
            "
          >

            <div
              className="
                relative
                w-full
                max-w-2xl
                rounded-[32px]
                border
                border-white/10
                bg-[#071120]
                overflow-hidden
                shadow-[0_0_60px_rgba(239,68,68,0.15)]
              "
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  top-[-100px]
                  right-[-100px]
                  w-[220px]
                  h-[220px]
                  bg-red-500/10
                  blur-3xl
                  rounded-full
                "
              />

              {/* TOP */}
              <div
                className="
                  relative
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
                      text-2xl
                      font-black
                    "
                  >
                    Order Details
                  </h2>

                  <p className="text-slate-400 mt-2 text-sm">
                    Customer order overview
                  </p>

                </div>

                <button
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-white/[0.05]
                    hover:bg-red-500/10
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                >

                  <X className="w-5 h-5" />

                </button>

              </div>

              {/* BODY */}
              <div className="relative p-8 grid gap-5">

                <DetailCard
                  icon={<User2 />}
                  label="Customer"
                  value={selectedOrder.name}
                />

                <DetailCard
                  icon={<Mail />}
                  label="Email"
                  value={selectedOrder.email}
                />

                <DetailCard
                  icon={<Phone />}
                  label="Phone"
                  value={selectedOrder.phone}
                />

                <DetailCard
                  icon={<BriefcaseBusiness />}
                  label="Service"
                  value={
                    selectedOrder
                      .serviceId?.title ||
                    "N/A"
                  }
                />

                <DetailCard
                  icon={<CalendarDays />}
                  label="Preferred Date"
                  value={
                    selectedOrder.preferredDate
                      ? new Date(
                          selectedOrder.preferredDate
                        ).toLocaleDateString()
                      : "Not specified"
                  }
                />

                <DetailCard
                  icon={<PackageCheck />}
                  label="Status"
                  value={selectedOrder.status}
                />

                {/* DESCRIPTION */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                  "
                >

                  <p className="text-sm text-slate-400 mb-3">
                    Description
                  </p>

                  <p className="text-slate-200 leading-relaxed">
                    {selectedOrder.description ||
                      "No description provided"}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </AdminLayout>
  );
};

/* STATUS BADGE */
/* STATUS BADGE */
const StatusBadge = ({
  status,
}: {
  status: Status;
}) => {

  const styles:
    Record<
      Status,
      string
    > = {

    Pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    Approved:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    "In Progress":
      "bg-orange-500/10 text-orange-400 border-orange-500/20",

    Completed:
      "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (

    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        min-w-[110px]
        px-3
        py-1.5
        text-[11px]
        rounded-full
        border
        font-medium
        tracking-wide
        ${styles[status]}
      `}
    >
      {status}
    </span>
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
      className="
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
      "
    >

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

/* DETAIL CARD */
const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {

  return (

    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-5
      "
    >

      <div
        className="
          w-12
          h-12
          rounded-2xl
          bg-red-500/10
          flex
          items-center
          justify-center
          text-red-400
        "
      >

        {icon}

      </div>

      <div>

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <p className="text-white font-medium mt-1">
          {value}
        </p>

      </div>

    </div>
  );
};

export default AdminOrders;