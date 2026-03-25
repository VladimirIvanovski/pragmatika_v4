
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

// ===== LANGUAGE TOGGLE (Google Translate via cookie) =====
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

const isEN = getCookie('googtrans') === '/mk/en';
const langBtn = document.getElementById('langToggle');
langBtn.textContent = isEN ? 'МК' : 'EN';

langBtn.addEventListener('click', function () {
    if (!isEN) {
        document.cookie = 'googtrans=/mk/en; path=/';
        document.cookie = 'googtrans=/mk/en; path=/; domain=' + location.hostname;
    } else {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
    }
    location.reload();
});

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
