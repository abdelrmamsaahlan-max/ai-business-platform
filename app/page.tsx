const features=[
  ["AI Assistant","Answer customer questions and turn conversations into useful business actions."],
  ["Content Studio","Create structured marketing content from your business context."],
  ["Automations","Connect repeatable workflows so routine work can run automatically."],
  ["Business Dashboard","Keep customers, activity, usage and important actions in one place."]
];

export default function Home(){
  return <main>
    <nav className="nav"><div className="brand">AI Business Platform</div><div className="navLinks"><a href="#features">Features</a><a href="#how">How it works</a><a className="button small" href="/login">Get started</a></div></nav>
    <section className="hero">
      <div className="badge">AI + Automation for modern businesses</div>
      <h1>Run more of your business from one intelligent workspace.</h1>
      <p>Connect your business data, AI tools and automations in one secure platform designed to reduce repetitive work.</p>
      <div className="actions"><a className="button" href="/signup">Start building</a><a className="button ghost" href="#features">Explore features</a></div>
    </section>
    <section id="features" className="section"><div className="sectionHead"><span>Core platform</span><h2>Everything starts in one place.</h2></div><div className="grid">{features.map(([title,text])=><article className="card" key={title}><div className="icon">✦</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section id="how" className="section dark"><div className="sectionHead"><span>Architecture</span><h2>Built to scale safely.</h2><p>Next.js on Vercel, Supabase for authentication and data, automation through n8n, and payments through a supported payment provider when the business is ready.</p></div><div className="steps"><div><b>01</b><span>Secure account</span></div><div><b>02</b><span>Business workspace</span></div><div><b>03</b><span>AI tools</span></div><div><b>04</b><span>Automations</span></div></div></section>
    <footer>© 2026 AI Business Platform · Built with security and responsible automation in mind.</footer>
  </main>;
}