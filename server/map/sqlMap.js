// sql语句
const sqlMap = {
    // 用户
    user: {
      add: 'insert into target_tb( id, batch_id, proj_id,radar_id) values ( ?, ?, ?, ?)'
    }
  }
  
  module.exports = sqlMap