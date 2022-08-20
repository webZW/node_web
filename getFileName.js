const fs = require('fs')

const getDirectories = (url) => {
    let urlArr = [];
    fs.readdirSync(url).map((fileName) => {
        urlArr.push(fileName)
    })
    return urlArr
 }


getDirectories('/Volumes/Elements\ SE/极客时间/1专栏课');