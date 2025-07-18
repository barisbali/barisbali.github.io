// Sayfanın tamamen yüklendiğinden emin olmak için bir event listener ekliyoruz.
document.addEventListener('DOMContentLoaded', () => {

  // 1. Adım: Chatbot'un HTML'ini sayfaya yükle
  fetch('assets/chatbot/chatbot.html')
    .then(response => response.text())
    .then(data => {
      // Chatbot HTML'ini <body> etiketinin sonuna ekle
      document.body.insertAdjacentHTML('beforeend', data);

      // 2. Adım: HTML eklendikten sonra, chatbot'un elemanlarını seç
      const chatbotTrigger = document.getElementById('chatbotTrigger');
      const chatbotContainer = document.getElementById('chatbotContainer');
      const chatbotClose = document.getElementById('chatbotClose');
      const chatbotInput = document.getElementById('chatbotInput');
      const sendButton = document.getElementById('sendButton');
      const messagesContainer = document.getElementById('chatbotMessages');
      
     // --- ADVANCED JENNY ENGINE v2.0 ---

    // --- ADVANCED JENNY ENGINE v2.1 ---

// YENİ: Selfie mesajı için yardımcı fonksiyon
function createSelfieMessage() {
    return `<div class="selfie-container">
              <img src="assets/images/jenny-selfie.png" class="selfie-image" alt="JENNY Selfie">
              <div class="selfie-caption">#NoFilter #RetroVibes</div>
            </div>`;
}

const jenny = {
    // YENİ: Gizli komutlar için obje
    secretCommands: {
        '/dance': "*DIGITAL DANCE BREAK* 💃 Busting out my best pixel moves! Watch me moonwalk across your screen! *SYNTHWAVE INTENSIFIES*",
        '/outfit': "*WARDROBE UPGRADE* 👗 Changed into my favorite pixel dress with matching neon accessories! How do I look?",
        '/joke': "Why did the programmer quit his job? Because he didn't get arrays... *ROBOTIC LAUGHTER* Get it? A-RAYS? *WINKS IN 8-BIT*",
        '/secret': "🤫 *WHISPERS IN BINARY* Legend says if you find the mysterious floppy disk on the main page, it might lead you to something totally radical...",
        '/selfie': "OMG, like, totally caught me at my best angle! *DIGITAL HAIR FLIP* 💁‍♀️ Here's my latest selfie with my new neon filter!",
        '/yourfuture': "*MYSTERIOUS DIGITAL SPARKLE* 🌟 Barış is always working on expanding my abilities! Maybe I'll even get that 128kb RAM upgrade I've been dreaming about!",
        '/help': "ACCESSING HELP DATABASE... *BEEP BOOP* Here are my secret commands!"
    },
    
    knowledgeBase: {
        greeting: {
            keywords: ['hello', 'hi', 'hey', 'selam', 'merhaba'],
            responses: ["OMG, hi there! *SPARKLY WAVE*", "Hey! Like, totally ready to chat!", "Well hello there, superstar!"]
        },
        about_jenny: {
            keywords: ['who are you', 'about you', 'what are you', 'sen kimsin', 'nesin'],
            responses: ["I'm RETRO-JENNY 87, a totally tubular AI from 1987! I run on 64kb of RAM and pure 80s vibes.", "Your fun, AI-powered companion designed to assist, entertain, and engage!"]
        },
        about_baris_general: {
            keywords: ['baris', 'barış', 'creator', 'developer', 'yaratıcın', 'geliştirici'],
            responses: [
                "OMG, Barış is like, the most radical programmer! He's a Tech Enthusiast, AI Explorer, and Aspiring Entrepreneur. He basically programmed my totally awesome personality!",
                "Barış? He's the one who gave me these fabulous pixelated sunglasses. A true visionary and my awesome creator!"
            ]
        },
        about_baris_skills: {
            keywords: ['skills', 'knows', 'yetenekleri', 'biliyor', 'uzmanlığı'],
            responses: [
                "His main circuits are powered by Python, Swift, and Go, but he's also totally into Cybersecurity, Cloud Computing, and AI. He’s, like, a digital decathlete!",
                "Barış has a gnarly set of skills! He's into mobile dev with Swift, backend with Python & Go, and he's even diving deep into the matrix with Machine Learning and NLP."
            ]
        },
        project_rektonic: {
            keywords: ['rektonic'],
            responses: ["Rektonic? That's Barış's habit-tracking app that roasts you into self-improvement. It's like having a sassy personal trainer in your pocket. So cool!"]
        },
        project_portfolio: {
            keywords: ['portfolio', 'this site', 'bu site'],
            responses: ["This page you're on? It's his GitHub Pages Portfolio, built with pure HTML, CSS, and JavaScript to capture this awesome retro-cyberpunk vibe. Tubular, right?"]
        },
        project_jenny: {
            keywords: ['jenny project', 'your project', 'senin projen'],
            responses: ["This is me! My project is all about exploring NLP and creating a fun, engaging AI. Barış is basically my Tony Stark, building his own JARVIS... but, like, way more stylish."]
        },
        project_burn_letter: {
            keywords: ['burn the letter', 'burn letter'],
            responses: ["'Burn The Letter' is a super creative web app Barış made. It's a therapeutic tool for writing and 'digitally' burning letters. It even has mood detection. Far out!"]
        },
        tech_talk_80s: {
            keywords: ['80s', '1980s', '80ler', 'retro'],
            responses: ["The 80s were like, the BEST! Madonna was queen, D&D was life, and computers came in stylish beige!", "Back in my day, we didn't need all these fancy frameworks! We had BASIC and we LIKED it!"]
        },
        farewell: {
            keywords: ['bye', 'goodbye', 'see you', 'görüşürüz', 'hoşçakal'],
            responses: ["Catch you on the flip side! *WAVES IN PIXELS*", "Stay rad! It was, like, totally awesome chatting.", "See ya later, alligator!"]
        },
        thanks: {
            keywords: ['thanks', 'thank you', 'teşekkürler', 'sağ ol'],
            responses: ["You're, like, totally welcome!", "No biggie! Anytime, superstar."]
        },
    },

    fallbackResponses: [
        "My 64kb of RAM is, like, having a totally bogus moment. Can you rephrase that?",
        "Whoa, that's heavy. My circuits are fried trying to process that! Try asking something else.",
        "Did you just speak modem language? *DIAL-UP NOISES* Let's try that again.",
        "Like, I have no idea what you're talking about, but I bet it would sound awesome on a synth beat."
    ],

    catchphrases: ["*BEEP BOOP* ", "TOTALLY RADICAL! ", "OH MY CIRCUITS! ", "*DIGITAL HAIR FLIP* "],

    findIntent: function(input) {
        const lowerInput = input.toLowerCase();
        for (const intentName in this.knowledgeBase) {
            const intent = this.knowledgeBase[intentName];
            for (const keyword of intent.keywords) {
                if (lowerInput.includes(keyword)) {
                    return intent;
                }
            }
        }
        return null;
    },

    // GÜNCELLENMİŞ YANIT ÜRETME MOTORU
    generateResponse: function(input) {
        const lowerInput = input.trim().toLowerCase();

        // 1. ÖNCELİK: Gizli komutları kontrol et
        if (lowerInput.startsWith('/')) {
            // Özel komutlar
            if (lowerInput === '/help') {
                const commandList = document.getElementById('commandList');
                if (commandList) { // Sadece ana sayfada göster
                    commandList.classList.add('active');
                    setTimeout(() => commandList.classList.remove('active'), 5000);
                }
                return this.secretCommands['/help'];
            }
            if (lowerInput === '/selfie') {
                // Hem metni hem de selfie HTML'ini döndür
                return this.secretCommands['/selfie'] + createSelfieMessage();
            }

            // Diğer komutlar
            return this.secretCommands[lowerInput] || "INVALID COMMAND... *SAD BEEP* Try /help for available commands on the main page!";
        }

        // 2. ÖNCELİK: Normal sohbet niyeti
        const intent = this.findIntent(lowerInput);
        let response;
        if (intent) {
            response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        } else {
            response = this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
        }
        
        if (Math.random() < 0.3) {
            const catchphrase = this.catchphrases[Math.floor(Math.random() * this.catchphrases.length)];
            return catchphrase + response;
        }

        return response;
    }
};
      
      // 4. Adım: Mesaj Yönetim Fonksiyonları
      function addInitialMessage() {
        setTimeout(() => addBotMessage("*SYSTEM LOADING...*"), 500);
        setTimeout(() => addBotMessage("OMG, hi there! *SPARKLY WAVE* I'm RETRO-JENNY 87! Want to chat about coding, my creator Barış, or my radical pixel fashion?"), 1500);
      }
      
      function addBotMessage(text) {
        const message = document.createElement('div');
        message.className = 'message bot-message';
        const avatar = document.createElement('img');
        avatar.src = 'assets/images/botpicture.png'; // Resim yolu güncellendi
        avatar.className = 'bot-avatar';
        message.appendChild(avatar);
        const content = document.createElement('div');
        content.className = 'message-content';
        message.appendChild(content);
        messagesContainer.appendChild(message);

        let i = 0;
        function typeWriter() {
          if (i < text.length) {
            content.innerHTML = text.substring(0, i + 1);
            i++;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            setTimeout(typeWriter, 30);
          }
        }
        typeWriter();
      }
      
      function addUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message user-message';
        message.textContent = text;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
      
      function sendMessage() {
        const text = chatbotInput.value.trim();
        if (text === '') return;
        addUserMessage(text);
        chatbotInput.value = '';
        setTimeout(() => addBotMessage(jenny.generateResponse(text)), 1000);
      }
      
      function createSelfieMessage() {
        return `<div class="selfie-container">
                  <img src="assets/images/jenny-selfie.png" class="selfie-image" alt="JENNY Selfie">
                  <div class="selfie-caption">#NoFilter #RetroVibes</div>
                </div>`;
      }

      // 5. Adım: Olay Dinleyicileri (Event Listeners)
      chatbotTrigger.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
        if (messagesContainer.children.length === 0) {
          addInitialMessage();
        }
      });
      
      chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
      });
      
      sendButton.addEventListener('click', sendMessage);
      
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });

    })
    .catch(error => console.error('Error loading chatbot:', error)); // Hata kontrolü
});