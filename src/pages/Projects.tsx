import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  {
    id: 1,
    title: "Steel Manufacturing Plant Installation",
    location: "Dubai Industrial City, UAE",
    category: "Installation",
    description: "Complete installation of heavy rolling mill equipment including overhead cranes, conveyors, and hydraulic systems. Project delivered on schedule with zero safety incidents.",
    image: project1,
    scope: ["Rolling Mill Installation", "Crane Systems", "Hydraulic Equipment", "Electrical Integration"],
    year: "2023"
  },
  {
    id: 2,
    title: "Petrochemical Facility Upgrade",
    location: "Jubail, Saudi Arabia",
    category: "Maintenance & Upgrade",
    description: "Major overhaul and upgrade of processing equipment at a leading petrochemical facility. Included pump replacements, piping modifications, and control system upgrades.",
    image: project2,
    scope: ["Pump Overhaul", "Piping Systems", "Control Upgrades", "Safety Systems"],
    year: "2023"
  },
  {
    id: 3,
    title: "Custom Fabrication - Pressure Vessels",
    location: "Sharjah, UAE",
    category: "Fabrication",
    description: "Design and fabrication of custom pressure vessels for a chemical processing plant. All work completed to ASME standards with full documentation.",
    image: project3,
    scope: ["Engineering Design", "ASME Fabrication", "Quality Testing", "Delivery & Installation"],
    year: "2022"
  },
  {
    id: 4,
    title: "Power Plant Turbine Commissioning",
    location: "Abu Dhabi, UAE",
    category: "Commissioning",
    description: "Full commissioning services for new gas turbine installation including pre-commissioning checks, functional testing, and operator training.",
    image: project4,
    scope: ["Pre-commissioning", "Performance Testing", "Operator Training", "Documentation"],
    year: "2022"
  },
  {
    id: 5,
    title: "Food Processing Line Installation",
    location: "Ras Al Khaimah, UAE",
    category: "Installation",
    description: "Installation of automated food processing equipment meeting strict hygiene and safety standards. Included conveyor systems, packaging machinery, and quality control stations.",
    image: project1,
    scope: ["Processing Equipment", "Conveyor Systems", "Packaging Lines", "Hygiene Compliance"],
    year: "2021"
  },
  {
    id: 6,
    title: "Cement Plant Maintenance Contract",
    location: "Fujairah, UAE",
    category: "Maintenance",
    description: "Ongoing preventive maintenance contract for major cement manufacturing facility. Includes scheduled inspections, predictive maintenance, and emergency repairs.",
    image: project2,
    scope: ["Scheduled Maintenance", "Condition Monitoring", "Spare Parts Management", "Emergency Support"],
    year: "Ongoing"
  },
];

const categories = ["All", "Installation", "Maintenance", "Fabrication", "Commissioning"];

const Projects = () => {
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
                      Our Projects
                    </h1>
      
                    <p className="text-lg text-secondary-foreground/80">
                      A showcase of our completed work across diverse industrial sectors 
                      throughout the Middle East region.
                    </p>
      
                  </div>
                </div>
              </div>
            </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "300+", label: "Projects Completed" },
              { value: "12+", label: "Countries Served" },
              { value: "150+", label: "Satisfied Clients" },
              { value: "10+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
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

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore some of our key projects that demonstrate our capabilities 
              and commitment to excellence.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
                  category === "All" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="industrial-card overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-muted-foreground text-sm">{project.year}</span>
                  </div>
                  <h3 className="font-display text-xl tracking-wide text-foreground mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.slice(0, 2).map((item) => (
                      <span 
                        key={item}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs"
                      >
                        {item}
                      </span>
                    ))}
                    {project.scope.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs">
                        +{project.scope.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Oil & Gas",
              "Manufacturing",
              "Power Generation",
              "Petrochemical",
              "Food Processing",
              "Steel & Metals",
              "Cement",
              "Pharmaceuticals",
              "Water Treatment",
              "Marine",
              "Construction",
              "Mining"
            ].map((industry) => (
              <div 
                key={industry}
                className="bg-card p-4 text-center border border-border hover:border-primary transition-colors"
              >
                <p className="text-foreground text-sm font-medium">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="industrial-subheading text-primary-foreground mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help bring your industrial project to life 
            with our proven expertise and commitment to excellence.
          </p>
          <Button asChild variant="hero-outline" size="xl">
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
