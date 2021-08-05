
type Presenter = {
  name: string;
  time: number;
}

export class TimeInfo{

  private startTime: Date = new Date();
  private endTime: Date  = new Date();
  private numPresenters: number = 1;
  private presenters: Presenter[] = new Array(this.numPresenters).fill({name: '', time: 0});
  private nowPresenterIndex = -1;
  private presentTime = 0;
  private breakTime = 0;

  constructor(){
    this.startTime.setHours(13);
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
    this.numPresenters = this.presenters.length;
    if(num >= 1){
      if (num > this.presenters.length) {
        for(var i=0; i<num-this.presenters.length; i++){
          this.addPresenter(this.presenters.length, '', 0);
        }
      }else if(num < this.presenters.length){
        for(var i=0; i<this.presenters.length-num; i++){
          this.deletePresenter(this.presenters.length-1);
        }
      }
    }
  }

  addNumPresenters(num: number){
    this.numPresenters = this.presenters.length;
    if(this.numPresenters + num >= 1){
      if (num > 0) {
        for(var i=0; i<num; i++){
          this.addPresenter(this.presenters.length, '', 0);
        }
      }else if(num < 0){
        for(var i=0; i<-num; i++){
          this.deletePresenter(this.presenters.length-1);
        }
      }
    }

    this.endTime.setSeconds(this.endTime.getSeconds() + 60);
    this.endTime = new Date(this.endTime);
  }

  getPresenters(){
    return this.presenters;
  }

  setPresenters(presenters: Presenter[]){
    this.presenters = presenters;
  }

  deletePresenter(idx: number){
    this.presenters = this.presenters.slice(0, idx).concat(this.presenters.slice(idx+1, this.presenters.length));
    this.numPresenters -= 1;
  }

  addPresenter(idx: number, name: string, time: number){
    this.presenters.splice(idx, 0, {name: name, time: time});
    this.numPresenters += 1;
  }

  getNowPresenterIndex(){
    return this.nowPresenterIndex;
  }

  toNextPresenter(prevTime: number){
    this.presenters[this.nowPresenterIndex]['time'] = prevTime; //実際に発表にかかった時間に更新

    this.nowPresenterIndex += 1;
    return this.presenters[this.nowPresenterIndex]['time'];
  }

  getPresentTime(){
    return this.presentTime;
  }

  setPresentTime(num: number){
    this.presentTime = num;
    for(const presenter of this.presenters){
      if(presenter['name'] !== 'break') presenter['time'] = num * 60;
    }
  }

  getBreakTime(){
    return this.breakTime;
  }

  setBreakTime(num: number){
    this.breakTime = num;
    for(const presenter of this.presenters){
      if(presenter['name'] === 'break') presenter['time'] = num * 60;
    }
  }

}