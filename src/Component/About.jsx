import React from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaDirections, FaEye, FaHistory, FaMapMarkerAlt } from "react-icons/fa";

const About = () => {
  const sections = [
    {
      icon: <FaHistory className="text-4xl text-primary" />,
      title: "History",
      description:
        "Established in 1998, our club has evolved into a vibrant hub of athletic excellence. From humble beginnings, we’ve hosted national and international events that shaped our legacy.",
    },
    {
      icon: <FaBullseye className="text-4xl text-primary" />,
      title: "Mission",
      description:
        "We aim to empower youth through sport, promote health, and cultivate a spirit of teamwork and discipline in a welcoming and inclusive environment.",
    },
    {
      icon: <FaEye className="text-4xl text-primary" />,
      title: "Vision",
      description:
        "To become a leading platform for aspiring athletes, encouraging them to thrive on both national and global stages through opportunity and mentorship.",
    },
  ];

  const address = {
    line1: "SportiVox Sports Club",
    line2: "123 Club Street, Mirpur DOHS",
    city: "Dhaka 1216, Bangladesh",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.532825499708!2d90.35346201543541!3d23.83145349154742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c10bdb9f413d%3A0x60d5aee4c2a4b132!2sMirpur%20DOHS%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1627123456789",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=SportiVox+Sports+Club,+Mirpur+DOHS,+Dhaka",
  };

  return (
    <>
      {/* About */}
      <section className="w-11/12 md:w-10/12 mx-auto my-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-4">
            About the Club
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our journey, guiding principles, and future ambitions that
            fuel our passion for sports and community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 space-y-4 border hover:border-primary transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex justify-center">{section.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-center text-gray-800">
                {section.title}
              </h3>
              <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                {section.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Location  */}
      <section className="w-11/12 md:w-10/12 mx-auto my-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-4">
          📍 Our Location
        </h2>

        <p className="text-center text-gray-600 mb-10 text-lg">
          Visit us at our sports facility or find directions using Google Maps.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Address */}
          <div className="bg-white shadow-xl rounded-2xl p-6 space-y-4 border hover:border-primary transition">
            <div className="flex items-center gap-3 text-primary">
              <FaMapMarkerAlt className="text-2xl" />
              <h3 className="text-xl font-semibold">Address</h3>
            </div>
            <p className="text-gray-700 text-base leading-relaxed">
              {address.line1} <br />
              {address.line2} <br />
              {address.city}
            </p>

            <a
              href={address.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition mt-4"
            >
              <FaDirections /> Get Directions
            </a>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border">
            <iframe
              src={address.mapEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="w-full h-[300px] md:h-[350px]"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
