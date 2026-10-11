'use client';
import { useRouter } from 'next/navigation';
export default function Nav(){const r=useRouter();return <nav className="nav"><div className="brand">Smart TCAS</div><div><a href="/dashboard">Dashboard</a><a href="/dashboard/profile">Profile</a><a href="/dashboard/scores">Scores</a><a href="/dashboard/results">Recommendations</a><button className="btn secondary" style={{marginLeft:18}} onClick={async()=>{await fetch('/api/auth/logout',{method:'POST'});r.push('/login')}}>Logout</button></div></nav>}
