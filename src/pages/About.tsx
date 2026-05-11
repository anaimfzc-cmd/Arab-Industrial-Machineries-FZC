import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Shield, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import aboutImage from "@/assets/about-factory.jpg";
import heroImage from "@/assets/hero-industrial.jpg";

const values = [
  {
    icon: Shield,
    title: "Safety Excellence",
    description: "Zero-compromise approach to workplace safety with rigorous protocols and continuous training."
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "ISO-certified processes ensuring consistent, reliable results on every project."
  },
  {
    icon: Users,
    title: "Client Partnership",
    description: "Building lasting relationships through transparent communication and reliable delivery."
  },
  {
    icon: Target,
    title: "Precision Engineering",
    description: "Meticulous attention to detail in every installation and maintenance procedure."
  }
];

const milestones = [
  { year: "2015", event: "Company founded in Ras Al Khaimah, UAE" },
  { year: "2017", event: "Expanded operations across GCC region" },
  { year: "2020", event: "300th major project completed" },
  { year: "2023", event: "Launched 24/7 technical support services" },
  { year: "2026", event: "Celebrating 10+ years of industrial excellence" },
];

const About = () => {
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
                About Arab Industrial Machinery
              </h1>

              <p className="text-lg text-secondary-foreground/80">
                Over 10 years of trusted expertise in industrial machinery 
                installation, maintenance, and engineering solutions.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="red-accent-bar mb-6" />
              <h2 className="industrial-subheading text-foreground mb-6">
                Building Industrial Excellence Since 2015
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Arab Industrial Machinery FZC was established with a clear mission: to provide world-class industrial machinery services that enable factories and manufacturing facilities to operate at peak efficiency.
                </p>
                <p>
                  From our headquarters in Ras Al Khaimah, UAE, we serve clients across the Middle East, delivering comprehensive solutions that span installation, maintenance, fabrication, and technical support.
                </p>
                <p>
                  Our team of experienced engineers and technicians brings decades of 
                  combined expertise to every project, ensuring that your industrial 
                  operations run smoothly, safely, and efficiently.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={aboutImage} 
                alt="Industrial facility at sunset" 
                className="w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary p-8">
                <p className="font-display text-5xl text-primary-foreground">10+</p>
                <p className="text-primary-foreground/80 text-sm uppercase tracking-wider mt-1">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 md:p-12 border border-border">
              <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl tracking-wide text-foreground mb-4">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional industrial machinery services that exceed client 
                expectations, prioritizing safety, quality, and reliability in every 
                project we undertake. We strive to be the trusted partner that industrial 
                facilities depend on for their critical operations.
              </p>
            </div>
            <div className="bg-card p-8 md:p-12 border border-border">
              <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl tracking-wide text-foreground mb-4">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading industrial machinery service provider in the Middle East, 
                recognized for our commitment to excellence, innovation, and sustainable 
                practices. We aim to set the industry standard for quality and customer 
                satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding industrial-gradient text-secondary-foreground">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading mb-4">Our Core Values</h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-primary mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h4 className="font-display text-xl tracking-wide mb-3">{value.title}</h4>
                <p className="text-secondary-foreground/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our path to industrial excellence
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg text-primary-foreground">
                      {milestone.year}
                    </span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2 flex-1" />
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-foreground font-medium">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="red-accent-bar mb-6" />
              <h2 className="industrial-subheading text-foreground mb-6">
                Our Commitment to You
              </h2>
              <div className="space-y-4">
                {[
                  "Timely project delivery without compromising quality",
                  "Transparent communication throughout every project",
                  "Competitive pricing with no hidden costs",
                  "24/7 emergency support for critical operations",
                  "Continuous improvement and innovation",
                  "Compliance with international safety standards"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button asChild variant="default" size="lg">
                  <Link to="/contact">
                    Work With Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-card p-8 md:p-12 border border-border">
              <h3 className="font-display text-2xl tracking-wide text-foreground mb-8">
                By the Numbers
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: "300+", label: "Projects Completed" },
                  { value: "150+", label: "Industrial Clients" },
                  { value: "99%", label: "Client Satisfaction" },
                  { value: "50+", label: "Expert Engineers" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl text-primary">{stat.value}</p>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="industrial-subheading text-primary-foreground mb-4">
            Partner With Industry Leaders
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join over 150 industrial clients who trust Arab Industrial Machinery 
            for their critical operations.
          </p>
          <Button asChild variant="hero-outline" size="xl">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
