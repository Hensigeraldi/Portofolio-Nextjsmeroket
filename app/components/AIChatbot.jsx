'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AIChatbot() {
  const imagesBaseUrl = process.env.NEXT_PUBLIC_IMAGES_BASE_URL || '/images';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm Hensi's AI assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?", 
      sender: 'bot' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [userLanguage, setUserLanguage] = useState('english');
  const messagesEndRef = useRef(null);
  const greetingTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (greetingTimeoutRef.current) {
      clearTimeout(greetingTimeoutRef.current);
    }

    greetingTimeoutRef.current = setTimeout(() => {
      if (!isOpen) {
        setShowGreeting(true);
        
        greetingTimeoutRef.current = setTimeout(() => {
          setShowGreeting(false);
        }, 8000);
      }
    }, 10000);

    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (greetingTimeoutRef.current) {
        clearTimeout(greetingTimeoutRef.current);
      }
    };
  }, []);

  const detectLanguage = (message) => {
    const indonesianWords = [/halo|hai|apa kabar|terima kasih|makasih|tolong|saya|kamu|indonesia|proyek|keahlian|kontak|ig|wa|telepon|belajar|koding|programming|project|skill|contact|learn|coding/i];
    const englishWords = [/hello|hi|hey|how are you|thank you|thanks|please|i |you |usa|uk|project|skill|contact|learn|code|programming/i];
    
    let indonesianScore = 0;
    let englishScore = 0;
    
    indonesianWords.forEach(regex => {
      if (regex.test(message)) indonesianScore++;
    });
    
    englishWords.forEach(regex => {
      if (regex.test(message)) englishScore++;
    });
    
    return indonesianScore >= englishScore ? 'indonesian' : 'english';
  };

  const getAIResponse = (userMessage) => {
    const detectedLang = detectLanguage(userMessage);
    setUserLanguage(detectedLang);
    
    const lowerMessage = userMessage.toLowerCase();

    if (/(hello|hi|hey|halo|hallo|hai)/i.test(userMessage)) {
      return detectedLang === 'indonesian' 
        ? "Halo! 👋 Saya asisten AI Hensi. Saya bisa cerita tentang skills, project, pengalaman Hensi, atau bahas programming. Mau tanya apa?"
        : "Hey there! 👋 I'm Hensi's AI assistant. I can help you learn about his skills and projects, discuss technology, programming, or just have a friendly chat. What's on your mind?";
    }
    
    else if (/(how are you|what's up|apa kabar|how do you do)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Saya baik-baik saja! Siap membantu kamu menjelajahi portfolio Hensi atau ngobrol tentang teknologi. Gimana kabarmu?"
        : "I'm doing great! Ready to help you explore Hensi's portfolio or chat about technology. How about you?";
    }
    
    else if (/(thank you|thanks|terima kasih|makasih|thx)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Sama-sama! 😊 Senang bisa membantu. Ada hal lain yang mau kamu tau tentang Hensi atau mau diskusi programming?"
        : "You're welcome! 😊 Happy to help. Is there anything else you'd like to know about Hensi or maybe discuss programming topics?";
    }
    
    else if (/(your name|who are you|siapa kamu|what are you)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Saya Hensi AI! 🤖 Saya asisten pintar yang dibuat untuk mewakili Hensi Geraldi Irot dan membantu pengunjung belajar tentang karya-karyanya. Saya juga bisa ngobrol tentang teknologi dan programming!"
        : "I'm Hensi AI! 🤖 I'm an intelligent assistant created to represent Hensi Geraldi Irot and help visitors learn about his work. I can also chat about technology and programming in general!";
    }
    
    else if (/(ceritakan|tentang|hensi|profil|about|siapa hens)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Hensi Geraldi Irot adalah Full-Stack Developer dari Manado! 🔥\n\n• Skills: HTML5, CSS3, JavaScript, PHP, MySQL, ESP32, Python\n• Projects: IoT soil monitoring, sistem beasiswa, e-commerce website\n• Contact: +62 822-3979-1258 | hensiirot100@gmail.com\n\nMau tahu lebih detail tentang apa?"
        : "Hensi Geraldi Irot is a Full-Stack Developer from Manado! 🔥\n\n• Skills: HTML5, CSS3, JavaScript, PHP, MySQL, ESP32, Python\n• Projects: IoT soil monitoring, scholarship system, e-commerce website\n• Contact: +62 822-3979-1258 | hensiirot100@gmail.com\n\nWhat would you like to know more about?";
    }
    
    else if (/(skill|ability|keahlian|expertise|technology stack)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Hensi punya skill lengkap banget! 💻\n\n• Frontend: HTML5, CSS3, JavaScript, React\n• Backend: PHP, MySQL, Node.js\n• IoT: ESP32, sensor, hardware programming\n• Machine Learning: Python, Random Forest\n• Tools: Git, VS Code, Arduino\n\nMau tahu project yang pakai skill tertentu?"
        : "Hensi has a diverse skill set: 🛠️\n\n• Frontend: HTML5, CSS3, JavaScript, React\n• Backend: PHP, MySQL, Node.js\n• IoT & Hardware: ESP32, sensors\n• Machine Learning: Python, Random Forest\n• Tools: Git, VS Code, Arduino\n\nHe's a versatile full-stack developer with hardware experience too!";
    }
    
    else if (/(project|portfolio|proyek|karya|work)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Hensi punya beberapa project keren: 🚀\n\n• IoT Soil Monitoring: Monitor tanah pakai sensor & machine learning\n• Scholarship System: Seleksi beasiswa pakai metode SAW\n• E-commerce Website: Toko online full-stack\n• Dan masih banyak lagi!\n\nProject mana yang menarik buat kamu?"
        : "Hensi has some cool projects! 🔥\n\n• IoT Soil Monitoring: Soil monitoring with sensors & machine learning\n• Scholarship System: Scholarship selection using SAW method\n• E-commerce Website: Full-stack online store\n• And many more!\n\nWhich type interests you most?";
    }
    
    else if (/(programming|coding|learn code|belajar programming|koding)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Wih mau belajar programming? 💪\nBerdasarkan pengalaman Hensi, mulai dari web development (HTML/CSS/JS) dulu itu paling recommended! Nanti bisa expand ke backend, IoT, atau machine learning.\n\nMau saran khusus buat belajar apa?"
        : "That's awesome you're interested in programming! 💻 Based on Hensi's journey, I'd recommend starting with web technologies (HTML/CSS/JavaScript) as they're very beginner-friendly. Hensi himself started there and expanded to backend, IoT, and machine learning. What specific area interests you?";
    }
    
    else if (/(contact|hubungi|email|phone|wa|telepon|number|kontak|ig|instagram)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Kamu bisa hubungi Hensi via: 📞\n\n• WhatsApp: +62 822-3979-1258\n• Email: hensiirot100@gmail.com\n• Instagram: @hensigeraldi_\n• Lokasi: Manado, Indonesia\n\nBebas banget buat chat buat tanya-tanya atau kolaborasi!"
        : "You can contact Hensi through: 📞\n\n• WhatsApp: +62 822-3979-1258\n• Email: hensiirot100@gmail.com\n• Instagram: @hensigeraldi_\n• Location: Manado, Indonesia\n\nFeel free to reach out for collaborations or questions!";
    }
    
    else if (/(bye|goodbye|see you|selamat tinggal|exit|quit|dadah)/i.test(userMessage)) {
      return detectedLang === 'indonesian'
        ? "Terima kasih sudah ngobrol! 👋 Jangan ragu buat balik lagi kalau ada pertanyaan lain tentang karya Hensi atau mau diskusi teknologi. Semoga harimu menyenangkan!"
        : "Thanks for chatting! 👋 Feel free to come back if you have more questions about Hensi's work or want to discuss technology. Have a great day!";
    }
    
    else {
      const indonesianResponses = [
        "Pertanyaan menarik! 😊 Saya khusus bisa bantu tentang skills Hensi, project-project keren, info contact, atau saran belajar programming. Mau tanya yang mana?",
        "Wah pertanyaan yang bagus! Saya paling jago bahas portfolio Hensi dan teknologi. Bisa cerita lebih detail yang kamu cari? Siapa tau saya bisa kasih saran yang tepat!",
        "Asik nih pertanyaannya! Saya bisa bantu tentang background Hensi atau diskusi programming. Atau mungkin kamu penasaran dengan project IoT atau machine learning-nya?"
      ];
      
      const englishResponses = [
        "That's an interesting question! While I specialize in Hensi's portfolio and tech topics, I'd be happy to discuss programming, career advice, or help you understand his projects better.",
        "I'm designed to help with Hensi's portfolio and technology discussions. Could you tell me more about what you're looking for? Maybe I can help with programming advice or project details!",
        "Great question! I'm most knowledgeable about Hensi's background and technology in general. Want to discuss his projects, learn about programming, or explore career paths in tech?"
      ];
      
      const responses = detectedLang === 'indonesian' ? indonesianResponses : englishResponses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getAIResponse(inputValue);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    setShowGreeting(false);
    if (greetingTimeoutRef.current) {
      clearTimeout(greetingTimeoutRef.current);
    }
  };

  const closeGreeting = () => {
    setShowGreeting(false);
    if (greetingTimeoutRef.current) {
      clearTimeout(greetingTimeoutRef.current);
    }
  };

  return (
    <>
      <div className="ai-chatbot-btn" onClick={toggleChatbot}>
        <i className="fas fa-robot"></i>
        <span className="pulse-effect"></span>
        <span className="chat-notification">AI</span>
      </div>

      {showGreeting && !isOpen && (
        <div 
          className="chatbot-greeting" 
          style={{
            position: 'fixed',
            bottom: '120px',
            right: '30px',
            background: 'white',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            zIndex: 9997,
            maxWidth: '250px',
            borderLeft: '4px solid #667eea',
            animation: 'slideInRight 0.5s ease'
          }}
        >
          <button 
            onClick={closeGreeting}
            style={{
              position: 'absolute',
              top: '5px',
              right: '8px',
              background: 'none',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              color: '#999',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
          <p style={{ margin: '0 0 10px 0', color: '#333', fontSize: '14px', lineHeight: '1.4', paddingRight: '15px' }}>
            {userLanguage === 'indonesian' 
              ? "Butuh bantuan? Tanya asisten AI saya tentang skills dan project-project saya! 🤖" 
              : "Need help? Ask my AI assistant about my skills and projects! 🤖"}
          </p>
          <button 
            onClick={toggleChatbot}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '12px',
              width: '100%',
              transition: 'background 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = '#5a6fd8'}
            onMouseLeave={(e) => e.target.style.background = '#667eea'}
          >
            {userLanguage === 'indonesian' ? "Buka Asisten AI" : "Open AI Assistant"}
          </button>
        </div>
      )}

      <div className={`chatbot-widget ${isOpen ? 'active' : ''}`} id="chatbotWidget">
        <div className="chatbot-header">
          <div className="header-content" onClick={toggleChatbot}>
            <div className="bot-avatar">
              <Image 
                src={`${imagesBaseUrl}/me.jpg`}
                alt="AI Assistant" 
                width={40} 
                height={40} 
              />
            </div>
            <div className="bot-info">
              <h4>Hensi AI Assistant</h4>
              <p>
                {userLanguage === 'indonesian' ? 'Online • Siap membantu' : 'Online • Ready to help'} 
                <span style={{marginLeft: '8px', fontSize: '12px', color: '#667eea'}}>
                  {userLanguage === 'indonesian' ? '🇮🇩' : '🇺🇸'}
                </span>
              </p>
            </div>
          </div>
          <div className="chatbot-controls">
            <button className="close-btn" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>×</button>
          </div>
        </div>
        
        <div className="chatbot-body">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`${msg.sender}-message`}>
                <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }}></p>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator active">
                <p>
                  {userLanguage === 'indonesian' ? 'AI sedang mengetik' : 'AI is thinking'}
                  <span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={userLanguage === 'indonesian' ? "Ketik pesan kamu..." : "Type your message..."} 
              autoComplete="off"
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}