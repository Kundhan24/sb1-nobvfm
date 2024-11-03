import * as tf from '@tensorflow/tfjs';

export class Discriminator {
  model: tf.LayersModel;

  constructor() {
    this.model = this.buildDiscriminator();
  }

  private buildDiscriminator(): tf.LayersModel {
    const model = tf.sequential();

    // Input layer for 64x64x3 images
    model.add(tf.layers.flatten({
      inputShape: [64, 64, 3]
    }));

    model.add(tf.layers.dense({
      units: 1024,
      activation: 'leakyReLU'
    }));

    model.add(tf.layers.dense({
      units: 512,
      activation: 'leakyReLU'
    }));

    model.add(tf.layers.dense({
      units: 256,
      activation: 'leakyReLU'
    }));

    // Output layer (real vs fake)
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));

    model.compile({
      optimizer: tf.train.adam(0.0002, 0.5),
      loss: 'binaryCrossentropy'
    });

    return model;
  }
}