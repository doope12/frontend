import React, { useState } from "react";
const BACKEND = "http://localhost:4001"; // CHANGE THIS TO YOUR Render backend URL after deploy
function api(path) { return fetch(`${BACKEND}/api/game/${path}`).then(r => r.json()); }
function apiProfile() { return fetch(`${BACKEND}/api/profile`).then(r => r.json()); }
const MODES = [ "battles", "cases", "upgrader", "roulette", "bomb" ];
export default function App() {
  const [profile, setProfile] = useState(null);
  const [result, setResult] = useState(null);
  React.useEffect(() => { apiProfile().then(setProfile); }, []);
  const play = mode => api(mode).then(setResult);
  return (
    <div style={{background:'#11224d',color:'#ffd700',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <h1 style={{padding:'24px 0',fontSize:32,textAlign:'center'}}>CS:GO Gambling: RuneScape Style</h1>
      {profile && (<div style={{textAlign:'center',marginBottom:'18px'}}>
        <img src={profile.avatar} alt="avatar" style={{borderRadius:8,border:'2px solid #ffd700',width:64,height:64}}/>
        <div style={{fontSize:18}}>Welcome, <b>{profile.username}</b>! Balance: 💰 {profile.balance}</div>
      </div>)}
      <div style={{display:'flex',justifyContent:'center',gap:28,flexWrap:'wrap'}}>
        {MODES.map(m => (
          <button key={m} onClick={()=>play(m)} style={{background:'#673ab7',color:'#ffd700',padding:'20px',borderRadius:18,minWidth:140,fontSize:18,border:'2px solid #ffd700',boxShadow:'0 2px 8px #222',cursor:'pointer'}}>
            {m.charAt(0).toUpperCase()+m.slice(1)}
          </button>
        ))}
      </div>
      {result && (<div style={{marginTop:32,textAlign:'center',fontSize:20}}>
        <pre style={{display:'inline-block',background:'#fff8e1',color:'#000',padding:16,borderRadius:12}}>{JSON.stringify(result,null,2)}</pre>
      </div>)}
    </div>
  );
}
