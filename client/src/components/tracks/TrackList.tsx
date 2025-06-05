import type { Track } from '../../types';

interface TrackListProps {
	tracks: Track[];
	onTrackSelect: (track: Track) => void;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, onTrackSelect }) => {
	return (
		<div className="absolute top-0 left-0 bg-gray-200 z-10 w-52">
			{tracks.map((track: Track) => (
				<div
					key={track.id}
					onClick={() => onTrackSelect(track)}
					className="p-2 cursor-pointer hover:bg-gray-200"
				>
					{track.name}
				</div>
			))}
		</div>
	);
};