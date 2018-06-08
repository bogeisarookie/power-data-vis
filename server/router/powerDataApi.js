
const express = require('express')
const router = express.Router()


// 连接数据库
var oracledb = require('oracledb');
var dbConfig = require('../config/dbconfig.js');
function connConnOracle(sql,res) {
  // Get a non-pooled connection
  oracledb.getConnection(
    {
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    },
    function (err, connection) {
      if (err) {
        console.error("连接错误" + err.message);
        return;
      }
      connection.execute(
        // The statement to execute
        `SELECT id,data
       FROM MY_TABLE where rownum<11 order by id
       `,

        // The "bind value" 180 for the bind variable ":id"
        [],

        // execute() options argument.  Since the query only returns one
        // row, we can optimize memory usage by reducing the default
        // maxRows value.  For the complete list of other options see
        // the documentation.
        {
          maxRows: 10000
          // , outFormat: oracledb.OBJECT  // query result format
          // , extendedMetaData: true      // get extra metadata
          // , fetchArraySize: 100         // internal buffer allocation size for tuning
          // ,resultSet:true
        },

        // The callback function handles the SQL execution results
        function (err, result) {
          if (err) {
            console.error("错误" + err.message);
            doRelease(connection);
            return;
          }
          // console.log(result)
          console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
          console.log(result.rows);     // [ [ 180, 'Construction' ] ]
          jsonWrite(res,result.rows)
          doRelease(connection);
        });
    });
}




function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

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
router.get('/selectPowerData', (req, res) => {
  var sql = 'select id,data from my_table order by id'
  var params = req.body
  console.log(params)
  connConnOracle(sql,res)
})

module.exports = router