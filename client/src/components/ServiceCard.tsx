import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
  service: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`transition-all duration-300 cursor-pointer ${
        isExpanded ? "shadow-xl scale-105 z-10" : "hover:shadow-lg"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onTouchStart={() => setIsExpanded(!isExpanded)}
    >
      <CardContent className="p-6">
        <service.icon
          className={`w-12 h-12 text-primary mb-4 transition-transform duration-300 ${
            isExpanded ? "scale-110" : ""
          }`}
        />
        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-20 opacity-70"
          }`}
        >
          <p className="text-foreground/70 text-sm">{service.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
