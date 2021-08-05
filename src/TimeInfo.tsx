import internal from "stream";

type Presenter = {
  name: string;
  time: number;
}



export class TimeInfo{

  public startTime: Date = new Date();
  public endTime: Date  = new Date();
  public numPresenters: number = 1;
  public presenters: Presenter[] = new Array(this.numPresenters);
  public breakTime = {interbal: 1, time: 0};

  constructor(){
    this.startTime.setHours(14);
    this.endTime.setHours(16);
    this.numPresenters = 5;
    this.presenters = [
      {name:'abc', time:1500},
      {name:'def', time:1500},
      {name:'break', time:600},
      {name:'ghi', time:1500},
      {name:'jkl', time:1500}];
  }

  getStartTime(){
    return this.startTime;
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

  setNumPresenters(num: number){
    this.numPresenters = num;
  }

  addNumPresenters(num: number){
    this.numPresenters = this.numPresenters + num;
    this.endTime.setSeconds(this.endTime.getSeconds() + 60);
    this.endTime = new Date(this.endTime);
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