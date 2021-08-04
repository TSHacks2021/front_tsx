import { render } from '@testing-library/react';
import { time } from 'console';
import * as React from 'react';

import DisplayTime from './DisplayTime';
import SettingModal from './SettingModal';

import TimeBar from './TimeBar';


import { TimeInfo } from '../TimeInfo';

type Props = {
  timeInfo: TimeInfo;
}

function Time(props: Props) {
  
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
      <DisplayTime 
        endTime={{seconds:0, minutes:10, hours:0}}
      />
      <SettingModal 
        timeInfo={props.timeInfo}
      />
        
    </div>
  );
}

export default Time;