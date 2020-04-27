//script for alert box.
Swal.fire({
    icon: 'info',
    title: 'Animated Timer Widget',
    text: 'You can adjust the timer value by clicking on it  and enerting new value',
    footer: 'Try it out '
  })


const getEl=(el)=>{
    return document.querySelector(el);
}


// setting timercircle properties based on screen size

const dial=getEl('.dial');
const timerCircle=getEl('#timerCircle');
function circleResize(){
    let dialWidth=getComputedStyle(dial).width;
    if(dialWidth==='400px'){
        timerCircle.setAttribute('r',190);
        timerCircle.setAttribute('cx',200);
        timerCircle.setAttribute('cy',200);
        timerCircle.setAttribute('transform','rotate(-90 200 200)');
    }
    

}
circleResize();
// run this function at each window resize
// window.addEventListener('resize',()=>{
//     window.location.reload();
// });


const durationInput=getEl('#durationInput');
const startButton=getEl('#startButton');
const pauseButton=getEl('#pauseButton');

let perimeter=timerCircle.getAttribute('r')*2*Math.PI;
timerCircle.setAttribute('stroke-dasharray',perimeter);
let duration;
// duration set to undefined each time input is changed. so that if conditon in the onstart function  becomes true and new total duration is accessed.
durationInput.addEventListener('input',()=>{
    duration=undefined;
    // code to enable start button again
    startButton.removeAttribute('disabled');
    
})
const timer=new Timer(durationInput,startButton,pauseButton,{
     onStart(totalDuration) {
        console.log('timer started');
        if(!duration){
            duration=totalDuration;
        }
        

    },
    onTick(timeRemaining){
        
        console.log('timer ticked down', timeRemaining);
        // a little trick to play tick sound at one second gap. played only when timeremaing does not contain '.' .
        if(!timeRemaining.toString().includes('.')){
            getEl('#tick').play();
        }
        let strokeOffset=perimeter*timeRemaining/duration-perimeter;
        timerCircle.setAttribute('stroke-dashoffset',strokeOffset);
    },
    onComplete(){
        console.log('timer completed');
        getEl('#timeOver').play();
        durationInput.classList.add('blinking');
        setTimeout(()=>{
            durationInput.classList.remove('blinking');
        },5000);
    }
});

