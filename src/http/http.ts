import request from "./request";
const http = new request({
  baseURL: "http://42.193.158.170:8098",
  timeout: 10000,
});
// const httpObj = {
//   httpDev: () => {
//     new request({
//       baseURL: "http://42.193.158.170:8098",
//       timeout: 10000,
//     });
//   },
//   mockHttp: () => {
//     new request({
//       baseURL:
//         "https://mobile-ms.uat.homecreditcfc.cn/mock/6229d9220b5aa1002717f39c/viola",
//       timeout: 5000,
//     });
//   },
// };
// const http = httpObj.httpDev;
export default http;
