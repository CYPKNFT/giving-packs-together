import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Users, 
  Heart, 
  Lightbulb, 
  Target,
  Building2,
  ClipboardList,
  Package,
  TrendingUp,
  Clock,
  Shield,
  ArrowRight,
  FileText,
  Star,
  Globe,
  Eye,
  UserCheck,
  BarChart3
} from "lucide-react";

const StartProject = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      id: 1,
      title: "Get Started",
      time: "2-5 minutes",
      icon: Target,
      description: "Create your project and tell your story",
      details: [
        "Share your mission and what you're trying to achieve",
        "Describe who will benefit from your project",
        "Set clear, achievable goals for your initiative",
        "Choose the category that best fits your project",
        "Add photos and details that connect with donors"
      ],
      requirements: [
        "Project description",
        "Target beneficiaries",
        "Basic goals",
        "Category selection"
      ]
    },
    {
      id: 2,
      title: "Organization Info",
      time: "3-8 minutes", 
      icon: Building2,
      description: "Share your organization details (flexible approach)",
      details: [
        "Tell us about your organization or community group",
        "Share your mission and background",
        "Add contact information and website if available",
        "Upload official documents if you're a registered nonprofit",
        "Community groups and churches welcome - verification optional"
      ],
      requirements: [
        "Organization name and description",
        "Contact information",
        "Documents (only if formal nonprofit)",
        "Mission statement"
      ]
    },
    {
      id: 3,
      title: "List Your Needs",
      time: "5-10 minutes",
      icon: Package,
      description: "Specify what items and support you need",
      details: [
        "List the specific items you need (supplies, equipment, etc.)",
        "Set quantities and priorities for each item",
        "Add estimated costs to help donors understand impact",
        "Include item descriptions and photos when helpful",
        "Organize items by category for easy browsing"
      ],
      requirements: [
        "Item list with quantities",
        "Priority levels",
        "Cost estimates",
        "Item descriptions"
      ]
    },
    {
      id: 4,
      title: "Review & Publish",
      time: "2-5 minutes",
      icon: TrendingUp,
      description: "Launch your project and start receiving donations",
      details: [
        "Review all your project information",
        "Submit for our simple approval process",
        "Go live and start accepting donations",
        "Track progress in real-time",
        "Communicate with your donor community"
      ],
      requirements: [
        "Complete project information",
        "All required fields filled",
        "Terms acceptance",
        "Contact verification"
      ]
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands",
      description: "Connect with a community of generous donors ready to help.",
      metric: "50K+ active donors"
    },
    {
      icon: Shield,
      title: "Verified Platform",
      description: "Build trust through our rigorous verification process.",
      metric: "99.8% verification rate"
    },
    {
      icon: BarChart3,
      title: "Impact Tracking",
      description: "Monitor your progress with detailed analytics and reporting.",
      metric: "Real-time insights"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access donors worldwide with multilingual support.",
      metric: "180+ countries"
    }
  ];

  const successStories = [
    {
      title: "Emergency Housing Supplies",
      amount: "$25,000",
      items: "1,200 items",
      timeframe: "3 weeks"
    },
    {
      title: "School Technology Lab",
      amount: "$18,500",
      items: "45 computers",
      timeframe: "6 weeks"
    },
    {
      title: "Community Food Pantry",
      amount: "$12,300",
      items: "800 meals",
      timeframe: "2 weeks"
    }
  ];

  const faqs = [
    {
      question: "How long does the verification process take?",
      answer: "Our verification process typically takes 2-3 business days. We review all documentation thoroughly to ensure the highest standards of trust and transparency."
    },
    {
      question: "What types of organizations can create projects?",
      answer: "We welcome everyone! From community groups and churches to schools and registered nonprofits. Formal verification is optional for registered charities who want enhanced credibility, but anyone can create projects."
    },
    {
      question: "Are there any fees for using the platform?",
      answer: "Creating and managing projects is completely free. We only charge a small processing fee on successful donations to cover payment processing costs."
    },
    {
      question: "How do I track donation progress?",
      answer: "Your admin dashboard provides real-time tracking of donations, item fulfillment, and donor communications. You'll receive notifications for all donation activities."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6" variant="secondary">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 5,000+ Organizations
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Create Community Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From local community groups to established nonprofits - everyone can create meaningful change. 
              Launch your project in minutes and connect with donors who care about your cause.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-sm bg-primary/20 text-primary rounded-full px-4 py-2">
                <Clock className="w-4 h-4" />
                <span>4-step process</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-primary/20 text-primary rounded-full px-4 py-2">
                <Users className="w-4 h-4" />
                <span>Open to all</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-primary/20 text-primary rounded-full px-4 py-2">
                <Eye className="w-4 h-4" />
                <span>Real-time tracking</span>
              </div>
            </div>
            
            {/* Progress Overview */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {tutorialSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <div className={`rounded-lg p-4 shadow-sm border-2 transition-all duration-300 ${
                      currentStep >= index ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white'
                    }`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        currentStep >= index ? 'bg-white text-primary' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <h3 className={`font-semibold text-sm text-center ${
                        currentStep >= index ? 'text-white' : 'text-foreground'
                      }`}>{step.title}</h3>
                      <div className={`text-xs text-center mt-1 px-2 py-1 rounded-full ${
                        currentStep >= index ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                      }`}>
                        {step.time}
                      </div>
                    </div>
                    {index < tutorialSteps.length - 1 && (
                      <ArrowRight className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose GivingPacks?</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join a platform designed specifically for organizations that want to make a real difference in their communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-3">{benefit.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {benefit.metric}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Tutorial Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Step-by-Step Guide</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Follow our comprehensive guide to launch your project successfully. Each step is designed to maximize your impact and donor engagement.
            </p>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {tutorialSteps.map((step, index) => (
                <Card key={step.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">Step {step.id}: {step.title}</CardTitle>
                          <Badge variant="outline">{step.time}</Badge>
                        </div>
                        <CardDescription className="text-base">{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <ClipboardList className="w-4 h-4" />
                          What You'll Do
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {step.requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              See how organizations like yours have created meaningful impact through our platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {successStories.map((story, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">{story.title}</h3>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-primary">{story.amount}</div>
                      <div className="text-sm text-muted-foreground">{story.items} donated</div>
                      <div className="text-sm text-muted-foreground">Completed in {story.timeframe}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of communities and organizations making a difference. Create your project in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/admin/register">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Start Your Project
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary" asChild>
                  <Link to="/projects">
                    <Eye className="w-5 h-5 mr-2" />
                    View Example Projects
                  </Link>
                </Button>
              </div>
              <p className="text-sm mt-6 opacity-75">
                Already have an account? <Link to="/admin/login" className="underline hover:no-underline">Sign in here</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StartProject;