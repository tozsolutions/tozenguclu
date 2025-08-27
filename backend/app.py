from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
import json
import logging
from datetime import datetime
import re

# Flask app setup
app = Flask(__name__)
CORS(app)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

# Company knowledge base
COMPANY_INFO = {
    "name": "ModernSite",
    "services": [
        "Web Tasarım & Geliştirme",
        "Mobil Uygulama Geliştirme", 
        "SEO & Dijital Pazarlama",
        "Güvenlik & Bakım Hizmetleri"
    ],
    "contact": {
        "phone": "+90 (212) 555 0123",
        "email": "info@modernsite.com",
        "address": "İstanbul, Türkiye"
    },
    "features": [
        "Modern ve responsive tasarım",
        "SEO optimizasyonu",
        "Hızlı yükleme süreleri",
        "7/24 teknik destek"
    ],
    "stats": {
        "projects": 150,
        "satisfaction": 98,
        "experience": 10,
        "support": 24
    }
}

# System prompt for the AI assistant
SYSTEM_PROMPT = f"""Sen ModernSite şirketinin AI asistanısın. Müşterilere yardımcı olmak için buradासın.

ŞİRKET BİLGİLERİ:
- Şirket Adı: {COMPANY_INFO['name']}
- Hizmetler: {', '.join(COMPANY_INFO['services'])}
- Telefon: {COMPANY_INFO['contact']['phone']}
- E-posta: {COMPANY_INFO['contact']['email']}
- Adres: {COMPANY_INFO['contact']['address']}

ÖZELLİKLER:
{chr(10).join(['- ' + feature for feature in COMPANY_INFO['features']])}

İSTATİSTİKLER:
- {COMPANY_INFO['stats']['projects']}+ tamamlanan proje
- %{COMPANY_INFO['stats']['satisfaction']} müşteri memnuniyeti
- {COMPANY_INFO['stats']['experience']} yıl deneyim
- {COMPANY_INFO['stats']['support']} saat destek

GÖREVLER:
1. Müşteri sorularını yanıtla
2. Hizmetler hakkında bilgi ver
3. Fiyat talepleri için iletişime yönlendir
4. Teknik sorularda yardımcı ol
5. Samimi ve profesyonel ol

DİL: Türkçe
ÜSLUP: Samimi, yardımsever, profesyonel
CEVAP UZUNLUĞU: Kısa ve öz (max 150 kelime)
"""

def get_ai_response(user_message, context=""):
    """OpenAI GPT ile yanıt üret"""
    try:
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
        ]
        
        if context:
            messages.append({"role": "system", "content": f"Bağlam: {context}"})
            
        messages.append({"role": "user", "content": user_message})
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            max_tokens=200,
            temperature=0.7,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        
        ai_message = response.choices[0].message.content.strip()
        confidence = min(0.95, len(ai_message) / 100)  # Simple confidence calculation
        
        return {
            "message": ai_message,
            "confidence": confidence,
            "tokens_used": response.usage.total_tokens
        }
        
    except Exception as e:
        logger.error(f"OpenAI API error: {str(e)}")
        return get_fallback_response(user_message)

def get_fallback_response(user_message):
    """Fallback responses when AI is not available"""
    
    message_lower = user_message.lower()
    
    # Keyword-based responses
    if any(word in message_lower for word in ['merhaba', 'selam', 'hi', 'hello']):
        return {
            "message": "Merhaba! ModernSite'e hoş geldiniz. Size nasıl yardımcı olabilirim? Web tasarım, mobil uygulama veya dijital pazarlama hizmetlerimiz hakkında sorularınızı yanıtlayabilirim.",
            "confidence": 0.9,
            "tokens_used": 0
        }
    
    elif any(word in message_lower for word in ['hizmet', 'service', 'ne yapıyorsunuz']):
        return {
            "message": f"Sunduğumuz hizmetler:\n• {chr(10).join(['• ' + service for service in COMPANY_INFO['services']])}\n\nDetaylı bilgi için iletişime geçebilirsiniz: {COMPANY_INFO['contact']['phone']}",
            "confidence": 0.85,
            "tokens_used": 0
        }
    
    elif any(word in message_lower for word in ['fiyat', 'ücret', 'price', 'cost']):
        return {
            "message": f"Fiyatlarımız proje kapsamına göre değişmektedir. Detaylı fiyat bilgisi için lütfen bizimle iletişime geçin:\n📞 {COMPANY_INFO['contact']['phone']}\n📧 {COMPANY_INFO['contact']['email']}\n\nÜcretsiz danışmanlık hizmeti sunuyoruz!",
            "confidence": 0.8,
            "tokens_used": 0
        }
    
    elif any(word in message_lower for word in ['iletişim', 'contact', 'telefon', 'email']):
        return {
            "message": f"İletişim bilgilerimiz:\n📞 Telefon: {COMPANY_INFO['contact']['phone']}\n📧 E-posta: {COMPANY_INFO['contact']['email']}\n📍 Adres: {COMPANY_INFO['contact']['address']}\n\n7/24 destek hattımızdan bize ulaşabilirsiniz!",
            "confidence": 0.9,
            "tokens_used": 0
        }
    
    else:
        return {
            "message": "Üzgünüm, şu anda bu sorunuzu tam olarak anlayamadım. Lütfen daha spesifik bir soru sorun veya şu konularda yardım alabiliriz:\n• Web tasarım hizmetleri\n• Mobil uygulama geliştirme\n• SEO ve dijital pazarlama\n• Fiyat bilgileri\n• İletişim bilgileri",
            "confidence": 0.6,
            "tokens_used": 0
        }

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                "error": "Message is required"
            }), 400
        
        user_message = data.get('message', '').strip()
        user_id = data.get('user_id', 'anonymous')
        context = data.get('context', '')
        
        if not user_message:
            return jsonify({
                "error": "Empty message"
            }), 400
        
        # Log the request
        logger.info(f"Chat request from {user_id}: {user_message[:50]}...")
        
        # Get AI response
        ai_response = get_ai_response(user_message, context)
        
        # Log the response
        logger.info(f"AI response confidence: {ai_response['confidence']:.2f}")
        
        return jsonify({
            "message": ai_response["message"],
            "confidence": ai_response["confidence"],
            "timestamp": datetime.now().isoformat(),
            "user_id": user_id,
            "tokens_used": ai_response.get("tokens_used", 0)
        })
        
    except Exception as e:
        logger.error(f"Chat endpoint error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "message": "Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin."
        }), 500

@app.route('/api/feedback', methods=['POST'])
def feedback():
    """Feedback endpoint for improving responses"""
    try:
        data = request.get_json()
        
        user_id = data.get('user_id', 'anonymous')
        message = data.get('message', '')
        response = data.get('response', '')
        rating = data.get('rating', 0)  # 1-5 scale
        
        # Log feedback (in production, save to database)
        logger.info(f"Feedback from {user_id}: Rating {rating}/5")
        
        return jsonify({
            "status": "success",
            "message": "Geri bildiriminiz için teşekkürler!"
        })
        
    except Exception as e:
        logger.error(f"Feedback endpoint error: {str(e)}")
        return jsonify({
            "error": "Feedback could not be processed"
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get company statistics"""
    return jsonify(COMPANY_INFO['stats'])

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal server error"
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    
    app.run(host='0.0.0.0', port=port, debug=debug)