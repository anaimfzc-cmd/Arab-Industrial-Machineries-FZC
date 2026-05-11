import { motion } from "framer-motion";
import logo from "../assets/aim-logo.png";

const IntroLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">

      {/*  Cinematic Background Sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
        }}
      />

      {/*  Dark Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent,black_80%)]" />

      {/*  Logo Section */}
      <div className="relative flex items-center justify-center z-10">

        {/*  Strong White Ambient Glow */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-white/15 blur-3xl"
          animate={{
            opacity: [0.45, 0.75, 0.45],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/*  Extra Center Glow */}
        <div className="absolute w-40 h-40 rounded-full bg-white/10 blur-2xl" />

        {/*  Logo */}
        <motion.img
          src={logo}
          alt="AIM Logo"
          className="relative w-44 md:w-56 object-contain brightness-125 contrast-125 drop-shadow-[0_0_30px_rgba(255,255,255,0.35)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      </div>

      {/*  Company Name */}
      <motion.h1
        className="mt-6 text-white text-3xl md:text-5xl tracking-[0.28em] font-[300] z-10 text-center uppercase leading-relaxed"
        style={{
          fontFamily: "'Cormorant Garamond', 'Bodoni Moda', serif",
        }}
        initial={{
          opacity: 0,
          letterSpacing: "0.45em",
        }}
        animate={{
          opacity: 1,
          letterSpacing: "0.28em",
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      >
        ARAB INDUSTRIAL MACHINERY
      </motion.h1>

      {/*  Subtitle */}
      <motion.p
        className="mt-3 text-gray-400 text-[11px] tracking-[0.38em] uppercase z-10"
        style={{
          fontFamily: "'Inter', sans-serif",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 1,
        }}
      >
        Solutions You Can Trust
      </motion.p>

      {/*  Elegant Progress Line */}
      <div className="absolute bottom-16 w-64 h-[1.5px] bg-white/10 overflow-hidden z-10 rounded-full">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 4.5,
            ease: "easeInOut",
          }}
        />
      </div>

      {/*  Loading Text */}
      <motion.p
        className="absolute bottom-10 text-[10px] text-gray-500 tracking-[0.4em]"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        LOADING...
      </motion.p>
    </div>
  );
};

export default IntroLoader;