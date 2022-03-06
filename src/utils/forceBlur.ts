//强制让element-plus的按钮点击之后失去焦点
export default function forceBlur(event: any) {
  let target = event.target
  if (target.nodeName == "SPAN") {
    target = event.target.parentNode
  }
  target.blur()
}
