import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-5 border-t border-gray-300 mt-20">
      <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Contact Us
          </h3>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-primary" /> +880 1234-567890
          </p>
          <p className="flex items-center gap-2 my-2">
            <FaEnvelope className="text-primary" /> contact@sportivox.com
          </p>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-primary mt-1" /> 123 Club Street,
            Mirpur DOHS,
            <br /> Dhaka 1216, Bangladesh
          </p>
        </div>

        {/* Links (optional for nav or future use) */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="/About" className="hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="/Courts" className="hover:text-primary">
                Courts
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-xl">
            <a
              href="https://www.facebook.com/Shahriahasanutshob/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com/ShahriarUtshob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://X.com/shuthob"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-500"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} SportiVox Sports Club. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
