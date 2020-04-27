export default {
  // 用户相关
  register: "/api/user/regOrder",
  getRegisterCode: "/api/authCode/send/register",
  login: "/api/user/login",
  getResetCode: "/api/authCode/send/chgPass",
  reset: "/api/user/chgPassByAuthCode ",
  // 报名相关
  uploadSignCard: `/api/upload/user/raceCard`,
  joinRace: "/api/raceJoin",
  designImgUrl: "/api/designImgUrlCom",
  myRaceList: "/api/raceJoin/myList",
  raceVideo: `/api/upload/user/raceVideo`,
  // 编辑器部分的接口
  uploadModel: "/api/v1/resource/fastUpload",
  projectList: "/api/v1/project",
  // 获取阿里oss的sts
  getOliSTS: "/api/upload/sts"
};
