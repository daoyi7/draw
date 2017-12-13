const log = console.log.bind(console)
const w = window.innerWidth
const h = window.innerHeight
const c = document.querySelector('#canvas') // 获取canvas
const CclientRect = c.getBoundingClientRect() // 获取canvas的各种坐标值
let ctx = c.getContext('2d') // 实例化一个2dcanvas
c.width = w - 80 // 设置宽高
c.height = h

let d = false // 初始化鼠标按下事件 初始时为false
let drawX // 初始画鼠标按下的起始点
let drawY

let color = '#fff'
//
// let img = new Image()
//
// img.src = './img/1.png'
// img.onload = () => {
//   ctx.drawImage(img, 0, 0)
// }

let circlePointArr = []

// 勾股定理
function triangle(x, y) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
}

function draw() {
  c.onmousedown = (e) => {
    if ($('.pen').hasClass('active')) {
      d = true

      drawX = e.pageX - CclientRect.x
      drawY = e.pageY - CclientRect.y

      ctx.beginPath()
      ctx.moveTo(drawX, drawY)
    } else if ($('.eraser').hasClass('active')) {
      d = true

      drawX = e.pageX - CclientRect.x
      drawY = e.pageY - CclientRect.y

      ctx.beginPath()
      ctx.moveTo(drawX, drawY)
    } else if ($('.circle').hasClass('active')) {
      d = true

      circlePointArr = []
    } else if ($('.square').hasClass('active')) {
      d = true

      circlePointArr = []
    }
  }

  c.onmouseup = (e) => {
    d = false

    if ($('.pen').hasClass('active')) {
      ctx.closePath()
    } else if ($('.eraser').hasClass('active')) {
      ctx.closePath()
    } else if ($('.circle').hasClass('active')) {
      const len = circlePointArr.length

      ctx.beginPath()
      ctx.arc(
        circlePointArr[0].x,
        circlePointArr[0].y,
        triangle(
          circlePointArr[len - 1].x - circlePointArr[0].x,
          circlePointArr[len - 1].y - circlePointArr[0].y,
        ),
        0,
        Math.PI * 2,
        true) // 绘制
      ctx.closePath()
      ctx.lineWidth = 5
      ctx.strokeStyle = color
      ctx.stroke()

      circlePointArr = []

    } else if ($('.square').hasClass('active')) {
      const len = circlePointArr.length

      // 计算鼠标移动的距离
      const a = triangle(
        circlePointArr[len - 1].x - circlePointArr[0].x,
        circlePointArr[len - 1].y - circlePointArr[0].y,
      )

      ctx.beginPath()
      ctx.moveTo(circlePointArr[0].x, circlePointArr[0].y)
      ctx.lineTo(circlePointArr[0].x, circlePointArr[0].y + a)
      ctx.lineTo(circlePointArr[0].x + a, circlePointArr[0].y + a)
      ctx.lineTo(circlePointArr[0].x + a, circlePointArr[0].y)
      ctx.lineTo(circlePointArr[0].x, circlePointArr[0].y)
      ctx.closePath()
      ctx.lineWidth = 5
      ctx.strokeStyle = color
      ctx.stroke()

      circlePointArr = []

    }
  }

  c.onmousemove = (e) => {
    if ($('.pen').hasClass('active')) {
      if (d) {
        ctx.lineTo(e.pageX - CclientRect.x, e.pageY - CclientRect.y)
        ctx.lineWidth = 5
        ctx.strokeStyle = color
        ctx.stroke()
      }
    } else if ($('.eraser').hasClass('active')) {
      if (d) {
        ctx.clearRect(e.pageX - CclientRect.x, e.pageY - CclientRect.y, 20, 20)
        ctx.lineWidth = 5
        ctx.fillStyle = 'red'
        ctx.stroke()
      }
    } else if ($('.circle').hasClass('active')) {
      if (d) {
        circlePointArr.push({
          x: e.pageX,
          y: e.pageY,
        })

        const len = circlePointArr.length

        ctx.beginPath()
        ctx.arc(
          circlePointArr[0].x,
          circlePointArr[0].y,
          triangle(
            circlePointArr[len - 1].x - circlePointArr[0].x,
            circlePointArr[len - 1].y - circlePointArr[0].y,
          ),
          0,
          Math.PI * 2,
          true)
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(
          circlePointArr[0].x,
          circlePointArr[0].y,
          triangle(
            circlePointArr[len - 2].x - circlePointArr[0].x,
            circlePointArr[len - 2].y - circlePointArr[0].y,
          ),
          0,
          Math.PI * 2,
          true)
        ctx.closePath()
        ctx.lineWidth = 1
        ctx.strokeStyle = 'transparent'
        ctx.stroke()
      }
    } else if ($('.square').hasClass('active')) {
      if (d) {
        circlePointArr.push({
          x: e.pageX,
          y: e.pageY,
        })
      }
      const len = circlePointArr.length

      // 计算鼠标移动的距离
      const a = triangle(
        circlePointArr[len - 1].x - circlePointArr[0].x,
        circlePointArr[len - 1].y - circlePointArr[0].y,
      )

      ctx.beginPath()
      ctx.moveTo(circlePointArr[0].x, circlePointArr[0].y)
      ctx.lineTo(circlePointArr[0].x, circlePointArr[0].y + a)
      ctx.lineTo(circlePointArr[0].x + a, circlePointArr[0].y + a)
      ctx.lineTo(circlePointArr[0].x + a, circlePointArr[0].y)
      ctx.lineTo(circlePointArr[0].x, circlePointArr[0].y)
      ctx.closePath()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(255, 255, 255, .2)'
      ctx.stroke()
    }
  }
}

$('.tool').click(function() {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active')
  } else {
    $(this).addClass('active').siblings().removeClass('active')

    draw()
  }
})

draw()
