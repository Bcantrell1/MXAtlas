import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import type { Track } from '../../types';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (track: Track) => void;
}

export const TrackList: React.FC<TrackListProps> = ({ tracks, onTrackSelect }) => {
  return (
    <div className="absolute top-4 left-4 z-10">
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Select a track
        </MenuButton>

        <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {tracks.map((track) => (
              <MenuItem key={track.id}>
                {({ active }) => (
                  <button
                    onClick={() => onTrackSelect(track)}
                    className={`${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm`}
                  >
                    {track.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};