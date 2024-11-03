import * as tf from '@tensorflow/tfjs';
import { Generator } from './generator';
import { Discriminator } from './discriminator';

export class GAN {
  generator: Generator;
  discriminator: Discriminator;

  constructor() {
    this.generator = new Generator();
    this.discriminator = new Discriminator();
  }

  async train(epochs: number, batchSize: number): Promise<void> {
    const realLabels = tf.ones([batchSize, 1]);
    const fakeLabels = tf.zeros([batchSize, 1]);

    for (let epoch = 0; epoch < epochs; epoch++) {
      // Train discriminator
      const noise = tf.randomNormal([batchSize, 100]);
      const generatedImages = this.generator.generate(batchSize);
      
      await this.discriminator.model.trainOnBatch(generatedImages, fakeLabels);
      
      // Train generator
      const combinedLoss = await tf.tidy(() => {
        const noise = tf.randomNormal([batchSize, 100]);
        const generatedImages = this.generator.generate(batchSize);
        return this.discriminator.model.trainOnBatch(generatedImages, realLabels);
      });

      if (epoch % 10 === 0) {
        console.log(`Epoch ${epoch}: Loss: ${combinedLoss}`);
      }
    }
  }

  generateFaces(count: number): tf.Tensor {
    return this.generator.generate(count);
  }
}