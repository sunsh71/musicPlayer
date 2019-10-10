function $(selector){
    return document.querySelector(selector)
  }
  var musicList = [
  {
    src: 'http://cloud.hunger-valley.com/music/玫瑰.mp3',
    title: '玫瑰',
    auther: '贰佰'
  },
  {
    src: './music1.mp3',
    title: 'Love Me Like You Do',
    auther: 'Kait Weston,Katherine Hughes'
  },
  {
  src: 'http://cloud.hunger-valley.com/music/ifyou.mp3',
  title: 'IF YOU',
  auther: 'Big Bang'
  }
  ]
  
  var backBtn = $('.musicbox .back')
  var playBtn = $('.musicbox .play')
  var forwardBtn = $('.musicbox .forward')
  var titleNode = $('.musicbox .title')
  var authorNode = $('.musicbox .author')
  var timeNode = $('.musicbox .time')
  var progressBarNode = $('.musicbox .progress .bar')
  var progressNowNode = $('.musicbox .progress-now')
  var icon = $('.icon')
  var timer
  
  
  function loadMusic(songObj){
    music.src = songObj.src
    titleNode.innerText = songObj.title
    authorNode.innerText = songObj.auther
    if(icon.classList.contains('fa-pause')){
      music.play()
    } else {
      icon.classList.remove('fa-play')
      icon.classList.add('fa-pause')
      music.play()
    }
  }
  
  function loadNextMusic(){
    musicIndex ++
    musicIndex = musicIndex%musicList.length
    loadMusic(musicList[musicIndex])
  }
  
  function loadLastMusic(){
    musicIndex --
    musicIndex = (musicIndex + musicList.length)%musicList.length
    loadMusic(musicList[musicIndex])
  }
  
  function updateProgress(){
    var percent = (music.currentTime/music.duration)*100 + '%'
    progressNowNode.style.width = percent
  
    var minutes = parseInt(music.currentTime/60)
    var seconds = parseInt(music.currentTime%60)+'' //转为字符串
    console.log(seconds.length)
    seconds = seconds.length == 2? seconds : '0'+seconds
    console.log(seconds)
    timeNode.innerText = minutes + ':' + seconds
  }
  
  function iconChange(){
    if(icon.classList.contains('fa-play')){
      music.play()
    } else {
      music.pause()
    }
    icon.classList.toggle('fa-play')
    icon.classList.toggle('fa-pause')
  }
  var music = new Audio()
  // music.autoplay = true
  var musicIndex = 0
  loadMusic(musicList[musicIndex])
  
  playBtn.addEventListener('click',function(){
    // var icon = this.querySelector('.fa')
    iconChange()
  })
  
  music.onplaying = function(){
    timer = setInterval(function(){
      updateProgress()
    },1000)
  }
  
  music.onpause = function(){
    clearInterval(timer)
  }
  progressBarNode.addEventListener('click',function(e){
    var percent = e.offsetX/parseInt(getComputedStyle(this).width)
    music.currentTime = percent * music.duration
    progressNowNode.style.width = percent*100 + '%'
  })
  
  forwardBtn.onclick = loadNextMusic
  backBtn.onclick = loadLastMusic
  music.onended = loadNextMusic //
  // music.shouldUpdate = true