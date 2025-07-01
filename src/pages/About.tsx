
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section 
          className="relative py-32 md:py-40 bg-center bg-cover"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About GivingPacks
              </h1>
              <p className="text-xl text-white/90 mb-8">
                "For I was hungry and you gave me food, I was thirsty and you gave me drink, I was a stranger and you welcomed me." - Matthew 25:35
              </p>
            </div>
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
                  Our work is grounded in Scripture's clear call to care for "the least of these" (Matthew 25:40). We believe that faithful stewardship means using technology and innovation to multiply our impact, ensuring that every gift - whether time, talent, or treasure - reaches those who need it most effectively.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  "Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms." - 1 Peter 4:10
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Heart for All People</h2>
                <p className="text-gray-700 leading-relaxed">
                  Following Christ's example of love without boundaries, GivingPacks serves all people - Christians and non-Christians alike. We believe that God's love is for everyone, and our platform connects generous hearts with urgent needs across all communities. Whether supporting a family in crisis, funding educational resources, or providing medical supplies, we see each act of giving as an opportunity to reflect God's love and grace to a hurting world.
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
      </main>

      <Footer />
    </div>
  );
};

export default About;
