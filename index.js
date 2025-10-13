const seasonNamesHu={winter:'Tél',spring:'Tavasz',summer:'Nyár',autumn:'Ősz'};
const seasons=['winter','spring','summer','autumn']; let seasonIdx=1;
function updateSeason(s){ document.body.setAttribute('data-season', s); const b=document.getElementById('seasonBadge'); if(b) b.textContent='Évszak: '+(seasonNamesHu[s]||s); }
function cycleSeason(){ seasonIdx=(seasonIdx+1)%seasons.length; updateSeason(seasons[seasonIdx]); }

// Seasonal particles (petals, fireflies, leaves, snow)
let particleTimer=null;
function clearParticles(){ document.querySelectorAll('.particle').forEach(p=>p.remove()); if(particleTimer) {clearInterval(particleTimer); particleTimer=null;} }
function spawnSeasonalParticles(season){
  clearParticles();
  const make = (opts)=>{
    const p=document.createElement('div'); p.className='particle';
    const x=Math.random()*window.innerWidth; p.style.left=x+'px';
    let color='#fff'; let size=8; let dur=8+Math.random()*6; let sway = (Math.random()*120-60)+'px';
    if(season==='spring'){ color='#f472b6'; size=7; }
    else if(season==='summer'){ color='rgba(255,255,120,.8)'; size=5; }
    else if(season==='autumn'){ color='#f59e0b'; size=8; }
    else if(season==='winter'){ color='#ffffff'; size=6; dur=12+Math.random()*8; }
    p.style.background=color; p.style.width=size+'px'; p.style.height=size+'px';
    p.style.setProperty('--tx', sway);
    p.style.animationDuration=dur+'s';
    document.body.appendChild(p);
    setTimeout(()=>p.remove(), dur*1000+500);
  };
  // burst starter
  for(let i=0;i<20;i++) make();
  particleTimer = setInterval(()=>{ for(let i=0;i<6;i++) make(); }, 1200);
}

function applySeason(season){
  updateSeason(season);
  spawnSeasonalParticles(season);
}

document.addEventListener('DOMContentLoaded',()=>{
  applySeason(seasons[seasonIdx]);
  setInterval(()=>{ seasonIdx=(seasonIdx+1)%seasons.length; applySeason(seasons[seasonIdx]); }, 7000);
});
