import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, CheckCircle } from "lucide-react";
import { format, parse } from "date-fns";
import { fr } from "date-fns/locale";
import DateSlotPicker from "./DateSlotPicker";

const prestations = [
  "Distribution",
  "Embrayage",
  "Freins (disques / plaquettes)",
  "Amortisseurs",
  "Vidange / Révision",
  "Diagnostic moteur",
  "Courroie accessoire",
  "Échappement",
  "Autre (préciser)",
];

const formatSlotLabel = (slotKey: string): string => {
  if (!slotKey) return "";
  const [dateStr, timeStr] = slotKey.split("_");
  try {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const dayLabel = format(date, "EEEE d MMMM yyyy", { locale: fr });
    return `${dayLabel} — ${timeStr}`;
  } catch {
    return slotKey;
  }
};

const RdvMecanique = () => {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [vehicule, setVehicule] = useState("");
  const [selectedPrestation, setSelectedPrestation] = useState("");
  const [selectedCreneau, setSelectedCreneau] = useState("");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="rdv-mecanique" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
            RDV <span className="text-primary">Mécanique</span>
          </h2>
          <p className="text-muted-foreground">
            Besoin d'une réparation mécanique ? Décrivez votre besoin et choisissez un créneau.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="text-center bg-card border border-primary/30 rounded-xl p-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Demande envoyée !</h3>
            <p className="text-muted-foreground">Notre équipe vous contactera rapidement pour établir un devis.</p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Nom complet</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Votre nom"
                  className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Téléphone</label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="06 XX XX XX XX"
                  className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={15}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Véhicule (marque, modèle, année)</label>
              <input
                type="text"
                value={vehicule}
                onChange={(e) => setVehicule(e.target.value)}
                placeholder="Ex: Peugeot 308, 2019"
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={100}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Type de prestation</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prestations.map((p) => (
                  <motion.button
                    key={p}
                    onClick={() => setSelectedPrestation(p)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm border transition-colors ${
                      selectedPrestation === p
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    {p}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Détails / Description du problème</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Décrivez le problème rencontré..."
                rows={3}
                className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                maxLength={500}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Créneau souhaité</label>
              <DateSlotPicker
                selectedSlot={selectedCreneau}
                onSelectSlot={setSelectedCreneau}
              />
            </div>

            <motion.button
              onClick={() => setSubmitted(true)}
              disabled={!nom || !telephone || !selectedPrestation || !selectedCreneau}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-glasspro"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Envoyer la demande
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RdvMecanique;
