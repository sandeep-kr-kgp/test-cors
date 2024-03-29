(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === 'childList')
        for (const n of r.addedNodes)
          n.tagName === 'LINK' && n.rel === 'modulepreload' && s(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = l(e);
    fetch(e.href, r);
  }
})();
let i = document.querySelector('#app');
const c = new Worker('./assets/api.js');
c.postMessage('Hello');
c.onmessage = function (t) {
  (i.innerHTML = `<pre>${JSON.stringify(JSON.parse(t.data), null, 4)}</pre>`),
    console.log(t.data);
};
i.innerHTML = `
  Hello
`;
