import { render } from '@testing-library/react';
import * as React from 'react';
import TimeBar from './TimeBar';

function Time() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    // if (context) context.fillRect(5, 5, 100, 100);
  }, [context]);

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={1000}
        height={300}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      ></canvas>
        <TimeBar />
    </div>
  );
}

export default Time;