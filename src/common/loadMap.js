//给8位字符串文件名补0
function zeroPad(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

function getCustomMapUrlOverride(coords) {
    var x = 'C' + zeroPad(coords.x, 8, 16);
    var y = 'R' + zeroPad(coords.y, 8, 16);
    var z = 'L' + zeroPad(coords.z, 2, 10);
    var urlx = "http://localhost:8080/testmap" + '/' + z + '/' + y + '/' + x + '.png';
    return urlx;
}
L.TileLayer.zhbLoadGuge = L.TileLayer.extend({
    initialize: function(url, options) {
        options = L.setOptions(this, options);
        this.url = url + "/{z}/{x}/{y}.png";
        L.TileLayer.prototype.initialize.call(this, this.url, options);
    }
});

/** 
 * 重写TileLayer中获取切片url方法 
 * @param {Object} tilePoint 
 */
L.TileLayer.prototype.getTileUrl = function(tilePoint) {
    return L.Util.template(this._url, L.extend({
        //s: this._getSubdomain(tilePoint),  
        z: function() {
            var value = zeroPad(tilePoint.z, 2, 10);
            return "L" + value;
        },
        x: function() {
            var value = zeroPad(tilePoint.y, 8, 16);
            return "R" + value;
        },
        y: function() {
            var value = zeroPad(tilePoint.x, 8, 16);
            return "C" + value;
        }
    }));
};
L.tileLayer.zhbloadguge = function(url, options) {
    return new L.TileLayer.zhbLoadGuge(url, options);
};