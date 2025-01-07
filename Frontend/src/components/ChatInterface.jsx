import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import axios from 'axios';
import parse from 'html-react-parser';


const ChatMessage = ({ text, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-[80%] p-3 rounded-lg ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}
    >
      {parse(text)}
    </div>
  </div>
);

const formatMarkdownResponse = (text) => {
  // Helper function to convert markdown headings
  const formatHeadings = (text) => {
    return text.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
              .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  };

  // Helper function to convert bold text
  const formatBold = (text) => {
    return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  };

  // Helper function to convert bullet points
  const formatBullets = (text) => {
    const bulletPattern = /^\*\s+(.+)$/gm;
    let matches = text.match(bulletPattern);
    
    if (matches) {
      let bulletHtml = '<ul>';
      matches.forEach(match => {
        const content = match.replace(/^\*\s+/, '');
        bulletHtml += `\n  <li>${content}</li>`;
      });
      bulletHtml += '\n</ul>';
      
      text = text.replace(/(\*\s+.+\n?)+/g, bulletHtml);
    }
    return text;
  };

  // Helper function to handle sections
  const formatSections = (text) => {
    // Convert placeholder for charts/visuals
    text = text.replace(/\[Insert.*?\]/g, '<div class="chart-placeholder">Chart Placeholder</div>');
    
    // Add section dividers
    text = text.split('\n\n').map(section => {
      if (section.trim().startsWith('<')) return section;
      return `<section>${section}</section>`;
    }).join('\n\n');
    
    return text;
  };

  // Main formatting pipeline
  let formattedText = text;
  formattedText = formatHeadings(formattedText);
  formattedText = formatBold(formattedText);
  formattedText = formatBullets(formattedText);
  formattedText = formatSections(formattedText);
  
  // Wrap in container
  formattedText = `<div class="formatted-content">${formattedText}</div>`;
  
  return formattedText;
};


export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages([{ 
      text: "Hello! How can I help you analyze your social media performance?",
      isUser: false 
    }]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('http://localhost:3000/api/chat', {
        message: text
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const formattedData = formatMarkdownResponse(data.reply);
      const formattedUserData = formatMarkdownResponse(text);
      setMessages(prev => [...prev, 
        { text : formattedUserData, isUser: true },
        { text: formattedData, isUser: false }
      ]);
      console.log(messages)
    } catch (error) {
      console.error('Chat API Error:', error);
      setMessages(prev => [...prev,
        { text, isUser: true },
        { text: "Sorry, I encountered an error. Please try again.", isUser: false }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Ask questions about your social media performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4" ref={scrollRef}>
          <div className="px-4">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} {...msg} />
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}