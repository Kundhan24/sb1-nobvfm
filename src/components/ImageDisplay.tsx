import React from 'react';
import * as tf from '@tensorflow/tfjs';

interface ImageDisplayProps {
  images: tf.Tensor | null;
}

export function ImageDisplay({ images }: ImageDisplayProps) {
  const renderImage = async (tensor: tf.Tensor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    const imageData = new ImageData(64, 64);
    const data = await tensor.data();
    
    for (let i = 0; i < data.length; i += 3) {
      imageData.data[i * 4] = (data[i] + 1) * 127.5;     // R
      imageData.data[i * 4 + 1] = (data[i + 1] + 1) * 127.5; // G
      imageData.data[i * 4 + 2] = (data[i + 2] + 1) * 127.5; // B
      imageData.data[i * 4 + 3] = 255;                    // A
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  if (!images) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: images.shape[0] }).map((_, i) => (
        <img
          key={i}
          src={renderImage(tf.slice(images, [i, 0, 0, 0], [1, 64, 64, 3]))}
          alt={`Generated face ${i + 1}`}
          className="w-full rounded-lg shadow-md"
        />
      ))}
    </div>
  );
}