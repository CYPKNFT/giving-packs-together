
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />
      
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
                Dedicated to making a difference through technology and compassion
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  At GivingPacks, we are a dedicated group of technology professionals and philanthropists united by a common goal: leveraging technology to create meaningful impact in our communities. As a non-profit tech organization, we believe in the power of innovation to address social challenges and improve lives.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Drives Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  We recognized a gap between charitable organizations and potential donors - a disconnect that often resulted in inefficient resource allocation and missed opportunities to help those in need. GivingPacks was born from our desire to bridge this gap using technology, making it easier for donors to contribute and for organizations to receive exactly what they need.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
                <p className="text-gray-700 leading-relaxed">
                  By creating a platform that directly connects donors with specific needs, we ensure that every contribution makes a meaningful impact. Our technology enables transparent, efficient, and targeted giving, transforming how charitable organizations receive and distribute resources to those who need them most.
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
