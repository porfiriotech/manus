import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, LucideIcon } from "lucide-react";
import { useState } from "react";

interface ExpandableServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
}

export default function ExpandableServiceCard({
  icon: Icon,
  title,
  description,
  details,
}: ExpandableServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <CardContent className="p-6">
        <Icon className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-foreground/70 text-sm mb-4">{description}</p>

        {/* Conteúdo Expansível */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {details && details.length > 0 && (
            <div className="border-t border-border pt-4 mt-2">
              <p className="text-sm font-semibold text-primary mb-2">Inclui:</p>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="text-sm text-foreground/70 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Indicador de Expansão */}
        <div className="mt-4 text-center">
          <span className="text-xs text-primary/60">
            {isExpanded ? "▲" : "▼"} {isExpanded ? "Ver menos" : "Ver mais"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
