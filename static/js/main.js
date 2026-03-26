
// ===== LIGHTBOX =====
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let lbImages = [], lbIndex = 0;

function lbOpen(imgs, idx) {
    lbImages = imgs;
    lbIndex  = idx;
    lbImg.src = lbImages[lbIndex];
    lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function lbClose() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function lbMove(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
    lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
}

document.querySelectorAll('.photo-collage').forEach(collage => {
    const imgs = Array.from(collage.querySelectorAll('img')).map(i => i.src);
    collage.querySelectorAll('.photo-item').forEach((item, idx) => {
        item.addEventListener('click', () => lbOpen(imgs, idx));
    });
});

// Group-based lb-trigger (e.g. analiza gallery)
document.querySelectorAll('.lb-trigger[data-group]').forEach(img => {
    img.addEventListener('click', () => {
        const group = img.dataset.group;
        const all = Array.from(document.querySelectorAll(`.lb-trigger[data-group="${group}"]`));
        lbOpen(all.map(i => i.src), all.indexOf(img));
    });
});

document.getElementById('lbClose').addEventListener('click', lbClose);
document.getElementById('lbPrev').addEventListener('click', () => lbMove(-1));
document.getElementById('lbNext').addEventListener('click', () => lbMove(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lbClose(); });
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbMove(-1);
    if (e.key === 'ArrowRight') lbMove(1);
});

// ===== LANGUAGE DROPDOWN (Google Translate via cookie) =====
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function setLangCookie(lang) {
    if (lang) {
        document.cookie = `googtrans=/mk/${lang}; path=/`;
        document.cookie = `googtrans=/mk/${lang}; path=/; domain=${location.hostname}`;
    } else {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname}`;
    }
}

const langLabels = { '': 'МК', 'en': 'EN', 'sq': 'SQ', 'de': 'DE' };
const cookieVal  = getCookie('googtrans') || '';
const activeLang = cookieVal.startsWith('/mk/') ? cookieVal.replace('/mk/', '') : '';

const langBtn  = document.getElementById('langToggle');
const langWrap = document.getElementById('langDropdownWrap');
const langOpts = document.getElementById('langOptions');

langBtn.textContent = (langLabels[activeLang] || 'МК') + ' ▾';

// Mark active option
langOpts.querySelectorAll('li').forEach(li => {
    if (li.dataset.lang === activeLang) li.classList.add('active');
});

langBtn.addEventListener('click', e => {
    e.stopPropagation();
    langWrap.classList.toggle('open');
});

langOpts.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        setLangCookie(li.dataset.lang);
        location.reload();
    });
});

document.addEventListener('click', () => langWrap.classList.remove('open'));

// ===== ACCORDION =====
document.querySelectorAll('.acc-header').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item.open').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===== MOBILE MENU =====
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mainNav').classList.remove('open');
    });
});
