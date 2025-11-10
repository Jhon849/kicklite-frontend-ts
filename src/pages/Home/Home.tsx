import React from 'react';
import FeaturedStream from '../../components/home/FeaturedStream';
import CategoriesGrid from '../../components/home/CategoriesGrid';
import StreamCard from '../../components/home/StreamCard';
import { Stream } from '../../types/stream.types';

const liveChannels: Stream[] = [
  {
    id: 'live-1',
    title: 'Building a real-time chat app with Socket.IO',
    thumbnailUrl: 'https://picsum.photos/640/360?random=dev1',
    viewerCount: 1250,
    isLive: true,
    category: 'Software Development',
    streamer: {
      id: 'user-1',
      username: 'CodeWizard',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=codewizard'
    }
  },
  {
    id: 'live-2',
    title: 'Exploring the new features in React 19',
    thumbnailUrl: 'https://picsum.photos/640/360?random=dev2',
    viewerCount: 890,
    isLive: true,
    category: 'React',
    streamer: {
      id: 'user-2',
      username: 'ReactFanatic',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reactfanatic'
    }
  },
  {
    id: 'live-3',
    title: 'Live designing a modern UI Kit in Figma',
    thumbnailUrl: 'https://picsum.photos/640/360?random=design1',
    viewerCount: 2100,
    isLive: true,
    category: 'UI/UX Design',
    streamer: {
      id: 'user-3',
      username: 'DesignGuru',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=designguru'
    }
  },
  {
    id: 'live-4',
    title: 'Playing the new season of "Cosmic Rift"',
    thumbnailUrl: 'https://picsum.photos/640/360?random=game1',
    viewerCount: 15000,
    isLive: true,
    category: 'Cosmic Rift',
    streamer: {
      id: 'user-4',
      username: 'ProGamer',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=progamer'
    }
  }
];

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <FeaturedStream stream={liveChannels[0]} />
      <CategoriesGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {liveChannels.map((stream) => (
          <StreamCard key={stream.id} stream={stream} />
        ))}
      </div>
    </div>
  );
};

export default Home;
