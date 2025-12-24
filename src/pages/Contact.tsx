import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["Industrial Area", "Sharjah, United Arab Emirates"]
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+971 00 000 0000", "+971 00 000 0001"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@aim-fzc.com", "support@aim-fzc.com"]
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Sunday - Thursday: 8:00 AM - 6:00 PM", "24/7 Emergency Support"]
  }
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent Successfully",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

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
              Contact Us
            </h1>
            <p className="text-xl text-secondary-foreground/80 leading-relaxed">
              Ready to discuss your industrial machinery needs? Get in touch 
              with our team of experts today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="red-accent-bar mb-6" />
              <h2 className="industrial-subheading text-foreground mb-4">
                Request a Quote
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and one of our specialists will contact 
                you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@company.com"
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 XX XXX XXXX"
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="h-12 bg-card border-border focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    required
                    rows={6}
                    className="bg-card border-border focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="default" 
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div>
              <div className="bg-industrial-charcoal p-8 text-secondary-foreground mb-8">
                <h3 className="font-display text-xl tracking-wide mb-6">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-secondary-foreground/70 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary p-8 text-primary-foreground">
                <h3 className="font-display text-xl tracking-wide mb-4">
                  Why Contact Us?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free initial consultation",
                    "Detailed project assessment",
                    "Competitive quotation",
                    "Expert recommendations",
                    "24/7 support availability"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Served */}
      <section className="section-padding bg-industrial-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="red-accent-bar mx-auto mb-6" />
            <h2 className="industrial-subheading text-foreground mb-4">
              Regions We Serve
            </h2>
            <p className="text-muted-foreground">
              Providing industrial solutions across the Middle East
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "United Arab Emirates",
              "Saudi Arabia",
              "Qatar",
              "Bahrain",
              "Kuwait",
              "Oman",
              "Jordan",
              "Iraq",
              "Egypt",
              "Pakistan",
              "India",
              "Africa"
            ].map((region) => (
              <div 
                key={region}
                className="bg-card p-4 text-center border border-border"
              >
                <p className="text-foreground text-sm">{region}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="industrial-subheading text-primary-foreground mb-4">
                24/7 Emergency Support
              </h2>
              <p className="text-primary-foreground/80">
                For urgent machinery breakdowns or critical maintenance needs, 
                our emergency response team is available around the clock.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-primary-foreground/80 text-sm uppercase tracking-wider mb-2">
                Emergency Hotline
              </p>
              <a 
                href="tel:+971000000000" 
                className="font-display text-4xl text-primary-foreground hover:underline"
              >
                +971 00 000 0000
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
