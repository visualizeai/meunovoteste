import React, { useMemo, useState } from "react";
import {
  BadgeCheck,
  CakeSlice,
  CalendarDays,
  ChevronRight,
  Clock,
  HeartHandshake,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

type Review = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  dateLabel: string;
};

type Product = {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
  icon: React.ReactNode;
  tags: string[];
};

type FAQ = {
  id: string;
  q: string;
  a: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>;
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand" | "success";
}) {
  const styles =
    tone === "brand"
      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
      : tone === "success"
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
        : "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium", styles)}>
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-50";
  const styles =
    variant === "primary"
      ? "bg-rose-600 text-white shadow-sm hover:bg-rose-700"
      : variant === "secondary"
        ? "bg-white text-slate-900 ring-1 ring-slate-200 shadow-sm hover:bg-slate-50"
        : "bg-transparent text-slate-900 hover:bg-slate-100";
  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cn(base, styles, className)}
      {...(href ? { target: "_blank", rel: "noreferrer" } : { type: "button" })}
    >
      {children}
    </Comp>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < full ? "fill-amber-400 text-amber-400" : "text-slate-300")}
        />
      ))}
    </div>
  );
}

function formatPhoneBR(phoneDigits: string) {
  const digits = phoneDigits.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return digits;
}

function buildWhatsAppLink(phoneDigits: string, message: string) {
  const digits = phoneDigits.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/55${digits}?text=${text}`;
}

function buildMailto(email: string, subject: string, body: string) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Header() {
  const nav = [
    { id: "servicos", label: "Serviços" },
    { id: "cardapio", label: "Cardápio" },
    { id: "comentarios", label: "Comentários" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <a href="#topo" className="group inline-flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-600 text-white shadow-sm transition-all duration-200 group-hover:shadow-md">
              <CakeSlice className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight text-slate-900">Lu Festas e Eventos</div>
              <div className="text-xs font-medium text-slate-500">Confeitaria & Eventos</div>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              href={buildWhatsAppLink("11999999999", "Olá! Gostaria de um orçamento para um evento.")}
              className="hidden md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Orçamento
            </Button>
            <Button href="#contato">
              <ChevronRight className="h-4 w-4" />
              Fale com a gente
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-slate-50 to-slate-50" />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="brand">
                <Sparkles className="h-4 w-4" />
                Doces finos, bolos e kits personalizados
              </Pill>
              <Pill tone="success">
                <BadgeCheck className="h-4 w-4" />
                Produção sob encomenda
              </Pill>
            </div>

            <h1 className="text-balance text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Sua festa com sabor de <span className="text-rose-700">memória boa</span>.
            </h1>

            <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
              A <span className="font-semibold text-slate-900">Lu Festas e Eventos</span> é uma confeitaria feita para
              celebrar: aniversários, casamentos, chás, eventos corporativos e tudo o que merece um doce caprichado.
              Trabalhamos com ingredientes selecionados, acabamento premium e entrega combinada.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="#cardapio">
                <UtensilsCrossed className="h-4 w-4" />
                Ver cardápio
              </Button>
              <Button
                variant="secondary"
                href={buildWhatsAppLink(
                  "11999999999",
                  "Olá! Quero montar um kit de doces/bolo para minha festa. Pode me ajudar?"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                Pedir no WhatsApp
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Clock className="h-4 w-4 text-rose-700" />
                  Prazo
                </div>
                <div className="mt-1 text-sm text-slate-600">Encomendas com 48–72h</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Truck className="h-4 w-4 text-rose-700" />
                  Entrega
                </div>
                <div className="mt-1 text-sm text-slate-600">Retirada ou delivery</div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <HeartHandshake className="h-4 w-4 text-rose-700" />
                  Atendimento
                </div>
                <div className="mt-1 text-sm text-slate-600">Personalização total</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-slate-200">
              <img
                alt="Mesa de doces para festa com bolo e docinhos"
                className="h-[420px] w-full object-cover md:h-[520px]"
                src="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1400&q=80"
              />
            </div>

            <div className="absolute -bottom-6 -left-2 right-10 rounded-3xl bg-white/90 p-5 shadow-md ring-1 ring-slate-200 backdrop-blur md:-left-6 md:right-16">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-600 text-white shadow-sm">
                  <Quote className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-900">“Tudo chegou perfeito e delicioso!”</div>
                  <div className="text-sm text-slate-600">
                    Comentários reais de clientes que celebraram com a Lu.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold uppercase tracking-wider text-rose-700">{eyebrow}</div>
      <h2 className="text-balance text-2xl font-black tracking-tight text-slate-900 md:text-3xl">{title}</h2>
      <p className="text-pretty text-sm leading-relaxed text-slate-600 md:text-base">{subtitle}</p>
    </div>
  );
}

function Services() {
  const items = [
    {
      icon: <CakeSlice className="h-5 w-5" />,
      title: "Bolos personalizados",
      desc: "Do clássico ao temático, com acabamento impecável e sabores equilibrados.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Doces finos",
      desc: "Brigadeiros gourmet, trufas, copinhos e opções para mesa completa.",
    },
    {
      icon: <CalendarDays className="h-5 w-5" />,
      title: "Kits para eventos",
      desc: "Combos sob medida para aniversários, chás, casamentos e corporativos.",
    },
  ];

  return (
    <section id="servicos" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <SectionTitle
            eyebrow="Serviços"
            title="Confeitaria para celebrar do seu jeito"
            subtitle="A gente cuida do sabor e da apresentação para você curtir o momento. Escolha um kit pronto ou monte o seu."
          />
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button
              variant="secondary"
              href={buildWhatsAppLink("11999999999", "Olá! Quero saber os sabores e tamanhos disponíveis.")}
            >
              <MessageCircle className="h-4 w-4" />
              Tirar dúvidas
            </Button>
            <Button href="#contato">
              <ChevronRight className="h-4 w-4" />
              Solicitar orçamento
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                  {it.icon}
                </div>
                <div className="text-base font-extrabold text-slate-900">{it.title}</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{it.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Feito na hora</Pill>
                <Pill>Personalizável</Pill>
                <Pill>Entrega combinada</Pill>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Menu() {
  const products: Product[] = [
    {
      id: "bolo",
      title: "Bolo de festa",
      description: "Massa fofinha, recheios cremosos e decoração temática ou minimalista.",
      priceFrom: "a partir de R$ 180",
      icon: <CakeSlice className="h-5 w-5" />,
      tags: ["Temático", "Naked cake", "Buttercream"],
    },
    {
      id: "doces",
      title: "Doces gourmet",
      description: "Brigadeiro, beijinho, ninho, trufas e sabores especiais sob encomenda.",
      priceFrom: "a partir de R$ 2,80/un",
      icon: <Sparkles className="h-5 w-5" />,
      tags: ["Sortidos", "Finos", "Mesa completa"],
    },
    {
      id: "kit",
      title: "Kit festa",
      description: "Combo com bolo + docinhos + itens opcionais para facilitar sua organização.",
      priceFrom: "a partir de R$ 260",
      icon: <CalendarDays className="h-5 w-5" />,
      tags: ["Prático", "Personalizado", "Sob medida"],
    },
  ];

  return (
    <section id="cardapio" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <SectionTitle
            eyebrow="Cardápio"
            title="Opções queridinhas (e dá pra personalizar)"
            subtitle="Escolha um dos itens abaixo como base e conte pra gente o tema, quantidade e data. A Lu monta um orçamento certinho."
          />
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-slate-900">Atendemos por encomenda</div>
                <div className="text-sm text-slate-600">
                  Retirada combinada e delivery sob consulta. Informe seu bairro e data do evento.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-slate-900">{p.title}</div>
                    <div className="text-xs font-semibold text-slate-500">{p.priceFrom}</div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>

              <div className="mt-6">
                <Button
                  variant="secondary"
                  className="w-full"
                  href={buildWhatsAppLink(
                    "11999999999",
                    `Olá! Quero orçamento para: ${p.title}. Data do evento: __/__/____. Quantidade de pessoas: __. Tema: __.`
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  Pedir orçamento
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReviewsSection() {
  const reviews: Review[] = [
    {
      id: "r1",
      name: "Mariana S.",
      role: "Aniversário infantil",
      rating: 5,
      text: "Encomendei o bolo e 150 docinhos. Chegou no horário, tudo muito bem embalado e o sabor estava perfeito. A decoração ficou igual ao tema!",
      dateLabel: "há 2 semanas",
    },
    {
      id: "r2",
      name: "Rafael P.",
      role: "Evento corporativo",
      rating: 5,
      text: "Atendimento rápido e super organizado. Os doces finos fizeram sucesso no coffee break e a apresentação ficou bem elegante.",
      dateLabel: "há 1 mês",
    },
    {
      id: "r3",
      name: "Camila A.",
      role: "Chá de bebê",
      rating: 5,
      text: "O kit festa salvou minha vida! Bolo lindo, docinhos macios e bem equilibrados no açúcar. Recomendo demais.",
      dateLabel: "há 2 meses",
    },
  ];

  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    text: "",
  });

  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const all = useMemo(() => {
    const now = new Date();
    const mapped = userReviews.map((r) => r);
    return [...mapped, ...reviews].sort((a, b) => (a.id < b.id ? 1 : -1));
  }, [userReviews]);

  function submit() {
    const name = form.name.trim();
    const role = form.role.trim();
    const text = form.text.trim();
    const rating = Math.max(1, Math.min(5, Math.round(form.rating)));

    if (!name || !text) return;

    const id = `u_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const newReview: Review = {
      id,
      name,
      role: role || "Cliente",
      rating,
      text,
      dateLabel: "agora",
    };

    setUserReviews((prev) => [newReview, ...prev]);
    setForm({ name: "", role: "", rating: 5, text: "" });
  }

  return (
    <section id="comentarios" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <SectionTitle
            eyebrow="Comentários"
            title="O que falam sobre a Lu Festas e Eventos"
            subtitle="Depoimentos ajudam você a escolher com confiança — e ajudam a gente a melhorar sempre."
          />
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-extrabold text-slate-900">Qualidade e carinho</div>
                <div className="text-sm text-slate-600">
                  A gente trabalha com padrão de produção e acabamento para seu evento ficar impecável.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {all.slice(0, 6).map((r) => (
                <div
                  key={r.id}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-extrabold text-slate-900">{r.name}</div>
                      <div className="text-xs font-semibold text-slate-500">
                        {r.role} • {r.dateLabel}
                      </div>
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900">Deixe seu comentário</div>
                  <div className="text-sm text-slate-600">Conta como foi sua experiência.</div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Nome</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                    placeholder="Seu nome"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Tipo de evento (opcional)</span>
                  <input
                    value={form.role}
                    onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                    className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                    placeholder="Ex.: aniversário, casamento..."
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Nota</span>
                  <div className="mt-1 flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={1}
                      value={form.rating}
                      onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
                      className="w-full accent-rose-600"
                    />
                    <div className="min-w-10 rounded-xl bg-slate-100 px-3 py-2 text-center text-sm font-extrabold text-slate-900 ring-1 ring-slate-200">
                      {form.rating}
                    </div>
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Comentário</span>
                  <textarea
                    value={form.text}
                    onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                    className="mt-1 min-h-28 w-full resize-none rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                    placeholder="O que você achou do sabor, da entrega e do atendimento?"
                  />
                </label>

                <Button onClick={submit} className="w-full">
                  <ChevronRight className="h-4 w-4" />
                  Enviar comentário
                </Button>

                <div className="text-xs font-medium text-slate-500">
                  Ao enviar, seu comentário aparece nesta página (somente nesta sessão do navegador).
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function About() {
  const faqs: FAQ[] = [
    {
      id: "f1",
      q: "Com quanto tempo de antecedência devo encomendar?",
      a: "Para a maioria dos pedidos, recomendamos 48–72 horas. Para eventos maiores e bolos temáticos complexos, o ideal é 7 dias ou mais.",
    },
    {
      id: "f2",
      q: "Vocês fazem opções sem lactose ou sem açúcar?",
      a: "Temos algumas opções sob consulta, dependendo do sabor e do tipo de doce/bolo. Fale com a gente no WhatsApp para verificar disponibilidade.",
    },
    {
      id: "f3",
      q: "Como funciona a entrega?",
      a: "A entrega é combinada conforme data, horário e endereço. Também oferecemos retirada em local combinado.",
    },
  ];

  return (
    <section id="sobre" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Sobre"
              title="Confeitaria com cuidado em cada detalhe"
              subtitle="A Lu Festas e Eventos nasceu para transformar comemorações em lembranças. A gente acredita em receitas bem feitas, apresentação elegante e atendimento humano."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">Acabamento premium</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Decoração limpa, cores harmônicas e detalhes que valorizam a mesa.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-extrabold text-slate-900">Atendimento próximo</div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  A gente orienta quantidades, sabores e combinações para seu evento.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-zinc-900 p-6 shadow-sm ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10">
                  <Quote className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-extrabold text-white">Nossa promessa</div>
                  <p className="text-sm leading-relaxed text-zinc-200">
                    “Do primeiro contato até a entrega, você vai sentir segurança. Se for para celebrar, a gente faz com
                    carinho e responsabilidade.”
                  </p>
                  <div className="text-xs font-semibold text-zinc-300">— Equipe Lu Festas e Eventos</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                <ChevronRight className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900">Perguntas frequentes</div>
                <div className="text-sm text-slate-600">Tudo o que você precisa saber antes de encomendar.</div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.id}
                  className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 open:bg-white open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-sm font-extrabold text-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <span>{f.q}</span>
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-slate-700 ring-1 ring-slate-200 transition-all duration-200 group-open:rotate-90">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  const phoneDigits = "11999999999";
  const phoneLabel = formatPhoneBR(phoneDigits);
  const email = "contato@lufestas.com.br";

  const [contact, setContact] = useState({
    name: "",
    date: "",
    guests: "",
    message: "",
  });

  const whatsappMessage = useMemo(() => {
    const parts = [
      "Olá! Gostaria de um orçamento com a Lu Festas e Eventos.",
      contact.name ? `Nome: ${contact.name}` : "",
      contact.date ? `Data do evento: ${contact.date}` : "",
      contact.guests ? `Quantidade de pessoas: ${contact.guests}` : "",
      contact.message ? `Detalhes: ${contact.message}` : "",
    ].filter(Boolean);
    return parts.join("\n");
  }, [contact]);

  const waLink = buildWhatsAppLink(phoneDigits, whatsappMessage);
  const mailLink = buildMailto(
    email,
    "Orçamento - Lu Festas e Eventos",
    whatsappMessage.replaceAll("\n", "\n")
  );

  return (
    <section id="contato" className="py-12 md:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Contato"
              title="Vamos montar seu pedido?"
              subtitle="Envie as informações do seu evento e a gente retorna com opções de sabores, quantidades e valores."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">WhatsApp</div>
                    <div className="text-sm text-slate-600">{phoneLabel}</div>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  Enviar mensagem <ChevronRight className="h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5" />
                </div>
              </a>

              <a
                href={mailLink}
                className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">E-mail</div>
                    <div className="text-sm text-slate-600">{email}</div>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-700">
                  Enviar e-mail <ChevronRight className="h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5" />
                </div>
              </a>
            </div>

            <div className="rounded-3xl bg-zinc-900 p-6 shadow-sm ring-1 ring-white/10">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-extrabold text-white">Atendimento</div>
                  <div className="text-sm text-zinc-200">
                    Segunda a sábado • 9h às 18h
                  </div>
                  <div className="text-sm text-zinc-200">
                    Entregas e retiradas com horário combinado
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-slate-900">Formulário rápido</div>
                <div className="text-sm text-slate-600">Gera uma mensagem pronta para WhatsApp.</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <label className="block">
                <span className="text-xs font-bold text-slate-700">Seu nome</span>
                <input
                  value={contact.name}
                  onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                  placeholder="Ex.: Ana"
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Data do evento</span>
                  <input
                    type="date"
                    value={contact.date}
                    onChange={(e) => setContact((p) => ({ ...p, date: e.target.value }))}
                    className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-700">Pessoas</span>
                  <input
                    inputMode="numeric"
                    value={contact.guests}
                    onChange={(e) => setContact((p) => ({ ...p, guests: e.target.value.replace(/[^\d]/g, "").slice(0, 4) }))}
                    className="mt-1 w-full rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                    placeholder="Ex.: 30"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-bold text-slate-700">Detalhes do pedido</span>
                <textarea
                  value={contact.message}
                  onChange={(e) => setContact((p) => ({ ...p, message: e.target.value }))}
                  className="mt-1 min-h-32 w-full resize-none rounded-xl bg-white px-3 py-2 text-sm text-slate-900 shadow-sm ring-1 ring-slate-200 outline-none transition-all duration-200 focus:ring-2 focus:ring-rose-300"
                  placeholder="Ex.: bolo tema floral + 100 docinhos sortidos, cores rosa e branco..."
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button href={waLink} className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  Enviar no WhatsApp
                </Button>
                <Button variant="secondary" href={mailLink} className="w-full">
                  <Mail className="h-4 w-4" />
                  Enviar por e-mail
                </Button>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600">Mensagem gerada</div>
                <pre className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{whatsappMessage}</pre>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container>
        <div className="grid gap-6 py-10 md:grid-cols-2 md:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-600 text-white shadow-sm">
                <CakeSlice className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900">Lu Festas e Eventos</div>
                <div className="text-xs font-semibold text-slate-500">Confeitaria & Eventos</div>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Feito com carinho para adoçar suas comemorações.
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-200 hover:bg-slate-200"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={buildWhatsAppLink("11999999999", "Olá! Vim pelo site da Lu Festas e Eventos.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 transition-all duration-200 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
            <div className="text-xs font-semibold text-slate-500">
              © {new Date().getFullYear()} Lu Festas e Eventos. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50">
      <Header />
      <main>
        <Hero />
        <Services />
        <Menu />
        <ReviewsSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}