/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import background from "./background.jpg";

const index = (props) => {
  const canvas = useRef(null);
  const image = useRef(null);
  const [xLoc, setxLoc] = useState<number>();
  const [yLocTop, setyLocTop] = useState<number>();
  const [yLocBottom, setyLocBottom] = useState<number>();
  const [canX, setCanX] = useState<number>();
  const [canY, setCanY] = useState<number>();

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    image.current.onload = () => {
      ctx.drawImage(image.current, 0, 0);
      ctx.font = "20px Courier";
      ctx.textAlign = "center";
      ctx.fillText(props.textTop, xLoc, yLocTop);
      ctx.textAlign = "center";
      ctx.fillText(props.textBottom, xLoc, yLocBottom);

      setCanX(image.current.width);
      setCanY(image.current.height);
      setxLoc(canX / 2);
      setyLocTop(canY * 0.87);
      setyLocBottom(canY * 0.13);
    };
  });

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.drawImage(image.current, 0, 0);
    ctx.font = "20px Courier";
    ctx.textAlign = "center";
    ctx.fillText(props.textTop, xLoc, yLocTop);
    ctx.textAlign = "center";
    ctx.fillText(props.textBottom, xLoc, yLocBottom);
  });

  const handleOnLoad = (e) => {
    console.log(e.target.offsetHeight);
    setCanX(e.target.offsetWidth);
    setCanY(e.target.offsetHeight);
    setxLoc(canX / 2);
    setyLocTop(canY * 0.87);
    setyLocBottom(canY * 0.13);
  };

  return (
    <div>
      <canvas ref={canvas} width={canX || 0} height={canY || 0} />
      {/* <canvas ref={canvas} width="270" height="80" /> */}
      <img ref={image} src={props.background} hidden />
    </div>
  );
};

//export default index;

function App() {
  return (
    <div className="App">
      {/* <Canvas textTop="Top" textBottom="Bottom" background={background} /> */}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
