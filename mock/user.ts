// // mock/user.ts
// export default [
//   {
//     //用户登录接口
//     url: "/api/user/login",
//     method: "post",
//     response: ({ body }: any) => {
//       console.log("Mock login request body:", body);
//       const { username, password } = body;
//       const userList = createUserList();

//       // 查找匹配的用户
//       const user = userList.find(
//         (user) => user.username === username && user.password === password
//       );

//       console.log("查找用户:", { username, password, foundUser: !!user });

//       if (!user) {
//         return {
//           code: 401,
//           message: "用户名或密码错误",
//           data: null,
//         };
//       }

//       return {
//         code: 200,
//         message: "登录成功",
//         data: {
//           token: user.token,
//           userInfo: {
//             id: user.userId,
//             username: user.username,
//             avatar: user.avatar,
//           },
//         },
//       };
//     },
//   },

//   //获取用户信息接口
//   {
//     url: "/api/user/info",
//     method: "get",
//     response: (request) => {
//       const token = request.headers.token;
//       const checkUser = createUserList().find((user) => user.token === token);
//       if (!checkUser) {
//         return {
//           code: 401,
//           message: "无效的token",
//           data: null,
//         };
//       }
//       return {
//         code: 200,
//         message: "获取用户信息成功",
//         data: {
//           id: 1,
//           username: "admin",
//           avatar:
//             "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//           roles: ["admin"],
//         },
//       };
//     },
//   },
// ];

// //此函数执行会返回一个数组包含用户信息
// function createUserList() {
//   return [
//     {
//       userId: 1,
//       avatar:
//         "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//       username: "admin",
//       password: "111111",
//       desc: "平台管理员",
//       roles: ["平台管理员"],
//       buttons: ["cuser.detail"],
//       routes: ["home"],
//       token: "Admin-Token-123456",
//     },
//     {
//       userId: 2,
//       avatar:
//         "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
//       username: "user",
//       password: "123456",
//       desc: "普通用户",
//       roles: ["普通用户"],
//       buttons: ["cuser.detail"],
//       routes: ["home"],
//       token: "User-Token-789012",
//     },
//   ];
// }
