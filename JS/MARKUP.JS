import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// ============================================
// FIREBASE INITIALIZATION
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyCAcbDT8t145V0PHEUSNTrbpmPFqY9T52k",
    authDomain: "makeup-web-b98cc.firebaseapp.com",
    projectId: "makeup-web-b98cc",
    storageBucket: "makeup-web-b98cc.firebasestorage.app",
    messagingSenderId: "17542687309",
    appId: "1:17542687309:web:a5f28677426cddad4c0a04",
    measurementId: "G-0WN99W5N0H"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
    console.warn("Persistence failed:", err.code);
});

// ============================================
// GLOBAL STATE
// ============================================
let confirmationResult = null;
let currentUser = null;

// ============================================
// AUTH MODAL UI MANAGEMENT
// ============================================
function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    switchAuthTab('login');
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
    clearAuthStatus();
}

function switchAuthTab(tab) {
    const loginSection = document.getElementById('loginFormSection');
    const signupSection = document.getElementById('signupFormSection');
    const phoneSection = document.getElementById('phoneAuthSection');
    const tabs = document.querySelectorAll('.auth-tab');

    if (!loginSection) return;

    loginSection.style.display = 'none';
    signupSection.style.display = 'none';
    phoneSection.style.display = 'none';
    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'login') {
        loginSection.style.display = 'block';
        tabs[0].classList.add('active');
    } else if (tab === 'signup') {
        signupSection.style.display = 'block';
        tabs[1].classList.add('active');
    }
}

function showSectionAuth(section) {
    document.getElementById('loginFormSection').style.display = 'none';
    document.getElementById('signupFormSection').style.display = 'none';
    document.getElementById('phoneAuthSection').style.display = 'none';

    if (section === 'phone') {
        document.getElementById('phoneAuthSection').style.display = 'block';
    } else {
        document.getElementById('loginFormSection').style.display = 'block';
    }
}

function showAuthStatus(msg, isError = false) {
    const statusDiv = document.getElementById('authStatus');
    if (!statusDiv) return;
    statusDiv.style.display = 'block';
    statusDiv.style.color = isError ? '#d33' : '#28a745';
    statusDiv.textContent = msg;
}

function clearAuthStatus() {
    const statusDiv = document.getElementById('authStatus');
    if (statusDiv) statusDiv.style.display = 'none';
}

// ============================================
// FIREBASE AUTH LOGIC
// ============================================
function initRecaptcha() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'normal'
        });
    }
}

async function sendOTP() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (!phoneNumber) { showAuthStatus("Enter phone number", true); return; }
    try {
        initRecaptcha();
        window.confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        document.getElementById('phoneInputStep').style.display = 'none';
        document.getElementById('otpInputStep').style.display = 'block';
        showAuthStatus("OTP sent!");
    } catch (error) { showAuthStatus(error.message, true); }
}

async function verifyOTP() {
    const code = document.getElementById('verificationCode').value;
    try {
        const result = await window.confirmationResult.confirm(code);
        currentUser = result.user;
        closeAuthModal();
        handleUserLoginState(currentUser);
    } catch (error) { showAuthStatus("Invalid code", true); }
}

function handleUserLoginState(user) {
    const loginBtnNav = document.getElementById('loginBtnNav');
    const userProfileNav = document.getElementById('userProfileNav');
    const userNameNav = document.getElementById('userNameNav');

    if (user) {
        if (loginBtnNav) loginBtnNav.style.display = 'none';
        if (userProfileNav) userProfileNav.style.display = 'flex';
        if (userNameNav) userNameNav.textContent = user.displayName || user.phoneNumber || user.email.split('@')[0];

        if (document.getElementById('name')) document.getElementById('name').value = user.displayName || '';
        if (document.getElementById('email')) document.getElementById('email').value = user.email || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = user.phoneNumber || '';
    } else {
        if (loginBtnNav) loginBtnNav.style.display = 'block';
        if (userProfileNav) userProfileNav.style.display = 'none';
    }
}

async function userLogout() {
    await signOut(auth);
    currentUser = null;
    handleUserLoginState(null);
}

// ============================================
// SINGLE PAGE APPLICATION NAVIGATION
// ============================================
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link');
    sections.forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        setTimeout(() => {
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }
    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');

    const navLinksContainer = document.getElementById('navLinks');
    if (navLinksContainer) navLinksContainer.classList.remove('active');
    history.pushState(null, null, `#${sectionId}`);

    // Track page view
    logEvent(analytics, 'page_view', { page_path: sectionId });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const icon = document.querySelector('.mobile-menu i');
    if (navLinks) navLinks.classList.toggle('active');
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
}

// ============================================
// SCHEDULE & AVAILABILITY LOGIC
// ============================================
async function checkDateAvailability() {
    const dateInput = document.getElementById('date');
    const statusDiv = document.getElementById('availabilityStatus');
    if (!dateInput || !dateInput.value || !statusDiv) return;

    statusDiv.style.display = 'flex';
    statusDiv.className = 'availability-status';
    statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';

    try {
        const q = query(collection(db, "bookings"),
            where("date", "==", dateInput.value),
            where("status", "in", ["confirmed", "completed"]));
        const snap = await getDocs(q);
        if (!snap.empty) {
            statusDiv.className = 'availability-status busy';
            statusDiv.innerHTML = 'Busy! Slots limited.';
        } else {
            statusDiv.className = 'availability-status available';
            statusDiv.innerHTML = 'Fully Available';
        }
    } catch (e) { console.error(e); }
}

function updatePaymentAmount() {
    const serviceSelect = document.getElementById('service');
    const paymentSection = document.getElementById('paymentSection');
    const summaryService = document.getElementById('summaryService');
    const summaryPrice = document.getElementById('summaryPrice');
    const confirmBtn = document.getElementById('confirmBookingBtn');

    if (!serviceSelect) return;

    const opt = serviceSelect.options[serviceSelect.selectedIndex];
    const price = opt.getAttribute('data-price');

    if (price && paymentSection) {
        paymentSection.style.display = 'block';
        if (summaryService) summaryService.textContent = opt.text.split(' - ')[0];
        if (summaryPrice) summaryPrice.textContent = `₹${parseInt(price).toLocaleString()}`;
        if (confirmBtn) confirmBtn.querySelector('span').textContent = 'Confirm & Pay Securely';
    } else if (paymentSection) {
        paymentSection.style.display = 'none';
        if (confirmBtn) confirmBtn.querySelector('span').textContent = 'Confirm Booking';
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);

    onAuthStateChanged(auth, u => {
        currentUser = u;
        handleUserLoginState(u);
    });

    const dateInput = document.getElementById('date');
    if (dateInput) dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);

    // Check if offers are present
    initOffersBanner();

    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPassword').value;
            try {
                await signInWithEmailAndPassword(auth, email, pass);
                closeAuthModal();
            } catch (error) {
                let errorMsg = "Login failed: " + error.message;
                if (error.code === 'auth/configuration-not-found') {
                    errorMsg = "Login Error: Email/Password provider is not enabled in Firebase Console.";
                }
                showAuthStatus(errorMsg, true);
            }
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const pass = document.getElementById('signupPassword').value;
            try {
                const result = await createUserWithEmailAndPassword(auth, email, pass);
                await updateProfile(result.user, { displayName: name });
                await sendEmailVerification(result.user);
                showAuthStatus("Verification email sent! Check inbox.");
                setTimeout(closeAuthModal, 3000);
            } catch (error) {
                let errorMsg = "Signup failed: " + error.message;
                if (error.code === 'auth/configuration-not-found') {
                    errorMsg = "Configuration Error: Please enable 'Email/Password' in Firebase -> Authentication -> Sign-in method.";
                }
                showAuthStatus(errorMsg, true);
            }
        });
    }

    // Scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Handle Browser Back/Forward
    window.addEventListener('popstate', () => {
        const h = window.location.hash.substring(1) || 'home';
        showSection(h);
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .testimonial, .contact-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Prevent default for # links
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
});

function initOffersBanner() {
    const slides = document.querySelectorAll('.offer-slide');
    if (slides.length === 0) return;
    let curr = 0;
    setInterval(() => {
        slides[curr].classList.remove('active');
        curr = (curr + 1) % slides.length;
        slides[curr].classList.add('active');
    }, 4000);
}

// ============================================
// BOOKING SUBMISSION
// ============================================
const API_URL = 'http://localhost:5000/api';

async function submitBookingToBackend(data) {
    try {
        const r = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await r.json();
    } catch (e) { return { success: false }; }
}

function setFormLoading(form, isLoading) {
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const span = btn.querySelector('span');
    btn.disabled = isLoading;
    if (span) {
        const isPayment = document.getElementById('paymentSection')?.style.display === 'block';
        span.textContent = isLoading ? 'Processing...' : (isPayment ? 'Confirm & Pay Securely' : 'Confirm Booking');
    }
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!currentUser) {
            alert("⚠️ Please login to continue with your booking.");
            openAuthModal();
            return;
        }

        setFormLoading(this, true);
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value,
            userId: currentUser.uid,
            status: 'pending'
        };

        try {
            await addDoc(collection(db, "bookings"), data);
        } catch (e) { console.error("Firestore error:", e); }

        const res = await submitBookingToBackend(data);
        const id = res.booking_id || 'BSM' + Date.now().toString().slice(-8);

        const msg = `✨ Booking Verified! ID: ${id} ✨\nName: ${data.name}\nService: ${data.service}\nDate: ${data.date}\nTime: ${data.time}`;
        window.open(`https://wa.me/917060986289?text=${encodeURIComponent(msg)}`, '_blank');

        alert("✅ Booking Success! We are redirecting you to WhatsApp for confirmation.");
        this.reset();
        setFormLoading(this, false);
    });
}

// ============================================
// EXPORT TO GLOBAL WINDOW
// ============================================
window.showSection = showSection;
window.toggleMenu = toggleMenu;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.showSectionAuth = showSectionAuth;
window.sendOTP = sendOTP;
window.verifyOTP = verifyOTP;
window.userLogout = userLogout;
window.checkDateAvailability = checkDateAvailability;
window.updatePaymentAmount = updatePaymentAmount;
window.closeBanner = () => {
    const b = document.getElementById('offersBanner');
    if (b) b.classList.add('hidden');
};
