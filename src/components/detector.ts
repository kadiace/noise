import { drawMesh } from 'components/drawMesh';

import {
  FaceLandmarksDetector,
  MediaPipeFaceMeshTfjsModelConfig,
  SupportedModels,
  createDetector,
} from '@tensorflow-models/face-landmarks-detection';

export const runDetector = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
) => {
  const model = SupportedModels.MediaPipeFaceMesh;
  const detectorConfig: MediaPipeFaceMeshTfjsModelConfig = {
    runtime: 'tfjs',
    refineLandmarks: true,
  };
  const detector = await createDetector(model, detectorConfig);
  const detect = async (net: FaceLandmarksDetector) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    const ctx = canvas.getContext('2d');
    if (ctx) {
      requestAnimationFrame(() => drawMesh(faces[0], ctx));
      detect(detector);
    }
  };
  detect(detector);
};
