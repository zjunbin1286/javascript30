const timeLeft = document.querySelector('.display__time-left')
const entTime = document.querySelector('.display__end-time')
const timeBtns = document.querySelectorAll('.timer__button')

let timerToken;
// 计时器
function timer(seconds) {
  clearInterval(timerToken)
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
  let mins = Math.floor(secondsTemp / 60);
  let seconds = (secondsTemp % 60) < 10 ? '0' + secondsTemp % 60 : secondsTemp % 60;
  let timeText = `${mins}:${seconds}`;
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

timeBtns.forEach(btn => btn.addEventListener('click', startTimer));

// 表单的提交事件
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  timer(this.minutes.value * 60);
  this.reset();
})