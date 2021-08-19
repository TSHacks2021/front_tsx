import * as React from 'react';
import MemoArea from './MemoArea';
import {TimeInfo} from '../TimeInfo';
import Socket from '../WebSocket';
import { TodayPresenter } from "./TodayPresenter";



type MemoProps = {
  timeInfo: TimeInfo;
  socket: Socket;
}

var dummypresenters: TodayPresenter[] = new Array(0);

function Memo(props: MemoProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  //const [presenterNameList, setPresenterNameList] = React.useState(props.timeInfo.getPresenterList());

  //const [tPresenterList, setTPresenterList] = React.useState(dummypresenters);
  

  //const presenter = props.timeInfo.getPresenters()
  //const presenterNum = props.timeInfo.getNumPresenters()

  //発表者リストの作成
  //var presenters:string[] = new Array(0)
  /*
  for(var i = 0; i < presenterList.length; i++) {
    var temp_name = presenterList[i]
    if(temp_name !== 'break') {
      //presenters[i] = presenter[i].name
      presenters.push(presenterList[i])
    }
  }*/
  
  // const presenter = props.timeInfo.getPresenters()
  // const presenterNum = props.timeInfo.getNumPresenters()

  
  
  
  React.useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    // if (context) context.fillRect(5, 5, 100, 100);
  }, [context]);
  //console.dir(presenterNameList)
  return (
    <div
      style={{
        textAlign: 'center',
      }}>
        <div className="content">
            <MemoArea

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