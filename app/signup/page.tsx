"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router=useRouter(); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [message,setMessage]=useState("");
  function submit(e:FormEvent){e.preventDefault(); if(name.trim().length<2||!email.includes("@")){setMessage("Add your name and a valid email.");return;} localStorage.setItem("abp-user",JSON.stringify({name:name.trim(),email})); router.push("/dashboard");}
  return <main className="authPage"><a className="authBrand" href="/">A/B<span>·</span>P</a><section className="authCard"><span className="sectionNumber">NEW WORKSPACE</span><h1>Start with clarity.</h1><p>Create a workspace and explore the operating layer.</p><form onSubmit={submit}><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required/><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@company.com" required/><button className="authButton">Create workspace <span>→</span></button></form>{message&&<div className="authError">{message}</div>}<small>Demo access is local until Supabase credentials are connected.</small></section></main>;
}