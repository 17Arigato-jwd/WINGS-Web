/* WINGS-AAS — site behaviour (~5 KB, no dependencies).
   Modules: reveal observer, stat counters, header shrink, mobile drawer,
   dropdown (touch), contact form, click-to-load map.
   Everything degrades gracefully without JS. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------- reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal, .reveal-group');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target); // reveal once, never re-trigger
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ------------------------------------------------------- stat counters */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reducedMotion) { el.textContent = target.toLocaleString('en-IN'); return; }
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ------------------------------------------------------- header shrink */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-shrunk', window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------- mobile drawer */
  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('drawer-backdrop');
  var openBtn = document.getElementById('drawer-open');
  var closeBtn = document.getElementById('drawer-close');
  if (drawer && openBtn) {
    var setDrawer = function (open) {
      drawer.hidden = false;
      backdrop.hidden = false;
      requestAnimationFrame(function () {
        drawer.classList.toggle('is-open', open);
        backdrop.classList.toggle('is-open', open);
      });
      openBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        closeBtn.focus();
      } else {
        setTimeout(function () { drawer.hidden = true; backdrop.hidden = true; }, 300);
        openBtn.focus();
      }
    };
    openBtn.addEventListener('click', function () { setDrawer(true); });
    closeBtn.addEventListener('click', function () { setDrawer(false); });
    backdrop.addEventListener('click', function () { setDrawer(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false);
    });
  }

  /* --------------------------------------- dropdown: click support (touch) */
  document.querySelectorAll('[data-dropdown] > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dd = btn.parentElement;
      var open = dd.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!btn.parentElement.contains(e.target)) {
        btn.parentElement.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ------------------------------------------------------------ contact form
     No hosted form backend is configured yet (docs/05 gap #5): if the form
     has no data-endpoint, fall back to opening the visitor's email client
     with the message pre-filled. When a Formspree/Web3Forms endpoint is
     ready, set data-endpoint on the <form> and the same code POSTs to it. */
  var form = document.getElementById('contact-form');
  if (form) {
    // Preselect subject from ?subject= (used by CTA buttons across the site)
    var params = new URLSearchParams(window.location.search);
    var subject = params.get('subject');
    var select = form.querySelector('select[name="subject"]');
    if (subject && select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.value.toLowerCase() === subject.toLowerCase()) select.value = o.value;
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if (data.get('company')) return; // honeypot
      var endpoint = form.getAttribute('data-endpoint');
      var done = function () {
        form.hidden = true;
        document.getElementById('form-success').hidden = false;
      };
      if (endpoint) {
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending…';
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error('send failed');
            done();
          })
          .catch(function () {
            btn.disabled = false;
            btn.textContent = 'Send Message';
            document.getElementById('form-error').hidden = false;
          });
      } else {
        var body = 'Name: ' + data.get('name') + '\nPhone: ' + (data.get('phone') || '-') +
          '\n\n' + data.get('message');
        window.location.href = 'mailto:wings.aas5@gmail.com?subject=' +
          encodeURIComponent('[Website] ' + data.get('subject')) +
          '&body=' + encodeURIComponent(body);
        done();
      }
    });
  }

  /* -------------------------------------------------- click-to-load map */
  var mapBtn = document.getElementById('map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      var wrap = document.getElementById('map-wrap');
      var iframe = document.createElement('iframe');
      iframe.src =
        'https://www.google.com/maps?q=' +
        encodeURIComponent(
          'A-15, Amrut Sai Sara City, Nakshatrawadi, Paithan Road, Chhatrapati Sambhaji Nagar, Maharashtra 431001'
        ) +
        '&output=embed';
      iframe.title = 'Map — WINGS-AAS office location';
      iframe.loading = 'lazy';
      iframe.className = 'w-full h-full border-0 opacity-0 transition-opacity duration-300';
      iframe.addEventListener('load', function () { iframe.classList.remove('opacity-0'); });
      wrap.replaceChildren(iframe);
    });
  }
})();
