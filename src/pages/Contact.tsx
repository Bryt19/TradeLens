import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { saveContactMessage } from "../services/messages";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { motion, AnimatePresence } from "framer-motion";
import FeatureShaderCards from "../components/ui/feature-shader-cards";

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
            <FadeInOnScroll direction="up" delay={0}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Contact Sales
              </motion.h1>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={100}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl mb-8 text-blue-100"
              >
                Ready to transform your trading experience? Let's talk.
              </motion.p>
            </FadeInOnScroll>
            <FadeInOnScroll direction="up" delay={200}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-blue-200 max-w-3xl mx-auto"
              >
                Our sales team is here to help you choose the perfect plan and get
                you started with TradeLens. Get personalized recommendations and
                exclusive offers.
              </motion.p>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <FeatureShaderCards
        features={contactInfo.map((info) => {
          const Icon = info.icon;
          return {
            title: info.title,
            description: info.description,
            details: info.details,
            icon: <Icon className="w-12 h-12 text-white" />,
          };
        })}
        title="Get in Touch"
        subtitle="Multiple ways to reach our sales team"
      />

      {/* Contact Form & Sales Team */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <FadeInOnScroll direction="left" delay={0}>
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Send us a Message
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-600 dark:text-gray-300 mb-8"
                >
                  Fill out the form below and our sales team will get back to you
                  with personalized recommendations.
                </motion.p>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2"
                      >
                        Message Sent Successfully!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-green-600 dark:text-green-300"
                      >
                        Our sales team will contact you within 24 hours.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Full Name *
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            placeholder="Your full name"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Email Address *
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            placeholder="your@email.com"
                          />
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Company
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            placeholder="Your company name"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                        >
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Phone Number
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                            placeholder="+1 (555) 123-4567"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        <label
                          htmlFor="plan"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Interested Plan
                        </label>
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          id="plan"
                          name="plan"
                          value={formData.plan}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                        >
                          <option value="">Select a plan</option>
                          <option value="pro">Pro Plan</option>
                          <option value="enterprise">Enterprise Plan</option>
                          <option value="custom">Custom Solution</option>
                          <option value="not-sure">Not sure yet</option>
                        </motion.select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                      >
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Message *
                        </label>
                        <motion.textarea
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all resize-none"
                          placeholder="Tell us about your trading needs, team size, and any specific requirements..."
                        />
                      </motion.div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {submitError && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4"
                          >
                            <p className="text-red-600 dark:text-red-400 text-sm">
                              {submitError}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
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
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeInOnScroll>

            {/* Sales Team */}
            <FadeInOnScroll direction="right" delay={0}>
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
                >
                  Meet Our Sales Team
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-600 dark:text-gray-300 mb-8"
                >
                  Our experienced sales professionals are ready to help you find
                  the perfect solution for your trading needs.
                </motion.p>

                <div className="space-y-6">
                  {salesTeam.map((member, index) => (
                    <FadeInOnScroll key={index} direction="right" delay={index * 100}>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 cursor-pointer"
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
                      </motion.div>
                    </FadeInOnScroll>
                  ))}
                </div>

                <FadeInOnScroll direction="up" delay={300}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Why Choose TradeLens?
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      {[
                        "99.9% uptime guarantee",
                        "24/7 customer support",
                        "Enterprise-grade security",
                        "Custom integrations available",
                        "30-day money-back guarantee",
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        >
                          • {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </FadeInOnScroll>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll direction="up" delay={0}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Get Started?
            </motion.h2>
          </FadeInOnScroll>
          <FadeInOnScroll direction="up" delay={100}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl mb-8 text-blue-100"
            >
              Join thousands of traders and investors using TradeLens
            </motion.p>
          </FadeInOnScroll>
          <FadeInOnScroll direction="up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/pricing"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center inline-block"
                >
                  Start Free Trial
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/pricing#pricing-plans"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center inline-block"
                >
                  View Pricing
                </Link>
              </motion.div>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </div>
  );
};

export default Contact;
