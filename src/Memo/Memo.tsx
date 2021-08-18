import * as React from 'react';
import MemoArea from './MemoArea';
import {TimeInfo} from '../TimeInfo';
import Socket from '../WebSocket';
import { TodayPresenter } from "./TodayPresenter";

var checksetPresenters:any = null;

type MemoProps = {
  timeInfo: TimeInfo;
  socket: Socket;
}

var dummypresenters: TodayPresenter[] = new Array(0);

function Memo(props: MemoProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const [presenterList, setPresenterList] = React.useState(props.timeInfo.getPresenterList());

  const [presentersList, setPresentersList] = React.useState(dummypresenters);
  if (checksetPresenters) clearInterval(checksetPresenters);
  checksetPresenters = setInterval(function(){console.log('memo'); setPresenterList(props.timeInfo.getPresenterList())}, 100);

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
  }
  */
  // const presenter = props.timeInfo.getPresenters()
  // const presenterNum = props.timeInfo.getNumPresenters()

  React.useEffect(() => {
    //const newPresenterList = presenterList
    //const newPresenterList:strig[] = new Array(0)
    const newPresenterList: TodayPresenter[] = new Array(0)
    for(var i = 0; i < presenterList.length; i++) {
      var temp_name = presenterList[i]
      if(temp_name !== 'break') {
        //presenters[i] = presenter[i].name
        const tempTodayPresenter = {
          id: i,
          name: temp_name,
          privateMemo: "",
          chats: [""],
      }
        newPresenterList.push(tempTodayPresenter)
      }
    }
    //presenters = newPresenterList
    setPresentersList(newPresenterList)
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
  console.dir(presentersList)
  return (
    <div
      style={{
        textAlign: 'center',
      }}>
        <div className="content">
            <MemoArea
              presenters={presentersList}
              presenterNum={presentersList.length}
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