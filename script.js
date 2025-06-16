let currentSection = 1;
    const totalSections = 6;
    let videoPlaying = false;
    let typingInterval;
    let isTypingComplete = false;

    // Carica l'immagine nel canvas
    window.addEventListener('load', function() {
        const canvas = document.getElementById('photo-canvas');
        const ctx = canvas.getContext('2d');
        
        // Crea un'immagine placeholder stilizzata
        const gradient = ctx.createLinearGradient(0, 0, 300, 400);
        gradient.addColorStop(0, '#1a237e');
        gradient.addColorStop(0.5, '#3949ab');
        gradient.addColorStop(1, '#5c6bc0');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 400);
        
        // Aggiungi un effetto overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, 0, 300, 400);
        
        // Testo placeholder
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🌟 ASIA 🌟', 150, 200);
    });

    function startVideo() {
        if (videoPlaying) return;
        videoPlaying = true;
        
        // Nascondi la sezione corrente e mostra la prossima
        showSection(2);
        
        // Avvia la sequenza automatica
        let sectionTimer = setTimeout(() => {
            autoPlaySections();
        }, 4000);
    }

    function autoPlaySections() {
        if (currentSection < totalSections) {
            currentSection++;
            showSection(currentSection);
            
            // Tempo ancora più lungo per la sezione del messaggio
            let delay;
            if (currentSection === 4) {
                delay = 15000; // 15 secondi per leggere comodamente il messaggio
            } else if (currentSection === 5) {
                delay = 5000;  // 5 secondi per la torta
            } else {
                delay = 4000;  // 4 secondi per le altre sezioni
            }
            
            setTimeout(() => {
                autoPlaySections();
            }, delay);
        }
    }

    function showSection(sectionNum) {
        // Nascondi tutte le sezioni
        document.querySelectorAll('.video-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('prev');
        });
        
        // Mostra la sezione corrente
        const targetSection = document.getElementById(`section-${sectionNum}`);
        targetSection.classList.remove('prev');
        targetSection.classList.add('active');
        
        // Aggiorna la progress bar
        const progress = (sectionNum / totalSections) * 100;
        document.querySelector('.progress-fill').style.width = progress + '%';
        
        // Aggiorna i bottoni di navigazione
        updateNavButtons();
        
        // Effetti speciali per sezioni specifiche
        if (sectionNum === 4) {
            startTypingEffect();
        }
        
        if (sectionNum === 6) {
            setTimeout(() => {
                startFinalCelebration();
            }, 1000);
        }
        
        currentSection = sectionNum;
    }

    function startTypingEffect() {
        const message = "Tanti auguri alla sorellina più carina e coccolosa del mondo! 🥰<br><br>Che tu possa continuare ad essere sempre così buffa e divertente!";
        const element = document.getElementById('typing-message');
        let i = 0;
        isTypingComplete = false;
        
        element.innerHTML = '';
        
        typingInterval = setInterval(() => {
            if (i < message.length) {
                if (message[i] === '\n') {
                    element.innerHTML += '<br>';
                } else {
                    element.innerHTML += message[i];
                }
                i++;
            } else {
                clearInterval(typingInterval);
                isTypingComplete = true;
            }
        }, 150); // Rallentato ulteriormente da 100ms a 150ms per una lettura molto più confortevole
    }

    function skipTyping() {
        if (typingInterval) {
            clearInterval(typingInterval);
            const fullMessage = "Tanti auguri alla sorellina più carina e coccolosa del mondo! 🥰<br><br>Che tu possa continuare ad essere sempre così buffa e divertente!";
            document.getElementById('typing-message').innerHTML = fullMessage;
            isTypingComplete = true;
        }
    }

    function startFinalCelebration() {
        // Aggiungi più coriandoli per il finale
        const confettiContainer = document.querySelector('.confetti-container');
        const colors = ['#0d47a1', '#1976d2', '#2196f3', '#42a5f5', '#64b5f6', '#90caf9'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.animation = 'confetti-fall 3s linear forwards';
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 200);
        }
    }

    function replayVideo() {
        currentSection = 1;
        videoPlaying = false;
        isTypingComplete = false;
        showSection(1);
        
        // Reset progress bar
        document.querySelector('.progress-fill').style.width = '0%';
        
        // Clear any ongoing typing
        if (typingInterval) {
            clearInterval(typingInterval);
        }
        
        updateNavButtons();
    }

    function updateNavButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        // Disabilita il bottone indietro se siamo alla prima sezione
        prevBtn.disabled = (currentSection <= 1);
        
        // Disabilita il bottone avanti se siamo all'ultima sezione
        nextBtn.disabled = (currentSection >= totalSections);
    }

    function goToPrevSection() {
        if (currentSection > 1) {
            currentSection--;
            showSection(currentSection);
            
            // Ferma l'auto-play se attivo
            videoPlaying = false;
        }
    }

    function goToNextSection() {
        if (currentSection < totalSections) {
            currentSection++;
            showSection(currentSection);
            
            // Ferma l'auto-play se attivo
            videoPlaying = false;
        }
    }

    // Inizializza i bottoni di navigazione
    window.addEventListener('load', function() {
        updateNavButtons();
    });

    // Click ovunque per avanzare manualmente (solo se il video non è in auto-play)
    document.addEventListener('click', function(e) {
        if (!videoPlaying && currentSection < totalSections && !e.target.matches('button')) {
            if (currentSection === 1) {
                startVideo();
            }
        }
    });