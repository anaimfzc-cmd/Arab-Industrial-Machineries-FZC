// ChangePassword.tsx

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Loader2,
  Lock,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import {
  useToast,
} from "@/hooks/use-toast";

const API =
  import.meta.env.VITE_API_URL;

const ChangePassword = () => {

  const navigate =
    useNavigate();

  const { toast } =
    useToast();

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  // PASSWORD STRENGTH
  const getStrength = () => {

    if (
      newPassword.length >= 10
    ) {

      return {
        text: "Strong",
        width: "85%",
      };
    }

    if (
      newPassword.length >= 6
    ) {

      return {
        text: "Medium",
        width: "55%",
      };
    }

    return {
      text: "Weak",
      width: "25%",
    };
  };

  const strength =
    getStrength();

  // SUBMIT
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      const res =
        await fetch(
          `${API}/api/admin/change-password`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              currentPassword,
              newPassword,
            }),
          }
        );

      const data =
        await res.json();

      // ERROR
      if (!res.ok) {

        toast({
          title:
            "Update Failed",

          description:
            data.message,

          variant:
            "destructive",
        });

        return;
      }

      // SUCCESS
      toast({
        title:
          "Password Updated",

        description:
          "Your password was changed successfully",
      });

      // RESET
      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {

      console.error(error);

      toast({
        title:
          "Server Error",

        description:
          "Something went wrong",

        variant:
          "destructive",
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      className="
        min-h-screen
        bg-[#020617]
        flex
        items-center
        justify-center
        p-6
        relative
        overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-[-120px]
          left-[-120px]
          w-[350px]
          h-[350px]
          bg-red-600/20
          blur-3xl
          rounded-full
        "
      />

      <div
        className="
          absolute
          bottom-[-120px]
          right-[-120px]
          w-[350px]
          h-[350px]
          bg-red-500/10
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

      {/* BACK BUTTON */}
      <button
        onClick={() =>
          navigate(-1)
        }
        className="
          absolute
          top-6
          left-6
          z-20
          group
          flex
          items-center
          gap-3
          px-5
          py-3
          rounded-2xl
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          text-slate-300
          hover:text-white
          hover:border-red-500/30
          hover:bg-red-500/10
          transition-all
          duration-300
        "
      >

          <ArrowLeft
            size={18}
          />

        

        {/* <span
          className="
            font-medium
            tracking-wide
          "
        >
          Back
        </span> */}

      </button>

      {/* CARD */}
      <div
        className="
          relative
          w-full
          max-w-lg
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-2xl
          shadow-[0_0_60px_rgba(239,68,68,0.15)]
          overflow-hidden
        "
      >

        {/* TOP LINE */}
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

        {/* INNER */}
        <div
          className="
            p-10
            md:p-12
          "
        >

          {/* HEADER */}
          <div className="mb-10">

            <div
              className="
                inline-flex
                items-center
                gap-3
                px-4
                py-2
                rounded-full
                border
                border-red-500/20
                bg-red-500/10
                text-red-400
                text-sm
                font-medium
                mb-6
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

              Secure Admin Access

            </div>

            <h1
              className="
                text-4xl
                font-black
                text-white
                leading-tight
                tracking-tight
              "
            >
              Change
              <span className="text-red-500">
                {" "}Password
              </span>
            </h1>

            <p
              className="
                text-slate-400
                mt-4
                leading-relaxed
                text-sm
                md:text-base
                max-w-md
              "
            >
              Update your administrator
              credentials securely with
              enterprise-grade protection.
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              space-y-6
            "
          >

            {/* CURRENT PASSWORD */}
            <div>

              <label
                className="
                  text-sm
                  text-slate-300
                  mb-3
                  block
                  font-medium
                  tracking-wide
                  uppercase
                "
              >
                Current Password
              </label>

              <div
                className="
                  group
                  relative
                "
              >

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  required
                  className="
                    w-full
                    bg-[#0f172a]/80
                    border
                    border-white/10
                    focus:border-red-500/60
                    focus:ring-4
                    focus:ring-red-500/10
                    outline-none
                    transition-all
                    duration-300
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    placeholder:text-slate-500
                  "
                />

                <Lock
                  className="
                    absolute
                    inset-y-0
                    right-5
                    my-auto
                    w-5
                    h-5
                    text-slate-500
                    group-focus-within:text-red-400
                    transition-colors
                  "
                />

              </div>

            </div>

            {/* NEW PASSWORD */}
            <div>

              <label
                className="
                  text-sm
                  text-slate-300
                  mb-3
                  block
                  font-medium
                  tracking-wide
                  uppercase
                "
              >
                New Password
              </label>

              <div
                className="
                  group
                  relative
                "
              >

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  required
                  className="
                    w-full
                    bg-[#0f172a]/80
                    border
                    border-white/10
                    focus:border-red-500/60
                    focus:ring-4
                    focus:ring-red-500/10
                    outline-none
                    transition-all
                    duration-300
                    rounded-2xl
                    px-5
                    py-4
                    text-white
                    placeholder:text-slate-500
                  "
                />

                <ShieldCheck
                  className="
                    absolute
                    inset-y-0
                    right-5
                    my-auto
                    w-5
                    h-5
                    text-slate-500
                    group-focus-within:text-red-400
                    transition-colors
                  "
                />

              </div>

            </div>

            {/* PASSWORD STRENGTH */}
            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-xs
                  mb-2
                "
              >

                <span className="text-slate-400">
                  Password Strength
                </span>

                <span
                  className="
                    text-red-400
                    font-semibold
                  "
                >
                  {strength.text}
                </span>

              </div>

              <div
                className="
                  w-full
                  h-2
                  rounded-full
                  bg-white/5
                  overflow-hidden
                "
              >

                <div
                  style={{
                    width:
                      strength.width,
                  }}
                  className="
                    h-full
                    bg-gradient-to-r
                    from-red-700
                    via-red-500
                    to-red-400
                    rounded-full
                    transition-all
                    duration-500
                  "
                />

              </div>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                relative
                overflow-hidden
                group
                w-full
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-red-700
                via-red-600
                to-red-500
                text-white
                font-bold
                tracking-wide
                text-lg
                shadow-[0_0_35px_rgba(239,68,68,0.35)]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-[0_0_50px_rgba(239,68,68,0.45)]
                disabled:opacity-70
              "
            >

              <span
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      className="
                        w-5
                        h-5
                        animate-spin
                      "
                    />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}

              </span>

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

          </form>

          {/* FOOTER */}
          <div
            className="
              mt-8
              pt-6
              border-t
              border-white/5
              flex
              items-center
              justify-between
              text-xs
              text-slate-500
            "
          >

            <span>
              Arab Industrial Machinery
            </span>

            <span>
              Enterprise Security Panel
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ChangePassword;