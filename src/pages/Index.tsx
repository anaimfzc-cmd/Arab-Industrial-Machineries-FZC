import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Cog, Users, Award, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-industrial.jpg";
import installationImg from "@/assets/service-installation.jpg";
import maintenanceImg from "@/assets/service-maintenance.jpg";
import fabricationImg from "@/assets/service-fabrication.jpg";
import commissioningImg from "@/assets/service-commissioning.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";

const services = [
  {
    title: "Machinery Installation",
    description: "Professional installation of industrial equipment with precision and safety standards.",
    image: installationImg,
    icon: Cog,
  },
  {
    title: "Equipment Maintenance",
    description: "Preventive and corrective maintenance to maximize equipment lifespan and performance.",
    image: maintenanceImg,
    icon: Shield,
  },
  {
    title: "Fabrication Services",
    description: "Custom steel fabrication and engineering solutions for industrial applications.",
    image: fabricationImg,
    icon: Award,
  },
  {
    title: "Technical Support",
    description: "24/7 commissioning and technical support for critical industrial operations.",
    image: commissioningImg,
    icon: Users,
  },
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "150+", label: "Industrial Clients" },
  { value: "99%", label: "Client Satisfaction" },
];

const whyChooseUs = [
  {
    title: "Industry Experience",
    description: "Over two decades of proven expertise in industrial machinery and engineering.",
    icon: Award,
  },
  {
    title: "Safety First",
    description: "Rigorous safety protocols and compliance with international standards.",
    icon: Shield,
  },
  {
    title: "Expert Team",
    description: "Skilled engineers and technicians with specialized industrial training.",
    icon: Users,
  },
  {
    title: "Quality Assured",
    description: "ISO-certified processes ensuring consistent, reliable results.",
    icon: Cog,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/95 via-industrial-dark/80 to-transparent" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="red-accent-bar mb-6" />
            <h1 className="industrial-heading text-secondary-foreground mb-6 leading-tight">
              Industrial Machinery
              <span className="block text-primary">Solutions You Can Trust</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl font-body leading-relaxed">
              Arab Industrial Machinery FZC delivers comprehensive machinery installation, 
              maintenance, and engineering services for factories across the Middle East.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="lg">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="font-display text-4xl md:text-5xl text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="red-accent-bar mb-6" />
              <h2 className="industrial-subheading text-foreground mb-6">
                Your Trusted Partner in Industrial Excellence
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For over 25 years, Arab Industrial Machinery FZC has been the preferred 
                partner for industrial facilities across the UAE and the wider Middle East region. 
                We specialize in delivering turnkey machinery solutions that keep operations 
                running efficiently and safely.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From initial consultation to installation and ongoing maintenance, our team 
                of experienced engineers ensures every project meets the highest standards 
                of quality and safety.
              </p>
              <Button asChild variant="outline">
                <Link to="/about">
                  Learn More About Us
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-video bg-muted overflow-hidden">
                <img 
                  src={project1} 
                  alt="Industrial facility" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-primary -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive industrial solutions tailored to your facility's needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="industrial-card overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <service.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-display text-xl tracking-wide text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg">
              <Link to="/services">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding industrial-gradient text-secondary-foreground">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="red-accent-bar mb-6" />
              <h2 className="industrial-subheading mb-6">Why Choose Us</h2>
              <p className="text-secondary-foreground/80 mb-12 text-lg">
                When you partner with Arab Industrial Machinery FZC, you get more than just 
                a service provider. You get a committed team dedicated to your success.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                {whyChooseUs.map((item, index) => (
                  <div 
                    key={item.title} 
                    className="flex gap-4"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg tracking-wide mb-2">{item.title}</h4>
                      <p className="text-secondary-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="aspect-square">
                <img 
                  src={project2} 
                  alt="Industrial project" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-8 right-8 bg-primary p-6">
                <p className="font-display text-4xl text-primary-foreground">25+</p>
                <p className="text-primary-foreground/80 text-sm uppercase tracking-wider">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="industrial-subheading text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get in touch with our team of industrial experts for a consultation 
            and detailed quote tailored to your requirements.
          </p>
          <Button asChild variant="hero-outline" size="xl">
            <Link to="/contact">
              Request a Quote Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
