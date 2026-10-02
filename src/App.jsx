import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BookOpen, Download, Github, Mail, MapPin, Phone } from 'lucide-react'

const GH = 'https://github.com/dungnguyen02102007-commits'
const shadow = 'shadow-[8px_8px_0px_0px_#000]'
const mono = 'font-mono font-bold'

const stats = [
  { big: '3.21', bg: 'bg-[#FFE600]', label: '/ 4.0 GPA // HIGH DISTINCTIONS IN MATH 2 & BUSINESS REQUIREMENTS' },
  { big: '3+', bg: 'bg-[#4ECDC4]', label: 'COMPETITION AWARDS' },
  { big: '100%', bg: 'bg-[#FF5E97]', label: 'PASSION FOR AUTONOMOUS AI AGENTS' },
]

const projects = [
  { n: '01', bg: 'bg-[#FF5E97]', tag: 'MULTI-AGENT / RAG', title: 'AMASE: Multi-Agent AI System for CV Evaluation', stack: 'Python / LangChain / Claude & Gemini APIs / ChromaDB / SQLite', desc: 'Automated 3-step CV evaluation pipeline: Gemini CV parser, Claude ATS rewriter, Claude hiring probability estimator. Features a ChromaDB RAG reference library and real-time job scraping from LinkedIn/Seek.', href: `${GH}/AMASE-AI`, cta: 'VIEW ON GITHUB', badges: ['MULTI-AGENT', 'RAG'] },
  { n: '02', bg: 'bg-[#4ECDC4]', tag: 'FULL-STACK', title: 'Vietnam Youth Union Website', stack: 'React 19 / Vite / Express 5 / MySQL / Framer Motion', desc: '5-page organizational web system featuring dynamic event calendars, SQL-injection protected REST APIs, and a non-tech-friendly event posting dashboard.', href: `${GH}/youth-union-site`, cta: 'VIEW ON GITHUB', badges: ['FULL-STACK'] },
  { n: '03', bg: 'bg-[#FFE600]', tag: 'ANDROID / ADHD', title: 'FlowyX: Android Assistant for Adults with ADHD', stack: 'Kotlin / Python / Gemini API / Android Keystore', desc: 'Built with a teammate for the RMIT ADC Hackathon 2026 (theme: Neurodivergence). Helps working adults with ADHD start and finish tasks: AI task breakdown into small timed steps, colour-ring timer, colour-block calendar, and Meety, which turns meeting transcripts into minutes and calendar tasks. Data stays on the device.', href: 'https://heyzine.com/flip-book/3de5725a39.html', cta: 'VIEW FLIPBOOK', badges: ['TEAM PROJECT', 'HACKATHON', 'AI'] },
  { n: '04', bg: 'bg-[#A855F7]', tag: 'GAME AI', title: 'AI Challenge 2026 & Bomberland Game Bots', stack: 'Python / Real-time Decision Game AI / Agile & Git', desc: 'Large-scale image/video search system and real-time decision-making bots for competitive game environments.', href: GH, cta: 'MORE ON GITHUB', badges: ['PYTHON', 'GAME AI', 'AGILE'] },
]

const awards = [
  { rank: '3RD', bg: 'bg-[#FFE600]', title: 'CSE Summer School Hackathon 2025', note: 'Third prize. Database & AI pipeline design.' },
  { rank: '2ND', bg: 'bg-[#4ECDC4]', title: 'Remote-Controlled Fire-Fighting Robot Contest 2023', note: 'Second prize.' },
  { rank: 'CONS.', bg: 'bg-[#FF5E97]', title: 'OISP Presentation Contest 2025', note: 'Consolation prize.' },
  { rank: 'CAMP', bg: 'bg-[#A855F7]', title: 'HCMUT Code Camp', note: 'Multi-agent optimization balancing token cost & speed.' },
]

const cats = {
  AI: { label: 'AI & ML', bg: 'bg-[#FF5E97]' },
  PROG: { label: 'PROGRAMMING', bg: 'bg-[#FFE600]' },
  WEB: { label: 'WEB & BACKEND', bg: 'bg-[#4ECDC4]' },
  DB: { label: 'DATABASE & TOOLS', bg: 'bg-[#22C55E]' },
}
const s = (cat, names) => names.map((name) => ({ cat, name }))
const skills = [
  ...s('AI', ['LangChain', 'Multi-Agent Systems', 'RAG', 'Prompt Engineering', 'Claude & Gemini APIs']),
  ...s('PROG', ['Python', 'JavaScript (ES6+)', 'Java', 'SQL']),
  ...s('WEB', ['React 19', 'Vite', 'Tailwind CSS v4', 'Framer Motion', 'Node.js', 'Express', 'REST APIs']),
  ...s('DB', ['MySQL', 'PostgreSQL/Supabase', 'SQLite', 'Git', 'GitHub', 'Vercel']),
]

const contacts = [
  { bg: 'bg-[#FFE600]', label: 'EMAIL', value: 'nhoxben1234@gmail.com', href: 'mailto:nhoxben1234@gmail.com', Icon: Mail },
  { bg: 'bg-[#4ECDC4]', label: 'PHONE', value: '+84 707 005 345', href: 'tel:+84707005345', Icon: Phone },
  { bg: 'bg-[#A855F7]', label: 'LOCATION', value: 'Ho Chi Minh City, Vietnam', href: 'https://www.google.com/maps/search/Ho+Chi+Minh+City', Icon: MapPin },
  { bg: 'bg-[#22C55E]', label: 'GITHUB', value: 'github.com/dungnguyen02102007-commits', href: GH, Icon: Github },
]

const commands = {
  help: ['Commands: help, about, skills, contact, download-cv, clear', 'Or just ask me anything about Dung (EN / VI).'],
  about: ['Nguyen Quang Dung // IT student, UTS x HCMUT (2025-2028).', 'Focus: multi-agent systems, RAG, responsive web.'],
  skills: ['AI: LangChain, Multi-Agent, RAG, Claude & Gemini APIs', 'CODE: Python, JS, Java, SQL', 'WEB: React 19, Vite, Tailwind v4, Node, Express', 'DATA: MySQL, PostgreSQL, SQLite, Git'],
  contact: ['email: nhoxben1234@gmail.com', 'phone: +84 707 005 345', 'github: github.com/dungnguyen02102007-commits'],
  'download-cv': ['Downloading QuangDung_CV.pdf ...'],
}
const quick = [['help', 'bg-[#FFE600]'], ['about', 'bg-[#4ECDC4]'], ['skills', 'bg-[#FF5E97]'], ['contact', 'bg-[#A855F7]'], ['download-cv', 'bg-[#22C55E]']]

const Tag = ({ children }) => (
  <div className={`self-start bg-black text-white px-3.5 py-1.5 text-sm ${mono}`}>{children}</div>
)
const H2 = ({ children, className = '' }) => (
  <h2 className={`m-0 font-display uppercase leading-[.95] text-5xl md:text-7xl ${className}`}>{children}</h2>
)
const pop = { initial: { opacity: 0, y: 40, scale: 0.96 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, margin: '-60px' }, transition: { type: 'spring', stiffness: 260, damping: 20 } }

const CV_URL = '/QuangDung_CV.pdf'
const downloadCv = () => {
  const a = document.createElement('a')
  a.href = CV_URL
  a.download = 'QuangDung_CV.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// Pendulum ragdoll: photo hangs from a nail, grab it and swing it.
function Ragdoll({ children }) {
  const box = useRef(null)
  const swing = useRef(null)
  const s = useRef({ a: 0.35, w: 0, drag: false, lastA: 0, lastT: 0 })

  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (t) => {
      const p = s.current
      const dt = Math.min(0.033, (t - last) / 1000)
      last = t
      if (!p.drag) {
        p.w += (-38 * Math.sin(p.a) - 0.9 * p.w) * dt
        p.a += p.w * dt
      }
      if (swing.current) swing.current.style.transform = `rotate(${(p.a * 180) / Math.PI}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const angleFrom = (e) => {
    const r = box.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = Math.max(60, e.clientY - r.top)
    return Math.max(-1.5, Math.min(1.5, Math.atan2(-dx, dy)))
  }
  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = s.current
    p.drag = true
    p.w = 0
    p.lastA = angleFrom(e)
    p.lastT = performance.now()
  }
  const move = (e) => {
    const p = s.current
    if (!p.drag) return
    const a = angleFrom(e)
    const now = performance.now()
    const dt = Math.max(0.008, (now - p.lastT) / 1000)
    p.w = 0.6 * p.w + 0.4 * ((a - p.lastA) / dt)
    p.a = a
    p.lastA = a
    p.lastT = now
  }
  const up = () => {
    const p = s.current
    p.drag = false
    p.w = Math.max(-12, Math.min(12, p.w))
  }

  return (
    <div ref={box} className="relative w-full max-w-[470px] select-none">
      <div ref={swing} className="origin-top will-change-transform">
        <div className="mx-auto w-1.5 h-10 bg-black" />
        <div
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          style={{ touchAction: 'none' }}
          className="cursor-grab active:cursor-grabbing bg-white border-4 border-black shadow-[14px_14px_0_#000] p-[18px] pb-[22px]"
        >
          {children}
        </div>
      </div>
      <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-5 h-5 rounded-full bg-[#FF5E97] border-4 border-black" />
    </div>
  )
}

// Class photo that drifts around the loading screen; grab it, throw it, let it fly on.
function FlyingPhoto({ src, label, alt, w = 360, x = 80, y = 140, vx = 190, vy = 130, delay = 0 }) {
  const ref = useRef(null)
  const s = useRef({ x, y, vx, vy, rot: 0, drag: false, ox: 0, oy: 0, hist: [] })

  useEffect(() => {
    let raf
    let last = performance.now()
    const tick = (t) => {
      const el = ref.current
      if (!el) return
      const p = s.current
      const dt = Math.min(0.033, (t - last) / 1000)
      last = t
      const W = Math.max(0, el.parentElement.clientWidth - el.offsetWidth)
      const H = Math.max(0, el.parentElement.clientHeight - el.offsetHeight)
      if (!p.drag) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < 0) { p.x = 0; p.vx = Math.abs(p.vx) }
        if (p.x > W) { p.x = W; p.vx = -Math.abs(p.vx) }
        if (p.y < 0) { p.y = 0; p.vy = Math.abs(p.vy) }
        if (p.y > H) { p.y = H; p.vy = -Math.abs(p.vy) }
        // thrown fast -> slow down to cruising speed; slow -> speed back up so it keeps flying
        const cruise = 200
        const sp = Math.hypot(p.vx, p.vy) || 1
        const next = sp > cruise ? Math.max(cruise, sp - (sp - cruise) * 1.2 * dt) : cruise
        p.vx *= next / sp
        p.vy *= next / sp
      }
      const target = Math.max(-14, Math.min(14, p.vx * 0.03))
      p.rot += (target - p.rot) * Math.min(1, dt * 6)
      el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const down = (e) => {
    const r = e.currentTarget.parentElement.getBoundingClientRect()
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = s.current
    p.drag = true
    p.ox = e.clientX - r.left - p.x
    p.oy = e.clientY - r.top - p.y
    p.hist = []
  }
  const move = (e) => {
    const p = s.current
    if (!p.drag) return
    const el = ref.current
    const r = el.parentElement.getBoundingClientRect()
    const W = Math.max(0, r.width - el.offsetWidth)
    const H = Math.max(0, r.height - el.offsetHeight)
    p.x = Math.max(0, Math.min(W, e.clientX - r.left - p.ox))
    p.y = Math.max(0, Math.min(H, e.clientY - r.top - p.oy))
    const now = performance.now()
    p.hist.push({ x: p.x, y: p.y, t: now })
    while (p.hist.length > 1 && now - p.hist[0].t > 100) p.hist.shift()
  }
  const up = () => {
    const p = s.current
    p.drag = false
    const h = p.hist
    if (h.length > 1) {
      const dt = Math.max(0.016, (h[h.length - 1].t - h[0].t) / 1000)
      const clamp = (v) => Math.max(-2600, Math.min(2600, v))
      p.vx = clamp((h[h.length - 1].x - h[0].x) / dt)
      p.vy = clamp((h[h.length - 1].y - h[0].y) / dt)
    }
  }

  return (
    <div
      ref={ref}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      style={{ touchAction: 'none', width: `min(${w}px, 60vw)` }}
      className="absolute left-0 top-0 z-20 cursor-grab active:cursor-grabbing select-none will-change-transform"
    >
      <motion.div
        initial={{ scale: 0, rotate: -25, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0, rotate: 20, opacity: 0, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 15, delay }}
        className="bg-white border-4 border-black shadow-[8px_8px_0_#000] p-2"
      >
        <img src={src} draggable={false} alt={alt} className="block w-full h-auto border-2 border-black" />
        <div className="mt-1.5 flex justify-between font-mono font-bold text-[11px]"><span>{label}</span><span>GRAB &amp; THROW</span></div>
      </motion.div>
    </div>
  )
}

const PHOTOS = [
  { src: '/class.jpg', label: 'HCMUT x UTS', alt: 'HCMUT x UTS class photo', w: 340, vx: -260, vy: 150 },
  { src: '/hackathon.webp', label: 'ADC HACKATHON 2026', alt: 'Team photo at the ADC Hackathon', w: 290, vx: -180, vy: 260 },
  { src: '/class-green.webp', label: 'CLASS PHOTO', alt: 'Class photo in green uniforms', w: 270, vx: -300, vy: 60 },
  { src: '/team-selfie.jpg', label: 'TEAM SELFIE', alt: 'Team selfie with a city view', w: 250, vx: -140, vy: 230 },
  { src: '/oisp.webp', label: 'OISP CONTEST', alt: 'Team photo at the OISP Community Day and Presentation Contest', w: 300, vx: -330, vy: 190 },
]

function Intro({ onDone }) {
  const [pct, setPct] = useState(0)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setPct((p) => Math.min(100, p + Math.ceil(Math.random() * 6))), 140)
    return () => clearInterval(t)
  }, [])
  const ready = pct >= 100
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#FFE600] border-b-4 border-black px-6 py-8 md:px-[72px] md:py-14 font-mono"
      style={{ backgroundImage: 'radial-gradient(#00000026 2px, transparent 2px)', backgroundSize: '28px 28px' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: [0.77, 0, 0.18, 1] }}
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#4ECDC4] border-4 border-black" />
      <div aria-hidden className="pointer-events-none absolute right-40 bottom-24 w-32 h-32 rotate-12 bg-[#FF5E97] border-4 border-black shadow-[8px_8px_0_#000]" />
      <div aria-hidden className="pointer-events-none absolute -left-10 bottom-1/3 w-44 h-44 rounded-full bg-[#A855F7] border-4 border-black" />
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-10 w-24 h-24 -rotate-6 bg-[#22C55E] border-4 border-black" />
      <AnimatePresence>
        {open &&
          PHOTOS.map((ph, i) => (
            <FlyingPhoto key={ph.src} {...ph} x={Math.max(0, window.innerWidth - 240)} y={110} delay={i * 0.12} />
          ))}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close photo folder' : 'Open photo folder'}
        className="absolute z-30 right-4 top-24 md:right-[72px] md:top-28 flex flex-col items-start transition-transform hover:-translate-y-1 active:translate-y-0"
      >
        <span className="ml-1 h-3.5 w-14 bg-[#FF5E97] border-4 border-b-0 border-black rounded-t-md" />
        <span className="relative flex items-end justify-between gap-3 bg-[#FF5E97] border-4 border-black shadow-[6px_6px_0_#000] px-3 py-2 w-40 h-[88px]">
          <span className="font-display text-sm leading-tight text-left">{open ? 'CLOSE' : 'MEMORIES'}</span>
          <span className="bg-white border-[3px] border-black px-1.5 font-mono font-bold text-sm">{PHOTOS.length}</span>
          <span className="absolute -top-2.5 right-3 w-24 h-3 bg-white border-2 border-black rotate-2" aria-hidden />
        </span>
      </button>
      <div className="relative flex justify-between text-sm font-bold">
        <span className="bg-[#FDF8F5] border-4 border-black shadow-[5px_5px_0_#000] px-3 py-1.5">
          <img src="/logos.png" alt="HCMUT and UTS logos" className="block h-12 md:h-16 w-auto" />
        </span>
        <span className="bg-white border-[3px] border-black px-3 py-1 shadow-[4px_4px_0_#000]">HCMC / 2026</span>
      </div>
      <div className="relative flex flex-col gap-8">
        <div className="flex items-end gap-4">
          <span className="font-display text-[110px] md:text-[190px] leading-[.85] tracking-[-4px] [text-shadow:8px_8px_0_#FF5E97,12px_12px_0_#000]">{pct}</span>
          <span className="font-display text-4xl md:text-6xl pb-1.5">%</span>
        </div>
        <div className="h-[34px] max-w-[820px] border-4 border-black bg-white shadow-[8px_8px_0_#000]">
          <div className="h-full bg-[#FF5E97] border-r-4 border-black box-border transition-[width] duration-150" style={{ width: pct + '%', backgroundImage: 'repeating-linear-gradient(45deg, transparent 0 10px, #00000022 10px 20px)' }} />
        </div>
        <div className="self-start flex items-center gap-2.5 bg-[#4ECDC4] border-4 border-black shadow-[5px_5px_0_#000] px-4 py-2 text-base font-bold"><span className="w-3 h-3 rounded-full bg-[#22C55E] border-2 border-black" />LOADING<span className="animate-pulse">_</span></div>
      </div>
      <div className="relative flex items-end justify-between gap-4 flex-wrap">
        <div className="bg-white border-4 border-black shadow-[5px_5px_0_#000] px-4 py-3 text-[13px] leading-7 font-bold">&gt; multi-agent modules<br />&gt; rag memory<br />&gt; react 19 ui</div>
        <button
          disabled={!ready}
          onClick={onDone}
          className={`border-4 border-black shadow-[8px_8px_0_#000] px-7 py-4 font-display text-xl md:text-[22px] uppercase transition-all enabled:hover:translate-x-1 enabled:hover:translate-y-1 enabled:hover:shadow-[4px_4px_0_#000] ${ready ? 'bg-[#FF5E97]' : 'bg-white'}`}
        >
          {ready ? 'Enter portfolio →' : 'Loading...'}
        </button>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [intro, setIntro] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [cmd, setCmd] = useState('')
  const [lines, setLines] = useState([
    { t: `Hey, you made it! I'm Jarvis. Wanna know more about Dung, or just chat with me? Ask away, or type "help" for commands.`, k: 'out' },
  ])
  const [toast, setToast] = useState(false)
  const busy = useRef(false)
  const history = useRef([])
  const termRef = useRef(null)

  // keep the terminal scrolled to the newest text while it is being typed
  useEffect(() => {
    const el = termRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : ''
  }, [intro])

  const run = (raw) => {
    const c = raw.trim().toLowerCase()
    if (!c || busy.current) return
    if (c === 'clear') { setLines([]); setCmd(''); return }
    if (!commands[c]) { ask(raw.trim().slice(0, 300)); return }
    if (c === 'download-cv') downloadCv()
    setLines((l) => [...l, { t: '$ ' + c, k: 'in' }, ...commands[c].map((t) => ({ t, k: 'out' }))])
    setCmd('')
  }
  // anything that is not a command goes to the chatbot (/api/chat -> Gemini)
  const ask = async (question) => {
    if (busy.current) return
    busy.current = true
    setCmd('')
    setLines((l) => [...l, { t: '$ ' + question, k: 'in' }, { t: '', k: 'think' }])
    let reply
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history.current, { role: 'user', text: question }] }),
      })
      const j = await r.json().catch(() => ({}))
      reply = r.ok && j.reply ? j.reply : j.error || 'Chatbot is offline. Try: help, about, skills, contact.'
      if (r.ok && j.reply) history.current = [...history.current, { role: 'user', text: question }, { role: 'model', text: j.reply }].slice(-6)
    } catch {
      reply = 'Chatbot is offline. Try: help, about, skills, contact.'
    }
    // type the reply out char by char, with small pauses on punctuation
    let i = 0
    const step = () => {
      i += 1
      setLines((l) => { const n = [...l]; n[n.length - 1] = { t: reply.slice(0, i), k: 'out' }; return n })
      if (i >= reply.length) { busy.current = false; return }
      const ch = reply[i - 1]
      const delay = /[.!?]/.test(ch) ? 170 : /[,;:]/.test(ch) ? 90 : 16 + Math.random() * 22
      setTimeout(step, delay)
    }
    step()
  }
  const send = (e) => {
    e.preventDefault()
    setToast(true)
    e.target.reset()
    setTimeout(() => setToast(false), 3200)
  }
  const shown = skills.filter((k) => filter === 'ALL' || k.cat === filter)
  const tabs = [['ALL', 'ALL', 'bg-white'], ...Object.entries(cats).map(([id, c]) => [id, c.label, c.bg])]
  const lineCls = { dim: 'text-neutral-500', in: 'text-white font-bold', out: 'text-[#22C55E]' }

  return (
    <>
      <AnimatePresence>{intro && <Intro key="intro" onDone={() => setIntro(false)} />}</AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 200, opacity: 0 }} className={`fixed top-6 right-6 z-40 bg-[#22C55E] border-4 border-black ${shadow} px-6 py-4 ${mono}`}>
            MESSAGE SENT // I'LL REPLY SOON
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-hidden">
        {/* nav */}
        <nav className="flex items-center justify-between px-6 md:px-16 h-[84px]">
          <div className="bg-[#FDF8F5] border-4 border-black shadow-[4px_4px_0_#000] px-3 py-1">
            <img src="/logos.png" alt="HCMUT and UTS logos" className="block h-11 md:h-12 w-auto" />
          </div>
          <div className={`hidden md:flex gap-3 text-sm ${mono}`}>
            {[['about', 'ABOUT'], ['work', 'PROJECTS'], ['xp', 'EXPERIENCE'], ['skills', 'SKILLS']].map(([id, l]) => (
              <a key={id} href={`#${id}`} className="no-underline text-black px-4 py-2.5 border-[3px] border-black bg-white">{l}</a>
            ))}
            <a href="#contact" className="no-underline text-black px-4 py-2.5 border-[3px] border-black bg-[#FF5E97]">CONTACT</a>
          </div>
        </nav>

        {/* hero */}
        <section className="grid lg:grid-cols-2 gap-10 px-6 md:px-16 pt-6 pb-20">
          <div className="flex flex-col gap-5">
            <div className={`shake self-start flex items-center gap-3 bg-white border-4 border-black shadow-[6px_6px_0_#000] px-4 py-3 text-sm ${mono}`}>
              <span className="w-4 h-4 shrink-0 rounded-full bg-[#22C55E] border-[3px] border-black" />AVAILABLE FOR AI &amp; FULL-STACK ROLES IN HO CHI MINH CITY
            </div>
            <h1 className="m-0 font-display uppercase leading-[.92] tracking-[-3px] text-[64px] sm:text-[110px] xl:text-[164px]">
              <span className="block">NGUYEN</span>
              <span className="inline-block bg-[#FFE600] border-4 border-black px-4 shadow-[10px_10px_0_#000]">QUANG</span>
              <span className="block mt-3">DUNG<span className="text-[#FF5E97]">.</span></span>
            </h1>
            <div className={`self-start bg-black text-white uppercase px-4 py-2.5 text-lg md:text-[24px] leading-[1.9] ${mono}`}>A <span className="inline-block whitespace-nowrap bg-[#22C55E] text-black px-2 rotate-2 border-2 border-white shadow-[3px_3px_0_#FFE600]">2007</span> guy with a dream of being <span className="inline-block whitespace-nowrap bg-[#FF5E97] text-black px-2 -rotate-2 border-2 border-white shadow-[3px_3px_0_#4ECDC4]">AI engineer</span></div>
            <div className="flex flex-wrap gap-3">
              {[['UTS AI MAJOR (GPA 3.21)', 'bg-[#A855F7]'], ['LANGCHAIN & RAG SPECIALIST', 'bg-[#4ECDC4]'], ['REACT 19 TECH', 'bg-[#FF5E97]']].map(([t, bg]) => (
                <motion.div key={t} whileHover={{ x: -3, y: -3 }} className={`shake ${bg} border-4 border-black shadow-[6px_6px_0_#000] px-4 py-2.5 text-sm ${mono}`}>{t}</motion.div>
              ))}
            </div>
            <button onClick={downloadCv} className={`shake self-start flex items-center gap-2.5 bg-[#22C55E] border-4 border-black shadow-[8px_8px_0_#000] px-6 py-3.5 font-display text-xl uppercase transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[5px_5px_0_#000]`}>
              <Download size={22} />DOWNLOAD CV
            </button>
          </div>
          <div className="relative flex items-center justify-center">
            <div className={`absolute bottom-14 left-0 z-10 -rotate-[8deg] bg-[#22C55E] border-4 border-black shadow-[6px_6px_0_#000] px-3.5 py-2 text-sm ${mono}`}>CODE + COFFEE</div>
            <Ragdoll>
              <div className="relative w-full aspect-[47/52] bg-[#FFE600] border-4 border-black overflow-hidden flex items-center justify-center font-display text-7xl">
                <span className="absolute">DUNG</span>
                <img src="/dung.jpg" draggable={false} alt="Portrait of Nguyen Quang Dung wearing tinted glasses and headphones" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              </div>
              <div className={`mt-4 flex justify-between text-[15px] ${mono}`}><span>DRAG &amp; SWING ME</span><span>HCMC // 2026</span></div>
            </Ragdoll>
          </div>
        </section>

        {/* about */}
        <section id="about" className="grid lg:grid-cols-2 gap-12 px-6 md:px-16 py-24">
          <div className="flex flex-col gap-6">
            <Tag>01 // ABOUT ME</Tag>
            <H2>BUILDING <span className="bg-[#4ECDC4] px-2.5 border-4 border-black">AGENTS</span> THAT ACTUALLY DO THINGS</H2>
            <div className="shake bg-white border-4 border-black shadow-[10px_10px_0_#000] p-7 text-xl leading-relaxed">
              IT student in the University of Technology Sydney (UTS) &amp; HCMUT joint program in HCMC (Cohort 2025 - 2028). Passionate about <b>multi-agent systems</b>, <b>RAG architecture</b>, and <b>responsive web systems</b>.
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:pt-11">
            {stats.map((st) => (
              <motion.div key={st.big} {...pop} className={`shake flex items-center gap-6 ${st.bg} border-4 border-black shadow-[10px_10px_0_#000] px-7 py-5`}>
                <div className="font-display text-6xl md:text-[84px] leading-none min-w-[150px] md:min-w-[230px]">{st.big}</div>
                <div className={`text-sm md:text-[15px] leading-snug ${mono}`}>{st.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* projects */}
        <section id="work" className="bg-[#FFE600] border-y-4 border-black px-6 md:px-16 py-24 flex flex-col gap-12">
          <div className="flex flex-col gap-5"><Tag>02 // TECHNICAL PROJECTS</Tag><H2>SELECTED WORK</H2></div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <motion.div key={p.n} {...pop} whileHover={{ x: -4, y: -4 }} className="shake flex flex-col bg-white border-4 border-black shadow-[10px_10px_0_#000]">
                <div className={`flex justify-between items-center ${p.bg} border-b-4 border-black px-5 py-3.5 text-sm ${mono}`}><span>PROJECT {p.n}</span><span>{p.tag}</span></div>
                <div className="p-6 flex flex-col gap-4 grow">
                  <h3 className="m-0 font-display text-[28px] leading-tight uppercase">{p.title}</h3>
                  <div className={`text-[13px] bg-[#F4F4F0] border-[3px] border-black p-2.5 leading-normal ${mono}`}>{p.stack}</div>
                  <div className="text-base leading-relaxed grow">{p.desc}</div>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 no-underline bg-black text-white p-3 text-sm border-4 border-black hover:bg-[#FF5E97] hover:text-black ${mono}`}>
                    {p.href.includes('github.com') ? <Github size={18} /> : <BookOpen size={18} />}{p.cta}<ArrowUpRight size={18} />
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {p.badges.map((b) => <span key={b} className={`bg-black text-white px-2.5 py-1.5 text-xs ${mono}`}>{b}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* experience */}
        <section id="xp" className="px-6 md:px-16 py-24 flex flex-col gap-10">
          <div className="flex flex-col gap-5"><Tag>03 // EXPERIENCE &amp; COMPETITIONS</Tag><H2>RECEIPTS</H2></div>
          <div className="grid lg:grid-cols-5 gap-8">
            <motion.div {...pop} className="shake lg:col-span-2 flex flex-col bg-[#4ECDC4] border-4 border-black shadow-[10px_10px_0_#000] p-7 gap-3.5">
              <div className={`self-start bg-black text-white px-3 py-1.5 text-[13px] ${mono}`}>WORK EXPERIENCE // AUG 2026 - PRESENT</div>
              <div className="font-display text-4xl leading-none uppercase">DATA ANNOTATOR</div>
              <div className={`text-lg ${mono}`}>@ AI FOR VIETNAM</div>
              <div className="text-[17px] leading-relaxed bg-white border-4 border-black p-4">Labeling text/image/video datasets and ensuring accuracy for Vietnamese AI training models.</div>
            </motion.div>
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-6">
              {awards.map((a) => (
                <motion.div key={a.title} {...pop} className="shake flex bg-white border-4 border-black shadow-[8px_8px_0_#000]">
                  <div className={`w-[92px] shrink-0 ${a.bg} border-r-4 border-black flex items-center justify-center font-display text-2xl text-center`}>{a.rank}</div>
                  <div className="p-4 flex flex-col gap-1.5"><div className="font-bold text-base leading-snug">{a.title}</div><div className="text-sm leading-snug">{a.note}</div></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* skills */}
        <section id="skills" className="bg-[#A855F7] border-y-4 border-black px-6 md:px-16 py-24 flex flex-col gap-8">
          <div className="flex flex-col gap-5"><Tag>04 // SKILLS MATRIX</Tag><H2 className="text-white">FILTER THE STACK</H2></div>
          <div className="flex flex-wrap gap-3">
            {tabs.map(([id, label, bg]) => (
              <button key={id} onClick={() => setFilter(id)} aria-pressed={filter === id} className={`border-4 border-black px-5 py-3 text-[15px] ${mono} transition-all ${filter === id ? `${bg} translate-x-1 translate-y-1` : 'bg-[#F4F4F0] shadow-[6px_6px_0_#000]'}`}>{label}</button>
            ))}
          </div>
          <div className="bg-white border-4 border-black shadow-[10px_10px_0_#000] p-6 md:p-8 flex flex-wrap gap-3.5 content-start min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {shown.map((k) => (
                <motion.span layout key={k.name} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className={`shake ${cats[k.cat].bg} border-4 border-black shadow-[5px_5px_0_#000] px-4 py-2.5 text-base ${mono}`}>{k.name}</motion.span>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* terminal */}
        <section className="grid lg:grid-cols-5 gap-10 px-6 md:px-16 py-24">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Tag>05 // COMMAND CENTER</Tag>
            <H2 className="!text-5xl md:!text-6xl">TALK TO THE TERMINAL <span className="inline-block bg-[#FF5E97] border-4 border-black shadow-[6px_6px_0_#000] px-3 -rotate-3">AI</span></H2>
            <p className="m-0 text-lg">Type a command or hit a quick action. Try <b>help</b>.</p>
            <div className="flex flex-wrap gap-2.5">
              {quick.map(([c, bg]) => (
                <button key={c} onClick={() => run(c)} className={`shake ${bg} border-4 border-black shadow-[5px_5px_0_#000] px-3.5 py-2.5 text-sm ${mono}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col bg-black border-4 border-black shadow-[10px_10px_0_#22C55E] h-[440px]">
            <div className={`flex gap-2 items-center bg-[#22C55E] border-b-4 border-black px-3.5 py-2.5 text-[13px] ${mono}`}>
              <span className="w-3.5 h-3.5 bg-[#FF5E97] border-[3px] border-black" /><span className="w-3.5 h-3.5 bg-[#FFE600] border-[3px] border-black" /><span className="w-3.5 h-3.5 bg-white border-[3px] border-black" />
              <span className="ml-2">dung@portfolio:~</span>
            </div>
            <div ref={termRef} className="grow overflow-auto p-4 font-mono text-[15px] leading-relaxed flex flex-col">
              {lines.map((l, i) =>
                l.k === 'think' ? (
                  <div key={i} className="text-neutral-400 flex items-end">
                    thinking
                    {[0, 1, 2].map((d) => (
                      <motion.span key={d} className="inline-block" animate={{ y: [0, -7, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}>.</motion.span>
                    ))}
                  </div>
                ) : (
                  <div key={i} className={`${lineCls[l.k]} whitespace-pre-wrap break-words`}>{l.t}</div>
                ),
              )}
            </div>
            <form className="flex border-t-4 border-[#22C55E]" onSubmit={(e) => { e.preventDefault(); run(cmd) }}>
              <span className="pl-4 py-3 font-mono font-bold text-[15px] text-[#22C55E]">$</span>
              <input value={cmd} onChange={(e) => setCmd(e.target.value)} aria-label="Terminal command" placeholder="type a command or ask me anything..." className="grow min-w-0 bg-transparent border-0 text-white font-mono text-[15px] px-2.5 py-3 outline-none" />
              <button type="submit" className={`bg-[#22C55E] border-l-4 border-black px-5 text-sm ${mono}`}>RUN</button>
            </form>
          </div>
        </section>

        {/* contact */}
        <section id="contact" className="bg-[#FF5E97] border-y-4 border-black px-6 md:px-16 py-24 flex flex-col gap-10">
          <div className="flex flex-col gap-5"><Tag>06 // CONTACT</Tag><H2>LET&apos;S BUILD SOMETHING LOUD</H2></div>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="grid sm:grid-cols-2 gap-6 content-start">
              {contacts.map(({ bg, label, value, href, Icon }) => (
                <motion.a key={label} {...pop} whileHover={{ x: -4, y: -4 }} href={href} target="_blank" rel="noopener noreferrer" className={`shake no-underline text-black ${bg} border-4 border-black shadow-[8px_8px_0_#000] p-5 flex flex-col gap-2.5 min-w-0`}>
                  <div className={`flex items-center gap-2 text-[13px] ${mono}`}><Icon size={16} />{label}</div>
                  <div className="font-bold text-lg leading-snug break-words">{value}</div>
                </motion.a>
              ))}
            </div>
            <form onSubmit={send} className="bg-white border-4 border-black shadow-[10px_10px_0_#000] p-7 flex flex-col gap-4">
              {[['YOUR NAME', 'text'], ['YOUR EMAIL', 'email']].map(([l, t]) => (
                <label key={l} className={`flex flex-col gap-1.5 text-[13px] ${mono}`}>{l}<input required type={t} className="border-4 border-black p-3 font-sans text-[17px] font-normal bg-[#F4F4F0]" /></label>
              ))}
              <label className={`flex flex-col gap-1.5 text-[13px] ${mono}`}>MESSAGE<textarea required rows={4} className="border-4 border-black p-3 font-sans text-[17px] font-normal bg-[#F4F4F0] resize-none" /></label>
              <motion.button whileHover={{ x: -3, y: -3 }} whileTap={{ x: 4, y: 4 }} type="submit" className="bg-[#FFE600] border-4 border-black shadow-[8px_8px_0_#000] p-4 font-display text-2xl uppercase">SEND MESSAGE →</motion.button>
            </form>
          </div>
        </section>

        {/* footer */}
        <footer className="h-16 bg-black text-white overflow-hidden flex items-center">
          <div className={`mq text-base whitespace-nowrap ${mono}`}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="pr-10">POWERED BY REACT &amp; FRAMER MOTION // © 2026 NGUYEN QUANG DUNG //</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  )
}
