import { runDetector } from 'components/detector';

import 'pages/App.css';

import '@mediapipe/face_mesh';
import '@tensorflow/tfjs';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import { BaseSyntheticEvent, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const inputResolution = {
  width: 1080,
  height: 900,
};
const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: 'user',
};
function App() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (videoNode: BaseSyntheticEvent) => {
    const video: HTMLVideoElement | null = videoNode.target;
    if (video && video.readyState !== 4) return;
    if (loaded) return;
    if (video && canvasRef.current) {
      runDetector(video, canvasRef.current);
      setLoaded(true);
    }
  };
  return (
    <div>
      <Webcam
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ visibility: 'hidden', position: 'absolute' }}
        videoConstraints={videoConstraints}
        onLoadedData={handleVideoLoad}
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{ position: 'absolute' }}
      />
      {loaded ? <div>success</div> : <header>Loading...</header>}
    </div>
  );
}

export default App;
