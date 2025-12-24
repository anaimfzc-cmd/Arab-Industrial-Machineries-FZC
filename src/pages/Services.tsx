import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, Cog, Wrench, Factory, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import installationImg from "@/assets/service-installation.jpg";
import maintenanceImg from "@/assets/service-maintenance.jpg";
import fabricationImg from "@/assets/service-fabrication.jpg";
import commissioningImg from "@/assets/service-commissioning.jpg";

const services = [
  {
    id: "installation",
    title: "Industrial Machinery Installation",
    shortDesc: "Professional installation of industrial equipment with precision and safety.",
    description: "Our installation services cover the complete spectrum of industrial machinery, from heavy manufacturing equipment to precision instrumentation. Our experienced team ensures proper alignment, calibration, and integration with your existing systems.",
    image: installationImg,
    icon: Cog,
    benefits: [
      "Complete project planning and coordination",
      "Precision alignment and calibration",
      "Integration with existing systems",
      "Safety compliance certification",
      "Minimal production downtime"
    ],
    industries: ["Manufacturing", "Oil & Gas", "Power Generation", "Food Processing", "Pharmaceuticals"]
  },
  {
    id: "maintenance",
    title: "Equipment Maintenance & Repair",
    shortDesc: "Preventive and corrective maintenance to maximize equipment lifespan.",
    description: "Keep your equipment running at peak performance with our comprehensive maintenance programs. We offer both scheduled preventive maintenance and emergency repair services to minimize downtime and extend equipment life.",
    image: maintenanceImg,
    icon: Wrench,
    benefits: [
      "Preventive maintenance programs",
      "24/7 emergency repair services",
      "Condition monitoring",
      "Spare parts management",
      "Equipment life extension"
    ],
    industries: ["Heavy Industry", "Petrochemical", "Cement & Mining", "Steel Manufacturing", "Utilities"]
  },
  {
    id: "fabrication",
    title: "Fabrication & Engineering Support",
    shortDesc: "Custom steel fabrication and engineering solutions for industrial applications.",
    description: "Our fabrication facility is equipped to handle projects of all sizes, from custom brackets to large structural assemblies. Our engineering team works closely with clients to deliver solutions that meet exact specifications.",
    image: fabricationImg,
    icon: Factory,
    benefits: [
      "Custom design and engineering",
      "Precision fabrication",
      "Quality assured welding",
      "Material sourcing",
      "On-site installation"
    ],
    industries: ["Construction", "Infrastructure", "Marine", "Process Industries", "Energy"]
  },
  {
    id: "commissioning",
    title: "Commissioning & Technical Support",
    shortDesc: "Comprehensive commissioning and ongoing technical support services.",
    description: "Our commissioning team ensures your new equipment is properly tested, documented, and ready for production. We provide comprehensive technical support including operator training and ongoing consultation.",
    image: commissioningImg,
    icon: Headphones,
    benefits: [
      "Pre-commissioning checks",
      "Functional testing",
      "Performance verification",
      "Operator training",
      "Documentation and handover"
    ],
    industries: ["All Industrial Sectors", "New Facility Startups", "Equipment Upgrades", "System Expansions"]
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-industrial-dark/90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="red-accent-bar mb-6" />
            <h1 className="industrial-heading text-secondary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-secondary-foreground/80 leading-relaxed">
              Comprehensive industrial machinery solutions designed to keep 
              your operations running efficiently and safely.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From installation to ongoing support, we provide end-to-end industrial 
              machinery services tailored to your specific needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="industrial-card p-6 text-center group"
              >
                <div className="w-16 h-16 bg-primary mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110">
                  <service.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg tracking-wide text-foreground mb-2">
                  {service.title.split(' ').slice(0, 2).join(' ')}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.shortDesc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-industrial-light' : 'bg-background'}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <div className="red-accent-bar mb-6" />
                <h2 className="industrial-subheading text-foreground mb-6">
                  {service.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-display text-lg tracking-wide text-foreground mb-4">
                    Key Benefits
                  </h4>
                  <div className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-display text-lg tracking-wide text-foreground mb-4">
                    Industries Served
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.industries.map((industry) => (
                      <span 
                        key={industry}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild variant="default">
                  <Link to="/contact">
                    Request This Service
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className={index % 2 !== 0 ? 'lg:col-start-1' : ''}>
                <div className="relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 -z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="section-padding industrial-gradient text-secondary-foreground">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading mb-4">Our Process</h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
              A systematic approach to delivering quality results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Consultation", desc: "Understanding your requirements and site conditions" },
              { step: "02", title: "Planning", desc: "Detailed project planning and resource allocation" },
              { step: "03", title: "Execution", desc: "Professional implementation with safety focus" },
              { step: "04", title: "Handover", desc: "Testing, documentation, and client training" },
            ].map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-6 flex items-center justify-center">
                  <span className="font-display text-3xl text-primary-foreground">{phase.step}</span>
                </div>
                <h4 className="font-display text-xl tracking-wide mb-3">{phase.title}</h4>
                <p className="text-secondary-foreground/70 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="industrial-subheading text-primary-foreground mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you find the right solution 
            for your industrial machinery needs.
          </p>
          <Button asChild variant="hero-outline" size="xl">
            <Link to="/contact">
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
