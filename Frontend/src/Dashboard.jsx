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
// Sample data
// const posts = [
//   { type: 'reel', likes: 1200, comments: 45, shares: 20, sentiment: 0.8, date: '2024-01-01' },
//   { type: 'image', likes: 800, comments: 30, shares: 15, sentiment: 0.6, date: '2024-01-02' },
//   { type: 'carousel', likes: 1500, comments: 60, shares: 25, sentiment: 0.9, date: '2024-01-03' },
//   { type: 'reel', likes: 2000, comments: 80, shares: 40, sentiment: 0.7, date: '2024-01-04' },
//   { type: 'image', likes: 600, comments: 20, shares: 10, sentiment: 0.5, date: '2024-01-05' }
// ];
const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [posts,setPosts]=useState([]);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    // Load the CSV file
    Papa.parse('/social_media_posts.csv', {
      download: true,
      header: true, 
      skipEmptyLines: true,
      complete: (result) => {
        console.log('Parsed CSV Data:', result.data); // Log the parsed data
        const parsedPosts = result.data.map((row) => ({
          type: row.post_type,
          likes: parseInt(row.likes, 10) || 0, // Default to 0 if invalid
          comments: parseInt(row.comments, 10) || 0, // Default to 0 if invalid
          shares: parseInt(row.shares, 10) || 0, // Default to 0 if invalid
          sentiment: parseFloat(row.engagement_rate) || 0, // Default to 0 if invalid
          date: row.date || 'Unknown', // Provide a fallback
        }));
        setPosts(parsedPosts);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  // Calculate metrics
  const totalPosts = posts.length;
  const avgLikes = totalPosts > 0 ? Math.round(posts.reduce((acc, post) => acc + post.likes, 0) / totalPosts) : 0;
  const avgComments = totalPosts > 0 ? Math.round(posts.reduce((acc, post) => acc + post.comments, 0) / totalPosts) : 0;
  const avgSentiment = totalPosts > 0
    ? (posts.reduce((acc, post) => acc + post.sentiment, 0) / totalPosts).toFixed(2)
    : '0.00';

  // Calculate post type data for charts
  const postTypeData = Array.from(new Set(posts.map(post => post.type))).map(type => {
    const typePosts = posts.filter(post => post.type === type);
    return {
      type,
      count: typePosts.length,
      likes: Math.round(typePosts.reduce((acc, post) => acc + post.likes, 0) / typePosts.length),
      comments: Math.round(typePosts.reduce((acc, post) => acc + post.comments, 0) / typePosts.length),
      sentiment: Number((typePosts.reduce((acc, post) => acc + post.sentiment, 0) / typePosts.length).toFixed(2)),
    };
  });

  // Calculate metrics
  // const totalPosts = posts.length;
  // const avgLikes = Math.round(posts.reduce((acc, post) => acc + post.likes, 0) / totalPosts);
  // const avgComments = Math.round(posts.reduce((acc, post) => acc + post.comments, 0) / totalPosts);
  // const avgSentiment = (posts.reduce((acc, post) => acc + post.sentiment, 0) / totalPosts).toFixed(2);

  // // Calculate post type data for charts
  // const postTypeData = Array.from(new Set(posts.map(post => post.type))).map(type => {
  //   const typePosts = posts.filter(post => post.type === type);
  //   return {
  //     type,
  //     count: typePosts.length,
  //     likes: Math.round(typePosts.reduce((acc, post) => acc + post.likes, 0) / typePosts.length),
  //     comments: Math.round(typePosts.reduce((acc, post) => acc + post.comments, 0) / typePosts.length),
  //     sentiment: Number((typePosts.reduce((acc, post) => acc + post.sentiment, 0) / typePosts.length).toFixed(2))
  //   };
  // });

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
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>            
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>            
          </TabsList>

          <TabsContent value="overview" className="xl:flex space-y-6">
            <div>
              {/* <h2 className="text-xl font-semibold text-center">Post Type Distribution</h2> */}
              <PostTypeDistribution postTypeData={postTypeData} />
            </div>
            <div>
              {/* <h2 className="text-xl font-semibold text-center">Post Type Pie Chart</h2> */}
              <PostTypePieChart postTypeData={postTypeData} />
            </div>
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
          <PostList posts={posts} />
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;