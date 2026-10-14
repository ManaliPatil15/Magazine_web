/* =====================================================
   Mahodadhi — magazine.js
   Flipbook prototype. Desktop: two-page spread. Mobile: single page.
   Replace the sample content in `pages` with your real pages / images.
   ===================================================== */
(() => {
  'use strict';

  const book = document.getElementById('book');
  if (!book) return;

  const $ = (id) => document.getElementById(id);
  const wavesHTML = '<div class="waves"><div class="wave w1"></div><div class="wave w2"></div><div class="wave w3"></div></div>';

  /* ---------- Page content (index = page number) ---------- */
  const pages = [
    // 0 Cover
    `<div class="pg cover">
       <div class="sun"></div>
       <small>Team Abhiyanta presents</small>
       <div class="deva">महोदधि</div>
       <div class="en">Mahodadhi</div>
       <small>Volume 1, Issue 1</small>
       ${wavesHTML}
     </div>`,

    // 1 Dedication
    `<div class="pg center">
       <i class="bi bi-water" style="font-size:12cqw;color:var(--lagoon)"></i>
       <p class="deva" style="font-size:5.6cqw;margin-top:4cqw">ज्यांनी कधी मनातलं लिहिलं, त्या सर्वांसाठी.</p>
       <p class="deva" style="font-size:5.2cqw">जिन्होंने कभी मन की बात लिखी, उन सबके नाम।</p>
       <p style="font-size:4.4cqw">For everyone who ever wrote a line they were afraid to share.</p>
       <span class="folio">1</span>
     </div>`,

    // 2 Contents
    `<div class="pg">
       <h3>Contents <span class="deva" style="font-size:7cqw;color:var(--tide)">अनुक्रमणिका</span></h3>
       <ul class="toc">
         <li data-goto="3"><span>Editorial</span><b>3</b></li>
         <li data-goto="4"><span class="deva">मराठी</span><b>4</b></li>
         <li data-goto="5"><span class="deva">हिन्दी</span><b>5</b></li>
         <li data-goto="6"><span>English</span><b>6</b></li>
         <li data-goto="7"><span>Illustration</span><b>7</b></li>
         <li data-goto="8"><span>Design</span><b>8</b></li>
         <li data-goto="9"><span>Media</span><b>9</b></li>
         <li data-goto="10"><span>Credits</span><b>10</b></li>
       </ul>
       <span class="folio">2</span>
     </div>`,

    // 3 Editorial
    `<div class="pg">
       <span class="tag" style="--c:var(--tide)">Editorial</span>
       <h3>From the editors' desk</h3>
       <p>Dear readers, an ocean is made of countless drops. This first issue of Mahodadhi gathers poems, stories, sketches and photographs from students across our campus.</p>
       <p>We wrote in three languages, because ideas do not ask which one they belong to. Turn the page and dive in.</p>
       <p class="by">Team Abhiyanta<br>(sample text for the prototype)</p>
       <span class="folio">3</span>
     </div>`,

    // 4 Marathi
    `<div class="pg" style="--c:var(--coral)">
       <span class="tag deva">मराठी</span>
       <h3 class="deva">शब्दांची गाज</h3>
       <div class="poem deva">
         लाटांवर शब्द तरंगतात,<br>किनाऱ्याला गोष्टी सांगतात.<br>प्रत्येक थेंबात एक आठवण,<br>प्रत्येक लाटेत नवं गाणं.
       </div>
       <p class="by">कविता: सुनिता मोरे (नमुना)</p>
       <span class="folio">4</span>
     </div>`,

    // 5 Hindi
    `<div class="pg" style="--c:var(--marigold)">
       <span class="tag deva" style="color:var(--abyss)">हिन्दी</span>
       <h3 class="deva">लहरों की ज़ुबान</h3>
       <div class="poem deva">
         हर लहर कहती है कुछ,<br>किनारा सुनता है चुपचाप।<br>शब्दों के इस समंदर में,<br>हम सब हैं एक-एक बूँद।
       </div>
       <p class="by">कविता: कावेरी त्रिपाठी (नमूना)</p>
       <span class="folio">5</span>
     </div>`,

    // 6 English
    `<div class="pg" style="--c:var(--lagoon)">
       <span class="tag">English</span>
       <h3>A Drop That Spoke</h3>
       <div class="poem">
         Every ocean began as a drop<br>that refused to stay quiet.<br>So write the line, share the page,<br>and let the tide carry it far.
       </div>
       <p class="by">Poem by Ananya Iyer (sample)</p>
       <span class="folio">6</span>
     </div>`,

    // 7 Illustration
    `<div class="pg" style="--c:var(--violet)">
       <span class="tag">Illustration</span>
       <h3>The Whale and the Sun</h3>
       <svg viewBox="0 0 300 220" style="width:100%;border-radius:3cqw" role="img" aria-label="Illustration of a whale under a golden sun">
         <rect width="300" height="220" fill="#0E4A7B"/>
         <circle cx="240" cy="50" r="22" fill="#FFB300"/>
         <path d="M30 140 C40 100 110 85 170 100 C195 106 210 125 218 140 C228 122 248 110 268 108 C258 128 258 148 268 168 C248 166 228 156 218 142 C205 165 170 180 120 176 C70 172 36 165 30 140 Z" fill="#1FB5A8"/>
         <circle cx="70" cy="128" r="4" fill="#061A33"/>
         <path d="M120 96 Q118 70 105 60 M120 96 Q124 68 140 58" stroke="#E9F7F5" stroke-width="3" fill="none" stroke-linecap="round"/>
         <path d="M0 185 Q40 165 80 185 T160 185 T240 185 T320 185 V220 H0Z" fill="#061A33" opacity=".65"/>
       </svg>
       <p class="by" style="margin-top:3cqw">Digital art by Tanvi Patil (sample)</p>
       <span class="folio">7</span>
     </div>`,

    // 8 Design
    `<div class="pg" style="--c:var(--rose)">
       <span class="tag">Design</span>
       <h3>Colours of the ocean</h3>
       <div class="swatches">
         <span style="background:#061A33">Abyss</span><span style="background:#0E4A7B">Tide</span><span style="background:#1FB5A8">Lagoon</span>
         <span style="background:#FFB300;color:#061A33">Marigold</span><span style="background:#F2634A">Coral</span><span style="background:#E9F7F5;color:#061A33">Seaglass</span>
       </div>
       <div class="specimen">Aa <span class="deva" style="font-weight:400">अआ</span></div>
       <p class="by">Layout by Aditya Joshi (sample)</p>
       <span class="folio">8</span>
     </div>`,

    // 9 Media
    `<div class="pg" style="--c:var(--tide)">
       <span class="tag">Media</span>
       <h3>Campus in frames</h3>
       <div class="frames">
         <div style="background:linear-gradient(135deg,#1FB5A8,#0E4A7B)"><i class="bi bi-camera"></i></div>
         <div style="background:linear-gradient(135deg,#F2634A,#E8508B)"><i class="bi bi-image"></i></div>
         <div style="background:linear-gradient(135deg,#0E4A7B,#061A33)"><i class="bi bi-play-circle-fill"></i></div>
       </div>
       <p class="by" style="margin-top:3cqw">Photos and video by the Media team (sample)</p>
       <span class="folio">9</span>
     </div>`,

    // 10 Credits
    `<div class="pg">
       <h3>Credits</h3>
       <div class="credits">
         <div><b class="deva">मराठी</b>Sakshi Deshpande<br>Omkar Kulkarni</div>
         <div><b class="deva">हिन्दी</b>Aarav Mishra<br>Kavya Tripathi</div>
         <div><b>English</b>Ananya Iyer<br>Siddharth Menon</div>
         <div><b>Illustration</b>Tanvi Patil<br>Vedant Shinde</div>
         <div><b>Design</b>Aditya Joshi<br>Meera Nair</div>
         <div><b>Media</b>Neha Gaikwad<br>Kunal Bhosale</div>
       </div>
       <span class="folio">10</span>
     </div>`,

    // 11 Back cover
    `<div class="pg back-cover">
       <h3 class="deva" style="font-weight:400">धन्यवाद</h3>
       <p>Thank you for reading. Send your work for Issue 02 to<br><b style="color:var(--marigold)">mahodadhi@yourcollege.edu.in</b></p>
       <small>Team Abhiyanta</small>
     </div>`
  ];

  const toc = [
    ['Cover', 0], ['Contents', 2], ['Editorial', 3], ['मराठी', 4], ['हिन्दी', 5],
    ['English', 6], ['Illustration', 7], ['Design', 8], ['Media', 9], ['Credits', 10]
  ];

  /* ---------- State ---------- */
  const mq = matchMedia('(max-width: 767.98px)');
  let single = mq.matches;
  let pos = 0;            // desktop: number of flipped leaves; mobile: current page index
  let leaves = [];
  let timer = null;

  const el = (cls, html) => {
    const d = document.createElement('div');
    d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  };

  /* ---------- Build the book ---------- */
  function build() {
    book.innerHTML = '';
    book.classList.toggle('single', single);
    leaves = [];

    const sets = [];
    if (single) pages.forEach(p => sets.push([p, null]));
    else for (let i = 0; i < pages.length; i += 2) sets.push([pages[i], pages[i + 1] ?? '<div class="pg"></div>']);

    sets.forEach(([front, back]) => {
      const leaf = el('leaf');
      leaf.appendChild(el('face front', front));
      if (back !== null) leaf.appendChild(el('face back', back));
      book.appendChild(leaf);
      leaves.push(leaf);
    });
    update();
  }

  /* ---------- Update visuals ---------- */
  function update() {
    const n = leaves.length;
    leaves.forEach((leaf, i) => {
      const flipped = i < pos;
      leaf.classList.toggle('flipped', flipped);
      leaf.style.zIndex = flipped ? i + 1 : n - i;
    });

    const last = single ? pages.length - 1 : n;
    book.classList.toggle('at-start', pos === 0);
    book.classList.toggle('at-end', !single && pos === n);

    $('firstBtn').disabled = $('prevBtn').disabled = pos === 0;
    $('nextBtn').disabled = $('lastBtn').disabled = pos >= last;

    let label;
    if (single) label = pos === 0 ? 'Cover' : `Page ${pos} of ${pages.length - 1}`;
    else if (pos === 0) label = 'Cover';
    else if (pos === n) label = 'Back cover';
    else label = `Pages ${pos * 2 - 1} and ${pos * 2}`;
    $('pageInfo').textContent = label;

    // highlight the current chapter in the quick-jump list
    const current = single ? pos : pos * 2;
    let active = 0;
    toc.forEach(([, p], idx) => { if (p <= current) active = idx; });
    document.querySelectorAll('#jump button').forEach((b, idx) => b.classList.toggle('active', idx === active));
  }

  /* ---------- Navigation ---------- */
  const maxPos = () => (single ? pages.length - 1 : leaves.length);
  const go = (p) => { pos = Math.max(0, Math.min(maxPos(), p)); update(); };
  const next = () => go(pos + 1);
  const prev = () => go(pos - 1);
  const goToPage = (p) => go(single ? p : Math.ceil(p / 2));

  $('nextBtn').addEventListener('click', () => { stopAuto(); next(); });
  $('prevBtn').addEventListener('click', () => { stopAuto(); prev(); });
  $('firstBtn').addEventListener('click', () => { stopAuto(); go(0); });
  $('lastBtn').addEventListener('click', () => { stopAuto(); go(maxPos()); });

  // click on pages
  book.addEventListener('click', (e) => {
    const g = e.target.closest('[data-goto]');
    if (g) { stopAuto(); goToPage(+g.dataset.goto); return; }
    const leaf = e.target.closest('.leaf');
    if (!leaf) return;
    stopAuto();
    if (single) {
      const r = book.getBoundingClientRect();
      (e.clientX - r.left) / r.width < 0.3 ? prev() : next();
    } else {
      leaf.classList.contains('flipped') ? prev() : next();
    }
  });

  // quick-jump buttons
  const jump = $('jump');
  toc.forEach(([label, p]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (/[\u0900-\u097F]/.test(label)) b.className = 'deva';
    b.addEventListener('click', () => { stopAuto(); goToPage(p); });
    jump.appendChild(b);
  });

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); }
    else if (e.key === 'ArrowLeft') { stopAuto(); prev(); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(maxPos());
  });

  // swipe
  let sx = null;
  book.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  book.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) { stopAuto(); dx < 0 ? next() : prev(); }
    sx = null;
  });

  /* ---------- Auto play ---------- */
  const autoBtn = $('autoBtn');
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
    autoBtn.classList.remove('on');
    autoBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
  autoBtn.addEventListener('click', () => {
    if (timer) { stopAuto(); return; }
    if (pos >= maxPos()) go(0);
    autoBtn.classList.add('on');
    autoBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    timer = setInterval(() => { pos >= maxPos() ? stopAuto() : next(); }, 2300);
  });

  /* ---------- Fullscreen ---------- */
  const fsBtn = $('fsBtn');
  const viewer = $('viewer');
  if (!viewer.requestFullscreen) fsBtn.style.display = 'none';
  fsBtn.addEventListener('click', () => {
    document.fullscreenElement ? document.exitFullscreen() : viewer.requestFullscreen();
  });

  /* ---------- Switch layout when the screen size changes ---------- */
  mq.addEventListener('change', () => {
    const wasSingle = single;
    single = mq.matches;
    if (wasSingle && !single) pos = Math.ceil(pos / 2);
    else if (!wasSingle && single) pos = Math.min(pos * 2, pages.length - 1);
    build();
  });

  build();
})();
