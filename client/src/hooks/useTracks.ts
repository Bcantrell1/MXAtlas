import { useEffect, useState } from 'react';
import type { Track } from '../types';

export const useTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('http://localhost:8000/tracks');
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    fetchTracks();
  }, []);

  return {
    tracks,
    selectedTrack,
    setSelectedTrack
  };
};