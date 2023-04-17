import React, { useRef } from "react";
import Webcam from "react-webcam";
import * as tensoreFlow from "@tensorflow/tfjs";
import * as faceLandMark from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await faceLandMark.load(faceLandMark.SupportedPackages.mediapipeFacemesh);

    setInterval(() => {
      detect(net);
    }, 500);
  };

  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const face = await net.estimateFaces({ input: video });
      const ctx = canvasRef.current.getContext("2d");
      drawMesh(face, ctx);
    }
  };

  runFacemesh();
  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          width: 640,
          height: 400,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          width: 640,
          height: 400,
        }}
      />
    </div>
  );
}

export default App;
