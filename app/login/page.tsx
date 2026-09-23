"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [message,setMessage]=useState("");
  function submit(e:FormEvent){e.preventDefault(); if(!email.includes("@")){setMessage("Enter a valid email.");return;} localStorage.setItem("abp-user",JSON.stringify({email})); router.push("/dashboard");}
  return <main className="authPage"><a className="authBrand" href="/">A/B<span>·</span>P</a><section className="authCard"><span className="sectionNumber">WORKSPACE ACCESS</span><h1>Welcome back.</h1><p>Enter your email to open your workspace.</p><form onSubmit={submit}><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@company.com" required/><button className="authButton">Enter workspace <span>→</span></button></form>{message&&<div className="authError">{message}</div>}<small>Demo access is stored locally for now. Production authentication will use Supabase Auth.</small></section></main>;
}