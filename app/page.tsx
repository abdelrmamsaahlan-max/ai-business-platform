const features = [
  { tag: "01", title: "Command Center", text: "See what matters, decide what to do next, and keep the whole business moving from one focused workspace." },
  { tag: "02", title: "AI Workspace", text: "Turn business context into useful drafts, answers, plans, and decisions without jumping between tools." },
  { tag: "03", title: "Workflow Engine", text: "Build repeatable automations for the work your team does again and again." },
  { tag: "04", title: "Growth Console", text: "Track activity, usage, customers, and the signals that help you improve the business." },
];

const signals = ["Less busywork", "More consistency", "One operating layer"];

export default function Home() {
  return (
    <main>
      <nav className="nav">
        <a className="wordmark" href="/">A/B<span>·</span>P</a>
        <div className="navLinks">
          <a href="#product">Product</a>
          <a href="#system">System</a>
          <a className="navCta" href="/login">Enter workspace <span>↗</span></a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow"><span className="pulseDot" /> Intelligent operations, without the clutter.</div>
          <h1>Build a business that <em>moves.</em></h1>
          <p className="heroLead">
            AI, workflows, and business intelligence brought together in one calm operating layer.
            Less switching. Less repetition. More time for the work that matters.
          </p>
          <div className="actions">
            <a className="primaryButton" href="/signup">Create your workspace <span>→</span></a>
            <a className="textButton" href="#product">See the system <span>↓</span></a>
          </div>
          <div className="signalRow">
            {signals.map((signal) => <span key={signal}>{signal}</span>)}
          </div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="orb orbOne" />
          <div className="orb orbTwo" />
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="core">
            <div className="coreMark">A/B<span>·</span>P</div>
            <div className="coreLine" />
            <small>OPERATING LAYER</small>
          </div>
          <div className="floatCard cardTop"><span>AI</span><b>Context ready</b><small>Workspace intelligence</small></div>
          <div className="floatCard cardBottom"><span>↗</span><b>12 workflows</b><small>Running quietly</small></div>
        </div>
      </section>

      <section id="product" className="section productSection">
        <div className="sectionIntro">
          <span className="sectionNumber">01 / PRODUCT</span>
          <h2>One system.<br /><em>Four powerful layers.</em></h2>
          <p>Designed around how a real business operates—not around a collection of disconnected AI features.</p>
        </div>
        <div className="featureGrid">
          {features.map((feature) => (
            <article className="featureCard" key={feature.tag}>
              <div className="featureTop"><span>{feature.tag}</span><span>↗</span></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <div className="cardLine" />
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="systemSection">
        <div className="systemGrid">
          <div>
            <span className="sectionNumber">02 / SYSTEM</span>
            <h2>Quiet on the surface.<br /><em>Serious underneath.</em></h2>
          </div>
          <div className="systemText">
            <p>Secure accounts. Isolated workspaces. Server-side authorization. Validated inputs. Protected secrets. Auditable automation.</p>
            <p>The product will grow feature by feature, while the foundation stays disciplined from day one.</p>
            <a href="#product" className="outlineButton">Explore the foundation <span>↗</span></a>
          </div>
        </div>
        <div className="ticker"><span>AI</span><span>AUTOMATION</span><span>DATA</span><span>WORKFLOWS</span><span>SECURITY</span><span>AI</span><span>AUTOMATION</span></div>
      </section>

      <footer>
        <div className="wordmark">A/B<span>·</span>P</div>
        <p>AI Business Platform · Built for focused operators.</p>
      </footer>
    </main>
  );
}