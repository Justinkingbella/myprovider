
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Clock,
  Loader2
} from "lucide-react";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/navigation/footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-4 text-center text-gradient">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-8">
            Have questions about our platform or need assistance? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="modern-card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">For general inquiries:</p>
              <a href="mailto:info@namibianservicehub.com" className="text-blue-600 hover:underline">
                info@namibianservicehub.com
              </a>
              <p className="text-gray-600 mt-2 mb-2">For support:</p>
              <a href="mailto:support@namibianservicehub.com" className="text-blue-600 hover:underline">
                support@namibianservicehub.com
              </a>
            </div>

            <div className="modern-card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Customer Service:</p>
              <a href="tel:+26461123456" className="text-blue-600 hover:underline">
                +264 61 123 456
              </a>
              <p className="text-gray-600 mt-2 mb-2">Technical Support:</p>
              <a href="tel:+26461789012" className="text-blue-600 hover:underline">
                +264 61 789 012
              </a>
            </div>

            <div className="modern-card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-3">
                123 Independence Avenue<br />
                Windhoek<br />
                Namibia
              </p>
              <div className="flex items-center justify-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              {/* Connect with us */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Office Location</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  {/* This would normally be a Google Maps embed */}
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    Interactive Map
                  </div>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="modern-card text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="modern-card">
                  <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="input-modern"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="input-modern"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="How can we help you?"
                        required
                        className="input-modern"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message here..."
                        rows={5}
                        required
                        className="input-modern resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="btn-primary w-full mt-2" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            <div className="modern-card">
              <h3 className="text-lg font-semibold mb-2">What are your business hours?</h3>
              <p className="text-gray-600">
                Our customer service team is available Monday through Friday from 8:00 AM to 5:00 PM. Technical support is available 24/7 for urgent issues.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-lg font-semibold mb-2">How can I become a service provider?</h3>
              <p className="text-gray-600">
                To become a service provider, simply sign up for an account, select "Service Provider" as your account type, and complete the verification process.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-lg font-semibold mb-2">How long does it take to get a response?</h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
              </p>
            </div>

            <div className="modern-card">
              <h3 className="text-lg font-semibold mb-2">Do you have physical offices in other cities?</h3>
              <p className="text-gray-600">
                Currently, our main office is in Windhoek, but we're planning to expand to other major cities in Namibia soon. Our services are available nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
