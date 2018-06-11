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
let leftbootom = [31.8473780707, 117.2510719299]
let rightbootom = [31.8477426173, 117.3163890839]
let righttop = [31.8869594040, 117.3172473907]
let lefttop = [31.8865950125, 117.2500419617]

function mockData() {
  let question_type = ["主变", "用户", "线路", "业扩", "公变"]
  let level = [1, 2, 3]
  for (let i = 0; i < 200; i++) {
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
  return points
}
export default {
  data,
  mockData
}
