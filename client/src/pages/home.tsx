import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { apiRequest } from "@/lib/queryClient";
import { 
  Calculator, 
  TrendingUp, 
  FileText, 
  Building, 
  Search, 
  Shield, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Menu, 
  X,
  CheckCircle,
  Mail,
  ExternalLink
} from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  // Scroll animations
  const heroAnimation = useScrollAnimation();
  const servicesAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  const contactAnimation = useScrollAnimation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message sent successfully!",
        description: data.message,
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold brand-blue">MSD CPA</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</button>
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</button>
                <a href="tel:+12048008851" className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <Phone className="w-4 h-4 mr-2" />Call Now
                </a>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <button onClick={() => scrollToSection('home')} className="text-gray-900 block w-full text-left px-3 py-2 text-base font-medium">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-600 hover:text-blue-600 block w-full text-left px-3 py-2 text-base font-medium">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 block w-full text-left px-3 py-2 text-base font-medium">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 block w-full text-left px-3 py-2 text-base font-medium">Contact</button>
              <a href="tel:+12048008851" className="bg-blue-600 text-white block px-3 py-2 text-base font-medium rounded-full mt-2">Call Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div 
            ref={heroAnimation.ref}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              heroAnimation.isVisible ? 'animate-fade-in-up' : ''
            }`}
          >
            <div className={heroAnimation.isVisible ? 'animate-fade-in-up' : ''}>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                heroAnimation.isVisible ? 'animate-slide-up staggered-animation-1' : ''
              }`}>
                Expert <span className="text-blue-200">CPA Services</span> in Winnipeg
              </h1>
              <p className={`text-xl text-blue-100 mb-8 leading-relaxed ${
                heroAnimation.isVisible ? 'animate-fade-in-left staggered-animation-2' : ''
              }`}>
                MSD Chartered Professional Accountant Inc provides exceptional accounting services with meticulous attention to detail. Trust our expertise for all your tax and financial needs.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 ${
                heroAnimation.isVisible ? 'animate-scale-in staggered-animation-3' : ''
              }`}>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-full"
                >
                  Get Free Consultation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 rounded-full bg-transparent"
                  asChild
                >
                  <a href="tel:+12048008851" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />Call (204) 800-8851
                  </a>
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className={`mt-12 flex items-center gap-8 ${
                heroAnimation.isVisible ? 'animate-fade-in-right staggered-animation-4' : ''
              }`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-300">5.0</div>
                  <div className="flex text-yellow-300 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs text-blue-200">Google Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">15+</div>
                  <div className="text-xs text-blue-200">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-200">CPA</div>
                  <div className="text-xs text-blue-200">Certified Professional</div>
                </div>
              </div>
            </div>
            
            <div className={`lg:block ${
              heroAnimation.isVisible ? 'animate-fade-in-right staggered-animation-5' : ''
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional accounting office" 
                className="rounded-xl shadow-2xl w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/6 to-pink-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-400/4 to-cyan-400/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={servicesAnimation.ref}
            className={`text-center mb-16 ${
              servicesAnimation.isVisible ? 'animate-fade-in-up' : ''
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive CPA Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From tax preparation to business consulting, we provide complete accounting solutions tailored to your needs.
            </p>
          </div>
          
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            servicesAnimation.isVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            {/* Service Cards */}
            {[
              {
                icon: Calculator,
                title: "Tax Preparation",
                description: "Expert tax preparation services for individuals and businesses. Maximize your returns and ensure compliance.",
                features: ["Personal Income Tax", "Corporate Tax Returns", "Tax Planning & Strategy"]
              },
              {
                icon: TrendingUp,
                title: "Business Consulting",
                description: "Strategic financial guidance to help your business grow and optimize operations.",
                features: ["Financial Planning", "Business Structure Advice", "Growth Strategies"]
              },
              {
                icon: FileText,
                title: "Bookkeeping",
                description: "Accurate and organized bookkeeping services to keep your finances on track.",
                features: ["Monthly Bookkeeping", "Financial Statements", "Accounts Reconciliation"]
              },
              {
                icon: Building,
                title: "Corporate Services",
                description: "Complete corporate accounting solutions for businesses of all sizes.",
                features: ["Corporate Tax Returns", "Financial Reporting", "Compliance Management"]
              },
              {
                icon: Search,
                title: "Financial Analysis",
                description: "In-depth financial analysis to help you make informed business decisions.",
                features: ["Performance Analysis", "Budget Planning", "Investment Advice"]
              },
              {
                icon: Shield,
                title: "Audit Support",
                description: "Professional audit support and preparation services for peace of mind.",
                features: ["Audit Preparation", "Documentation Review", "Compliance Assistance"]
              }
            ].map((service, index) => (
              <Card 
                key={index} 
                className={`bg-white/90 backdrop-blur-sm hover:bg-white/95 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-blue-300/70 shadow-lg hover:shadow-blue-500/20 ${
                  servicesAnimation.isVisible ? 'animate-slide-up' : ''
                } staggered-animation-${(index % 6) + 1}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                  <service.icon className={`w-8 h-8 text-blue-600 mb-4 ${
                    servicesAnimation.isVisible ? 'animate-bounce-in animate-float' : ''
                  } staggered-animation-${(index % 6) + 1}`} style={{ animationDelay: `${index * 0.15 + 0.3}s` }} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={aboutAnimation.ref}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              aboutAnimation.isVisible ? 'animate-fade-in-left' : ''
            }`}
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional business meeting" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose MSD CPA?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                MSD Chartered Professional Accountant Inc has been providing exceptional accounting services in Winnipeg since 2016. Led by Chaminda, our team combines expertise with a personal touch to deliver results that exceed expectations.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Proven Expertise",
                    description: "Chartered Professional Accountant with years of experience across various industries."
                  },
                  {
                    title: "Personalized Service", 
                    description: "We take time to understand your unique needs and provide tailored solutions."
                  },
                  {
                    title: "Attention to Detail",
                    description: "Meticulous approach ensures accuracy and compliance in all our work."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button onClick={() => scrollToSection('contact')} size="lg" className="rounded-full">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Owner LinkedIn Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div 
            ref={aboutAnimation.ref}
            className={`text-center ${aboutAnimation.isVisible ? 'animate-fade-in-up' : ''}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className={`flex-shrink-0 ${aboutAnimation.isVisible ? 'animate-scale-in staggered-animation-1' : ''}`}>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center text-white shadow-2xl relative overflow-hidden border-4 border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-transparent"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">CP</div>
                    <div className="text-xs font-medium opacity-90">CPA</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className={`flex-1 text-left ${aboutAnimation.isVisible ? 'animate-slide-up staggered-animation-2' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chaminda Pathirage, CPA</h3>
                <p className="text-blue-600 font-semibold mb-4">Founder & Managing Partner</p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  A dedicated Chartered Professional Accountant with extensive experience in taxation, financial reporting, and business advisory services. Chaminda leads MSD CPA with a commitment to providing personalized, high-quality accounting solutions to businesses and individuals throughout Winnipeg.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">15+ Years Experience</span>
                  </div>
                  <a 
                    href="https://ca.linkedin.com/in/chaminda-pathirage-cpa-b2275673" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={testimonialsAnimation.ref}
            className={`text-center mb-16 ${
              testimonialsAnimation.isVisible ? 'animate-fade-in-up' : ''
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>
          
          <div className={`grid md:grid-cols-3 gap-8 ${
            testimonialsAnimation.isVisible ? 'animate-scale-in' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            {[
              {
                rating: 5,
                text: "Amazing service and attention to detail! I have been working with Chaminda and his team since 2016 and they are amazing to work with.",
                author: "tmotyka13",
                role: "Long-term Client"
              },
              {
                rating: 5,
                text: "As an owner of a small business, I rely on MSD for all my tax matters. Chaminda provides exceptional accounting services that consistently exceed my expectations.",
                author: "Khalid Cheema",
                role: "Small Business Owner"
              },
              {
                rating: 5,
                text: "I was able to get very good tax returns and a better understanding of the tax system. The organization and communication was efficient.",
                author: "AP AP",
                role: "Individual Client"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200 ${
                  testimonialsAnimation.isVisible ? 'animate-slide-up' : ''
                } staggered-animation-${(index % 3) + 1}`}
              >
                <CardContent className="p-8">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-100 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={contactAnimation.ref}
            className={`text-center mb-16 ${
              contactAnimation.isVisible ? 'animate-fade-in-up' : ''
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to get started? Contact us today for a free consultation.
            </p>
          </div>
          
          <div className={`grid lg:grid-cols-2 gap-12 ${
            contactAnimation.isVisible ? 'animate-fade-in-left' : ''
          }`} style={{ animationDelay: '0.2s' }}>
            {/* Contact Form */}
            <Card className="bg-white text-gray-900">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4} 
                              placeholder="Tell us about your accounting needs..."
                              className="resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full rounded-full" 
                      size="lg"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Info */}
              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Office Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Address</h4>
                        <p className="text-gray-600">575 St Mary's Rd #200<br />Winnipeg, MB R2M 3L6</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <a href="tel:+12048008851" className="text-gray-600 hover:text-blue-600 transition-colors">
                          (204) 800-8851
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Business Hours</h4>
                        <div className="text-gray-600 space-y-1">
                          <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
                          <div>Saturday - Sunday: Closed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Google Maps */}
              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-gray-900">Find Us</h3>
                  <div className="rounded-lg overflow-hidden">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2571.0123456789!2d-97.1130144!3d49.8650668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52ea77715556c605%3A0x24524be931b479e9!2sMSD%20Chartered%20Professional%20Accountant%20Inc!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca" 
                      width="100%" 
                      height="250" 
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a 
                    href="https://www.google.com/maps/place/MSD+Chartered+Professional+Accountant+Inc/@49.8650668,-97.1130144,17z/data=!3m1!4b1!4m6!3m5!1s0x52ea77715556c605:0x24524be931b479e9!8m2!3d49.8650668!4d-97.1104341!16s%2Fg%2F11lmcyb635?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MSD Chartered Professional Accountant Inc</h3>
              <p className="text-gray-300 mb-4">
                Expert CPA services in Winnipeg. We provide exceptional accounting solutions with meticulous attention to detail.
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-gray-300 ml-2">5.0 (8 Reviews)</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <div>575 St Mary's Rd #200, Winnipeg, MB R2M 3L6</div>
                <div><a href="tel:+12048008851" className="hover:text-white transition-colors">(204) 800-8851</a></div>
                <div>Monday - Friday: 9:00 AM - 5:00 PM</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MSD Chartered Professional Accountant Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
