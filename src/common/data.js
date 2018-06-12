const data = [
  [
    [31.843368, 117.296133], "合肥工业大学"
  ],
  [
    [31.836295, 117.269526], "中国科技大学"
  ],
  [
    [31.857293, 117.290468], "安徽省立医院"
  ]
]
let points = []
//中间
let center_leftbootom = [31.8473780707, 117.2510719299]
let center_righttop = [31.8869594040, 117.3172473907]
//下面
let bottom_leftbootom=[31.826232, 117.258883]
let bottom_righttop=[31.842712, 117.305231]
//右侧
let right_leftbottom=[31.855398, 117.320509]
let right_righttop=[31.875663, 117.34746]
//左侧
let left_leftbottom=[31.851753, 117.225924]
let left_righttop=[31.86954, 117.248583]
//上侧
let top_leftbottom=[31.885429, 117.238626]
let top_righttop=[31.901461, 117.322054]
//右下
let right_bottom_leftbottom=[31.830316, 117.303466]
let right_bottom_righttop=[31.851898, 117.337112]
//左下
let left_bottom_leftbottom=[31.83542, 117.235317]
let left_bottom_righttop=[31.849274, 117.262782]
//左上
let left_top_leftbottom=[31.872018, 117.234458]
let left_top_righttop=[31.886158, 117.253169]

let question_type = ["主变", "用户", "线路", "业扩", "公变"]
let level = [1, 2, 3]
function mock(righttop,leftbootom,num){
  for (let i = 0; i < num; i++) {
    let point = {
      type: question_type[Math.round(Math.random() * 4)],
      level: level[Math.round(Math.random() * 2)],
      lat: null,
      lng: null
    }
    let lng = Math.random()
    let lat = Math.random()
    while (!point.lat) {
        if (lat < (righttop[0] - 31) && lat > (leftbootom[0] - 31)) {
            point.lat = 31+lat
          } else {
            lat = Math.random()
          }
    }
    while(!point.lng){
        if (lng < (righttop[1] - 117) && lng > (leftbootom[1] - 117)) {
            point.lng = 117+lng
          } else {
            lng = Math.random()
          }
    }
    points.push(point)
  }
}
function mockData() {
  /**
   * 中间部分
   */
  mock(center_righttop,center_leftbootom,350)
  mock(bottom_righttop,bottom_leftbootom,60)
  mock(right_righttop,right_leftbottom,30)
  mock(left_righttop,left_leftbottom,50)
  mock(top_righttop,top_leftbottom,50)
  mock(right_bottom_righttop,right_bottom_leftbottom,50)
  mock(left_bottom_righttop,left_bottom_leftbottom,30)
  mock(left_top_righttop,left_top_leftbottom,30)
  return points

}

export default {
  data,
  mockData
}
