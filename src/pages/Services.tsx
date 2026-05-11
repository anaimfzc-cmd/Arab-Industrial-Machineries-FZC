import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg"; // SAME AS HOME

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/services`);
        setServices(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Layout>

      {/*  HERO (MATCH HOME EXACTLY) */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r 
            from-industrial-dark/95 
            via-industrial-dark/85 
            to-industrial-dark/30" />
        </div>

        <div className="relative z-10 w-full py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="pl-6 md:pl-12 lg:pl-24 max-w-3xl animate-fade-in-up">

              <div className="red-accent-bar mb-6" />

              <h1 className="industrial-heading text-secondary-foreground mb-6">
                Our Services
              </h1>

              <p className="text-lg text-secondary-foreground/80">
                Explore our full range of industrial machinery solutions designed
                for performance, safety, and efficiency.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/*  SERVICES SECTION (MATCH HOME STYLE) */}
      <section className="section-padding pb-32 bg-industrial-light">
        <div className="container-custom">

          {/* Heading */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive industrial solutions tailored to your business needs
            </p>
          </div>

          {/*  CARDS (SAME AS HOME) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative overflow-visible">
              {services.map((service, index) => (
                
                <div
                  key={service._id}
                  className="relative group rounded-2xl p-[1px] 
                  bg-gradient-to-br from-primary/30 via-white/10 to-transparent
                  hover:from-primary hover:via-primary/40 hover:to-primary/10
                  transition-all duration-500"
                >

                  {/* INNER CARD */}
                  <div
                    className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 h-full
                    border border-white/20 shadow-md
                    transition-all duration-500
                    group-hover:-translate-y-3 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:z-10"
                  >

                    {/*  GLOW */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-primary/5 blur-xl"></div>

                    {/*  TOP ACCENT LINE */}
                    <div className="h-[3px] w-0 group-hover:w-full bg-primary transition-all duration-500 mb-4"></div>

                    {/* ICON */}
                    {/* <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-4 text-xl font-bold">
                      ⚙️
                    </div> */}

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition">
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <Link
                      to={`/book/${service._id}`}
                      className="flex items-center justify-between text-base font-semibold text-primary mt-4 pt-4 border-t border-gray-200
                      group-hover:text-primary transition-all duration-300"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                  </div>
                </div>

              ))}

            </div>
            </div>
      </section>

      {/*  CTA (MATCH HOME) */}
      <section className="section-padding bg-primary text-center">
        <h2 className="industrial-subheading text-primary-foreground mb-4">
          Need Custom Industrial Solutions?
        </h2>

        <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
          Contact our experts for tailored machinery installation and maintenance services.
        </p>

        <Button asChild size="lg" variant="hero-outline">
          <Link to="/contact">
            Request a Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </section>

    </Layout>
  );
};

export default Services;