import { useState, useEffect, useRef, useCallback } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Inter',sans-serif;background:#fff;overflow-x:hidden;font-size:17px}

  @keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
  @keyframes float2{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-12px) rotate(5deg)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  @keyframes slideIn{from{transform:translateX(-30px);opacity:0}to{transform:translateX(0);opacity:1}}
  @keyframes dropIn{from{transform:translateY(-20px) scale(0.9);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
  @keyframes ripple{0%{transform:scale(0);opacity:1}100%{transform:scale(4);opacity:0}}
  @keyframes milkPour{0%{height:0;opacity:0}100%{height:60px;opacity:1}}
  @keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes wobble{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,0.3)}50%{box-shadow:0 0 0 16px rgba(22,163,74,0)}}
  @keyframes particleDrift{0%{transform:translateY(0) translateX(0) scale(1);opacity:1}100%{transform:translateY(-120px) translateX(var(--dx)) scale(0);opacity:0}}
  @keyframes heroText{0%{opacity:0;transform:translateY(60px) skewY(3deg)}100%{opacity:1;transform:translateY(0) skewY(0)}}
  @keyframes borderDance{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
  @keyframes tagFloat{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-6px) rotate(2deg)}}
  @keyframes revealLine{from{width:0}to{width:100%}}

  .reveal{opacity:0;transform:translateY(50px);transition:opacity 0.7s ease,transform 0.7s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .reveal-left{opacity:0;transform:translateX(-50px);transition:opacity 0.7s ease,transform 0.7s ease}
  .reveal-left.visible{opacity:1;transform:translateX(0)}
  .reveal-right{opacity:0;transform:translateX(50px);transition:opacity 0.7s ease,transform 0.7s ease}
  .reveal-right.visible{opacity:1;transform:translateX(0)}
  .reveal-scale{opacity:0;transform:scale(0.85);transition:opacity 0.6s ease,transform 0.6s ease}
  .reveal-scale.visible{opacity:1;transform:scale(1)}

  .nav-link{position:relative;padding:7px 14px;border:none;background:transparent;font-size:15px;font-weight:600;cursor:pointer;color:#374151;border-radius:8px;transition:color 0.2s,background 0.2s;letter-spacing:0.2px}
  .nav-link::after{content:'';position:absolute;bottom:2px;left:50%;width:0;height:2px;background:#16A34A;border-radius:2px;transform:translateX(-50%);transition:width 0.3s ease}
  .nav-link:hover{color:#16A34A;background:#F0FDF4}
  .nav-link:hover::after{width:60%}
  .nav-link.active{color:#16A34A;background:#F0FDF4}
  .nav-link.active::after{width:60%}

  .product-card{position:relative;border:1.5px solid #E5E7EB;border-radius:16px;padding:1.4rem;background:#fff;transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.35s ease,border-color 0.3s;cursor:pointer;overflow:hidden}
  .product-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(22,163,74,0.06),rgba(134,239,172,0.04));opacity:0;transition:opacity 0.3s}
  .product-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 40px rgba(22,163,74,0.15),0 4px 12px rgba(0,0,0,0.08);border-color:#86EFAC}
  .product-card:hover::before{opacity:1}
  .product-emoji{font-size:56px;display:block;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1)}
  .product-card:hover .product-emoji{transform:scale(1.3) rotate(-5deg)}

  .review-card{background:#fff;border:1.5px solid #E5E7EB;border-radius:16px;padding:1.25rem;transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s}
  .review-card:hover{transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,0.08);border-color:#86EFAC}

  .btn-primary{background:#16A34A;color:#fff;border:none;border-radius:10px;padding:13px 28px;font-size:15px;font-weight:700;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s,background 0.2s;position:relative;overflow:hidden;letter-spacing:0.3px}
  .btn-primary:hover{background:#15803D;transform:translateY(-2px);box-shadow:0 8px 24px rgba(22,163,74,0.4)}
  .btn-primary:active{transform:scale(0.97)}
  .btn-primary::after{content:'';position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,0.3) 0%,transparent 70%);opacity:0;transition:opacity 0.3s}
  .btn-primary:hover::after{opacity:1}

  .btn-outline{background:transparent;color:#16A34A;border:2px solid #16A34A;border-radius:10px;padding:11px 28px;font-size:15px;font-weight:700;cursor:pointer;transition:all 0.25s;text-decoration:none;display:inline-block}
  .btn-outline:hover{background:#16A34A;color:#fff;transform:translateY(-2px);box-shadow:0 8px 24px rgba(22,163,74,0.3)}

  .stat-card{background:#fff;border:1.5px solid #D1FAE5;border-radius:16px;padding:1.5rem;text-align:center;transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s}
  .stat-card:hover{transform:translateY(-6px) scale(1.04);box-shadow:0 16px 36px rgba(22,163,74,0.12)}

  .tag-badge{display:inline-block;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;background:#D1FAE5;color:#065F46;letter-spacing:0.5px;animation:tagFloat 2.5s ease-in-out infinite}

  .filter-btn{border:1.5px solid #E5E7EB;background:#fff;border-radius:20px;padding:7px 18px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.25s;color:#374151}
  .filter-btn:hover,.filter-btn.active{background:#16A34A;color:#fff;border-color:#16A34A;transform:scale(1.05)}

  .hero-bg-circle{position:absolute;border-radius:50%;animation:borderDance 8s ease-in-out infinite,float 6s ease-in-out infinite}

  .marquee-track{display:flex;animation:marquee 20s linear infinite;width:max-content}
  .marquee-track:hover{animation-play-state:paused}

  .hours-bar{background:#BBF7D0;border-radius:4px 4px 0 0;transition:height 0.6s cubic-bezier(0.34,1.56,0.64,1),background 0.3s;cursor:pointer}
  .hours-bar:hover{background:#16A34A;transform:scaleY(1.05);transform-origin:bottom}

  .input-field{width:100%;padding:11px 14px;border:1.5px solid #E5E7EB;border-radius:10px;font-size:14px;font-family:'Inter',sans-serif;outline:none;transition:border-color 0.2s,box-shadow 0.2s;background:#fff}
  .input-field:focus{border-color:#16A34A;box-shadow:0 0 0 3px rgba(22,163,74,0.12)}

  .particle{position:absolute;pointer-events:none;font-size:20px;animation:particleDrift 2s ease-out forwards}

  .open-badge{display:inline-flex;align-items:center;gap:6px;background:#DCFCE7;color:#15803D;border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700}
  .open-dot{width:7px;height:7px;border-radius:50%;background:#16A34A;animation:pulse 1.5s ease-in-out infinite}

  .section-eyebrow{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#16A34A;margin-bottom:10px}
  .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;color:#14532D;line-height:1.15}

  .milk-drop{position:absolute;width:6px;border-radius:3px;background:rgba(255,255,255,0.6);animation:milkPour 0.8s ease-out forwards}
  
  footer{background:linear-gradient(135deg,#14532D 0%,#166534 50%,#15803D 100%)}
`;

const PRODUCTS = [
  { id:1, name:"Fresh Milk", price:"₹28/500ml", emoji:"🥛", desc:"Farm-fresh pasteurized milk daily. Full-fat & toned variants.", tag:"Bestseller", color:"#D1FAE5" },
  { id:2, name:"Paneer", price:"₹80/200g", emoji:"🧀", desc:"Soft in-house paneer made every morning. Perfect for curries.", tag:"Popular", color:"#FEF9C3" },
  { id:3, name:"Lassi", price:"₹35/glass", emoji:"🥤", desc:"Thick, creamy lassi—sweet or salted—churned fresh daily.", tag:"", color:"#FEE2E2" },
  { id:4, name:"Shrikhand", price:"₹60/cup", emoji:"🍮", desc:"Traditional Maharashtrian strained yogurt with saffron.", tag:"", color:"#FDE68A" },
  { id:5, name:"Pure Ghee", price:"₹560/500g", emoji:"🫙", desc:"Clarified butter with rich aroma. Made from A2 milk.", tag:"Premium", color:"#FED7AA" },
  { id:6, name:"Cheese", price:"₹120/200g", emoji:"🫕", desc:"Mild fresh cheese, perfect for sandwiches and toppings.", tag:"", color:"#E0F2FE" },
  { id:7, name:"White Butter", price:"₹180/200g", emoji:"🧈", desc:"Creamy butter from fresh cream. No preservatives.", tag:"", color:"#F0FDF4" },
  { id:8, name:"Dahi", price:"₹25/200g", emoji:"🥣", desc:"Thick set curd prepared daily. Tangy & probiotic-rich.", tag:"Daily Fresh", color:"#ECFDF5" },
  { id:9, name:"Milk Buns", price:"₹15/piece", emoji:"🍞", desc:"Freshly baked soft milk buns. Best with butter or jam.", tag:"", color:"#FFF7ED" },
];

const REVIEWS = [
  { name:"Rahul M.", initial:"R", rating:5, text:"Best quality products and great service! The paneer is always super fresh and the lassi is absolutely delicious.", date:"2 weeks ago", color:"#D1FAE5" },
  { name:"Priya S.", initial:"P", rating:4, text:"Enjoy all milk products at a very reasonable price. The ghee is amazing—pure and fragrant. Highly recommend!", date:"1 month ago", color:"#FEE2E2" },
  { name:"Aarav K.", initial:"A", rating:5, text:"Been coming here 3 years. Never disappointed. The shrikhand is a personal favourite, especially in summers.", date:"3 weeks ago", color:"#E0F2FE" },
  { name:"Sneha B.", initial:"S", rating:4, text:"Very convenient location near Mashoba Chowk. Fair prices, always fresh. Staff is friendly too!", date:"2 months ago", color:"#FDE68A" },
  { name:"Vikram T.", initial:"V", rating:5, text:"Katraj Milk Parlour is a gem in Dattawadi. Paneer is incredibly soft and the staff is always helpful.", date:"1 week ago", color:"#F0FDF4" },
  { name:"Meera P.", initial:"M", rating:3, text:"Generally good products. Come early on busy mornings—they can run out of stock quickly!", date:"1 month ago", color:"#FFF7ED" },
];

const HOURS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const BUSY = { Mon:[1,2,4,3,2,1,2,3,4,3,2,1], Tue:[1,2,3,3,2,1,2,3,4,3,2,1], Wed:[1,2,4,4,3,2,2,3,4,3,2,1], Thu:[1,2,3,3,2,1,2,3,4,3,2,1], Fri:[1,2,3,4,4,3,3,4,5,4,3,2], Sat:[2,3,4,5,5,4,4,5,5,4,3,2], Sun:[2,3,4,5,5,4,4,4,4,3,2,1] };
const HOUR_LABELS = ["6am","7am","8am","9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale");
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

function useCounter(target, visible) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [visible, target]);
  return count;
}

function StarRow({ rating, size = 15 }) {
  return (
    <span style={{ display:"inline-flex", gap:2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i<=rating?"#F59E0B":"none"} stroke={i<=rating?"#F59E0B":"#D1D5DB"} strokeWidth={1.5}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </svg>
      ))}
    </span>
  );
}

function Particles({ x, y, onDone }) {
  const emojis = ["🥛","✨","💚","🌿","⭐"];
  useEffect(() => { const t = setTimeout(onDone, 2000); return () => clearTimeout(t); }, []);
  return (
    <>
      {emojis.map((e, i) => (
        <span key={i} className="particle" style={{
          left: x - 20 + i * 12, top: y - 20,
          "--dx": `${(Math.random()-0.5)*80}px`,
          animationDelay: `${i*0.1}s`,
        }}>{e}</span>
      ))}
    </>
  );
}

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (n) => {
    setActive(n);
    document.getElementById(n.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  };
  return (
    <nav style={{
      position:"sticky", top:0, zIndex:200,
      background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
      backdropFilter:"blur(12px)",
      borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
      transition:"all 0.3s",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
    }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => go("home")}>
          <span style={{ fontSize:28, animation:"wobble 3s ease-in-out infinite" }}>🥛</span>
          <div>
            <div style={{ fontWeight:800, fontSize:14, color:"#14532D", lineHeight:1.2, letterSpacing:"-0.3px" }}>Katraj Milk Dairy</div>
            <div style={{ fontSize:10, color:"#6B7280", letterSpacing:"1.2px", textTransform:"uppercase" }}>Dattawadi · Pune</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:2 }}>
          {["Home","Products","About","Reviews","Contact"].map(n => (
            <button key={n} className={`nav-link${active===n?" active":""}`} onClick={() => go(n)}>{n}</button>
          ))}
        </div>
        <a href="tel:08600255218" className="btn-primary" style={{ fontSize:13, padding:"8px 18px", animation:"glowPulse 3s ease-in-out infinite" }}>
          📞 Call Now
        </a>
      </div>
    </nav>
  );
}

function Hero({ setActive }) {
  const [particles, setParticles] = useState([]);
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setParticles(prev => [...prev, { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };
  const removeParticle = (id) => setParticles(prev => prev.filter(p => p.id !== id));

  return (
    <section id="home" style={{ position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#F0FDF4 0%,#DCFCE7 35%,#FEF9C3 70%,#fff 100%)", padding:"5rem 1.5rem 5rem" }}>
      <div className="hero-bg-circle" style={{ width:400, height:400, background:"rgba(134,239,172,0.2)", top:-100, right:-80, animationDuration:"10s,8s" }} />
      <div className="hero-bg-circle" style={{ width:250, height:250, background:"rgba(253,230,138,0.25)", bottom:-60, left:40, animationDuration:"12s,10s", animationDelay:"2s,1s" }} />
      <div className="hero-bg-circle" style={{ width:180, height:180, background:"rgba(167,243,208,0.3)", top:"30%", left:"8%", animationDuration:"9s,7s", animationDelay:"1s,3s" }} />

      <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center", position:"relative" }} onClick={handleClick}>
        {particles.map(p => <Particles key={p.id} x={p.x} y={p.y} onDone={() => removeParticle(p.id)} />)}

        <div style={{ animation:"float 4s ease-in-out infinite", fontSize:88, marginBottom:20, display:"block" }}>🥛</div>

        <div className="open-badge" style={{ margin:"0 auto 20px", animation:"dropIn 0.5s ease 0.3s both" }}>
          <span className="open-dot" />
          Open Now · Closes 11:30 PM · 4.4 ⭐ (150 Reviews)
        </div>

        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,6vw,4rem)", fontWeight:800, color:"#14532D", lineHeight:1.1, marginBottom:"1.2rem", animation:"heroText 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}>
          Pure Milk Products,<br />
          <span style={{ color:"#16A34A", position:"relative" }}>
            Delivered with Love
            <svg style={{ position:"absolute", bottom:-6, left:0, width:"100%", height:6 }} viewBox="0 0 300 6" preserveAspectRatio="none">
              <path d="M0,5 Q75,0 150,5 Q225,10 300,5" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="300" strokeDashoffset="300" style={{ animation:"revealLine 1s ease 1s both", animationFillMode:"forwards" }}>
                <animate attributeName="stroke-dashoffset" from="300" to="0" dur="1s" begin="1s" fill="freeze"/>
              </path>
            </svg>
          </span>
        </h1>

        <p style={{ fontSize:17, color:"#374151", lineHeight:1.8, maxWidth:520, margin:"0 auto 2rem", animation:"fadeUp 0.7s ease 0.5s both" }}>
          Your trusted dairy store in Dattawadi. Fresh milk, creamy lassi, pure ghee, Ice-Creams — sourced daily, served with care since years.
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", animation:"fadeUp 0.7s ease 0.7s both" }}>
          <button className="btn-primary" onClick={() => { setActive("Products"); document.getElementById("products")?.scrollIntoView({ behavior:"smooth" }); }}>
            🛒 Browse Products
          </button>
          <a href="tel:08600255218" className="btn-outline">📞 086002 55218</a>
        </div>

        <div style={{ display:"flex", gap:28, justifyContent:"center", marginTop:"3rem", flexWrap:"wrap", animation:"fadeUp 0.7s ease 0.9s both" }}>
          {[["🕕","Open Daily","6 AM – 11:30 PM"],["📍","Location","Near Mashoba Chowk"],["⭐","4.4 Stars","110+ Reviews"],["🥛","Products","9+ varieties"]].map(([ic,label,sub]) => (
            <div key={label} style={{ textAlign:"center", animation:"float 4s ease-in-out infinite", animationDelay:`${Math.random()*2}s` }}>
              <div style={{ fontSize:26 }}>{ic}</div>
              <div style={{ fontWeight:700, fontSize:13, color:"#14532D", marginTop:4 }}>{label}</div>
              <div style={{ fontSize:11, color:"#6B7280" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", overflow:"hidden", marginTop:"3.5rem", gap:0 }}>
        <div className="marquee-track">
          {[...Array(2)].map((_,i) => (
            <div key={i} style={{ display:"flex", gap:0 }}>
              {["🥛 Fresh Milk","🧀 Soft Paneer","🥤 Creamy Lassi","🍮 Shrikhand","🫙 Pure Ghee","🧈 White Butter","🥣 Set Dahi","🍞 Milk Buns","⭐ 4.4 Rating","❤️ Dattawadi's Favourite","🍨Ice-Creams","🍹Cold-Drinks"].map(item => (
                <span key={item} style={{ padding:"8px 24px", fontSize:13, fontWeight:600, color:"#15803D", background:"#DCFCE7", marginRight:8, borderRadius:20, whiteSpace:"nowrap" }}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold:0.4 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const r1 = useCounter(110, visible);
  const r2 = useCounter(9, visible);
  const r3 = useCounter(6, visible);
  const stats = [
    { val:`${r1}+`, label:"Happy Reviews", icon:"💬", color:"#D1FAE5", tc:"#065F46" },
    { val:`${r2}+`, label:"Fresh Products", icon:"🥛", color:"#FEF9C3", tc:"#713F12" },
    { val:"4.4★", label:"Google Rating", icon:"⭐", color:"#FEE2E2", tc:"#991B1B" },
    { val:`${r3}AM`, label:"Opens Every Day", icon:"🌅", color:"#E0F2FE", tc:"#0C4A6E" },
  ];
  return (
    <section ref={ref} style={{ background:"#14532D", padding:"3.5rem 1.5rem" }}>
      <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 }}>
        {stats.map((s,i) => (
          <div key={s.label} className="stat-card reveal-scale" style={{ animationDelay:`${i*0.1}s`, background:s.color }}>
            <div style={{ fontSize:36, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:800, color:s.tc, animation:visible?"countUp 0.5s ease both":"none" }}>{s.val}</div>
            <div style={{ fontSize:13, color:s.tc, opacity:0.75, fontWeight:600, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Products() {
  const [filter, setFilter] = useState("All");
  const tags = ["All","Bestseller","Popular","Premium","Daily Fresh"];
  const filtered = filter==="All" ? PRODUCTS : PRODUCTS.filter(p=>p.tag===filter);
  useScrollReveal();
  return (
    <section id="products" style={{ padding:"5rem 1.5rem", background:"#fff" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p className="section-eyebrow reveal">Our Products</p>
          <h2 className="section-title reveal">Farm-Fresh Daily Essentials</h2>
          <p className="reveal" style={{ color:"#6B7280", marginTop:10, fontSize:16 }}>All products prepared fresh daily — no preservatives, pure taste.</p>
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:28, flexWrap:"wrap" }}>
          {tags.map(t => <button key={t} className={`filter-btn${filter===t?" active":""}`} onClick={() => setFilter(t)}>{t}</button>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:20 }}>
          {filtered.map((p,i) => (
            <div key={p.id} className="product-card reveal" style={{ animationDelay:`${i*0.05}s` }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:p.color, borderRadius:"16px 16px 0 0" }} />
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                <span className="product-emoji">{p.emoji}</span>
                {p.tag && <span className="tag-badge">{p.tag}</span>}
              </div>
              <div style={{ fontWeight:800, fontSize:16, color:"#111827", marginBottom:6 }}>{p.name}</div>
              <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.65, marginBottom:14 }}>{p.desc}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontWeight:800, fontSize:20, color:"#16A34A" }}>{p.price}</span>
                <button style={{ background:"#F0FDF4", border:"none", borderRadius:8, padding:"6px 14px", fontSize:12, fontWeight:700, color:"#15803D", cursor:"pointer", transition:"all 0.2s" }}
                  onMouseEnter={e => { e.target.style.background="#16A34A"; e.target.style.color="#fff"; }}
                  onMouseLeave={e => { e.target.style.background="#F0FDF4"; e.target.style.color="#15803D"; }}>
                  Order →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  useScrollReveal();
  return (
    <section id="about" style={{ padding:"5rem 1.5rem", background:"linear-gradient(180deg,#F0FDF4,#fff)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"4rem", alignItems:"center" }}>
        <div className="reveal-left">
          <p className="section-eyebrow">About Us</p>
          <h2 className="section-title" style={{ marginBottom:"1.2rem" }}>A Trusted Name in Dattawadi</h2>
          <p style={{ color:"#374151", lineHeight:1.9, fontSize:15, marginBottom:"1rem" }}>
            Katraj Milk Dairy has been serving the residents of Dattawadi with pure, fresh dairy products for years. We work directly with trusted farms to bring you milk free of adulterants.
          </p>
          <p style={{ color:"#374151", lineHeight:1.9, fontSize:15 }}>
            From classic staples like milk, paneer and dahi to premium ghee and fresh bakery items — every product is prepared with care. Our promise: <strong style={{ color:"#14532D" }}>quality you can taste, prices that make sense.</strong>
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:"1.5rem" }}>
            {[["🥇","Quality First"],["🌿","No Preservatives"],["🚜","Farm Direct"],["⏰","Daily Fresh"]].map(([ic,label]) => (
              <div key={label} style={{
                display:"flex", alignItems:"center", gap:8, background:"#fff", border:"1.5px solid #D1FAE5", borderRadius:10, padding:"9px 16px",
                transition:"all 0.3s", cursor:"default",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="#16A34A"; e.currentTarget.style.borderColor="#16A34A"; e.currentTarget.querySelector("span").style.color="#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#D1FAE5"; e.currentTarget.querySelector("span").style.color="#14532D"; }}>
                <span style={{ fontSize:18 }}>{ic}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#14532D", transition:"color 0.3s" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal-right">
          <div style={{ position:"relative" }}>
            <div style={{ background:"#fff", borderRadius:20, padding:"1.8rem", border:"2px solid #D1FAE5", boxShadow:"0 20px 60px rgba(22,163,74,0.1)" }}>
              <div style={{ fontWeight:800, fontSize:16, color:"#14532D", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ animation:"spin 4s linear infinite", display:"inline-block" }}>⚙️</span> Store at a Glance
              </div>
              {[["⭐","Google Rating","4.4 / 5.0"],["💬","Reviews","200+ customers"],["🕕","Hours","6:00 AM – 11:30 PM"],["📞","Phone","+91 86002 55218"],["📍","Address","Shop 2, 432 Dattawadi Rd"],["🗺️","Landmark","Opp. Annapurna Mess"]].map(([ic,k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:"1px solid #F0FDF4", fontSize:14 }}>
                  <span style={{ color:"#6B7280", display:"flex", alignItems:"center", gap:6 }}><span>{ic}</span>{k}</span>
                  <span style={{ fontWeight:700, color:"#111827", textAlign:"right", maxWidth:180, fontSize:13 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ position:"absolute", top:-16, right:-16, background:"#16A34A", color:"#fff", borderRadius:"50%", width:52, height:52, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, animation:"pulse 2s ease-in-out infinite", boxShadow:"0 8px 20px rgba(22,163,74,0.4)" }}>
              🥛
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  useScrollReveal();
  return (
    <section id="reviews" style={{ padding:"5rem 1.5rem", background:"#F0FDF4" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p className="section-eyebrow reveal">Customer Reviews</p>
          <h2 className="section-title reveal">What Dattawadi Says</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {REVIEWS.map((r,i) => (
            <div key={r.name} className="review-card reveal" style={{ animationDelay:`${i*0.08}s`, borderTop:`3px solid ${r.color=="#D1FAE5"?"#16A34A":r.color=="#FEE2E2"?"#EF4444":r.color=="#E0F2FE"?"#0284C7":r.color=="#FDE68A"?"#D97706":"#16A34A"}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, color:"#14532D", flexShrink:0 }}>{r.initial}</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:14, color:"#111827" }}>{r.name}</div>
                  <StarRow rating={r.rating} size={13} />
                </div>
              </div>
              <p style={{ fontSize:13, color:"#374151", lineHeight:1.7, margin:0 }}>{r.text}</p>
              <div style={{ fontSize:11, color:"#9CA3AF", marginTop:10 }}>{r.date}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
          <a href="https://www.google.com/search?q=katraj+dairy&oq=Kataraj+&gs_lcrp=EgZjaHJvbWUqCwgDEAAYChgLGIAEMgYIABBFGDkyFwgBEC4YChgLGK8BGMcBGLEDGIAEGI4FMg4IAhAAGAoYCxixAxiABDILCAMQABgKGAsYgAQyCwgEEAAYChgLGIAEMhEIBRAuGAoYCxivARjHARiABDIRCAYQLhgKGAsYrwEYxwEYgAQyCwgHEC4YChgLGIAEMgsICBAAGAoYCxiABDILCAkQABgKGAsYgATSAQoxMDAzOWowajE1qAIIsAIB8QV3QETY7mY-Ew&sourceid=chrome&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dEszRDIzXzNKbzhoOHhMdjJYYy0xQXIwOFJDVlF3TWRYU3o2YU5GMGszRE0xREtqWHpxOHVEN1kzNEZONDVSUFBBemQtMC1XQ3F5c2lWQWZjMnpiOFVDbE5idHFGaEdpRWF0T1otZ25KYXI2RHJYS0NjEhZpM3c3YXNjRTY2Q3g0dy1sX05pWkNnGiJBRHNyOWZTdkI4S0N6UmpieGkxRDZyOUswSVdXTjBCZ2FBEgQ4MDUxGgEzKgAwADgBQAAYACCezPPzDUoCEAI" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration:"none", display:"inline-block" }}>
            Write a Review on Google ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function BusyChart() {
  const [sel, setSel] = useState("Sat");
  const data = BUSY[sel];
  const max = 5;
  return (
    <div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
        {HOURS.map(d => (
          <button key={d} className={`filter-btn${sel===d?" active":""}`} style={{ padding:"5px 11px", fontSize:12 }} onClick={() => setSel(d)}>{d}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:4, alignItems:"flex-end", height:80, paddingBottom:24 }}>
        {data.map((v,i) => (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2, position:"relative" }}>
            <div className="hours-bar" style={{ width:"100%", height:`${(v/max)*60}px`, background:v>=4?"#16A34A":v>=3?"#4ADE80":"#BBF7D0", minHeight:4 }} title={HOUR_LABELS[i]} />
            <span style={{ position:"absolute", bottom:0, fontSize:8, color:"#9CA3AF", transform:"rotate(-45deg)", transformOrigin:"top center", whiteSpace:"nowrap", marginTop:2 }}>{HOUR_LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:"", phone:"", msg:"" });
  const [sent, setSent] = useState(false);
  useScrollReveal();
  const today = new Date().toLocaleDateString("en-IN", { weekday:"long" });
  const weekdays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  return (
    <section id="contact" style={{ padding:"5rem 1.5rem", background:"#fff" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p className="section-eyebrow reveal">Contact</p>
          <h2 className="section-title reveal">Visit Us or Get in Touch</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"2rem" }}>
          <div className="reveal-left">
            <div style={{ background:"#F0FDF4", borderRadius:16, padding:"1.5rem", marginBottom:16, border:"1.5px solid #D1FAE5" }}>
              <div style={{ fontWeight:800, color:"#14532D", marginBottom:14, fontSize:15 }}>📍 Find Us</div>
              <p style={{ color:"#374151", fontSize:14, lineHeight:1.8, margin:"0 0 12px" }}>
                Shop No 2, 432, Dattawadi Rd,<br />Opp. Annapurna Mess, near Mashoba Chowk,<br />Bank Of India Colony, Dattawadi, Pune – 411030
              </p>
              <a href="tel:08600255218" style={{ display:"flex", alignItems:"center", gap:8, color:"#16A34A", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                📞 086002 55218
              </a>
            </div>
            <div style={{ background:"#F0FDF4", borderRadius:16, padding:"1.5rem", border:"1.5px solid #D1FAE5" }}>
              <div style={{ fontWeight:800, color:"#14532D", marginBottom:14, fontSize:15 }}>🕕 Store Hours</div>
              {weekdays.map((day,i) => (
                <div key={day} style={{
                  display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid #E5E7EB", fontSize:13,
                  fontWeight: day===today ? 800 : 400,
                  color: day===today ? "#16A34A" : "#374151",
                  background: day===today ? "rgba(22,163,74,0.05)" : "transparent",
                  borderRadius:4, padding:"7px 6px",
                  transition:"all 0.2s",
                }}>
                  <span>{day}</span>
                  <span>{i===6 ? "7:00 AM – 11:00 PM" : "6:00 AM – 11:30 PM"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal-right">
            <div style={{ background:"#F0FDF4", borderRadius:16, padding:"1.5rem", marginBottom:16, border:"1.5px solid #D1FAE5" }}>
              <div style={{ fontWeight:800, color:"#14532D", marginBottom:12, fontSize:15 }}>📊 Popular Times</div>
              <BusyChart />
            </div>
            <div style={{ background:"#F0FDF4", borderRadius:16, padding:"1.5rem", border:"1.5px solid #D1FAE5" }}>
              <div style={{ fontWeight:800, color:"#14532D", marginBottom:14, fontSize:15 }}>💬 Send Us a Message</div>
              {sent ? (
                <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
                  <div style={{ fontSize:48, animation:"float 2s ease-in-out infinite" }}>✅</div>
                  <div style={{ fontWeight:800, color:"#14532D", marginTop:10, fontSize:16 }}>Message Sent!</div>
                  <div style={{ color:"#6B7280", fontSize:13, marginTop:6 }}>We'll get back to you soon.</div>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  <input className="input-field" placeholder="Your name" value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
                  <input className="input-field" placeholder="Phone number (optional)" value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
                  <textarea className="input-field" placeholder="Your message or query..." rows={3} value={form.msg} onChange={e => setForm(p=>({...p,msg:e.target.value}))} style={{ resize:"vertical" }} />
                  <button className="btn-primary" onClick={() => { if(form.name && form.msg) setSent(true); }}>Send Message →</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding:"3rem 1.5rem 2rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12, animation:"float 3s ease-in-out infinite" }}>🥛</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:800, fontSize:22, color:"#fff", marginBottom:6 }}>Katraj Milk Dairy</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginBottom:20 }}>Shop 2, 432 Dattawadi Rd · Near Mashoba Chowk · Pune 411030</div>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:24 }}>
          <a href="tel:08600255218" style={{ color:"#86EFAC", fontSize:14, fontWeight:600, textDecoration:"none" }}>📞 086002 55218</a>
          <a href="https://www.google.com/search?q=katraj+dairy&oq=Kataraj+&gs_lcrp=EgZjaHJvbWUqCwgDEAAYChgLGIAEMgYIABBFGDkyFwgBEC4YChgLGK8BGMcBGLEDGIAEGI4FMg4IAhAAGAoYCxixAxiABDILCAMQABgKGAsYgAQyCwgEEAAYChgLGIAEMhEIBRAuGAoYCxivARjHARiABDIRCAYQLhgKGAsYrwEYxwEYgAQyCwgHEC4YChgLGIAEMgsICBAAGAoYCxiABDILCAkQABgKGAsYgATSAQoxMDAzOWowajE1qAIIsAIB8QV3QETY7mY-Ew&sourceid=chrome&ie=UTF-8#sv=CAESzAEKuAEStQEKd0FKaVQ0dEszRDIzXzNKbzhoOHhMdjJYYy0xQXIwOFJDVlF3TWRYU3o2YU5GMGszRE0xREtqWHpxOHVEN1kzNEZONDVSUFBBemQtMC1XQ3F5c2lWQWZjMnpiOFVDbE5idHFGaEdpRWF0T1otZ25KYXI2RHJYS0NjEhZpM3c3YXNjRTY2Q3g0dy1sX05pWkNnGiJBRHNyOWZTdkI4S0N6UmpieGkxRDZyOUswSVdXTjBCZ2FBEgQ4MDUxGgEzKgAwADgBQAAYACCezPPzDUoCEAI" style={{ color:"#86EFAC", fontSize:14, fontWeight:600, textDecoration:"none" }} target="_blank" rel="noreferrer">🗺️ Get Directions</a>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16, fontSize:12, color:"rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} Katraj Milk Dairy · All rights reserved · Made with ❤️ in Pune
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  useScrollReveal();

  useEffect(() => {
    const sections = ["home","products","about","reviews","contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1)); });
    }, { threshold:0.35 });
    sections.forEach(id => { const el = document.getElementById(id); if(el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <NavBar active={active} setActive={setActive} />
      <Hero setActive={setActive} />
      <Stats />
      <Products />
      <About />
      <Reviews />
      <Contact />
      <Footer />
    </>
  );
}