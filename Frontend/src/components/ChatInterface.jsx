import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronDown } from 'lucide-react';
import { io } from 'socket.io-client';
import parse from 'html-react-parser';

const LoadingDots = () => (
  <div className="flex space-x-1">
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const ChatMessage = ({ text, isUser, isLoading }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 items-end space-x-2`}>
    {!isUser && (
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
        AI
      </div>
    )}
    <div
      className={`max-w-[80%] p-4 rounded-lg ${
        isUser 
          ? 'bg-primary text-primary-foreground rounded-br-none' 
          : 'bg-muted rounded-bl-none'
      } shadow-sm`}
    >
      {isLoading ? <LoadingDots /> : parse(text)}
    </div>
    {isUser && (
      <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm">
        You
      </div>
    )}
  </div>
);

const QuickQuestions = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const questions = [
    "What's my engagement rate trend over the last month?",
    "Which posts performed best this week?",
    "How does my follower growth compare to last month?",
    "What are the best times to post for my audience?",
    "What type of content gets the most shares?",
    "How does my engagement compare to industry benchmarks?",
    "What hashtags are driving the most engagement?",
    "Which platform is performing best for my content?"
  ];

  return (
    <div className="mb-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Quick Questions</span>
        <ChevronDown className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      {isOpen && (
        <div className="mt-2 p-2 bg-muted rounded-lg grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto">
          {questions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left justify-start h-auto py-2 px-3 text-sm hover:bg-primary hover:text-primary-foreground"
              onClick={() => {
                onSelect(question);
                setIsOpen(false);
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const formatMarkdownResponse = (text) => {
  const formatHeadings = (text) => {
    return text.replace(/^##\s+(.+)$/gm, '<h2 class="text-xl font-semibold my-2">$1</h2>')
              .replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl font-bold my-3">$1</h1>');
  };

  const formatBold = (text) => {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  };

  const formatBullets = (text) => {
    const bulletPattern = /^\*\s+(.+)$/gm;
    let matches = text.match(bulletPattern);
    
    if (matches) {
      let bulletHtml = '<ul class="list-disc list-inside space-y-2 my-2">';
      matches.forEach(match => {
        const content = match.replace(/^\*\s+/, '');
        bulletHtml += `\n  <li class="text-sm">${content}</li>`;
      });
      bulletHtml += '\n</ul>';
      
      text = text.replace(/(\*\s+.+\n?)+/g, bulletHtml);
    }
    return text;
  };

  const formatSections = (text) => {
    text = text.replace(/\[Insert.*?\]/g, '<div class="bg-muted rounded p-4 my-2 text-center text-sm">Chart Placeholder</div>');
    
    text = text.split('\n\n').map(section => {
      if (section.trim().startsWith('<')) return section;
      return `<section class="my-2">${section}</section>`;
    }).join('\n\n');
    
    return text;
  };

  let formattedText = text;
  formattedText = formatHeadings(formattedText);
  formattedText = formatBold(formattedText);
  formattedText = formatBullets(formattedText);
  formattedText = formatSections(formattedText);
  
  formattedText = `<div class="formatted-content space-y-2">${formattedText}</div>`;
  
  return formattedText;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
    });

    socketRef.current.on('bot_typing', (isTyping) => {
      setIsLoading(isTyping);
    });

    socketRef.current.on('bot_response', (data) => {
      const formattedResponse = formatMarkdownResponse(data.reply);
      setMessages(prev => [...prev, { text: formattedResponse, isUser: false }]);
      setIsLoading(false);
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false
      }]);
      setIsLoading(false);
    });

    setMessages([{ 
      text: formatMarkdownResponse("Hello! How can I help you analyze your social media performance? You can type your question or select from the quick questions below."),
      isUser: false 
    }]);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = (text) => {
    if (!socketRef.current?.connected) {
      console.error('Socket not connected');
      return;
    }

    const formattedUserMessage = formatMarkdownResponse(text);
    setMessages(prev => [...prev, { text: formattedUserMessage, isUser: true }]);
    socketRef.current.emit('chat_message', text);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleQuestionSelect = (question) => {
    sendMessage(question);
  };

  return (
    <Card className="w-full max-w-8xl mx-auto mt-6 shadow-lg border-t-4 border-t-primary">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            AI
          </div>
          <span>AI Assistant</span>
        </CardTitle>
        <CardDescription>Ask questions about your social media performance</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <QuickQuestions onSelect={handleQuestionSelect} />
        <ScrollArea className="h-[500px] pr-4 mb-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
            {isLoading && (
              <ChatMessage 
                text="" 
                isUser={false} 
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}