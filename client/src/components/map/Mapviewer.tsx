import { Viewer } from 'resium';
import type { Track } from '../../types';
import { TrackEntity } from './TrackEntity';

interface MapViewerProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
  viewerRef: React.RefObject<any>;
}

export const MapViewer: React.FC<MapViewerProps> = ({ 
  tracks, 
  onTrackSelect, 
  viewerRef 
}) => {
  return (
    <Viewer full ref={viewerRef}>
      {tracks.map((track) => (
        <TrackEntity
          key={track.id}
          track={track}
          onSelect={onTrackSelect}
        />
      ))}
    </Viewer>
  );
};