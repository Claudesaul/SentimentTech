// Frontend/components/CommunityFeed.tsx
import React from 'react';
import useSWR from 'swr';
import { SocialPost } from '@/lib/types'; // Assuming SocialPost interface is defined here

interface RedditPost extends Omit<SocialPost, 'id' | 'createdAt'> {
  id: string;
  timestamp: string; // ISO 8601 timestamp
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CommunityFeedProps {
  symbol: string;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ symbol }) => {
  const { data, error, isLoading } = useSWR<RedditPost[]>(`/api/stocks/${symbol}/reddit`, fetcher);

  if (isLoading) return <p>Loading Reddit posts...</p>;
  if (error) return <p>Error loading Reddit posts: {error.message}</p>;

  if (!data || data.length === 0) {
    return <p>No Reddit posts found for {symbol}.</p>;
  }

  return (
    <div>
      {data.map((post) => (
        <SocialPost
          key={post.id}
          id={post.id}
          author={post.author}
          content={post.content}
          likes={post.likes}
          replies={post.replies}
          createdAt={new Date(post.timestamp)} // Convert ISO timestamp to Date object
          source={post.source}
          stockMentions={post.stockMentions}
          sentiment={post.sentiment}
        />
      ))}
    </div>
  );
};