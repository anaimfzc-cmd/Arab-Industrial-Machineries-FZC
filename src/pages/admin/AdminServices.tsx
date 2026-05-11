// AdminServices.tsx

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  Plus,
  Trash2,
  Wrench,
  Layers3,
  Sparkles,
  AlertTriangle,
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

/* TYPES */
type Service = {
  _id: string;
  title: string;
  description: string;
  price: number;
};

type FormData = {
  title: string;
  description: string;
  price: string;
};

const AdminServices = () => {

  const {
    toast,
  } = useToast();

  const [services,
    setServices] =
    useState<Service[]>([]);

  const [form,
    setForm] =
    useState<FormData>({
      title: "",
      description: "",
      price: "",
    });

  const [search,
    setSearch] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [deleteModal,
    setDeleteModal] =
    useState<string | null>(
      null
    );

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/services`
          );

        setServices(
          res.data
        );

      } catch (error) {

        console.error(error);

        toast({
          title:
            "Fetch Failed",

          description:
            "Unable to load services",

          variant:
            "destructive",
        });
      }
    };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAdd =
    async (
      e: React.FormEvent<
        HTMLFormElement
      >
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await axios.post(
          `${API_URL}/api/services`,
          {
            title:
              form.title,

            description:
              form.description,

            price:
              Number(
                form.price
              ),
          }
        );

        toast({
          title:
            "Service Added",

          description:
            "New industrial service created successfully",
        });

        setForm({
          title: "",
          description: "",
          price: "",
        });

        fetchServices();

      } catch (error) {

        console.error(error);

        toast({
          title:
            "Creation Failed",

          description:
            "Unable to add service",

          variant:
            "destructive",
        });

      } finally {

        setLoading(false);
      }
    };

  const handleDelete =
    async (
      id: string
    ) => {

      try {

        await axios.delete(
          `${API_URL}/api/services/${id}`
        );

        setServices(
          (prev) =>
            prev.filter(
              (s) =>
                s._id !== id
            )
        );

        toast({
          title:
            "Service Deleted",

          description:
            "Service removed successfully",
        });

      } catch (error) {

        console.error(error);

        toast({
          title:
            "Delete Failed",

          description:
            "Unable to delete service",

          variant:
            "destructive",
        });
      }
    };

  // FILTER
  const filtered =
    services.filter(
      (s) =>
        s.title
          .toLowerCase()
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

        {/* GLOW */}
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

                <Sparkles
                  className="
                    w-4
                    h-4
                  "
                />

                Industrial Services Control

              </div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  tracking-tight
                "
              >
                Service
                <span className="text-red-500">
                  {" "}Management
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
                Create, organize,
                and manage industrial
                machinery services
                from the premium
                AIM FZC admin panel.
              </p>

            </div>

            {/* STAT */}
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
                    Total Services
                  </p>

                  <h3
                    className="
                      text-4xl
                      font-black
                      mt-2
                    "
                  >
                    {services.length}
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

          {/* FORM */}
          <div
            className="
              bg-white/[0.03]
              border
              border-white/10
              rounded-[32px]
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
                gap-3
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

                <Plus />

              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Add New Service
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-1
                  "
                >
                  Create industrial offerings
                </p>

              </div>

            </div>

            {/* FORM */}
            <form
              onSubmit={handleAdd}
              className="
                p-8
                grid
                gap-5
              "
            >

              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Service Title"
                className="
                  h-12
                  bg-white/[0.03]
                  border-white/10
                  rounded-2xl
                  text-white
                  placeholder:text-slate-500
                  focus:border-red-500/40
                "
                required
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Service Description"
                className="
                  min-h-[140px]
                  bg-white/[0.03]
                  border
                  border-white/10
                  rounded-2xl
                  p-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-red-500/40
                "
              />

              <button
                disabled={loading}
                className="
                  relative
                  overflow-hidden
                  group
                  w-fit
                  px-8
                  py-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-700
                  via-red-600
                  to-red-500
                  text-white
                  font-semibold
                  shadow-[0_0_25px_rgba(239,68,68,0.25)]
                  hover:scale-[1.02]
                  transition-all
                "
              >

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Plus className="w-4 h-4" />

                  {loading
                    ? "Adding..."
                    : "Add Service"}

                </span>

              </button>

            </form>

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
              placeholder="Search services..."
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
              "
            />

          </div>

          {/* SERVICES */}
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {filtered.map(
              (service) => (

                <div
                  key={service._id}
                  className="
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-6
                    hover:border-red-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  {/* GLOW */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-br
                      from-red-500/10
                      to-transparent
                      opacity-50
                    "
                  />

                  <div className="relative z-10">

                    {/* ICON */}
                    <div
                      className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-red-500/10
                        flex
                        items-center
                        justify-center
                        text-red-400
                        mb-5
                      "
                    >

                      <Wrench />

                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        text-slate-400
                        mt-4
                        leading-relaxed
                        text-sm
                        line-clamp-4
                      "
                    >
                      {service.description}
                    </p>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        setDeleteModal(
                          service._id
                        )
                      }
                      className="
                        mt-6
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

                  </div>

                </div>
              )
            )}

          </div>

          {/* EMPTY */}
          {filtered.length === 0 && (

            <div
              className="
                text-center
                py-20
                border
                border-white/10
                rounded-[32px]
                bg-white/[0.02]
              "
            >

              <p className="text-slate-500">
                No services found
              </p>

            </div>
          )}

        </div>

        {/* DELETE MODAL */}
        {deleteModal && (

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

            <div
              className="
                w-full
                max-w-md
                rounded-[32px]
                border
                border-white/10
                bg-[#020617]
                overflow-hidden
                shadow-[0_0_60px_rgba(239,68,68,0.18)]
              "
            >

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

              <div className="p-10 text-center">

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

                <h2
                  className="
                    text-3xl
                    font-black
                    text-white
                  "
                >
                  Delete Service
                </h2>

                <p
                  className="
                    text-slate-400
                    mt-4
                  "
                >
                  Are you sure you want
                  to permanently delete
                  this service?
                </p>

                <div
                  className="
                    mt-8
                    flex
                    gap-4
                  "
                >

                  <button
                    onClick={() =>
                      setDeleteModal(
                        null
                      )
                    }
                    className="
                      flex-1
                      py-3
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      text-white
                    "
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {

                      handleDelete(
                        deleteModal
                      );

                      setDeleteModal(
                        null
                      );
                    }}
                    className="
                      flex-1
                      py-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-red-700
                      via-red-600
                      to-red-500
                      text-white
                      font-semibold
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default AdminServices;