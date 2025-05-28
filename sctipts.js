// Custom Cursor Effect - только для десктопов
const cursor = document.querySelector('.cursor-glow');

// Проверяем, что элемент курсора существует и это не тач-устройство
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
const isDesktop = window.matchMedia('(min-width: 1025px)').matches;

if (cursor && !isTouchDevice && isDesktop) {
    // Показываем курсор сразу
    cursor.style.display = 'block';
    cursor.style.opacity = '1';
    
    // Мгновенное следование за мышью без задержек
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = (e.clientX - 10) + 'px';
        cursor.style.top = (e.clientY - 10) + 'px';
    });
    
    // Мгновенно показываем/скрываем курсор
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Мгновенное изменение при наведении
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, .phishing-card, .quiz-option')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = '#ff006e';
            cursor.style.boxShadow = '0 0 30px #ff006e';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.matches('a, button, .phishing-card, .quiz-option')) {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#00d4ff';
            cursor.style.boxShadow = '0 0 20px #00d4ff';
        }
    });
} else if (cursor) {
    // Скрываем курсор на мобильных устройствах
    cursor.style.display = 'none';
}

// Мобильное меню - улучшенная версия
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const navContainer = navbar.querySelector('.nav-container');
    
    // Проверяем, существует ли уже кнопка
    let menuButton = document.querySelector('.menu-toggle');
    
    if (window.innerWidth <= 480) {
        if (!menuButton) {
            // Создаем кнопку бургер-меню
            menuButton = document.createElement('button');
            menuButton.className = 'menu-toggle';
            menuButton.innerHTML = '☰';
            menuButton.setAttribute('aria-label', 'Toggle menu');
            
            navContainer.appendChild(menuButton);
        }
        
        // Убираем старые обработчики событий
        const newMenuButton = menuButton.cloneNode(true);
        menuButton.parentNode.replaceChild(newMenuButton, menuButton);
        menuButton = newMenuButton;
        
        let menuOpen = false;
        
        // Обработчик клика на бургер
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpen = !menuOpen;
            navLinks.classList.toggle('active');
            menuButton.innerHTML = menuOpen ? '✕' : '☰';
            
            // Добавляем анимацию
            if (menuOpen) {
                navLinks.style.display = 'flex';
                setTimeout(() => {
                    navLinks.style.transform = 'translateY(0)';
                }, 10);
            } else {
                navLinks.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
        
        // Закрываем меню при клике на ссылку
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                navLinks.classList.remove('active');
                menuButton.innerHTML = '☰';
                navLinks.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (menuOpen && !navLinks.contains(e.target) && !menuButton.contains(e.target)) {
                menuOpen = false;
                navLinks.classList.remove('active');
                menuButton.innerHTML = '☰';
                navLinks.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });
    } else if (menuButton) {
        // Удаляем кнопку на больших экранах
        menuButton.remove();
        navLinks.classList.remove('active');
        navLinks.style.display = '';
        navLinks.style.transform = '';
    }
}

// Инициализируем мобильное меню
initMobileMenu();

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// CTA Button Click
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.querySelector('#types').scrollIntoView({ behavior: 'smooth' });
    });
}

// Адаптивные анимации
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Parallax Effect on Scroll - отключаем на мобильных
if (window.innerWidth > 768 && !prefersReducedMotion) {
    let lastScrollY = window.scrollY;
    const parallaxElements = document.querySelectorAll('.wave, .hero-content');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrollY * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        lastScrollY = scrollY;
    });
} else {
    // На мобильных устройствах отключаем параллакс
    document.querySelectorAll('.wave, .hero-content').forEach(el => {
        el.style.transform = 'none';
    });
}

// Card Hover Effects with Tilt - только для десктопов
const cards = document.querySelectorAll('.phishing-card');

if (window.innerWidth > 768 && !isTouchDevice) {
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
} else {
    // На мобильных устройствах добавляем простые тач-эффекты
    cards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// Quiz Functionality
const quizData = [
    {
        question: "Вы получили email от 'вашего банка' с просьбой обновить пароль. Что делать?",
        options: [
            "Сразу перейти по ссылке и обновить пароль",
            "Проверить адрес отправителя и зайти в банк через официальный сайт",
            "Ответить на письмо и спросить, точно ли это банк",
            "Переслать письмо друзьям для проверки"
        ],
        correct: 1,
        explanation: "Всегда проверяйте адрес отправителя и заходите на сайт банка напрямую, а не через ссылки в письмах."
    },
    {
        question: "В СМС пришло: 'Ваша карта заблокирована! Срочно позвоните: +7-xxx-xxx-xx-xx'. Ваши действия?",
        options: [
            "Немедленно позвонить по указанному номеру",
            "Позвонить на горячую линию банка с официального сайта",
            "Отправить СМС с данными карты для разблокировки",
            "Проигнорировать, это точно мошенники"
        ],
        correct: 1,
        explanation: "Всегда звоните только на официальные номера банка, которые указаны на карте или сайте."
    },
    {
        question: "Что из перечисленного НЕ является признаком фишингового сайта?",
        options: [
            "Адрес сайта содержит опечатки (например, arnazon.com вместо amazon.com)",
            "Отсутствует значок замка (HTTPS) в адресной строке",
            "Сайт просит ввести пароль для входа в аккаунт",
            "Множество грамматических ошибок на странице"
        ],
        correct: 2,
        explanation: "Запрос пароля для входа - это нормальная практика. Важно убедиться, что вы на настоящем сайте."
    },
    {
        question: "Вы выиграли iPhone в конкурсе, в котором не участвовали! Что делать?",
        options: [
            "Скорее ввести данные карты для оплаты доставки",
            "Поделиться радостной новостью в соцсетях",
            "Игнорировать сообщение - это классический фишинг",
            "Перейти по ссылке и посмотреть, что там"
        ],
        correct: 2,
        explanation: "Если вы не участвовали в конкурсе, вы не могли выиграть. Это типичная схема мошенников."
    },
    {
        question: "Коллега прислал странную ссылку в мессенджере без объяснений. Что делать?",
        options: [
            "Открыть ссылку - это же коллега!",
            "Сначала уточнить у коллеги другим способом, что это за ссылка",
            "Переслать ссылку IT-отделу",
            "Открыть ссылку в режиме инкогнито"
        ],
        correct: 1,
        explanation: "Аккаунт коллеги мог быть взломан. Всегда уточняйте происхождение подозрительных ссылок."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionElement = document.querySelector('.quiz-question');
const optionsContainer = document.querySelector('.quiz-options');
const progressFill = document.querySelector('.progress-fill');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const quizContent = document.querySelector('.quiz-content');
const quizResult = document.querySelector('.quiz-result');

// Initialize quiz
function initQuiz() {
    if (totalQuestionsSpan) {
        totalQuestionsSpan.textContent = quizData.length;
    }
    loadQuestion();
}

// Load question
function loadQuestion() {
    if (!questionElement || !optionsContainer) return;
    
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedOption = null;
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'quiz-option';
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionButton);
    });
    
    // Update progress
    updateProgress();
}

// Select option
function selectOption(index) {
    // Prevent multiple selections
    if (selectedOption !== null) return;
    
    // Remove previous selection
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
    });
    
    selectedOption = index;
    const options = document.querySelectorAll('.quiz-option');
    options[index].classList.add('selected');
    
    // Show correct/incorrect after selection
    setTimeout(() => {
        const question = quizData[currentQuestion];
        if (index === question.correct) {
            options[index].classList.add('correct');
            score++;
            showFeedback(true, question.explanation);
        } else {
            options[index].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            showFeedback(false, question.explanation);
        }
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }, 3000);
    }, 500);
}

// Show feedback
function showFeedback(isCorrect, explanation) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.feedback-popup');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = 'feedback-popup';
    feedback.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${isCorrect ? 'var(--success)' : 'var(--danger)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: slideUp 0.5s ease;
        z-index: 1000;
        max-width: 500px;
        text-align: center;
    `;
    
    feedback.innerHTML = `
        <strong>${isCorrect ? '✓ Правильно!' : '✗ Неправильно!'}</strong><br>
        <small>${explanation}</small>
    `;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2500);
}

// Update progress
function updateProgress() {
    if (!progressFill || !currentQuestionSpan) return;
    
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
}

// Show result
function showResult() {
    if (!quizContent || !quizResult) return;
    
    quizContent.style.display = 'none';
    quizResult.classList.remove('hidden');
    
    const resultIcon = document.querySelector('.result-icon');
    const resultTitle = document.querySelector('.result-title');
    const resultText = document.querySelector('.result-text');
    
    const percentage = (score / quizData.length) * 100;
    
    if (resultIcon && resultTitle && resultText) {
        if (percentage >= 80) {
            resultIcon.textContent = '🛡️';
            resultTitle.textContent = 'Отлично! Вы - эксперт по безопасности!';
            resultText.textContent = `Вы правильно ответили на ${score} из ${quizData.length} вопросов. Вы отлично разбираетесь в цифровой безопасности!`;
        } else if (percentage >= 60) {
            resultIcon.textContent = '🎣';
            resultTitle.textContent = 'Хорошо! Но есть куда расти';
            resultText.textContent = `Вы правильно ответили на ${score} из ${quizData.length} вопросов. Продолжайте изучать тему цифровой безопасности!`;
        } else {
            resultIcon.textContent = '🐟';
            resultTitle.textContent = 'Будьте осторожнее!';
            resultText.textContent = `Вы правильно ответили на ${score} из ${quizData.length} вопросов. Рекомендуем внимательнее изучить материалы о фишинге.`;
        }
    }
    
    // Добавляем обработчик события после показа результата
    const restartButton = document.querySelector('.restart-quiz');
    if (restartButton) {
        restartButton.addEventListener('click', restartQuiz);
    }
}

// Restart quiz function
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedOption = null;
    
    if (quizContent && quizResult) {
        quizContent.style.display = 'block';
        quizResult.classList.add('hidden');
        loadQuestion();
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.phishing-card, .protection-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Add CSS for feedback popup animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Typing effect for hero title - адаптивная скорость
const heroTitle = document.querySelector('.glitch-text');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText[charIndex];
            charIndex++;
            // Более быстрая анимация на мобильных
            const delay = window.innerWidth > 768 ? 100 : 50;
            setTimeout(typeText, delay);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        // Меньшая задержка на мобильных
        const initialDelay = window.innerWidth > 768 ? 500 : 200;
        setTimeout(typeText, initialDelay);
    });
}

// Адаптивность при изменении размера окна
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Перепроверяем тип устройства при изменении размера
        const newIsDesktop = window.matchMedia('(min-width: 1025px)').matches;
        const newIsTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Обновляем видимость курсора
        if (cursor) {
            if (newIsDesktop && !newIsTouchDevice) {
                cursor.style.display = 'block';
            } else {
                cursor.style.display = 'none';
            }
        }
        
        // Переинициализируем мобильное меню
        initMobileMenu();
    }, 250);
});

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Не добавляем ripple для quiz-option, у них свой эффект
        if (this.classList.contains('quiz-option')) return;
        
        const existingRipple = this.querySelector('.button-ripple');
        if (existingRipple && !this.classList.contains('cta-button')) {
            existingRipple.remove();
        }
        
        const ripple = document.createElement('span');
        ripple.className = 'button-ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что все необходимые элементы существуют
    if (questionElement && optionsContainer && progressFill && currentQuestionSpan && totalQuestionsSpan && quizContent && quizResult) {
        initQuiz();
    }
});