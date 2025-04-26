import { motion } from "framer-motion";
import { HandHelping, Search, Gift, Users, ShieldCheck, CircleDollarSign, PackageCheck, HandHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse Projects",
      description: "Explore various charitable projects and their specific needs across different categories."
    },
    {
      icon: Gift,
      title: "Choose Your Impact",
      description: "Select items to donate or contribute funds directly to help fulfill project requirements."
    },
    {
      icon: HandHelping,
      title: "Make a Difference",
      description: "Your contributions directly support individuals and communities in need."
    },
    {
      icon: Users,
      title: "Track Progress",
      description: "Watch as community contributions come together to meet project goals."
    }
  ];

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Verified Projects",
      description: "Each project undergoes thorough verification to ensure legitimacy and impact."
    },
    {
      icon: CircleDollarSign,
      title: "Transparent Funding",
      description: "Track exactly how your donations are used and the impact they create."
    },
    {
      icon: PackageCheck,
      title: "Direct Impact",
      description: "Your contributions go directly to those in need, with minimal overhead."
    },
    {
      icon: HandHeart,
      title: "Community Focus",
      description: "Build stronger communities through targeted local support."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow">
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How GivingPacks Works
              </h1>
              <p className="text-xl text-gray-600">
                Join us in making a meaningful impact through efficient and transparent giving
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/5 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose GivingPacks?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform ensures your generosity creates meaningful impact through verified projects and transparent processes.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-8 rounded-lg bg-gradient-to-br from-primary/10 to-transparent"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">10K+</h3>
                <p className="text-gray-600">Projects Funded</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-8 rounded-lg bg-gradient-to-br from-primary/10 to-transparent"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">50K+</h3>
                <p className="text-gray-600">Lives Impacted</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-8 rounded-lg bg-gradient-to-br from-primary/10 to-transparent"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">95%</h3>
                <p className="text-gray-600">Success Rate</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real stories of impact from our community of donors and recipients.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">School Supply Drive</h3>
                  <p className="text-gray-600 mb-4">
                    "Thanks to GivingPacks, we provided essential school supplies to over 500 students in underserved communities."
                  </p>
                  <p className="text-primary font-medium">- Local Education Foundation</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Emergency Relief</h3>
                  <p className="text-gray-600 mb-4">
                    "The platform helped us quickly mobilize resources during the natural disaster, reaching affected families within days."
                  </p>
                  <p className="text-primary font-medium">- Disaster Response Team</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Community Support</h3>
                  <p className="text-gray-600 mb-4">
                    "We connected with donors who helped furnish homes for 20 families transitioning from temporary housing."
                  </p>
                  <p className="text-primary font-medium">- Housing Initiative</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">The Donation Process</h2>
              <div className="space-y-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <span className="text-4xl font-bold text-primary">01</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                    <p className="text-gray-600">Create your account to start making a difference in your community.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <span className="text-4xl font-bold text-primary">02</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Choose Projects</h3>
                    <p className="text-gray-600">Browse through various charitable projects and select those that resonate with you.</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-lg shadow-md"
                >
                  <span className="text-4xl font-bold text-primary">03</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Make Your Contribution</h3>
                    <p className="text-gray-600">Donate items or funds directly to support project needs.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
