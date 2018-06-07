const models = require('../config/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../map/sqlMap')

// 连接数据库
const conn = mysql.createConnection(models.mysql)

conn.connect()
const jsonWrite = (res, ret) => {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

// 增加用户接口
router.post('/addTarget', (req, res) => {
  var sql = $sql.user.add
  var params = req.body
  console.log(params)
  conn.query(sql, [params.id, params.batch_id,params.proj_id,params.radar_id], (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

module.exports = router