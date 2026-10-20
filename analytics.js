/* Visit counter for the portfolio. Uses GoatCounter: free, no cookies, no consent banner.
   Counts visits per page, where people came from (LinkedIn, email, search), country and device.

   SETUP (2 minutes):
   1. Sign up free at https://www.goatcounter.com and choose a site code, for example "mauriciomena".
   2. Paste that code in GC_CODE below. Leave it empty and nothing runs.
   3. Publish. Open https://<your-code>.goatcounter.com to see the numbers.

   Tell recruiters apart: put a tag in the link you send them, for example
     https://mauricio-mena.com/?ref=acme-recruiter
   GoatCounter lists "acme-recruiter" as the source, so you know that company opened it. */
(function () {
  var GC_CODE = '';   // <- your GoatCounter site code goes here

  if (!GC_CODE) return;
  var h = location.hostname;
  if (location.protocol === 'file:' || h === 'localhost' || /^127\./.test(h)) return;   // do not count your own testing

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter', 'https://' + GC_CODE + '.goatcounter.com/count');
  document.head.appendChild(s);

  /* Count the clicks a recruiter would make: email, LinkedIn, Behance, any PDF (resume). */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '', name = null;
    if (/^mailto:/i.test(href)) name = 'click/email';
    else if (/linkedin\.com/i.test(href)) name = 'click/linkedin';
    else if (/behance\.net/i.test(href)) name = 'click/behance';
    else if (/\.pdf($|\?)/i.test(href)) name = 'download/' + href.split('/').pop().split('?')[0];
    if (name && window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({ path: name, title: name, event: true });
    }
  });
})();
