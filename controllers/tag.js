const{TagServices} = require('../services/tag');
const {Op} = require('sequelize');


class Tag {

  static listAll = async (ctx) => {
    const data = await TagServices.tagfindAll();
    ctx.body = {
      code: 1000,
      data,
      msg:'获取成功'
    }
  };

  static list = async (ctx) => {
    const {pageNo, pageSize} = ctx.request.body;
    const {rows, count } = await TagServices.tagfindAndCountAll();

    // 根据分页输出数据
    let start = pageSize * (pageNo - 1);
    let data = rows.slice(start, start + pageSize);

    ctx.body = {
      data,
      total:count,
      code: 1000,
      msg:'获取成功'
    }
  };

  static create = async (ctx) => {
    const params = ctx.request.body;
    if (!params.name) {
      ctx.body = {
        code: 1003,
        msg: '标签不能为空'
      };
      return false
    }
    try {
      await TagServices.tagCreate(params);
      ctx.body = {
        code: 1000,
        msg: '创建成功'
      }
    }
    catch(err) {
      const msg = err.errors[0];
      ctx.body = {
        code: 300,
        msg: msg.value + msg.message
      }
    }
  };

  static destroy = async (ctx) => {
    const {id} = ctx.request.body;
    await TagServices.tagDestroy(id);
    ctx.body = {
      code: 1000,
      desc: '删除成功'
    }
  };

  static update = async (ctx) => {
    const {id,name} = ctx.request.body;
    const data = TagServices.tagUpdate(name,id);
    ctx.body = {
      data,
      code: 1000,
      desc: '修改成功'
    }
  };

}

module.exports = {
  Tag
};
