import React from 'react';
import { modes } from '#/modules/settings/modes';
import { Mode } from '#/app/types';

interface GameModeProps extends Mode {
  onClick: () => void;
  isSelected: boolean;
}

const GameMode: React.FC<GameModeProps> = ({ mode, icon, label, onClick, isSelected }) => (
  <div
    onClick={onClick}
    className={`cursor-pointer p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 ${
      isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-100'
    }`}
  >
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl mb-2">{React.createElement(icon)}</div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  </div>
);

interface GameModeSelectorProps {
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  

  return (
    <div className="grid grid-cols-3 gap-4">
      {modes.map((mode) => (
        <GameMode
          key={mode.modeId}
          mode={mode.modeId}
          icon={mode.icon}
          label={mode.label}
          onClick={() => onModeChange(mode.modeId)}
          isSelected={selectedMode === mode.modeId}
        />
      ))}
    </div>
  );
};

export default GameModeSelector;

