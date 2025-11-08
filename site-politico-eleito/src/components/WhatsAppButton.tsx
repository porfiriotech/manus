import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "5534991959389";
  const message = "Olá! Gostaria de saber mais sobre os serviços de marketing eleitoral.";
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 animate-bounce-slow"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
