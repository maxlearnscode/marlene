(function() {
    // Module preload support check
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;

    // Handle existing modulepreload links
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);

    // Observe for new modulepreload links
    new MutationObserver(r => {
        for (const n of r) {
            if (n.type === "childList") {
                for (const c of n.addedNodes) {
                    if (c.tagName === "LINK" && c.rel === "modulepreload") o(c);
                }
            }
        }
    }).observe(document, {
        childList: true,
        subtree: true
    });

    // Fetch preload link
    function o(r) {
        if (r.ep) return;
        r.ep = true;
        fetch(r.href);
    }
})();

function a(t, e) {
    const i = t.clientX + window.scrollX;
    const o = t.clientY + window.scrollY;
    const r = document.querySelector(".real-dark-mode-spotlight");
    if (r) {
        r.style.background = `radial-gradient(circle at ${i}px ${o}px, transparent ${(e?.size || 50) / 2}px, ${e?.color || "#000000"} ${e?.size || 100}px)`;
    }
}

function l() {
    document.body.classList.remove("real-dark-mode-enabled");
    const spotlight = document.querySelector(".real-dark-mode-spotlight");
    if (spotlight) document.body.removeChild(spotlight);
    document.removeEventListener("mousemove", a);
    document.removeEventListener("touchmove", a);
}

function s(t) {
    const e = document.createElement("div");
    if (e) {
        e.classList.add("real-dark-mode-spotlight");
        e.style.position = "absolute";
        e.style.top = "0";
        e.style.left = "0";
        e.style.width = "100%";
        e.style.height = "100vh";
        e.style.zIndex = "9999";
        e.style.pointerEvents = "none";
        e.style.opacity = `${t?.opacity || .98}`;
        return e;
    }
}

function u(t) {
    if (document.body) {
        if (document.body.classList.contains("real-dark-mode-enabled")) {
            l();
            return;
        }
        const e = s(t);
        if (e) {
            document.body.appendChild(e);
            document.body.classList.add("real-dark-mode-enabled");
            document.addEventListener("mousemove", i => a(i, t));
            document.addEventListener("touchmove", i => {
                a(i.touches[0], t);
            });
            document.addEventListener("scroll", () => {
                const spotlight = document.querySelector(".real-dark-mode-spotlight");
                if (spotlight) spotlight.remove();
            });
        }
    }
}

// Enable dark mode by default
document.addEventListener("DOMContentLoaded", () => {
    u();
});

document.getElementById("toggle").addEventListener("click", () => {
    u();
});
