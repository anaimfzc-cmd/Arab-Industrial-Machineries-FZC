import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import aimLogo from "@/assets/aim-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-industrial-dark text-secondary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img
                  src={aimLogo}
                  alt="Arab Industrial Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <p className="font-display text-lg tracking-wider">Arab Industrial</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Machinery FZC
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for industrial machinery installation, maintenance, 
              and engineering solutions across the Middle East.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Machinery Installation",
                "Equipment Maintenance",
                "Fabrication Services",
                "Technical Support",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Office No: SF10236, 10th Floor, Tower 1, RAKEZ Service Centre, Amenity Centre - Al Jazeera Al Hamra Industrial<br />
                  Ras Al Khaimah, United Arab Emirates
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+971000000000"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +97154 742 9429
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contactaimuae@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  contactaimuae@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Arab Industrial Machinery FZC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
