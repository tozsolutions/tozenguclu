// AI Chatbot Integration
// OpenAI + Render Backend Integration

class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        // 🔧 BU URL'İ RENDER DEPLOYMENT'INDAN SONRA DEĞİŞTİRİN
        // Örnek: https://modernsite-ai-backend.onrender.com/api/chat
        this.apiEndpoint = 'https://your-render-app.onrender.com/api/chat'; // TODO: Render URL'ini buraya yazın
        this.init();
    }

    init() {
        this.createChatWidget();
        this.addEventListeners();
        this.addWelcomeMessage();
    }

    createChatWidget() {
        const chatHTML = `
            <div id="ai-chatbot" class="chatbot-container">
                <!-- Chat Toggle Button -->
                <div id="chat-toggle" class="chat-toggle">
                    <i class="fas fa-comments"></i>
                    <span class="chat-badge" id="chat-badge">1</span>
                </div>

                <!-- Chat Window -->
                <div id="chat-window" class="chat-window">
                    <!-- Chat Header -->
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <div class="chat-avatar">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div class="chat-title">
                                <h4>AI Asistan</h4>
                                <span class="chat-status online">Çevrimiçi</span>
                            </div>
                        </div>
                        <button id="chat-close" class="chat-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <!-- Chat Messages -->
                    <div id="chat-messages" class="chat-messages">
                        <!-- Messages will be inserted here -->
                    </div>

                    <!-- Chat Input -->
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <input 
                                type="text" 
                                id="chat-input" 
                                placeholder="Mesajınızı yazın..."
                                maxlength="500"
                            >
                            <button id="chat-send" class="chat-send">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div class="chat-suggestions">
                            <button class="suggestion-btn" data-text="Hizmetleriniz hakkında bilgi alabilir miyim?">
                                💼 Hizmetler
                            </button>
                            <button class="suggestion-btn" data-text="Fiyat bilgisi alabilir miyim?">
                                💰 Fiyatlar
                            </button>
                            <button class="suggestion-btn" data-text="İletişim bilgilerinizi paylaşabilir misiniz?">
                                📞 İletişim
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    addEventListeners() {
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');
        const suggestions = document.querySelectorAll('.suggestion-btn');

        chatToggle.addEventListener('click', () => this.toggleChat());
        chatClose.addEventListener('click', () => this.closeChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        suggestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.getAttribute('data-text');
                this.sendMessage(text);
            });
        });

        // Voice input support (if available)
        if ('webkitSpeechRecognition' in window) {
            this.addVoiceInput();
        }
    }

    addVoiceInput() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'chat-voice';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        
        const inputWrapper = document.querySelector('.chat-input-wrapper');
        inputWrapper.insertBefore(voiceBtn, document.getElementById('chat-send'));

        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'tr-TR';
        recognition.continuous = false;

        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.classList.add('recording');
        });

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            document.getElementById('chat-input').value = text;
            voiceBtn.classList.remove('recording');
        };

        recognition.onerror = () => {
            voiceBtn.classList.remove('recording');
        };
    }

    addWelcomeMessage() {
        const welcomeMessage = {
            text: "Merhaba! 👋 Size nasıl yardımcı olabilirim? Web tasarım, mobil uygulama geliştirme ve dijital pazarlama hizmetlerimiz hakkında sorularınızı yanıtlayabilirim.",
            isBot: true,
            timestamp: new Date()
        };
        
        this.messages.push(welcomeMessage);
        this.renderMessage(welcomeMessage);
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        const chatBadge = document.getElementById('chat-badge');
        
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.add('open');
            chatBadge.style.display = 'none';
            document.getElementById('chat-input').focus();
        } else {
            chatWindow.classList.remove('open');
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.remove('open');
        this.isOpen = false;
    }

    async sendMessage(text = null) {
        const input = document.getElementById('chat-input');
        const messageText = text || input.value.trim();
        
        if (!messageText) return;

        // Add user message
        const userMessage = {
            text: messageText,
            isBot: false,
            timestamp: new Date()
        };
        
        this.messages.push(userMessage);
        this.renderMessage(userMessage);
        
        // Clear input
        if (!text) input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send to AI backend
            const response = await this.sendToAI(messageText);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add AI response
            const aiMessage = {
                text: response.message,
                isBot: true,
                timestamp: new Date(),
                confidence: response.confidence
            };
            
            this.messages.push(aiMessage);
            this.renderMessage(aiMessage);
            
        } catch (error) {
            this.hideTypingIndicator();
            
            const errorMessage = {
                text: "Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin veya doğrudan iletişim formunu kullanın.",
                isBot: true,
                timestamp: new Date(),
                isError: true
            };
            
            this.messages.push(errorMessage);
            this.renderMessage(errorMessage);
        }
    }

    async sendToAI(message) {
        const response = await fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                context: 'website_assistant',
                user_id: this.getUserId(),
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('AI service unavailable');
        }

        return await response.json();
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.isBot ? 'bot' : 'user'}`;
        
        const time = message.timestamp.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.innerHTML = `
            <div class="message-content ${message.isError ? 'error' : ''}">
                <div class="message-text">${this.formatMessage(message.text)}</div>
                <div class="message-time">${time}</div>
                ${message.confidence ? `<div class="message-confidence">Güven: ${Math.round(message.confidence * 100)}%</div>` : ''}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Animate message
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });
    }

    formatMessage(text) {
        // Basic markdown support
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        text = text.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // URL detection
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Email detection
        text = text.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1">$1</a>');
        
        return text;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    getUserId() {
        let userId = localStorage.getItem('chatbot_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatbot_user_id', userId);
        }
        return userId;
    }

    // Analytics
    trackEvent(event, data) {
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'chatbot',
                event_label: data.label,
                value: data.value
            });
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if not on mobile (optional)
    const isMobile = window.innerWidth <= 768;
    
    // Initialize chatbot
    window.aiChatbot = new AIChatbot();
    
    console.log('AI Chatbot initialized successfully');
});