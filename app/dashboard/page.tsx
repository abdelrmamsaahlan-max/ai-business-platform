"use client";

import { useEffect, useMemo, useState } from "react";

type Project={id:number;name:string;status:"Active"|"Draft"|"Paused";updated:string};
type Automation={id:number;name:string;trigger:string;action:string;enabled:boolean};
type Task={id:number;title:string;priority:"High"|"Medium"|"Low";done:boolean};
type Contact={id:number;name:string;company:string;stage:"Lead"|"Customer"|"Follow-up"};

const seedProjects:Project[]=[
{id:1,name:"Launch campaign",status:"Active",updated:"Just now"},
{id:2,name:"Customer follow-up",status:"Draft",updated:"Today"},
{id:3,name:"Q4 growth plan",status:"Active",updated:"Yesterday"}];
const seedAutomations:Automation[]=[
{id:1,name:"New lead → follow-up",trigger:"New lead",action:"Create follow-up",enabled:true},
{id:2,name:"Weekly content plan",trigger:"Every Monday",action:"Generate content brief",enabled:false},
{id:3,name:"Project status digest",trigger:"Every Friday",action:"Prepare weekly summary",enabled:true}];
const seedTasks:Task[]=[
{id:1,title:"Review launch copy",priority:"High",done:false},
{id:2,title:"Prepare customer FAQ",priority:"Medium",done:false},
{id:3,title:"Check weekly metrics",priority:"Low",done:true}];
const seedContacts:Contact[]=[
{id:1,name:"Maya Chen",company:"Northstar",stage:"Lead"},
{id:2,name:"Omar Studio",company:"Omar Studio",stage:"Customer"},
{id:3,name:"Pixel House",company:"Pixel House",stage:"Follow-up"}];

export default function Dashboard(){
 const [tab,setTab]=useState("Overview");
 const [projects,setProjects]=useState<Project[]>([]);
 const [automations,setAutomations]=useState<Automation[]>([]);
 const [tasks,setTasks]=useState<Task[]>([]);
 const [contacts,setContacts]=useState<Contact[]>([]);
 const [idea,setIdea]=useState("");
 const [tone,setTone]=useState("Clear");
 const [generated,setGenerated]=useState("");
 const [query,setQuery]=useState("");
 const [notice,setNotice]=useState("");
 const [showCommand,setShowCommand]=useState(false);

 useEffect(()=>{
  const load=(key:string,fallback:any)=>JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));
  setProjects(load("abp-projects",seedProjects));setAutomations(load("abp-automations",seedAutomations));
  setTasks(load("abp-tasks",seedTasks));setContacts(load("abp-contacts",seedContacts));
 },[]);
 const active=automations.filter(a=>a.enabled).length;
 const done=tasks.filter(t=>t.done).length;
 const visibleProjects=useMemo(()=>projects.filter(p=>p.name.toLowerCase().includes(query.toLowerCase())),[projects,query]);
 const visibleContacts=useMemo(()=>contacts.filter(c=>(c.name+" "+c.company).toLowerCase().includes(query.toLowerCase())),[contacts,query]);

 function save(key:string,value:any){localStorage.setItem(key,JSON.stringify(value));}
 function addProject(){const name=window.prompt("Project name");if(!name?.trim())return;const next=[{id:Date.now(),name:name.trim(),status:"Active" as const,updated:"Just now"},...projects];setProjects(next);save("abp-projects",next);setNotice("Project created.");}
 function toggleAutomation(id:number){const next=automations.map(a=>a.id===id?{...a,enabled:!a.enabled}:a);setAutomations(next);save("abp-automations",next);}
 function toggleTask(id:number){const next=tasks.map(t=>t.id===id?{...t,done:!t.done}:t);setTasks(next);save("abp-tasks",next);}
 function addTask(){const title=window.prompt("Task title");if(!title?.trim())return;const next=[...tasks,{id:Date.now(),title:title.trim(),priority:"Medium" as const,done:false}];setTasks(next);save("abp-tasks",next);}
 function addContact(){const name=window.prompt("Contact name");if(!name?.trim())return;const next=[...contacts,{id:Date.now(),name:name.trim(),company:"New contact",stage:"Lead" as const}];setContacts(next);save("abp-contacts",next);setNotice("Contact added.");}
 function generateContent(){
  if(!idea.trim()){setNotice("Add an idea first.");return}
  const opener=tone==="Bold"?"Make the next move count.":tone==="Friendly"?"Here’s a simple way to move forward.":"A practical next step for your business.";
  setGenerated(opener+"\n\nTopic: "+idea.trim()+"\n\nBuild a concise message around the customer problem, explain the value in plain language, add one proof point, and finish with one clear next action.");
  setNotice("Draft created. The backend can connect this editor to a real AI model next.");
 }
 function exportWorkspace(){const data={projects,automations,tasks,contacts,exportedAt:new Date().toISOString()};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="abp-workspace.json";a.click();URL.revokeObjectURL(url);setNotice("Workspace export downloaded.");}
 const nav=["Overview","Content Studio","Automations","Projects","Tasks","Contacts","Analytics"];
 return <main className="appShell">
  <aside className="sidebar">
   <a className="wordmark" href="/">A/B<span>·</span>P</a><div className="sideLabel">WORKSPACE</div>
   {nav.map(n=><button key={n} className={"sideItem "+(tab===n?"active":"")} onClick={()=>setTab(n)}>{n}</button>)}
   <div className="sideBottom"><span>Local workspace</span><small>Secure foundation · AI ready</small></div>
  </aside>
  <section className="dashboard">
   <header className="dashHeader">
    <div><span className="sectionNumber">WORKSPACE / {tab.toUpperCase()}</span><h1>{tab==="Overview"?"Good morning.":tab}</h1><p>One place to plan, create, automate and understand your business.</p></div>
    <div className="headerActions"><button className="iconButton" onClick={()=>setShowCommand(true)}>⌘ Search</button><button className="primaryButton" onClick={addProject}>+ New project</button></div>
   </header>
   {notice&&<div className="notice">{notice}<button onClick={()=>setNotice("")}>×</button></div>}
   <div className="metrics">
    <div><span>ACTIVE PROJECTS</span><b>{projects.filter(p=>p.status==="Active").length}</b><small>Across your workspace</small></div>
    <div><span>AUTOMATIONS</span><b>{active}</b><small>Running workflows</small></div>
    <div><span>TASK PROGRESS</span><b>{done}/{tasks.length}</b><small>Tasks completed</small></div>
    <div><span>CONTACTS</span><b>{contacts.length}</b><small>Leads + customers</small></div>
   </div>

   {tab==="Overview"&&<><section className="overviewGrid">
    <div className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / MOMENTUM</span><h2>Business pulse</h2></div><span className="liveBadge">LIVE</span></div><div className="pulseBars">{[42,67,54,78,61,88,74,92,81,96,86,100].map((h,i)=><i key={i} style={{height:h+"%"}}/>)}</div><div className="pulseLegend"><span>12 weeks</span><b>+24% activity</b></div></div>
    <div className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">02 / NEXT</span><h2>What needs attention</h2></div></div><div className="miniList"><div><b>{tasks.filter(t=>!t.done).length} open tasks</b><small>Keep the queue moving</small></div><div><b>{automations.filter(a=>a.enabled).length} automations active</b><small>Work running in the background</small></div><div><b>{contacts.filter(c=>c.stage==="Lead").length} leads</b><small>Potential opportunities</small></div></div></div>
   </section><section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">03 / QUICK ACTIONS</span><h2>Move faster.</h2></div></div><div className="quickGrid"><button onClick={()=>setTab("Content Studio")}>✦ Generate content<small>Turn an idea into a draft</small></button><button onClick={addTask}>＋ Add task<small>Capture the next action</small></button><button onClick={addContact}>◎ Add contact<small>Keep your pipeline organized</small></button><button onClick={exportWorkspace}>↗ Export workspace<small>Download a JSON backup</small></button></div></section></>}

   {tab==="Content Studio"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / CONTENT STUDIO</span><h2>Turn an idea into a usable draft.</h2></div><span className="liveBadge">READY</span></div><div className="studioGrid"><div><label>What are you working on?</label><textarea value={idea} onChange={e=>setIdea(e.target.value)} placeholder="Example: launch a new service for small online stores..."/></div><div><label>Tone</label><select value={tone} onChange={e=>setTone(e.target.value)}><option>Clear</option><option>Friendly</option><option>Bold</option></select><button className="primaryButton full" onClick={generateContent}>Generate draft →</button></div></div>{generated&&<div className="output"><span>GENERATED DRAFT</span><p>{generated}</p><button className="outlineButton" onClick={()=>navigator.clipboard?.writeText(generated)}>Copy draft</button></div>}</section>}

   {tab==="Automations"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / AUTOMATIONS</span><h2>Workflows that persist.</h2></div></div><div className="automationList">{automations.map(a=><div className="automation" key={a.id}><div><b>{a.name}</b><small>{a.trigger} <span>→</span> {a.action}</small></div><button className={"switch "+(a.enabled?"on":"")} onClick={()=>toggleAutomation(a.id)}><i/></button></div>)}</div></section>}

   {tab==="Projects"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / PROJECTS</span><h2>Work, without the clutter.</h2></div><button className="outlineDark" onClick={addProject}>+ Add</button></div><div className="projectList">{visibleProjects.map(p=><div className="project" key={p.id}><span className={"projectDot "+(p.status==="Active"?"activeDot":"")}/><div><b>{p.name}</b><small>{p.status} · {p.updated}</small></div><span className="rowArrow">↗</span></div>)}</div></section>}

   {tab==="Tasks"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / TASKS</span><h2>Your next actions.</h2></div><button className="outlineDark" onClick={addTask}>+ Add</button></div><div className="taskList">{tasks.map(t=><div className={"task "+(t.done?"done":"")} key={t.id}><button className="check" onClick={()=>toggleTask(t.id)}>{t.done?"✓":""}</button><div><b>{t.title}</b><small>{t.priority} priority</small></div><span className={"priority "+t.priority.toLowerCase()}>{t.priority}</span></div>)}</div></section>}

   {tab==="Contacts"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / CONTACTS</span><h2>Relationships, organized.</h2></div><button className="outlineDark" onClick={addContact}>+ Add</button></div><div className="contactList">{visibleContacts.map(c=><div className="contact" key={c.id}><div className="avatar">{c.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><div><b>{c.name}</b><small>{c.company}</small></div><span className="stage">{c.stage}</span></div>)}</div></section>}

   {tab==="Analytics"&&<section className="workspaceCard"><div className="cardHeading"><div><span className="sectionNumber">01 / ANALYTICS</span><h2>See the operating picture.</h2></div></div><div className="analyticsGrid"><div><span>PROJECTS</span><b>{projects.length}</b><small>Created in this workspace</small></div><div><span>WORKFLOWS</span><b>{automations.length}</b><small>{active} currently active</small></div><div><span>COMPLETION</span><b>{tasks.length?Math.round(done/tasks.length*100):0}%</b><small>Task completion rate</small></div><div><span>PIPELINE</span><b>{contacts.filter(c=>c.stage==="Lead").length}</b><small>Open leads</small></div></div><div className="analyticsNote">These metrics are currently calculated from your workspace data. A production analytics layer will move them to server-side persisted data.</div></section>}
  </section>
  {showCommand&&<div className="commandOverlay" onClick={()=>setShowCommand(false)}><div className="command" onClick={e=>e.stopPropagation()}><input autoFocus placeholder="Search workspace..." value={query} onChange={e=>setQuery(e.target.value)}/><div className="commandResults"><button onClick={()=>{setTab("Projects");setShowCommand(false)}}>⌕ Search projects</button><button onClick={()=>{setTab("Contacts");setShowCommand(false)}}>◎ Search contacts</button><button onClick={()=>{setTab("Tasks");setShowCommand(false)}}>✓ Open tasks</button><button onClick={()=>setShowCommand(false)}>Esc Close</button></div></div></div>}
 </main>
}