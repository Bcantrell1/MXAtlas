import { Cartesian3 } from 'cesium';
import { useRef } from 'react';
import { BillboardGraphics, Entity } from 'resium';
import type { Track } from '../../types';

interface TrackEntityProps {
  track: Track;
  onSelect: (track: Track) => void;
}

export const TrackEntity: React.FC<TrackEntityProps> = ({ track, onSelect }) => {
  const entityRef = useRef<any>(null);

  return (
    <Entity
      position={Cartesian3.fromDegrees(
        track.longitude, 
        track.latitude, 
        track.elevation
      )}
      onClick={() => onSelect(track)}
      ref={entityRef}
    >
      <BillboardGraphics
        // lets update this to a custom image based on the track later.
        image="/cesium/Assets/Textures/maki/circle-stroked.png"
        scale={0.3}
      />
    </Entity>
  );
};