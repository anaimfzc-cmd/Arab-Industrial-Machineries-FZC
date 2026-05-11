// BookService.tsx

import { useState } from "react";
import axios from "axios";
import { Layout } from "@/components/layout/Layout";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useUser,
} from "@clerk/clerk-react";

import heroImage from "@/assets/hero-industrial.jpg";

import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  phone: string;
  description: string;
  preferredDate: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  preferredDate?: string;
};

const BookService = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { isSignedIn, user } = useUser();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    description: "",
    preferredDate: "",
  });

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  // HANDLE CHANGE
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // REMOVE ERROR ON TYPE
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors: FormErrors = {};

    // NAME
    if (!form.name.trim()) {
      newErrors.name =
        "Full name is required";
    } else if (form.name.length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    // EMAIL
    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        form.email
      )
    ) {
      newErrors.email =
        "Invalid email address";
    }

    // PHONE
    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^[0-9+\-\s()]{8,15}$/.test(form.phone)
    ) {
      newErrors.phone =
        "Invalid phone number";
    }

    // DESCRIPTION
    if (!form.description.trim()) {
      newErrors.description =
        "Project description is required";
    } else if (
      form.description.trim().length < 15
    ) {
      newErrors.description =
        "Description must be at least 15 characters";
    }

    // DATE
    if (!form.preferredDate) {
      newErrors.preferredDate =
        "Preferred service date is required";
    } else {
      const selectedDate = new Date(
        form.preferredDate
      );

      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.preferredDate =
          "Please select a future date";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!user) {
      toast.error(
        "Please login first"
      );

      return;
    }

    // VALIDATE
    if (!validateForm()) {
      toast.error(
        "Please fix the form errors"
      );

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          serviceId: id,
          userId: user.id,
          name: form.name,
          email: form.email,
          phone: form.phone,
          description:
            form.description,
          preferredDate:
            form.preferredDate,
        }
      );

      setSuccess(true);

      toast.success(
        "Booking submitted successfully!"
      );

      // RESET
      setForm({
        name: "",
        email: "",
        phone: "",
        description: "",
        preferredDate: "",
      });

      setErrors({});

      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to submit booking"
      );

    } finally {
      setLoading(false);
    }
  };

  // LOGIN CHECK
  if (!isSignedIn) {
    return (
      <p className="p-10 text-center text-gray-300">
        Please login to book a service
      </p>
    );
  }

  return (
    <Layout>
    <div
      className="
        min-h-screen
        bg-cover
        bg-center
        flex
        items-center
      "
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-industrial-dark/95
          via-industrial-dark/90
          to-industrial-dark/60
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full px-6 lg:px-20 py-20">

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          {/* LEFT */}
          <div className="text-white max-w-xl">

            <div className="red-accent-bar mb-6" />

            <h1 className="industrial-heading mb-6 leading-tight">
              Book Industrial Service
            </h1>

            <p className="text-lg text-gray-300 mb-8">
              Submit your request and our engineering team will contact you with a tailored solution and quotation.
            </p>

            <div className="space-y-4 text-gray-300">
              <p>✔ Fast response within 24 hours</p>
              <p>✔ Certified industrial experts</p>
              <p>✔ Customized solutions</p>
            </div>

          </div>

          {/* FORM */}
          <div
            className="
              bg-black/60
              backdrop-blur-xl
              border
              border-white/10
              rounded-2xl
              p-8
              shadow-2xl
            "
          >

            {success && (

              <div
                className="
                  mb-6
                  p-4
                  border
                  border-green-500/40
                  bg-green-500/10
                  text-green-400
                  rounded-lg
                "
              >
                ✅ Booking successful! Redirecting...
              </div>

            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* NAME */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Full Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`
                    w-full
                    bg-black/40
                    border
                    ${
                      errors.name
                        ? "border-red-500"
                        : "border-white/10 focus:border-primary"
                    }
                    p-3
                    rounded-lg
                    text-white
                    outline-none
                  `}
                />

                {errors.name && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* EMAIL */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`
                    w-full
                    bg-black/40
                    border
                    ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/10 focus:border-primary"
                    }
                    p-3
                    rounded-lg
                    text-white
                    outline-none
                  `}
                />

                {errors.email && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* PHONE */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Phone Number
                </label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`
                    w-full
                    bg-black/40
                    border
                    ${
                      errors.phone
                        ? "border-red-500"
                        : "border-white/10 focus:border-primary"
                    }
                    p-3
                    rounded-lg
                    text-white
                    outline-none
                  `}
                />

                {errors.phone && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.phone}
                  </p>
                )}

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Project Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className={`
                    w-full
                    bg-black/40
                    border
                    ${
                      errors.description
                        ? "border-red-500"
                        : "border-white/10 focus:border-primary"
                    }
                    p-3
                    rounded-lg
                    text-white
                    outline-none
                  `}
                />

                {errors.description && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.description}
                  </p>
                )}

              </div>

              {/* DATE */}
              <div>

                <label className="text-sm text-gray-300 mb-2 block">
                  Preferred Service Date
                </label>

                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={`
                    w-full
                    bg-black/40
                    border
                    ${
                      errors.preferredDate
                        ? "border-red-500"
                        : "border-white/10 focus:border-primary"
                    }
                    p-3
                    rounded-lg
                    text-white
                    outline-none
                  `}
                />

                {errors.preferredDate && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.preferredDate}
                  </p>
                )}

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  bg-primary
                  hover:bg-primary/90
                  disabled:opacity-50
                  text-white
                  py-3
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                {loading
                  ? "Submitting..."
                  : "Submit Booking"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
    </Layout>
  );
};

export default BookService;