import * as React from 'react';
import { TimeInfo } from "../TimeInfo";

import { useWindowDimensions } from "../WindowDimensions";

const canvas_left_mag = 0.182;
const canvas_right_mag = 0.625;
const canvas_bottom_mag = 0.097;
const startposition_mag = 0.026;
const endposition_mag = 0.599;
const nowtime_bar_x_diff_mag = 0.013;
const vertical_bar_y_mag = 0.02;
const nowtime_bar_y_mag = 0.015;
var time:Date;
const bar_y_position_mag = 0.045;
const timetext_y_mag = 0.048;
const nametext_y_mag = 0.015;
const nowtimetext_y_position_mag = 0.032;
const font_size_little_mag = 0.0162;
const font_size_big_mag = 0.0195;
const font_size_min_mag = 0.013;
const colors:string[] = ['red', 'blue', 'black', 'green', 'orange'];
var checksetStartTime:any = null;
var checksetEndTime:any = null;
var checksetPresenters:any = null;
var checkdraw:any = null;

type Props = {
  timeInfo: TimeInfo;
}


function calcBarPosition(starttime:number, endtime:number, times:number[], startposition:number, endposition:number) {
  var barposition:number[] = new Array(times.length - 1);
  var timelength = endtime - starttime;
  var barlength = endposition - startposition;
  var sum;

  for (var i = 0; i < times.length - 1; i++) {
    sum = 0;
    for (var j = 0; j <= i; j++) {
      sum += times[j];
    }

    barposition[i] = startposition + (barlength * (sum / timelength));

  }

  return barposition;
}


function calcNowtimePosition(timestr:string, starttime:number, endtime:number, startposition:number, endposition:number) {
  var timelength = endtime - starttime;
  var barlength = endposition - startposition;
  var second = hourminsecTosec(timestr);

  return (startposition + (barlength * ((second - starttime) / timelength)));
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


function draw(context:any, canvasRef:any, width:number, height:number, starttime:number, endtime:number, names:string[], times:number[]) {
  var startposition = startposition_mag * width;
  var endposition = endposition_mag * width;
  var nowtime_bar_x_diff = nowtime_bar_x_diff_mag * width;
  var font_little = String(font_size_little_mag * width) + 'px serif';
  var font_big = String(font_size_big_mag * width) + 'px serif';
  var font_min = String(font_size_min_mag * width) + 'px serif';
  var bar_y_position = bar_y_position_mag * width;
  time = new Date();
  if (context) {
    if (canvasRef.current) context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    var barposition = calcBarPosition(starttime, endtime, times, startposition, endposition);
    context.globalAlpha = 1.0;

    context.strokeStyle = 'black';
    context.textAlign = 'center';
    // begin time
    context.beginPath();

    context.moveTo(startposition, bar_y_position - (vertical_bar_y_mag * width));
    context.lineTo(startposition, bar_y_position + (vertical_bar_y_mag * width));
    context.stroke();
    context.font = font_little;
    context.fillText(names[0], (startposition + barposition[0]) / 2, bar_y_position - (nametext_y_mag * width));
    context.font = font_big;
    context.fillText(secTohourmin(starttime), startposition, bar_y_position + (timetext_y_mag * width));
  
    // end time
    context.beginPath();
    context.moveTo(endposition, bar_y_position - (vertical_bar_y_mag * width));
    context.lineTo(endposition, bar_y_position + (vertical_bar_y_mag * width));
    context.stroke();
    context.font = font_little;
    context.fillText(names[names.length - 1], (barposition[barposition.length - 1] + endposition) / 2, bar_y_position - (nametext_y_mag * width));
    context.font = font_big;
    context.fillText(secTohourmin(endtime), endposition, bar_y_position + (timetext_y_mag * width));

  
    // change time
    for (var i = 0; i < barposition.length + 1; i++) {
      context.strokeStyle = 'black';
      context.beginPath();

      context.moveTo(barposition[i], bar_y_position - (vertical_bar_y_mag * width));
      context.lineTo(barposition[i], bar_y_position + (vertical_bar_y_mag * width));
      context.stroke();
      context.strokeStyle = colors[i];
      context.beginPath();
      if (i == 0) {

        context.moveTo(startposition, bar_y_position);
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
          context.font = font_little;
          context.fillText(names[i], (barposition[i - 1] + barposition[i]) / 2, bar_y_position - (nametext_y_mag * width));
        }
        context.font = font_big;
        context.fillText(secTohourmin(starttime + sum), barposition[i], bar_y_position + (timetext_y_mag * width));
      }
    }
  
    // now time
    var timestr = time.toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'});
    var nowtimeposition = calcNowtimePosition(timestr, starttime, endtime, startposition, endposition);
    context.strokeStyle = 'black';
    context.beginPath();
    context.moveTo(nowtimeposition - nowtime_bar_x_diff, bar_y_position - (nowtime_bar_y_mag * width));
    context.lineTo(nowtimeposition, bar_y_position);
    context.stroke();
    context.beginPath();
    context.moveTo(nowtimeposition - nowtime_bar_x_diff, bar_y_position + (nowtime_bar_y_mag * width));
    context.lineTo(nowtimeposition, bar_y_position);
    context.stroke();
    context.font = font_min;
    context.fillText(timestr, nowtimeposition, bar_y_position + (nowtimetext_y_position_mag * width));
  }
}

function TimeBar(props: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const [startTime, setStartTime] = React.useState(props.timeInfo.getStartTime());
  const [endTime, setEndTime] = React.useState(props.timeInfo.getEndTime());
  const [presenters, setPresenters] = React.useState(props.timeInfo.getPresenters());
  const windowdimensions = useWindowDimensions();

  var starttime:number;
  var endtime:number;
  var names:string[] = [];
  var times:number[] = [];
  var width:number = windowdimensions.width;
  var height:number = windowdimensions.height;


  if (checksetStartTime) clearInterval(checksetStartTime);
  checksetStartTime = setInterval(function(){/*console.log("timebar"); */setStartTime(props.timeInfo.getStartTime())}, 100);
  starttime = hourminsecTosec(startTime.toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}));

  if (checksetEndTime) clearInterval(checksetEndTime);
  checksetEndTime = setInterval(function(){setEndTime(props.timeInfo.getEndTime())}, 100);
  endtime = hourminsecTosec(endTime.toLocaleTimeString([], {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'}));

  if (checksetPresenters) clearInterval(checksetPresenters);
  checksetPresenters = setInterval(function(){setPresenters(props.timeInfo.getPresenters())}, 100);

  for (var i = 0; i < presenters.length; i++) {
    names.push(presenters[i].name);
    times.push(presenters[i].time);
  }

  React.useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.position = 'absolute';

      canvasRef.current.style.left = String(canvas_left_mag * width) + 'px';
      canvasRef.current.style.top = '10px';
      if (checkdraw) clearInterval(checkdraw);
      checkdraw = setInterval(function(){draw(context, canvasRef, width, height, starttime, endtime, names, times)}, 10);
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      }
    }

    draw(context, canvasRef, width, height, starttime, endtime, names, times);
  }, [context, startTime, endTime, presenters, windowdimensions]);


  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <canvas
        id="canvas"
        ref={canvasRef}

        width={canvas_right_mag * width}
        height={canvas_bottom_mag * width}
        style={{
          border: '2px solid #000',
          marginTop: 10,
        }}
      ></canvas>
    </div>
  );
}

export default TimeBar;