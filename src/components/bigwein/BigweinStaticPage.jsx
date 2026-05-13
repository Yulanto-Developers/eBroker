import Head from "next/head";
import { useEffect } from "react";

export default function BigweinStaticPage({ title = "Bigwein | Addressing Your Dreams", bodyClass = "", html = "" }) {
  useEffect(() => {
    if (bodyClass) document.body.className = bodyClass;
    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

    const menu = $('#luxMenu');
    const toggle = $('#luxToggle');
    const closeMenu = () => {
      if (menu) menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      $$('#luxToggle i,.lux-mobile-toggle i').forEach(i => i.className = 'fa-solid fa-bars');
    };

    const cleanups = [];
    const on = (el, ev, fn) => { if (el) { el.addEventListener(ev, fn); cleanups.push(() => el.removeEventListener(ev, fn)); } };

    if (toggle && menu) {
      on(toggle, 'click', (e) => {
        e.preventDefault();
        menu.classList.toggle('open');
        document.body.classList.toggle('menu-open', menu.classList.contains('open'));
        const icon = toggle.querySelector('i');
        if (icon) icon.className = menu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      });
    }
    $$('.lux-menu a').forEach(a => on(a, 'click', closeMenu));
    $$('.faq-q').forEach(q => on(q, 'click', () => q.parentElement?.classList.toggle('open')));

    const locationModal = $('#locationModal');
    $$('[data-location-open]').forEach(b => on(b, 'click', () => locationModal && locationModal.classList.add('open')));
    $$('[data-location-close]').forEach(b => on(b, 'click', () => locationModal && locationModal.classList.remove('open')));
    if (locationModal) on(locationModal, 'click', e => { if (e.target === locationModal) locationModal.classList.remove('open'); });

    const smartModal = $('#smartModal');
    $$('[data-smart]').forEach(b => on(b, 'click', () => smartModal && smartModal.classList.add('open')));
    $$('[data-close]').forEach(b => on(b, 'click', () => smartModal && smartModal.classList.remove('open')));
    $$('[data-smart-collapse]').forEach(btn => on(btn, 'click', e => {
      e.preventDefault();
      const el = $(btn.getAttribute('data-smart-collapse'));
      if (el) el.classList.toggle('open');
    }));

    const filterBtn = $('[data-property-filter-toggle]');
    const sidebar = $('.filter-sidebar');
    if (filterBtn && sidebar) {
      on(filterBtn, 'click', (e) => {
        e.preventDefault();
        sidebar.classList.toggle('open');
        document.body.classList.toggle('menu-open', sidebar.classList.contains('open'));
        document.body.classList.toggle('filter-open', sidebar.classList.contains('open'));
        filterBtn.innerHTML = sidebar.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i> Close Filters' : '<i class="fa-solid fa-sliders"></i> Search Filters';
      });
    }

    $$('.portfolio-card[data-href],.bw-property-card[onclick],.bw-property-card[data-href]').forEach(card => {
      const fn = (e) => {
        if (e.target.closest('button,a,input,select,label')) return;
        const href = card.getAttribute('data-href') || card.getAttribute('onclick')?.match(/['\"]([^'\"]+)['\"]/)?.[1] || '/property-details/modern-haven-villai';
        window.location.href = href;
      };
      on(card, 'click', fn);
    });

    const slides = $$('.lux-hero-slider .lux-slide');
    const dots = $$('.lux-hero-slider .lux-slider-nav span');
    let timer;
    if (slides.length) {
      let i = 0;
      timer = setInterval(() => {
        slides[i]?.classList.remove('active'); dots[i]?.classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i]?.classList.add('active'); dots[i]?.classList.add('active');
      }, 3200);
    }

    const docClick = (e) => {
      const filterTrigger = e.target.closest('[data-property-filter-toggle]');
      const fs = document.querySelector('.filter-sidebar');
      if (filterTrigger && fs) {
        e.preventDefault();
        fs.classList.add('open');
        document.body.classList.add('filter-open', 'menu-open');
        filterTrigger.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Filters';
        return;
      }
      if (document.body.classList.contains('filter-open') && fs && !e.target.closest('.filter-sidebar') && !e.target.closest('[data-property-filter-toggle]')) {
        fs.classList.remove('open');
        document.body.classList.remove('filter-open', 'menu-open');
        const btn = document.querySelector('[data-property-filter-toggle]');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-sliders"></i> Search Filters';
      }
    };
    document.addEventListener('click', docClick);

    const esc = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        if (sidebar) sidebar.classList.remove('open');
        document.body.classList.remove('filter-open', 'menu-open');
        if (locationModal) locationModal.classList.remove('open');
        if (smartModal) smartModal.classList.remove('open');
      }
    };
    document.addEventListener('keydown', esc);

    return () => {
      cleanups.forEach(fn => fn());
      document.removeEventListener('click', docClick);
      document.removeEventListener('keydown', esc);
      if (timer) clearInterval(timer);
    };
  }, [bodyClass, html]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />
        <link href="/bigwein/assets/css/style.css" rel="stylesheet" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
