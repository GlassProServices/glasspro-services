import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marie L.",
    rating: 5,
    text: "Pare-brise remplacé en moins de 2h, travail impeccable. La franchise a bien été prise en charge. Je recommande !",
    service: "Remplacement Pare-Brise",
  },
  {
    name: "Thomas D.",
    rating: 5,
    text: "Équipe très professionnelle et accueillante. Mon véhicule est ressorti comme neuf après le nettoyage profond. Merci !",
    service: "Nettoyage Profond",
  },
  {
    name: "Sophie M.",
    rating: 5,
    text: "Rénovation des phares parfaite, on dirait des phares neufs ! Prix très raisonnable et service rapide.",
    service: "Rénovation Phares",
  },
  {
    name: "Jean-Pierre B.",
    rating: 5,
    text: "Changement de distribution effectué avec sérieux. Devis respecté, délai tenu. Un garage de confiance à Marmande.",
    service: "Grosse Mécanique",
  },
  {
    name: "Camille R.",
    rating: 5,
    text: "Excellent service ! La prise en charge assurance a été faite directement par eux. Très pratique et sans stress.",
    service: "Remplacement Pare-Brise",
  },
  {
    name: "Lucas G.",
    rating: 4,
    text: "Nettoyage intérieur très soigné, véhicule rendu impeccable. Personnel sympathique. J'y retournerai.",
    service: "Nettoyage Léger",
  },
];

const ReviewsSection = () => {
  return (
    <section id="avis" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
            Avis <span className="text-primary">Clients</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            La satisfaction de nos clients est notre meilleure publicité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-muted-foreground/30" />
                ))}
              </div>
              <p className="text-foreground/90 text-sm mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-sm">{review.name}</span>
                <span className="text-xs text-primary font-medium">{review.service}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
