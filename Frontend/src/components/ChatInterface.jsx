import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';

const QuickQuestions = ({ onSelectQuestion }) => {
  const questions = [
    "What's the best performing post type?",
    "How's the sentiment trending?",
    "Show engagement statistics",
    "Compare post performance"
  ];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {questions.map((question, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          onClick={() => onSelectQuestion(question)}
          className="text-sm"
        >
          {question}
        </Button>
      ))}
    </div>
  );
};

const ChatMessage = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-[80%] p-3 rounded-lg ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}
    >
      {message}
    </div>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you analyze your social media performance?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "I'm analyzing your request. Here's what I found...",
          isUser: false
        }]);
      }, 1000);
      setInputValue("");
    }
  };

  const handleQuestion = (question) => {
    setMessages([...messages, { text: question, isUser: true }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Analyzing ${question.toLowerCase()}...`,
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>AI Assistant</CardTitle>
        <CardDescription>Ask questions about your social media performance</CardDescription>
        <QuickQuestions onSelectQuestion={handleQuestion} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4 mb-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;