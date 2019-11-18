//操作数据库的逻辑
let mongoose = require("mongoose");
let { db_url } = require("./config");
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
// connect里面的{ useNewUrlParser: true, useUnifiedTopology: true }必须加，否则不会报错但是有警告
// 学生表
let allstudentSchema = new mongoose.Schema(
  {
    studentID: String,
    name: String,
    sex: String,
    age: String,
    nativeplace: String,
    study: String,
    major: String,
    classes: String,
    citycenter: String,
    chengji: Number,
    graduation: Number,
    failss: Number
  },
  { collection: "student" }
  // mongoose.model()，会自动给表的末尾添加 s，所以当我们的数据库里的表已经建好且没有加s的情况下，
  // 想要获取到数据就必须在Schema里加上{ collection: "表名" }
);
let Allstudent = mongoose.model("student", allstudentSchema);

// 用户表
let movieSchema = new mongoose.Schema(
  {
    adminName: String,
    password: String,
    avatar: String,
    power: String,
    loginFlag: Boolean
  },
  { collection: "admin" }
);
let Admin = mongoose.model("admin", movieSchema);
// 班主任表
let headTeacher = new mongoose.Schema(
  {
    headname: String,
    headsex: String,
    headage: Number,
    college: String,
    entryDate: String,
    position: String
  },
  { collection: "headteacher" }
);
let Headteacher = mongoose.model("headteacher", headTeacher);
// 讲师表
let lecturer = new mongoose.Schema(
  {
    lecturername: String,
    lecturersex: String,
    lecturerage: Number,
    college: String,
    major: String,
    entryDate: String,
    position: String
  },
  { collection: "lecturer" }
);
let Lecturer = mongoose.model("lecturer", lecturer);
// 专业表
let major = new mongoose.Schema(
  {
    majorname: String
  },
  { collection: "major" }
);
let Major = mongoose.model("major", major);
// 市场部表
let market = new mongoose.Schema(
  {
    marketname: String
  },
  { collection: "market" }
);
let Market = mongoose.model("market", market);

// 班级表
let classSchema = new mongoose.Schema(
  {
    classname: String,
    createDate: String,
    major: String,
    lecturer: String,
    headteacher: String
  },
  { collection: "class" }
);
let Class = mongoose.model("class", classSchema);

module.exports = {
  Allstudent,
  Admin,
  Headteacher,
  Lecturer,
  Major,
  Market,
  Class
};
