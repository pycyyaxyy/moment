export const rules = {
  num: [
    {
      pattern: /^[0-9]{11}$/,
      message: "手机号由11位数字组成~",
      trigger: "blur",
    },
  ],
  code: [
    {
      pattern: /^[0-9]{4}$/,
      message: "验证码由4位数字组成~",
      trigger: "blur",
    },
  ],
}
