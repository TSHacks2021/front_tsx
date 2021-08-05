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