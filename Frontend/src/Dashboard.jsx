import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import { MetricsOverview } from './components/MetricsComponent';
import { PostTypeDistribution, EngagementChart, SentimentChart } from './components/ChartComponent';
import PostList from './components/PostList';
import ChatInterface from './components/ChatInterface';

// Sample data
const posts = [
  { type: 'reel', likes: 1200, comments: 45, shares: 20, sentiment: 0.8, date: '2024-01-01' },
  { type: 'image', likes: 800, comments: 30, shares: 15, sentiment: 0.6, date: '2024-01-02' },
  { type: 'carousel', likes: 1500, comments: 60, shares: 25, sentiment: 0.9, date: '2024-01-03' },
  { type: 'reel', likes: 2000, comments: 80, shares: 40, sentiment: 0.7, date: '2024-01-04' },
  { type: 'image', likes: 600, comments: 20, shares: 10, sentiment: 0.5, date: '2024-01-05' }
];

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Calculate metrics
  const totalPosts = posts.length;
  const avgLikes = Math.round(posts.reduce((acc, post) => acc + post.likes, 0) / totalPosts);
  const avgComments = Math.round(posts.reduce((acc, post) => acc + post.comments, 0) / totalPosts);
  const avgSentiment = (posts.reduce((acc, post) => acc + post.sentiment, 0) / totalPosts).toFixed(2);

  // Calculate post type data for charts
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Social Media Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Metrics Overview - Always visible */}
        <MetricsOverview 
          totalPosts={totalPosts}
          avgLikes={avgLikes}
          avgComments={avgComments}
          avgSentiment={avgSentiment}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PostTypeDistribution postTypeData={postTypeData} />
            <PostList posts={posts} />
          </TabsContent>

          <TabsContent value="engagement">
            <EngagementChart postTypeData={postTypeData} />
          </TabsContent>

          <TabsContent value="sentiment">
            <SentimentChart postTypeData={postTypeData} />
          </TabsContent>

          <TabsContent value="assistant">
            <ChatInterface />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;