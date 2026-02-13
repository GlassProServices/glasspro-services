import { motion } from "framer-motion";
import serviceVitrage from "@/assets/service-vitrage.jpg";
import servicePhares from "@/assets/service-phares.jpg";
import serviceNettoyage from "@/assets/service-nettoyage.jpg";
import serviceMecanique from "@/assets/service-mecanique.jpg";

const services = [
  {
    title: "Remplacement de Vitrage",
    description: "Pare-brise, lunette arrière, vitres latérales... Nous remplaçons tous les vitrages de votre véhicule avec des pièces certifiées.",
    image: serviceVitrage,
  },
  {
    title: "Rénovation de Phares",
    description: "Redonnez à vos phares leur éclat d'origine. Polissage professionnel pour une visibilité optimale et un aspect neuf.",
    image: servicePhares,
  },
  {
    title: "Nettoyage Véhicule",
    description: "Nettoyage léger ou profond, intérieur et extérieur. Votre véhicule retrouve son éclat comme au premier jour.",
    image: serviceNettoyage,
  },
  {
    title: "Grosse Mécanique",
    description: "Distribution, embrayage, moteur... Notre équipe prend en charge les réparations mécaniques lourdes avec expertise.",
    image: serviceMecanique,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Des prestations professionnelles pour l'entretien et la réparation de votre véhicule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-2 uppercase">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse-red" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
