/* 
   Bhumish Panchal - Executive Portfolio Application Logic
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect & Mobile Drawer
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileToggle?.addEventListener('click', () => {
    mobileMenuOverlay?.classList.add('active');
    mobileMenuOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });

  function closeMobileMenu() {
    mobileMenuOverlay?.classList.remove('active');
    mobileMenuOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  mobileMenuClose?.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay?.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) closeMobileMenu();
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 2. Nature Green Protection & Industrial Cooling Animated Background Canvas
  initEcoCoolingCanvas();

  function initEcoCoolingCanvas() {
    const canvas = document.getElementById('ecoCoolingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: Math.random() > 0.4 ? 'rgba(34, 197, 94, ' : 'rgba(6, 182, 212, ',
        opacity: Math.random() * 0.5 + 0.2,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8 - 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }

    let waveOffset = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      waveOffset += 0.015;
      
      // Wave 1: Eco Emerald Stream
      ctx.beginPath();
      ctx.moveTo(0, height * 0.65);
      for (let x = 0; x <= width; x += 20) {
        const y = Math.sin(x * 0.004 + waveOffset) * 35 + Math.cos(x * 0.002 + waveOffset) * 20 + height * 0.65;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad1 = ctx.createLinearGradient(0, height * 0.5, width, height);
      grad1.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      grad1.addColorStop(1, 'rgba(6, 182, 212, 0.04)');
      ctx.fillStyle = grad1;
      ctx.fill();

      // Wave 2: Cyan Thermal Stream
      ctx.beginPath();
      ctx.moveTo(0, height * 0.72);
      for (let x = 0; x <= width; x += 20) {
        const y = Math.sin(x * 0.003 - waveOffset * 0.8) * 45 + height * 0.72;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad2 = ctx.createLinearGradient(0, height * 0.6, width, height);
      grad2.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
      grad2.addColorStop(1, 'rgba(34, 197, 94, 0.08)');
      ctx.fillStyle = grad2;
      ctx.fill();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.opacity += Math.sin(waveOffset * p.pulseSpeed * 10) * 0.005;
        const currentOpacity = Math.max(0.1, Math.min(0.7, p.opacity));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + currentOpacity + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // 3. Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('bp_portfolio_theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bp_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`, 'info');
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'light') {
      icon.className = 'fas fa-moon';
    } else {
      icon.className = 'fas fa-sun';
    }
  }

  // 4. Case Studies Data & Modal Handler
  const caseStudiesData = {
    'ai-server-cooling': {
      title: 'Multi-Unit Cooling Control with Centralized Master Panel',
      category: 'Centralized Master Control Systems',
      client: 'Atlas Copco Group / EMEA R&D',
      context: 'Development of a centralized control architecture for installations with multiple cooling units operating as a single system. A master controller coordinates individual units through a server-based configuration, allowing the overall cooling capacity to be adapted according to actual system demand.',
      problem: 'The main challenge was to coordinate multiple cooling units while maintaining stable temperature control, efficient capacity utilization, and balanced unit operation. The control strategy determines which units should operate, their required capacity, and fan operation based on system demand and configured operating conditions. The architecture also supports unit sequencing, load sharing, operating-status monitoring, and protection handling.',
      role: 'Product Leader – Cooling Solutions EMEA',
      responsibilities: [
        'Developed multi-unit master control logic to coordinate multiple cooling units from a centralized control panel based on required cooling capacity.',
        'Implemented intelligent sequencing and capacity management, including unit ON/OFF decisions, fan control, load distribution, and operating-priority logic.',
        'Tested and validated the complete system through loop testing and in-machine testing, refining the control algorithms for stable and reliable operation.',
        'Coordinated international engineering teams and technical delivery, including PTMs, control specifications, documentation, training, and Global Customer Center support.'
      ],
      techStack: ['CODESYS', 'Master/Slave Control', 'Multi-Unit Sequencing', 'Capacity Management', 'Fan Speed Control', 'Load Sharing', 'System Monitoring'],
      outcome: 'Enabled multiple cooling units to operate as one coordinated system through centralized master control. Improved capacity utilization and operating efficiency by matching active units and fan operation to actual cooling demand. Reduced unnecessary unit operation through automatic sequencing and demand-based control. Created a scalable control architecture that can be adapted to different system capacities and field configurations.'
    },
    'cooling-rnd': {
      title: 'Global Energy-Efficient Cooler & Adiabatic Control Architecture',
      category: 'New Energy-Efficient Air Cooler & Adiabatic Cooling System',
      client: 'Atlas Copco Group / EMEA R&D',
      context: 'Collaborating with international R&D and engineering teams across Europe and Asia to develop, upgrade, and standardize control systems for air coolers and adiabatic coolers used in industrial cooling applications. The project focuses on improving the existing control architecture through advanced sequencing, demand-based adiabatic operation, optimized fan control, water-saving strategies, automatic cleaning functions, reverse fan operation, and robust protection logic.',
      problem: 'Developing a sophisticated yet reliable control strategy for air and adiabatic cooling systems that can achieve high cooling performance with lower energy and water consumption. The key challenge was to coordinate multiple operating functions—including fan control, adiabatic water management, automatic cleaning, reverse operation, antifreeze protection, temperature/pressure monitoring, and safety functions—while maintaining stable operation under changing ambient and load conditions. The control philosophy was designed to make the system more autonomous, energy-efficient, water-conscious, and easier to operate and maintain, while supporting different customer and regional requirements.',
      role: 'Product Leader – Cooling Solutions EMEA',
      responsibilities: [
        'Led control-system product development for air and adiabatic coolers, including advanced CODESYS logic for fan control, water management, automatic cleaning, reverse operation, and antifreeze protection.',
        'Coordinated international R&D teams through regular Local & Division PTMs, aligning technical requirements, project timelines, testing activities, and product development priorities.',
        'Tested and validated the complete control strategy through loop testing and in-machine testing, optimizing algorithms for reliable, stable, energy-efficient, and water-conscious operation.',
        'Owned technical delivery and knowledge transfer, including control specifications, documentation release, training programs, and coordination with Global Customer Centers.'
      ],
      techStack: ['Air Coolers', 'Adiabatic Systems', 'CODESYS', 'Fan Control', 'Water Management', 'Antifreeze Protection'],
      outcome: 'Delivered a more automated and intelligent cooler control platform, reducing the need for manual operation through automatic cleaning, adiabatic management, and antifreeze functions. Improved energy and water management through demand-based fan and adiabatic control, avoiding unnecessary cooling and water usage. Established a validated and standardized control approach through systematic loop and machine testing, improving reliability before product release. Enabled global engineering and customer-center adoption through structured documentation, training, and technical coordination.'
    },
    'plantpax-dcs': {
      title: 'Rockwell PlantPAx DCS & 21 CFR Part 11 Audit Integration',
      category: 'DCS & Regulatory Compliance',
      client: 'Servilink Systems / Industrial Process Client',
      context: 'Engineering an enterprise Rockwell PlantPAx Distributed Control System (DCS) for a high-precision chemical/batch processing facility requiring strict FDA 21 CFR Part 11 audit compliance.',
      problem: 'Managing complex batch sequencing, high I/O density, electronic overload protection (IMCC E300/E200), and mandatory electronic audit trails without compromising system response time or operator usability.',
      role: 'Senior Project Engineer',
      responsibilities: [
        'Configured PlantPAx DCS logic philosophy, I/O mapping, batch management, and SCADA graphics.',
        'Integrated IMCC (E300/E200 electronic overload relays) and VFDs via Ethernet/IP for real-time motor diagnostics.',
        'Implemented electronic signature verification, audit logging, and batch report generation complying with 21 CFR Part 11.',
        'Executed Factory Acceptance Testing (FAT) and Site Acceptance Testing (SAT) with client engineers.'
      ],
      techStack: ['Rockwell PlantPAx DCS', 'Studio 5000', 'FactoryTalk View', 'IMCC E300/E200', 'Ethernet/IP', '21 CFR Part 11'],
      outcome: 'Achieved 100% FAT/SAT sign-off on schedule, ensuring audit-ready compliance, continuous event reporting, and operational safety for critical plant operations.'
    },
    'scada-vfd-commissioning': {
      title: 'Integrated SCADA/VFD System Commissioning & Panel Migration',
      category: 'Field Automation & Commissioning',
      client: 'Servilink Systems Ltd.',
      context: 'Full-lifecycle upgrade and migration of legacy MCC panels to intelligent IMCC & VFD panels with centralized FactoryTalk View SCADA monitoring.',
      problem: 'Replacing aging control panels with zero unplanned plant downtime while migrating legacy I/O maps, tuning closed-loop VFD motor control, and verifying multi-node network comms.',
      role: 'Senior Project Engineer',
      responsibilities: [
        'Prepared detailed P&ID, I/O Lists, BOMs, and logic philosophy documentation.',
        'Programmed Rockwell CompactLogix PLCs and Weintek HMI screens for real-time motor trend visuals.',
        'Configured managed Ethernet switches (Cisco & Rockwell) for deterministic industrial communication.',
        'Conducted complete FAT/SAT testing and delivered hands-on technical training to client plant operators.'
      ],
      techStack: ['FactoryTalk View', 'ControlLogix / CompactLogix', 'PowerFlex VFDs', 'Cisco Managed Switches', 'Modbus RS485'],
      outcome: 'Seamless panel migration delivered on time, lowering motor energy consumption by 18% and empowering operators with intuitive alarm telemetry.'
    }
  };

  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute('data-case');
      const data = caseStudiesData[caseId];
      
      if (data) {
        populateModal(data);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function populateModal(data) {
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalClient').textContent = data.client;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalContext').textContent = data.context;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalOutcome').textContent = data.outcome;

    const respList = document.getElementById('modalResponsibilities');
    respList.innerHTML = data.responsibilities.map(r => `<li>${r}</li>`).join('');

    const techWrap = document.getElementById('modalTechStack');
    techWrap.innerHTML = data.techStack.map(t => `<span class="chip">${t}</span>`).join('');
  }

  // 5. Case Studies Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Skills Matrix Search & Filter
  const skillSearchInput = document.getElementById('skillSearchInput');
  const skillPills = document.querySelectorAll('.skill-pill');

  skillSearchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    skillPills.forEach(pill => {
      const text = pill.textContent.toLowerCase();
      if (text.includes(query)) {
        pill.style.display = 'inline-flex';
      } else {
        pill.style.display = 'none';
      }
    });
  });

  // 7. Copy Buttons & Toast Alert
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`, 'info');
        });
      }
    });
  });

  function showToast(message, type = 'info') {
    const toast = document.getElementById('toastAlert');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = toast?.querySelector('i');
    
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      
      if (type === 'error') {
        toast.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        if (toastIcon) toastIcon.className = 'fas fa-exclamation-circle';
      } else if (type === 'success') {
        toast.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        if (toastIcon) toastIcon.className = 'fas fa-check-circle';
      } else {
        toast.style.background = 'var(--accent-gradient)';
        if (toastIcon) toastIcon.className = 'fas fa-info-circle';
      }

      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  }

  // 8. Fully Functional Enquiry Form Handler (Background HTTP Delivery to bhumish.panchal@gmail.com)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const senderName = document.getElementById('senderName')?.value.trim();
    const senderEmail = document.getElementById('senderEmail')?.value.trim();
    const subject = document.getElementById('messageSubject')?.value.trim();
    const message = document.getElementById('senderMessage')?.value.trim();

    // Field Validation: Verify mandatory fields are properly filled in
    if (!senderName || !senderEmail || !subject || !message) {
      showToast('Please fill out all mandatory fields.', 'error');
      return;
    }

    // Email Address Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(senderEmail)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // UI Loading State during background transmission
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span> <i class="fas fa-spinner fa-spin"></i>`;
    }

    try {
      // Send background HTTP request via FormSubmit AJAX service directly to bhumish.panchal@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/bhumish.panchal@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          _replyto: senderEmail,
          _subject: `[Portfolio Inquiry] ${subject}`,
          subject: subject,
          message: message,
          _template: 'table'
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || result.message?.includes('success') || result.message?.includes('sent'))) {
        showToast('Message sent successfully! Thank you for reaching out.', 'success');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Enquiry Delivery Error:', error);
      showToast('Failed to send message. Please try again or email directly at bhumish.panchal@gmail.com', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });

  // 9. Interactive European Language Selector & IP Geolocation Auto-Detection
  const langSelectBtn = document.getElementById('langSelectBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langSelectorWrapper = document.querySelector('.lang-selector-wrapper');
  const currentLangFlag = document.getElementById('currentLangFlag');
  const currentLangCode = document.getElementById('currentLangCode');
  const langOptions = document.querySelectorAll('.lang-option');

  const langMap = {
    en: { flag: '🇬🇧', code: 'EN', name: 'English' },
    it: { flag: '🇮🇹', code: 'IT', name: 'Italiano' },
    fr: { flag: '🇫🇷', code: 'FR', name: 'Français' },
    de: { flag: '🇩🇪', code: 'DE', name: 'Deutsch' },
    nl: { flag: '🇳🇱', code: 'NL', name: 'Nederlands' },
    es: { flag: '🇪🇸', code: 'ES', name: 'Español' }
  };

  const countryToLang = {
    IT: 'it', // Italy -> Italian
    FR: 'fr', // France -> French
    MC: 'fr', // Monaco -> French
    DE: 'de', // Germany -> German
    AT: 'de', // Austria -> German
    CH: 'de', // Switzerland -> German
    NL: 'nl', // Netherlands -> Dutch
    BE: 'nl', // Belgium -> Dutch / French
    ES: 'es', // Spain -> Spanish
    GB: 'en', // UK -> English
    IE: 'en', // Ireland -> English
    IN: 'en', // India -> English
    US: 'en'  // USA -> English
  };

  // Toggle Language Dropdown
  langSelectBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    langSelectorWrapper?.classList.toggle('open');
    const isOpen = langSelectorWrapper?.classList.contains('open');
    langDropdown?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!langSelectorWrapper?.contains(e.target)) {
      langSelectorWrapper?.classList.remove('open');
      langDropdown?.setAttribute('aria-hidden', 'true');
    }
  });

  // Handle Option Selection
  langOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      const flag = option.getAttribute('data-flag');
      const code = option.getAttribute('data-code');

      if (lang && langMap[lang]) {
        localStorage.setItem('user_selected_lang', lang);
        applyLanguage(lang, flag, code);
      }
      langSelectorWrapper?.classList.remove('open');
    });
  });

  let googleTranslatePollTimer = null;

  function applyLanguage(lang, flag, code) {
    if (!langMap[lang]) lang = 'en';
    const targetFlag = flag || langMap[lang].flag;
    const targetCode = code || langMap[lang].code;

    if (currentLangFlag) currentLangFlag.textContent = targetFlag;
    if (currentLangCode) currentLangCode.textContent = targetCode;

    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    setGoogleTranslateCookie(lang);
    triggerGoogleTranslateSelect(lang);
  }

  function setGoogleTranslateCookie(lang) {
    const domain = window.location.hostname;
    if (lang === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
      document.cookie = `googtrans=/en/en; path=/;`;
      document.cookie = `googtrans=/en/en; path=/; domain=${domain}`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
    }
  }

  function triggerGoogleTranslateSelect(lang) {
    if (googleTranslatePollTimer) {
      clearInterval(googleTranslatePollTimer);
      googleTranslatePollTimer = null;
    }

    let attempts = 0;
    const maxAttempts = 30; // Poll up to 3s for GT widget to be ready

    function doSelect() {
      attempts++;
      const selectElem = document.querySelector('.goog-te-combo');
      if (selectElem) {
        if (googleTranslatePollTimer) {
          clearInterval(googleTranslatePollTimer);
          googleTranslatePollTimer = null;
        }

        let targetVal = lang;
        if (lang === 'en') {
          const hasEnOption = Array.from(selectElem.options || []).some(opt => opt.value === 'en');
          targetVal = hasEnOption ? 'en' : '';
        }

        selectElem.value = targetVal;
        selectElem.dispatchEvent(new Event('change', { bubbles: true }));
        selectElem.dispatchEvent(new Event('input', { bubbles: true }));
        
        if (typeof selectElem.onchange === 'function') {
          selectElem.onchange();
        }
        return true;
      }

      if (attempts >= maxAttempts) {
        if (googleTranslatePollTimer) {
          clearInterval(googleTranslatePollTimer);
          googleTranslatePollTimer = null;
        }
      }
      return false;
    }

    if (!doSelect()) {
      googleTranslatePollTimer = setInterval(doSelect, 100);
    }
  }

  async function autoDetectCountryAndLanguage() {
    const savedLang = localStorage.getItem('user_selected_lang');
    if (savedLang && langMap[savedLang]) {
      applyLanguage(savedLang);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const country = data.country_code || data.country;
        if (country && countryToLang[country]) {
          applyLanguage(countryToLang[country]);
          return;
        }
      }
    } catch (err) {
      console.log('IP Geolocation fallback to browser language:', err);
    }

    // Fallback: Browser language preference
    const browserLang = (navigator.language || navigator.userLanguage || '').substring(0, 2).toLowerCase();
    if (browserLang && langMap[browserLang]) {
      applyLanguage(browserLang);
    } else {
      applyLanguage('en');
    }
  }

  autoDetectCountryAndLanguage();
});

// Google Translate Element Global Initialization Function
window.googleTranslateElementInit = function() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,it,fr,de,nl,es',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');

  // Immediately apply selected language once GT widget mounts
  const savedLang = localStorage.getItem('user_selected_lang');
  if (savedLang && savedLang !== 'en') {
    let checkAttempts = 0;
    const interval = setInterval(() => {
      checkAttempts++;
      const selectElem = document.querySelector('.goog-te-combo');
      if (selectElem) {
        clearInterval(interval);
        selectElem.value = savedLang;
        selectElem.dispatchEvent(new Event('change', { bubbles: true }));
        selectElem.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (checkAttempts > 30) {
        clearInterval(interval);
      }
    }, 100);
  }
};
