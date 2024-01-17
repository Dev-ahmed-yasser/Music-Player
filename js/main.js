function $(el){
  return document.querySelector(`${el}`);
}
let AllSongs = [
  {
    "name": "cloud nine",
    "artist": " nawhij ",
    "image": "images/4.jpg",
    "src": "songs/cloud nine by nawhij - 나우히즈 - ナウヒズ.mp3"
  },
  {
    "name": "bikes at the pier",
    "artist": " Nogymx",
    "image": "images/1.jpg",
    "src": "songs/bikes at the pier [lofi hip hop] by Nogymx.mp3"
  },
  {
    "name": "Rainy",
    "artist": " COSMONKEY",
    "image": "images/2.jpg",
    "src": "songs/Rainy by COSMONKEY.mp3"
  },
  {
    "name": "wait for you",
    "artist": " Kurt Stewart",
    "image": "images/3.jpg",
    "src": "songs/wait for you by Kurt Stewart.mp3"
  },
  {
    "name": "Stream hydrangea",
    "artist": " nawhij ",
    "image": "images/5.jpg",
    "src": "songs/Stream hydrangea by nawhij - 나우히즈 - ナウヒズ - Listen online for free on SoundCloud.mp3"
  }
]


  function showData(){
    let showSongs = AllSongs.map((el,i)=>{
      return`
        <div data-index="${i}" class="d-flex gap-30 mb-15 song cursor-pointer">
          <div class="none-pointer-events">
            <span>${i+1}</span>
          </div>
          <div class="d-flex flex-column none-pointer-events">
            <h5>${el.name}</h5>
            <p>${el.artist}</p>
          </div>
        </div>
      `
  })
  showSongs = showSongs.join("")
  $("#main-body").innerHTML = showSongs
  }
  // select the first song as default
  setTimeout(() => {
    showData()
  $("#songs-count").innerHTML = " ("+ AllSongs.length+")"
  loadTrack(0,false)
  const songs = document.querySelectorAll(".song");
  songs[0].classList.add("active")
  }, 1000);

// load track info when meta data is loaded
$("#track").addEventListener("loadedmetadata",()=>{
  $("#now").innerHTML = formatTime($("#track").currentTime)
  $("#total").innerHTML = formatTime($("#track").duration)
  $("#volume-range").value = $("#track").volume * 100;
  updater = setInterval( progressUpdate,300);
  $(".loader").classList.add("d-none")
})

  //handle active track selection in music list
  let updater;
  let trackIndex = 0
  $("#main-body").onclick = (e) =>{
    // set track index
    trackIndex = e.target.dataset.index
    // handle active song
    if(e.target.classList.contains("song")){
      const songs = document.querySelectorAll(".song");
      songs.forEach((song)=>{
        song.classList.remove("active")
        e.target.classList.add("active")
      })
    }
    loadTrack(trackIndex,true)
    $("#image").style.animationPlayState = "running"
    $("#player").style.top = "0"
  }

//load track to player and mini player
function loadTrack(index,play){
  $("#mini-img").src = AllSongs[index].image;
  $("#track-name").innerHTML = AllSongs[index].name;
  $("#artist").innerHTML = AllSongs[index].artist;
  $("#track").src = AllSongs[index].src
  // player
  $("#image").src = AllSongs[index].image;
  $("#song-name").innerHTML = AllSongs[index].name;
  $("#artist-name").innerHTML = AllSongs[index].artist;
  if(play){
    $("#track").play()
    isPlaying = true
    $("#mini-play-pause").innerHTML = `<span class="fas fa-pause none-pointer-events"></span>`
    $("#play-pause").innerHTML = `<span class="fas fa-pause none-pointer-events fa-lg"></span>`
    $("#mini-play-pause").style.paddingInlineStart = "0px"
    $("#play-pause > span").style.paddingInlineStart = "0px"
  } 
  $("#now").innerHTML = formatTime($("#track").currentTime)
  $("#total").innerHTML = formatTime($("#track").duration)
}

// handle play-pause button
let isPlaying = false;
const buttons = document.querySelectorAll(".play-pause-btn")
buttons.forEach((button) =>{
  button.onclick = () =>{
    if(isPlaying == false){
      $("#mini-play-pause").innerHTML = `<span class="fas fa-pause none-pointer-events"></span>`
      $("#mini-play-pause").style.paddingInlineStart = "0px"
      $("#play-pause").innerHTML = `<span class="fas fa-pause none-pointer-events fa-lg"></span>`
      $("#play-pause > span").style.paddingInlineStart = "0px"
      $("#track").play()
      $("#image").style.animationPlayState = "running"
      isPlaying = true;
    }else{
      // clearInterval(updater)
      $("#mini-play-pause").innerHTML = `<span class="fas fa-play none-pointer-events"></span>`
      $("#mini-play-pause").style.paddingInlineStart = "3px"
      $("#play-pause").innerHTML = `<span class="fas fa-play none-pointer-events fa-lg"></span>`
      $("#play-pause > span").style.paddingInlineStart = "4px"
      $("#image").style.animationPlayState = "paused"
      $("#track").pause()
      isPlaying = false;
    }
  }
})

// update track progress
function progressUpdate(){
  $("#mini-progress").style.width = ((Math.floor($("#track").currentTime) / Math.floor($("#track").duration))) * 100 +"%"
  $("#progress").style.width = ((Math.floor($("#track").currentTime) / Math.floor($("#track").duration))) * 100 +"%"
  $("#now").innerHTML = formatTime($("#track").currentTime)
}

// formate time for the current and full time of the track
function formatTime(sec){
  let mins = Math.floor(sec / 60);
  let seconds = Math.floor(sec - (mins * 60));
  if(mins < 10){
    mins = `0${mins}`;
  }
  if(seconds < 10){
    seconds = `0${seconds}`;
  }
  return `${mins}:${seconds}`;
}

// back to music list to choose
$("#back-btn").onclick = () =>{
  $("#player").style.top = "120%"
}
// open the player from the mini player
$(".mini-player").onclick = (e) => {
  if(!e.target.classList.contains("mini-play")){
    $("#player").style.top = "0"
  }
}

// handle seeking audio 
$(".progress-wrapper").onclick = (e) => {
  $("#track").currentTime = (e.offsetX / $(".progress-wrapper").clientWidth) * $("#track").duration
}

// handling next button in the player
function next(){
  shuffleState = false
  trackIndex++
  if(trackIndex > AllSongs.length -1){
    trackIndex = 0
  }
  const songs = document.querySelectorAll(".song");
  songs.forEach((song)=>song.classList.remove("active"));
  songs[trackIndex].classList.add("active")
  loadTrack(trackIndex,true)
}
$("#forward").addEventListener("click",next)

// handling previous button in the player
function prev(){
  shuffleState = false
  trackIndex--
  if(trackIndex < 0){
    trackIndex = AllSongs.length-1
  }
  const songs = document.querySelectorAll(".song");
  songs.forEach((song)=>song.classList.remove("active"));
  songs[trackIndex].classList.add("active")
  loadTrack(trackIndex,true)
}
$("#backward").addEventListener("click",prev)

// handle loop button
let trackLoop = false;
$("#loop").onclick = () => {
  trackLoop = !trackLoop
  $("#track").loop = trackLoop
  trackLoop ? $("#loop").classList.add("loop-true") : $("#loop").classList.remove("loop-true")
}


// handle volume level
$("#volume-range").onchange = () => {
  $("#track").volume = $("#volume-range").value / 100;
}

window.addEventListener("click",(e)=>{
  if(e.target.classList[0] != "volume" && e.target.classList[0] != "volume-control"){
    $("#volume-control").style.display = "none"
  }else{
    $("#volume-control").style.display = "flex"
  }
})


// handle sorting function 
let isSorted = false
function sorting(){
  isSorted ? AllSongs.sort((b,a)=> a.name.localeCompare(b.name)) :AllSongs.sort((a,b)=> a.name.localeCompare(b.name)) 
  isSorted = !isSorted;
  showData()
}
$("#sort-btn").addEventListener("click",sorting)


// handle shuffle function
let shuffleState = false
function shuffle(){
  shuffleState = true
  let random = Math.floor(Math.random() * AllSongs.length ) 
  do{
    random = Math.floor(Math.random() * AllSongs.length ) 
  }while(trackIndex == random){
    trackIndex = random
  }
  const songs = document.querySelectorAll(".song");
  songs.forEach((song)=>song.classList.remove("active"));
  songs[trackIndex].classList.add("active")
  loadTrack(trackIndex,true)
  $("#image").style.animationPlayState = "running"
}
$("#shuffle-btn").addEventListener("click",shuffle)

//handle auto looping on the list 
$("#track").onended = ()=>{
  if(shuffleState){
    shuffle()
  }else{
    const songs = document.querySelectorAll(".song");
    songs.forEach((song)=>song.classList.remove("active"));
    songs[trackIndex].classList.add("active")
    loadTrack(trackIndex,true)
  }
}
