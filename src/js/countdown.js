export class CountDown{
    minutes;
    seconds;
    constructor(minutes = 0, seconds = 0){
        this.minutes = minutes * 1;
        this.seconds = seconds * 1;
    }
    toString(){
        let textMin = this.minutes < 10 ? "0" + this.minutes : this.minutes
        let textSec = this.seconds < 10 ? "0" + this.seconds : this.seconds
        return `${ textMin }:${ textSec }`;
    }   
    isDone(){
        return this.minutes === 0 && this.seconds === 0;
    }
    decrease(){
        if( !this.isDone() ){
            if( this.seconds === 0 ){
                this.minutes --;
                this.seconds = 59
            }else{
                this.seconds --;
            }
        }
        return this.isDone()
    }
    getData(){
        return {
            minutes: this.minutes,
            seconds: this.seconds
        }
    }
}