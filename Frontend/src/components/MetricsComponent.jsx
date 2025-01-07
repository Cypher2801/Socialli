import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, MessageCircle, Images, Smile } from 'lucide-react';

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

const MetricsOverview = ({ totalPosts, avgLikes, avgComments, avgSentiment }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <MetricCard title="Total Posts" value={totalPosts} icon={Images} trend={12} />
    <MetricCard title="Average Likes" value={avgLikes.toLocaleString()} icon={HeartIcon} trend={8} />
    <MetricCard title="Average Comments" value={avgComments.toLocaleString()} icon={MessageCircle} trend={-5} />
    <MetricCard title="Average Sentiment" value={avgSentiment} icon={Smile} trend={15} />
  </div>
);

export { MetricCard, MetricsOverview };