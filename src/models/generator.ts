import * as tf from '@tensorflow/tfjs';

export class Generator {
  model: tf.LayersModel;

  constructor() {
    this.model = this.buildGenerator();
  }

  private buildGenerator(): tf.LayersModel {
    const model = tf.sequential();

    // Input layer for random noise
    model.add(tf.layers.dense({
      units: 256,
      inputShape: [100],
      activation: 'relu'
    }));

    // Upsampling layers
    model.add(tf.layers.dense({
      units: 512,
      activation: 'relu'
    }));

    model.add(tf.layers.dense({
      units: 1024,
      activation: 'relu'
    }));

    // Output layer (64x64 RGB image = 12288 units)
    model.add(tf.layers.dense({
      units: 64 * 64 * 3,
      activation: 'tanh'
    }));

    return model;
  }

  generate(batchSize: number): tf.Tensor {
    const noise = tf.randomNormal([batchSize, 100]);
    const generatedImages = this.model.predict(noise) as tf.Tensor;
    return tf.reshape(generatedImages, [-1, 64, 64, 3]);
  }
}