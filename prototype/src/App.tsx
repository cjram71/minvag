import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Footprints,
  GitCompareArrows,
  GraduationCap,
  HeartHandshake,
  Home,
  Info,
  Leaf,
  LockKeyhole,
  Menu,
  Network,
  Palette,
  Plus,
  Printer,
  RotateCcw,
  Route as RouteIcon,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  careerAreas,
  discoverySteps,
  eligibilitySource,
  getCareerArea,
  getProgramme,
  observationLabels,
  programmeSource,
  programmes,
  reasonFor,
  recommendedProgrammes,
  subjects,
} from "./data";
import { emptySubjectResults, evaluateEligibility } from "./eligibility";
import { downloadState, usePrototypeState } from "./storage";
import type { AppState, EligibilityResult, ObservationId, Programme, SubjectResult } from "./types";

const navItems = [
  { href: "/jag", label: "Jag", icon: UserRound },
  { href: "/utforska", label: "Utforska", icon: Compass },
  { href: "/min-vag", label: "Min väg", icon: RouteIcon },
  { href: "/alternativ", label: "Alternativ", icon: GitCompareArrows },
  { href: "/nasta", label: "Nästa", icon: Footprints },
];

const pageTitles: Record<string, string> = {
  "/start": "Vad vill du ha hjälp med?",
  "/upptack": "En lugn start",
  "/jag": "Jag",
  "/utforska": "Utforska",
  "/behorighet": "Behörighet",
  "/min-vag": "Min väg",
  "/alternativ": "Mina alternativ",
  "/nasta": "Nästa lilla steg",
  "/dela": "Dela för ett samtal",
  "/syv": "Inför mitt SYV-samtal",
  "/kallor": "Källor och täckning",
  "/installningar": "Dina uppgifter",
  "/hjalp": "Hjälp och feedback",
};

function routeFromHash(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith("/") ? hash : "/";
}

function go(path: string): void {
  window.location.hash = path;
}

function useRoute(): string {
  const [route, setRoute] = useState(routeFromHash);
  useEffect(() => {
    const onHashChange = () => setRoute(routeFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return route;
}

function classNames(...names: Array<string | false | null | undefined>): string {
  return names.filter(Boolean).join(" ");
}

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={classNames("brand", light && "brand--light")} href="#/" aria-label="MINVÄG, startsida">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-dot brand-dot--one" />
        <span className="brand-line" />
        <span className="brand-dot brand-dot--two" />
      </span>
      <span>MINVÄG</span>
    </a>
  );
}

function PrototypeNote({ compact = false }: { compact?: boolean }) {
  return (
    <div className={classNames("prototype-note", compact && "prototype-note--compact")}>
      <LockKeyhole size={16} aria-hidden="true" />
      <span>
        <strong>Testprototyp.</strong> Dina val stannar i den här webbläsaren.
      </span>
    </div>
  );
}

function PublicHeader() {
  return (
    <header className="public-header">
      <Brand />
      <nav aria-label="Övre navigering">
        <a href="#/kallor">Källor</a>
        <a href="#/hjalp">Hjälp</a>
      </nav>
    </header>
  );
}

function AppShell({ route, children }: { route: string; children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentBase = `/${(route.split("/")[1] || "jag").split("?")[0]}`;

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Hoppa till innehållet
      </a>
      <aside className={classNames("sidebar", menuOpen && "sidebar--open")}>
        <div className="sidebar-head">
          <Brand light />
          <button className="icon-button sidebar-close" onClick={() => setMenuOpen(false)} aria-label="Stäng meny">
            <X size={22} />
          </button>
        </div>
        <p className="sidebar-kicker">Din väg. Ditt val.</p>
        <nav className="side-nav" aria-label="Huvudnavigering">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentBase === item.href;
            return (
              <a key={item.href} href={`#${item.href}`} className={classNames(active && "active")} aria-current={active ? "page" : undefined}>
                <Icon size={20} aria-hidden="true" />
                <span>{item.label}</span>
                {active && <span className="nav-active-dot" aria-hidden="true" />}
              </a>
            );
          })}
        </nav>
        <div className="sidebar-secondary">
          <a href="#/dela">
            <Share2 size={18} aria-hidden="true" /> Dela för samtal
          </a>
          <a href="#/syv">
            <FileText size={18} aria-hidden="true" /> SYV-underlag
          </a>
          <a href="#/kallor">
            <BookOpen size={18} aria-hidden="true" /> Källor
          </a>
          <a href="#/installningar">
            <Settings size={18} aria-hidden="true" /> Dina uppgifter
          </a>
        </div>
        <PrototypeNote compact />
      </aside>
      {menuOpen && <button className="menu-scrim" onClick={() => setMenuOpen(false)} aria-label="Stäng meny" />}
      <div className="app-region">
        <header className="app-header">
          <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Öppna meny">
            <Menu size={23} />
          </button>
          <div className="mobile-brand">
            <Brand />
          </div>
          <div className="app-header-title">{pageTitles[currentBase] ?? "Utforska"}</div>
          <a className="help-link" href="#/hjalp">
            <CircleHelp size={18} aria-hidden="true" /> <span>Hjälp</span>
          </a>
        </header>
        <PrototypeNote />
        <main id="main-content" className="main-content" tabIndex={-1}>
          {children}
        </main>
        <nav className="bottom-nav" aria-label="Huvudnavigering">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentBase === item.href;
            return (
              <a key={item.href} href={`#${item.href}`} className={classNames(active && "active")} aria-current={active ? "page" : undefined}>
                <Icon size={20} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function PageIntro({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="page-intro">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="lead">{text}</p>
      </div>
      {action && <div className="page-intro-action">{action}</div>}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="section-title">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action}
    </div>
  );
}

function EmptyState({ icon, title, text, action }: { icon: ReactNode; title: string; text: string; action: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}

function Landing({ hasStarted }: { hasStarted: boolean }) {
  return (
    <div className="landing">
      <PublicHeader />
      <main id="main-content">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow eyebrow--light">Din väg. Ditt val.</p>
            <h1>Du behöver inte veta vad du vill bli.</h1>
            <p className="hero-lead">
              Börja med det du vet just nu. Utforska gymnasieprogram, se möjliga vägar och hitta ett litet nästa steg.
            </p>
            <div className="hero-actions">
              <button className="button button--primary button--large" onClick={() => go(hasStarted ? "/jag" : "/start")}>
                {hasStarted ? "Fortsätt där jag var" : "Börja utforska"} <ArrowRight size={19} aria-hidden="true" />
              </button>
              <button className="button button--hero-quiet" onClick={() => go("/utforska")}>
                Jag vet redan vad jag söker
              </button>
            </div>
            <div className="hero-trust">
              <span><ShieldCheck size={18} /> Prova utan konto</span>
              <span><RouteIcon size={18} /> Inga låsta svar</span>
              <span><BookOpen size={18} /> Källor visas</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Illustration av en väg med flera möjliga grenar">
            <div className="path-card path-card--start">
              <span className="path-card-icon"><Compass size={22} /></span>
              <span><small>Du är här</small><strong>Jag utforskar</strong></span>
            </div>
            <div className="hero-path-line hero-path-line--one" />
            <div className="hero-path-line hero-path-line--two" />
            <div className="path-card path-card--a">
              <span className="path-card-icon path-card-icon--teal"><Wrench size={21} /></span>
              <span><small>Möjlighet A</small><strong>Teknik & problemlösning</strong></span>
            </div>
            <div className="path-card path-card--b">
              <span className="path-card-icon path-card-icon--amber"><HeartHandshake size={21} /></span>
              <span><small>Möjlighet B</small><strong>Människor & stöd</strong></span>
            </div>
            <div className="path-card path-card--next">
              <span className="path-card-icon path-card-icon--violet"><Footprints size={21} /></span>
              <span><small>Ett litet steg</small><strong>Jämför två vardagar</strong></span>
            </div>
            <span className="visual-note visual-note--source"><CheckCircle2 size={15} /> Källa kontrollerad</span>
            <span className="visual-note visual-note--choice">Du bestämmer</span>
          </div>
        </section>
        <section className="landing-principles" aria-labelledby="principles-title">
          <div className="landing-section-head">
            <p className="eyebrow">Så fungerar MINVÄG</p>
            <h2 id="principles-title">Lugnt nog för att tänka. Tydligt nog för att agera.</h2>
          </div>
          <div className="principle-grid">
            <article>
              <span className="number">01</span>
              <UserRound size={25} aria-hidden="true" />
              <h3>Börja med dig</h3>
              <p>Välj vad som känns viktigt just nu. Allt går att ändra, hoppa över eller ta bort.</p>
            </article>
            <article>
              <span className="number">02</span>
              <Network size={25} aria-hidden="true" />
              <h3>Se flera möjligheter</h3>
              <p>Inga personlighetstyper eller perfekta matchningar. Bara spår som kan vara värda att undersöka.</p>
            </article>
            <article>
              <span className="number">03</span>
              <Footprints size={25} aria-hidden="true" />
              <h3>Ta ett litet steg</h3>
              <p>Jämför, kontrollera en uppgift eller spara en fråga till SYV. Ett steg räcker.</p>
            </article>
          </div>
        </section>
        <section className="landing-source">
          <div>
            <p className="eyebrow">Öppet om underlaget</p>
            <h2>Fakta, förslag och osäkerhet hålls isär.</h2>
            <p>Nationella program och behörighetsregler länkas till Skolverket. När lokal data saknas säger vi det, i stället för att gissa.</p>
          </div>
          <button className="button button--secondary" onClick={() => go("/kallor")}>
            Se källor och täckning <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="landing-footer">
        <Brand light />
        <p>Testprototyp för användarvalidering · Inte en ansökningstjänst</p>
      </footer>
    </div>
  );
}

function StartScreen({ onStart }: { onStart: () => void }) {
  const choices = [
    { title: "Jag vet inte än", text: "Börja lugnt med några konkreta exempel.", icon: Sparkles, target: "/upptack", featured: true },
    { title: "Utforska program och yrkesområden", text: "Se hela listan eller sök direkt.", icon: Compass, target: "/utforska" },
    { title: "Jämföra alternativ", text: "Lägg två eller tre möjligheter bredvid varandra.", icon: GitCompareArrows, target: "/alternativ" },
    { title: "Förstå behörighet", text: "Se vad som krävs utan att blanda ihop det med antagning.", icon: FileCheck2, target: "/behorighet" },
  ];
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="start-main" id="main-content">
        <button className="back-link" onClick={() => go("/")}><ArrowLeft size={17} /> Till startsidan</button>
        <PageIntro
          eyebrow="Börja där du är"
          title="Vad vill du ha hjälp med just nu?"
          text="Du behöver inte göra allt. Välj det som känns mest användbart i dag."
        />
        <div className="intent-grid">
          {choices.map((choice) => {
            const Icon = choice.icon;
            return (
              <button
                key={choice.target}
                className={classNames("intent-card", choice.featured && "intent-card--featured")}
                onClick={() => { onStart(); go(choice.target); }}
              >
                <span className="intent-icon"><Icon size={24} /></span>
                <span><strong>{choice.title}</strong><small>{choice.text}</small></span>
                <ChevronRight size={21} className="intent-arrow" />
              </button>
            );
          })}
        </div>
        <button className="button button--quiet start-skip" onClick={() => { onStart(); go("/utforska"); }}>
          Hoppa över och sök
        </button>
        <PrototypeNote />
      </main>
    </div>
  );
}

function DiscoveryScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ObservationId[]>(state.observations);
  const current = discoverySteps[step];

  const toggle = (id: ObservationId) => {
    setDraft((values) => values.includes(id) ? values.filter((value) => value !== id) : [...values, id]);
  };

  const finish = () => {
    setState((previous) => ({ ...previous, hasStarted: true, observations: draft, personalisation: true }));
    go("/utforska");
  };

  return (
    <div className="public-page discovery-page">
      <PublicHeader />
      <main id="main-content" className="discovery-main">
        <div className="discovery-topline">
          <button className="back-link" onClick={() => step > 0 ? setStep(step - 1) : go("/start")}>
            <ArrowLeft size={17} /> {step > 0 ? "Tillbaka" : "Avsluta"}
          </button>
          <span>Fråga {step + 1} av {discoverySteps.length}</span>
        </div>
        <div className="step-dots" aria-hidden="true">
          {discoverySteps.map((_, index) => <span key={index} className={classNames(index <= step && "active")} />)}
        </div>
        <div className="discovery-card">
          <p className="eyebrow">{current.eyebrow}</p>
          <h1>{current.title}</h1>
          <p className="lead">{current.description}</p>
          <div className="choice-list" role="group" aria-label={current.title}>
            {current.options.map((option) => {
              const selected = draft.includes(option);
              return (
                <button key={option} className={classNames("choice-button", selected && "selected")} aria-pressed={selected} onClick={() => toggle(option)}>
                  <span className="choice-check">{selected && <Check size={17} strokeWidth={3} />}</span>
                  <span>{observationLabels[option]}</span>
                </button>
              );
            })}
          </div>
          <div className="discovery-actions">
            <button className="button button--primary" onClick={() => step === discoverySteps.length - 1 ? finish() : setStep(step + 1)}>
              {step === discoverySteps.length - 1 ? "Visa möjligheter" : "Fortsätt"} <ArrowRight size={18} />
            </button>
            <button className="button button--quiet" onClick={() => step === discoverySteps.length - 1 ? finish() : setStep(step + 1)}>
              Jag vet inte / hoppa över
            </button>
          </div>
        </div>
        <p className="discovery-foot"><ShieldCheck size={16} /> Det här blir inte en personlighetstyp. Du kan ändra allt senare.</p>
      </main>
    </div>
  );
}

function eligibilityLabel(result: EligibilityResult): { label: string; tone: string; icon: ReactNode } {
  if (result.state === "eligible") return { label: "Kraven ser uppfyllda ut", tone: "positive", icon: <CheckCircle2 size={16} /> };
  if (result.state === "not_yet") return { label: "Inte ännu", tone: "attention", icon: <AlertCircle size={16} /> };
  return { label: "Vi kan inte avgöra", tone: "neutral", icon: <Info size={16} /> };
}

function ProgrammeCard({ programme, state, setState, featured = false }: {
  programme: Programme;
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  featured?: boolean;
}) {
  const saved = state.savedProgrammes.includes(programme.id);
  const compared = state.compareProgrammes.includes(programme.id);
  const eligibility = evaluateEligibility(programme, state.subjectResults);
  const status = eligibilityLabel(eligibility);
  const matching = programme.themes.some((theme) => state.observations.includes(theme));

  const toggleSaved = () => {
    setState((previous) => ({
      ...previous,
      savedProgrammes: saved
        ? previous.savedProgrammes.filter((id) => id !== programme.id)
        : [...previous.savedProgrammes, programme.id],
    }));
  };

  const toggleCompare = () => {
    setState((previous) => {
      if (compared) return { ...previous, compareProgrammes: previous.compareProgrammes.filter((id) => id !== programme.id) };
      if (previous.compareProgrammes.length >= 3) return previous;
      return { ...previous, compareProgrammes: [...previous.compareProgrammes, programme.id] };
    });
  };

  return (
    <article className={classNames("programme-card", `accent-${programme.accent}`, featured && "programme-card--featured")}>
      <div className="programme-card-head">
        <span className="programme-type">{programme.kind === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande"}</span>
        <button className={classNames("save-button", saved && "saved")} onClick={toggleSaved} aria-label={`${saved ? "Ta bort" : "Spara"} ${programme.name} ${saved ? "från" : "i"} Min väg`}>
          {saved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
          <span>{saved ? "Sparad" : "Spara"}</span>
        </button>
      </div>
      <h3><a href={`#/program/${programme.id}`}>{programme.name}</a></h3>
      <p>{programme.summary}</p>
      <div className="reason-box">
        <Sparkles size={16} aria-hidden="true" />
        <span>{state.personalisation && matching ? reasonFor(programme, state.observations) : "Ett av flera program att utforska."}</span>
      </div>
      <div className="card-statuses">
        <span className={`status status--${status.tone}`}>{status.icon}{status.label}</span>
        <span className="status status--muted"><Clock3 size={16} /> Lokalt utbud saknas</span>
      </div>
      <div className="programme-card-actions">
        <a className="button button--secondary button--small" href={`#/program/${programme.id}`}>Utforska <ArrowRight size={16} /></a>
        <button className={classNames("button button--quiet button--small", compared && "is-selected")} onClick={toggleCompare} disabled={!compared && state.compareProgrammes.length >= 3}>
          <GitCompareArrows size={16} /> {compared ? "Vald för jämförelse" : "Jämför"}
        </button>
      </div>
    </article>
  );
}

function ProfileScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const saved = state.savedProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  const filledSubjects = Object.values(state.subjectResults).filter((value) => value !== "unknown").length;
  return (
    <>
      <PageIntro
        eyebrow="Din levande profil"
        title="Det här har du sagt just nu"
        text="Det är en startpunkt, inte en beskrivning av vem du är. Du kan ändra eller ta bort allt."
        action={<button className="button button--secondary" onClick={() => go("/upptack")}><Plus size={17} /> Lägg till något</button>}
      />
      <div className="dashboard-grid">
        <section className="panel profile-panel">
          <SectionTitle title="Viktigt just nu" text={state.observations.length ? `${state.observations.length} saker du själv har valt` : "Inget valt ännu"} />
          {state.observations.length > 0 ? (
            <div className="observation-list">
              {state.observations.map((id) => (
                <div className="observation-row" key={id}>
                  <span><Check size={17} /> {observationLabels[id]}</span>
                  <button onClick={() => setState((previous) => ({ ...previous, observations: previous.observations.filter((item) => item !== id) }))} aria-label={`Ta bort ${observationLabels[id]}`}>
                    <X size={17} /> Ta bort
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="inline-empty">
              <Sparkles size={22} />
              <div><strong>Du kan börja utan svar</strong><p>Utforska neutralt eller välj en enda sak.</p></div>
            </div>
          )}
          <div className="profile-controls">
            <label className="toggle-row">
              <span><strong>Anpassa förslag</strong><small>Använder bara det du valt ovan.</small></span>
              <input type="checkbox" checked={state.personalisation} onChange={(event) => setState((previous) => ({ ...previous, personalisation: event.target.checked }))} />
              <span className="toggle" aria-hidden="true" />
            </label>
          </div>
        </section>
        <aside className="dashboard-side">
          <section className="panel stat-panel">
            <div className="stat-icon"><RouteIcon size={22} /></div>
            <div><span>Spår i Min väg</span><strong>{saved.length}</strong></div>
            <a href="#/min-vag">Öppna <ArrowRight size={16} /></a>
          </section>
          <section className="panel stat-panel">
            <div className="stat-icon stat-icon--amber"><FileCheck2 size={22} /></div>
            <div><span>Ämnen ifyllda</span><strong>{filledSubjects} av {subjects.length}</strong></div>
            <a href="#/behorighet">Kontrollera <ArrowRight size={16} /></a>
          </section>
          <section className="privacy-mini">
            <ShieldCheck size={21} />
            <div><strong>Privat i den här prototypen</strong><p>Ingen skola eller vuxen kan se dina val. Det du delar här är bara en förhandsvisning.</p></div>
          </section>
        </aside>
      </div>
      <section className="page-section">
        <SectionTitle title="Spår du utforskar" text="Du kan spara flera möjligheter utan att bestämma dig." action={<a className="text-link" href="#/utforska">Hitta fler <ArrowRight size={16} /></a>} />
        {saved.length ? (
          <div className="saved-strip">
            {saved.map((programme) => (
              <a key={programme.id} href={`#/program/${programme.id}`} className={`saved-mini accent-${programme.accent}`}>
                <span>{programme.kind === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande"}</span>
                <strong>{programme.name}</strong>
                <ArrowRight size={18} />
              </a>
            ))}
          </div>
        ) : (
          <EmptyState icon={<Bookmark size={28} />} title="Inga sparade spår än" text="Spara något som väcker en fråga. Det behöver inte kännas helt rätt." action={<a className="button button--primary" href="#/utforska">Utforska möjligheter <ArrowRight size={17} /></a>} />
        )}
      </section>
    </>
  );
}

function ExploreScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const [tab, setTab] = useState<"program" | "career" | "schools">("program");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "yrkesprogram" | "högskoleförberedande">("all");
  const [offset, setOffset] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("sv");
    return programmes.filter((programme) =>
      (filter === "all" || programme.kind === filter) &&
      (!normalized || `${programme.name} ${programme.summary} ${programme.activities.join(" ")}`.toLocaleLowerCase("sv").includes(normalized)),
    );
  }, [query, filter]);
  const recommendations = recommendedProgrammes(state.personalisation ? state.observations : [], offset);

  return (
    <>
      <PageIntro eyebrow="Se flera möjligheter" title="Utforska på ditt sätt" text="Sök direkt eller börja med ett förslag. Inget här är ett beslut om din framtid." />
      <div className="search-row">
        <div className="search-field"><Search size={20} /><label className="sr-only" htmlFor="explore-search">Sök program eller innehåll</label><input id="explore-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök program eller innehåll" /></div>
        <button className="button button--secondary filter-button" onClick={() => setFilter((current) => current === "all" ? "yrkesprogram" : current === "yrkesprogram" ? "högskoleförberedande" : "all")}>
          <SlidersHorizontal size={18} /> {filter === "all" ? "Alla program" : filter === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande"}
        </button>
      </div>
      <div className="tabs" role="tablist" aria-label="Vad vill du utforska?">
        <button role="tab" aria-selected={tab === "program"} className={classNames(tab === "program" && "active")} onClick={() => setTab("program")}><GraduationCap size={18} /> Program <span>{programmes.length}</span></button>
        <button role="tab" aria-selected={tab === "career"} className={classNames(tab === "career" && "active")} onClick={() => setTab("career")}><BriefcaseBusiness size={18} /> Yrkesområden <span>{careerAreas.length}</span></button>
        <button role="tab" aria-selected={tab === "schools"} className={classNames(tab === "schools" && "active")} onClick={() => setTab("schools")}><Home size={18} /> Skolor</button>
      </div>
      {tab === "program" && (
        <>
          {!query && filter === "all" && (
            <section className="recommendation-section">
              <SectionTitle
                eyebrow={state.personalisation && state.observations.length ? "Utifrån det du sagt" : "En blandad start"}
                title="Förslag att utforska"
                text={state.observations.length ? "Några ligger nära dina val. Ett finns med för att bredda." : "Välj fritt. Förslagen är inte rangordnade efter hur bra du är."}
                action={<button className="button button--quiet" onClick={() => setOffset((offset + 4) % programmes.length)}><RotateCcw size={16} /> Visa något annat</button>}
              />
              <div className="programme-grid programme-grid--featured">
                {recommendations.slice(0, 3).map((programme, index) => <ProgrammeCard key={programme.id} programme={programme} state={state} setState={setState} featured={index === 0} />)}
              </div>
            </section>
          )}
          <section className="page-section">
            <SectionTitle title={query || filter !== "all" ? `${results.length} program hittade` : "Alla nationella program (Gy25)"} text="18 nationella program: sex högskoleförberedande och tolv yrkesprogram." />
            {results.length ? (
              <div className="programme-grid">{results.map((programme) => <ProgrammeCard key={programme.id} programme={programme} state={state} setState={setState} />)}</div>
            ) : (
              <EmptyState icon={<Search size={28} />} title="Vi hittar inget säkert resultat" text="Prova ett kortare ord eller visa alla program." action={<button className="button button--secondary" onClick={() => { setQuery(""); setFilter("all"); }}>Visa alla program</button>} />
            )}
          </section>
        </>
      )}
      {tab === "career" && (
        <section className="career-grid" aria-label="Yrkesområden att utforska">
          {careerAreas.map((area, index) => {
            const icons = [Wrench, HeartHandshake, Palette, BookOpen, Home, Leaf, Compass, Network];
            const Icon = icons[index % icons.length];
            return (
              <a key={area.id} href={`#/yrkesomrade/${area.id}`} className="career-card">
                <span className="career-icon"><Icon size={23} /></span>
                <span className="eyebrow">{area.eyebrow}</span>
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
                <span className="card-link">Utforska området <ArrowRight size={16} /></span>
              </a>
            );
          })}
        </section>
      )}
      {tab === "schools" && <SchoolCoverageState />}
    </>
  );
}

function SchoolCoverageState() {
  return (
    <section className="coverage-state">
      <div className="coverage-illustration" aria-hidden="true"><Home size={38} /><span>?</span></div>
      <div>
        <p className="eyebrow">Ärlig prototypgräns</p>
        <h2>Lokala skolor är inte anslutna ännu</h2>
        <p>Vi visar inte påhittade skolor, restider eller antagningspoäng. I en pilot behöver Skolverkets och regionala källor först kontrolleras för ditt område.</p>
        <div className="coverage-checks">
          <span><CheckCircle2 size={17} /> Nationella Gy25-program finns</span>
          <span><AlertCircle size={17} /> Skolor och lokalt utbud saknas</span>
          <span><AlertCircle size={17} /> Historisk antagning saknas</span>
        </div>
        <a className="button button--primary" href="https://utbildningsguiden.skolverket.se/" target="_blank" rel="noreferrer">Sök i Utbildningsguiden <ExternalLink size={17} /></a>
        <a className="button button--quiet" href="#/kallor">Varför visar vi inte mer?</a>
      </div>
    </section>
  );
}

function ProgrammeDetail({ programme, state, setState }: { programme: Programme; state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const saved = state.savedProgrammes.includes(programme.id);
  const compared = state.compareProgrammes.includes(programme.id);
  const eligibility = evaluateEligibility(programme, state.subjectResults);
  const status = eligibilityLabel(eligibility);
  const matchReason = reasonFor(programme, state.observations);

  return (
    <>
      <a className="back-link" href="#/utforska"><ArrowLeft size={17} /> Till Utforska</a>
      <div className={`detail-hero accent-${programme.accent}`}>
        <div className="detail-hero-copy">
          <span className="programme-type">{programme.kind === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande"} · Gy25</span>
          <h1>{programme.name}</h1>
          <p>{programme.summary}</p>
          <div className="detail-actions">
            <button className="button button--primary" onClick={() => setState((previous) => ({ ...previous, savedProgrammes: saved ? previous.savedProgrammes.filter((id) => id !== programme.id) : [...previous.savedProgrammes, programme.id] }))}>
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />} {saved ? "Sparad i Min väg" : "Lägg till i Min väg"}
            </button>
            <button className="button button--secondary" disabled={!compared && state.compareProgrammes.length >= 3} onClick={() => setState((previous) => ({ ...previous, compareProgrammes: compared ? previous.compareProgrammes.filter((id) => id !== programme.id) : [...previous.compareProgrammes, programme.id] }))}>
              <GitCompareArrows size={18} /> {compared ? "Vald för jämförelse" : "Jämför"}
            </button>
          </div>
        </div>
        <div className="detail-emblem" aria-hidden="true"><GraduationCap size={43} /><span>{programme.code}</span></div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel prose-panel">
            <h2>Du kan få göra</h2>
            <ul className="check-list">{programme.activities.map((activity) => <li key={activity}><Check size={17} /> {activity}</li>)}</ul>
            <div className="consider-box"><Info size={20} /><div><strong>Något att fundera på</strong><p>{programme.consider}</p></div></div>
          </section>
          <section className="panel prose-panel">
            <h2>Möjliga vägar vidare</h2>
            <p>Det här är exempel att undersöka, inte en garanti eller en komplett lista.</p>
            <div className="path-options">
              {programme.possiblePaths.map((path, index) => (
                <div key={path} className="path-option"><span>{index + 1}</span><p>{path}</p></div>
              ))}
            </div>
            <a className="text-link" href="#/min-vag">Visa som gren i Min väg <ArrowRight size={16} /></a>
          </section>
          <section className="panel prose-panel source-inline">
            <div className="source-icon"><BookOpen size={21} /></div>
            <div><span className="eyebrow">Officiell grundkälla</span><h2>Skolverket · {programme.name}</h2><p>Programnamn och typ gäller Gy25. Den korta texten här är förenklad prototypcopy som behöver granskas före produktion.</p><a href={programme.sourceUrl} target="_blank" rel="noreferrer">Öppna originalkällan <ExternalLink size={15} /></a></div>
          </section>
        </div>
        <aside className="reality-card">
          <p className="eyebrow">Verklighetskoll</p>
          <h2>Fyra delar — inte ett poängtal</h2>
          <div className="dimension-list">
            <div><span>Utifrån det du sagt</span><strong><Sparkles size={17} /> {state.observations.length ? matchReason : "Ingen anpassning ännu"}</strong><a href="#/jag">Ändra mina svar</a></div>
            <div><span>Behörighet</span><strong className={`text-${status.tone}`}>{status.icon} {status.label}</strong><a href={`#/behorighet?program=${programme.id}`}>Visa kraven</a></div>
            <div><span>Tidigare antagning</span><strong><AlertCircle size={17} /> Uppgift saknas</strong><a href="#/kallor">Varför?</a></div>
            <div><span>Praktiskt</span><strong><Clock3 size={17} /> Lokalt utbud ej anslutet</strong><a href="#/utforska">Se täckning</a></div>
            <div><span>Vägar vidare</span><strong><RouteIcon size={17} /> Flera möjliga</strong><a href="#/min-vag">Visa grenar</a></div>
          </div>
          <div className="no-score"><ShieldCheck size={18} /><span>MINVÄG sätter inget matchpoäng och väljer inte åt dig.</span></div>
        </aside>
      </div>
    </>
  );
}

function CareerDetail({ area, state, setState }: { area: ReturnType<typeof getCareerArea> & {}; state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const linked = area.programmeIds.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  return (
    <>
      <a className="back-link" href="#/utforska"><ArrowLeft size={17} /> Till Utforska</a>
      <div className="career-detail-hero">
        <div><p className="eyebrow">{area.eyebrow}</p><h1>{area.title}</h1><p className="lead">{area.summary}</p></div>
        <div className="career-detail-icon" aria-hidden="true"><BriefcaseBusiness size={42} /></div>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel prose-panel"><h2>Exempel på uppgifter</h2><ul className="check-list">{area.tasks.map((task) => <li key={task}><Check size={17} /> {task}</li>)}</ul></section>
          <div className="info-banner"><Info size={20} /><div><strong>Om vägarna</strong><p>{area.caveat}</p></div></div>
          <section className="page-section"><SectionTitle title="Program att undersöka" text="Möjliga startpunkter — inte en rangordning." /><div className="programme-grid">{linked.map((programme) => <ProgrammeCard key={programme.id} programme={programme} state={state} setState={setState} />)}</div></section>
        </div>
        <aside className="reality-card"><p className="eyebrow">Varför visas området?</p><h2>{state.observations.includes(area.theme) ? `Du valde “${observationLabels[area.theme].toLowerCase()}”.` : "För att bredda din utforskning."}</h2><p>Yrkesområdet är redaktionellt grupperat för den här prototypen. Kontrollera en konkret roll och utbildningsväg med SYV.</p><a className="button button--secondary button--full" href="#/syv">Spara en fråga till SYV</a></aside>
      </div>
    </>
  );
}

function exampleSubjectResults(programme: Programme): Record<string, SubjectResult> {
  const next = emptySubjectResults();
  ["SV", "EN", "MA"].forEach((code) => { next[code] = "pass"; });
  const required = programme.id === "teknik" || programme.id === "natur"
    ? ["BI", "FY", "KE"]
    : ["ekonomi", "humanistiska", "samhall"].includes(programme.id)
      ? ["GE", "HI", "RE", "SH"]
      : [];
  required.forEach((code) => { next[code] = "pass"; });
  const needed = programme.kind === "yrkesprogram" ? 5 : 9;
  const other = subjects.filter((subject) => !["SV", "EN", "MA"].includes(subject.code));
  let passed = other.filter((subject) => next[subject.code] === "pass").length;
  for (const subject of other) {
    if (passed >= needed) break;
    if (next[subject.code] !== "pass") { next[subject.code] = "pass"; passed += 1; }
  }
  return next;
}

function SubjectControl({ code, label, value, onChange }: { code: string; label: string; value: SubjectResult; onChange: (value: SubjectResult) => void }) {
  const options: Array<{ value: SubjectResult; label: string }> = [
    { value: "pass", label: "Godkänt" },
    { value: "not_pass", label: "Inte godkänt" },
    { value: "unknown", label: "Vet inte" },
  ];
  return (
    <div className="subject-row">
      <span id={`subject-${code}`}>{label}</span>
      <div className="segmented" role="radiogroup" aria-labelledby={`subject-${code}`}>
        {options.map((option) => (
          <button key={option.value} role="radio" aria-checked={value === option.value} className={classNames(value === option.value && "selected", `choice-${option.value}`)} onClick={() => onChange(option.value)}>
            {option.value === "pass" && <Check size={14} />}{option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EligibilityScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const routeQuery = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  const requested = routeQuery.get("program");
  const selectedId = requested && getProgramme(requested) ? requested : state.eligibilityTarget;
  const selected = getProgramme(selectedId) ?? programmes[0];
  const [checked, setChecked] = useState(false);
  const result = evaluateEligibility(selected, state.subjectResults);
  const status = eligibilityLabel(result);
  const requiredCodes = selected.id === "teknik" || selected.id === "natur" ? ["BI", "FY", "KE"] : ["ekonomi", "humanistiska", "samhall"].includes(selected.id) ? ["GE", "HI", "RE", "SH"] : [];
  const firstCodes = [...new Set(["SV", "EN", "MA", ...requiredCodes])];
  const rest = subjects.filter((subject) => !firstCodes.includes(subject.code));

  const updateResult = (code: string, value: SubjectResult) => {
    setChecked(false);
    setState((previous) => ({ ...previous, subjectResults: { ...previous.subjectResults, [code]: value } }));
  };

  return (
    <>
      <PageIntro eyebrow="Regler, inte gissningar" title="Förstå behörighet" text="Fyll i det du vet. Uppgifterna kommer från dig och blir inte ett officiellt besked från skolan." />
      <div className="eligibility-layout">
        <div className="eligibility-form panel">
          <label className="field-label" htmlFor="programme-select">Vilket program vill du kontrollera?</label>
          <select id="programme-select" value={selected.id} onChange={(event) => { setChecked(false); setState((previous) => ({ ...previous, eligibilityTarget: event.target.value })); go(`/behorighet?program=${event.target.value}`); }}>
            {programmes.map((programme) => <option key={programme.id} value={programme.id}>{programme.name}</option>)}
          </select>
          <div className="rule-summary">
            <FileCheck2 size={20} />
            <div><strong>{selected.kind === "yrkesprogram" ? "Yrkesprogram: 8 godkända ämnen totalt" : "Högskoleförberedande: 12 godkända ämnen totalt"}</strong><p>Svenska/SVA, engelska och matematik ingår alltid.{requiredCodes.length ? " Det här programmet har också särskilda ämneskrav." : ""}</p></div>
          </div>
          <div className="form-section-head"><div><h2>Viktigast för programmet</h2><p>Välj “vet inte” om du är osäker.</p></div><button className="text-button" onClick={() => { setState((previous) => ({ ...previous, subjectResults: exampleSubjectResults(selected) })); setChecked(true); }}><Sparkles size={15} /> Fyll ett godkänt demoexempel</button></div>
          <div className="subject-list">{firstCodes.map((code) => { const subject = subjects.find((subject) => subject.code === code)!; return <SubjectControl key={code} code={code} label={subject.shortLabel} value={state.subjectResults[code] ?? "unknown"} onChange={(value) => updateResult(code, value)} />; })}</div>
          <details className="more-subjects">
            <summary>Visa övriga ämnen <span>{rest.filter((subject) => state.subjectResults[subject.code] === "pass").length} markerade godkända</span></summary>
            <div className="subject-list">{rest.map((subject) => <SubjectControl key={subject.code} code={subject.code} label={subject.shortLabel} value={state.subjectResults[subject.code] ?? "unknown"} onChange={(value) => updateResult(subject.code, value)} />)}</div>
          </details>
          <div className="form-actions">
            <button className="button button--primary" onClick={() => setChecked(true)}>Kontrollera behörighet <ArrowRight size={17} /></button>
            <button className="button button--quiet" onClick={() => { setState((previous) => ({ ...previous, subjectResults: emptySubjectResults() })); setChecked(false); }}><RotateCcw size={16} /> Rensa svaren</button>
          </div>
        </div>
        <aside className="eligibility-result-wrap">
          {!checked ? (
            <div className="result-placeholder"><div><FileCheck2 size={29} /></div><h2>Ditt resultat visas här</h2><p>MINVÄG skiljer på vad som är godkänt, inte godkänt och okänt.</p></div>
          ) : (
            <div className={classNames("eligibility-result", `eligibility-result--${status.tone}`)} aria-live="polite">
              <span className={`result-icon result-icon--${status.tone}`}>{status.icon}</span>
              <p className="eyebrow">Behörighet enligt det du fyllt i</p>
              <h2>{result.heading}</h2>
              <p>{result.summary}</p>
              {result.unmetRequirements.length > 0 && <div className="result-group"><strong>Det här är inte uppfyllt just nu</strong><ul>{result.unmetRequirements.map((item) => <li key={item}><AlertCircle size={16} /> {item}</li>)}</ul></div>}
              {result.missingInputs.length > 0 && <div className="result-group"><strong>Det här behöver fyllas i eller kontrolleras</strong><ul>{result.missingInputs.slice(0, 8).map((item) => <li key={item}><Info size={16} /> {item}</li>)}</ul>{result.missingInputs.length > 8 && <small>och {result.missingInputs.length - 8} till</small>}</div>}
              {result.metRequirements.length > 0 && <details className="calculation"><summary>Visa det som är uppfyllt</summary><ul>{result.metRequirements.map((item) => <li key={item}><Check size={16} /> {item}</li>)}</ul></details>}
              <div className="meaning-box"><strong>{result.state === "eligible" ? "Det betyder inte" : "Det här säger inte"}</strong><p>{result.state === "eligible" ? "att du säkert blir antagen. Urval och antagningspoäng är en annan fråga." : "något om ditt värde eller vad du kan klara senare."}</p></div>
              <div className="result-actions"><button className="button button--primary button--full" onClick={() => { const question = `Vad behöver jag kontrollera för behörighet till ${selected.name}?`; setState((previous) => ({ ...previous, questions: previous.questions.includes(question) ? previous.questions : [...previous.questions, question] })); go("/syv"); }}>Spara en fråga till SYV <ArrowRight size={17} /></button><a className="button button--quiet button--full" href="#/kallor">Visa regel och källa</a></div>
            </div>
          )}
          <div className="source-mini"><BookOpen size={18} /><div><strong>Regelgrund: Skolverket</strong><span>{eligibilitySource.applies}</span><a href={eligibilitySource.sourceUrl} target="_blank" rel="noreferrer">Öppna källan <ExternalLink size={14} /></a></div></div>
        </aside>
      </div>
    </>
  );
}

function PathScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const saved = state.savedProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  if (!saved.length) return <EmptyState icon={<RouteIcon size={31} />} title="Din väg kan börja med en fråga" text="Spara ett program eller yrkesområde som du vill förstå bättre. Du behöver inte välja rätt." action={<a className="button button--primary" href="#/utforska">Hitta ett spår <ArrowRight size={17} /></a>} />;
  return (
    <>
      <PageIntro eyebrow="En möjlighet, inte ett löfte" title="Spår jag utforskar" text="Du kan ha flera grenar. En gren kan ändras eller tas bort utan att du har misslyckats." action={<a className="button button--secondary" href="#/utforska"><Plus size={17} /> Lägg till gren</a>} />
      <section className="path-canvas" aria-label="Möjliga vägar">
        <div className="path-start-node"><span><UserRound size={21} /></span><div><small>Nu</small><strong>Årskurs 8–9</strong></div></div>
        <div className="path-trunk" aria-hidden="true" />
        <div className="path-branch-grid">
          {saved.map((programme) => (
            <article className={`path-branch accent-${programme.accent}`} key={programme.id}>
              <div className="path-branch-line" aria-hidden="true" />
              <div className="path-programme-node">
                <span className="programme-type">Möjlighet</span>
                <h2>{programme.name}</h2>
                <p>{programme.kind === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande program"}</p>
                <div className="node-links"><a href={`#/program/${programme.id}`}>Utforska</a><button onClick={() => setState((previous) => ({ ...previous, savedProgrammes: previous.savedProgrammes.filter((id) => id !== programme.id) }))}>Ta bort</button></div>
              </div>
              <div className="path-down-line" aria-hidden="true" />
              <div className="future-nodes">
                {programme.possiblePaths.slice(0, 2).map((path) => <div key={path}><RouteIcon size={16} /><span>{path}</span></div>)}
              </div>
              <p className="branch-caveat"><Info size={15} /> Behörighet, lokalt utbud och nästa steg behöver kontrolleras.</p>
            </article>
          ))}
        </div>
      </section>
      <div className="path-list-alternative">
        <h2>Samma väg som lista</h2>
        <ol>{saved.map((programme) => <li key={programme.id}><strong>{programme.name}</strong><span>kan ha flera vägar vidare, till exempel {programme.possiblePaths[0]}.</span></li>)}</ol>
      </div>
      <div className="info-banner"><ShieldCheck size={20} /><div><strong>Din sparade väg ändras inte av sig själv</strong><p>I en framtida pilot ska nya källuppgifter visas som något du kan granska, inte som en tyst ändring.</p></div></div>
    </>
  );
}

function CompareScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const selected = state.compareProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  const toggle = (id: string) => setState((previous) => ({ ...previous, compareProgrammes: previous.compareProgrammes.includes(id) ? previous.compareProgrammes.filter((item) => item !== id) : previous.compareProgrammes.length < 3 ? [...previous.compareProgrammes, id] : previous.compareProgrammes }));
  return (
    <>
      <PageIntro eyebrow="Jämför utan vinnare" title="Mina alternativ" text="Välj två eller tre program. Vi visar skillnader och frågor — inte vilket som är bäst." />
      <div className="compare-picker panel">
        <div className="compare-picker-head"><div><h2>Välj program</h2><p>{selected.length} av 3 valda · minst 2 behövs</p></div>{selected.length > 0 && <button className="text-button" onClick={() => setState((previous) => ({ ...previous, compareProgrammes: [] }))}>Rensa</button>}</div>
        <div className="picker-scroll">{programmes.map((programme) => { const active = state.compareProgrammes.includes(programme.id); return <button key={programme.id} className={classNames("picker-chip", active && "active")} aria-pressed={active} onClick={() => toggle(programme.id)} disabled={!active && selected.length >= 3}><span>{active ? <Check size={14} /> : <Plus size={14} />}</span>{programme.shortName}</button>; })}</div>
      </div>
      {selected.length < 2 ? (
        <EmptyState icon={<GitCompareArrows size={30} />} title="Välj minst två alternativ" text="Börja med sådant som väcker olika frågor. Du kan byta när som helst." action={<a className="button button--secondary" href="#/utforska">Hitta alternativ</a>} />
      ) : (
        <section className="comparison" aria-label={`Jämförelse av ${selected.length} program`}>
          <div className="comparison-head"><span className="comparison-question">Program</span>{selected.map((programme, index) => <div key={programme.id} className={`comparison-title accent-${programme.accent}`}><span>Alternativ {String.fromCharCode(65 + index)}</span><strong>{programme.shortName}</strong><button onClick={() => toggle(programme.id)} aria-label={`Ta bort ${programme.name}`}><X size={15} /></button></div>)}</div>
          <CompareRow title="Typ" programmes={selected} render={(programme) => programme.kind === "yrkesprogram" ? "Yrkesprogram" : "Högskoleförberedande"} />
          <CompareRow title="Mycket av" programmes={selected} render={(programme) => programme.activities.slice(0, 2).join(" · ")} />
          <CompareRow title="Utifrån det du sagt" programmes={selected} render={(programme) => state.observations.length ? reasonFor(programme, state.observations) : "Ingen anpassning ännu."} />
          <CompareRow title="Behörighet just nu" programmes={selected} render={(programme) => eligibilityLabel(evaluateEligibility(programme, state.subjectResults)).label} tone={(programme) => eligibilityLabel(evaluateEligibility(programme, state.subjectResults)).tone} />
          <CompareRow title="Tidigare antagning" programmes={selected} render={() => "Uppgift saknas — ingen prognos"} />
          <CompareRow title="Möjliga grenar" programmes={selected} render={(programme) => programme.possiblePaths.slice(0, 2).join(" · ")} />
          <CompareRow title="Att fundera på" programmes={selected} render={(programme) => programme.consider} />
          <div className="comparison-actions"><button className="button button--primary" onClick={() => { const q = `Vad är den viktigaste skillnaden mellan ${selected.map((programme) => programme.shortName).join(" och ")}?`; setState((previous) => ({ ...previous, questions: previous.questions.includes(q) ? previous.questions : [...previous.questions, q] })); go("/syv"); }}>Spara en fråga om skillnaden <ArrowRight size={17} /></button></div>
        </section>
      )}
    </>
  );
}

function CompareRow({ title, programmes: selected, render, tone }: { title: string; programmes: Programme[]; render: (programme: Programme) => string; tone?: (programme: Programme) => string }) {
  return <div className="comparison-row"><h2>{title}</h2>{selected.map((programme) => <div key={programme.id} className={tone ? `cell-tone-${tone(programme)}` : undefined}>{render(programme)}</div>)}</div>;
}

type NextAction = { title: string; text: string; reason: string; time: string; target: string; icon: typeof Compass };
function nextActions(state: AppState): NextAction[] {
  const actions: NextAction[] = [];
  if (!state.observations.length) actions.push({ title: "Välj en sak som känns viktig just nu", text: "En enda fråga räcker för att komma igång.", reason: "Du har inte lagt till något i din profil än.", time: "2 minuter", target: "/upptack", icon: Sparkles });
  if (!state.savedProgrammes.length) actions.push({ title: "Spara ett spår att undersöka", text: "Det behöver inte kännas helt rätt — bara väcka en fråga.", reason: "Min väg har inga grenar ännu.", time: "3 minuter", target: "/utforska", icon: Bookmark });
  if (state.compareProgrammes.length < 2) actions.push({ title: "Välj två program att jämföra", text: "Titta på vardag, krav och möjliga vägar utan att utse en vinnare.", reason: "Du har ännu inte två alternativ sida vid sida.", time: "5 minuter", target: "/alternativ", icon: GitCompareArrows });
  if (Object.values(state.subjectResults).every((value) => value === "unknown")) actions.push({ title: "Förstå ett programs behörighetskrav", text: "Fyll i det du vet eller lämna resten som okänt.", reason: "Din behörighetsbild är ännu inte kontrollerad.", time: "5 minuter", target: "/behorighet", icon: FileCheck2 });
  actions.push({ title: "Förbered en fråga till din SYV", text: "Spara det du vill förstå bättre inför ett riktigt samtal.", reason: "En människa kan hjälpa dig att se lokal information och nyanser.", time: "2 minuter", target: "/syv", icon: HeartHandshake });
  actions.push({ title: "Kontrollera var en uppgift kommer ifrån", text: "Se skillnaden mellan officiell fakta, prototyptext och sådant som saknas.", reason: "En källa och ett datum gör ett val lättare att kontrollera.", time: "3 minuter", target: "/kallor", icon: BookOpen });
  return actions;
}

function NextScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const actions = nextActions(state);
  const index = state.nextActionIndex % actions.length;
  const action = actions[index];
  const Icon = action.icon;
  return (
    <>
      <PageIntro eyebrow="En sak i taget" title="Nästa lilla steg" text="Du behöver inte göra en hel plan. Välj det här, byt eller stanna för i dag." />
      <div className="next-layout">
        <section className="next-card">
          <div className="next-visual"><span><Icon size={30} /></span><div className="next-dotted-line" /><span className="next-end-dot"><Check size={18} /></span></div>
          <div className="next-copy">
            <div className="next-meta"><span><Clock3 size={15} /> {action.time}</span><span>Förslag — inte krav</span></div>
            <h2>{action.title}</h2>
            <p className="lead">{action.text}</p>
            <div className="why-next"><Sparkles size={18} /><div><strong>Varför just detta?</strong><p>{action.reason}</p></div></div>
            {state.nextActionState === "completed" ? (
              <div className="completed-box"><CheckCircle2 size={23} /><div><strong>Klart för nu</strong><p>Vill du välja ett nytt steg eller stanna här?</p></div></div>
            ) : (
              <div className="next-actions"><button className="button button--primary button--large" onClick={() => { setState((previous) => ({ ...previous, nextActionState: "accepted" })); go(action.target); }}>Börja med detta <ArrowRight size={18} /></button><button className="button button--secondary" onClick={() => setState((previous) => ({ ...previous, nextActionIndex: previous.nextActionIndex + 1, nextActionState: "proposed" }))}>Välj ett annat steg</button><button className="button button--quiet" onClick={() => setState((previous) => ({ ...previous, nextActionState: "declined" }))}>Inte nu</button></div>
            )}
          </div>
        </section>
        <aside className="next-side"><ShieldCheck size={22} /><h2>Ingen poäng. Ingen serie att bryta.</h2><p>Att byta steg eller stanna är också ett aktivt val. MINVÄG skickar inga påminnelser i prototypen.</p>{state.nextActionState === "accepted" && <button className="button button--secondary button--full" onClick={() => setState((previous) => ({ ...previous, nextActionState: "completed" }))}><Check size={17} /> Markera steget klart</button>}</aside>
      </div>
    </>
  );
}

const shareScopes = [
  { id: "shortlist", title: "Mina sparade program", text: "Bara namnen på programmen i Min väg." },
  { id: "comparison", title: "Min jämförelse", text: "De alternativ du själv har valt att jämföra." },
  { id: "path", title: "Min möjliga väg", text: "Sparade grenar och deras allmänna nästa vägar." },
  { id: "questions", title: "Mina frågor", text: "Frågor du valt till ett samtal." },
  { id: "eligibility", title: "Behörighetssammanfattning", text: "Resultatstatus, men aldrig dina enskilda ämnessvar." },
];

function ShareScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const [preview, setPreview] = useState(false);
  const [adultView, setAdultView] = useState(false);
  const adultViewButton = useRef<HTMLButtonElement>(null);
  const toggleScope = (id: string) => setState((previous) => ({ ...previous, share: { ...previous.share, scopes: previous.share.scopes.includes(id) ? previous.share.scopes.filter((scope) => scope !== id) : [...previous.share.scopes, id] } }));
  const closeAdultView = () => {
    setAdultView(false);
    window.setTimeout(() => adultViewButton.current?.focus(), 0);
  };
  const handleModalKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAdultView();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  return (
    <>
      <PageIntro eyebrow="Du väljer exakt vad som syns" title="Bjud in till ett samtal" text="I prototypen skapas ingen riktig länk. Du kan prova flödet och se vuxenvyn på samma enhet." />
      <div className="share-layout">
        <section className="panel share-controls">
          <div className="share-person"><span><HeartHandshake size={23} /></span><div><strong>Förälder eller annan stödperson</strong><p>Kan läsa och ställa frågor som du ser.</p></div></div>
          <h2>Välj vad som delas</h2>
          <div className="scope-list">{shareScopes.map((scope) => { const checked = state.share.scopes.includes(scope.id); return <label key={scope.id} className={classNames("scope-row", checked && "selected")}><input type="checkbox" checked={checked} onChange={() => toggleScope(scope.id)} /><span className="scope-check">{checked && <Check size={16} />}</span><span><strong>{scope.title}</strong><small>{scope.text}</small></span></label>; })}</div>
          <div className="not-shared"><LockKeyhole size={18} /><div><strong>Delas aldrig här</strong><p>Dina privata upptäcktssvar, enskilda ämnesresultat eller vad du klickat på.</p></div></div>
          <div className="share-actions"><button className="button button--secondary" onClick={() => setPreview(!preview)}>{preview ? "Stäng förhandsvisning" : "Förhandsgranska exakt"}</button><button className="button button--primary" disabled={!state.share.scopes.length} onClick={() => setState((previous) => ({ ...previous, share: { ...previous.share, active: true, createdAt: new Date().toISOString() } }))}><Share2 size={17} /> Skapa demo-delning</button></div>
        </section>
        <aside className="share-summary">
          {state.share.active ? <><span className="share-active-icon"><CheckCircle2 size={24} /></span><p className="eyebrow">Demo-delning aktiv</p><h2>Vuxenvyn är redo</h2><p>Det här är bara en lokal simulering. Ingen annan kan öppna den.</p><dl><div><dt>Omfattning</dt><dd>{state.share.scopes.length} delar</dd></div><div><dt>Giltighet i verklig tjänst</dt><dd>7 dagar</dd></div></dl><button ref={adultViewButton} className="button button--primary button--full" onClick={() => setAdultView(true)}>Öppna vuxenvyn</button><button className="button button--quiet button--full" onClick={() => setState((previous) => ({ ...previous, share: { ...previous.share, active: false } }))}>Återkalla nu</button></> : <><span className="share-lock-icon"><LockKeyhole size={24} /></span><h2>Inget delas nu</h2><p>En verklig delning skulle vara tydlig, tidsbegränsad och möjlig att återkalla direkt.</p></>}
        </aside>
      </div>
      {preview && <SharePayload state={state} title="Det här kommer att synas" />}
      {adultView && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeAdultView(); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="adult-title" onKeyDown={handleModalKeyDown}><button autoFocus className="icon-button modal-close" onClick={closeAdultView} aria-label="Stäng vuxenvyn"><X size={21} /></button><p className="eyebrow">Vuxenvy · demo</p><h2 id="adult-title">Eleven har valt att dela detta</h2><p>Du kan läsa och ställa synliga frågor. Eleven äger sin väg och kan stänga delningen.</p><SharePayload state={state} compact title="Delat med dig" /><div className="conversation-prompt"><HeartHandshake size={20} /><div><strong>Bra fråga att börja med</strong><p>“Vad känns fortfarande oklart?”</p></div></div><button className="button button--secondary button--full" onClick={closeAdultView}>Tillbaka till elevvyn</button></div></div>}
    </>
  );
}

function SharePayload({ state, title, compact = false }: { state: AppState; title: string; compact?: boolean }) {
  const saved = state.savedProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  const compared = state.compareProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  return <section className={classNames("share-preview", compact && "share-preview--compact")}><h2>{title}</h2>{state.share.scopes.includes("shortlist") && <div><strong>Sparade program</strong><p>{saved.length ? saved.map((p) => p.name).join(" · ") : "Inga program sparade"}</p></div>}{state.share.scopes.includes("comparison") && <div><strong>Jämförelse</strong><p>{compared.length ? compared.map((p) => p.name).join(" · ") : "Ingen jämförelse sparad"}</p></div>}{state.share.scopes.includes("path") && <div><strong>Möjlig väg</strong><p>{saved.length ? `${saved.length} grenar — alla markerade som möjligheter` : "Ingen väg sparad"}</p></div>}{state.share.scopes.includes("questions") && <div><strong>Frågor</strong><ul>{state.questions.map((q) => <li key={q}>{q}</li>)}</ul></div>}{state.share.scopes.includes("eligibility") && <div><strong>Behörighetssammanfattning</strong><p>{eligibilityLabel(evaluateEligibility(getProgramme(state.eligibilityTarget) ?? programmes[0], state.subjectResults)).label}. Bygger på självrapporterade uppgifter.</p></div>}</section>;
}

function SyvScreen({ state, setState }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> }) {
  const [question, setQuestion] = useState("");
  const saved = state.savedProgrammes.map((id) => getProgramme(id)).filter(Boolean) as Programme[];
  const addQuestion = () => { const clean = question.trim(); if (!clean) return; setState((previous) => ({ ...previous, questions: [...previous.questions, clean] })); setQuestion(""); };
  return (
    <>
      <PageIntro eyebrow="Dina ord först" title="Förbered ett bättre SYV-samtal" text="Underlaget samlar dina alternativ, det som är oklart och vad du vill fråga. Det är ingen bedömning." action={<button className="button button--secondary" onClick={() => window.print()}><Printer size={17} /> Skriv ut</button>} />
      <div className="syv-layout">
        <section className="syv-document" aria-label="Förhandsvisning av SYV-underlag">
          <div className="document-head"><Brand /><span>Inför mitt SYV-samtal</span></div>
          <div className="document-date">Skapad i testprototypen · {new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date())}</div>
          <div className="document-section"><span className="document-number">1</span><div><h2>Jag utforskar just nu</h2>{saved.length ? <ul>{saved.map((programme) => <li key={programme.id}><strong>{programme.name}</strong><span>{reasonFor(programme, state.observations)}</span></li>)}</ul> : <p>Jag har inte sparat något program ännu.</p>}</div></div>
          <div className="document-section"><span className="document-number">2</span><div><h2>Det som fortfarande är oklart</h2><ul>{saved.length ? saved.map((programme) => <li key={programme.id}>Lokalt utbud och tidigare antagningsuppgifter för {programme.name} behöver kontrolleras.</li>) : <li>Vilka alternativ kan vara bra att börja jämföra?</li>}</ul></div></div>
          <div className="document-section"><span className="document-number">3</span><div><h2>Mina frågor</h2>{state.questions.length ? <ol>{state.questions.map((item, index) => <li key={`${item}-${index}`}><span>{item}</span><button className="document-delete" onClick={() => setState((previous) => ({ ...previous, questions: previous.questions.filter((_, i) => i !== index) }))} aria-label={`Ta bort frågan ${item}`}><X size={15} /></button></li>)}</ol> : <p>Inga frågor sparade ännu.</p>}</div></div>
          <div className="document-foot"><ShieldCheck size={18} /><p><strong>Eleven äger underlaget.</strong> MINVÄG har inte valt program eller gjort ett officiellt behörighetsbesked.</p></div>
        </section>
        <aside className="syv-tools panel">
          <h2>Lägg till en fråga</h2>
          <label className="field-label" htmlFor="syv-question">Vad vill du förstå bättre?</label>
          <textarea id="syv-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={180} placeholder="Till exempel: Hur skiljer sig vardagen mellan programmen?" />
          <button className="button button--primary button--full" onClick={addQuestion} disabled={!question.trim()}><Plus size={17} /> Lägg till frågan</button>
          <div className="suggested-questions"><strong>Förslag att använda</strong>{["Vilka lokala inriktningar erbjuds faktiskt nästa år?", "Vad behöver jag kontrollera om behörighet?", "Vilket litet nästa steg kan hjälpa mig jämföra?"].map((item) => <button key={item} onClick={() => setQuestion(item)}>{item}<Plus size={14} /></button>)}</div>
          <hr />
          <a className="button button--secondary button--full" href="#/dela"><Share2 size={17} /> Prova delningsflödet</a>
          <p className="tool-note"><LockKeyhole size={15} /> I prototypen lämnar inget underlag webbläsaren.</p>
        </aside>
      </div>
    </>
  );
}

function SourcesScreen() {
  const sourceCards = [programmeSource, eligibilitySource];
  return (
    <>
      <PageIntro eyebrow="Öppet om underlaget" title="Källor och täckning" text="Här ser du vad som är officiell fakta, vad som är förenklad prototyptext och vad som inte är anslutet ännu." />
      <div className="coverage-overview">
        <div className="coverage-score"><span>2</span><p><strong>officiella grundkällor</strong><small>länkade i prototypen</small></p></div>
        <div className="coverage-status-list"><span><CheckCircle2 size={18} /> Nationella Gy25-program</span><span><CheckCircle2 size={18} /> Nationella behörighetskategorier</span><span className="is-missing"><AlertCircle size={18} /> Lokala skolor och utbud</span><span className="is-missing"><AlertCircle size={18} /> Antagningshistorik och arbetsmarknadssignaler</span></div>
      </div>
      <section className="page-section"><SectionTitle title="Använda grundkällor" text="Öppna originalet för den senaste officiella informationen." /><div className="source-grid">{sourceCards.map((source) => <article className="source-card" key={source.title}><div className="source-card-top"><span><BookOpen size={20} /></span><div><small>{source.type}</small><strong>{source.owner}</strong></div><span className="verified"><Check size={14} /> Kontrollerad</span></div><h2>{source.title}</h2><dl><div><dt>Gäller</dt><dd>{source.applies}</dd></div><div><dt>MINVÄG kontrollerade</dt><dd>{source.verified}</dd></div><div><dt>Senaste notering</dt><dd>{source.updated}</dd></div></dl><a href={source.sourceUrl} target="_blank" rel="noreferrer">Öppna originalkällan <ExternalLink size={15} /></a></article>)}</div></section>
      <section className="source-boundary"><div className="source-boundary-icon"><AlertCircle size={25} /></div><div><p className="eyebrow">Saknas medvetet</p><h2>Vi visar inte uppgifter vi inte kan styrka</h2><p>Skolutbud, resvägar, öppet hus, regional antagningshistorik och arbetsmarknadsdata kräver fungerande och granskade datakällor. Därför visas tydliga tomlägen i stället.</p><span className="documentation-note"><FileText size={16} /> Den fulla dataplanen finns i projektets granskningspaket.</span></div></section>
      <section className="page-section"><SectionTitle title="Så ska varje viktig uppgift visas" /><div className="provenance-demo"><div><span className="eyebrow">Behörighetskrav</span><h2>Källa: Skolverket</h2><p>Nationell regelvägledning · Gy25</p></div><div className="provenance-facts"><span><strong>Gäller</strong> utbildning som börjar efter 30 juni 2025</span><span><strong>Kontrollerad</strong> 2 september 2026</span><span><strong>Säkerhet</strong> hög för nationell regel</span><span><strong>Osäkerhet</strong> dina svar är självrapporterade</span></div></div></section>
    </>
  );
}

function SettingsScreen({ state, setState, reset }: { state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>>; reset: () => void }) {
  const [confirmClear, setConfirmClear] = useState(false);
  const itemCount = state.observations.length + state.savedProgrammes.length + state.questions.length + Object.values(state.subjectResults).filter((value) => value !== "unknown").length;
  return (
    <>
      <PageIntro eyebrow="Kontroll från början" title="Dina uppgifter" text="Prototypen har inget konto eller backend. Uppgifter sparas bara lokalt så att flödet fungerar när du kommer tillbaka." />
      <div className="settings-layout">
        <section className="panel settings-panel"><div className="settings-title"><span><LockKeyhole size={22} /></span><div><h2>Sparat i den här webbläsaren</h2><p>{itemCount} val eller uppgifter just nu</p></div></div><ul className="data-list"><li><span>Profilval</span><strong>{state.observations.length}</strong></li><li><span>Sparade program</span><strong>{state.savedProgrammes.length}</strong></li><li><span>Ämnessvar</span><strong>{Object.values(state.subjectResults).filter((value) => value !== "unknown").length}</strong></li><li><span>Sparade frågor</span><strong>{state.questions.length}</strong></li><li><span>Aktiv demo-delning</span><strong>{state.share.active ? "Ja" : "Nej"}</strong></li></ul><button className="button button--secondary button--full" onClick={() => downloadState(state)}><Download size={17} /> Ladda ner mina uppgifter</button></section>
        <section className="panel settings-panel"><h2>Anpassning</h2><label className="toggle-row"><span><strong>Förslag utifrån det jag sagt</strong><small>Kan stängas av utan att utforskningen försvinner.</small></span><input type="checkbox" checked={state.personalisation} onChange={(event) => setState((previous) => ({ ...previous, personalisation: event.target.checked }))} /><span className="toggle" aria-hidden="true" /></label><div className="fixed-setting"><span><strong>AI-formulerad text</strong><small>All text är fast och lokalt lagrad i prototypen.</small></span><span className="off-badge">Av</span></div><div className="fixed-setting"><span><strong>Analys och spårning</strong><small>Inga analysverktyg är installerade.</small></span><span className="off-badge">Av</span></div></section>
        <section className="panel settings-panel danger-zone"><h2>Rensa prototypen</h2><p>Tar bort profilval, ämnessvar, sparade program, frågor och demo-delning från den här webbläsaren.</p>{confirmClear ? <div className="confirm-clear"><strong>Vill du verkligen rensa allt?</strong><div><button className="button button--danger" onClick={() => { reset(); setConfirmClear(false); go("/"); }}><Trash2 size={17} /> Ja, rensa allt</button><button className="button button--quiet" onClick={() => setConfirmClear(false)}>Avbryt</button></div></div> : <button className="button button--danger-outline" onClick={() => setConfirmClear(true)}><Trash2 size={17} /> Rensa alla lokala uppgifter</button>}</section>
      </div>
    </>
  );
}

function HelpScreen() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageIntro eyebrow="När något känns fel" title="Hjälp och feedback" text="Prototypen har ingen bemannad support. Här kan du prova rapportflödet och hitta vägar vidare." />
      <div className="help-grid">
        <section className="panel help-panel"><span className="help-icon"><AlertCircle size={23} /></span><h2>Rapportera fel eller otydlig text</h2><p>Rapporten skickas inte i den här prototypen. Formuläret finns för att testa om flödet är begripligt.</p>{submitted ? <div className="submitted"><CheckCircle2 size={23} /><div><strong>Tack — demon är klar</strong><p>I en riktig tjänst skulle du få information om när och hur rapporten granskas.</p></div></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="field-label" htmlFor="report-type">Vad gäller det?</label><select id="report-type"><option>En uppgift verkar fel</option><option>Texten är svår att förstå</option><option>Något känns dömande eller jobbigt</option><option>Tillgänglighet</option><option>Säkerhet eller privat information</option></select><label className="field-label" htmlFor="report-text">Berätta kort (skriv inget känsligt)</label><textarea id="report-text" maxLength={500} /><button className="button button--primary" type="submit">Prova att skicka</button></form>}</section>
        <aside className="help-side"><section><span><HeartHandshake size={21} /></span><div><h2>Behöver du hjälp med valet?</h2><p>Prata med din studie- och yrkesvägledare, lärare eller en vuxen du litar på.</p><a href="#/syv">Förbered en SYV-fråga <ArrowRight size={16} /></a></div></section><section><span><ShieldCheck size={21} /></span><div><h2>Känner du dig otrygg eller är det akut?</h2><p>MINVÄG kan inte ge akut hjälp. Vid akut fara i Sverige: ring 112. Du kan också prata med elevhälsan eller en trygg vuxen.</p><a href="https://www.1177.se/" target="_blank" rel="noreferrer">1177 Vårdguiden <ExternalLink size={15} /></a></div></section><section><span><BookOpen size={21} /></span><div><h2>Vill du kontrollera en uppgift?</h2><p>Öppna originalkällan och ta med frågan till en SYV eller skola.</p><a href="#/kallor">Se källorna <ArrowRight size={16} /></a></div></section></aside>
      </div>
    </>
  );
}

function NotFound() {
  return <EmptyState icon={<Compass size={30} />} title="Den här sidan finns inte" text="Gå tillbaka till Utforska och välj ett nytt spår." action={<a className="button button--primary" href="#/utforska">Till Utforska</a>} />;
}

export default function App() {
  const route = useRoute();
  const [state, setState, reset] = usePrototypeState();

  useEffect(() => {
    const base = `/${(route.split("/")[1] || "").split("?")[0]}`;
    const title = pageTitles[base] ?? (route.startsWith("/program/") ? getProgramme(route.split("/")[2])?.name : route.startsWith("/yrkesomrade/") ? getCareerArea(route.split("/")[2])?.title : undefined);
    document.title = title ? `${title} · MINVÄG` : "MINVÄG — Du behöver inte veta än";
    requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  if (route === "/") return <Landing hasStarted={state.hasStarted} />;
  if (route === "/start") return <StartScreen onStart={() => setState((previous) => ({ ...previous, hasStarted: true }))} />;
  if (route === "/upptack") return <DiscoveryScreen state={state} setState={setState} />;

  let content: ReactNode;
  if (route === "/jag") content = <ProfileScreen state={state} setState={setState} />;
  else if (route === "/utforska") content = <ExploreScreen state={state} setState={setState} />;
  else if (route.startsWith("/program/")) {
    const programme = getProgramme(route.split("/")[2]);
    content = programme ? <ProgrammeDetail programme={programme} state={state} setState={setState} /> : <NotFound />;
  } else if (route.startsWith("/yrkesomrade/")) {
    const area = getCareerArea(route.split("/")[2]);
    content = area ? <CareerDetail area={area} state={state} setState={setState} /> : <NotFound />;
  } else if (route.startsWith("/behorighet")) content = <EligibilityScreen state={state} setState={setState} />;
  else if (route === "/min-vag") content = <PathScreen state={state} setState={setState} />;
  else if (route === "/alternativ") content = <CompareScreen state={state} setState={setState} />;
  else if (route === "/nasta") content = <NextScreen state={state} setState={setState} />;
  else if (route === "/dela") content = <ShareScreen state={state} setState={setState} />;
  else if (route === "/syv") content = <SyvScreen state={state} setState={setState} />;
  else if (route === "/kallor") content = <SourcesScreen />;
  else if (route === "/installningar") content = <SettingsScreen state={state} setState={setState} reset={reset} />;
  else if (route === "/hjalp") content = <HelpScreen />;
  else content = <NotFound />;

  return <AppShell route={route}>{content}</AppShell>;
}
