import { motion } from "framer-motion";
import { Shield, ChevronDown, Gift } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo-glasspro.jpeg";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.img
          src={logo}
          alt="GlassPro Services"
          className="mx-auto h-40 md:h-56 w-auto mb-6 object-contain drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 uppercase tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Glass<span className="text-primary">Pro</span> Services
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Pare-Brise • Nettoyage • Mécanique • Rénovation Optiques
        </motion.p>

        {/* Offer banner */}
        <motion.div
          className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-6 py-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Gift className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="text-left">
            <p className="font-display text-lg font-bold text-primary uppercase">
              Franchise offerte + jusqu'à 200€ de cadeau offert
            </p>
            <p className="text-sm text-muted-foreground">*Voir les conditions en centre</p>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#rdv-parebrise"
            className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-display text-lg font-semibold uppercase tracking-wider shadow-glasspro"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Prendre RDV Pare-Brise
          </motion.a>
          <motion.a
            href="#rdv-mecanique"
            className="border border-primary/50 text-foreground px-8 py-4 rounded-md font-display text-lg font-semibold uppercase tracking-wider hover:bg-primary/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            RDV Mécanique
          </motion.a>
        </motion.div>

        {/* Promises */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: Shield, text: "Service de qualité" },
            { icon: Shield, text: "Intervention rapide sous 24h" },
            { icon: Shield, text: "Prise en charge assurance 100%" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4"
            >
              <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
