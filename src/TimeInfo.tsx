import internal from "stream";

type Presenter = {
  name: string;
  time: number;
}



export class TimeInfo{

  private startTime: Date = new Date();
  private endTime: Date  = new Date();
  private numPresenters: number = 1;
  private presenters: Presenter[] = new Array(this.numPresenters);
  private breakTime = {interbal: 1, time: 0};

  private begintime = 35600;
  private endtime = 42200;
  private names:string[] = ['abc', 'def', 'break', 'ghi', 'jkl'];
  private times:number[] = [1500, 1500, 600, 1500, 1500];

  getStartTime(){
    return this.startTime;
  }

  test(){
    var a:any[] = [this.begintime, this.endtime, this.names, this.times]
    return a;
  }

  getEndTime(){
    return this.endTime;
  }
  
  setStartTime(startTime: Date){
    this.startTime = startTime;
  }

  setEndTime(endTime: Date){
    this.endTime = endTime;
  }

  getNumPresenters(){
    return this.numPresenters;
  }

  addNumPresenters(num: number){
    this.numPresenters = this.numPresenters + num;
  }

  getPresenters(){
    return this.presenters;
  }

  setPresenters(){

  }

  getBreakTime(){
    return this.breakTime;
  }

  setBreakTime(){

  }

}