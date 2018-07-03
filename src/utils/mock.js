//引入mockjs
const Mock = require('mockjs')
//使用mockjs模拟数据
Mock.mock('/api/data', (req, res) => {
    return {
        data: {
            index: 1,
            title: 'CAM1',
            signalIntensity: 4,
            vol: 0.4,
            source: 'rtmp://live.hkstv.hk.lxdns.com/live/hks'
        }
    }
});
// 添加预监
Mock.mock('/api/addPVW', (req, res) => {
    return {
        data: {
            "success": 1,
        }
    }
});
// 基本数据'/api/config'
Mock.mock('/api/config', (req, res) => {
    return {
        data: {
            "success": 1,
        }
    }
});