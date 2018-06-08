const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const compression = require('compression')
const app = express()
const cors=require('cors')

// const targetApi = require('../router/targetApi')
const powerDataApi=require('../router/powerDataApi')
// app.use(cors({
//   origin:['http://localhost:8080'],
//   methods:['GET','POST'],
//   alloweHeaders:['Content-Type', 'Authorization']
// }));
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use(compression({
  threshold: 0
}))
// 后端api路由
app.use('/api/powerData', powerDataApi)

// 监听端口
app.use((req, res, next) => {
  var err = new Error('This page not found')
  err.status = 404
  next(err)
})

app.listen(3000, () => {
  console.log('Server running in port 3000...')
})