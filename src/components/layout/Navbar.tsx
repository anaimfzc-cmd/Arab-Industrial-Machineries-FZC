import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-industrial-charcoal/95 backdrop-blur-sm border-b border-border/10">
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary flex items-center justify-center">
              <span className="font-display text-primary-foreground text-2xl">AIM</span>
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
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
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+971000000000"
              className="flex items-center gap-2 text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+971 00 000 0000</span>
            </a>
            <Button asChild variant="default" size="default">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-secondary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-industrial-charcoal border-t border-border/10 animate-fade-in">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
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
              ))}
              <div className="px-4 pt-4 border-t border-border/10">
                <Button asChild variant="default" className="w-full">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
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
