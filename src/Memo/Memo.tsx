import { render } from '@testing-library/react';
import * as React from 'react';
//import PrivateMemo from './PrivateMemo';
import MemoArea from './MemoArea';
import {TimeInfo} from '../TimeInfo'
import Socket from '../WebSocket'

var checksetPresenters:any = null;

type MemoProps = {
  timeInfo: TimeInfo;
  socket: Socket;
}

function Memo(props: MemoProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const [presenter, setPresenters] = React.useState(props.timeInfo.getPresenters());
  if (checksetPresenters) clearInterval(checksetPresenters);
  checksetPresenters = setInterval(function(){setPresenters(props.timeInfo.getPresenters())}, 100);

  //const presenter = props.timeInfo.getPresenters()
  //const presenterNum = props.timeInfo.getNumPresenters()
  var presenters:string[] = new Array(0)

  for(var i = 0; i < presenter.length; i++) {
    var temp_name = presenter[i].name
    if(temp_name != 'break') {
      //presenters[i] = presenter[i].name
      presenters.push(presenter[i].name)
    }
  }

  const presenter = props.timeInfo.getPresenters()
  const presenterNum = props.timeInfo.getNumPresenters()
  var presenters:string[] = new Array(presenterNum)

  for(var i = 0; i < presenterNum; i++) {
    presenters[i] = presenter[i].name
  }

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
        <div className="content">
            <MemoArea
              presenters={presenters}
              presenterNum={presenters.length}
              timeInfo={props.timeInfo}
              socket={props.socket}/>
            {/*<PrivateMemo/>*/}
          </div>
      {/*<canvas
        id="canvas"
        ref={canvasRef}
        width={1000}
        height={500}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      >
        
      </canvas>*/}
      
    </div>
  );
}

export default Memo;