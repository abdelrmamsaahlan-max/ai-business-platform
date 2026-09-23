"use client";

import { useEffect, useMemo, useState } from "react";

type Project = { id: number; name: string; status: "Active" | "Draft"; updated: string };
type Automation = { id: number; name: string; trigger: string; action: string; enabled: boolean };

const seedProjects: Project[] = [
  { id: 1, name: "Launch campaign", status: "Active", updated: "Just now" },
  { id: 2, name: "Customer follow-up", status: "Draft", updated: "Today" },
];

const seedAutomations: Automation[] = [
  { id: 1, name: "New lead → follow-up", trigger: "New lead", action: "Create follow-up", enabled: true },
  { id: 2, name: "Weekly content plan", trigger: "Every Monday", action: "Generate content brief", enabled: false },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [idea, setIdea] = useState("");
  const [tone, setTone] = useState("Clear");
  const [generated, setGenerated] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("abp-projects") || JSON.stringify(seedProjects)));
    setAutomations(JSON.parse(localStorage.getItem("abp-automations") || JSON.stringify(seedAutomations)));
  }, []);

  const active = automations.filter(a => a.enabled).length;
  const completed = useMemo(() => projects.filter(p => p.status === "Active").length, [projects]);

  function saveProjects(next: Project[]) {
    setProjects(next);
    localStorage.setItem("abp-projects", JSON.stringify(next));
  }

  function toggleAutomation(id: number) {
    const next = automations.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a);
    setAutomations(next);
    localStorage.setItem("abp-automations", JSON.stringify(next));
  }

  function addProject() {
    const name = window.prompt("Project name");
    if (!name?.trim()) return;
    saveProjects([{ id: Date.now(), name: name.trim(), status: "Active", updated: "Just now" }, ...projects]);
    setNotice("Project created.");
  }

  function generateContent() {
    if (!idea.trim()) return;
    const opening = tone === "Bold"
      ? "Make the next move count."
      : tone === "Friendly"
        ? "Here’s a simple way to move forward."
        : "A practical next step for your business.";
    setGenerated(opening + "\n\nTopic: " + idea.trim() + "\n\nCreate a focused message around the customer problem, explain the value in plain language, and finish with one clear next action.");
    setNotice("Draft generated locally. Connect an AI provider later for model-powered generation.");
  }

  return (
    <main className="appShell">
      <aside className="sidebar">
        <a className="wordmark" href="/">A/B<span>·</span>P</a>
        <div className="sideLabel">WORKSPACE</div>
        <a className="sideItem active" href="/dashboard">Overview</a>
        <a className="sideItem" href="#studio">Content Studio</a>
        <a className="sideItem" href="#automations">Automations</a>
        <a className="sideItem" href="#projects">Projects</a>
        <div className="sideBottom"><span>Local workspace</span><small>AI provider not connected</small></div>
      </aside>

      <section className="dashboard">
        <header className="dashHeader">
          <div><span className="sectionNumber">WORKSPACE / OVERVIEW</span><h1>Good morning.</h1><p>Here’s what is happening inside your workspace.</p></div>
          <button className="primaryButton" onClick={addProject}>+ New project</button>
        </header>

        {notice && <div className="notice">{notice}<button onClick={() => setNotice("")}>×</button></div>}

        <div className="metrics">
          <div><span>ACTIVE PROJECTS</span><b>{completed}</b><small>Ready to work</small></div>
          <div><span>AUTOMATIONS</span><b>{active}</b><small>Currently running</small></div>
          <div><span>USAGE</span><b>Local</b><small>Connect AI to unlock usage</small></div>
        </div>

        <section id="studio" className="workspaceCard">
          <div className="cardHeading"><div><span className="sectionNumber">01 / CONTENT STUDIO</span><h2>Turn an idea into a usable draft.</h2></div><span className="liveBadge">READY</span></div>
          <div className="studioGrid">
            <div><label>What are you working on?</label><textarea value={idea} onChange={e => setIdea(e.target.value)} placeholder="Example: launch a new service for small online stores..." /></div>
            <div><label>Tone</label><select value={tone} onChange={e => setTone(e.target.value)}><option>Clear</option><option>Friendly</option><option>Bold</option></select><button className="primaryButton full" onClick={generateContent}>Generate draft →</button></div>
          </div>
          {generated && <div className="output"><span>GENERATED DRAFT</span><p>{generated}</p><button className="outlineButton" onClick={() => navigator.clipboard?.writeText(generated)}>Copy draft</button></div>}
        </section>

        <section id="automations" className="workspaceCard">
          <div className="cardHeading"><div><span className="sectionNumber">02 / AUTOMATIONS</span><h2>Simple workflows that persist.</h2></div></div>
          <div className="automationList">{automations.map(a => <div className="automation" key={a.id}><div><b>{a.name}</b><small>{a.trigger} <span>→</span> {a.action}</small></div><button className={a.enabled ? "switch on" : "switch"} onClick={() => toggleAutomation(a.id)} aria-label={a.enabled ? "Disable automation" : "Enable automation"}><i /></button></div>)}</div>
        </section>

        <section id="projects" className="workspaceCard">
          <div className="cardHeading"><div><span className="sectionNumber">03 / PROJECTS</span><h2>Work, without the clutter.</h2></div></div>
          <div className="projectList">{projects.map(p => <div className="project" key={p.id}><span className={p.status === "Active" ? "projectDot activeDot" : "projectDot"} /><div><b>{p.name}</b><small>{p.status} · {p.updated}</small></div></div>)}</div>
        </section>
      </section>
    </main>
  );
}