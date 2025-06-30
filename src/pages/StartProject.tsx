
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Users, Heart, Lightbulb } from "lucide-react";

const StartProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    organization: '',
    contactEmail: '',
    itemsNeeded: '',
    targetAmount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project submission:', formData);
    // Here you would typically submit to a backend
    alert('Thank you! Your project proposal has been submitted for review.');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    {
      icon: Users,
      title: "Reach Thousands",
      description: "Connect with a community of generous donors ready to help."
    },
    {
      icon: Heart,
      title: "Direct Impact",
      description: "Receive exactly what you need with transparent tracking."
    },
    {
      icon: CheckCircle,
      title: "Verified Platform",
      description: "Build trust through our verification process."
    },
    {
      icon: Lightbulb,
      title: "Easy Setup",
      description: "Get your project live quickly with our simple process."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Start Your Project</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a cause that needs support? Create a project and connect with donors who want to make a difference.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Start a Project with GivingPacks?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">Submit Your Project</CardTitle>
                  <p className="text-gray-600 text-center">
                    Fill out the form below and we'll review your project within 2-3 business days.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Give your project a compelling title"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="organization">Organization Name *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        placeholder="Your organization or personal name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="emergency">Emergency Relief</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your project, its goals, and why it matters..."
                        className="min-h-32"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="itemsNeeded">Items Needed</Label>
                      <Textarea
                        id="itemsNeeded"
                        value={formData.itemsNeeded}
                        onChange={(e) => handleInputChange('itemsNeeded', e.target.value)}
                        placeholder="List the specific items you need (e.g., school supplies, medical equipment, etc.)"
                        className="min-h-24"
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetAmount">Target Amount (Optional)</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        value={formData.targetAmount}
                        onChange={(e) => handleInputChange('targetAmount', e.target.value)}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Submit Project for Review
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Submit</h3>
                <p className="text-gray-600">Fill out our simple form with your project details.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Review</h3>
                <p className="text-gray-600">Our team reviews and verifies your project within 2-3 days.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Launch</h3>
                <p className="text-gray-600">Once approved, your project goes live and starts receiving donations.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default StartProject;
