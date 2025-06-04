import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiUser, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Helmet, HelmetData } from 'react-helmet-async';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '234b9caf-40e4-48a0-8169-1c68039db20d', // Replace with your actual key
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(120, 113, 108, 0.3)",
      borderColor: "#a8a29e"
    }
  };

  const buttonVariants = {
    initial: {
      backgroundColor: "#292524",
      scale: 1
    },
    hover: {
      backgroundColor: "#1c1917",
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    },
    submitting: {
      backgroundColor: "#44403c",
      scale: 0.98
    }
  };

  const successVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const errorVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Emerge Construction | Building Services in Akola</title>
        <meta name="description" content="Connect with Emerge Construction for all your construction needs in Akola. Request quotes, schedule consultations, or discuss your building project with our expert team." />
        <meta name="keywords" content="contact emerge construction akola, construction company contact, construction services akola contact, building contractors akola contact, construction consultation akola" />
        <link rel="canonical" href="https://emergeconstruction.in/contact" />

        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Contact Emerge Construction | Building Services in Akola" />
        <meta property="og:description" content="Connect with Emerge Construction for all your construction needs in Akola. Request quotes or discuss your building project with our expert team." />
        <meta property="og:image" content="https://emergeconstruction.in/contact-og-image.jpg" />
        <meta property="og:url" content="https://emergeconstruction.in/contact" />
        <meta property="og:type" content="website" />

        {/* Additional tags for contact page */}
        <meta name="format-detection" content="telephone=yes" />
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Emerge Construction",
      "description": "Contact Emerge Construction for construction services in Akola",
      "mainEntity": {
        "@type": "Organization",
        "name": "Emerge Construction",
        "telephone": "+91 8698165330",
        "email": "info@emergeconstruction.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Akola",
          "addressRegion": "Maharashtra",
          "postalCode": "444001",
          "addressCountry": "IN"
        }
      }
    }
    `}
        </script>
      </Helmet>
      <div
        className="relative py-16 pt-10 px-4 sm:px-6 lg:px-8 overflow-hidden text-gray-900"
        style={{
          background: `
          radial-gradient(circle at 70% 80%, rgba(214, 211, 209, 0.5) 0%, transparent 25%),
          linear-gradient(135deg, #ffffff 0%, #fafaf9 50%, #f5f5f4 100%)
        `
        }}
        id="contact"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-stone-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-stone-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-32 h-32 bg-stone-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h1
              variants={cardVariants}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Let's <span className="text-stone-600">Connect</span>
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-lg text-stone-600 max-w-2xl mx-auto"
            >
              Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={cardVariants}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-stone-200"
          >
            {submitSuccess ? (
              <motion.div
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-stone-100 mb-6"
                >
                  <FiCheckCircle className="h-8 w-8 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-stone-800 mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-stone-600 mb-6">
                  Thank you for reaching out. We've received your message and will respond within 24 hours.
                </p>
                <motion.button
                  onClick={() => setSubmitSuccess(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-stone-800 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors shadow-sm"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <>
                {submitError && (
                  <motion.div
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start"
                  >
                    <svg className="h-5 w-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{submitError}</span>
                  </motion.div>
                )}

                <motion.form
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={cardVariants} className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-stone-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-800 placeholder-stone-400 transition-all duration-200"
                          placeholder="Enter Your Name"
                          required
                          whileFocus={inputVariants.focus}
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={cardVariants} className="relative">
                      <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                        Email Address <span className="text-stone-400">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-stone-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-800 placeholder-stone-400 transition-all duration-200"
                          placeholder="shriyash@example.com"
                          required
                          whileFocus={inputVariants.focus}
                        />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div variants={cardVariants} className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPhone className="h-5 w-5 text-stone-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-800 placeholder-stone-400 transition-all duration-200"
                        placeholder="+91 888 888 8888"
                        whileFocus={inputVariants.focus}
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={cardVariants} className="relative">
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                        <FiMessageSquare className="h-5 w-5 text-stone-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none text-stone-800 placeholder-stone-400 transition-all duration-200"
                        placeholder="Tell us about your project or inquiry..."
                        required
                        whileFocus={inputVariants.focus}
                      ></textarea>
                    </div>
                  </motion.div>

                  <motion.div variants={cardVariants} className="pt-2">
                    <motion.button
                      type="submit"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover={isSubmitting ? "submitting" : "hover"}
                      whileTap="tap"
                      animate={isSubmitting ? "submitting" : "initial"}
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 text-white font-medium rounded-lg flex items-center justify-center space-x-2 shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              </>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={cardVariants}
            className="mt-16 text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-lg font-medium text-stone-700 mb-4">Prefer other ways to connect?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-stone-600">
                <motion.a
                  href="mailto:hello@example.com"
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-center space-x-2 hover:text-stone-800 transition-colors"
                >
                  <FiMail className="h-5 w-5" />
                  <span>emergeconstructionconsultants@gmail.com</span>
                </motion.a>
                <motion.a
                  href="tel:+918698165330"
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-center space-x-2 hover:text-stone-800 transition-colors"
                >
                  <FiPhone className="h-5 w-5" />
                  <span>+91 8698165330 / +91 7745803646</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-lg font-medium text-stone-700 mb-5">Follow our journey</h3>
              <div className="inline-flex space-x-6">
                {[
                  { name: 'Twitter', icon: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' },
                  { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                  { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ y: -4, color: "#292524" }}
                    whileTap={{ scale: 0.95 }}
                    className="text-stone-500 hover:text-stone-700 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;