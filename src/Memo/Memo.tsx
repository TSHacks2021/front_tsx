import * as React from 'react';
import MemoArea from './MemoArea';
import {TimeInfo} from '../TimeInfo';
import Socket from '../WebSocket';
import { TodayPresenter } from "./TodayPresenter";



type MemoProps = {
  timeInfo: TimeInfo;
  socket: Socket;
}

function Memo(props: MemoProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }
  }, [context]);

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
        <div className="content">
            <MemoArea
              timeInfo={props.timeInfo}
              socket={props.socket}/>
          </div>      
    </div>
  );
}

export default Memo;