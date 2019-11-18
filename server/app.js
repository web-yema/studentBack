let express = require("express");
let bodyParse = require("body-parser");
let jwt = require("jsonwebtoken");
const multer = require("multer");
let app = express();
app.use(bodyParse.json());
let cors = require("cors"); //配置跨域
app.use(cors()); //跨域中间件
let {
  Allstudent,
  Admin,
  Headteacher,
  Lecturer,
  Major,
  Market,
  Class
} = require("../db/model/user");
// 静态资源
app.use(express.static('../public'))

// 获取所有学生
app.get("/allstudent", async (req, res) => {
  try {
    Allstudent.find({}, (err, ress) => {
      if (err) {
        console.log(err);
      } else {
        if (ress) {
          res.json({
            code: 200,
            data: ress
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});

// 在全部学生中实现分页
app.post("/allstudentPage", async (req, res) => {
  let page = req.body.page; //当前页数
  let maxPage = 7; //每页最大条数
  try {
    let allstudentList = await Allstudent.find({});
    let maxPageHome = Math.ceil(allstudentList.length / maxPage); //设置最大页数
    if (page > maxPageHome) {
      res.json({
        code: 202,
        msg: "超过最大页数"
      });
      return false;
    } else {
      let pagelist = allstudentList.slice((page - 1) * maxPage, page * maxPage);
      res.json({
        code: 200,
        data: pagelist,
        total: allstudentList.length,
        delpage: Math.ceil(allstudentList.length / maxPage) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// ·························································································································
// Excel导入
app.post("/inExcel", async (req, res) => {
  let user = req.body.excarr;
  //   上述条件都不成立再进行添加
  let allstudentList = await Allstudent.find({});
  let maxPage = 7; //每页最大条数
  let maxpages = Math.ceil(allstudentList.length / maxPage); //设置最大页数
  try {
    Allstudent.insertMany(user, (err, ress) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          code: 200,
          msg: "添加成功",
          data: ress,
          maxpages: maxpages //添加的时候要拿到最大的页数，添加完毕后跳转至最大页数
        });
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: "连接失败"
    });
  }
});
//在全部学生中增加
app.post("/addallStudent", async (req, res) => {
  let user = req.body;
  if (
    user.studentID === "" ||
    user.name === "" ||
    user.sex === "" ||
    user.age === "" ||
    user.nativeplace === "" ||
    user.study === "" ||
    user.major === "" ||
    user.classes === "" ||
    user.citycenter === "" ||
    user.chengji === "" ||
    user.graduation === "" ||
    user.failss === ""
  ) {
    res.json({
      code: 201,
      msg: "提交信息中存在空项"
    });
    return false;
  } else {
    //   上述条件都不成立再进行添加
    let allstudentList = await Allstudent.find({});
    let maxPage = 7; //每页最大条数
    let maxpages = Math.ceil(allstudentList.length / maxPage); //设置最大页数
    try {
      Allstudent.create(user, (err, ress) => {
        if (err) {
          console.log(err);
        } else {
          res.json({
            code: 200,
            msg: "添加成功",
            data: ress,
            maxpages: maxpages //添加的时候要拿到最大的页数，添加完毕后跳转至最大页数
          });
        }
      });
    } catch (error) {
      res.json({
        code: 211,
        msg: "连接失败"
      });
    }
  }
});

// 在全部学生中删除
app.post("/delallStudent", async (req, res) => {
  let Id = req.body.id;
  if (Id instanceof Array) {
    let userAlllists = await Allstudent.find({ _id: { $in: Id } });
    // 查询所有符合条件的项
    if (userAlllists.length === 0) {
      //   如果说你输入的_id值在数据库里面没有，就走这里
      res.json({
        code: 201,
        msg: "没有当前项"
      });
      return false;
    }
    //   在数据库里能找到当前这几项 就进行删除
    try {
      Allstudent.remove({ _id: { $in: Id } }, error => {
        if (error) {
          console.log(error);
        } else {
          res.json({
            code: 200,
            msg: "删除成功"
          });
        }
      });
    } catch {
      res.json({
        code: 210,
        msg: "连接删除接口失败"
      });
    }
  } else {
    //   拿到传进来的_id作为唯一标识进行删除
    let _id = { _id: Id };
    let userlists = await Allstudent.find(_id);
    if (userlists.length === 0) {
      //   如果说你输入的_id值在数据库里面没有，就走这里
      res.json({
        code: 201,
        msg: "没有当前项"
      });
      return false;
    }
    //   在数据库里能找到_id值 就进行删除
    try {
      Allstudent.remove(_id, error => {
        if (error) {
          console.log(error);
        } else {
          res.json({
            code: 200,
            msg: "删除成功"
          });
        }
      });
    } catch {
      res.json({
        code: 210,
        msg: "连接删除接口失败"
      });
    }
  }
});

// 修改
app.post("/updateAllstud", async (req, res) => {
  let id = { _id: req.body.id };
  let newstudlist = req.body.upstud;
  let nowList = await Allstudent.find(id);
  if (nowList.length === 0) {
    //   如果你数据库里面没有当前id值，走这里，不进行修改操作
    res.json({
      code: 203,
      msg: "id是你修改数据的唯一标识，请输入正确的key值"
    });
    return false;
  }
  let oldstudlist = nowList[0]; //拿到的是个数组，所以要取第一项,取数据库中当前项的旧值
  //   通过查到的key的当前项的数据拿到当前的uesr
  try {
    //   进行修改
    Allstudent.update(oldstudlist, newstudlist, err => {
      if (err) {
        err(err);
      } else {
        res.json({
          code: 200,
          msg: "更新成功"
        });
      }
    });
  } catch {
    res.json({
      code: 201,
      msg: "连接更新接口失败"
    });
  }
});

// 在全部学生中查询
app.post("/selectAllstud", async (req, res) => {
  let obj = req.body.obj;
  let page = req.body.page; //查询出来的数据的当前页数 默认参数是1
  let maxPage = 7; //每页最大条数
  if (obj.name) {
    obj["name"] = new RegExp(obj.name);
  } //做一个姓名的模糊查询  加上这个判断和RegExp正则方法 拿到的obj如下 { name: /彭/ }
  if (obj.failss) {
    if (obj.failss == "0次") {
      obj.failss = 0;
    } else if (obj.failss == "1次") {
      obj.failss = 1;
    } else if (obj.failss == "2次") {
      obj.failss = 2;
    } else {
      obj.failss = { $gte: 3 }; //如果是查询三次及以上，则获取数据库中挂科次数大于3的
    }
  }

  try {
    Allstudent.find(obj, (err, ress) => {
      if (err) {
        console.log(err);
      } else {
        if (ress) {
          res.json({
            code: 200,
            data: ress.slice((page - 1) * maxPage, page * maxPage),
            total: ress.length
          });
        } else {
          res.json({
            code: 211,
            msg: "当前项不存在"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 221,
      msg: error
    });
  }
});
// 学生批量修改
app.post("/updateStudent", async (req, res) => {
  let { ids, updateObj } = req.body
  let userAlllists = await Allstudent.find({ _id: { $in: ids } });
  if (userAlllists.length === 0) {
    res.json({
      code: 201,
      msg: "没有当前项"
    });
    return false
  }
  try {
    // 更新多条数据 使用 updateMany
    Allstudent.updateMany({ _id: { $in: ids } }, updateObj, (err, ret) => {
      if (err) {
        err(err);
      } else {
        res.json({
          code: 200,
          msg: "更新成功"
        });
      }
    });
  } catch {
    res.json({
      code: 202,
      msg: "连接更新接口失败"
    });
  }
});

// ·························································································································
// 获取所有用户信息
app.get("/getAllAdmin", (req, res) => {
  try {
    Admin.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          // 在用户的所有数据中删除权限为 1 的
          for (let i = 0; i < ret.length; i++) {
            let { power } = ret[i]
            if (power == "1") {
              ret.splice(i, 1)
            }
          }
          // 把过滤掉权限为 1 的数据，再次将密码去掉
          for (let i = 0; i < ret.length; i++) {
            let { _id, adminName, avatar, power } = ret[i]
            ret[i] = { _id, adminName, avatar, power }
          }
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
})
// 在所有用户中实现分页
app.post("/adminPage", async (req, res) => {
  let { page } = req.body; //当前页数
  let pageSize = 6; //每页显示条目个数
  try {
    let dataList = await Admin.find({});//获取用户的所有数据
    // 在用户的所有数据中删除权限为 1 的
    for (let i = 0; i < dataList.length; i++) {
      let { power } = dataList[i]
      if (power == "1") {
        dataList.splice(i, 1)
      }
    }
    // 把过滤掉权限为 1 的数据，再次将密码去掉
    for (let i = 0; i < dataList.length; i++) {
      let { _id, adminName, avatar, power } = dataList[i]
      dataList[i] = { _id, adminName, avatar, power }
    }
    //最大页数
    let maxPageHome = Math.ceil(dataList.length / pageSize);
    if (page > maxPageHome) {
      res.json({
        code: 202,
        msg: "超过最大页数"
      });
      return false;
    } else {
      // 截取当前页的数据
      let pagelist = dataList.slice((page - 1) * pageSize, page * pageSize);
      res.json({
        code: 200,
        data: pagelist,// 截取的当前页的数据
        total: dataList.length, // 总数据的长度，
        delpage: Math.ceil(dataList.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// 获取当前登录用户信息
app.get("/getadmin", (req, res) => {
  jwt.verify(req.query.token, "abcd", function (err, decode) {
    if (err) {
      res.json({
        code: 5005,
        data: "success",
        message: "用户未登录"
      });
    } else {
      Admin.findOne({ adminName: decode.username }, (err, ret) => {
        if (err) {
          return console.log("查询失败");
        }
        if (ret) {
          res.json({
            code: 20000,
            data: {
              roles: [ret.power],
              introduction: `I am an ${ret.adminName}`,
              avatar: ret.avatar,
              name: ret.adminName,
              id: ret._id,
              loginFlag: ret.loginFlag,
              token: jwt.sign({ username: ret.adminName }, "abcd", {
                // 过期时间
                expiresIn: "1h"
              })
            }
          });
        } else {
          ress.json({
            code: 50008,
            message: "Login failed, unable to get user details."
          });
        }
      });
    }
  });
});
// 登录
app.post("/login", (req, ress) => {
  const { username, password } = req.body;
  Admin.findOne({ adminName: username }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      const { adminName } = ret;
      if (ret.password === password)
        return ress.json({
          code: 20000,
          data: {
            token: jwt.sign({ username: adminName }, "abcd", {
              // 过期时间
              expiresIn: "1h"
            })
          },
          msg: "登录成功"
        });
      ress.json({ code: 201, message: "密码不正确" });
    } else {
      ress.json({
        code: 60204,
        message: "该用户未注册"
      });
    }
  });
});
// 退出登录
app.post("/logout", (req, res) => {
  res.json({
    code: 20000,
    data: "success"
  });
});
// 创建用户
app.post("/register", (req, res) => {
  let { name, pass, power, loginFlag } = req.body;
  Admin.findOne({ adminName: name }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      return res.json({ code: "203", message: "该用户已存在" });
    }
    var user = new Admin({
      adminName: name,
      password: pass,
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      power: power,
      loginFlag: loginFlag
    });
    user.save(function (err, ress) {
      if (err) {
        return console.log(err);
      }
      res.json({
        code: "200",
        message1: `${ress.adminName}`,
        message2: `${ress.password}`
      });
    });
  });
});
// 修改用户密码/权限
app.post("/updateAdminPass", (req, res) => {
  const { _id, oldpassword, newpassword, power } = req.body;
  let upObj = {}
  if (oldpassword && newpassword) {
    upObj.password = newpassword
  } else if (newpassword) {
    upObj.password = newpassword
    upObj.loginFlag = false
  } else if (power) {
    upObj.power = power
  }
  Admin.findOne({ _id }, (err, ret) => {
    if (err) { return console.log(err) };
    if (oldpassword && newpassword) {//如果前端传的参数为oldpassword、newpassword，将修改密码
      if (ret.password === oldpassword) {//验证输入的旧密码是否跟数据库的密码匹配
        Admin.updateOne(
          { '_id': _id }, upObj, (err, docs) => {
            if (err) { return console.log('更新数据失败'); }
            res.json({
              code: 200,
              msg: "密码修改成功"
            })
          }
        )
      } else {
        res.json({
          code: 201,
          msg: "旧密码错误"
        })
      }
    } else if (newpassword) {//如果前端传的参数只有新密码 newpassword，将修改密码，并且将首次登录标识设置为false
      Admin.updateOne(
        { '_id': _id }, upObj, (err, docs) => {
          if (err) { return console.log('更新数据失败') }
          res.json({
            code: 2004,
            msg: "密码修改成功"
          })
        }
      )
    } else if (power) {//如果前端传的参数为power，将修改权限
      Admin.updateOne(
        { '_id': _id }, upObj, (err, docs) => {
          if (err) { return console.log('更新数据失败') }
          res.json({
            code: 2002,
            msg: "权限修改成功"
          })
        }
      )
    }
  })
});
// 删除管理员用户
app.post("/delAdmin", async (req, res) => {
  let Id = req.body;
  let userlists = await Admin.find(Id, (err, ress) => {
    //   把你当前的_id值放到数据库里查找
    if (err) {
      console.log(err);
    } else {
      return ress;
    }
  });

  if (userlists.length === 0) {
    //   如果说你输入的_id值在数据库里面没有，就走这里
    res.json({
      code: 201,
      msg: "没有当前项"
    });
    return false;
  }
  //   在数据库里能找到_id值 就进行删除
  try {
    Admin.remove(Id, error => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          code: 200,
          msg: "删除成功"
        });
      }
    });
  } catch {
    res.json({
      code: 210,
      msg: "连接删除接口失败"
    });
  }
});

// 上传用户头像
//配置diskStorage来控制文件存储的位置以及文件名字等
let storage = multer.diskStorage({
  //确定图片存储的位置
  destination: function (req, file, cb) {
    cb(null, '../public/avatars')
  },
  //确定图片存储时的名字,注意，如果使用原名，可能会造成再次上传同一张图片的时候的冲突
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});
// //生成的专门处理上传的一个工具，可以传入storage、limits等配置
let upload = multer({ storage });
// 上传用户头像接口
app.post('/uploadAvatar', upload.single('files'), (req, res, next) => {
  let _id = req.body.id;
  var url = 'http://132.232.89.22:8080/avatars/' + req.file.filename;
  if (req.file.filename) {
    Admin.findByIdAndUpdate(
      _id,
      {
        avatar: url
      },
      (err, ret) => {
        if (err) {
          console.log("更新失败");
        } else {
          res.json({
            code: 200,
            msg: "更新成功"
          });
        }
      }
    )
  }
});

// ·························································································································
// 获取所有班主任
app.get("/getHeadTeacher", async (req, res) => {
  try {
    Headteacher.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});
// 在所有班主任中实现分页
app.post("/headTeacherPage", async (req, res) => {
  let { page } = req.body; //当前页数
  let pageSize = 6; //每页显示条目个数
  try {
    let dataList = await Headteacher.find({});//获取班主任的所有数据
    let maxPageHome = Math.ceil(dataList.length / pageSize); //最大页数
    if (page > maxPageHome) {
      res.json({
        code: 202,
        msg: "超过最大页数"
      });
      return false;
    } else {
      let pagelist = dataList.slice((page - 1) * pageSize, page * pageSize);
      res.json({
        code: 200,
        data: pagelist,// 截取的当前页的数据
        total: dataList.length, // 总数据的长度，
        delpage: Math.ceil(dataList.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// 添加班主任
app.post("/addHeadTeacher", (req, res) => {
  let { headname, headsex, headage, college, entryDate, position } = req.body;
  var user = new Headteacher({
    headname,
    headsex,
    headage,
    college,
    entryDate,
    position
  });
  user.save(function (err, ress) {
    if (err) {
      return console.log(err);
    }
    res.json({
      code: 200,
      message: "添加成功"
    });
  });
});
// 删除一条班主任
app.post("/delHeadTeacher", async (req, res) => {
  let Id = req.body;

  let userlists = await Headteacher.find(Id, (err, ress) => {
    //   把你当前的_id值放到数据库里查找
    if (err) {
      console.log(err);
    } else {
      return ress;
    }
  });

  if (userlists.length === 0) {
    //   如果说你输入的_id值在数据库里面没有，就走这里
    res.json({
      code: 201,
      msg: "没有当前项"
    });
    return false;
  }
  //   在数据库里能找到_id值 就进行删除
  try {
    Headteacher.remove(Id, error => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          code: 200,
          msg: "删除成功"
        });
      }
    });
  } catch {
    res.json({
      code: 210,
      msg: "连接删除接口失败"
    });
  }
});
// 修改班主任信息
app.post("/updateHeadTeacher", (req, res) => {
  const { _id, position } = req.body;
  Headteacher.findByIdAndUpdate(
    _id,
    {
      position
    },
    (err, ret) => {
      if (err) {
        console.log("更新失败");
      } else {
        res.json({
          code: 200,
          msg: "更新成功"
        });
      }
    }
  );
});

// ·························································································································
// 获取所有讲师
app.get("/getLecturer", async (req, res) => {
  try {
    Lecturer.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});
// 在所有讲师中实现分页
app.post("/lecturerPage", async (req, res) => {
  let { page } = req.body; //当前页数
  let pageSize = 6; //每页显示条目个数
  try {
    let dataList = await Lecturer.find({});//获取讲师的所有数据
    let maxPageHome = Math.ceil(dataList.length / pageSize); //最大页数
    if (page > maxPageHome) {
      res.json({
        code: 202,
        msg: "超过最大页数"
      });
      return false;
    } else {
      let pagelist = dataList.slice((page - 1) * pageSize, page * pageSize);
      res.json({
        code: 200,
        data: pagelist,// 截取的当前页的数据
        total: dataList.length, // 总数据的长度，
        delpage: Math.ceil(dataList.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// 添加讲师
app.post("/addLecturer", (req, res) => {
  let { lecturername, lecturersex, lecturerage, college, major, entryDate, position } = req.body;
  var user = new Lecturer({
    lecturername,
    lecturersex,
    lecturerage,
    college,
    major,
    entryDate,
    position
  });
  user.save(function (err, ress) {
    if (err) {
      return console.log(err);
    }
    res.json({
      code: 200,
      message: "添加成功"
    });
  });
});
// 删除一条讲师
app.post("/delLecturer", async (req, res) => {
  let Id = req.body;

  let userlists = await Lecturer.find(Id, (err, ress) => {
    //   把你当前的_id值放到数据库里查找
    if (err) {
      console.log(err);
    } else {
      return ress;
    }
  });

  if (userlists.length === 0) {
    //   如果说你输入的_id值在数据库里面没有，就走这里
    res.json({
      code: 201,
      msg: "没有当前项"
    });
    return false;
  }
  //   在数据库里能找到_id值 就进行删除
  try {
    Lecturer.remove(Id, error => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          code: 200,
          msg: "删除成功"
        });
      }
    });
  } catch {
    res.json({
      code: 210,
      msg: "连接删除接口失败"
    });
  }
});
// 修改讲师信息
app.post("/updateLecturer", (req, res) => {
  const { _id, position } = req.body;
  Lecturer.findByIdAndUpdate(
    _id,
    {
      position
    },
    (err, ret) => {
      if (err) {
        console.log("更新失败");
      } else {
        res.json({
          code: 200,
          msg: "更新成功"
        });
      }
    }
  );
});
// ·························································································································
// 获取专业信息
app.get("/getMajor", async (req, res) => {
  try {
    Major.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});
// 添加专业
app.post("/addMajor", (req, res) => {
  let { majorname } = req.body;
  Major.findOne({ majorname }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      return res.json({ code: 203, message: "当前专业已存在" });
    }
    var user = new Major({
      majorname
    });
    user.save(function (err, ress) {
      if (err) {
        return console.log(err);
      }
      res.json({
        code: 200,
        message: "添加成功"
      });
    });
  });
});
// ·························································································································
// 获取所有市场部
app.get("/getMarket", async (req, res) => {
  try {
    Market.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});
// 添加市场部
app.post("/addMarket", (req, res) => {
  let { marketname } = req.body;
  Market.findOne({ marketname }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      return res.json({ code: 203, message: "当前市场部已存在" });
    }
    var user = new Market({
      marketname
    });
    user.save(function (err, ress) {
      if (err) {
        return console.log(err);
      }
      res.json({
        code: 200,
        message: "添加成功"
      });
    });
  });
});
// ·························································································································
// 获取所有班级
app.get("/getClass", async (req, res) => {
  try {
    Class.find({}, (err, ret) => {
      if (err) {
        console.log(err);
      } else {
        if (ret) {
          res.json({
            code: 200,
            data: ret
          });
        } else {
          res.json({
            code: 201,
            msg: "查询失败"
          });
        }
      }
    });
  } catch (error) {
    res.json({
      code: 211,
      msg: error
    });
  }
});
// 在所有班级中实现分页
app.post("/classPage", async (req, res) => {
  let { page } = req.body; //当前页数
  let pageSize = 6; //每页显示条目个数
  try {
    let dataList = await Class.find({});//获取班级的所有数据
    let maxPageHome = Math.ceil(dataList.length / pageSize); //最大页数
    if (page > maxPageHome) {
      res.json({
        code: 202,
        msg: "超过最大页数"
      });
      return false;
    } else {
      let pagelist = dataList.slice((page - 1) * pageSize, page * pageSize);
      res.json({
        code: 200,
        data: pagelist,// 截取的当前页的数据
        total: dataList.length, // 总数据的长度，
        delpage: Math.ceil(dataList.length / pageSize) //页数,在删除时用,当删除的数据是你当前页的最后一条数据的时候,向上取最大页数
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// 销毁一个班级
app.post("/delClass", async (req, res) => {
  let Id = req.body;
  let userlists = await Class.find(Id, (err, ress) => {
    //   把你当前的_id值放到数据库里查找
    if (err) {
      console.log(err);
    } else {
      return ress;
    }
  });

  if (userlists.length === 0) {
    //   如果说你输入的_id值在数据库里面没有，就走这里
    res.json({
      code: 201,
      msg: "没有当前项"
    });
    return false;
  }
  //   在数据库里能找到_id值 就进行删除
  try {
    Class.remove(Id, error => {
      if (error) {
        console.log(error);
      } else {
        res.json({
          code: 200,
          msg: "删除成功"
        });
      }
    });
  } catch {
    res.json({
      code: 210,
      msg: "连接删除接口失败"
    });
  }
});
// 创建班级
app.post("/createClass", (req, res) => {
  let { classname, createDate, major, lecturer, headteacher } = req.body;
  createDate = createDate.substring(0, 10);
  Class.findOne({ classname }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      return res.json({ code: 203, message: "当前班级已存在" });
    }
    var user = new Class({
      classname,
      createDate,
      major,
      lecturer,
      headteacher
    });
    user.save(function (err, ress) {
      if (err) {
        return console.log(err);
      }
      res.json({
        code: 200,
        message: "添加成功"
      });
    });
  });
});
// 修改班级
app.post("/updateClass", (req, res) => {
  const { _id, lecturer, headteacher } = req.body;
  Class.findByIdAndUpdate(
    _id,
    {
      lecturer,
      headteacher
    },
    (err, ret) => {
      if (err) {
        console.log("更新失败");
      } else {
        res.json({
          code: 200,
          msg: "更新成功"
        });
      }
    }
  );
});
// 查询班级
app.post("/searchClass", async (req, res) => {
  let query = req.body;
  if (query.classname) {
    query["classname"] = new RegExp(query.classname);
  } //班级名称的模糊查询  加上这个判断和RegExp正则方法  { classname: /1807A/ }
  try {
    Class.find(req.body, (err, ret) => {
      if (err) { return console.log(err) };
      if (ret.length != 0) {
        res.json({
          code: 200,
          data: ret
        });
      } else {
        res.json({
          code: 201,
          msg: "当前项不存在"
        });
      }
    });
  } catch (error) {
    res.json({
      code: 221,
      msg: error
    });
  }
});

// ·························································································································
//口令红包
app.get("/hblq", (req, res) => {
  const key = req.query.key;
  if (key === "ThankyouforComming") {
    var _html = "<p><strong>" + "你要的答案是🤣：43532622" + "</p>";
    res.send(_html);
  } else {
    res.send("你别蒙啊");
  }
});
app.listen(8080, () => {
  console.log("8080启动成功");
});
