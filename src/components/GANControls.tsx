import React, { useState } from 'react';

interface GANControlsProps {
  onTrain: (epochs: number, batchSize: number) => void;
  onGenerate: (count: number) => void;
}

export function GANControls({ onTrain, onGenerate }: GANControlsProps) {
  const [epochs, setEpochs] = useState(100);
  const [batchSize, setBatchSize] = useState(32);
  const [generateCount, setGenerateCount] = useState(1);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">Training Parameters</label>
        <input
          type="number"
          value={epochs}
          onChange={(e) => setEpochs(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border rounded-md"
          placeholder="Epochs"
        />
        <input
          type="number"
          value={batchSize}
          onChange={(e) => setBatchSize(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border rounded-md"
          placeholder="Batch Size"
        />
        <button
          onClick={() => onTrain(epochs, batchSize)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Train Model
        </button>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Generate Faces</label>
        <input
          type="number"
          value={generateCount}
          onChange={(e) => setGenerateCount(parseInt(e.target.value))}
          className="block w-full px-3 py-2 border rounded-md"
          placeholder="Number of faces to generate"
        />
        <button
          onClick={() => onGenerate(generateCount)}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Generate Faces
        </button>
      </div>
    </div>
  );
}