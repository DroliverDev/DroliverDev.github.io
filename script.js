const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const year = document.getElementById('year');
const langToggle = document.getElementById('langToggle');
const langFlag = document.getElementById('langFlag');
const langLabel = document.getElementById('langLabel');
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');

year.textContent = new Date().getFullYear();

const translations = {
  en: {
    pageTitle: 'Daniele Oliveira | Portfolio',
    pageDescription:
      'Daniele Oliveira portfolio with hero, skills, and featured projects built with Tailwind CSS.',
    navAbout: 'About',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navContact: 'Contact',
    heroBio:
      'Creative full-stack developer focused on building reliable and user-friendly digital experiences. I turn ideas into responsive, modern products with clean architecture.',
    hireMe: 'Hire Me',
    skillsTitle: 'Skills Overview',
    skillsIntro:
      'A concise snapshot of the technologies and practices I use to deliver scalable, maintainable, and high-performance web applications.',
    frontendTitle: 'Frontend',
    frontend1: 'HTML5 & Accessibility',
    frontend2: 'CSS3 / Tailwind CSS',
    frontend3: 'JavaScript (ES6+)',
    frontend4: 'Responsive UI Design',
    backendTitle: 'Backend',
    backend1: 'Node.js / APIs',
    backend2: 'Database Modeling',
    backend3: 'Authentication & Security',
    backend4: 'Performance Optimization',
    othersTitle: 'Others',
    others1: 'Git & GitHub',
    others2: 'Agile Collaboration',
    others3: 'Testing & QA',
    others4: 'Problem Solving',
    projectsTitle: 'Featured Projects',
    projectsIntro: 'A few selected projects with clean architecture and polished user experience.',
    projectImage: 'Project Image',
    project1Title: 'Project One',
    project1Desc: 'Responsive web platform for service management and analytics.',
    project2Title: 'Project Two',
    project2Desc: 'Automation dashboard integrating APIs and workflow logic.',
    project3Title: 'Project Three',
    project3Desc: 'Modern portfolio CMS with lightweight, fast frontend delivery.',
    viewCode: 'View Code',
    footerRights: 'All rights reserved.',
  },
  pt: {
    pageTitle: 'Daniele Oliveira | Portfólio',
    pageDescription:
      'Portfólio de Daniele Oliveira com seção principal, habilidades e projetos em destaque.',
    navAbout: 'Sobre',
    navServices: 'Serviços',
    navPortfolio: 'Portfólio',
    navContact: 'Contato',
    heroBio:
      'Desenvolvedora full-stack criativa, focada em criar experiências digitais confiáveis e intuitivas. Transformo ideias em produtos modernos, responsivos e com arquitetura limpa.',
    hireMe: 'Fale Comigo',
    skillsTitle: 'Visão Geral de Habilidades',
    skillsIntro:
      'Um resumo das tecnologias e práticas que utilizo para entregar aplicações web escaláveis, sustentáveis e de alta performance.',
    frontendTitle: 'Frontend',
    frontend1: 'HTML5 e Acessibilidade',
    frontend2: 'CSS3 / Tailwind CSS',
    frontend3: 'JavaScript (ES6+)',
    frontend4: 'Design Responsivo',
    backendTitle: 'Backend',
    backend1: 'Node.js / APIs',
    backend2: 'Modelagem de Banco de Dados',
    backend3: 'Autenticação e Segurança',
    backend4: 'Otimização de Performance',
    othersTitle: 'Outros',
    others1: 'Git e GitHub',
    others2: 'Colaboração Ágil',
    others3: 'Testes e QA',
    others4: 'Resolução de Problemas',
    projectsTitle: 'Projetos em Destaque',
    projectsIntro: 'Alguns projetos selecionados com arquitetura limpa e ótima experiência de uso.',
    projectImage: 'Imagem do Projeto',
    project1Title: 'Projeto Um',
    project1Desc: 'Plataforma web responsiva para gestão de serviços e análises.',
    project2Title: 'Projeto Dois',
    project2Desc: 'Painel de automação com integração de APIs e regras de fluxo.',
    project3Title: 'Projeto Três',
    project3Desc: 'CMS de portfólio moderno com frontend leve e rápido.',
    viewCode: 'Ver Código',
    footerRights: 'Todos os direitos reservados.',
  },
};

function applyLanguage(lang) {
  const selected = translations[lang] ? lang : 'en';
  document.documentElement.lang = selected;

  if (pageTitle) {
    pageTitle.textContent = translations[selected].pageTitle;
    document.title = translations[selected].pageTitle;
  }

  if (pageDescription) {
    pageDescription.setAttribute('content', translations[selected].pageDescription);
  }

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[selected][key]) {
      element.textContent = translations[selected][key];
    }
  });

  if (langFlag && langLabel) {
    langFlag.src = selected === 'pt'
      ? 'assets/flag-br.svg'
      : 'assets/flag-us.svg';
    langFlag.alt = selected === 'pt' ? 'Brazil flag' : 'United States flag';
    langLabel.textContent = selected.toUpperCase();
  }

  localStorage.setItem('language', selected);
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const opened = mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!opened));
  });
}

if (mobileMenu && menuBtn) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const current = document.documentElement.lang === 'pt' ? 'pt' : 'en';
    applyLanguage(current === 'pt' ? 'en' : 'pt');
  });
}

const storedLang = localStorage.getItem('language');
const browserLang = navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
applyLanguage(storedLang || browserLang);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function smoothScrollTo(targetY, duration = 1100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const section = document.querySelector(targetId);
    if (!section) return;

    event.preventDefault();

    if (prefersReducedMotion) {
      section.scrollIntoView();
      return;
    }

    const targetY = section.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(targetY, 1100);
  });
});
