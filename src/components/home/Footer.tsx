
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section: Links */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <a
              href="/terms"
              className="hover:text-blue-400 transition duration-300"
            >
              Terms & Conditions
            </a>
            <a
              href="/privacy"
              className="hover:text-blue-400 transition duration-300"
            >
              Privacy Policy
            </a>
          </div>
          <div className="flex mt-4 md:mt-0 gap-6">
            {/* Replace with your social media links */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom Section: Tagline */}
        <div className="text-center">
          <p className="text-sm">
            Empowering Financial Freedom with Blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
