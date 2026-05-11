// AdminLogin.tsx

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";

import { Button } from "@/components/ui/button";

import {
  User,
  Lock,
  Loader2,
} from "lucide-react";

import heroImage from "@/assets/hero-industrial.jpg";

import { useToast } from "@/hooks/use-toast";

const API_URL =
  import.meta.env.VITE_API_URL;

const AdminLogin = () => {

  const navigate =
    useNavigate();

  const { toast } =
    useToast();

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data =
        await res.json();

      // LOGIN FAILED
      if (!res.ok) {

        toast({
          title: "Login Failed",
          description:
            data.message ||
            "Invalid credentials",
          variant:
            "destructive",
        });

        return;
      }

      // SAVE TOKEN
      localStorage.setItem(
        "adminToken",
        data.token
      );

      // SUCCESS TOAST
      toast({
        title:
          "Login Successful",
        description:
          "Welcome back Admin",
      });

      // REDIRECT
      navigate(
        "/admin/dashboard",
        {
          replace: true,
        }
      );

    } catch (err) {

      console.error(err);

      toast({
        title: "Server Error",
        description:
          "Backend not reachable",
        variant:
          "destructive",
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <Layout>

      <section
        className="
          relative
          min-h-screen
          flex
          items-center
          justify-center
        "
      >

        {/* BACKGROUND */}
        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              `url(${heroImage})`,
          }}
        >
          <div
            className="
              absolute
              inset-0
              bg-industrial-dark/90
            "
          />
        </div>

        {/* LOGIN CARD */}
        <div
          className="
            relative
            z-10
            w-full
            max-w-md
            px-6
          "
        >

          <div
            className="
              bg-card/90
              backdrop-blur-md
              border
              border-border
              p-10
              shadow-2xl
              rounded-lg
              transition-all
              duration-300
              hover:scale-[1.01]
            "
          >

            <div
              className="
                red-accent-bar
                mb-6
                mx-auto
              "
            />

            <h2
              className="
                industrial-subheading
                text-foreground
                mb-8
                text-center
              "
            >
              Admin Panel Login
            </h2>

            {/* FORM */}
            <form
              onSubmit={
                handleLogin
              }
              className="space-y-6"
            >

              {/* USERNAME */}
              <div>

                <label
                  className="
                    text-sm
                    text-muted-foreground
                    block
                    mb-2
                  "
                >
                  Username
                </label>

                <div
                  className="
                    flex
                    items-center
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    rounded-md
                  "
                >

                  <User
                    className="
                      w-4
                      h-4
                      text-muted-foreground
                      mr-2
                    "
                  />

                  <input
                    type="text"
                    className="
                      bg-transparent
                      w-full
                      outline-none
                      text-foreground
                    "
                    value={username}
                    onChange={(e) =>
                      setUsername(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div>

                <label
                  className="
                    text-sm
                    text-muted-foreground
                    block
                    mb-2
                  "
                >
                  Password
                </label>

                <div
                  className="
                    flex
                    items-center
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    rounded-md
                  "
                >

                  <Lock
                    className="
                      w-4
                      h-4
                      text-muted-foreground
                      mr-2
                    "
                  />

                  <input
                    type="password"
                    className="
                      bg-transparent
                      w-full
                      outline-none
                      text-foreground
                    "
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                {loading ? (
                  <>
                    <Loader2
                      className="
                        w-4
                        h-4
                        animate-spin
                      "
                    />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}

              </Button>

            </form>

            {/* FOOTER */}
            <p
              className="
                text-xs
                text-muted-foreground
                mt-6
                text-center
              "
            >
              Secure Admin Access •
              Arab Industrial
              Machinery
            </p>

          </div>

        </div>

      </section>

    </Layout>
  );
};

export default AdminLogin;