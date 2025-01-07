import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Film, Images, HeartIcon, MessageCircle, Share2, Smile, Frown, Meh } from 'lucide-react';

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
  <Card>
    <CardHeader>
      <CardTitle>Recent Posts</CardTitle>
      <CardDescription>Latest posts and their performance</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
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
    </CardContent>
  </Card>
);

export default PostList;