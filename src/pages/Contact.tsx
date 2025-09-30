import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { saveContactMessage } from "../services/messages";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plan: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await saveContactMessage({
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
        plan: formData.plan || undefined,
        message: formData.message,
      });

      if (result) {
        setIsSubmitted(true);
        // Reset form after successful submission
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            plan: "",
            message: "",
          });
        }, 3000);
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "tradelens25@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Financial District",
      description: "New York, NY 10004",
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 24 hours",
      description: "Average response time",
    },
  ];

  const salesTeam = [
    {
      name: "Sarah Johnson",
      role: "Enterprise Sales Director",
      email: "sarah@tradelens25.com",
      phone: "+1 (555) 123-4568",
      speciality: "Large Enterprise & Custom Solutions",
    },
    {
      name: "Michael Chen",
      role: "Sales Manager",
      email: "michael@tradelens25.com",
      phone: "+1 (555) 123-4569",
      speciality: "Mid-Market & API Solutions",
    },
    {
      name: "Emily Rodriguez",
      role: "Account Executive",
      email: "emily@tradelens25.com",
      phone: "+1 (555) 123-4570",
      speciality: "SMB & Pro Plan Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Sales
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Ready to transform your trading experience? Let's talk.
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Our sales team is here to help you choose the perfect plan and get
              you started with TradeLens. Get personalized recommendations and
              exclusive offers.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Multiple ways to reach our sales team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form & Sales Team */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Fill out the form below and our sales team will get back to you
                with personalized recommendations.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    Our sales team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="plan"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Interested Plan
                    </label>
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a plan</option>
                      <option value="pro">Pro Plan</option>
                      <option value="enterprise">Enterprise Plan</option>
                      <option value="custom">Custom Solution</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell us about your trading needs, team size, and any specific requirements..."
                    />
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {submitError}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sales Team */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Our Sales Team
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our experienced sales professionals are ready to help you find
                the perfect solution for your trading needs.
              </p>

              <div className="space-y-6">
                {salesTeam.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {member.speciality}
                    </p>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Email:</span>{" "}
                        {member.email}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Phone:</span>{" "}
                        {member.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Why Choose TradeLens?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li>• 99.9% uptime guarantee</li>
                  <li>• 24/7 customer support</li>
                  <li>• Enterprise-grade security</li>
                  <li>• Custom integrations available</li>
                  <li>• 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of traders and investors using TradeLens
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pricing"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing#pricing-plans"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
