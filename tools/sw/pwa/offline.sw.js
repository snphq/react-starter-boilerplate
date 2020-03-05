/* eslint-disable */

const offlineUrl = './offline.html';

self.addEventListener('install', event => {
  event.waitUntil(caches.open('v1').then(cache => cache.addAll([offlineUrl])));
});

self.addEventListener('fetch', e => {
  if (
    e.request.mode === 'navigate' ||
    (e.request.method === 'GET' &&
      e.request.headers.get('accept').includes('text/html'))
  ) {
    e.respondWith(fetch(e.request.url).catch(() => caches.match(offlineUrl)));
  }
});
