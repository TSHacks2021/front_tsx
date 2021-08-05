import * as React from 'react';
import { TimeInfo } from "../TimeInfo";

// const begintime = 52600;
// const endtime = 60200;
const beginposition = 40;
const endposition = 920;
const vertical_bar_y_begin = 30;
const vertical_bar_y_end = 110;
const nowtime_bar_y_begin = 50;
const nowtime_bar_y_end = 90;
const nowtime_bar_x_diff = 20;
var time:Date;
const bar_y_position = 70;
const timetext_y_position = 140;
const nametext_y_position = 45;
const nowtimetext_y_position = 110;
// const names:string[] = ['abc', 'def', 'break', 'ghi', 'jkl'];
// const times:number[] = [1500, 1500, 600, 1500, 1500];
const colors:string[] = ['red', 'blue', 'black', 'green', 'orange'];

type Props = {
  timeInfo: TimeInfo;
}

function calcBarPosition(begintime:number, endtime:number, times:number[]) {
  var barposition:number[] = new Array(times.length - 1);
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

function calcNowtimePosition(timestr:string, begintime:number, endtime:number) {
  var timelength = endtime - begintime;
  var barlength = endposition - beginposition;
  var second = hourminsecTosec(timestr);

  return (beginposition + (barlength * ((second - begintime) / timelength)));
}

function secTohourmin(seconds:number) {
  var hour:number = Math.floor(seconds / 3600);
  var min:number = Math.floor((seconds - (hour * 3600)) / 60);
  var hourstr:string;
  var minstr:string;

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

function hourminsecTosec(time:string) {
  var timestrs = time.split(':');
  var hour:number = Number(timestrs[0]);
  var min:number = Number(timestrs[1]);
  var second:number = Number(timestrs[2]);

  return ((hour * 3600) + (min * 60) + second);
}

function draw(context:any, canvasRef:any, begintime:number, endtime:number, times:number[], names:string[]) {
  time = new Date();
  if (context) {
    if (canvasRef.current) context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    var barposition = calcBarPosition(begintime, endtime, times);
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
  
    // now time
    var timestr = time.toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'});
    var nowtimeposition = calcNowtimePosition(timestr, begintime, endtime);
    context.strokeStyle = 'black';
    context.beginPath();
    context.moveTo(nowtimeposition - nowtime_bar_x_diff, nowtime_bar_y_begin);
    context.lineTo(nowtimeposition, bar_y_position);
    context.stroke();
    context.beginPath();
    context.moveTo(nowtimeposition - nowtime_bar_x_diff, nowtime_bar_y_end);
    context.lineTo(nowtimeposition, bar_y_position);
    context.stroke();
    context.font = '20px serif';
    context.fillText(timestr, nowtimeposition, nowtimetext_y_position);
  }
}

function TimeBar(props: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    var test = props.timeInfo.test();
    var begintime = test[0];
    var endtime = test[1];
    var names = test[2];
    var times = test[3];

    if (canvasRef.current) {
      canvasRef.current.style.position = 'absolute';
      canvasRef.current.style.left = '280px';
      canvasRef.current.style.top = '10px';
      setInterval(function(){draw(context, canvasRef, begintime, endtime, times, names)}, 1000);
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }
    draw(context, canvasRef, begintime, endtime, times, names);
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