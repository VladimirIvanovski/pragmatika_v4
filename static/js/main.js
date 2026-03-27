
// ===== LIGHTBOX =====
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbCounter = document.getElementById('lbCounter');
let lbImages = [], lbIndex = 0;

function lbOpen(imgs, idx) {
    lbImages = imgs; lbIndex = idx;
    lbImg.src = lbImages[lbIndex];
    lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function lbClose() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
function lbMove(dir) {
    lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
    lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
}

document.querySelectorAll('.photo-collage').forEach(function(collage) {
    var imgs = Array.from(collage.querySelectorAll('img')).map(function(i) { return i.src; });
    collage.querySelectorAll('.photo-item').forEach(function(item, idx) {
        item.addEventListener('click', function() { lbOpen(imgs, idx); });
    });
});
document.querySelectorAll('.lb-trigger[data-group]').forEach(function(img) {
    img.addEventListener('click', function() {
        var group = img.dataset.group;
        var all = Array.from(document.querySelectorAll('.lb-trigger[data-group="' + group + '"]'));
        lbOpen(all.map(function(i) { return i.src; }), all.indexOf(img));
    });
});

document.getElementById('lbClose').addEventListener('click', lbClose);
document.getElementById('lbPrev').addEventListener('click', function() { lbMove(-1); });
document.getElementById('lbNext').addEventListener('click', function() { lbMove(1); });
lightbox.addEventListener('click', function(e) { if (e.target === lightbox) lbClose(); });
document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbMove(-1);
    if (e.key === 'ArrowRight') lbMove(1);
});

// ===== LANGUAGE DROPDOWN =====
function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}
function setLangCookie(lang) {
    if (lang) {
        document.cookie = 'googtrans=/mk/' + lang + '; path=/';
        document.cookie = 'googtrans=/mk/' + lang + '; path=/; domain=' + location.hostname;
    } else {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + location.hostname;
    }
}
var langLabels = { '': 'MK', 'en': 'EN', 'sq': 'SQ', 'de': 'DE' };
var cookieVal  = getCookie('googtrans') || '';
var activeLang = cookieVal.startsWith('/mk/') ? cookieVal.replace('/mk/', '') : '';
var langBtn    = document.getElementById('langToggle');
var langWrap   = document.getElementById('langDropdownWrap');
var langOpts   = document.getElementById('langOptions');

langBtn.textContent = (langLabels[activeLang] || 'MK') + ' \u25BE';
langOpts.querySelectorAll('li').forEach(function(li) {
    if (li.dataset.lang === activeLang) li.classList.add('active');
});
langBtn.addEventListener('click', function(e) { e.stopPropagation(); langWrap.classList.toggle('open'); });
langOpts.querySelectorAll('li').forEach(function(li) {
    li.addEventListener('click', function() { setLangCookie(li.dataset.lang); location.reload(); });
});
document.addEventListener('click', function() { langWrap.classList.remove('open'); });

// ===== ACCORDION =====
document.querySelectorAll('.acc-header').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = btn.closest('.acc-item');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.acc-item.open').forEach(function(i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
    });
});

// ===== MOBILE MENU =====
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() { document.getElementById('mainNav').classList.remove('open'); });
});

// ===== CHAT WIDGET =====
(function () {
    var widget   = document.getElementById('chatWidget');
    var messages = document.getElementById('chatMessages');
    var input    = document.getElementById('chatInput');
    var sendBtn  = document.getElementById('chatSend');
    if (!widget) return;

    function addMsg(text, role) {
        var div = document.createElement('div');
        div.className = 'chat-msg ' + role;
        var p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    async function send() {
        var text = input.value.trim();
        if (!text) return;
        input.value = '';
        sendBtn.disabled = true;
        addMsg(text, 'user');
        var typingDiv = addMsg('...', 'bot typing');
        try {
            var res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            var data = await res.json();
            typingDiv.remove();
            if (data.error) {
                addMsg(data.error, 'bot');
            } else {
                addMsg(data.reply, 'bot');
            }
        } catch (err) {
            typingDiv.remove();
            addMsg('Nastana greshka. Obidete se povtorno.', 'bot');
        }
        sendBtn.disabled = false;
        input.focus();
    }

    sendBtn.addEventListener('click', send);
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') send(); });

    var minBtn = document.getElementById('chatMinimize');
    minBtn.addEventListener('click', function() {
        var minimized = widget.classList.toggle('minimized');
        minBtn.textContent = minimized ? '+' : '\u2212';
    });
})();
