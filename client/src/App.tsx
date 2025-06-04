import { Cartesian3 } from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { BillboardGraphics, Entity, Viewer } from 'resium';
import type { Track } from '../types';

const App = () => {
	const [tracks, setTracks] = useState<Track[]>([]);
	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
	const trackEntity = useRef<Record<number, any>>({});
	const viewerRef = useRef<any>(null);

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

	const selectTrack = (track: Track) => {
		setSelectedTrack(track);
		const entity = trackEntity.current[track.id];
		if (entity && viewerRef.current) {
			try {
				viewerRef.current.cesiumElement.flyTo(entity.position, {
					duration: 2,
				});
				entity.billboard.scale = 1.0;
			} catch (error) {
				console.error('Error flying to track:', error);
			}
		}
	}

	return (
		<main>
				<div className="absolute top-0 left-0 bg-gray-200 z-10 w-52">
					{tracks.map((track) => (
						<div
							key={track.id}
							onClick={() => selectTrack(track)}
							className="p-2 cursor-pointer hover:bg-gray-200"
						>
							{track.name}
						</div>
					))}
				</div>
			<Viewer full ref={viewerRef}>
			{tracks.map((track) => (
        <Entity
          key={track.id}
          position={Cartesian3.fromDegrees(track.longitude, track.latitude, track.elevation)}
          onClick={() => selectTrack(track)}
          ref={(e) => {
            if (e) {
              trackEntity.current[track.id] = e;
            }
          }}
        >
          <BillboardGraphics
            image="/cesium/Assets/Textures/maki/circle-stroked.png"
            scale={0.5}
          />
        </Entity>
      ))}
			</Viewer>
			{selectedTrack && (
				<div className="absolute bottom-0 right-0 bg-gray-200 p-4 rounded shadow-lg">
					<h2 className="text-xl font-bold">{selectedTrack.name}</h2>
					<p>{selectedTrack.description}</p>
					<p>Location: {selectedTrack.location}</p>
					<p>Type: {selectedTrack.type}</p>
					<p>Difficulty: {selectedTrack.difficulty}</p>
					<button
						onClick={() => setSelectedTrack(null)}
						className="mt-2 px-4 py-2 bg-gray-800 text-white rounded cursor-pointer"
					>
						Close
					</button>
				</div>
			)}
		</main>
	);
};

export default App;