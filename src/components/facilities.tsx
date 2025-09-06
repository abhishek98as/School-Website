
'use client';

import React, { useEffect, useRef } from 'react';

export function Facilities() {
  const gridRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.card');
    if (!cards) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 12;
      const rotateX = (0.5 - py) * 8;
      const translateY = -8;
      card.style.transform = `translateY(${translateY}px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const icon = card.querySelector<HTMLElement>('.icon-wrap');
      if (icon) {
        const ix = (px - 0.5) * 10;
        const iy = (py - 0.5) * 6;
        icon.style.transform = `translateY(-6px) translateZ(36px) translateX(${ix}px) translateY(${iy}px)`;
      }
    };

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform = '';
      const icon = card.querySelector<HTMLElement>('.icon-wrap');
      if (icon) {
        icon.style.transform = '';
      }
    };
    
    const handleFocus = (card: HTMLElement) => {
       card.style.transform = 'translateY(-10px) perspective(900px) rotateX(2deg)';
    }

    const handleBlur = (card: HTMLElement) => {
        card.style.transform = '';
    }

    cards.forEach(card => {
        const cardEl = card as HTMLElement;
        const onMouseMove = (e: MouseEvent) => handleMouseMove(e, cardEl);
        const onMouseLeave = () => handleMouseLeave(cardEl);
        const onFocus = () => handleFocus(cardEl);
        const onBlur = () => handleBlur(cardEl);

        cardEl.addEventListener('mousemove', onMouseMove);
        cardEl.addEventListener('mouseleave', onMouseLeave);
        cardEl.addEventListener('focus', onFocus);
        cardEl.addEventListener('blur', onBlur);
        
        return () => {
            cardEl.removeEventListener('mousemove', onMouseMove);
            cardEl.removeEventListener('mouseleave', onMouseLeave);
            cardEl.removeEventListener('focus', onFocus);
            cardEl.removeEventListener('blur', onBlur);
        }
    });

  }, []);

  return (
    <>
    <style jsx>{`
      .facilities-section {
        --bg: hsl(var(--background));
        --card-bg: hsl(var(--card));
        --muted: hsl(var(--muted-foreground));
        --title: hsl(var(--card-foreground));
        --accent: hsl(var(--primary));
        --accent-dark: hsl(var(--primary) / 0.9);
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 48px 20px;
      }
      .hero-title { text-align: center; margin-bottom: 36px; }
      .hero-title h1 {
        font-size: 48px; margin: 0 0 8px 0; letter-spacing: 0.5px;
        font-weight: 700; color: var(--title);
      }
      .hero-title p {
        margin: 0; color: var(--muted); font-size: 15px; opacity: 0.9;
        max-width: 760px; margin: 0 auto;
      }
      .grid {
        display: grid; grid-template-columns: repeat(5, 1fr);
        gap: 28px; align-items: start;
      }
      .card {
        background: var(--card-bg); padding: 34px 20px 24px 20px; border-radius: 16px;
        text-align: center; position: relative;
        transition: transform 300ms cubic-bezier(.2,.9,.2,1), box-shadow 300ms, border-top-color 200ms;
        transform-style: preserve-3d; will-change: transform;
        box-shadow: 0 6px 18px rgba(20,20,20,0.06); border-top: 6px solid transparent;
        cursor: default; min-height: 220px; display: flex; flex-direction: column;
        align-items: center; justify-content: flex-start;
      }
      .card:focus {
        outline: none; box-shadow: 0 10px 30px rgba(20,20,20,0.12);
        transform: translateY(-10px) scale(1.01); border-top-color: var(--accent);
      }
      .icon-wrap {
        width: 74px; height: 74px; border-radius: 8px; background: var(--accent);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 18px; transform: translateZ(24px);
        transition: background 220ms, transform 300ms, box-shadow 300ms;
        box-shadow: 0 6px 16px hsla(var(--primary), 0.12); position: relative;
      }
      .icon-wrap::after {
        content: ""; position: absolute; bottom: -10px; left: 50%;
        transform: translateX(-50%); width: 0; height: 0;
        border-left: 9px solid transparent; border-right: 9px solid transparent;
        border-top: 10px solid var(--accent);
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.06));
      }
      .icon-wrap svg { width: 34px; height: 34px; fill: #fff; }
      .card h3 {
        margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: var(--title);
      }
      .card p {
        margin: 0; color: var(--muted); font-size: 13.5px; line-height: 1.5; max-width: 230px;
      }
      .card:hover {
        transform: translateY(-10px) perspective(800px) rotateX(2deg);
        box-shadow: 0 20px 40px rgba(24,24,24,0.12); border-top-color: var(--accent);
      }
      .card:hover .icon-wrap {
        background: var(--accent-dark);
        transform: translateY(-6px) translateZ(36px) scale(1.05);
        box-shadow: 0 14px 34px hsla(var(--primary), 0.14);
      }
      .card .underline {
        width: 40px; height: 4px;
        background: linear-gradient(90deg,var(--accent),var(--accent-dark));
        border-radius: 6px; margin: 10px auto 12px auto; opacity: 0;
        transform: scaleX(0.6); transition: opacity 260ms, transform 260ms;
      }
      .card:hover .underline { opacity: 1; transform: scaleX(1); }
      @media (max-width:1100px) { .grid { grid-template-columns: repeat(3, 1fr); } }
      @media (max-width:800px) { .grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width:520px) {
        .hero-title h1 { font-size: 34px; }
        .grid { grid-template-columns: 1fr; }
        .card { min-height: auto; padding: 26px; }
        .card p { max-width: 100%; }
      }
      .card:focus-visible {
        outline: 3px solid hsla(var(--primary), 0.15); outline-offset: 6px;
      }
    `}</style>
    <div className="bg-background font-body text-foreground py-12 md:py-24">
      <div className="facilities-section">
        <div className="hero-title">
          <h1>Our Facilities</h1>
          <p>Beautifully designed, interactive feature cards with subtle motion and clear hierarchy. Hover any card to see the accent, elevation and 3D tilt.</p>
        </div>

        <section ref={gridRef} className="grid" aria-label="Facilities list">

          <article className="card" tabIndex={0} data-title="Smart Classes">
            <div className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.14 12.936a7.007 7.007 0 000-1.872l2.036-1.58a.5.5 0 00.12-.633l-1.928-3.334a.5.5 0 00-.607-.22l-2.396.96a6.9 6.9 0 00-1.62-.936l-.36-2.54A.5.5 0 0013.45 2h-3.9a.5.5 0 00-.492.42l-.36 2.54a6.9 6.9 0 00-1.62.936l-2.396-.96a.5.5 0 00-.607.22L2.7 8.88a.5.5 0 00.12.633l2.036 1.58a7.007 7.007 0 000 1.872L2.82 14.56a.5.5 0 00-.12.633l1.928 3.334c.148.256.455.36.707.27l2.396-.96c.5.36 1.04.66 1.62.936l.36 2.54c.054.32.327.42.492.42h3.9c.165 0 .438-.1.492-.42l.36-2.54c.58-.276 1.12-.576 1.62-.936l2.396.96c.252.09.56-.014.707-.27l1.928-3.334a.5.5 0 00-.12-.633l-2.04-1.624zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"/>
              </svg>
            </div>
            <h3>Smart Classes</h3>
            <div className="underline" aria-hidden="true"></div>
            <p>Smartclass is a digital initiative that transforms how teachers teach and students learn — bringing meaningful technology into classrooms.</p>
          </article>

          <article className="card" tabIndex={0} data-title="Library">
            <div className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 2H9a2 2 0 00-2 2v14a3 3 0 003 3h9V4a2 2 0 00-0-2zM7 6H5a2 2 0 00-2 2v11a1 1 0 001 1h2V6z"/>
              </svg>
            </div>
            <h3>Library</h3>
            <div className="underline" aria-hidden="true"></div>
            <p>The school library has an excellent collection of books, encyclopedias and reference works in multiple languages for all students.</p>
          </article>

          <article className="card" tabIndex={0} data-title="Medical Care">
            <div className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5c-5 0-9.27 3.11-10.5 7 1.23 3.89 5.5 7 10.5 7s9.27-3.11 10.5-7C21.27 8.11 17 5 12 5zm0 11a4 4 0 110-8 4 4 0 010 8z"/>
              </svg>
            </div>
            <h3>Medical Care</h3>
            <div className="underline" aria-hidden="true"></div>
            <p>School provides free first-aid and periodic medical checkups for students, supported by visiting specialists.</p>
          </article>

          <article className="card" tabIndex={0} data-title="Skills Development">
            <div className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l2.9 6.01L21 9.27l-5 3.86L17.8 21 12 17.77 6.2 21 8 13.13 3 9.27l6.1-1.26L12 2z"/>
              </svg>
            </div>
            <h3>Skills Development</h3>
            <div className="underline" aria-hidden="true"></div>
            <p>Individual attention for skill growth, extra classes and mentorship help students nurture talents and build confidence.</p>
          </article>

          <article className="card" tabIndex={0} data-title="Computer Education">
            <div className="icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 5h18v11H3zM1 18h22v2H1z"/>
              </svg>
            </div>
            <h3>Computer Education</h3>
            <div className="underline" aria-hidden="true"></div>
            <p>Modern, air-conditioned computer labs with ample practice time and guided learning for every student.</p>
          </article>

        </section>
      </div>
    </div>
    </>
  );
}
