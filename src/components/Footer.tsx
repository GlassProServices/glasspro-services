import logo from "@/assets/logo-glasspro.jpeg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="GlassPro Services" className="h-10 w-auto rounded" />
            <span className="font-display text-lg font-bold">
              Glass<span className="text-primary">Pro</span> Services
            </span>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} GlassPro Services — Tous droits réservés — 94 Avenue Jean Jaurès, 47200 Marmande
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
