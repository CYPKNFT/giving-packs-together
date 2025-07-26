import { motion } from "framer-motion";
import { HandHelping, Search, Gift, Users, ShieldCheck, CircleDollarSign, PackageCheck, HandHeart, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Pray",
      description: "Explore various charitable projects and pray for guidance in selecting where to serve."
    },
    {
      icon: Gift,
      title: "Give with Purpose",
      description: "Select items to donate or contribute funds, trusting God to multiply your gifts."
    },
    {
      icon: HandHelping,
      title: "Serve with Love",
      description: "Your contributions directly support individuals and communities, showing Christ's love."
    },
    {
      icon: Heart,
      title: "Pray & Follow Up",
      description: "Continue in prayer for those served and watch how God works through the community."
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
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in-up">
                How It Works
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                "In everything I did, I showed you that by this kind of hard work we must help the weak, remembering the words the Lord Jesus himself said: 'It is more blessed to give than to receive.'"
              </p>
              <p className="text-lg text-white/80 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                - Acts 20:35
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
            
            {/* Prayer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-center"
            >
              <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Join Us in Prayer</h3>
              <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                "And God is able to bless you abundantly, so that in all things at all times, having all that you need, you will abound in every good work." - 2 Corinthians 9:8
              </p>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Before you give, we encourage you to pray for those you'll be serving and ask God to guide your generosity. Together, let's trust Him to multiply our efforts and create lasting impact.
              </p>
              <Button asChild size="lg" className="elegant-gradient text-white hover-lift">
                <Link to="/projects">Start Giving with Prayer</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
