
import Socket from './WebSocket';


type Presenter = {
  name: string;
  time: number; // 秒
}

export class TimeInfo{


  private startTime: Date = new Date();
  private endTime: Date = new Date();
  private numPresenters: number = 1;
  private presenters: Presenter[] = new Array(this.numPresenters).fill(null).map(e=>({name: '', time: 0}));
  private nowPresenterIndex = -1;
  private presentTime = 0;
  private breakTime = 0;
  private chatMessage = {messagetype: "memo", message: "", presenter:-1, sender:""};

  private socket: Socket;

  constructor(socket: Socket){
    // this.startTime.setHours(13);
    this.endTime.setHours(this.startTime.getHours() + 3);
    this.numPresenters = 5;
    this.presenters = [
      {name:'abc', time:10},
      {name:'def', time:1500},
      {name:'break', time:600},
      {name:'ghi', time:1500},
      {name:'jkl', time:1500}
    ];
    this.presentTime = 25;
    this.breakTime = 10;

    this.socket = socket;
  }

  getStartTime(){
    return this.startTime
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


  setNowPresenterIndex(nowPresenterIndex: number){
    this.nowPresenterIndex = nowPresenterIndex;
  }


  toNextPresenter(prevTime: number){
    if(this.nowPresenterIndex >= 0){
      //実際に発表にかかった時間に更新
      var presenters_copy = this.presenters.slice();
      presenters_copy[this.nowPresenterIndex]['time'] = prevTime; 
      this.presenters = presenters_copy;
    }

    this.nowPresenterIndex += 1;
    // return this.getNowPresentDate();
  }

  getPresentTime(){
    return this.presentTime;
  }

  setPresentTime(num: number){
    this.presentTime = num;
    var presenters_copy = this.presenters.slice();
    for(var i=0; i<this.numPresenters; i++){
      if(presenters_copy[i]['name'] !== 'break' && i >= this.nowPresenterIndex) presenters_copy[i]['time'] = num * 60;
    }
    this.presenters = presenters_copy;
  }

  getNowPresentDate(){
    // 今の発表者の開始時刻と終了予定時刻，発表時間を返す

    var sec = 0;
    for(var i=0; i<this.nowPresenterIndex; i++){
      sec += this.presenters[i]['time'];
    }
    const nowPresenterStartDate = new Date();
    nowPresenterStartDate.setSeconds(this.startTime.getSeconds() + sec); //会議開始時刻 + 一人前までの発表時間の和
    const nowPresenterEndDate = new Date();
    nowPresenterEndDate.setSeconds(nowPresenterStartDate.getSeconds() + this.presenters[this.nowPresenterIndex]['time']); //発表開始時刻 + 発表時間

    console.log("getNowPresentDate")
    console.log(this.presenters);
    return [nowPresenterStartDate, nowPresenterEndDate];
  }

  getBreakTime(){
    return this.breakTime;
  }

  setBreakTime(num: number){
    this.breakTime = num;
    var presenters_copy = this.presenters.slice();
    for(var i=0; i<this.numPresenters; i++){
      if(presenters_copy[i]['name'] === 'break' && i >= this.nowPresenterIndex) presenters_copy[i]['time'] = num * 60;
    }
    this.presenters = presenters_copy;
  }

  getPresenterList(){
    var presenterlist = [];
    for (const presenter of this.presenters){
      presenterlist.push(presenter['name']);
    }
    return presenterlist;
  }

  setPresenterList(presenterlist: string[]){

    var presenters: Presenter[] = new Array(presenterlist.length).fill(null).map(e=>({name: '', time: 0}));
    for (var i=0; i < presenters.length; i++){
      presenters[i]['name'] = presenterlist[i];
    }
    this.presenters = presenters;
    
  }

  getTimeSetting(){
    var timesetting = [];
    for (const presenter of this.presenters){
      timesetting.push((presenter['time']));
    }
    console.log(timesetting);
    return timesetting;
  }

  setTimeSetting(timesetting: number[]){

    var presenters = this.presenters.slice(0, this.presenters.length);
    for (var i=0; i < presenters.length; i++){
      presenters[i]['time'] = timesetting[i];
    }
    this.presenters = presenters;
    console.log(timesetting);
    console.log(this.presenters);
  }


  sendTimeInfo(){
    const message = {
      messagetype: "setting",
      presenterlist: this.getPresenterList(),
      starttime: this.startTime.getTime(),
      endtime: this.endTime.getTime(),
      presenttime: this.presentTime * 60, //秒に直して送信
      breaktime: this.breakTime * 60, //秒に直して送信
    }
    console.log(message)

    const mes_json = JSON.stringify(message);
    this.socket.emit(mes_json);

  }

  sendChangePresenter(){
    const message = {
      messagetype: "change",
      nextpresenter: this.nowPresenterIndex + 1,
      timesetting: this.getTimeSetting(),
    }
    console.log(message);
    const mes_json = JSON.stringify(message);
    this.socket.emit(mes_json);
  }

  receiveTimeInfo(message:any){
    this.setPresenterList(message.presenterlist);
    this.setStartTime(new Date(message.starttime));
    this.setEndTime(new Date(message.endtime));
    this.setTimeSetting(message.timesetting); //message.timesettingは分単位になってる
    // this.setPresentTime(message.presenttime);
    // this.setBreakTime(message.breaktime);
  }

  getChatMessage() {
    return this.chatMessage;
  }

  setChatMessage(message: any) {
    this.chatMessage = message
  }

  receiveChangePresenter(message:any){
    this.setNowPresenterIndex(message.nextpresenter - 1);
    this.setTimeSetting(message.timesetting);
  }

}