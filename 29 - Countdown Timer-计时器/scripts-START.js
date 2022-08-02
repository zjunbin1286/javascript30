const timeDisplay = document.querySelector('.display__time-left') 
const endTimeDisplay = document.querySelector('.display__end-time')
const timerBtns = document.querySelectorAll('.timer__button')

let countdown
// * 定时器
function timer(seconds) {
  clearInterval(countdown)  // 开始定时前先清除定时器
  // 总毫秒数 = 当前时间毫秒数 + 传入的毫秒数
  let then = Date.now() + (seconds * 1000)
  showTimeLeft(seconds) // 调用 showTimeLeft()
  showEndTime(then) // 调用 showEndTime()
  countdown = setInterval(() => {
    // 剩余秒数 = Math.round((总毫秒数 - 当前时间毫秒数) / 100) => 转换为秒数
    let leftSeconds = Math.round((then - Date.now()) / 1000)
    // 时间一到，停止计时
    if (leftSeconds < 0) {
      clearInterval(countdown)
      return
    }
    showTimeLeft(leftSeconds)
  }, 1000)
}

// * 动态剩余秒数展示
function showTimeLeft(seconds) {
  const mins = Math.floor(seconds / 60) // 秒转分钟
  // 剩余秒数（如果是个位数，就在前面加个 0 ）
  const remainedSeconds = (seconds % 60) < 10  ? '0'+ seconds % 60 : seconds % 60
  const display = `${mins}:${remainedSeconds}`
  timeDisplay.textContent = display
  document.title = display

}

// * 截止时间展示 小时:分钟
function showEndTime(timeStamp) {
  const endTime = new Date(timeStamp)
  const hour = endTime.getHours()
  const mins = endTime.getMinutes()
  const endDisplay = `截止时间 ${hour}:${mins < 10 ? '0' : ''}${mins}`
  endTimeDisplay.textContent = endDisplay
}

function show(e) {
  let time = e.target.dataset.time 
  timer(time)
}

timerBtns.forEach(btn => btn.addEventListener('click', show))

// 这个 customForm 为表单的name属性值，可以通过 document 直接获取到该元素
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  let time = this.minutes.value // minutes 为 form 表单里面 input 元素的 name 属性值
  timer(time * 60)
  this.reset();
})