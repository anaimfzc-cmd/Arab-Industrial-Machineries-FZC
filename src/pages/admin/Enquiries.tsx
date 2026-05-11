// AdminEnquiries.tsx

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Mail,
  Phone,
  Building2,
  CalendarDays,
  Archive,
  MessageSquare,
  Inbox,
  Trash2,
  Layers3,
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

const API_URL =
  import.meta.env.VITE_API_URL;

/* TYPE */
type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
};

export default function AdminEnquiries() {

  const { toast } =
    useToast();

  const [enquiries,
    setEnquiries] =
    useState<Enquiry[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(true);

  const token =
    localStorage.getItem(
      "adminToken"
    );

  /* FETCH */
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries =
    async () => {

      try {

        const res =
          await fetch(
            `${API_URL}/api/admin/enquiries`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await res.json();

        setEnquiries(
          data?.data ||
          data ||
          []
        );

      } catch (err) {

        console.error(err);

        toast({
          title:
            "Failed",
          description:
            "Unable to load enquiries",
          variant:
            "destructive",
        });

      } finally {

        setLoading(false);

      }
    };

  /* DELETE */
  const handleDelete =
    async (id: string) => {

      const confirmDelete =
        window.confirm(
          "Archive this enquiry?"
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

        if (!res.ok)
          throw new Error();

        setEnquiries(
          (prev) =>
            prev.filter(
              (e) =>
                e._id !== id
            )
        );

        toast({
          title:
            "Enquiry Archived",
          description:
            "The enquiry was removed successfully",
        });

      } catch (err) {

        console.error(err);

        toast({
          title:
            "Archive Failed",
          description:
            "Something went wrong",
          variant:
            "destructive",
        });

      }
    };

  /* FILTER */
  const filtered =
    enquiries.filter(
      (e) =>
        e.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        e.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        e.company
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
            top-[-150px]
            right-[-150px]
            w-[380px]
            h-[380px]
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
            w-[380px]
            h-[380px]
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

              {/* LABEL */}
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

                AIM FZC Customer Inbox

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
                Customer
                <span className="text-red-500">
                  {" "}Enquiries
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
                Manage customer enquiries,
                communication requests,
                industrial consultations,
                and support conversations
                from one centralized dashboard.
              </p>

            </div>

          

          {/* STATS */}
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
                "
              >

                <div>

                  <p className="text-slate-400 text-sm">
                    Total Enquiries
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                      mt-2
                    "
                  >
                    {enquiries.length}
                  </h3>

                </div>

                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-red-500/10
                    flex
                    items-center
                    justify-center
                    text-red-400
                  "
                >

                  <Layers3 />

                </div>

              </div>

            </div>
          </div>

          {/* SEARCH */}
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

            <div className="relative w-full lg:w-[360px]">

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
                Enquiry Management
              </h2>

              <p
                className="
                  text-sm
                  text-slate-400
                  mt-2
                "
              >
                Customer communication
                and industrial support requests
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
                    text-[11px]
                    uppercase
                    tracking-wider
                  "
                >

                  <tr>

                    <th className="text-left px-8 py-5">
                      Customer
                    </th>

                    <th className="text-left px-8 py-5">
                      Contact
                    </th>

                    <th className="text-left px-8 py-5">
                      Company
                    </th>

                    <th className="text-left px-8 py-5">
                      Message
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
                    (e) => (

                      <tr
                        key={e._id}
                        className="
                          border-b
                          border-white/5
                          hover:bg-white/[0.03]
                          transition-all
                        "
                      >

                        {/* CUSTOMER */}
                        <td className="px-8 py-5">

                          <p
                            className="
                              font-semibold
                              text-[15px]
                            "
                          >
                            {e.name}
                          </p>

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              mt-1
                              text-slate-400
                              text-[13px]
                            "
                          >

                            <Mail className="w-3.5 h-3.5" />

                            {e.email}

                          </div>

                        </td>

                        {/* CONTACT */}
                        <td
                          className="
                            px-8
                            py-5
                            text-slate-400
                            text-[13px]
                          "
                        >

                          <div className="flex items-center gap-2">

                            <Phone className="w-3.5 h-3.5 text-red-400" />

                            {e.phone || "-"}

                          </div>

                        </td>

                        {/* COMPANY */}
                        <td
                          className="
                            px-8
                            py-5
                            text-slate-300
                            text-[13px]
                          "
                        >

                          <div className="flex items-center gap-2">

                            <Building2 className="w-3.5 h-3.5 text-blue-400" />

                            {e.company || "-"}

                          </div>

                        </td>

                        {/* MESSAGE */}
                        <td
                          className="
                            px-8
                            py-5
                            text-slate-400
                            text-[13px]
                            max-w-[260px]
                          "
                        >

                          <p className="line-clamp-2 leading-relaxed">
                            {e.message}
                          </p>

                        </td>

                        {/* DATE */}
                        <td
                          className="
                            px-8
                            py-5
                            text-slate-500
                            text-[13px]
                          "
                        >

                          <div className="flex items-center gap-2">

                            <CalendarDays className="w-3.5 h-3.5" />

                            {new Date(
                              e.createdAt
                            ).toLocaleDateString()}

                          </div>

                        </td>

                        {/* ACTION */}
                        <td className="px-8 py-5">

                          <div className="flex justify-end">

                            <button
                              onClick={() =>
                                handleDelete(
                                  e._id
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
                                text-sm
                              "
                            >

                              <Trash2 className="w-4 h-4" />

                              Archive

                            </button>

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
                    No enquiries found
                  </p>

                </div>
              )}

            {/* LOADING */}
            {loading && (

              <div className="py-20 text-center">

                <p className="text-slate-500">
                  Loading enquiries...
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

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