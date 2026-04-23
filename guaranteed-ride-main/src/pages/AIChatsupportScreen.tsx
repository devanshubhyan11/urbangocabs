import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const botResponses: { [key: string]: string } = {
  'hello': 'Hi! 👋 I\'m UrbanGo\'s AI assistant. How can I help you today?',
  'help': 'I can help with: booking rides, payment issues, driver problems, account settings, or general questions. What do you need?',
  'booking': 'To book a ride: 1) Open home screen 2) Select ride type (Quick/Safe) 3) Enter destination 4) Confirm driver. Need help?',
  'payment': 'For payment issues, I can help you update payment methods, check billing history, or resolve charges. What\'s your issue?',
  'driver': 'Having issues with a driver? I can help report problems, request a different driver, or file a complaint.',
  'cancel': 'To cancel a ride: go to current ride and tap "Cancel". Cancellation fees may apply after 2 minutes.',
  'refund': 'Refunds are processed within 5-7 business days. Can I help check your specific refund status?',
  'rating': 'You can rate drivers after each ride. Ratings help improve service quality for everyone!',
  'default': 'I didn\'t quite understand that. Could you rephrase? I can help with: rides, payments, drivers, or account issues.',
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && lower.includes(key)) {
      return response;
    }
  }
  return botResponses['default'];
}

export default function AIChatsupportScreen() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi! 👋 I\'m your UrbanGo AI Assistant. I\'m here 24/7 to help with any questions. What can I assist you with?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, userMsg]);

    // Simulate bot response delay
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: findResponse(input),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);

    setInput('');
  };

  const quickQuestions = [
    'How do I book a ride?',
    'What\'s your refund policy?',
    'How do I cancel a ride?',
    'Payment issues',
    'Rate a driver',
    'Driver complaints',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">UrbanGo AI Support</h1>
              <p className="text-grp-foreground/90 text-sm">Online • Always ready to help</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/home')}
          >
            ← Back
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-3 max-w-xl ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-grp text-white'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {msg.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-lg px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-grp text-white'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4 max-w-4xl mx-auto w-full">
          <p className="text-xs text-muted-foreground mb-3">Popular questions:</p>
          <div className="flex gap-2 flex-wrap">
            {quickQuestions.map((q, idx) => (
              <Button
                key={idx}
                size="sm"
                variant="outline"
                onClick={() => setInput(q)}
                className="text-xs"
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-card border-t border-border max-w-4xl mx-auto w-full rounded-t-2xl">
        <div className="flex gap-3">
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="gap-2 bg-grp hover:bg-grp/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center py-3 text-xs text-muted-foreground border-t border-border">
        <p>AI-powered support • 24/7 availability • Average response time: &lt; 1 second</p>
      </div>
    </div>
  );
}
