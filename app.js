/* 
   Bhumish Panchal - Executive Portfolio Application Logic
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
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

    // Particle nodes representing eco-cooling thermodynamics
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

      // Render Nature Green & Industrial Liquid Fluid Stream Waves
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

      // Render Floating Eco Particles & Telemetry Connections
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

        // Connect nearby nodes with subtle eco-green laser lines
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
    showToast(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} Mode`);
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
      title: 'AI Server & Data Center Liquid Cooling Solutions',
      category: 'Next-Gen R&D Innovation',
      client: 'Atlas Copco Group / High-Density Data Center R&D',
      context: 'Pioneering advanced liquid cooling architectures and thermal management systems designed specifically for high-density AI compute clusters, GPU server racks, and hyperscale data centers.',
      problem: 'High-density AI workloads generate extreme heat flux that traditional air cooling cannot mitigate, requiring direct-to-chip liquid cooling loops, precise coolant distribution units (CDUs), dynamic pump speed regulation, and thermal failure prevention.',
      role: 'R&D Product Development Specialist',
      responsibilities: [
        'Researched and integrated high-precision thermal control logic for direct-to-chip and immersion cooling manifolds.',
        'Engineered dynamic closed-loop PID control for Coolant Distribution Units (CDUs) to regulate flow rate, inlet pressure, and fluid delta-T under peak GPU compute loads.',
        'Optimized system energy efficiency, lowering PUE (Power Usage Effectiveness) while maintaining strict safety trip thresholds.',
        'Collaborated with global thermal engineers across Europe (EMEA) and Asia on next-generation heat recovery and liquid-to-refrigerant chiller integration.'
      ],
      techStack: ['AI Server Liquid Cooling', 'Direct-to-Chip Cooling', 'CDU Control Logic', 'CODESYS', 'Thermal Telemetry', 'Precision Chillers'],
      outcome: 'Engineered high-efficiency thermal control strategies for next-generation AI infrastructure, reducing cooling power consumption while preventing thermal throttling.'
    },
    'cooling-rnd': {
      title: 'Global Industrial Cooling & HVAC Control Architecture',
      category: 'Global R&D & Product Development (NPD)',
      client: 'Atlas Copco Airtec (Belgium) / Eurochiller (Italy)',
      context: 'Collaborating across Atlas Copco Global Engineering Centers in India, Belgium, and Italy to design, optimize, and standardize control systems for new industrial AIR chillers, cooler units, and Heat Pumps used in process cooling and HVAC applications.',
      problem: 'Integrating multi-refrigerant thermodynamic circuits with dynamic compressor loading, electronic expansion valves, and variable frequency drives while ensuring high energy efficiency, fault-tolerant reliability, and seamless compliance across European and Asian regulatory standards.',
      role: 'R&D Product Development Specialist, Cooling Solutions EMEA',
      responsibilities: [
        'Developed custom control logic using CODESYS for Atlas Copco MK5 proprietary controllers.',
        'Tested, validated, and optimized control algorithms for temperature precision, pressure limits, and safety trip thresholds.',
        'Participated in PTM (Product Team Meetings), TCM (Technical Change Management), and Master Specification activities.',
        'Prepared technical documentation, sales calculation tools, and application guidance for global Customer Centers.'
      ],
      techStack: ['CODESYS', 'Atlas Copco MK5 Controller', 'Industrial AIR Chillers', 'Heat Pumps', 'HVAC Protocols', 'Modbus / Ethernet/IP'],
      outcome: 'Successfully delivered robust control systems for next-generation chiller products, boosting system COP (Coefficient of Performance) and standardizing control logic across international manufacturing sites.'
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
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  function showToast(message) {
    const toast = document.getElementById('toastAlert');
    const toastMsg = document.getElementById('toastMessage');
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  // 8. Contact Form Simulation
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Thank you! Your message has been prepared for Bhumish Panchal.');
    contactForm.reset();
  });
});
