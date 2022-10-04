export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();
    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
    };

    this.interval = null;
    this.remainingSeconds = 90;

    this.el.control.addEventListener("click",()=> {
      if (this.interval === null) {
        this.start();
      } else {
        this.stop();
      }
    })
  }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2,"0");
    this.el.seconds.textContent = seconds.toString().padStart(2,"0");
  }
  
  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(()=>{
      this.remainingSeconds--;
      this.updateInterfaceTime();
      if(this.remainingSeconds === 0) {
        this.stop();
      }
    },1000)

    this.updateInterfaceControls();
  }

  stop(){
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceControls();
  }


  static getHTML() {
    return `
    <span class="timer__part timer__part--minutes">00</span>
    <span class="timer__part">:</span>
    <span class="timer__part timer__part--seconds">00</span>
    <button type="button" class="timer__btn timer__btn--control">Старт</button>
    `;
  }
}
