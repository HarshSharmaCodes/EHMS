import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import banner from "../../assets/AboutUs.png";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

function AboutUs() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <>
      <Navbar />
      <section className="pt-[80px] bg-[#ffffff]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className="min-h-screen w-screen "
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-[650px] object-cover"
          />

          <div className="z-10 bottom-0 hidden lg:block lg:left-32 py-4 rounded-t-lg lg:w-[400px] text-center bg-[#ffffff] absolute ">
            <p className="font-semibold text-3xl">About EHMS</p>
          </div>
        </motion.div>
      </section>

      <section className=" bg-[#ffffff] min-h-screen pt-32">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          whileInView={{ opacity: 1 }}
          className="max-w-7xl flex flex-col m-auto justify-center text-justify gap-1"
        >
          <p className="text-2xl font-semibold">Who We Are ?</p>
          <p className="text-lg">
            The E-Health Monitoring System (EHMS) is a comprehensive digital
            healthcare network that provides seamless medical services, ranging
            from primary to advanced care, across India and the Middle East.
            Owned and managed by M/s EHMS Healthcare Solutions Limited, a public
            limited company incorporated under the Companies Act, 1956, EHMS was
            established with the vision of delivering world-class yet affordable
            healthcare services. Since its inception in 1999, the company has
            been dedicated to revolutionizing healthcare by offering
            high-quality, technology-driven solutions. Through an extensive
            network of digital health services, EHMS ensures accessible,
            efficient, and patient-centric care, reinforcing its commitment to
            excellence in healthcare delivery.{" "}
          </p>
          <p className="text-lg hidden lg:block">
            Our healthcare network is recognized for its excellence, with
            numerous accreditations ensuring the highest standards of medical
            care. Over the years, we have expanded our presence across multiple
            cities and countries, offering world-class facilities, cutting-edge
            medical technologies, and patient-centric services. With a strong
            commitment to innovation, we provide comprehensive healthcare
            solutions, from specialized treatments to advanced surgical
            procedures. Our goal is to create a seamless and accessible
            healthcare experience, combining expertise, compassion, and modern
            technology to enhance patient well-being.
          </p>
        </motion.div>
      </section>
      <div className=" hidden lg:flex h-full  max-w-7xl m-auto flex-col items-center justify-end ">
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
