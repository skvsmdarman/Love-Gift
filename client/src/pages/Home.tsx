/**
 * Lantern Letter design: an Android-first, contemporary analog love letter.
 * Use ink-navy, paper-ivory, Lantern Mulberry accents, and a calm live-reveal pace.
 */
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, RotateCcw, SkipForward } from "lucide-react";

const sealPath = "/assets/batool-brand-mark.png";

function Seal({ className = "", alt = "Heart and wildflower seal" }: { className?: string; alt?: string }) {
  return <img className={`brand-seal ${className}`} src={sealPath} alt={alt} />;
}

const letterLines = [
  "// A birthday letter for Batool",
  "",
  "I met you in a random voice chat —",
  "just looking for someone to talk to.",
  "",
  "The admins muted me, and somehow",
  "you were the one familiar person there.",
  "",
  "I asked for friendship, quietly hoping",
  "you would not say no. You didn't.",
  "",
  "Then conversations became comfort,",
  "comfort became feelings,",
  "and you became my girlfriend.",
  "",
  "// and that changed my everyday life."
];

const storyCards = [
  {
    index: "01",
    title: "The unexpected beginning",
    body:
      "Two months ago, I was only trying to find a person to talk to. I did not know that one small hello would become the beginning of something that means so much to me."
  },
  {
    index: "02",
    title: "The real parts, too",
    body:
      "We have had arguments and difficult moments, like every real relationship does. What I value is that we return to each other, understand more, and talk things through with care."
  },
  {
    index: "03",
    title: "What you mean to me",
    body:
      "Spending time with you feels worth it — for my time, my heart, and even my health. When I am happy, it is often because this relationship feels warm, honest, and good."
  }
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [lightSent, setLightSent] = useState(false);
  const isComplete = visibleLines >= letterLines.length;
  const visibleLetter = useMemo(
    () => letterLines.slice(0, visibleLines).join("\n"),
    [visibleLines]
  );

  useEffect(() => {
    if (!started || isComplete) return;
    const delay = letterLines[visibleLines] === "" ? 220 : 435;
    const timer = window.setTimeout(() => setVisibleLines((current) => current + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, visibleLines, isComplete]);

  const beginLetter = () => {
    setVisibleLines(0);
    setStarted(true);
  };

  const skipWriting = () => {
    setStarted(true);
    setVisibleLines(letterLines.length);
  };

  const replay = () => {
    setLightSent(false);
    setVisibleLines(0);
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="lantern-letter">
      <section className="opening" aria-labelledby="main-title">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <nav className="letter-nav" aria-label="Letter controls">
          <div className="brand-lockup" aria-label="Batool's birthday letter">
            <Seal />
            <span>for Batool</span>
          </div>
          <span className="nav-note">19 August · made with care</span>
        </nav>

        <div className="hero-split">
          <div className="hero-copy">
            <p className="eyebrow"><span /> A private birthday letter</p>
            <h1 id="main-title">One unexpected <em>hello</em>, and then you.</h1>
            <p className="hero-intro">
              A small story about the random voice chat where I found a friend, then a girlfriend, and now someone who makes ordinary days feel different.
            </p>
            {!started ? (
              <button className="primary-button" onClick={beginLetter}>
                <Seal alt="" /> Open your letter
              </button>
            ) : (
              <div className="letter-actions" aria-label="Writing controls">
                {!isComplete && (
                  <button className="quiet-button" onClick={skipWriting}>
                    <SkipForward aria-hidden="true" /> Read it all now
                  </button>
                )}
                {isComplete && (
                  <button className="quiet-button" onClick={replay}>
                    <RotateCcw aria-hidden="true" /> Replay the moment
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="hero-visual" aria-label="A night garden birthday scene">
            <div className="hero-image" />
            <div className="visual-tint" />
            <div className="portrait-frame">
              <img src="/assets/batool-portrait.png" alt="Batool" />
              <div className="portrait-caption">
                <span>today, we celebrate</span>
                <strong>Batool</strong>
              </div>
            </div>
            <div className="little-star star-one">✦</div>
            <div className="little-star star-two">✦</div>
            <div className="little-star star-three">✦</div>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>keep this close</span><ChevronDown />
        </div>
      </section>

      <section className="written-scene" aria-labelledby="written-title">
        <div className="scene-header">
          <p className="eyebrow"><span /> Live from my heart</p>
          <h2 id="written-title">I wanted to say it <em>properly.</em></h2>
        </div>
        <div className="letter-desk">
          <div className="desk-code" aria-live="polite" aria-label="Birthday letter being written">
            <div className="desk-topline">
              <Seal className="tiny-seal" alt="" />
              <span>batool-birthday.note</span>
              <span className="code-state">{isComplete ? "letter sealed" : started ? "ink drying…" : "waiting to begin"}</span>
            </div>
            <span className="pressed-petal petal-a" aria-hidden="true" />
            <span className="pressed-petal petal-b" aria-hidden="true" />
            <pre>{visibleLetter || "Press ‘Open your letter’ to begin."}<span className={started && !isComplete ? "cursor" : ""}>|</span></pre>
            <div className="code-footnote">Every line is true. Every word is yours.</div>
          </div>
          <div className="desk-ephemera">
            <img src="/assets/batool-polaroid-table.jpg" alt="A birthday letter, rose petal, and candle" />
            <p>“The best surprises are the people who make us feel less alone.”</p>
            <div className="wax-seal"><Seal alt="" /></div>
          </div>
        </div>
      </section>

      <section className="story-section" aria-labelledby="story-title">
        <div className="section-seal"><Seal alt="" /></div>
        <div className="story-heading">
          <p className="eyebrow"><span /> The little things that mattered</p>
          <h2 id="story-title">This is what I have been trying to tell you.</h2>
        </div>
        <div className="story-thread">
          {storyCards.map((card) => (
            <article className="memory-card" key={card.index}>
              <div className="memory-index">{card.index}</div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="birthday-wish" aria-labelledby="wish-title">
        <div className="wish-art" aria-hidden="true" />
        <div className="wish-card">
          <Seal className="wish-mark" alt="" />
          <p className="eyebrow"><span /> For your birthday</p>
          <h2 id="wish-title">Happy birthday, beautiful.</h2>
          <p>
            I wish I could hand you something beautiful in person today. Being far away hurts, but it does not change how much I want to make you smile. I will keep choosing the little things that make your days lighter, because you deserve that — today and every day after.
          </p>
          <p>
            Thank you for being born into this world, for becoming part of my daily life, and for making a random moment feel like the start of something worth protecting.
          </p>
          <button className={`wish-button ${lightSent ? "is-sent" : ""}`} onClick={() => setLightSent((current) => !current)}>
            <Seal alt="" /> {lightSent ? "A birthday light, from me to you" : "Send a birthday light"}
          </button>
          <div className="sign-off">
            <span>always yours,</span>
            <strong>Your love, Arman</strong>
          </div>
        </div>
      </section>

      <footer className="letter-footer">
        <span>Made as a small place to keep a big feeling.</span>
        <Seal alt="" />
      </footer>
    </main>
  );
}
