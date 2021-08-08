import * as React from 'react';
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
  const [presenterList, setPresenterList] = React.useState(props.timeInfo.getPresenterList());
  if (checksetPresenters) clearInterval(checksetPresenters);
  checksetPresenters = setInterval(function(){setPresenterList(props.timeInfo.getPresenterList())}, 100);

  //const presenter = props.timeInfo.getPresenters()
  //const presenterNum = props.timeInfo.getNumPresenters()

  //発表者リストの作成
  var presenters:string[] = new Array(0)

  React.useEffect(() => {
    const newPresenterList = presenterList
    presenters = newPresenterList
  },[presenterList])
  
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