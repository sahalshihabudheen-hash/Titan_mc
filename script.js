
// Mobile menu
function toggleMenu(){ document.querySelector('.menu').classList.toggle('show') }

// Typing effect (if present)
(function(){
  const el = document.getElementById('typing');
  if(!el) return;
  const text = "Best Mallu Server 24/7";
  let i=0;
  const tick = () => {
    if(i<=text.length){ el.textContent = text.slice(0,i++); setTimeout(tick, 80) }
  };
  tick();
})();

// Join Now modal logic (present on home)
let selectedType = null;
function openJoin(){ document.getElementById('joinModal').classList.add('show') }
function closeJoin(){ document.getElementById('joinModal').classList.remove('show'); hideCopy() }
function choose(type){
  selectedType = type;
  const box = document.getElementById('copyBox');
  const code = document.getElementById('copyText');
  const badge = document.getElementById('copyBadge');
  if(type==='java'){ code.textContent = 'play.tintanmc.online'; badge.textContent='Java IP' }
  if(type==='bedrock'){ code.textContent = 'play.titanmc.online : 19132'; badge.textContent='Bedrock IP : Port' }
  box.style.display='block';
}
function hideCopy(){
  const box = document.getElementById('copyBox');
  if(box) box.style.display='none';
}
async function doCopy(){
  const code = document.getElementById('copyText').textContent;
  try{
    await navigator.clipboard.writeText(code);
    const btn = document.getElementById('copyBtn');
    const original = btn.textContent;
    btn.textContent = 'Copied ✓';
    setTimeout(()=> btn.textContent = original, 1200);
  }catch(e){ alert('Copy failed, select and copy manually.') }
}

// Particle background
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr = window.devicePixelRatio || 1;
  function resize(){
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize); resize();

  const N = 80, parts = [];
  for(let i=0;i<N;i++){
    parts.push({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-.5)*.6, vy:(Math.random()-.5)*.6, r: Math.random()*2+0.5 })
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    // draw links
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const a=parts[i], b=parts[j];
        const dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
        if(dist<120){
          const alpha = 1 - dist/120;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha*.18})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    // draw dots
    for(const p of parts){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle='rgba(155, 92, 255, .6)'; ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();
