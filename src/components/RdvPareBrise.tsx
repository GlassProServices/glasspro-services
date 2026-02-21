import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Upload, Car, AlertTriangle, CheckCircle } from "lucide-react";

const vitrages = [
  "Pare-brise avant",
  "Lunette arrière",
  "Vitre latérale avant gauche",
  "Vitre latérale avant droite",
  "Vitre latérale arrière gauche",
  "Vitre latérale arrière droite",
  "Custode gauche",
  "Custode droite",
  "Toit panoramique",
];

const dommages = [
  "Un impact",
  "Plusieurs impacts",
  "Une fissure",
  "Bris complet",
];

const assurances = [
  "MAIF",
  "MACIF",
  "AXA",
  "Allianz",
  "Groupama",
  "MMA",
  "Matmut",
  "GMF",
  "MAAF",
  "Generali",
  "AG2R",
  "SwissLife",
  "Direct Assurance",
  "Autre",
];

const MAX_RESERVATIONS_PAR_CRENEAU = 4;

const creneaux = [
  "Lundi 9h-12h",
  "Lundi 14h-18h",
  "Mardi 9h-12h",
  "Mardi 14h-18h",
  "Mercredi 9h-12h",
  "Mercredi 14h-18h",
  "Jeudi 9h-12h",
  "Jeudi 14h-18h",
  "Vendredi 9h-12h",
  "Vendredi 14h30-18h30",
  "Samedi 9h-12h",
  "Samedi 14h-17h",
  "Dimanche 10h-15h",
];

// Simulated reservation counts per slot (in production, this would come from a database)
const getReservationCount = (creneau: string): number => {
  // Placeholder: returns 0 for all slots. Replace with real data from backend.
  return 0;
};

const RdvPareBrise = () => {
  const [step, setStep] = useState(1);
  const [immatriculation, setImmatriculation] = useState("");
  const [selectedVitrage, setSelectedVitrage] = useState("");
  const [selectedDommage, setSelectedDommage] = useState("");
  const [selectedAssurance, setSelectedAssurance] = useState("");
  const [autreAssurance, setAutreAssurance] = useState("");
  const [selectedCreneau, setSelectedCreneau] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [carteGrise, setCarteGrise] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <section id="rdv-parebrise" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-4">
            RDV <span className="text-primary">Pare-Brise</span>
          </h2>
          <p className="text-muted-foreground">
            Prenez rendez-vous en quelques clics pour le remplacement de votre vitrage.
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
            <p className="text-muted-foreground">Nous vous recontacterons dans les plus brefs délais pour confirmer votre rendez-vous.</p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-card border border-border rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-0.5 mx-2 ${step > s ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="font-display text-xl font-bold uppercase">Votre véhicule</h3>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Immatriculation</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={immatriculation}
                        onChange={(e) => setImmatriculation(e.target.value.toUpperCase())}
                        placeholder="AA-123-BB"
                        className="w-full bg-muted border border-border rounded-md pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-lg tracking-widest"
                        maxLength={9}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Vitrage endommagé</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {vitrages.map((v) => (
                        <motion.button
                          key={v}
                          onClick={() => setSelectedVitrage(v)}
                          className={`text-left px-4 py-3 rounded-md text-sm border transition-colors ${
                            selectedVitrage === v
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                          }`}
                          whileTap={{ scale: 0.97 }}
                        >
                          {v}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Type de dommage</label>
                    <div className="grid grid-cols-2 gap-2">
                      {dommages.map((d) => (
                        <motion.button
                          key={d}
                          onClick={() => setSelectedDommage(d)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm border transition-colors ${
                            selectedDommage === d
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                          }`}
                          whileTap={{ scale: 0.97 }}
                        >
                          <AlertTriangle className="w-4 h-4" />
                          {d}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setStep(2)}
                    disabled={!immatriculation || !selectedVitrage || !selectedDommage}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Suivant
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="font-display text-xl font-bold uppercase">Assurance & Documents</h3>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Votre assureur</label>
                    <select
                      value={selectedAssurance}
                      onChange={(e) => setSelectedAssurance(e.target.value)}
                      className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Sélectionnez votre assurance</option>
                      {assurances.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                    {selectedAssurance === "Autre" && (
                      <input
                        type="text"
                        value={autreAssurance}
                        onChange={(e) => setAutreAssurance(e.target.value)}
                        placeholder="Nom de votre assurance"
                        className="w-full mt-2 bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Carte grise (PDF)</label>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        {carteGrise ? carteGrise.name : "Glissez votre carte grise ici ou cliquez pour parcourir"}
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setCarteGrise(e.target.files?.[0] || null)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        style={{ position: "relative" }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-border text-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider hover:bg-muted transition-colors"
                    >
                      Retour
                    </button>
                    <motion.button
                      onClick={() => setStep(3)}
                      disabled={!selectedAssurance || (selectedAssurance === "Autre" && !autreAssurance)}
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Suivant
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="font-display text-xl font-bold uppercase">Choisissez un créneau</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {creneaux.map((c) => {
                      const count = getReservationCount(c);
                      const isFull = count >= MAX_RESERVATIONS_PAR_CRENEAU;
                      const remaining = MAX_RESERVATIONS_PAR_CRENEAU - count;
                      return (
                        <motion.button
                          key={c}
                          onClick={() => !isFull && setSelectedCreneau(c)}
                          disabled={isFull}
                          className={`px-4 py-3 rounded-md text-sm border transition-colors ${
                            isFull
                              ? "bg-muted/30 border-border text-muted-foreground/50 cursor-not-allowed line-through"
                              : selectedCreneau === c
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-muted border-border text-muted-foreground hover:border-primary/50"
                          }`}
                          whileTap={isFull ? {} : { scale: 0.97 }}
                        >
                          <span>{c}</span>
                          {isFull ? (
                            <span className="block text-xs text-destructive mt-1">Complet</span>
                          ) : remaining <= 2 ? (
                            <span className="block text-xs text-primary mt-1">{remaining} place{remaining > 1 ? "s" : ""} restante{remaining > 1 ? "s" : ""}</span>
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-border text-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider hover:bg-muted transition-colors"
                    >
                      Retour
                    </button>
                    <motion.button
                      onClick={() => setStep(4)}
                      disabled={!selectedCreneau}
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Suivant
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="font-display text-xl font-bold uppercase">Vos coordonnées</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Nom complet"
                      className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={100}
                    />
                    <input
                      type="tel"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="Téléphone"
                      className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={15}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-muted border border-border rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      maxLength={255}
                    />
                  </div>

                  {/* Summary */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                    <h4 className="font-display font-bold text-primary uppercase">Récapitulatif</h4>
                    <p><span className="text-muted-foreground">Immatriculation :</span> {immatriculation}</p>
                    <p><span className="text-muted-foreground">Vitrage :</span> {selectedVitrage}</p>
                    <p><span className="text-muted-foreground">Dommage :</span> {selectedDommage}</p>
                    <p><span className="text-muted-foreground">Assurance :</span> {selectedAssurance === "Autre" ? autreAssurance : selectedAssurance}</p>
                    <p><span className="text-muted-foreground">Créneau :</span> {selectedCreneau}</p>
                    {carteGrise && <p><span className="text-muted-foreground">Carte grise :</span> {carteGrise.name}</p>}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 border border-border text-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider hover:bg-muted transition-colors"
                    >
                      Retour
                    </button>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!nom || !telephone}
                      className="flex-1 bg-primary text-primary-foreground py-3 rounded-md font-display font-semibold uppercase tracking-wider disabled:opacity-50 shadow-glasspro"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirmer
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RdvPareBrise;
