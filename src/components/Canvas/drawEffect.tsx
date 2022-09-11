/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";

type drawEffectProps = {
  photos: File[];
};

const drawEffect = (props: drawEffectProps) => {
  const canvasRef = useRef(null);

  const [ctx, setCtx] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const canvasContext = canvas.getContext("2d");
    setCtx(canvasContext);
  }, []);

  const width = 1080;
  const height = 1080;

  useEffect(() => {
    if (ctx !== null) {
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.fillRect(0, 0, 1080, 1080);
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      setLoaded(true);
    }
  }, [ctx]);

  useEffect(() => {
    if (loaded) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      const title = "Yamanashi Trip";
      const fontSize = 64;
      ctx.font = "bold " + fontSize + "px Zen Kaku Gothic New, sans-serif";
      let textWidth = ctx.measureText(title).width;
      ctx.fillText(title, (1080 - textWidth) / 2, fontSize + 454);
      
      setLoaded(true)
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      const subtitle = "2022/7/26~28";
      const subfontSize = 44;
      ctx.font = subfontSize + "px Zen Kaku Gothic New, sans-serif";
      let subtextWidth = ctx.measureText(subtitle).width;
      ctx.fillText(subtitle, (1080 - subtextWidth) / 2, subfontSize + 590);

      setLoaded(true)
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      ctx.moveTo(23, 556);
      ctx.lineTo(1057, 556);
      ctx.lineWidth = 5;
      ctx.stroke();

      setLoaded(true)
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      ctx.moveTo(23, 567);
      ctx.lineTo(1057, 567);
      ctx.lineWidth = 2;
      ctx.stroke();

      setLoaded(true)
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 3; j++) {
            let idx = i * 2 + i + (j + 1);
            
            const label = new Image();
            label.src = `${process.env.PUBLIC_URL}/img/img_rank_box_${idx}.svg`;
            label.onload = () => {
              ctx.drawImage(
                label,
                0,
                0,
                340,
                330,
                13 + 351 * j,
                21 + 680 * i,
                85,
                83
              );
            }
          }
        }  
      }, 1000);
      ctx.globalCompositeOperation = "destination-over";
    }
  }, [loaded]);

  
  useEffect(() => {
    if (loaded) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          let idx = i * 2 + i + j;
          if (props.photos[idx]) {
            const img = new Image();
            img.src = URL.createObjectURL(props.photos[idx]);
            img.onload = () => {
              const size = {
                width: img.naturalWidth,
                height: img.naturalHeight,
              };
              const shift_x = (size["width"] - 330) / 2;
              const shift_y = (size["height"] - 330) / 2;
  
              ctx.drawImage(
                img,
                shift_x,
                shift_y,
                330,
                330,
                23 + 351 * j,
                35 + 680 * i,
                330,
                330
              );
            };
          }
        }
      }
      setLoaded(true)
    }
  }, [props.photos]);

  

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <canvas width={width} height={height} className="canvas" ref={canvasRef} />
    </div>
    
  );
};

export default drawEffect;
