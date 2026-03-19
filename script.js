document.addEventListener("DOMContentLoaded", () => {
  
  // --- DICIONÁRIO DE TRADUÇÃO ---
  const translations = {
    pt: {
      "nav-home": "Início", "nav-about": "Sobre", "nav-projects": "Projetos", "nav-contact": "Contato",
      "home-hello": "Olá, eu sou", "btn-projects": "Ver Projetos", "btn-contact": "Download CV",
      "about-title": "Sobre Mim", "projects-title": "Meus Projetos",
      "about-text": "Oi! Como vocês já leram, meu nome é Kaue Zuzza, atualmente tenho 21 anos, sou um desenvolvedor Full Stack e desenvolvedor de software apaixonado por transformar ideias complexas em interfaces intuitivas e sistemas robustos. Com domínio em tecnologias como Java (Spring Boot), JavaScript, HTML/CSS e Bancos de Dados, foco em entregar projetos limpos e escaláveis. Estudo Tecnologia/programação desde a minha infancia com os cursos profissionalizantes da Empresa Microlins. Atualmente, sou graduado em Investigação Forense e Perícia Criminal - Estácio e graduando em Licenciatura em Computação - UFRA, e dedico minha expertise ao desenvolvimento do FormaTec (TCC em computação), uma plataforma inteligente voltada para a gestão e capacitação educacional, onde aplico soluções de análise de dados para prevenir a evasão escolar e otimizar o aprendizado.",
      "level-basic": "Básicos", "level-advanced": "Avançados",
      "formatec-desc": "Plataforma inteligente de gestão escolar com monitoramento e prevenção de evasão.",
      "contact-title": "Vamos conversar?",
      typing: ["Estudante de Computação", "Desenvolvedor de Software", "Entusiasta UI/UX"]
    },
    en: {
      "nav-home": "Home", "nav-about": "About", "nav-projects": "Projects", "nav-contact": "Contact",
      "home-hello": "Hi, I am", "btn-projects": "View Projects", "btn-contact": "Download CV",
      "about-title": "About Me", "projects-title": "My Projects",
        "about-text": "Hi! As you've already read, my name is Kaue Zuzza, I'm currently 21 years old, a Full Stack developer and software developer passionate about transforming complex ideas into intuitive interfaces and robust systems. Proficient in technologies such as Java (Spring Boot), JavaScript, HTML/CSS, and Databases, I focus on delivering clean and scalable projects. I've been studying technology/programming since childhood with vocational courses from Microlins. Currently, I hold a degree in Forensic Investigation and Criminalistics from Estácio and am pursuing a degree in Computer Science from UFRA. I dedicate my expertise to developing FormaTec (my final project in Computer Science), an intelligent platform focused on educational management and training, where I apply data analysis solutions to prevent school dropout and optimize learning.",
      "level-basic": "Basic", "level-advanced": "Advanced",
      "formatec-desc": "Intelligent school management platform with monitoring and dropout prevention.",
      "contact-title": "Let's Talk?",
      typing: ["Computer Science Student", "Software Developer", "UI/UX Enthusiast"]
    }
  };

  let currentLang = 'pt';

  // --- EFEITO DE DIGITAÇÃO ---
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  function type() {
    const currentArray = translations[currentLang].typing;
    const fullText = currentArray[textIndex];

    if (isDeleting) {
      typingElement.innerText = fullText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.innerText = fullText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === fullText.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pausa no final
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % currentArray.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // --- ALTERNAR IDIOMA ---
  const langBtn = document.getElementById("lang-toggle");
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    langBtn.innerText = currentLang === 'pt' ? 'EN' : 'PT';
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.innerText = translations[currentLang][key];
    });
  });
  
  const themeBtn = document.getElementById("theme-toggle");

// Estado inicial (garante consistência)
if (themeBtn.checked) {
  document.body.classList.remove("light"); // dark
} else {
  document.body.classList.add("light"); // light
}

// Evento de mudança
themeBtn.addEventListener("change", () => {
  if (themeBtn.checked) {
    // DARK MODE
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    // LIGHT MODE
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  }
});
  // --- INICIALIZAÇÕES ---
  type();
  AOS.init({ duration: 1000, once: true });

  // --- CONFIGURAÇÃO DE PARTÍCULAS (RESPONSIVA) ---
  // --- CONFIGURAÇÃO DE PARTÍCULAS INTERATIVAS (FUGINDO DO MOUSE) ---
  const isMobile = window.innerWidth < 768;

  particlesJS("particles-js", {
    particles: {
      number: { 
        value: isMobile ? 25 : 70, // Aumentei um pouco para o efeito de "fuga" ficar mais visível
        density: { enable: true, value_area: 800 } 
      },
      color: { value: "#6c63ff" },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: 3 },
      line_linked: { 
        enable: true, 
        distance: 150, 
        color: "#6c63ff", 
        opacity: 0.2, 
        width: 1 
      },
      move: { 
        enable: true, 
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: { 
        // Aqui ativamos o efeito de repulsão (fugir)
        onhover: { 
          enable: !isMobile, 
          mode: "repulse" 
        },
        onclick: { 
          enable: true, 
          mode: "push" // Ao clicar, adiciona mais partículas
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 120, // Distância que elas fogem do mouse
          duration: 0.4
        },
        push: {
          particles_nb: 4 // Quantidade de partículas novas ao clicar
        }
      }
    },
    retina_detect: true
  });
});