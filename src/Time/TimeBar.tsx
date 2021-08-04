import { render } from '@testing-library/react';
import * as React from 'react';

const begintime = 46800;
const endtime = 53400;
const beginposition = 40;
const endposition = 920;
const vertical_bar_y_begin = 30;
const vertical_bar_y_end = 110;
const bar_y_position = 70;
const timetext_y_position = 140;
const nametext_y_position = 45;
const names:string[] = ['abc', 'def', 'break', 'ghi', 'jkl'];
const times:number[] = [1500, 1500, 600, 1500, 1500];
const colors:string[] = ['red', 'blue', 'black', 'green', 'orange'];

function calcBarPosition() {
  var barposition:number[] = new Array(4);
  var timelength = endtime - begintime;
  var barlength = endposition - beginposition;
  var sum;

  for (var i = 0; i < times.length - 1; i++) {
    sum = 0;
    for (var j = 0; j <= i; j++) {
      sum += times[j];
    }
    barposition[i] = beginposition + (barlength * (sum / timelength));
  }

  return barposition;
}

function secTohourmin(seconds:number) {
  var hour:number = Math.floor(seconds / 3600);
  var min:number = Math.floor((seconds - (hour * 3600)) / 60);
  var hourstr:string
  var minstr:string

  if (hour < 10) {
    hourstr = '0' + String(hour);
  }
  else {
    hourstr = String(hour);
  }
  if (min < 10) {
    minstr = '0' + String(min);
  }
  else {
    minstr = String(min);
  }

  return (hourstr + ':' + minstr);
}

function TimeBar() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.position = 'absolute';
      canvasRef.current.style.left = '280px';
      canvasRef.current.style.top = '10px';
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    if (context) {
      var barposition = calcBarPosition();
      context.globalAlpha = 1.0
      context.strokeStyle = 'black';
      context.textAlign = 'center';
      // begin time
      context.beginPath();
      context.moveTo(beginposition, vertical_bar_y_begin);
      context.lineTo(beginposition, vertical_bar_y_end);
      context.stroke();
      context.font = '25px serif';
      context.fillText(names[0], (beginposition + barposition[0]) / 2, nametext_y_position)
      context.font = '30px serif';
      context.fillText(secTohourmin(begintime), beginposition, timetext_y_position)

      // end time
      context.beginPath();
      context.moveTo(endposition, vertical_bar_y_begin);
      context.lineTo(endposition, vertical_bar_y_end);
      context.stroke();
      context.font = '25px serif';
      context.fillText(names[names.length - 1], (barposition[barposition.length - 1] + endposition) / 2, nametext_y_position)
      context.font = '30px serif';
      context.fillText(secTohourmin(endtime), endposition, timetext_y_position)

      // change time
      for (var i = 0; i < barposition.length + 1; i++) {
        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(barposition[i], vertical_bar_y_begin);
        context.lineTo(barposition[i], vertical_bar_y_end);
        context.stroke();
        context.strokeStyle = colors[i];
        context.beginPath();
        if (i == 0) {
          context.moveTo(beginposition, bar_y_position);
        }
        else {
          context.moveTo(barposition[i - 1], bar_y_position);
        }
        if (i < barposition.length - 1) {
          context.lineTo(barposition[i], bar_y_position);
        }
        else {
          context.lineTo(endposition, bar_y_position);
        }
        context.stroke();
        if (i < barposition.length) {
          var sum = 0;
          for (var j = 0; j <= i; j++) sum += times[j];
          if (i > 0) {
            context.font = '25px serif';
            context.fillText(names[i], (barposition[i - 1] + barposition[i]) / 2, nametext_y_position)
          }
          context.font = '30px serif';
          context.fillText(secTohourmin(begintime + sum), barposition[i], timetext_y_position)
        }
      }
    }
  }, [context]);

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={960}
        height={150}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      ></canvas>
    </div>
  );
}

export default TimeBar;