const timeLeft = document.querySelector('.display__time-left')
const entTime = document.querySelector('.display__end-time')
const timeBtns = document.querySelectorAll('[data-time]')
const tip = document.querySelector('.tips')
const reset = document.querySelector('.reset')
const stopwatchBtn = document.querySelector('.stopwatch') // 秒表按钮

let timerToken; // 倒计时器 ID
let watchToken  // 秒表计时器 ID
let wmill = 0   // 秒表-毫秒
let wseconds =0 // 秒表-秒
let wmins = 0   // 秒表-分钟 
let whour = 0;  // 秒表-小时
let flag = false// 秒表开关

// 计时器
function timer(seconds) {
  clearInterval(timerToken)
  clearInterval(watchToken)
  // 总毫秒数
  let totalTime = Date.now() + (seconds * 1000);
  showTimer(seconds);
  showEndTime(totalTime)
  timerToken = setInterval(() => {
    let secondsLeft = Math.round((totalTime - Date.now()) / 1000) // 剩余秒数
    if (secondsLeft < 0) {  // 到 0 就停止计时
      clearInterval(timerToken);
      return;
    }
    showTimer(secondsLeft);
  }, 1000);
}

// 展示计时
function showTimer(secondsTemp) {
  tip.textContent = '倒计时开始...'
  // console.log(secondsTemp);
  let hour = Math.floor(secondsTemp / 3600) // 秒转小时
  let mins = Math.floor((secondsTemp % 3600) / 60); // 剩余分钟
  let seconds = (secondsTemp % 60) < 10 ? '0' + secondsTemp % 60 : secondsTemp % 60;
  let timeText = `${hour<10?'0':''}${hour}:${mins <10 ? '0' : ''}${mins}:${seconds}`;
  console.log(timeText);
  timeLeft.textContent = timeText;
  document.title = timeText;
}

// 展示截止时间
function showEndTime(totalTime) {
  const date = new Date(totalTime);
  const hour = date.getHours();
  const mins = date.getMinutes();
  const endTimeText = `截止时间 ${hour}:${mins < 10 ? '0' : ''}${mins}`;
  entTime.textContent = endTimeText;
}

// 时间按钮
function startTimer() {
  const time = this.dataset.time;
  timer(time);
}

// form 表单的提交事件
function handleSubmit(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
}

// 秒表按钮事件
function handleStopwatch() {
  tip.textContent = '秒表计时开始...'
  clearInterval(watchToken)
  clearInterval(timerToken)
  flag = !flag
  if (flag) {
    startStopwatch()
    stopwatchBtn.innerText = '秒表 ❚❚'
  } else {
    clearInterval(watchToken)
    stopwatchBtn.innerText = '秒表 ▶'
  }
}

// 开始秒表计时
function startStopwatch() {
  let text = ''
  // 计时器
  watchToken = setInterval(() => {
    wmill += 1;
    if (wmill > 99) {
      wmill = 0
      wseconds += 1
      if (wseconds > 59) {
        wseconds = 0
        wmins += 1
        if (wmins >60) {
          wmins = 0
          whour += 1
        }
      }
    }
    let hourT = whour <10 ? '0'+ whour :  whour
    let minsT = wmins <10 ? '0'+ wmins : wmins
    let secondsT = wseconds <10 ? '0'+ wseconds :  wseconds
    let millT = wmill <10 ? '0'+ wmill :  wmill
    text = `${hourT}:${minsT}:${secondsT}.${millT}`
    timeLeft.textContent = text
  }, 10)
}

// 重置按钮的点击事件
function handleReset() {
  clearInterval(timerToken);
  timeLeft.textContent = '';
  entTime.textContent = '';
  tip.textContent = '点击上方按钮或输入时间，开始计时';
  document.title = 'Countdown Timer';

  // 秒表的重置
  clearInterval(watchToken)
  // 设置为初始状态
  flag = false
  stopwatchBtn.innerText = '秒表 ▶'
  wmill = wseconds = wmins = whour = 0;
}

timeBtns.forEach(btn => btn.addEventListener('click', startTimer)); // 事件按钮的点击事件
document.customForm.addEventListener('submit', handleSubmit)  // form 表单的提交事件
reset.addEventListener('click', handleReset)  // 重置按钮的点击事件
stopwatchBtn.addEventListener('click', handleStopwatch) // 秒表按钮事件