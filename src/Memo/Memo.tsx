import { render } from '@testing-library/react';
import * as React from 'react';
//import PrivateMemo from './PrivateMemo';
import MemoArea from './MemoArea';
import {TimeInfo} from '../TimeInfo'

type MemoProps = {
  timeInfo: TimeInfo;
}

function Memo(props: MemoProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  const presenter = props.timeInfo.getPresenters()
  const presenterNum = props.timeInfo.getNumPresenters()
  var presenters:string[] = new Array(0)

  for(var i = 0; i < presenterNum; i++) {
    var temp_name = presenter[i].name
    if(temp_name != 'break') {
      //presenters[i] = presenter[i].name
      presenters.push(presenter[i].name)
    }
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
              presenterNum={presenters.length}/>
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