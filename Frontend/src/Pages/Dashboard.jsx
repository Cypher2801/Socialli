import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import { MetricsOverview } from '../components/MetricsComponent';
import { PostTypeDistribution, EngagementChart, SentimentChart } from '../components/ChartComponent';
import PostList from '../components/PostList';
import ChatInterface from '../components/ChatInterface';
import PostTypePieChart from '../components/PostTypePieChart';
import Papa from 'papaparse';

const Dashboard = () => {
  const isDarkData = localStorage.getItem('isDark');
  const [isDark, setIsDark] = useState(isDarkData === 'true');
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleDarkModeSetup = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', !isDark);
  }

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
    console.log("type",typePosts);
    const uniqueHashtags = [
      ...new Set(
        typePosts
          .flatMap(post => post.hashtags.split(',').map(tag => tag.trim()))
      )
    ];
    return {
      type,
      count: typePosts.length,
      likes: Math.round(typePosts.reduce((acc, post) => acc + post.likes, 0) / typePosts.length),
      comments: Math.round(typePosts.reduce((acc, post) => acc + post.comments, 0) / typePosts.length),
      engagement: Number((typePosts.reduce((acc, post) => acc + post.engagement, 0) / typePosts.length).toFixed(2)),
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Social Media Dashboard</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDarkModeSetup}
            className="rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
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
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="assistant"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              AI Assistant
            </TabsTrigger>
            <TabsTrigger 
              value="engagement"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700 dark:text-gray-300 dark:data-[state=active]:text-white"
            >
              Engagement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <PostTypeDistribution postTypeData={postTypeData} />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
                <PostTypePieChart postTypeData={postTypeData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent 
            value="engagement" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 flex flex-col gap-4"
          >
            <EngagementChart postTypeData={postTypeData} />
            <SentimentChart postTypeData={postTypeData} />
          </TabsContent>

          <TabsContent 
            value="assistant" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
          >
            <ChatInterface />
          </TabsContent>

          {/* Only show PostList when not on assistant tab */}
          {activeTab !== "assistant" && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <PostList posts={posts} />
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;