import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-industrial.jpg";
import productImg1 from "@/assets/project-1.jpg";
import productImg2 from "@/assets/project-2.jpg";
import productImg3 from "@/assets/project-3.jpg"; // replace with real product images

const products = [
  {
    title: "Industrial Mixers",
    description:
      "Heavy-duty industrial mixers engineered for precision blending and long-term durability in demanding environments.",
  },
  {
    title: "Material Handling Equipment",
    description:
      "Reliable and efficient material handling systems designed for high-load industrial operations.",
  },
  {
    title: "Processing Machines",
    description:
      "Advanced industrial processing machines built for productivity and operational excellence.",
  },
];

const ProductGuide = () => {
  return (
    <Layout>

      {/* HERO SECTION (MATCH HOME STYLE) */}
      <section className="relative min-h-[70vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-industrial-dark/90" />
        </div>

        <div className="relative z-10 w-full py-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="pl-6 md:pl-12 lg:pl-24 max-w-3xl animate-fade-in-up">

              <div className="red-accent-bar mb-6" />

              <h1 className="industrial-heading text-secondary-foreground mb-6">
                Product
                <span className="block text-primary">Guide & Catalog</span>
              </h1>

              <p className="text-lg text-secondary-foreground/80 mb-8">
                Explore our complete range of industrial machinery and engineering
                solutions designed for performance, durability, and efficiency.
              </p>

              <Button asChild variant="hero" size="lg">
                <a href="/product-guide.pdf" download>
                  Download Full Catalog
                  {/* <FileText className="ml-2 w-5 h-5" /> */}
                </a>
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* CATALOG BROCHURE DISPLAY */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">

          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              Product Catalog
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete machinery catalog below. Scroll through pages
              or download the full version.
            </p>
          </div>

          <div className="space-y-12">

            {[1,2,3,4,5,6,7].map((page) => (
              <div 
                key={page}
                className="shadow-2xl border border-border/20 bg-white"
              >
                <img
                  src={`/catalog/catalog-${page}.jpg`}
                  alt={`Catalog Page ${page}`}
                  className="w-full"
                />
              </div>
            ))}

          </div>

          <div className="text-center mt-12">
            <Button asChild variant="default" size="lg">
              <a href="/product-guide.pdf" download>
                Download Full Catalog (PDF)
              </a>
            </Button>
          </div>

        </div>
      </section>

      {/* PRODUCT LIST SECTION */}
      {/* <section className="section-padding bg-background">
        <div className="container-custom">

          <div className="text-center mb-16">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              Our Machinery Range
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built to meet international standards with reliability and precision engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.title}
                className="industrial-card overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={productImg1}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl tracking-wide text-foreground mb-3">
                    {product.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6">
                    {product.description}
                  </p>

                  <Button asChild variant="outline">
                    <Link to="/contact">
                      Request Quotation
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* INDUSTRIAL CTA SECTION (MATCH HOME CTA STYLE) */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="industrial-subheading text-primary-foreground mb-4">
            Need Detailed Specifications?
          </h2>

          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Download our complete product catalog or contact our team
            for customized industrial solutions.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Button asChild variant="hero-outline" size="lg">
              <a href="/product-guide.pdf" download>
                Download PDF
              </a>
            </Button>

            <Button asChild variant="default" size="lg">
              <Link to="/contact">
                Contact Sales
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default ProductGuide;
