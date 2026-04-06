// ── Navigation ──
const PAGE_TITLES = {
  'intro': 'Introduction',
  'concept': 'Le concept',
  'modes': 'Modes de tirage',
  'ambiances': 'Ambiances lumineuses',
  'interface': 'Interface & Installation',
  'roadmap': 'Perspectives',
  'architecture': 'Architecture',
  'materiel': 'Matériel requis',
  'reseau': 'Architecture réseau',
  'protocole': 'Protocole UDP',
  'backoffice': 'Backoffice web',
  'animations': 'Animations LED',
  'configuration': 'Configuration des nodes',
  'routes': 'Routes HTTP',
  'dependances': 'Dépendances',
  'problemes': 'Problèmes connus',
  'evolutions': 'Évolutions prévues',
  'annexes': 'Annexes',
  'faq-archi': 'Architecture & Communication',
  'faq-fiab': 'Fiabilité & Stabilité',
  'faq-tirage': 'Tirage & Équité',
  'faq-bo': 'Backoffice & Interface',
  'faq-config': 'Configuration',
  'faq-leds': 'LEDs & Animations',
  'faq-zones': 'Zones',
  'faq-secu': 'Sécurité & Casino',
  'faq-evol': 'Évolutivité & Avenir',
  'faq-cout': 'Coût & Maintenance',
};

const FAQ_MAP = {
  'faq-archi': 'archi',
  'faq-fiab': 'fiab',
  'faq-tirage': 'tirage',
  'faq-bo': 'bo',
  'faq-config': 'config',
  'faq-leds': 'leds',
  'faq-zones': 'zones',
  'faq-secu': 'secu',
  'faq-evol': 'evol',
  'faq-cout': 'cout',
};

function go(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(a => a.classList.remove('active'));

  // Show target
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');

  // Update topbar
  document.getElementById('topbar-title').textContent = PAGE_TITLES[pageId] || pageId;

  // Highlight nav
  document.querySelectorAll('.nav-link').forEach(a => {
    if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + pageId + "'")) {
      a.classList.add('active');
    }
  });

  // Render FAQ if needed
  if (FAQ_MAP[pageId]) {
    renderFaq(pageId, FAQ_MAP[pageId]);
  }

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');

  // Scroll to top
  window.scrollTo(0, 0);
}

// ── FAQ Rendering ──
function renderFaq(pageId, dataKey) {
  const containerId = pageId.replace('faq-', 'faq-') + '-content';
  const container = document.getElementById(containerId);
  if (!container || container.dataset.rendered) return;

  const items = FAQ_DATA[dataKey];
  if (!items) return;

  let html = '';
  items.forEach((item, i) => {
    html += `
      <div class="faq-item" id="faq-${dataKey}-${i}">
        <div class="faq-question" onclick="toggleFaq('faq-${dataKey}-${i}')">
          <span class="q-num">${item.n}</span>
          <span class="q-text">${item.q}</span>
          <span class="faq-arrow">▼</span>
        </div>
        <div class="faq-answer">${item.a}</div>
      </div>
    `;
  });

  container.innerHTML = html;
  container.dataset.rendered = '1';
}

function toggleFaq(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isOpen = item.classList.contains('open');
  // Close all in same container
  item.parentElement.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Init ──
document.addEventListener('DOMContentLoaded', function() {
  go('intro');
});
