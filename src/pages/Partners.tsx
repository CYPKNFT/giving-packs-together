import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Heart, Leaf, Users, Church, PawPrint, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Partners = () => {
  const partnerCategories = [
    {
      icon: <Church className="h-8 w-8" />,
      title: "Faith Communities",
      description: "Churches and religious organizations making a difference",
      partners: [
        "Grace Community Church",
        "St. Mary's Cathedral",
        "Unity Fellowship",
        "Hope Baptist Church"
      ],
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Environmental Organizations",
      description: "Leading the charge in environmental conservation",
      partners: [
        "Green Earth Initiative",
        "Clean Rivers Coalition",
        "Sustainable Future Foundation",
        "Urban Forest Alliance"
      ],
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <PawPrint className="h-8 w-8" />,
      title: "Animal Welfare Groups",
      description: "Protecting and caring for animal welfare",
      partners: [
        "Compassionate Paws Rescue",
        "Wildlife Conservation Society",
        "Animal Care Network",
        "Humane Society Alliance"
      ],
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Organizations",
      description: "Local groups creating positive community impact",
      partners: [
        "Neighborhood Watch Alliance",
        "Youth Development Center",
        "Senior Care Network",
        "Community Health Initiative"
      ],
      color: "bg-purple-50 border-purple-200"
    }
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Amplify Impact",
      description: "Reach wider audiences and achieve greater social outcomes together"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Shared Values",
      description: "Align with organizations that share your commitment to positive change"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Network",
      description: "Access our engaged community of donors and volunteers"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-6">
                Partnership Program
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Partner with Us to{" "}
                <span className="text-primary">Amplify Impact</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join forces with a network of organizations committed to creating lasting positive change 
                in communities worldwide. Together, we can achieve more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Partner With Us?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                When we work together, we create exponential impact that benefits everyone involved
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full text-primary">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Showcase */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Trusted Partners
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're proud to collaborate with these outstanding organizations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partnerCategories.map((category, index) => (
                <Card key={index} className={`${category.color} hover:shadow-lg transition-shadow`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{category.title}</CardTitle>
                        <p className="text-muted-foreground text-sm">{category.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {category.partners.map((partner, partnerIndex) => (
                        <div 
                          key={partnerIndex}
                          className="bg-background/60 p-3 rounded-lg text-sm font-medium"
                        >
                          {partner}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Partner Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How to Partner
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Starting a partnership with us is simple and straightforward
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Express Interest", description: "Reach out to us with your partnership goals" },
                  { step: "2", title: "Discovery Call", description: "We'll discuss opportunities and alignment" },
                  { step: "3", title: "Partnership Agreement", description: "Formalize our collaboration framework" },
                  { step: "4", title: "Launch & Collaborate", description: "Begin creating impact together" }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Make a Greater Impact?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join our network of partners and let's create positive change together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Partnership Discussion
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Download Partnership Guide
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;