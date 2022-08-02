// ⚡
const player = document.querySelector('.player')
const video = player.querySelector('.viewer') // 视频元素
const toggle = player.querySelector('.toggle')  // 暂停播放按钮
const skipButtons = player.querySelectorAll('[data-skip]') // 前进后退按钮
const ranges = player.querySelectorAll('.player__slider')  // 播放声音、速度滑动条
const progress = player.querySelector('.progress')  // 进度条
const proressBar = player.querySelector('.progress__filled')  // 进度条填充

// TODO 播放、暂停视频
function togglePlay() {
  // 先根据视频是否暂停，来得出是否播放或暂停的方法
  const method = video.paused ? 'play' : 'pause'
  // 调用方法
  video[method]()
}

// TODO 切换播放按钮的图标
function updateToggle() {
  // 先根据视频是否暂停，得到具体图标
  const icon = video.paused ? '►' : '❚ ❚'
  toggle.innerHTML = icon
}

// TODO 前进后退
function skip() {
  // video.currentTime 播放时间
  // 视频当前的播放时间 += 前进后退时间
  video.currentTime += parseFloat(this.dataset.skip)
}

// TODO 视频播放声音、速度
function handleRange() {
  // video.volume 播放声音
  // video.playbackRate 播放速度
  video[this.name] = this.value
}

// TODO 更新视频进度条
function handleProgress(e) {
  // video.duration 视频总时长
  // 当前时长的百分比 = 当前视频时长 / 视频总时长
  const percent = (video.currentTime / video.duration) * 100
  // 在dom中，flexBasis 控制进度条的进度
  proressBar.style.flexBasis = percent + '%'
}

// TODO 实现视频拖动播放
function screb(e) {
  // 视频当前时长 = (当前进度条的长度 / 进度条的总长度) * 视频总时长
  const screbTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = screbTime
}

video.addEventListener('click', togglePlay) // 视频点击事件
video.addEventListener('play', updateToggle)  // 视频播放事件
video.addEventListener('pause', updateToggle) // 视频暂停事件
video.addEventListener('timeupdate', handleProgress) // 视频播放时间的更新事件
toggle.addEventListener('click', togglePlay)  // 播放按钮点击事件
skipButtons.forEach(item => item.addEventListener('click', skip)) //前进后退按钮点击事件
ranges.forEach(item => item.addEventListener('click', handleRange)) // 播放声音、速度滑动条的点击事件
ranges.forEach(item => item.addEventListener('mousemove', handleRange)) // 播放声音、速度滑动条的滑动事件
progress.addEventListener('click', screb) // 进度条的点击事件

// 鼠标按下松开的 开关变量
let mouseDown = false;
progress.addEventListener('mousedown', ()=>mouseDown=true)  // 鼠标按下事件
progress.addEventListener('mouseup', ()=>mouseDown=false)   // 鼠标松开事件
// 进度条的移动事件，当鼠标按下才调用 视频拖动播放函数
progress.addEventListener('mousemove', (e) => mouseDown && screb(e))