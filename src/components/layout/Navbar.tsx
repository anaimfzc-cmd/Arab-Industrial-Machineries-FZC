// Navbar.tsx

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  User,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import aimLogo from "@/assets/aim-logo.png";

import {
  UserButton,
  useUser,
  useClerk,
} from "@clerk/clerk-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Product Guide", path: "/product-guide" },
  { name: "Bookings", path: "/my-bookings", protected: true },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { isSignedIn, isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const isActive = (path: string) => location.pathname === path;

  // CLOSE PROFILE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // BOOKINGS
  const handleBookingsClick = () => {
    setProfileOpen(false);

    if (!isSignedIn) {
      navigate("/login");
    } else {
      navigate("/my-bookings");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-industrial-charcoal/95 backdrop-blur-sm border-b border-border/10">

      <div className="container-custom">

        <nav className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={aimLogo}
                alt="Arab Industrial Machinery Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="hidden sm:block">

              <p className="font-display text-lg text-secondary-foreground tracking-wider">
                Arab Industrial
              </p>

              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Machinery FZC
              </p>

            </div>

          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => {
              const isProtected = link.protected;

              return isProtected ? (
                <button
                  key={link.path}
                  onClick={handleBookingsClick}
                  className={cn(
                    "font-body text-sm uppercase tracking-wider transition-colors duration-300 relative py-2",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-secondary-foreground/80 hover:text-primary"
                  )}
                >
                  {link.name}

                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}

                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-body text-sm uppercase tracking-wider transition-colors duration-300 relative py-2",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-secondary-foreground/80 hover:text-primary"
                  )}
                >
                  {link.name}

                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}

                </Link>
              );
            })}

          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-6">

            {/* PROFILE */}
            <div
              ref={profileRef}
              className="relative"
            >

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
                  flex items-center gap-2
                  font-body text-sm uppercase tracking-wider
                  text-secondary-foreground/80
                  hover:text-primary
                  transition-colors duration-300
                "
              >

                <User className="w-4 h-4" />

                <span>Profile</span>

                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    profileOpen && "rotate-180"
                  )}
                />

              </button>

              {/* DROPDOWN */}
              <div
                className={cn(
                  `
                  absolute right-0 top-full mt-4
                  w-80
                  bg-[#151515]
                  border border-white/10
                  shadow-[0_20px_80px_rgba(0,0,0,0.6)]
                  rounded-xl
                  overflow-hidden
                  z-50
                  transition-all duration-300
                  origin-top-right
                  `,
                  profileOpen
                    ? "opacity-100 visible scale-100"
                    : "opacity-0 invisible scale-95"
                )}
              >

                {/* LOADING */}
                {!isLoaded && (
                  <div className="p-6 text-sm text-muted-foreground">
                    Loading...
                  </div>
                )}

                {/* LOGGED OUT */}
                {isLoaded && !isSignedIn && (
                  <div className="p-6">

                    <h3 className="text-white text-xl font-semibold mb-2">
                      Welcome
                    </h3>

                    <p className="text-muted-foreground text-sm mb-6">
                      Login to manage bookings and access your account
                    </p>

                    <Button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/login");
                      }}
                      className="w-full uppercase tracking-wider"
                    >
                      Login / Register
                    </Button>

                  </div>
                )}

                {/* LOGGED IN */}
                {isLoaded && isSignedIn && (
                  <>

                    {/* TOP SECTION */}
                    <div className="p-6">

                      <div className="flex items-center gap-4">

                        <div className="shrink-0">
                          <UserButton afterSignOutUrl="/" />
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-white font-semibold text-lg truncate">
                            {user?.fullName || "User"}
                          </h3>

                          <p className="text-sm text-muted-foreground truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-white/10" />

                    {/* MENU */}
                    <div className="p-3 space-y-1">

                      {/* ACCOUNT */}
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          openUserProfile();
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-lg
                          text-left
                          text-secondary-foreground/90
                          hover:bg-white/5
                          hover:text-primary
                          transition-all
                        "
                      >

                        <User className="w-4 h-4" />

                        <span className="text-sm uppercase tracking-wider">
                          Manage Account
                        </span>

                      </button>

                      {/* BOOKINGS */}
                      <button
                        onClick={handleBookingsClick}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-lg
                          text-left
                          text-secondary-foreground/90
                          hover:bg-white/5
                          hover:text-primary
                          transition-all
                        "
                      >

                        <LayoutDashboard className="w-4 h-4" />

                        <span className="text-sm uppercase tracking-wider">
                          My Bookings
                        </span>

                      </button>

                      {/* LOGOUT */}
                      <button
                        onClick={async () => {
                          setProfileOpen(false);
                          await signOut();
                          navigate("/");
                        }}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-4
                          py-3
                          rounded-lg
                          text-left
                          text-red-400
                          hover:bg-red-500/10
                          transition-all
                        "
                      >

                        <LogOut className="w-4 h-4" />

                        <span className="text-sm uppercase tracking-wider">
                          Logout
                        </span>

                      </button>

                    </div>

                  </>
                )}

              </div>

            </div>

            {/* CTA */}
            <Button asChild variant="default">

              <Link to="/contact">
                Get Quote
              </Link>

            </Button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-secondary-foreground p-2"
            aria-label="Toggle menu"
          >

            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}

          </button>

        </nav>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="lg:hidden bg-industrial-charcoal border-t border-border/10">

            <div className="py-4 space-y-2">

              {navLinks.map((link) => {
                const isProtected = link.protected;

                return isProtected ? (
                  <button
                    key={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      handleBookingsClick();
                    }}
                    className={cn(
                      "block w-full text-left px-4 py-3 font-body text-sm uppercase tracking-wider transition-colors",
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-secondary-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-4 py-3 font-body text-sm uppercase tracking-wider transition-colors",
                      isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-secondary-foreground/80 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* MOBILE USER */}
              <div className="px-4 pt-4 border-t border-border/10 space-y-3">

                {!isSignedIn ? (
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/login");
                    }}
                    className="w-full"
                  >
                    Login / Register
                  </Button>
                ) : (
                  <>
                    <div className="flex justify-center py-3">
                      <UserButton afterSignOutUrl="/" />
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={async () => {
                        await signOut();
                        navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}

                <Button asChild variant="default" className="w-full">

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                  >
                    Request Quote
                  </Link>

                </Button>

              </div>

            </div>

          </div>
        )}

      </div>

    </header>
  );
};