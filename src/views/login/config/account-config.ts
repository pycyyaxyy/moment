export const rules = {
  name: [
    {
      required: true,
      message: "用户名是必传内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: "用户名由5-10位小写字母和数字组成~",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必传内容",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{6,12}$/,
      message: "密码由6-12位小写字母和数字组成~",
      trigger: "blur",
    },
  ],
}
