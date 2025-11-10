import React from 'react';
import { motion } from 'framer-motion';
import { Stream } from '../../types/stream.types';
import { formatViewerCount } from '../../utils/formatters';

interface FeaturedStreamProps {
  stream?: Stream;
}

const FeaturedStream: React.FC<FeaturedStreamProps> = ({ stream }) => {
  // Placeholder data if no stream is provided
  const defaultStream: Stream = {
    id: 'featured-1',
    title: 'Welcome to KickLite! 🎮',
    description: 'Check out our featured content and start streaming today. Join thousands of streamers and viewers.',
    thumbnailUrl: 'https://picsum.photos/1280/720?random=featured',
    viewerCount: 5234,
    isLive: true,
    category: 'Featured',
    streamer: {
      id: 'system',
      username: 'KickLite',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kicklite'
    }
  };

  const displayStream = stream || defaultStream;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
    >
      <img
        src={displayStream.thumbnailUrl}
        alt={displayStream.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1280x720?text=Featured+Stream';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {displayStream.isLive && (
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4"
          >
            🔴 LIVE
          </motion.span>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {displayStream.title}
        </h1>
        <div className="flex items-center gap-4 text-white mb-4">
          <div className="flex items-center gap-2">
            <img
              src={displayStream.streamer.avatarUrl}
              alt={displayStream.streamer.username}
              className="w-10 h-10 rounded-full border-2 border-purple-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/40x40?text=Avatar';
              }}
            />
            <span className="font-medium">{displayStream.streamer.username}</span>
          </div>
          <span className="text-gray-300">
            {formatViewerCount(displayStream.viewerCount)} viewers
          </span>
        </div>
        {displayStream.description && (
          <p className="mt-4 text-gray-200 max-w-2xl line-clamp-2">
            {displayStream.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default FeaturedStream;