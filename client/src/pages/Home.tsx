/**
 * Lantern Letter design: an Android-first, contemporary analog love letter.
 * Use ink-navy, paper-ivory, Lantern Mulberry accents, and a calm live-reveal pace.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, RotateCcw, SkipForward } from "lucide-react";

const sealPath = "/assets/batool-brand-mark.png";

function Seal({ className = "", alt = "Heart and wildflower seal" }: { className?: string; alt?: string }) {
  return <img className={`brand-seal ${className}`} src={sealPath} alt={alt} />;
}

const letterScript = `// Everything My heart knows.

Two months ago, I entered a random voice chat with no big plan — I only wanted a bit of random conversation. Then the admins muted me, and honestly, it pissed me off. While I was looking around, I heard a familiar voice — yours.

I came to you as a friend, hoping you might let me stay. I did not know that one small hello would become late conversations and then something I never expected to find there: you becoming my girlfriend.

Somewhere between our talks, you became the person I look for first. You made ordinary hours feel warmer. You made me care about the small things again — a notification, a chance to tell you about my day.

We have had fights and misunderstandings too, because what we have is real. But I do not measure us by the hard moments. I measure us by how we come back, how we try to understand, and how we choose to speak gently again after the noise is over. That means more to me than a perfect story ever could.

Being with you has given my days a softer place to land. When I am happy, you are often part of that happiness. When life feels heavy, your presence can make it feel a little easier to carry. I am grateful for every moment we have shared, even the messy ones, because they are ours.

So today is your birthday — the day this world was given you. I am grateful for your smile, your heart, your patience, and your beautiful way of becoming part of my everyday life.

I wish I could be there to hold your hand, bring you something beautiful, and watch you make a wish. Distance makes that impossible today, but it will never make me stop wanting to make you feel loved. I will keep trying, in every way I can, because seeing you happy matters to me.

Happy birthday, Batool. Thank you for being born. Thank you for saying yes to that first friendship. Thank you for becoming you, and for letting me be close to your world.

// written with all my love.
// Your love, Arman`;

const writingLogs = [
  { at: 0, label: "opening the letter", detail: "finding the beginning" },
  { at: 0.12, label: "remembering the first hello", detail: "random voice chat · two months ago" },
  { at: 0.31, label: "keeping the honest parts", detail: "arguments · understanding · return" },
  { at: 0.54, label: "writing what you mean to me", detail: "the little happinesses" },
  { at: 0.76, label: "making a birthday wish", detail: "today is Batool's birthday" },
  { at: 0.96, label: "sealing the letter", detail: "signed with love · Arman" }
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
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [lightSent, setLightSent] = useState(false);
  const letterRef = useRef<HTMLPreElement>(null);
  const writtenSceneRef = useRef<HTMLElement>(null);
  const isComplete = typedCharacters >= letterScript.length;
  const visibleLetter = useMemo(() => letterScript.slice(0, typedCharacters), [typedCharacters]);
  const progress = typedCharacters / letterScript.length;
  const activeLog = [...writingLogs].reverse().find((log) => progress >= log.at) ?? writingLogs[0];

  useEffect(() => {
    if (!started || isComplete) return;
    const nextCharacter = letterScript[typedCharacters];
    const delay = nextCharacter === "\n" ? 280 : /[.!?—]/.test(nextCharacter) ? 150 : /[,;:]/.test(nextCharacter) ? 78 : 27;
    const timer = window.setTimeout(() => setTypedCharacters((current) => current + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, typedCharacters, isComplete]);

  useEffect(() => {
    if (letterRef.current) {
      const letterPanel = letterRef.current;
      window.requestAnimationFrame(() => {
        letterPanel.scrollTop = letterPanel.scrollHeight;
      });
    }
  }, [visibleLetter]);

  const moveToLetter = () => {
    window.setTimeout(() => {
      writtenSceneRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const beginLetter = () => {
    setTypedCharacters(0);
    setStarted(true);
    moveToLetter();
  };

  const skipWriting = () => {
    setStarted(true);
    setTypedCharacters(letterScript.length);
  };

  const replay = () => {
    setLightSent(false);
    setTypedCharacters(0);
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
            <h1 id="main-title">Today is <em>Batool's birthday.</em></h1>
            <p className="hero-intro">
              The birthday of the girl who turned one unexpected hello into a place I want to come back to, every day.
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
                <span>today is</span>
                <strong>My girl's birthday</strong>
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

      <section className="written-scene" ref={writtenSceneRef} tabIndex={-1} aria-labelledby="written-title">
        <div className="scene-header">
          <p className="eyebrow"><span /> Written while you watch</p>
          <h2 id="written-title">Watch this letter become <em>yours.</em></h2>
        </div>
        <div className="letter-desk">
          <div className="desk-code" aria-live="polite" aria-label="Birthday letter being written">
            <div className="desk-topline">
              <Seal className="tiny-seal" alt="" />
              <span>batool-birthday.letter</span>
              <span className="code-state">{isComplete ? "letter sealed" : started ? `${Math.round(progress * 100)}% written` : "waiting to begin"}</span>
            </div>
            <span className="pressed-petal petal-a" aria-hidden="true" />
            <span className="pressed-petal petal-b" aria-hidden="true" />
            <pre ref={letterRef}>{visibleLetter || "Press ‘Open your letter’ to begin."}<span className={started && !isComplete ? "cursor" : ""}>|</span></pre>
            <div className="code-footnote">{started ? activeLog.detail : "Every line is true. Every word is yours."}</div>
          </div>
          <div className="desk-ephemera">
            <img src="/assets/batool-polaroid-table.jpg" alt="A birthday letter, rose petal, and candle" />
            <p>“The best surprises are the people who make us feel less alone.”</p>
            <div className="wax-seal"><Seal alt="" /></div>
          </div>
        </div>
        <div className="writing-report" aria-live="polite" aria-label="Love letter creation report">
          <div className="report-heading"><Seal className="tiny-seal" alt="" /><span>letter creation report</span><strong>{started ? `${Math.round(progress * 100)}%` : "ready"}</strong></div>
          <p className="report-active"><span className="report-pulse" /> {activeLog.label}</p>
          <div className="report-track">
            {writingLogs.map((log) => (
              <span className={progress >= log.at ? "is-done" : ""} key={log.label} title={log.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="story-section" aria-labelledby="story-title">
        <div className="section-seal"><Seal alt="" /></div>
        <div className="story-heading">
          <p className="eyebrow"><span /> The little things that mattered</p>
          <h2 id="story-title">This is what I have in my heart.</h2>
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
