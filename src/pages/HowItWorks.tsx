
import { motion } from "framer-motion";
import { HandHelping, Search, Gift, Users } from "lucide-react";
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />
      
      <main className="flex-grow">
        {/* Hero Section */}
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

        {/* Steps Section */}
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

        {/* Process Flow Section */}
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
