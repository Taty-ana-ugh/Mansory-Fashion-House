import React, { useState, useEffect, useRef } from 'react';
import { FaRobot } from "react-icons/fa";

const ChatBot = ({ theme }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Welcome to Mansory Fashion House! How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sanitize = (str) =>
    str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const getResponse = (userInput) => {
    const inputLower = userInput.toLowerCase();

          if (/\b(hi|hello|hey)\b/.test(inputLower)) {
          return "Hey there! Welcome to our store. What brings you in today?";
      } else if (/\b(clothes|apparel|shirts|pants|dresses)\b/.test(inputLower)) {
          return "Looking for a wardrobe upgrade? We have shirts, dresses, pants, skirts, and more. Tell me what style you're after!";
      } else if (/\b(shoes|footwear|sneakers|boots)\b/.test(inputLower)) {
          return "Shoes make the outfit, right? We’ve got sneakers, boots, heels, sandals—whats your vibe today?";
      } else if (/\b(accessories|bags|jewelry|hats|belts)\b/.test(inputLower)) {
          return "Accessories take any outfit to the next level! We’ve got bags, jewelry, hats, belts, and more. What catches your eye?";
      } else if (/\b(price|cost|how much)\b/.test(inputLower)) {
          return "Our prices vary depending on the item and brand. Looking for something specific? Id be happy to check for you!";
      } else if (/\b(size|fit|measurement)\b/.test(inputLower)) {
          return "Great question! We carry a variety of sizes. Let me know the item youre interested in, and Ill help with sizing details.";
      } else if (/\b(delivery|deliveries|shipping|shipping time)\b/.test(inputLower)) {
          return "We offer worldwide shipping! Most orders arrive within 3 to 10 business days, but I can check specifics if you need.";
      } else if (/\b(return|exchange)\b/.test(inputLower)) {
          return "We want you to love your purchase! If not, you can return or exchange it within 30 days. Need more details on how it works?";
      } else if (/\b(location|store|where)\b/.test(inputLower)) {
          return "We’d love to have you visit! Our store is located at **123 Fashion Street, Downtown**—stop by and check out our latest styles!";
      } else if (/\b(contact|phone|email)\b/.test(inputLower)) {
          return "Need to reach us? Call **+254-700-123456** or email **support@MansoryFashionHouse.com**. We're happy to help!";
      } else if (/\b(bye|quit|exit)\b/.test(inputLower)) {
          return "Thanks for stopping by! Have an amazing day, and come back anytime. 😊";
      } else {
          return "Hmm, I didnt catch that. Could you rephrase or tell me more about what you're looking for?";
      }
        };
        
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const sanitizedInput = sanitize(trimmed);
    const userMessage = { sender: 'user', text: sanitizedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botMessage = { sender: 'bot', text: getResponse(sanitizedInput) };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating chatbot button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
        title={isOpen ? 'Close chat' : 'Open chat'}
      >
        <FaRobot size={24} />
      </button>

      {isOpen && (
        <div className={`chatbot-container ${theme}`}>
          <h5 className="text-center mb-3">Mansory House Chatbot</h5>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
                <strong>{msg.sender === 'bot' ? 'Bot' : 'You'}:</strong> {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="bot-message"><em>Bot is typing...</em></div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me about our brand..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
