// Custom Cursor Effect
const cursor = document.querySelector('.cursor-glow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Проверяем, что элемент курсора существует
if (cursor) {
    // Устанавливаем начальную позицию курсора
    cursor.style.left = '0px';
    cursor.style.top = '0px';
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Для отладки - можно удалить позже
        // console.log('Mouse position:', mouseX, mouseY);
    });

    // Smooth cursor animation
    function animateCursor() {
        const speed = 0.15;
        
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        // Центрируем курсор относительно позиции мыши
        cursor.style.left = (cursorX - 10) + 'px';
        cursor.style.top = (cursorY - 10) + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Скрываем курсор при выходе за пределы окна
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
}

// Change cursor on hover
if (cursor) {
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
}

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
ctaButton.addEventListener('click', () => {
    document.querySelector('#types').scrollIntoView({ behavior: 'smooth' });
});

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
    totalQuestionsSpan.textContent = quizData.length;
    loadQuestion();
}

// Load question
function loadQuestion() {
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
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestion + 1;
}

// Show result
function showResult() {
    quizContent.style.display = 'none';
    quizResult.classList.remove('hidden');
    
    const resultIcon = document.querySelector('.result-icon');
    const resultTitle = document.querySelector('.result-title');
    const resultText = document.querySelector('.result-text');
    
    const percentage = (score / quizData.length) * 100;
    
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

// Restart quiz
document.querySelector('.restart-quiz').addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    quizContent.style.display = 'block';
    quizResult.classList.add('hidden');
    loadQuestion();
});

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

// Initialize quiz when page loads
initQuiz();

// Typing effect for hero title - адаптивная скорость
const heroTitle = document.querySelector('.glitch-text');
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