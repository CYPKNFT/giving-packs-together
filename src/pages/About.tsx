
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactStoriesSection from "@/components/ImpactStoriesSection";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative py-32 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')`
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-fade-in-up">About GivingPacks</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              "Building communities through the power of generous hearts and faithful stewardship."
            </p>
            <p className="text-lg text-white/80 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              - Matthew 6:21
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Calling</h2>
                <p className="text-gray-700 leading-relaxed">
                  GivingPacks exists to fulfill Christ's commandment to love our neighbors as ourselves. We are a community of believers and compassionate individuals united by the biblical principle of stewardship - recognizing that all we have comes from God and should be used to serve others. Our mission is to bridge the gap between those who have been blessed with resources and those in need, regardless of their background, race, or beliefs.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Biblical Foundation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our work is grounded in Scripture's call to love and serve one another. We believe that faithful stewardship means using technology and innovation to multiply our impact, ensuring that every gift - whether time, talent, or treasure - creates lasting change in communities around the world.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms." - 1 Peter 4:10
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Building Communities Through Generosity</h2>
                <p className="text-gray-700 leading-relaxed">
                  Following Christ's example of love without boundaries, GivingPacks connects generous hearts with meaningful opportunities to make a difference. We believe in the power of community, the strength found in unity, and the transformative impact of generous giving. Whether supporting education initiatives, community development, or emergency relief, we see each act of giving as an opportunity to build stronger, more resilient communities where everyone can thrive.
                </p>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-primary mb-3">Our Prayer</h3>
                <p className="text-gray-700 italic">
                  "Lord, help us be faithful stewards of the resources You've entrusted to us. May this platform be a tool in Your hands to demonstrate Your love, provide for those in need, and bring hope to the hopeless. Use us to be Your hands and feet in a world that desperately needs Your touch."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stories Section */}
        <ImpactStoriesSection />
      </main>

      <Footer />
    </div>
  );
};

export default About;
