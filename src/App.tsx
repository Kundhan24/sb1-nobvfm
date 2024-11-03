import React, { useState } from 'react';
import { GAN } from './models/gan';
import { GANControls } from './components/GANControls';
import { ImageDisplay } from './components/ImageDisplay';
import * as tf from '@tensorflow/tfjs';

function App() {
  const [gan] = useState(() => new GAN());
  const [generatedImages, setGeneratedImages] = useState<tf.Tensor | null>(null);

  const handleTrain = async (epochs: number, batchSize: number) => {
    await gan.train(epochs, batchSize);
  };

  const handleGenerate = (count: number) => {
    const images = gan.generateFaces(count);
    setGeneratedImages(images);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Face Generator GAN</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <GANControls onTrain={handleTrain} onGenerate={handleGenerate} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generated Faces</h2>
            <ImageDisplay images={generatedImages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;