import * as Cesium from 'cesium';
import { useRef } from 'react';
import { MapViewer } from './components/map/Mapviewer';
import { TrackDetails } from './components/tracks/TrackDetails';
import { TrackList } from './components/tracks/TrackList';
import { useTracks } from './hooks/useTracks';
import type { Track } from './types';

const App: React.FC = () => {
	const viewerRef = useRef<any>(null);
	const { tracks, selectedTrack, setSelectedTrack } = useTracks();

	const selectTrack = (track: Track) => {
		setSelectedTrack(track);
		const viewer = viewerRef.current?.cesiumElement;
		if (viewer) {
			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(
					track.longitude,
					track.latitude,
					track.elevation + 1000 // 1000ft allows for a top down view of the track
				),
				orientation: {
					heading: Cesium.Math.toRadians(0),
					pitch: Cesium.Math.toRadians(-90),
					roll: 0
				},
				duration: 2,
			});
		}
	};

	return (
		<main>
			<TrackList tracks={tracks} onTrackSelect={selectTrack} />
			<MapViewer tracks={tracks} onTrackSelect={selectTrack} viewerRef={viewerRef} />
			{selectedTrack && (
				<TrackDetails track={selectedTrack} onClose={() => setSelectedTrack(null)} />
			)}
		</main>
	);
};

export default App;