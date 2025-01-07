import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, LineChart, Line, XAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Image, Film, Images, HeartIcon, MessageCircle, Share2, Smile, Frown, Meh, Moon, Sun, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area"
import IntegrationFlow from './components/IntegrationFlow';

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
      className={`max-w-[80%] p-3 rounded-lg ${isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted'
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
      // Simulate AI response
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
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: `Analyzing ${question.toLowerCase()}...`,
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <Card className="w-full">
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


const posts = [
  { type: 'reel', likes: 1200, comments: 45, shares: 20, sentiment: 0.8, date: '2024-01-01' },
  { type: 'image', likes: 800, comments: 30, shares: 15, sentiment: 0.6, date: '2024-01-02' },
  { type: 'carousel', likes: 1500, comments: 60, shares: 25, sentiment: 0.9, date: '2024-01-03' },
  { type: 'reel', likes: 2000, comments: 80, shares: 40, sentiment: 0.7, date: '2024-01-04' },
  { type: 'image', likes: 600, comments: 20, shares: 10, sentiment: 0.5, date: '2024-01-05' },
];

const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
        </p>
      )}
    </CardContent>
  </Card>
);

const getSentimentIcon = (sentiment) => {
  if (sentiment >= 0.7) return <Smile className="text-green-500" />;
  if (sentiment >= 0.4) return <Meh className="text-yellow-500" />;
  return <Frown className="text-red-500" />;
};

const getPostTypeIcon = (type) => {
  switch (type) {
    case 'reel': return <Film className="w-4 h-4" />;
    case 'carousel': return <Images className="w-4 h-4" />;
    default: return <Image className="w-4 h-4" />;
  }
};

const PostList = ({ posts }) => (
  <div className="space-y-4">
    {posts.map((post, index) => (
      <div key={index}
        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
        <div className="flex items-center space-x-4">
          {getPostTypeIcon(post.type)}
          <Badge variant="secondary" className="capitalize">{post.type}</Badge>
          <span className="text-sm text-muted-foreground">{post.date}</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <HeartIcon className="w-4 h-4 text-rose-500" />
            <span>{post.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            <span>{post.comments.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Share2 className="w-4 h-4 text-green-500" />
            <span>{post.shares.toLocaleString()}</span>
          </div>
          {getSentimentIcon(post.sentiment)}
        </div>
      </div>
    ))}
  </div>
);

const chartConfig = {
  colors: {
    likes: "#ec4899",
    comments: "#3b82f6",
    sentiment: "#22c55e"
  }
};

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', isDark);
  }, [isDark]);

  const totalPosts = posts.length;
  const avgLikes = Math.round(posts.reduce((acc, post) => acc + post.likes, 0) / totalPosts);
  const avgComments = Math.round(posts.reduce((acc, post) => acc + post.comments, 0) / totalPosts);
  const avgSentiment = (posts.reduce((acc, post) => acc + post.sentiment, 0) / totalPosts).toFixed(2);

  const postTypeData = Array.from(new Set(posts.map(post => post.type))).map(type => {
    const typePosts = posts.filter(post => post.type === type);
    return {
      type,
      count: typePosts.length,
      likes: Math.round(typePosts.reduce((acc, post) => acc + post.likes, 0) / typePosts.length),
      comments: Math.round(typePosts.reduce((acc, post) => acc + post.comments, 0) / typePosts.length),
      sentiment: Number((typePosts.reduce((acc, post) => acc + post.sentiment, 0) / typePosts.length).toFixed(2))
    };
  });

  return (
    <div className="p-6 space-y-6 bg-background text-foreground min-h-screen max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Social Media Dashboard</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="rounded-full"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Total Posts" value={totalPosts} icon={Images} trend={12} />
            <MetricCard title="Average Likes" value={avgLikes.toLocaleString()} icon={HeartIcon} trend={8} />
            <MetricCard title="Average Comments" value={avgComments.toLocaleString()} icon={MessageCircle} trend={-5} />
            <MetricCard title="Average Sentiment" value={avgSentiment} icon={Smile} trend={15} />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Post Type Distribution</CardTitle>
                  <CardDescription>Analysis by post type</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart data={postTypeData} accessibilityLayer>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="count"
                        fill={chartConfig.colors.likes}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Average likes and comments per post type</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <BarChart data={postTypeData} accessibilityLayer>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="likes"
                        fill={chartConfig.colors.likes}
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="comments"
                        fill={chartConfig.colors.comments}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sentiment">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                  <CardDescription>Average sentiment score by post type</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ChartContainer config={chartConfig} className="h-[400px] w-full">
                    <LineChart data={postTypeData} accessibilityLayer>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="type"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="sentiment"
                        stroke={chartConfig.colors.sentiment}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Latest posts and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PostList posts={posts} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <IntegrationFlow />
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;