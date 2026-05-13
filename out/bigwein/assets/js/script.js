
(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));

  const menu=$('#luxMenu');
  const toggle=$('#luxToggle');
  function closeMenu(){
    if(menu) menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    $$('#luxToggle i,.lux-mobile-toggle i').forEach(i=>i.className='fa-solid fa-bars');
  }
  if(toggle && menu){
    toggle.addEventListener('click',e=>{
      e.preventDefault();
      menu.classList.toggle('open');
      document.body.classList.toggle('menu-open',menu.classList.contains('open'));
      const icon=toggle.querySelector('i');
      if(icon) icon.className=menu.classList.contains('open')?'fa-solid fa-xmark':'fa-solid fa-bars';
    });
  }
  $$('.lux-menu a').forEach(a=>a.addEventListener('click',closeMenu));

  $$('.faq-q').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('open')));

  const locationModal=$('#locationModal');
  $$('[data-location-open]').forEach(b=>b.addEventListener('click',()=>locationModal&&locationModal.classList.add('open')));
  $$('[data-location-close]').forEach(b=>b.addEventListener('click',()=>locationModal&&locationModal.classList.remove('open')));
  if(locationModal){locationModal.addEventListener('click',e=>{if(e.target===locationModal)locationModal.classList.remove('open')});}

  const smartModal=$('#smartModal');
  $$('[data-smart]').forEach(b=>b.addEventListener('click',()=>{ if(smartModal) smartModal.classList.add('open'); }));
  $$('[data-close]').forEach(b=>b.addEventListener('click',()=>{ if(smartModal) smartModal.classList.remove('open'); }));

  $$('[data-smart-collapse]').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();
    const el=$(btn.getAttribute('data-smart-collapse'));
    if(el) el.classList.toggle('open');
  }));

  const filterBtn=$('[data-property-filter-toggle]');
  const sidebar=$('.filter-sidebar');
  if(filterBtn && sidebar){
    filterBtn.addEventListener('click',()=>{
      sidebar.classList.toggle('open');
      document.body.classList.toggle('menu-open',sidebar.classList.contains('open'));
      document.body.classList.toggle('filter-open',sidebar.classList.contains('open'));
      filterBtn.innerHTML=sidebar.classList.contains('open')?'<i class="fa-solid fa-xmark"></i> Close Filters':'<i class="fa-solid fa-sliders"></i> Search Filters';
    });
  }

  $$('.portfolio-card[data-href],.bw-property-card[onclick]').forEach(card=>{
    if(card.dataset.bound) return;
    card.dataset.bound='1';
    card.addEventListener('click',e=>{
      if(e.target.closest('button,a,input,select,label')) return;
      const href=card.getAttribute('data-href')||'property-detail.html';
      window.location.href=href;
    });
  });

  const slides=$$('.lux-hero-slider .lux-slide');
  const dots=$$('.lux-hero-slider .lux-slider-nav span');
  if(slides.length){let i=0;setInterval(()=>{slides[i].classList.remove('active');dots[i]?.classList.remove('active');i=(i+1)%slides.length;slides[i].classList.add('active');dots[i]?.classList.add('active');},3200);}



  // Robust mobile filter drawer and smart-filter toggles
  document.addEventListener('click', function(e){
    const filterTrigger = e.target.closest('[data-property-filter-toggle]');
    const fs = document.querySelector('.filter-sidebar');
    if(filterTrigger && fs){
      e.preventDefault();
      fs.classList.add('open');
      document.body.classList.add('filter-open');
      document.body.classList.add('menu-open');
      filterTrigger.innerHTML = '<i class="fa-solid fa-xmark"></i> Close Filters';
      return;
    }
    if(document.body.classList.contains('filter-open') && fs && !e.target.closest('.filter-sidebar') && !e.target.closest('[data-property-filter-toggle]')){
      fs.classList.remove('open');
      document.body.classList.remove('filter-open');
      document.body.classList.remove('menu-open');
      const btn=document.querySelector('[data-property-filter-toggle]');
      if(btn) btn.innerHTML='<i class="fa-solid fa-sliders"></i> Search Filters';
    }
    if(fs && fs.classList.contains('open')){
      const r=fs.getBoundingClientRect();
      if(e.clientX > r.right-62 && e.clientY > r.top && e.clientY < r.top+62){
        fs.classList.remove('open');
        document.body.classList.remove('filter-open');
        document.body.classList.remove('menu-open');
        const btn=document.querySelector('[data-property-filter-toggle]');
        if(btn) btn.innerHTML='<i class="fa-solid fa-sliders"></i> Search Filters';
      }
    }
    const smart = e.target.closest('[data-smart-collapse]');
    if(smart){
      e.preventDefault();
      const el=document.querySelector(smart.getAttribute('data-smart-collapse'));
      if(el) el.classList.toggle('open');
    }
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      closeMenu();
      if(sidebar) sidebar.classList.remove('open');
      document.body.classList.remove('filter-open');
      const fbtn=document.querySelector('[data-property-filter-toggle]'); if(fbtn) fbtn.innerHTML='<i class="fa-solid fa-sliders"></i> Search Filters';
      if(locationModal) locationModal.classList.remove('open');
      if(smartModal) smartModal.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
})();
