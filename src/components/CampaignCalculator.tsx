import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  basePrice: number;
  pricePerVoter: number;
  description: string;
}

const services: Service[] = [
  {
    id: "site",
    name: "Site Profissional",
    basePrice: 3000,
    pricePerVoter: 0,
    description: "Site responsivo com identidade visual",
  },
  {
    id: "disparos",
    name: "Disparos de Mídias",
    basePrice: 2000,
    pricePerVoter: 0.15,
    description: "Mensagens personalizadas segmentadas",
  },
  {
    id: "torpedo",
    name: "Torpedo de Voz",
    basePrice: 1500,
    pricePerVoter: 0.25,
    description: "Mensagens de áudio automatizadas",
  },
  {
    id: "pesquisas",
    name: "Pesquisas por Voz",
    basePrice: 2500,
    pricePerVoter: 0.30,
    description: "Pesquisas com captura automática",
  },
  {
    id: "redes",
    name: "Gestão de Redes Sociais",
    basePrice: 4000,
    pricePerVoter: 0,
    description: "Criação e gestão completa (3 meses)",
  },
  {
    id: "jingle",
    name: "Jingle Eleitoral",
    basePrice: 2500,
    pricePerVoter: 0,
    description: "Criação e gravação profissional",
  },
  {
    id: "grafico",
    name: "Material Gráfico",
    basePrice: 1500,
    pricePerVoter: 0.05,
    description: "Folders, santinhos e materiais",
  },
  {
    id: "email",
    name: "E-mail Marketing",
    basePrice: 1000,
    pricePerVoter: 0.10,
    description: "Campanhas de e-mail profissionais",
  },
];

export default function CampaignCalculator() {
  const [voters, setVoters] = useState<string>("");
  const [cargo, setCargo] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    const voterCount = parseInt(voters) || 0;
    let total = 0;

    selectedServices.forEach((serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        total += service.basePrice + service.pricePerVoter * voterCount;
      }
    });

    return total;
  };

  const total = calculateTotal();
  const hasInputs = voters && cargo && selectedServices.length > 0;

  return (
    <section id="calculadora" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculadora de Campanha</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Estime o investimento necessário para sua campanha eleitoral com base no número de
            eleitores e serviços desejados.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <Card>
              <CardHeader>
                <CardTitle>Dados da Campanha</CardTitle>
                <CardDescription>
                  Preencha as informações para calcular o investimento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="cargo">Cargo Pretendido</Label>
                  <Select value={cargo} onValueChange={setCargo}>
                    <SelectTrigger id="cargo">
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vereador">Vereador</SelectItem>
                      <SelectItem value="prefeito">Prefeito</SelectItem>
                      <SelectItem value="deputado-estadual">Deputado Estadual</SelectItem>
                      <SelectItem value="deputado-federal">Deputado Federal</SelectItem>
                      <SelectItem value="senador">Senador</SelectItem>
                      <SelectItem value="governador">Governador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="voters">Número de Eleitores (estimativa)</Label>
                  <Input
                    id="voters"
                    type="number"
                    placeholder="Ex: 50000"
                    value={voters}
                    onChange={(e) => setVoters(e.target.value)}
                    min="0"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Informe o número aproximado de eleitores que deseja alcançar
                  </p>
                </div>

                <div>
                  <Label className="mb-3 block">Serviços Desejados</Label>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={service.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {service.name}
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultado */}
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Estimativa de Investimento</CardTitle>
                  <CardDescription>
                    Valores aproximados baseados nos serviços selecionados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasInputs ? (
                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Serviços Selecionados:
                        </div>
                        <div className="space-y-2">
                          {selectedServices.map((serviceId) => {
                            const service = services.find((s) => s.id === serviceId);
                            if (!service) return null;
                            const voterCount = parseInt(voters) || 0;
                            const serviceCost =
                              service.basePrice + service.pricePerVoter * voterCount;
                            return (
                              <div
                                key={serviceId}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                                  <span className="text-sm font-medium">{service.name}</span>
                                </div>
                                <span className="text-sm font-semibold">
                                  R$ {serviceCost.toLocaleString("pt-BR")}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Cargo:</span>
                          <span className="text-sm font-medium capitalize">
                            {cargo.replace("-", " ")}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-muted-foreground">Eleitores:</span>
                          <span className="text-sm font-medium">
                            {parseInt(voters).toLocaleString("pt-BR")}
                          </span>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">
                            Investimento Total Estimado:
                          </div>
                          <div className="text-3xl font-bold text-primary">
                            R$ {total.toLocaleString("pt-BR")}
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-xs text-muted-foreground">
                          * Valores aproximados. O investimento final pode variar de acordo com as
                          necessidades específicas da campanha e região. Entre em contato para um
                          orçamento personalizado.
                        </p>
                      </div>

                      <Button
                        size="lg"
                        className="w-full bg-secondary hover:bg-secondary/90"
                        onClick={() => {
                          // Gerar texto do orçamento
                          const selectedServicesList = selectedServices
                            .map((serviceId) => {
                              const service = services.find((s) => s.id === serviceId);
                              if (!service) return "";
                              const voterCount = parseInt(voters) || 0;
                              const serviceCost =
                                service.basePrice + service.pricePerVoter * voterCount;
                              return `• ${service.name}: R$ ${serviceCost.toLocaleString("pt-BR")}`;
                            })
                            .filter(Boolean)
                            .join("%0A");

                          const message = `Olá! Gostaria de solicitar um orçamento personalizado:%0A%0A*Cargo:* ${cargo.replace("-", " ")}%0A*Número de Eleitores:* ${parseInt(voters).toLocaleString("pt-BR")}%0A%0A*Serviços Selecionados:*%0A${selectedServicesList}%0A%0A*Investimento Total Estimado:* R$ ${total.toLocaleString("pt-BR")}%0A%0AAguardo retorno para mais detalhes!`;

                          // Redirecionar para WhatsApp
                          window.open(
                            `https://wa.me/5562986242185?text=${message}`,
                            "_blank"
                          );
                        }}
                      >
                        Solicitar Orçamento Personalizado
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calculator className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Preencha os dados ao lado para ver a estimativa de investimento da sua
                        campanha.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 border-secondary/20">
                <CardContent className="p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    Por que investir em marketing eleitoral?
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground/70">
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Aumente sua visibilidade e reconhecimento entre os eleitores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Comunique suas propostas de forma clara e eficaz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Alcance mais pessoas com mensagens segmentadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>Monitore e ajuste sua estratégia em tempo real</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
