import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import { MetricsOverview } from './components/MetricsComponent';
import { PostTypeDistribution, EngagementChart, SentimentChart } from './components/ChartComponent';
import PostList from './components/PostList';
import ChatInterface from './components/ChatInterface';
import PostTypePieChart from './components/PostTypePieChart';
import Papa from 'papaparse';

const Dashboard = () => {
  const [isDark, setIsDark] = useState(true);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    Papa.parse('/social_media_posts.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedPosts = result.data.map((row) => ({
          type: row.post_type,
          likes: parseInt(row.likes, 10) || 0,
          comments: parseInt(row.comments, 10) || 0,
          shares: parseInt(row.shares, 10) || 0,
          engagement: parseFloat(row.engagement_rate) || 0,
          date: row.date || 'Unknown',
          hashtags: row.hashtags || '',
        }));
        setPosts(parsedPosts);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  const totalPosts = posts.length;
  const avgLikes = totalPosts > 0 ? Math.round(posts.reduce((acc, post) => acc + post.likes, 0) / totalPosts) : 0;
  const avgComments = totalPosts > 0 ? Math.round(posts.reduce((acc, post) => acc + post.comments, 0) / totalPosts) : 0;
  const avgEngagement = totalPosts > 0
    ? (posts.reduce((acc, post) => acc + post.engagement, 0) / totalPosts).toFixed(2)
    : '0.00';

  const postTypeData = Array.from(new Set(posts.map(post => post.type))).map(type => {
    const typePosts = posts.filter(post => post.type === type);
    return {
      type,
      count: typePosts.length,
      likes: Math.round(typePosts.reduce((acc, post) => acc + post.likes, 0) / typePosts.length),
      comments: Math.round(typePosts.reduce((acc, post) => acc + post.comments, 0) / typePosts.length),
      engagement: Number((typePosts.reduce((acc, post) => acc + post.engagement, 0) / typePosts.length).toFixed(2)),
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

        {/* Metrics Overview */}
        <MetricsOverview 
          totalPosts={totalPosts}
          avgLikes={avgLikes}
          avgComments={avgComments}
          avgEngagement={avgEngagement}
        />

        {/* Main Content Tabs */}
        <Tabs 
          defaultValue="overview" 
          className="space-y-6"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg shadow-sm p-4">
                <PostTypeDistribution postTypeData={postTypeData} />
              </div>
              <div className="bg-card rounded-lg shadow-sm p-4">
                <PostTypePieChart postTypeData={postTypeData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="bg-card rounded-lg shadow-sm p-4 flex flex-col gap-4">
            <EngagementChart postTypeData={postTypeData} />
            <SentimentChart postTypeData={postTypeData} />
          </TabsContent>

          <TabsContent value="assistant" className="bg-card rounded-lg shadow-sm p-4">
            <ChatInterface />
          </TabsContent>

          {/* Only show PostList when not on assistant tab */}
          {activeTab !== "assistant" && (
            <div className="mt-6">
              <PostList posts={posts} />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;