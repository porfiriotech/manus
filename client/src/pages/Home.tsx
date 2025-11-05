import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Award,
  BarChart3,
  CheckCircle2,
  Globe,
  Mail,
  Megaphone,
  MessageSquare,
  Mic,
  Palette,
  Phone,
  Share2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    cidade: "",
    cargo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ nome: "", celular: "", cidade: "", cargo: "" });
  };

  const services = [
    {
      icon: Globe,
      title: "Site Profissional",
      description:
        "Criação de sites com a identidade da sua campanha, totalmente responsivos e otimizados para conversão.",
    },
    {
      icon: Megaphone,
      title: "Disparos de Mídias",
      description:
        "Divulgação de conteúdo eleitoral através de mensagens personalizadas e segmentadas para seu público.",
    },
    {
      icon: Phone,
      title: "Torpedo de Voz",
      description:
        "Envio automatizado de mensagens de áudio para milhares de telefones fixos e celulares.",
    },
    {
      icon: BarChart3,
      title: "Pesquisas por Voz",
      description:
        "Pesquisas via telefone ou WhatsApp com captura automática das respostas em tempo real.",
    },
    {
      icon: Share2,
      title: "Redes Sociais",
      description:
        "Criação, gestão e monitoramento completo das principais redes sociais da sua campanha.",
    },
    {
      icon: Mic,
      title: "Jingles Eleitorais",
      description:
        "Produção profissional de jingles, desde a criação das letras até a gravação final.",
    },
    {
      icon: Palette,
      title: "Material Gráfico",
      description:
        "Criação de folders, santinhos e materiais diversos para impressão e distribuição.",
    },
    {
      icon: Mail,
      title: "E-mail Marketing",
      description:
        "Criação de campanhas de e-mail marketing com design profissional e alta taxa de abertura.",
    },
  ];

  const cases = [
    {
      name: "Geraldo Alckmin",
      position: "Vice-Presidente",
      votes: "60 milhões",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    },
    {
      name: "Cristina Monteiro",
      position: "Vereadora SP",
      votes: "30.002 votos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "João Caporezz",
      position: "Deputado Estadual",
      votes: "22.038 votos",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
  ];

  const stats = [
    { icon: Award, value: "19", label: "Anos de Mercado" },
    { icon: Users, value: "500+", label: "Candidatos Eleitos" },
    { icon: TrendingUp, value: "85%", label: "Taxa de Sucesso" },
    { icon: MessageSquare, value: "1M+", label: "Mensagens Enviadas" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ferramentas que levam você à{" "}
                <span className="text-primary">vitória</span>
              </h1>
              <p className="text-lg text-foreground/70 mb-8">
                Disparos de mídias, pesquisas por voz, santinho digital, site, redes sociais e
                muito mais. Soluções completas para sua campanha eleitoral.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8"
                  onClick={() => {
                    const element = document.querySelector("#servicos");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Conheça Nossos Serviços
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  onClick={() => {
                    const element = document.querySelector("#contato");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Fale Conosco
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop"
                alt="Campanha política"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produtos e Serviços</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Soluções completas e interligadas, como exige toda campanha de sucesso. Conheça cada
              uma delas e entre em contato.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cases de Sucesso</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Temos experiência com grandes campanhas! Nossa expertise pode ser determinante na sua
              vitória!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{caseItem.name}</h3>
                  <p className="text-primary font-semibold mb-2">{caseItem.position}</p>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span>{caseItem.votes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
                alt="Experiência em marketing"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">19 Anos de Mercado!</h2>
              <p className="text-lg text-foreground/70 mb-8">
                Marketing Eleitoral não se faz do dia para a noite. Aqui você conta com a
                experiência de quem realmente entende do assunto e já ajudou centenas de candidatos
                a conquistarem seus objetivos políticos.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Estratégias Comprovadas</h4>
                    <p className="text-foreground/70">
                      Metodologias testadas e aprovadas em centenas de campanhas vitoriosas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Tecnologia de Ponta</h4>
                    <p className="text-foreground/70">
                      Ferramentas modernas e eficientes para maximizar o alcance da sua mensagem.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Suporte Completo</h4>
                    <p className="text-foreground/70">
                      Acompanhamento durante todo o período eleitoral e pós-campanha.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sobre Nós</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Somos uma empresa especializada em marketing político e eleitoral, com 19 anos de
              experiência no mercado. Nossa missão é fornecer as melhores ferramentas e estratégias
              para que candidatos alcancem seus objetivos e conquistem a confiança do eleitorado.
            </p>
            <p className="text-lg text-foreground/70">
              Com uma equipe altamente qualificada e tecnologia de ponta, já ajudamos mais de 500
              candidatos a serem eleitos em todo o Brasil, sempre com ética, transparência e
              resultados comprovados.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-lg text-foreground/70">
                Pronto para ser eleito? Envie uma mensagem com suas dúvidas, sugestões ou
                solicitações. Será um prazer falar com você!
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="celular">Celular com DDD</Label>
                    <Input
                      id="celular"
                      placeholder="(00) 00000-0000"
                      value={formData.celular}
                      onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      placeholder="Sua cidade"
                      value={formData.cidade}
                      onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="cargo">Candidato a:</Label>
                    <Select
                      value={formData.cargo}
                      onValueChange={(value) => setFormData({ ...formData, cargo: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prefeito">Prefeito</SelectItem>
                        <SelectItem value="vereador">Vereador</SelectItem>
                        <SelectItem value="deputado-estadual">Deputado Estadual</SelectItem>
                        <SelectItem value="deputado-federal">Deputado Federal</SelectItem>
                        <SelectItem value="senador">Senador</SelectItem>
                        <SelectItem value="governador">Governador</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
