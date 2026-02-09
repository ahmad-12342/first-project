// Feature 16: Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.visibility = 'hidden';
        }, 800);
    }, 1500);
});

// Feature 20: Particle Background Logic
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();


// Feature 11: Cursor
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    outline.animate({ transform: `translate(${e.clientX - 20}px, ${e.clientY - 20}px)` }, { duration: 500, fill: "forwards" });
});

// Feature 3: Magnetic Buttons Logic
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
    });
});

// Feature 7: VCard (Save Contact)
function saveContact() {
    const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:Mahad Khan\nTEL;TYPE=CELL:03142253977\nEMAIL:khanmahad768@gmail.com\nURL:https://mahad-portfolio.dev\nEND:VCARD";
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "Mahad_Khan.vcf";
    a.click();
}

// Feature 1: Portfolio Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 500);
            }
        });
    });
});

// Feature 5: Terminal Logic
const termInput = document.getElementById('term-input');
const termContent = document.getElementById('terminal-content');
termInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.toLowerCase().trim();
        const line = document.createElement('div');
        line.innerHTML = `<span class="text-yellow-400">root@mahad:</span>~ ${cmd}`;
        termContent.insertBefore(line, termInput.parentElement);

        const response = document.createElement('div');
        if (cmd === 'help') response.innerHTML = "Available commands: bio, skills, contact, clear";
        else if (cmd === 'bio') response.innerHTML = "Mahad Khan: A digital architect building next-gen solutions.";
        else if (cmd === 'skills') response.innerHTML = "React, Node.js, Tailwind, SEO, Growth Hacking.";
        else if (cmd === 'contact') response.innerHTML = "Email: khanmahad768@gmail.com | WA: +923142253977";
        else if (cmd === 'clear') {
            termContent.innerHTML = '';
            termContent.appendChild(termInput.parentElement);
        } else response.innerHTML = `Command not found: ${cmd}`;

        if (cmd !== 'clear') termContent.insertBefore(response, termInput.parentElement);
        termInput.value = '';
        termContent.scrollTop = termContent.scrollHeight;
    }
});

// Feature 2: 3D Tilt Logic
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});
document.querySelectorAll('a, button, input, textarea, .glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
});

// Feature 4: Testimonial Slider Logic
const slider = document.getElementById('testimonial-slider');
const prevBtn = document.getElementById('prev-test');
const nextBtn = document.getElementById('next-test');
let currentSlide = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

if (nextBtn) {
    nextBtn.onclick = () => {
        currentSlide = (currentSlide + 1) % 2; // Assuming 2 slides for now
        updateSlider();
    }
}
if (prevBtn) {
    prevBtn.onclick = () => {
        currentSlide = (currentSlide - 1 + 2) % 2;
        updateSlider();
    }
}

// Text & Reveal
const typingWords = ["Next-Gen Developer", "Creative Lead", "Digital Architect"];
let wordIdx = 0, charIdx = 0, isDeleting = false;
function type() {
    const el = document.getElementById('typing');
    if (!el) return;
    const current = typingWords[wordIdx];
    el.textContent = isDeleting ? current.substring(0, charIdx - 1) : current.substring(0, charIdx + 1);
    charIdx = isDeleting ? charIdx - 1 : charIdx + 1;
    let speed = isDeleting ? 70 : 130;
    if (!isDeleting && charIdx === current.length) { isDeleting = true; speed = 2500; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % typingWords.length; speed = 500; }
    setTimeout(type, speed);
}
type();

// Counters
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.querySelector('.counter')) {
                entry.target.querySelectorAll('.counter').forEach(count => {
                    const target = +count.dataset.target;
                    const update = () => {
                        const c = +count.innerText;
                        if (c < target) { count.innerText = Math.ceil(c + target / 100); setTimeout(update, 10); } else count.innerText = target;
                    };
                    update();
                });
            }
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.text-reveal').forEach(el => observer.observe(el));

// Back to top
const btt = document.getElementById('back-to-top');
if (btt) {
    btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btt.style.opacity = '1';
            btt.style.transform = 'translateY(0)';
        } else {
            btt.style.opacity = '0';
            btt.style.transform = 'translateY(40px)';
        }
    });
}

// Theme
const themeBtn = document.getElementById('theme-toggle');
const themeBtnMobile = document.getElementById('theme-toggle-mobile');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

if (themeBtn) themeBtn.onclick = toggleTheme;
if (themeBtnMobile) themeBtnMobile.onclick = toggleTheme;

if (localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');

// Mobile Menu
const mb = document.getElementById('mobile-btn'),
    mm = document.getElementById('mobile-menu'),
    mc = document.getElementById('mobile-close');

if (mb) mb.onclick = () => mm.classList.remove('translate-x-full');
if (mc) mc.onclick = () => mm.classList.add('translate-x-full');

// Feature 21: Neural AI Chatbot Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendChat = document.getElementById('send-chat');
const chatMessages = document.getElementById('chat-messages');

if (chatbotToggle) chatbotToggle.onclick = () => chatbotContainer.classList.toggle('active');
if (closeChat) closeChat.onclick = () => chatbotContainer.classList.remove('active');

function addMessage(content, isBot = false) {
    const msg = document.createElement('div');
    msg.className = `message ${isBot ? 'bot' : 'user'}`;
    msg.textContent = content;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typing-id';
    typing.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
}

async function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, false);
    chatInput.value = '';
    const typing = showTyping();

    // --- LOCAL KNOWLEDGE BASE (Mahad's Brain) ---
    const mahadKnowledge = {
        greetings: ['hi', 'hello', 'hey', 'asalam', 'namaste'],
        skills: ['skill', 'expert', 'tech', 'language', 'know', 'react', 'node', 'tailwind'],
        contact: ['contact', 'whatsapp', 'email', 'number', 'reach', 'call', 'talk'],
        pricing: ['price', 'cost', 'budget', 'hire', 'money', 'charge'],
        about: ['who', 'mahad', 'you', 'name', 'experience', 'work'],
        mood: ['how are you', 'kaise ho', 'fine', 'good'],
        thanks: ['thank', 'shukriya', 'nice', 'awesome']
    };

    const getLocalResponse = (input) => {
        const low = input.toLowerCase();
        if (mahadKnowledge.greetings.some(word => low.includes(word))) return "Hello! I am Mahad's AI. How can I assist you with his portfolio today?";
        if (mahadKnowledge.skills.some(word => low.includes(word))) return "Mahad is a master of Full-Stack Development, specifically with React, Node.js, and Tailwind CSS. He specializes in high-end web apps.";
        if (mahadKnowledge.contact.some(word => low.includes(word))) return "You can reach Mahad at +92 314 2253977 or email him at khanmahad768@gmail.com. We should connect!";
        if (mahadKnowledge.pricing.some(word => low.includes(word))) return "Mahad's plans start at $499. For unique custom projects, he provides special quotes after a meeting.";
        if (mahadKnowledge.about.some(word => low.includes(word))) return "I am Mahad's Virtual Assistant. Mahad has 5+ years of experience and is currently the Web Lead at ScaleX.";
        if (mahadKnowledge.mood.some(word => low.includes(word))) return "I'm running at peak performance! How can I help you build your dream project?";
        if (mahadKnowledge.thanks.some(word => low.includes(word))) return "You're welcome! Mahad always strives for perfection. Anything else?";
        return "That's interesting! While I'm still learning, I can tell you that Mahad can handle any complex web challenge. Would you like to see his projects or contact him?";
    };

    // --- ATTEMPT GEMINI API ---
    try {
        const GEMINI_KEY = 'YOUR_GEMINI_API_KEY_HERE';

        if (GEMINI_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: `Role: Professional Portfolio Assistant for Mahad Khan. Skills: React, Node, Tailwind. Question: ${text}` }] }]
                })
            });
            const data = await response.json();
            if (data.candidates && data.candidates[0]) {
                typing.remove();
                addMessage(data.candidates[0].content.parts[0].text, true);
                return;
            }
        }
    } catch (e) {
        console.error("API Failed, using local brain");
    }

    // --- FALLBACK (Always Works) ---
    setTimeout(() => {
        typing.remove();
        addMessage(getLocalResponse(text), true);
    }, 1000);
}

if (sendChat) sendChat.onclick = handleChat;
if (chatInput) chatInput.onkeypress = (e) => {
    if (e.key === 'Enter') handleChat();
};

// --- AUTH & FIRESTORE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    if (!window.firebaseApp) return;

    const {
        auth: fAuth,
        db: fDb,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        doc,
        setDoc,
        addDoc,
        collection,
        serverTimestamp
    } = window.firebaseApp;

    const authModal = document.getElementById('auth-modal');
    const authCard = document.getElementById('auth-card');
    const authBtn = document.getElementById('auth-btn');
    const closeAuth = document.getElementById('close-auth');
    const authOverlay = document.getElementById('auth-overlay');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const userProfile = document.getElementById('user-profile');
    const userNameDisplay = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');

    // Toggle Modal
    const toggleAuthModal = (show) => {
        if (show) {
            authModal.classList.remove('pointer-events-none');
            authModal.classList.add('opacity-100');
            authCard.classList.remove('scale-95');
            authCard.classList.add('scale-100');
        } else {
            authModal.classList.add('pointer-events-none');
            authModal.classList.remove('opacity-100');
            authCard.classList.add('scale-95');
            authCard.classList.remove('scale-100');
        }
    };

    if (authBtn) authBtn.onclick = () => toggleAuthModal(true);
    if (closeAuth) closeAuth.onclick = () => toggleAuthModal(false);
    if (authOverlay) authOverlay.onclick = () => toggleAuthModal(false);

    // Tab Switching
    if (tabLogin) tabLogin.onclick = () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabLogin.classList.add('border-primary', 'text-primary');
        tabLogin.classList.remove('border-transparent', 'text-slate-400');
        tabSignup.classList.remove('border-primary', 'text-primary');
        tabSignup.classList.add('border-transparent', 'text-slate-400');
    };

    if (tabSignup) tabSignup.onclick = () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        tabSignup.classList.add('border-primary', 'text-primary');
        tabSignup.classList.remove('border-transparent', 'text-slate-400');
        tabLogin.classList.remove('border-primary', 'text-primary');
        tabLogin.classList.add('border-transparent', 'text-slate-400');
    };

    // Signup Logic
    if (signupForm) signupForm.onsubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(fAuth, email, password);
            const user = userCredential.user;

            // Save additional data to Firestore
            await setDoc(doc(fDb, "users", user.uid), {
                uid: user.uid,
                displayName: name,
                email: email,
                createdAt: serverTimestamp()
            });

            alert('Account created successfully! 🎉');
            toggleAuthModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    // Login Logic
    if (loginForm) loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await signInWithEmailAndPassword(fAuth, email, password);
            alert('Welcome back! 🚀');
            toggleAuthModal(false);
        } catch (error) {
            alert(error.message);
        }
    };

    // Logout Logic
    if (logoutBtn) logoutBtn.onclick = async () => {
        try {
            await signOut(fAuth);
            alert('Logged out successfully.');
        } catch (error) {
            alert(error.message);
        }
    };

    // Auth State Listener
    if (fAuth) onAuthStateChanged(fAuth, (user) => {
        if (user) {
            authBtn.classList.add('hidden');
            userProfile.classList.remove('hidden');
            userNameDisplay.textContent = user.displayName || user.email.split('@')[0];
        } else {
            authBtn.classList.remove('hidden');
            userProfile.classList.add('hidden');
        }
    });

    // Contact Form -> Firestore
    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        try {
            await addDoc(collection(fDb, "contacts"), {
                email: email,
                message: message,
                userId: fAuth.currentUser ? fAuth.currentUser.uid : 'anonymous',
                timestamp: serverTimestamp()
            });

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: {
                        y: 0.6
                    },
                    colors: ['#3b82f6', '#8b5cf6', '#ffffff']
                });
            }
            alert('Message Sent & Saved! 🚀');
            contactForm.reset();
        } catch (error) {
            alert('Error saving message: ' + error.message);
        }
    };
});
