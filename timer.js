class Timer{
    constructor(durationInput,startButton,pauseButton,callbacks){
        this.durationInput=durationInput;
        this.startButton=startButton;
        this.pauseButton=pauseButton;
        if(callbacks){
            this.onStart=callbacks.onStart;
            this.onTick=callbacks.onTick;
            this.onComplete=callbacks.onComplete;
        }
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }
    start=()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        
        this.tick();
        this.intervalId=setInterval(this.tick,50);
        this.startButton.setAttribute('disabled','true');
        
    }
    pause=()=>{
        clearInterval(this.intervalId);
        this.startButton.removeAttribute('disabled');
    }
    tick=()=>{
        // here timeRemaining irefers to setter function
        if(this.timeRemaining<=0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }
        else{

            // this is a short hand using getter and setter method. the LHS refers to setter method and RHS refers to getter method; they are not the same .. remind that
            this.timeRemaining=this.timeRemaining-0.05;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
        
    }
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){
        this.durationInput.value=time.toFixed(2);
    }
}