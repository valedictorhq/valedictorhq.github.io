(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* header */
  var top = $('#top'), finder = $('#finder'), home = document.body.classList.contains('home');
  addEventListener('scroll', function () { top.classList.toggle('lined', scrollY > 4); }, { passive: true });
  if (home && finder && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { top.classList.toggle('searching', !e[0].isIntersecting); }, { rootMargin: '-68px 0px 0px 0px' }).observe(finder);
  }
  var menuBtn = $('#menuBtn'), mnav = $('#mnav');
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', open); mnav.hidden = !open; top.classList.toggle('menu-open', open);
  });
  var here = location.pathname.replace(/index\.html$/, '');
  $$('.top nav a.nl, .mnav a').forEach(function (a) { if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page'); });

  /* listing details */
  var D = {
    deck:     { name: 'Daniel K.', av: ['DK', '#3E4A3F'], open: true, who: 'Babson, MBA in Entrepreneurship', bio: 'I raised a pre-seed round for my own company last year and now help founders fix their deck before it reaches investors. Send it ahead and I’ll come with notes.', opts: [['30 min', 'Deck review with notes', 45], ['1 hr', 'Review plus a practice pitch', 80]] },
    case:     { name: 'Priya S.', av: ['PS', '#121317'], who: 'Harvard, Economics alum', bio: 'Former consultant. I run cases the way a final round does, then tell you exactly where you lost points and how to get them back.', opts: [['15 min', 'Quick case check', 30], ['1 hr', 'Full mock case with written feedback', 90], ['2 hr', 'Final-round prep, two cases', 170]] },
    code:     { name: 'Leo M.', av: ['LM', '#2B59FF'], open: true, who: 'MIT, Computer Science student', bio: 'Python, TypeScript, C++ and anything with a stack trace. Share your screen, we find the bug together, and you leave knowing why it happened.', opts: [['30 min', 'Find and fix one bug', 35], ['1 hr', 'Code review and refactor', 65]] },
    essay:    { name: 'Amara O.', av: ['AO', '#6B4E3D'], who: 'Harvard, PhD candidate in English', bio: 'I teach undergraduate writing. I’ll line edit your essay with you, keep your voice, and cut what an admissions reader would skim past.', opts: [['45 min', 'Line edit of one essay', 60], ['2 hr', 'Full application, every essay', 150]] },
    research: { name: 'Elena W.', av: ['EW', '#4A5D4F'], who: 'Harvard, PhD candidate in Neuroscience', bio: 'Bring a half-formed idea. We’ll narrow it to a question you can test with the time and data you actually have.', opts: [['30 min', 'Shape your research question', 45], ['1 hr', 'Question, methods and a plan', 85]] },
    math:     { name: 'Tomás R.', av: ['TR', '#5A4B6E'], who: 'MIT, Mathematics PhD student', bio: 'I’ve taught recitations for calculus, linear algebra and real analysis. We go through your problem set until each step makes sense to you.', opts: [['1 hr', 'One problem set', 55], ['2 hr', 'Exam review', 100]] },
    offer:    { name: 'Hannah L.', av: ['HL', '#3D5566'], open: true, who: 'Babson alum, product lead in fintech', bio: 'I’ve hired for product teams and negotiated my own offers. We’ll compare yours line by line and script the call.', opts: [['30 min', 'Compare two offers', 50], ['1 hr', 'Offer review plus a practice negotiation', 90]] },
    gtm:      { name: 'Sam P.', av: ['SP', '#7A5C2E'], who: 'MIT Sloan, MBA student', bio: 'I led growth at a B2B startup before Sloan. We’ll find where your funnel leaks and write a plan for your first 100 paying customers.', opts: [['1 hr', 'Go-to-market plan', 95], ['2 hr', 'Plan plus pricing and messaging', 180]] },
    claude:   { name: 'Arjun M.', av: ['AM', '#2F3B52'], open: true, who: 'MIT, EECS student', bio: 'I set up Claude Code for founders and researchers most weeks. We install it, point it at your real project, write your CLAUDE.md together and add the commands you’ll actually use.', opts: [['30 min', 'Install it and run your first task', 40], ['1 hr', 'Full setup with your own commands and skills', 75]] },
    aiclass:  { name: 'Sofia G.', av: ['SG', '#3E5A4A'], open: true, who: 'Babson, MBA student', bio: 'A small class for people who have never used AI properly. We use ChatGPT, Claude and Gemini on your own work: email, research, planning and spreadsheets. Bring a laptop.', plus: true, cls: { day: 'Thursday', time: '6:00 pm', len: '90 min', seats: 8, taken: 5 }, opts: [['90 min', 'One seat', 25], ['90 min', 'Two seats', 50]] },
    skill:    { name: 'Nadia R.', av: ['NR', '#5B3F55'], who: 'Harvard, Computer Science alum', bio: 'Bring a task you do every week. We turn it into a Claude skill with clear steps and test it on your real files, so next week it takes one line to run.', opts: [['1 hr', 'Build and test one skill', 70], ['2 hr', 'Three skills for you or your team', 130]] },
    agents:   { name: 'James T.', av: ['JT', '#4B4A2E'], who: 'MIT Sloan, MBA student', bio: 'I run my own inbox, calendar and sales follow-ups with AI agents. We set up one workflow end to end, with you approving anything that goes out.', opts: [['1 hr', 'Automate one workflow', 80], ['2 hr', 'Inbox, calendar and CRM together', 150]] },
    prompting:{ name: 'Mei L.', av: ['ML', '#2E4D5C'], who: 'Harvard, CS PhD candidate', bio: 'I research how language models fail. In this class you learn to write prompts that give the same good answer every time, and to spot when the model is guessing.', plus: true, cls: { day: 'Tuesday', time: '7:30 pm', len: '1 hr', seats: 10, taken: 7 }, opts: [['1 hr', 'One seat', 20], ['1 hr', 'Two seats', 40]] },
    aimap:    { name: 'Omar H.', av: ['OH', '#6A4A3A'], who: 'Babson, MBA in Entrepreneurship', bio: 'We go through your week task by task and decide what AI should do, what it should draft for you, and what stays human. You leave with the first two automations running.', opts: [['30 min', 'Quick AI audit', 45], ['1 hr', 'Full map and first automations', 85]] },
    build:    { name: 'Priyanka V.', av: ['PV', '#3B3F6B'], open: true, who: 'MIT, Computer Science student', bio: 'Bring an idea for a small AI tool. We plan it, build it on your laptop with you typing, and put it online so you leave with a link you can share.', opts: [['1 hr', 'Plan it and build the first version', 70], ['2 hr', 'Build and ship it together', 140]] },
    papers:   { name: 'Ben A.', av: ['BA', '#4F5B3A'], who: 'Harvard, PhD candidate in Biology', bio: 'AI can read fifty papers in an afternoon and still get the sample size wrong. I’ll show you a workflow that saves the time and checks every claim against the source.', opts: [['30 min', 'Set up your reading workflow', 35], ['1 hr', 'Literature review with AI, checked', 65]] }
  };
  var FEE = 0.25, PLUS_KEEP = 0.8;
  function cash(n) { n = Math.round(n * 100) / 100; return n % 1 ? '$' + n.toFixed(2) : money(n); }

  /* filtering (Browse page) */
  var state = { cat: '', inst: '', len: '', q: '' };
  var cards = $$('.card'), empty = $('#empty'), count = $('#count'), browse = !!$('#browse');
  function apply() {
    if (!browse) return;
    var words = state.q.toLowerCase().split(/\s+/).filter(Boolean), n = 0;
    cards.forEach(function (c) {
      var hay = (c.dataset.k + ' ' + c.textContent).toLowerCase();
      var ok = (!state.cat || c.dataset.cat.split(' ').indexOf(state.cat) > -1) &&
        (!state.inst || c.dataset.inst === state.inst) &&
        (!state.len || c.dataset.len.split(' ').indexOf(state.len) > -1) &&
        words.every(function (w) { return hay.indexOf(w) > -1 || hay.indexOf(w.replace(/s$/, '')) > -1; });
      c.hidden = !ok; if (ok) n++;
    });
    if (empty) empty.hidden = n > 0;
    var html = '<strong>' + n + (n === 1 ? ' session' : ' sessions') + '</strong>';
    if (state.q) html += ' for “' + esc(state.q) + '”<button class="link clear" type="button" id="clearQ">Clear</button>';
    if (count) count.innerHTML = html;
    var cq = $('#clearQ'); if (cq) cq.onclick = function () { setQuery(''); };
  }
  function esc(s) { return s.replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function setQuery(v, scroll) {
    state.q = v.trim(); if ($('#q')) $('#q').value = state.q; $('#mq').value = state.q; apply();
    if (history.replaceState) {
      var p = new URLSearchParams(location.search); if (state.q) p.set('q', state.q); else p.delete('q');
      history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
    }
    if (scroll && $('#grid')) $('#grid').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function setCat(cat) {
    state.cat = cat;
    $$('.tab').forEach(function (x) { x.setAttribute('aria-selected', x.dataset.cat === cat); });
  }
  function setInst(inst) {
    state.inst = inst; if ($('#fi')) $('#fi').value = inst;
    $$('.inst button').forEach(function (x) { x.setAttribute('aria-pressed', x.dataset.inst === inst); });
  }
  if (browse) {
    $$('.tab').forEach(function (t) { t.addEventListener('click', function () { setCat(t.dataset.cat); apply(); }); });
    $$('.inst button').forEach(function (b) { b.addEventListener('click', function () { setInst(b.dataset.inst); apply(); }); });
    if (finder) finder.addEventListener('submit', function (e) {
      e.preventDefault(); setInst($('#fi').value); state.len = $('#fl').value; setQuery($('#q').value, true);
    });
    $('#mini').addEventListener('submit', function (e) { e.preventDefault(); setQuery($('#mq').value, true); });
    $$('.try button').forEach(function (b) { b.addEventListener('click', function () { setQuery(b.textContent, true); }); });
    var P = new URLSearchParams(location.search);
    if (P.get('cat')) setCat(P.get('cat'));
    if (P.get('inst')) setInst(P.get('inst'));
    if (P.get('len')) { state.len = P.get('len'); if ($('#fl')) $('#fl').value = state.len; }
    state.q = (P.get('q') || '').trim(); if ($('#q')) $('#q').value = state.q; $('#mq').value = state.q;
    apply();
  }

  /* sheet */
  var sheet = $('#sheet'), scrim = $('#scrim'), current = null, lastFocus = null;
  var days = [], sel = { opt: 0, day: 0, time: 1 };
  (function () {
    var d = new Date(); d.setDate(d.getDate() + 2);
    var names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    while (days.length < 5) { days.push({ n: names[d.getDay()], d: d.getDate(), wk: d.getDay() % 6 === 0 }); d.setDate(d.getDate() + 1); }
  })();
  function timesFor(i) { return days[i].wk ? ['10:00 am', '11:30 am', '2:00 pm'] : ['8:00 am', '6:00 pm', '7:30 pm', '9:00 pm']; }
  function money(n) { return '$' + n.toLocaleString('en-US'); }
  function ledger(price, label, plus) {
    var fee = plus ? 1 - PLUS_KEEP : FEE, cut = price * fee, keep = price - cut, mp = Math.round((1 - fee) * 100), vp = 100 - mp;
    return '<div><span>' + label + '</span><b>' + money(price) + '</b></div>' +
      '<div><span>Booking and card fees</span><b>$0</b></div>' +
      '<div class="tot"><span>You pay</span><b>' + money(price) + '</b></div>' +
      '<p class="splitbar" aria-hidden="true"><i class="m" style="width:' + mp + '%"></i><i class="v" style="width:' + vp + '%"></i></p>' +
      '<div><span><i class="dot m"></i>The member gets ' + mp + '%' + (plus ? ' (on Plus)' : '') + '</span><b>' + cash(keep) + '</b></div>' +
      '<div><span><i class="dot v"></i>Valedictor keeps ' + vp + '%</span><b>' + cash(cut) + '</b></div>';
  }
  function renderSheet() {
    var L = D[current], c = L.cls;
    $('#sOptH').textContent = c ? 'Choose seats' : 'Choose a length';
    $('#sTimeH').textContent = c ? 'When the class runs' : 'Pick a time';
    $('#sOpts').innerHTML = L.opts.map(function (o, i) {
      return '<label class="opt"><input type="radio" name="opt" value="' + i + '"' + (i === sel.opt ? ' checked' : '') + '><span>' + o[1] + '<small>' + (c ? o[0] + ' class' : o[0]) + '</small></span><b>' + money(o[2]) + '</b></label>';
    }).join('');
    var o = L.opts[sel.opt];
    $('#sLedger').innerHTML = ledger(o[2], c ? o[1] + ', ' + o[0] + ' class' : o[0] + ' session', L.plus);
    $('#sClass').hidden = !c; $('#sDays').hidden = !!c; $('#sTimes').hidden = !!c;
    $('#sTotal').textContent = money(o[2]);
    $('#sBook').textContent = c ? 'Request a seat' : 'Request this session';
    if (c) {
      $('#sClass').innerHTML = '<b>Every ' + c.day + ' at ' + c.time + ', ' + c.len + '</b>Up to ' + c.seats + ' people, online. <span class="left">' + (c.seats - c.taken) + ' of ' + c.seats + ' seats left.</span>';
      $('#sWhen').textContent = o[1] + ', ' + c.day + ' at ' + c.time;
      return;
    }
    $('#sDays').innerHTML = days.map(function (d, i) {
      return '<button type="button" class="day" aria-pressed="' + (i === sel.day) + '" data-i="' + i + '"><small>' + d.n + '</small><b>' + d.d + '</b></button>';
    }).join('');
    var t = timesFor(sel.day); if (sel.time >= t.length) sel.time = 0;
    $('#sTimes').innerHTML = t.map(function (x, i) { return '<button type="button" class="time" aria-pressed="' + (i === sel.time) + '" data-i="' + i + '">' + x + '</button>'; }).join('');
    $('#sWhen').textContent = o[0] + ', ' + days[sel.day].n + ' ' + days[sel.day].d + ' at ' + t[sel.time];
  }
  $('#sOpts').addEventListener('change', function (e) { sel.opt = +e.target.value; renderSheet(); });
  $('#sDays').addEventListener('click', function (e) { var b = e.target.closest('.day'); if (b) { sel.day = +b.dataset.i; renderSheet(); } });
  $('#sTimes').addEventListener('click', function (e) { var b = e.target.closest('.time'); if (b) { sel.time = +b.dataset.i; renderSheet(); } });
  function openSheet(card) {
    current = card.dataset.id; lastFocus = card; sel = { opt: 0, day: 0, time: 1 };
    var L = D[current];
    var th = card.querySelector('.th').cloneNode(true); $('#sThumb').innerHTML = ''; $('#sThumb').appendChild(th);
    $('#sTitle').textContent = card.querySelector('h3').textContent;
    $('#sMeta').innerHTML = '<span class="av' + (L.open ? ' open' : '') + '" style="background:' + L.av[1] + '">' + L.av[0] + '</span><div class="who"><b>' + L.name + '</b><span>' + L.who + '</span>' + (L.open ? '<span class="live">Open this week</span>' : '') + '</div>';
    $('#sBio').textContent = L.bio;
    renderSheet();
    sheet.classList.add('on'); scrim.classList.add('on'); document.body.style.overflow = 'hidden';
    sheet.querySelector('.body').scrollTop = 0;
    setTimeout(function () { $('#sClose').focus(); }, 60);
  }
  function closeSheet() {
    sheet.classList.remove('on'); scrim.classList.remove('on'); document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  cards.forEach(function (c) { c.addEventListener('click', function () { openSheet(c); }); });
  $('#sClose').addEventListener('click', closeSheet);
  scrim.addEventListener('click', closeSheet);
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('on')) closeSheet(); });
  sheet.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = $$('button, input, [href]', sheet).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  $('#sBook').addEventListener('click', function () {
    var L = D[current], o = L.opts[sel.opt];
    if (L.cls) {
      closeSheet(); openRequest({ what: 'I’d like ' + o[1].toLowerCase() + ' in a class like this one: “' + $('#sTitle').textContent + '” (' + money(o[2]) + '), run by someone like ' + L.name + ' (' + L.who + '), ' + L.cls.day + 's at ' + L.cls.time + '.' });
      return;
    }
    var text = 'I’d like a session like this one: “' + $('#sTitle').textContent + '” (' + o[0] + ', ' + money(o[2]) + '), with someone like ' + L.name + ' (' + L.who + '). ' + $('#sWhen').textContent.replace(o[0] + ', ', '') + ' would suit me.';
    closeSheet(); openRequest({ what: text });
  });

  /* request dialog */
  var req = $('#req'), form = $('#rForm'), what = $('#what');
  function setRole(member) {
    $('#roleMember').checked = !!member; form.querySelector('[value="Looking for help"]').checked = !member;
    $('#instField').hidden = !member;
    $('#whatLbl').textContent = member ? 'What would you offer?' : 'What do you need help with?';
  }
  $$('input[name=role]', form).forEach(function (r) { r.addEventListener('change', function () { setRole($('#roleMember').checked); }); });
  function openRequest(o) {
    o = o || {};
    form.querySelector('.rbody').hidden = false; form.querySelector('.done').hidden = true;
    setRole(o.member);
    if (o.what !== undefined) what.value = o.what;
    if (typeof req.showModal === 'function') req.showModal(); else req.setAttribute('open', '');
    setTimeout(function () { form.querySelector('[name=name]').focus(); }, 30);
  }
  $$('[data-request]').forEach(function (b) {
    b.addEventListener('click', function () {
      openRequest({ member: b.hasAttribute('data-member'), what: b.hasAttribute('data-fromsearch') && state.q ? 'I need help with: ' + state.q : undefined });
    });
  });
  function closeReq() { if (req.close) req.close(); else req.removeAttribute('open'); }
  $('#rClose').addEventListener('click', closeReq);
  $('#rDone').addEventListener('click', closeReq);
  req.addEventListener('click', function (e) { if (e.target === req) closeReq(); });
  var INBOX = 'valedictor2026@gmail.com', sendBtn = $('#rSend'), err = $('#rErr');
  function mailtoFor(f, member) {
    var body = 'Name: ' + f.get('name') + '\nEmail: ' + f.get('email') +
      (member ? '\nInstitution: ' + (f.get('inst') || '-') : '') + '\n\n' + (f.get('what') || '');
    return 'mailto:' + INBOX + '?subject=' + encodeURIComponent('Request access: ' + f.get('role')) + '&body=' + encodeURIComponent(body);
  }
  function showError(f, member) {
    err.innerHTML = 'That didn’t go through. <a href="' + mailtoFor(f, member).replace(/"/g, '&quot;') + '">Send it by email instead</a> or write to ' + INBOX + '.';
    err.hidden = false;
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var f = new FormData(form), member = f.get('role') !== 'Looking for help';
    if (f.get('_honey')) return;
    err.hidden = true; sendBtn.disabled = true; sendBtn.textContent = 'Sending…';
    var payload = {
      _subject: (member ? 'Member application: ' : 'Help request: ') + f.get('name'),
      _template: 'table', _captcha: 'false',
      Type: f.get('role'), Name: f.get('name'), email: f.get('email'),
      Institution: member ? (f.get('inst') || '-') : 'n/a', Message: f.get('what') || '-',
      Page: location.href
    };
    fetch('https://formsubmit.co/ajax/' + INBOX, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(payload)
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (String(d.success) !== 'true') throw new Error(d.message || 'failed');
      $('#rDoneMsg').textContent = 'Thanks, ' + String(f.get('name')).split(' ')[0] + '. One of the founders will reply to ' + f.get('email') + '.';
      form.querySelector('.rbody').hidden = true; form.querySelector('.done').hidden = false;
      form.reset(); setRole(false);
    }).catch(function () { showError(f, member); }).then(function () {
      sendBtn.disabled = false; sendBtn.textContent = 'Send request';
    });
  });
  if (location.hash === '#request') openRequest({});

  /* earnings */
  var rate = $('#rate'), hrs = $('#hrs');
  function earn() {
    var r = +rate.value, h = +hrs.value, m = Math.round(r * h * 52 / 12 * (1 - FEE) / 10) * 10;
    $('#earn').textContent = money(m);
    $('#earnPlus').textContent = money(Math.round(r * h * 52 / 12 * PLUS_KEEP / 10) * 10);
    $('#rateV').textContent = '$' + r + ' an hour';
    $('#hrsV').textContent = h + (h === 1 ? ' hour' : ' hours');
    [rate, hrs].forEach(function (x) { x.style.setProperty('--p', ((x.value - x.min) / (x.max - x.min) * 100) + '%'); });
  }
  if (rate && hrs) { rate.addEventListener('input', earn); hrs.addEventListener('input', earn); earn(); }

  /* pricing calculator */
  var price = $('#price');
  function split() {
    var p = +price.value, cut = p * FEE;
    $('#pPay').textContent = money(p); $('#priceV').textContent = money(p);
    $('#pMember').textContent = cash(p - cut); $('#pUs').textContent = cash(cut);
    price.style.setProperty('--p', ((p - price.min) / (price.max - price.min) * 100) + '%');
  }
  if (price) { price.addEventListener('input', split); split(); }
})();
