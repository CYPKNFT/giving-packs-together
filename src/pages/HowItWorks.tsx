import { motion } from "framer-motion";
import { HandHelping, Search, Gift, Users, ShieldCheck, CircleDollarSign, PackageCheck, HandHeart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      description: "Each project undergoes thorough verification to ensure legitimacy and impact.",
      color: "from-purple-100 to-purple-50"
    },
    {
      icon: CircleDollarSign,
      title: "Transparent Funding",
      description: "Track exactly how your donations are used and the impact they create.",
      color: "from-blue-100 to-blue-50"
    },
    {
      icon: PackageCheck,
      title: "Direct Impact",
      description: "Your contributions go directly to those in need, with minimal overhead.",
      color: "from-green-100 to-green-50"
    },
    {
      icon: HandHeart,
      title: "Community Focus",
      description: "Build stronger communities through targeted local support.",
      color: "from-orange-100 to-orange-50"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
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

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Why Choose GivingPacks?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform ensures your generosity creates meaningful impact through verified projects and transparent processes.
              </p>
            </motion.div>
            
            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} items-center gap-8 p-8 rounded-2xl bg-gradient-to-br ${benefit.color}`}
                >
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <benefit.icon className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 text-center md:text-left">
                    <h3 className="text-2xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-gray-700 text-lg">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
