"""Builds public/QuangDung_CV.pdf (one A4 page). Run: python cv/build_cv.py"""
import os

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

W, H = A4
M = 50
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'QuangDung_CV.pdf')
doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=28, bottomMargin=24,
                        title='Nguyen Quang Dung - CV', author='Nguyen Quang Dung')
base = ParagraphStyle('b', fontName='Times-Roman', fontSize=10.5, leading=13.4)
name = ParagraphStyle('n', parent=base, fontName='Times-Bold', fontSize=18, leading=22, alignment=TA_CENTER)
contact = ParagraphStyle('c', parent=base, alignment=TA_CENTER, fontSize=9, leading=12, fontName='Helvetica')
sec = ParagraphStyle('s', parent=base, fontName='Times-Bold', fontSize=11.5, leading=14, alignment=TA_CENTER)
bold = ParagraphStyle('bo', parent=base, fontName='Times-Bold')
ital = ParagraphStyle('it', parent=base, fontName='Times-Italic')
plainR = ParagraphStyle('pr', parent=base, alignment=TA_RIGHT)
italR = ParagraphStyle('itr', parent=ital, alignment=TA_RIGHT)
bul = ParagraphStyle('bu', parent=base, leftIndent=18, bulletIndent=6, spaceAfter=1.5)
LINK = '#1a4f8a'

s = []


def section(t):
    s.append(Spacer(1, 7))
    s.append(Paragraph(t, sec))
    s.append(HRFlowable(width='100%', thickness=0.8, color=colors.black, spaceBefore=1, spaceAfter=5))


def two(l, r, ls=bold, rs=plainR, lw=0.77):
    t = Table([[Paragraph(l, ls), Paragraph(r, rs)]], colWidths=[(W - 2 * M) * lw, (W - 2 * M) * (1 - lw)])
    t.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                           ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
                           ('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    return t


def proj(title, role):
    lw = min(0.82, (stringWidth(title, 'Times-Bold', 10.5) + 14) / (W - 2 * M))
    return two(title, role, bold, italR, lw=lw)


def bullets(items):
    return [Paragraph(x, bul, bulletText='•') for x in items]


s.append(Paragraph('Nguyen Quang Dung', name))
s.append(Paragraph(
    'Ho Chi Minh City, Vietnam &nbsp;•&nbsp; +84 707 005 345 &nbsp;•&nbsp; <font color="%s">nhoxben1234@gmail.com</font><br/><font color="%s">github.com/dungnguyen02102007-commits</font>' % (LINK, LINK),
    contact))

section('EDUCATION')
s.append(two('University of Technology Sydney (UTS)', 'September 2025 to October 2028', lw=0.6))
s.append(Paragraph('Bachelor of Information Technology, Major in Artificial Intelligence', ital))
s += bullets(['GPA: 3.21 / 4.0'])

section('WORK EXPERIENCE')
s.append(two('AI for Vietnam', 'August 2026 to Present', lw=0.6))
s.append(Paragraph('Data Annotator', ital))
s += bullets(['Executed annotation of text, image and video data in accordance with project guidelines and escalated ambiguous samples to the team, ensuring accurate and consistent training data for Vietnamese AI models.'])

section('TECHNICAL PROJECTS')
s.append(proj('AMASE: Multi-Agent AI System for CV Evaluation (BKI 2026)', 'AI Engineer, Full-stack Developer'))
s.append(Paragraph('<i>Python, LangChain, Gemini and Claude APIs, ChromaDB, SQLite</i> | Repository: AMASE-AI', base))
s += bullets([
    'Engineered a three-stage multi-agent pipeline with LangChain, in which Gemini parses the CV and Claude rewrites it in an ATS-compatible format and estimates hiring probability.',
    'Integrated retrieval-augmented generation with ChromaDB and a LinkedIn, JobStreet and Seek scraper to ground the agents in real job requirements, and stored sessions in SQLite so reviews can be resumed.',
    'Supported PDF, Word and plain-text CV uploads through a multi-format ingestion layer.'])
s.append(Spacer(1, 6))
s.append(proj('FlowyX: ADHD Task Assistant for Android (ADC RMIT 2026)', 'System Designer, Graphic Designer'))
s.append(Paragraph('<i>Kotlin, Python, Gemini API</i> | Demo: heyzine.com/flip-book/3de5725a39', base))
s += bullets([
    'Architected the system of an Android application that uses the Gemini API to break vague tasks into small timed steps, addressing difficulty with task initiation among adults with ADHD.',
    'Conceptualised the visual interface, including a colour-ring timer and colour-block calendar that make time visible, and Meety, a Python tool that converts meeting transcripts into minutes and calendar tasks.',
    'Specified on-device AES-256-GCM encryption (Android Keystore) to protect sensitive health data.'])
s.append(Spacer(1, 6))
s.append(proj('AI Challenge: Image and Video Retrieval System (AIC 2026)', 'AI Engineer, Team Leader'))
s.append(Paragraph('<i>Python, FastAPI, FAISS, RAG, ViT-B/32, ViT-L/14, Git, GitHub</i>', base))
s += bullets([
    'Led a five-member team building a multimodal retrieval system over 873 videos (177K keyframes), indexing with FAISS and fusing ViT-B/32 and ViT-L/14 embeddings through Reciprocal Rank Fusion to narrow the semantic gap and optimise benchmark scores.',
    'Added LLM-based query translation and expansion for Vietnamese queries, and coordinated delivery with Agile practices, Git and GitHub for planning, benchmarking and code review.',
    'Established a benchmarking workflow measuring recall and latency on the full corpus to guide model and parameter decisions.'])

section('AWARDS &amp; ACHIEVEMENTS')
s += bullets(['Top 50, AI Riser Vietnam 2026, organised by Google Developer Vietnam',
              'Third Prize, CSE Summer School Hackathon 2025, HCMUT',
              'Consolation Prize, OISP Presentation Contest 2025, HCMUT',
              'Second Prize, Remote-Controlled Fire-Fighting Robot Design and Build Contest, 2023'])

section('SKILLS &amp; LANGUAGES')
s += bullets([
    '<b>Programming Languages:</b> Python, Java, JavaScript (ES6+), SQL',
    '<b>AI &amp; Machine Learning:</b> LangChain, multi-agent systems, RAG, prompt engineering, Claude/Gemini APIs',
    '<b>Frontend:</b> HTML/CSS, React 19, Vite, Tailwind CSS v4, React Router, Framer Motion',
    '<b>Backend:</b> Node.js, Express, REST API design',
    '<b>Databases &amp; Tooling:</b> MySQL, PostgreSQL/Supabase, SQLite/SQLAlchemy, Git and GitHub, Vercel, Microsoft Office',
    '<b>Languages:</b> Vietnamese (native), English (IELTS 6.5)'])
doc.build(s)
