import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
} from "react-router-dom";

const API =
  import.meta.env.VITE_API_URL;

export default function AdminProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {

  const [loading,
    setLoading] =
    useState(true);

  const [isValid,
    setIsValid] =
    useState(false);

  useEffect(() => {

    const verifyToken =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "adminToken"
            );

          // NO TOKEN
          if (!token) {

            setLoading(false);

            return;
          }

          // VERIFY TOKEN
          const res =
            await fetch(
              `${API}/api/admin/verify`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          // INVALID TOKEN
          if (!res.ok) {

            localStorage.removeItem(
              "adminToken"
            );

            setIsValid(false);

          } else {

            setIsValid(true);

          }

        } catch (error) {

          console.error(
            "Admin verify error:",
            error
          );

          setIsValid(false);

        } finally {

          setLoading(false);

        }
      };

    verifyToken();

  }, []);

  // LOADING SCREEN
  if (loading) {

    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#020617]
          text-white
          text-lg
        "
      >
        Checking authentication...
      </div>
    );
  }

  // NOT AUTHORIZED
  if (!isValid) {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  // AUTHORIZED
  return children;
}