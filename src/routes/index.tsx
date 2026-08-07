import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import {
  Menu,
  X,
  MessageCircle,
  MapPin,
  Instagram,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
/**
 * As fotos ficam em `public/photos` e são referenciadas por URL absoluta.
 * Servidas como arquivos estáticos, funcionam igual em dev, build e SSR —
 * sem depender da resolução de assets do bundler.
 */
const logoImg = "/photos/kominka-logo.jpg";
const heroKarate = "/photos/hero-karate.jpg";
const dojoFachada = "/photos/dojo-fachada.jpg";
const dojoMidia = "/photos/dojo-midia.jpg";
const zazenImg = "/photos/meditacao-zazen.jpg";
const iogkfImg = "/photos/iogkf.jpg";
const iogkfLogo = "/photos/iogkf-logo.png";
const shiatsuImg = "/photos/shiatsu.jpg";

const GALERIA_FOTOS = Array.from(
  { length: 17 },
  (_, i) => `/photos/galeria-${String(i + 1).padStart(2, "0")}.jpg`,
);

const WHATSAPP_NUMBER = "5527999216299";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de saber mais sobre a aula experimental no Kominka Dojo.",
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const SHIATSU_NUMBER = "5527999798718";
const SHIATSU_MSG = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de agendar um atendimento de Shiatsu no Kominka Dojo.",
);
const SHIATSU_WA_URL = `https://wa.me/${SHIATSU_NUMBER}?text=${SHIATSU_MSG}`;

const IOGKF_SITE = "https://www.iogkfbrasil.com.br/";

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "O Dojo", href: "#dojo" },
  { label: "Karate", href: "#karate" },
  { label: "IOGKF", href: "#iogkf" },
  { label: "Horários", href: "#horarios" },
  { label: "Zazen", href: "#zazen" },
  { label: "Shiatsu", href: "#shiatsu" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

export const Route = createFileRoute("/")({
  component: KominkaHome,
});

function KominkaHome() {
  return (
    <div className="min-h-screen bg-kominka-cream font-sans text-kominka-ink antialiased">
      <Header />
      <main>
        <Hero />
        <ODojo />
        <Karate />
        <IOGKF />
        <NaMidia />
        <Horarios />
        <Zazen />
        <Shiatsu />
        <Galeria />
        <PorQue />
        <Localizacao />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------------- HEADER ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-kominka-green/10 bg-kominka-cream/85 backdrop-blur-md shadow-[0_1px_20px_-10px_rgba(15,42,38,0.25)]"
          : "border-b border-transparent bg-kominka-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3 shrink-0 group">
          <img
            src={logoImg}
            alt="Kominka Dojo"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-kominka-green/10 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-serif text-lg text-kominka-green">Kominka</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-kominka-ink/60">
              Okinawa Goju-Ryu
            </div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-kominka-ink/75 hover:text-kominka-green transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-kominka-green after:transition-all after:duration-300 hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift hidden sm:inline-flex items-center gap-2 rounded-full bg-kominka-green px-5 py-2.5 text-sm font-medium text-kominka-cream hover:bg-kominka-green-deep"
          >
            Aula experimental
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-kominka-green/20 text-kominka-green transition-colors hover:bg-kominka-green/5"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-kominka-green/10 bg-kominka-cream px-5 py-4 animate-fade-in">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-kominka-ink/85 hover:bg-kominka-green/5"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full bg-kominka-green px-5 py-3 text-center text-kominka-cream"
              >
                Aula experimental
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section
      id="inicio"
      className="paper-grain relative overflow-hidden bg-kominka-green-deep text-kominka-cream"
    >
      {/* Fundo textural + overlay editorial */}
      <div className="absolute inset-0 opacity-[0.14]" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 20%, rgba(201,185,154,0.35), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(139,111,78,0.35), transparent 60%), repeating-linear-gradient(90deg, rgba(245,240,234,0.04) 0 2px, transparent 2px 8px)",
          }}
        />
      </div>
      <div
        className="absolute inset-0 bg-linear-to-b from-kominka-green-deep/50 via-transparent to-kominka-green-deep"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-kominka-green-deep/60 via-transparent to-transparent"
        aria-hidden
      />

      {/* Ensō decorativo — só desktop */}
      <Enso
        size={220}
        className="pointer-events-none absolute -right-16 top-16 hidden text-kominka-sand/25 lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-kominka-sand/40 bg-kominka-cream/5 px-4 py-1.5 text-[10px] tracking-[0.28em] uppercase text-kominka-sand backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-kominka-sand" />
            Karate Goju-Ryu de Okinawa · Vitória/ES
          </span>

          <p className="mt-6 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-kominka-sand/80">
            <span className="h-px w-8 bg-kominka-sand" /> Pontal de Camburi
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.5rem]">
            Karate Goju-Ryu <br />
            <span className="italic text-kominka-sand">de Okinawa</span> <br />
            em Vitória
          </h1>

          {/* Foto abaixo do título — apenas mobile/tablet */}
          <div className="relative mt-8 lg:hidden">
            <div className="relative aspect-4/5 w-full max-w-sm mx-auto overflow-hidden rounded-sm border border-kominka-sand/30 bg-kominka-green shadow-2xl">
              <img
                src={heroKarate}
                alt="Alunos e senseis do Kominka Dojo reunidos no dojo após o treino"
                className="img-zoom h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          <p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-kominka-cream/85 md:text-2xl">
            No Kominka Dojo, tradição, disciplina e cultura se encontram em um espaço inspirado nas
            antigas casas de Okinawa.
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-kominka-cream/70">
            Aulas para crianças a partir de 6 anos, adolescentes e adultos, com foco em
            desenvolvimento físico, respeito, defesa pessoal, concentração e preservação da cultura
            okinawana.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-kominka-cream px-7 py-4 text-sm font-medium tracking-wide text-kominka-green hover:bg-white"
            >
              Agendar aula experimental
            </a>
            <a
              href="#horarios"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-kominka-cream/30 px-7 py-4 text-sm font-medium text-kominka-cream hover:bg-kominka-cream/10 hover:border-kominka-cream/60"
            >
              Ver horários
            </a>
          </div>
        </Reveal>

        {/* Foto real dos senseis — apenas desktop */}
        <Reveal delay={200} className="relative hidden lg:block">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm border border-kominka-sand/30 bg-kominka-green shadow-2xl">
            <img
              src={heroKarate}
              alt="Alunos e senseis do Kominka Dojo reunidos no dojo após o treino"
              className="img-zoom h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div
            className="absolute -bottom-4 -left-4 h-24 w-24 border-l-2 border-b-2 border-kominka-sand"
            aria-hidden
          />
          <div
            className="absolute -top-4 -right-4 h-24 w-24 border-r-2 border-t-2 border-kominka-sand"
            aria-hidden
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- O DOJO ---------------- */
function ODojo() {
  const destaques = [
    "Karate tradicional de Okinawa",
    "Aulas para crianças e adultos",
    "Meditação (zazen)",
    "Shiatsu terapia",
    "Ambiente cultural e acolhedor",
  ];
  return (
    <section id="dojo" className="bg-kominka-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block lg:order-1">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-kominka-green/15 shadow-xl">
              <img
                src={dojoFachada}
                alt="Fachada de madeira do Kominka Dojo, réplica de uma casa tradicional de Okinawa"
                className="img-zoom h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:order-2">
            <SectionKicker>O espaço</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Um dojo inspirado na tradição de Okinawa
            </h2>

            {/* Foto abaixo do título — apenas mobile/tablet */}
            <div className="mt-8 lg:hidden">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm border border-kominka-green/15 shadow-xl">
                <img
                  src={dojoFachada}
                  alt="Fachada de madeira do Kominka Dojo, réplica de uma casa tradicional de Okinawa"
                  className="img-zoom h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              O Kominka Dojo é uma réplica externa de uma antiga casa tradicional da Ilha de
              Okinawa, no Japão. O espaço abriga a prática do Karate Goju-Ryu tradicional, funciona
              como zendo para meditação e também atende na área do Shiatsu.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              Localizado em Pontal de Camburi, Vitória/ES, o dojo oferece uma experiência que vai
              além da atividade física: é um ambiente de disciplina, cultura, autoconhecimento e
              convivência.
            </p>
            <ul className="mt-8 space-y-3">
              {destaques.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] text-kominka-ink/85">
                  <span className="mt-2 h-px w-6 shrink-0 bg-kominka-green" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- KARATE ---------------- */
function Karate() {
  const kids = [
    "Mais disciplina e concentração",
    "Desenvolvimento da coordenação motora",
    "Respeito aos colegas e professores",
    "Autoconfiança",
    "Atividade física com valores",
    "Ambiente seguro e orientado",
  ];
  const adultos = [
    "Defesa pessoal",
    "Condicionamento físico",
    "Controle emocional",
    "Consistência e disciplina",
    "Prática tradicional, sem foco apenas em competição",
    "Conexão com a cultura okinawana",
  ];
  return (
    <section id="karate" className="bg-kominka-green-deep py-20 text-kominka-cream md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <SectionKicker light>A prática</SectionKicker>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Karate para corpo, mente e disciplina
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-kominka-cream/80 md:text-base">
            No Kominka Dojo, as aulas seguem a tradição do Goju-Ryu Karate-do de Okinawa, com
            prática voltada para defesa pessoal, condicionamento físico, concentração, respeito e
            preservação dos valores do karate tradicional.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <BenefitBlock title="Para crianças de 6 a 12 anos" items={kids} />
          </Reveal>
          <Reveal delay={200}>
            <BenefitBlock title="Para adolescentes e adultos" items={adultos} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BenefitBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-kominka-cream/15 bg-kominka-green p-8 md:p-10">
      <h3 className="font-serif text-2xl text-kominka-cream md:text-3xl">{title}</h3>
      <div className="mt-6 h-px w-12 bg-kominka-sand" />
      <ul className="mt-6 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] text-kominka-cream/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kominka-sand" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- IOGKF ---------------- */
function IOGKF() {
  return (
    <section id="iogkf" className="bg-kominka-cream-warm py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm border border-kominka-green/15 shadow-xl">
              <img
                src={iogkfImg}
                alt="Encontro da IOGKF Brasil reunindo praticantes de Goju-Ryu de Okinawa"
                className="img-zoom h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <SectionKicker>Honbu Dojo</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Honbu Dojo da IOGKF Brasil
            </h2>

            <div className="mt-8 lg:hidden">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm border border-kominka-green/15 shadow-xl">
                <img
                  src={iogkfImg}
                  alt="Encontro da IOGKF Brasil reunindo praticantes de Goju-Ryu de Okinawa"
                  className="img-zoom h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              O Kominka Dojo é o Honbu Dojo — dojo central — da IOGKF Brasil, organização dedicada à
              preservação e difusão do Karate Goju-Ryu tradicional de Okinawa.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              A IOGKF Brasil integra a International Okinawan Goju-ryu Karate-do Federation (IOGKF),
              uma das maiores e mais tradicionais organizações internacionais dedicadas ao Goju-ryu
              de Okinawa, com presença em diversos países ao redor do mundo.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              A partir do Kominka, são desenvolvidas atividades de treinamento, cursos, encontros e
              Gasshukus, mantendo viva a tradição do Goju-ryu de Okinawa e promovendo sua prática de
              forma fiel às suas raízes.
            </p>

            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              <img
                src={iogkfLogo}
                alt="Logomarca da IOGKF Brasil"
                className="h-28 w-auto shrink-0 md:h-32"
                loading="lazy"
              />
              <a
                href={IOGKF_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-kominka-green bg-kominka-green px-6 py-3 text-xs tracking-[0.2em] uppercase text-kominka-cream transition hover:bg-transparent hover:text-kominka-green"
              >
                Saiba mais sobre a IOGKF Brasil
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- NA MÍDIA ---------------- */
function NaMidia() {
  return (
    <section className="bg-kominka-cream py-20 md:py-28 text-kominka-ink">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <SectionKicker>Na Mídia</SectionKicker>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
            Kominka Dojo na mídia
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-kominka-ink/75 md:text-base">
            Uma história de tradição, cultura e dedicação reconhecida pela imprensa capixaba.
          </p>
        </div>

        <article className="mt-12 grid gap-0 border border-kominka-sand/40 bg-kominka-cream-warm text-kominka-ink shadow-sm lg:grid-cols-[1.1fr_1fr]">
          <div className="order-2 p-8 md:p-12 lg:order-1">
            <span className="inline-flex items-center gap-2 border border-kominka-green/25 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-kominka-green">
              Destaque na Folha Vitória
            </span>
            <h3 className="mt-6 font-serif text-2xl leading-snug text-kominka-green md:text-4xl">
              Casal constrói casa japonesa para ensinar caratê em Vitória
            </h3>
            <div className="mt-6 border-l-2 border-kominka-sand pl-5">
              <p className="font-serif text-lg italic leading-relaxed text-kominka-ink/80 md:text-xl">
                O Kominka Dojo foi destaque em reportagem da Folha Vitória por sua história única:
                um espaço construído com inspiração nas antigas casas de Okinawa, dedicado ao ensino
                do Karate Goju-Ryu tradicional e à valorização da cultura okinawana.
              </p>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/75">
              A matéria apresenta a trajetória dos senseis Zé Mário e Rosi, a construção do dojo com
              as próprias mãos e a proposta de preservar, em Vitória, a prática e a filosofia do
              Karate Goju-Ryu de Okinawa.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/75">
              Uma história de perseverança, cultura e respeito às origens do karate tradicional.
            </p>
            <a
              href="https://www.folhavitoria.com.br/esportes/karate-kid-em-vitoria-casal-constroi-casa-japonesa-pra-ensinar-carate-em-vitoria/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnObmbHWW2TtcjdCpjdeIKnK3JPunQ50O4M15yTexMCMQmfilHJJV5ATXBq9A_aem_Iz8_5M-eyPs2ioKB9A80gg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-kominka-green bg-kominka-green px-6 py-3 text-xs tracking-[0.2em] uppercase text-kominka-cream transition hover:bg-transparent hover:text-kominka-green"
            >
              Ler reportagem na Folha Vitória
              <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="order-1 lg:order-2">
            <img
              src={dojoMidia}
              alt="Fachada do Kominka Dojo durante o dia, como retratada na reportagem da Folha Vitória"
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
              loading="lazy"
            />
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------------- HORÁRIOS ---------------- */
type Turma = {
  tag: string;
  titulo: string;
  idade?: string;
  schedule: string[];
  valor?: string;
  nota?: ReactNode;
};

function Horarios() {
  const turmas: Turma[] = [
    {
      tag: "Adultos",
      titulo: "Karate Goju-Ryu",
      idade: "13 anos ou mais",
      schedule: ["Segundas e quartas · 19h30 às 20h30", "Quintas · 19h00 às 20h30"],
      valor: "R$ 220,00 / mês",
    },
    {
      tag: "Crianças",
      titulo: "Karate Goju-Ryu",
      idade: "6 a 12 anos",
      schedule: ["Segundas e quartas · 18h30 às 19h15"],
      valor: "R$ 200,00 / mês",
    },
    {
      tag: "Meditação",
      titulo: "Zazen",
      idade: "Todas as idades",
      schedule: ["Sábados, quinzenalmente · 08h00"],
      valor: "Entrada franca",
      nota: (
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-kominka-green underline underline-offset-4 hover:opacity-70"
        >
          Agendar pelo WhatsApp · (27) 99921-6299
        </a>
      ),
    },
    {
      tag: "Shiatsu",
      titulo: "Terapia oriental",
      schedule: ["Sob agendamento"],
      nota: (
        <a
          href={SHIATSU_WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-kominka-green underline underline-offset-4 hover:opacity-70"
        >
          Agendar pelo WhatsApp · (27) 99979-8718
        </a>
      ),
    },
  ];

  return (
    <section id="horarios" className="bg-kominka-cream-warm py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <SectionKicker>Turmas</SectionKicker>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
            Horários das aulas
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {turmas.map((t) => (
            <article
              key={t.tag}
              className="group flex flex-col justify-between border border-kominka-green/15 bg-kominka-cream p-8 transition-colors hover:border-kominka-green/40"
            >
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-kominka-green/70">
                  {t.tag}
                </div>
                <h3 className="mt-2 font-serif text-2xl text-kominka-green md:text-3xl">
                  {t.titulo}
                </h3>
                <div className="mt-4 h-px w-10 bg-kominka-green/30" />
                <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  {t.idade && <Info label="Idade" value={t.idade} />}
                  {t.valor && <Info label="Investimento" value={t.valor} />}
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] tracking-[0.2em] uppercase text-kominka-ink/50">
                      Dias e horários
                    </dt>
                    <dd className="mt-1 space-y-0.5 text-kominka-ink">
                      {t.schedule.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </dd>
                  </div>
                </dl>
                {t.nota && <p className="mt-5 text-sm">{t.nota}</p>}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-kominka-ink/70 italic">
          Você pode fazer uma aula experimental gratuita e sem compromisso. Permanecendo na prática
          do karate, é necessária a filiação anual no valor de R$ 80,00.
        </p>

        <div className="mt-8">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift inline-flex items-center gap-2 rounded-full bg-kominka-green px-7 py-4 text-sm font-medium text-kominka-cream hover:bg-kominka-green-deep"
          >
            Quero agendar minha aula experimental
          </a>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] tracking-[0.2em] uppercase text-kominka-ink/50">{label}</dt>
      <dd className="mt-1 text-kominka-ink">{value}</dd>
    </div>
  );
}

/* ---------------- ZAZEN ---------------- */
function Zazen() {
  return (
    <section id="zazen" className="bg-kominka-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionKicker>Zazen</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Meditação aberta à comunidade
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              Quinzenalmente, o Kominka Dojo abre suas portas como espaço para meditação, com
              entrada franca. A prática segue a linha da meditação Zen Budista, em postura de zazen
              (sentado), oferecendo um momento de silêncio, presença e autoconhecimento.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              Nesses encontros são passadas informações de como praticar por conta própria, é lido
              um pequeno texto sobre o assunto e no final é servido um chá.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-kominka-ink/70">
              <span className="inline-flex items-center gap-2">
                <Clock size={16} /> Sábados, quinzenalmente · 08h00
              </span>
              <span>·</span>
              <span>Entrada franca</span>
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-kominka-green pb-1 text-sm text-kominka-green hover:opacity-70"
            >
              Perguntar sobre a meditação →
            </a>
          </div>
          <figure className="relative overflow-hidden rounded-sm ring-1 ring-kominka-green/10 shadow-[0_20px_60px_-30px_rgba(23,59,53,0.35)]">
            <img
              src={zazenImg}
              alt="Praticantes em postura de zazen no Kominka Dojo"
              loading="lazy"
              className="img-zoom aspect-square w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SHIATSU ---------------- */
function Shiatsu() {
  return (
    <section id="shiatsu" className="bg-kominka-cream-warm py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionKicker>Shiatsu</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Equilíbrio através do toque
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              O Kominka Dojo também oferece atendimento de Shiatsu, uma terapia corporal tradicional
              japonesa que utiliza a pressão dos dedos, mãos e polegares sobre pontos e regiões
              específicas do corpo.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              Por meio de pressões, alongamentos e movimentos precisos, o Shiatsu busca favorecer o
              equilíbrio do organismo, aliviar tensões e proporcionar uma sensação de relaxamento e
              bem-estar.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              No ambiente acolhedor e tradicional do Kominka, o atendimento de Shiatsu é uma
              oportunidade para cuidar do corpo e encontrar um momento de pausa e equilíbrio.
            </p>
            <a
              href={SHIATSU_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-kominka-green pb-1 text-sm text-kominka-green hover:opacity-70"
            >
              Agendar Shiatsu pelo WhatsApp →
            </a>
          </div>
          <figure className="relative overflow-hidden rounded-sm ring-1 ring-kominka-green/10 shadow-[0_20px_60px_-30px_rgba(23,59,53,0.35)]">
            <img
              src={shiatsuImg}
              alt="Sala de atendimento de Shiatsu no Kominka Dojo"
              loading="lazy"
              className="img-zoom aspect-4/5 w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ---------------- GALERIA ---------------- */
const GALERIA_LEGENDAS = [
  "Fachada do Kominka Dojo ao entardecer",
  "Chinelos na entrada, ritual de todo praticante antes do treino",
  "Turma reunida sob os retratos dos mestres de Goju-Ryu",
  "Shisa artesanal, guardião tradicional de Okinawa",
  "Sensei ensinando o Dojo Kun às crianças",
  "Caligrafia e retratos na parede do dojo",
  "Hibisco no jardim, ao lado do emblema do Goju-Ryu",
  "Sensei corrigindo a postura de um aluno",
  "Jardim com lanterna de pedra e fonte tsukubai",
  "Zafu de meditação bordado com o nome do praticante",
  "Alunos em posição de kata",
  "Zendo preparado para a prática de zazen",
  "Sensei e aluno em meditação seiza",
  'Placa de madeira com a caligrafia "Sonho de Okinawa"',
  "Atendimento de Shiatsu no ambiente do dojo",
  "Prática de defesa pessoal entre alunos",
  "Entrada do Kominka Dojo em um dia claro",
];

function Galeria() {
  const items = GALERIA_FOTOS.map((src, i) => ({
    src,
    label: GALERIA_LEGENDAS[i] ?? "Kominka Dojo",
  }));

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Mouse drag para desktop
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /** Recalcula a foto ativa no carrossel durante a rolagem. */
  const syncScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const figures = Array.from(el.querySelectorAll<HTMLElement>("figure"));
    if (figures.length > 0) {
      const containerLeft = el.getBoundingClientRect().left;
      let minDiff = Infinity;
      let closestIdx = 0;
      figures.forEach((fig, idx) => {
        const diff = Math.abs(fig.getBoundingClientRect().left - containerLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncScroll();
    el.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll);
    return () => {
      el.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, [syncScroll]);

  /** Avança/retrocede com cálculo preciso e loop continuo nas extremidades. */
  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;

    const figures = Array.from(el.querySelectorAll<HTMLElement>("figure"));
    if (!figures.length) return;

    let targetIdx = activeIndex + dir;

    // Loop circular para a seta sempre funcionar
    if (targetIdx < 0) {
      targetIdx = figures.length - 1;
    } else if (targetIdx >= figures.length) {
      targetIdx = 0;
    }

    const targetFig = figures[targetIdx];
    if (targetFig) {
      const padLeft = parseFloat(getComputedStyle(el).paddingLeft || "20");
      const targetScroll = targetFig.offsetLeft - padLeft;
      el.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  // Handlers para arrastar com o mouse no Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    el.scrollLeft = scrollLeft.current - walk;
  };

  // Atalhos de teclado no Modal
  useEffect(() => {
    if (modalIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      if (e.key === "ArrowLeft") {
        setModalIndex((prev) => (prev !== null ? (prev > 0 ? prev - 1 : items.length - 1) : null));
      }
      if (e.key === "ArrowRight") {
        setModalIndex((prev) => (prev !== null ? (prev < items.length - 1 ? prev + 1 : 0) : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalIndex, items.length]);

  return (
    <section id="galeria" className="bg-kominka-green py-20 text-kominka-cream md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionKicker light>Galeria</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
              Um espaço construído para preservar a cultura e o espírito de Okinawa
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-kominka-sand/80 font-mono">
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="h-2 w-16 bg-kominka-sand/20 rounded-full overflow-hidden">
              <span
                className="block h-full bg-kominka-sand transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
              />
            </span>
            <span>{String(items.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="relative mt-10 -mx-5 lg:-mx-8">
          <div
            ref={trackRef}
            role="region"
            aria-label="Fotos do Kominka Dojo"
            tabIndex={0}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 lg:gap-6 lg:px-8 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {items.map((it, idx) => (
              <figure
                key={it.src}
                onClick={() => {
                  if (!isDragging.current) setModalIndex(idx);
                }}
                className="shrink-0 snap-start basis-[82%] sm:basis-[45%] lg:basis-[28%] overflow-hidden rounded-sm ring-1 ring-kominka-cream/10 cursor-pointer group relative transition-transform duration-300 hover:scale-[1.01]"
              >
                <img
                  src={it.src}
                  alt={it.label}
                  loading="lazy"
                  decoding="async"
                  className="img-zoom aspect-4/5 w-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 bg-linear-to-t from-kominka-green-deep/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
                  <p className="text-xs text-kominka-cream font-medium line-clamp-2">{it.label}</p>
                </div>
              </figure>
            ))}
          </div>

          {/* Setas de navegação em destaque */}
          <GaleriaSeta direction="left" onClick={() => slide(-1)} />
          <GaleriaSeta direction="right" onClick={() => slide(1)} />
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-kominka-cream/70">
          <p className="italic">
            Use as setas, arraste para o lado ou clique na foto para ampliar.
          </p>
          <span className="sm:hidden font-mono">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* Modal / Lightbox de foto ampliada */}
      {modalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setModalIndex(null)}
        >
          <div
            className="relative flex max-h-[90vh] max-w-5xl flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do Modal */}
            <div className="absolute -top-12 left-0 right-0 flex items-center justify-between text-kominka-cream">
              <span className="font-mono text-sm">
                {modalIndex + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 py-1.5 text-xs hover:bg-white/20 transition-colors"
              >
                <X size={16} /> Fechar
              </button>
            </div>

            {/* Imagem Ampliada */}
            <img
              src={items[modalIndex].src}
              alt={items[modalIndex].label}
              className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
            />

            {/* Legenda */}
            <p className="mt-4 text-center text-sm font-serif text-kominka-cream/90">
              {items[modalIndex].label}
            </p>

            {/* Setas no Modal */}
            <button
              type="button"
              onClick={() =>
                setModalIndex((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : items.length - 1) : null,
                )
              }
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/60 text-white shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95 md:-left-16 md:h-14 md:w-14"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={() =>
                setModalIndex((prev) =>
                  prev !== null ? (prev < items.length - 1 ? prev + 1 : 0) : null,
                )
              }
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/60 text-white shadow-xl backdrop-blur-md transition-transform hover:scale-110 active:scale-95 md:-right-16 md:h-14 md:w-14"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/** Seta circular destacada com ótimo contraste e área de toque para mobile e desktop. */
function GaleriaSeta({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Ver fotos anteriores" : "Ver próximas fotos"}
      className={`absolute top-[calc(50%-1.25rem)] z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-kominka-sand/50 bg-kominka-green-deep/95 text-kominka-cream shadow-2xl backdrop-blur-md transition-all duration-200 hover:border-kominka-sand hover:bg-kominka-green-deep hover:scale-110 active:scale-90 focus-visible:outline-2 focus-visible:outline-kominka-sand md:h-14 md:w-14 ${
        isLeft ? "left-2 sm:left-4 lg:left-6" : "right-2 sm:right-4 lg:right-6"
      }`}
    >
      {isLeft ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  );
}

/* ---------------- POR QUE ---------------- */
function PorQue() {
  const items = [
    {
      title: "Tradição real de Okinawa",
      desc: "Uma prática ligada às raízes do Karate Goju-Ryu, preservando técnica, filosofia e respeito à cultura okinawana.",
    },
    {
      title: "Ambiente seguro para crianças",
      desc: "As crianças treinam em um espaço acolhedor, com orientação próxima, disciplina e respeito ao ritmo de cada aluno.",
    },
    {
      title: "Prática para adultos iniciantes",
      desc: "Mesmo sem experiência, adultos podem começar com segurança, desenvolvendo condicionamento, defesa pessoal e constância.",
    },
    {
      title: "Disciplina e foco",
      desc: "O karate ajuda a construir concentração, autocontrole e responsabilidade dentro e fora do dojo.",
    },
    {
      title: "Cultura e acolhimento",
      desc: "O Kominka é também um espaço cultural, inspirado nas antigas casas de Okinawa, com uma atmosfera única em Vitória.",
    },
    {
      title: "Aula experimental gratuita",
      desc: "Novos alunos podem conhecer a prática antes de se comprometer, entendendo de perto a rotina, o ambiente e os valores do dojo.",
    },
  ];
  const experimentalMsg = encodeURIComponent(
    "Olá! Vim pelo site e gostaria de agendar uma aula experimental no Kominka Dojo.",
  );
  const experimentalUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${experimentalMsg}`;
  return (
    <section className="paper-grain relative bg-kominka-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionKicker>Por quê</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Mais que uma aula de karate
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-kominka-ink/75 md:col-span-5 md:text-base">
            No Kominka Dojo, cada treino é uma oportunidade de desenvolver corpo, mente e caráter em
            um ambiente de tradição, respeito e acolhimento.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-kominka-green/15 bg-kominka-green/15 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <PorQueBloco key={it.title} index={i} title={it.title} desc={it.desc} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 border-t border-kominka-green/15 pt-10 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="max-w-md font-serif text-xl leading-snug text-kominka-green md:text-2xl">
            Quer conhecer o ambiente e experimentar uma aula?
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a
              href={experimentalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-kominka-green px-6 py-3.5 text-sm text-kominka-cream hover:bg-kominka-green-deep"
            >
              Agendar aula experimental
            </a>
            <a
              href="#turmas"
              className="btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-kominka-green/40 px-6 py-3.5 text-sm text-kominka-green hover:border-kominka-green hover:bg-kominka-green/5"
            >
              Ver horários
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PorQueBloco({ index, title, desc }: { index: number; title: string; desc: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} group relative flex flex-col bg-kominka-cream p-7 transition-colors duration-500 hover:bg-kominka-cream-warm md:p-9`}
    >
      <div className="flex items-baseline gap-3">
        <span className="font-serif text-xs tracking-[0.2em] text-kominka-red">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-kominka-green/20 transition-colors duration-500 group-hover:bg-kominka-green/40" />
      </div>
      <h3 className="mt-5 font-serif text-xl leading-snug text-kominka-green md:text-2xl">
        {title}
      </h3>
      <p className="mt-3 text-[14px] leading-relaxed text-kominka-ink/75 md:text-[15px]">{desc}</p>
    </div>
  );
}

/* ---------------- LOCALIZAÇÃO ---------------- */
function Localizacao() {
  return (
    <section id="contato" className="bg-kominka-cream-warm py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionKicker>Localização</SectionKicker>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
              Visite o Kominka Dojo
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-kominka-ink/80 md:text-base">
              Estamos localizados em Pontal de Camburi, Vitória/ES.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Pontal+de+Camburi+Vit%C3%B3ria+ES+Kominka+Dojo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex items-center justify-center gap-2 rounded-full border border-kominka-green px-6 py-3.5 text-sm text-kominka-green hover:bg-kominka-green hover:text-kominka-cream"
              >
                <MapPin size={16} /> Ver localização no Google Maps
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex items-center justify-center gap-2 rounded-full bg-kominka-green px-6 py-3.5 text-sm text-kominka-cream hover:bg-kominka-green-deep"
              >
                <MessageCircle size={16} /> Chamar no WhatsApp
              </a>
            </div>
          </div>

          <div className="aspect-4/3 w-full overflow-hidden border border-kominka-green/20 bg-kominka-cream">
            <iframe
              title="Kominka Dojo · Pontal de Camburi"
              src="https://www.google.com/maps?q=Pontal+de+Camburi+Vit%C3%B3ria+ES&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    {
      q: "Preciso ter experiência para começar?",
      a: "Não. As aulas são abertas para iniciantes, respeitando o ritmo de cada aluno.",
    },
    {
      q: "Crianças podem fazer aula experimental?",
      a: "Sim. Crianças a partir de 6 anos podem fazer uma aula experimental gratuita.",
    },
    {
      q: "Qual roupa usar na primeira aula?",
      a: "Para a aula experimental, venha com roupa confortável para atividade física.",
    },
    {
      q: "A meditação é paga?",
      a: "Não. A prática de zazen é aberta à comunidade e tem entrada franca.",
    },
    {
      q: "Como faço para agendar?",
      a: "Basta chamar pelo WhatsApp e combinar o melhor horário disponível.",
    },
  ];
  return (
    <section className="bg-kominka-cream py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionKicker>Perguntas</SectionKicker>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-kominka-green md:text-5xl">
          Perguntas frequentes
        </h2>
        <div className="mt-10 divide-y divide-kominka-green/15 border-t border-b border-kominka-green/15">
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-kominka-green-deep"
      >
        <span className="font-serif text-lg text-kominka-green md:text-xl">{q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-kominka-green/25 text-kominka-green transition-all duration-500 ${
            open ? "rotate-180 bg-kominka-green text-kominka-cream border-kominka-green" : ""
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 pr-10 text-[15px] leading-relaxed text-kominka-ink/75">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CTA FINAL ---------------- */
function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-kominka-green-deep py-24 text-kominka-cream md:py-32">
      <div
        className="absolute inset-0 opacity-[0.12]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(201,185,154,0.4), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <div className="mx-auto h-px w-16 bg-kominka-sand" />
        <h2 className="mt-8 font-serif text-4xl leading-tight md:text-6xl">
          Venha conhecer o <br className="hidden sm:block" />
          <span className="italic text-kominka-sand">Kominka Dojo</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-kominka-cream/80 md:text-base">
          Agende uma aula experimental gratuita e conheça de perto a prática do Karate Goju-Ryu de
          Okinawa em um ambiente de tradição, disciplina e acolhimento.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-kominka-cream px-8 py-4 text-sm font-medium text-kominka-green hover:bg-white"
        >
          <MessageCircle size={16} /> Agendar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="bg-kominka-green py-14 text-kominka-cream/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Kominka Dojo"
              className="h-12 w-12 rounded-full ring-1 ring-kominka-cream/20"
            />
            <div>
              <div className="font-serif text-xl text-kominka-cream">Kominka Dojo</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-kominka-sand">
                Okinawa Goju-Ryu
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-start gap-2 text-sm text-kominka-cream/70">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span>
              Rua Thereza Zanoni Caser, 168
              <br />
              Pontal de Camburi — Vitória/ES
            </span>
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-kominka-sand">Navegação</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#dojo" className="hover:text-kominka-cream">
                O Dojo
              </a>
            </li>
            <li>
              <a href="#horarios" className="hover:text-kominka-cream">
                Horários
              </a>
            </li>
            <li>
              <a href="#zazen" className="hover:text-kominka-cream">
                Meditação
              </a>
            </li>
            <li>
              <a href="#contato" className="hover:text-kominka-cream">
                Contato
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-kominka-sand">Contato</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-kominka-cream"
              >
                <MessageCircle size={14} /> WhatsApp: 27 99921-6299
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/kominka_dojo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-kominka-cream"
              >
                <Instagram size={14} /> @kominka_dojo
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={14} /> Pontal de Camburi, Vitória/ES
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-kominka-cream/10 px-5 pt-6 text-xs text-kominka-cream/50 lg:px-8">
        © {new Date().getFullYear()} Kominka Dojo · Karate Goju-Ryu de Okinawa
      </div>
    </footer>
  );
}

/* ---------------- WHATSAPP FLOAT ---------------- */
function FloatingWhatsApp() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-white/30 hover:bg-[#1EBE5D] md:h-16 md:w-16"
    >
      <MessageCircle size={24} />
    </a>
  );
}

/* ---------------- SHARED ---------------- */

/**
 * Wrapper de reveal on scroll. Aplica fade + slide up sutil quando entra no viewport.
 * Aceita delay em ms para efeito de escada.
 */
function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header";
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Círculo ensō — desenhado com stroke tracejado. Detalhe zen sutil. */
function Enso({ className = "", size = 72 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden>
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="235 40"
        transform="rotate(-35 50 50)"
        opacity="0.7"
      />
    </svg>
  );
}

function SectionKicker({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase ${light ? "text-kominka-sand" : "text-kominka-green/70"}`}
    >
      <span className={`h-px w-8 ${light ? "bg-kominka-sand" : "bg-kominka-green/50"}`} />
      {children}
    </div>
  );
}
