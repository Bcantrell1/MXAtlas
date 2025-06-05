import type { Track } from '../../types';

interface TrackDetailsProps {
  track: Track;
  onClose: () => void;
}

export const TrackDetails: React.FC<TrackDetailsProps> = ({ track, onClose }) => {
  return (
    <div className="absolute bottom-0 right-0 bg-gray-200 p-4 rounded shadow-lg">
      <h2 className="text-xl font-bold">{track.name}</h2>
      <p>{track.description}</p>
      <p>Location: {track.location}</p>
      <p>Type: {track.type}</p>
      <p>Difficulty: {track.difficulty}</p>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-gray-800 text-white rounded cursor-pointer"
      >
        Close
      </button>
    </div>
  );
};