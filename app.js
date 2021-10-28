// ===== Created Object array=====
let naats = [{
  
    name: "naat-1",
    title: "Mere Nabi",
    singer : "junaid jamshed",
    Image_name :"image-1"

},
{
    name: "naat-2",
    title: "ya nabi salam",
    singer : "Maher zain",
    Image_name :"image-2"
},
{
    name: "naat-3",
    title: "Muhammad ka roza",
    singer : "junaid jamshed",
    Image_name :"image-3"
}

];


const music=document.querySelector("audio");
const image=document.querySelector('img');
const Play=document.getElementById("play");
const title=document.getElementById("title");
const singer=document.getElementById("singer");
const next=document.getElementById("next");
const prev=document.getElementById("prev");
let progress=document.getElementById("progress");
let curr_time= document.querySelector('.current_time');
let tot_duration= document.querySelector('.duration');
let progressDiv=document.getElementById("progress_div");

//======= FOR PLAY MUSIC ======= 
let isPlay=false;

const playMusic = () =>{
isPlay=true;
music.play();
Play.classList.replace("fa-play","fa-pause");
image.classList.add('anime');
};

//========== FOR PAUSE MUSIC========

const pauseMusic = () =>
{
    isPlay=false;
    music.pause();
    Play.classList.replace("fa-pause","fa-play");
    image.classList.remove("anime");
};

Play.addEventListener("click" , () =>{
// if(isPlay)
// {
//     pauseMusic();
// }
// else
// {
//     playMusic();
// }
  isPlay ? pauseMusic() : playMusic(); // ternary operator 

});

const loadContents = (naats) =>
{
    title.textContent=naats.title;
    singer.textContent=naats.singer;
    music.src="naat/" + naats.name + ".mp3";
    image.src="images/" + naats.Image_name + ".jpg";
}


 var naatIndex=0;
const nextNaat=()=>
{
    naatIndex=(naatIndex+1) % naats.length;
    loadContents(naats[naatIndex]);
    playMusic();
}

const prevNaat=()=>
{
    naatIndex=(naatIndex-1 +naats.length) % naats.length;
    loadContents(naats[naatIndex]);
    playMusic();
}

music.addEventListener('timeupdate',(event)=>
{

   const {currentTime,duration}= event.srcElement;
//    console.log(currentTime);
//    console.log(duration);
    let progress_time=(currentTime/duration)*100;
   progress.style.width=`${progress_time}%`;

   let minute_duration=Math.floor(duration/60);
   let sec_duration=Math.floor(duration%60);
//    console.log(minute_duration);
//    console.log(sec_duration);
let total_duration=`${minute_duration}:${sec_duration}`;
if(duration){
tot_duration.textContent=total_duration;
}
let min_duration=Math.floor(currentTime/60);
let secs_duration=Math.floor(currentTime%60);

if(secs_duration<10){
    secs_duration=`0${secs_duration}`;
}
let totals_duration=`${min_duration}:${secs_duration}`;
    curr_time.textContent=`${totals_duration}`;


});

progressDiv.addEventListener('click',(event)=>{
const {duration}=music;
let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
music.currentTime=move_progress;
});
music.addEventListener("ended",nextNaat);
next.addEventListener('click',nextNaat);
prev.addEventListener('click',prevNaat);