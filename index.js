function playSnd(id){ const el=document.getElementById(id); if(!el) return; el.currentTime=0; el.play().catch(()=>{}); }
function attachButtonSounds(){ document.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>playSnd('clickSnd'))); }
function confettiBurst(count=150){
  for(let i=0;i<count;i++){
    const c=document.createElement('div'); c.className='confetti';
    const hue=Math.floor(Math.random()*360); c.style.background=`hsl(${hue} 90% 55%)`;
    const startX=Math.random()*100; const drift=(Math.random()*200-100)+'vw'; const dur=(Math.random()*1.5+1.8)+'s';
    c.style.left=startX+'vw'; c.style.animationDuration=dur; c.style.setProperty('--x',drift);
    document.body.appendChild(c); setTimeout(()=>c.remove(),3000);
  }
}
function showSadFace(message='Sajnos ez most nem sikerült 😞'){
  const ov=document.createElement('div'); ov.className='overlay';
  ov.innerHTML=`<div class="modal"><div class="face">😞</div><div>${message}</div><button class="btn close-btn">Bezárás</button></div>`;
  document.body.appendChild(ov);
  ov.querySelector('.close-btn').addEventListener('click',()=>ov.remove());
  ov.addEventListener('click',(e)=>{ if(e.target===ov) ov.remove(); });
}
document.addEventListener('DOMContentLoaded',()=>{
  attachButtonSounds();
  const audios=document.createElement('div'); audios.innerHTML=`
    <audio id="clickSnd" src="music/click.wav" preload="auto"></audio>
    <audio id="successSnd" src="music/success.wav" preload="auto"></audio>
    <audio id="failSnd" src="music/fail.wav" preload="auto"></audio>`;
  document.body.appendChild(audios);
  const quizForm=document.getElementById('quizForm');
  if(quizForm){
    quizForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      const answers={q1:'b',q2:'a',q3:'b',q4:'b',q5:'b',q6:'a',q7:'a',q8:'b',q9:'b',q10:'a'};
      let score=0;
      Object.keys(answers).forEach(k=>{ const c=quizForm.querySelector(`input[name="${k}"]:checked`); if(c && c.value===answers[k]) score++; });
      const res=document.getElementById('result');
      res.textContent=`Eredmény: ${score}/10 pont`;
      if(score>=7){ res.textContent+=' – Szép munka!'; playSnd('successSnd'); confettiBurst(180); }
      else{ res.textContent+=' – Próbáld meg újra!'; playSnd('failSnd'); showSadFace('Kevés lett a pont. Nézd át a klippeket és próbáld újra!'); }
    });
  }
});