// --- DEBUG & ERROR HANDLING ---
window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error('Handled Error: ', msg, url, lineNo);
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.remove();
    return false;
};

// --- CORE UI INITIALIZATION ---
const initUI = () => {
    // Feature 20: Particle Background Logic
    try {
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
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
        }
    } catch (e) { console.error("Particles Failed", e); }

    // Feature 11: Cursor
    try {
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');

        if (dot && outline) {
            let mouseX = 0, mouseY = 0;
            let outlineX = 0, outlineY = 0;

            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;

                // Position dot immediately (centered)
                dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
                dot.style.opacity = '1';
                outline.style.opacity = '1';
            });

            const animateCursor = () => {
                // Smooth interpolation for outline (centered)
                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;

                outline.style.transform = `translate3d(${outlineX - 17}px, ${outlineY - 17}px, 0)`;
                requestAnimationFrame(animateCursor);
            };
            animateCursor();

            // Click Effect
            window.addEventListener('mousedown', () => {
                outline.style.transform += ' scale(0.8)';
                outline.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            });
            window.addEventListener('mouseup', () => {
                outline.style.backgroundColor = 'transparent';
            });

            // Initial state
            dot.style.opacity = '0';
            outline.style.opacity = '0';
            if (window.innerWidth > 1024) document.body.style.cursor = 'none';
        }
    } catch (e) { console.error("Cursor Failed", e); }

    // Feature 3: Magnetic Buttons Logic
    try {
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
    } catch (e) { console.error("Magnetic Buttons Failed", e); }

    // Feature 1: Portfolio Filtering Logic
    try {
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
    } catch (e) { console.error("Portfolio Filter Failed", e); }

    // Feature 5: Terminal Logic
    try {
        const termInput = document.getElementById('term-input');
        const termContent = document.getElementById('terminal-content');
        if (termInput && termContent) {
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
        }
    } catch (e) { console.error("Terminal Failed", e); }

    // Feature 2: 3D Tilt Logic
    try {
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
    } catch (e) { console.error("Tilt Logic Failed", e); }

    // Feature 4: Testimonial Slider Logic
    try {
        const slider = document.getElementById('testimonial-slider');
        const prevBtn = document.getElementById('prev-test');
        const nextBtn = document.getElementById('next-test');
        let currentSlide = 0;
        function updateSlider() {
            if (slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        if (nextBtn) nextBtn.onclick = () => { currentSlide = (currentSlide + 1) % 2; updateSlider(); }
        if (prevBtn) prevBtn.onclick = () => { currentSlide = (currentSlide - 1 + 2) % 2; updateSlider(); }
    } catch (e) { console.error("Slider Failed", e); }

    // Text & Reveal
    try {
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
    } catch (e) { console.error("Reveal Logic Failed", e); }

    // Navbar & Scroll effects
    try {
        const nav = document.getElementById('nav-bg');
        const btt = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            // Navbar Background
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.replace('bg-white/0', 'bg-white/80');
                    nav.classList.replace('dark:bg-slate-950/0', 'dark:bg-slate-950/80');
                    nav.classList.replace('backdrop-blur-0', 'backdrop-blur-xl');
                } else {
                    nav.classList.replace('bg-white/80', 'bg-white/0');
                    nav.classList.replace('dark:bg-slate-950/80', 'dark:bg-slate-950/0');
                    nav.classList.replace('backdrop-blur-xl', 'backdrop-blur-0');
                }
            }

            // Back to top
            if (btt) {
                if (window.scrollY > 600) {
                    btt.style.opacity = '1';
                    btt.style.transform = 'translateY(0)';
                } else {
                    btt.style.opacity = '0';
                    btt.style.transform = 'translateY(40px)';
                }
            }
        });

        if (btt) btt.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { console.error("Scroll Logic Failed", e); }

    // Theme
    try {
        const themeBtn = document.getElementById('theme-toggle');
        const themeBtnMobile = document.getElementById('theme-toggle-mobile');
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        }
        if (themeBtn) themeBtn.onclick = toggleTheme;
        if (themeBtnMobile) themeBtnMobile.onclick = toggleTheme;
        if (localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
    } catch (e) { console.error("Theme Logic Failed", e); }

    // Mobile Menu
    try {
        const mb = document.getElementById('mobile-btn'),
            mm = document.getElementById('mobile-menu'),
            mc = document.getElementById('mobile-close');
        if (mb && mm) mb.onclick = () => mm.classList.remove('translate-x-full');
        if (mc && mm) mc.onclick = () => mm.classList.add('translate-x-full');
    } catch (e) { console.error("Mobile Menu Failed", e); }

    // Feature 21: Neural AI Chatbot Logic
    try {
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
                if (mahadKnowledge.greetings.some(word => low.includes(word))) return "Hello! I am Mahad's AI. How can I assist you today?";
                if (mahadKnowledge.skills.some(word => low.includes(word))) return "Mahad is a master of Full-Stack Development (React, Node.js, Tailwind).";
                if (mahadKnowledge.contact.some(word => low.includes(word))) return "WA: +92 314 2253977 | Email: khanmahad768@gmail.com";
                if (mahadKnowledge.pricing.some(word => low.includes(word))) return "Plans start at $499.";
                if (mahadKnowledge.about.some(word => low.includes(word))) return "I'm Mahad's virtual assistant. He has 5+ years of experience.";
                return "Interesting! Mahad can build exactly what you need.";
            };
            setTimeout(() => { typing.remove(); addMessage(getLocalResponse(text), true); }, 1000);
        }
        if (sendChat) sendChat.onclick = handleChat;
        if (chatInput) chatInput.onkeypress = (e) => { if (e.key === 'Enter') handleChat(); };
    } catch (e) { console.error("Chatbot Failed", e); }
};

// --- AUTH & FIRESTORE LOGIC ---
const initAuth = () => {
    if (!window.firebaseApp) return;
    const { auth: fAuth, db: fDb, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, doc, setDoc, getDoc, addDoc, collection, serverTimestamp } = window.firebaseApp;

    try {
        const authModal = document.getElementById('auth-modal'), authCard = document.getElementById('auth-card'), authBtn = document.getElementById('auth-btn'), closeAuth = document.getElementById('close-auth'), authOverlay = document.getElementById('auth-overlay'), loginForm = document.getElementById('login-form'), signupForm = document.getElementById('signup-form'), tabLogin = document.getElementById('tab-login'), tabSignup = document.getElementById('tab-signup'), userProfile = document.getElementById('user-profile'), userNameDisplay = document.getElementById('user-name'), logoutBtn = document.getElementById('logout-btn');

        const toggleAuthModal = (show) => {
            if (show) { authModal.classList.remove('pointer-events-none'); authModal.classList.add('opacity-100'); authCard.classList.remove('scale-95'); authCard.classList.add('scale-100'); }
            else { authModal.classList.add('pointer-events-none'); authModal.classList.remove('opacity-100'); authCard.classList.add('scale-95'); authCard.classList.remove('scale-100'); }
        };

        if (authBtn) authBtn.onclick = () => toggleAuthModal(true);
        if (closeAuth) closeAuth.onclick = () => toggleAuthModal(false);
        if (authOverlay) authOverlay.onclick = () => toggleAuthModal(false);

        if (tabLogin) tabLogin.onclick = () => { loginForm.classList.remove('hidden'); signupForm.classList.add('hidden'); tabLogin.classList.add('border-primary', 'text-primary'); tabSignup.classList.remove('border-primary', 'text-primary'); };
        if (tabSignup) tabSignup.onclick = () => { signupForm.classList.remove('hidden'); loginForm.classList.add('hidden'); tabSignup.classList.add('border-primary', 'text-primary'); tabLogin.classList.remove('border-primary', 'text-primary'); };

        if (signupForm) signupForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = signupForm.querySelector('button[type="submit"]'); btn.disabled = true;
            try {
                const name = document.getElementById('signup-name').value.trim();
                const email = document.getElementById('signup-email').value.trim().toLowerCase();
                const password = document.getElementById('signup-password').value;

                if (password.length < 6) throw new Error("Password must be at least 6 characters.");

                const cred = await createUserWithEmailAndPassword(fAuth, email, password);
                await updateProfile(cred.user, { displayName: name });

                // Try to save profile but don't crash if Firestore rules are locked
                try {
                    await setDoc(doc(fDb, "users", cred.user.uid), {
                        uid: cred.user.uid,
                        displayName: name,
                        email,
                        createdAt: serverTimestamp()
                    });
                } catch (dbErr) {
                    console.warn("Firestore Error (Permissions?): Profile data not saved in DB, but Auth was successful.", dbErr);
                }

                alert('Account Created Successfully! 🎉');
                toggleAuthModal(false);
                signupForm.reset();
            } catch (err) {
                console.error("Signup Error:", err);
                if (err.code === 'auth/email-already-in-use') alert("This email is already registered. Please go to the Login tab.");
                else if (err.code === 'auth/invalid-email') alert("Invalid email format.");
                else if (err.code === 'auth/weak-password') alert("Password is too weak. Use at least 6 characters.");
                else alert("Signup Error: " + err.message);
            } finally { btn.disabled = false; }
        };

        if (loginForm) loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button[type="submit"]'); btn.disabled = true;
            try {
                const email = document.getElementById('login-email').value.trim().toLowerCase();
                const password = document.getElementById('login-password').value;

                await signInWithEmailAndPassword(fAuth, email, password);
                alert('Welcome Back Mahad! 🚀');
                toggleAuthModal(false);
                loginForm.reset();
            } catch (err) {
                console.error("Login Error:", err);
                // Firebase combined invalid credential error
                if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                    alert("Account Not Found or Wrong Password.\n\nIMPORTANT: If you haven't created an account yet, please use the 'Sign Up' tab first.");
                } else {
                    alert("Login Failed: " + err.message);
                }
            } finally { btn.disabled = false; }
        };

        if (logoutBtn) logoutBtn.onclick = () => signOut(fAuth);

        onAuthStateChanged(fAuth, async (user) => {
            const userPhoto = document.getElementById('user-photo');
            if (user) {
                authBtn.classList.add('hidden');
                userProfile.classList.remove('hidden');

                // Set name
                let name = user.displayName;
                if (!name) {
                    try {
                        const d = await getDoc(doc(fDb, "users", user.uid));
                        if (d.exists()) name = d.data().displayName;
                    } catch (e) { }
                }
                userNameDisplay.textContent = name || user.email.split('@')[0];

                // Set photo
                if (userPhoto) {
                    userPhoto.src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || user.email)}&background=3b82f6&color=fff&bold=true`;
                    userPhoto.classList.remove('hidden');
                }
            } else {
                authBtn.classList.remove('hidden');
                userProfile.classList.add('hidden');
                if (userPhoto) userPhoto.classList.add('hidden');
            }
        });

        if (contactForm) contactForm.onsubmit = async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = true;
            try {
                await addDoc(collection(fDb, "contacts"), {
                    email: contactForm.querySelector('input[type="email"]').value,
                    message: contactForm.querySelector('textarea').value,
                    userId: fAuth.currentUser ? fAuth.currentUser.uid : 'anonymous',
                    timestamp: serverTimestamp()
                });
                if (typeof confetti === 'function') confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                alert('Message Sent! 🚀'); contactForm.reset();
            } catch (err) {
                console.error("Firestore Error:", err);
                if (err.message.includes('permission')) {
                    alert('CRITICAL: Firebase "Firestore" Rules are locked!\n\nPlease go to Firebase Console > Firestore > Rules and set them to "allow read, write: if true;" to enable messages.');
                } else {
                    alert(err.message);
                }
            } finally { btn.disabled = false; }
        };
    } catch (e) { console.error("Auth Logic Failed", e); }
};

// --- STARTUP ---
const runInit = () => {
    initUI();
    if (window.firebaseApp) initAuth();
    else window.addEventListener('firebase-ready', initAuth);
};

window.saveContact = () => {
    const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:Mahad Khan\nTEL;TYPE=CELL:03142253977\nEMAIL:khanmahad768@gmail.com\nEND:VCARD";
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = "Mahad_Khan.vcf"; a.click();
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runInit);
else runInit();
