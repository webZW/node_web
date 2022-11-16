/*
    全局插件安装：
    yarn add vue-template-compiler@2.6.11 -g
    yarn add @vue/component-compiler -g
    yarn add typescript@4.3.5 -g

    增加项目插件：
    "vue-runtime-helpers": "1.1.2",
*/
const compileVueFile = require("./compileVueFile");
const fs = require("fs");
const readVue = file_path => fs.readFileSync(file_path, "utf-8");
let process = require('child_process');

const compileFile = {
    // 数字工厂所有功能
    'poi-prod-monitor': [],
    // 视图层 报表平台 - 路由模块
    'poi-cloud-view': ['reportManagement', 'reportTemplateManagement', 'reportCenter',],
    // 其他项目 没有写，不做匹配
}

const workspaceList = [
    '/var/lib/jenkins/workspace/poi-prod-monitor_dev',
    '/var/lib/jenkins/workspace/poi-cloud-public_dev',
    '/var/lib/jenkins/workspace/poi-cloud-view_dev',
    '/var/lib/jenkins/workspace/poi-cloud-config_dev',
    '/var/lib/jenkins/workspace/poi-cloud-operation_dev',
    '/var/lib/jenkins/workspace/poi-pretreat_npm_dev',
    '/var/lib/jenkins/workspace/poi-service_dev',
    '/var/lib/jenkins/workspace/poi-msg_dev',
    '/var/lib/jenkins/workspace/poi-union_dev',
    // '/Users/poitech/POI_DEVELOP/poi-prod-monitor',
    // '/Users/poitech/POI_DEVELOP/poi-cloud-view',
    // '/Users/poitech/POI_DEVELOP/poi-cloud-public'
]

const recursiveWorkspaceFile = (i = 0) => {
    if (!workspaceList[i]) return;

    const workspacePath = workspaceList[i];
    const projectNameArr = Object.keys(compileFile).filter(name => workspacePath.indexOf(name) >= 0);
    if (projectNameArr.length > 1) console.log('匹配到多个项目：' + JSON.stringify(projectNameArr));

    let projectName = projectNameArr[0];
    if (projectNameArr.length === 0) projectName = workspacePath.match(/\/(poi-.*)$/)[1].replace(/_[a-zA-Z]+$/, '');

    process.exec(`rm -rf ../compileFiles/${projectName}`, (error, stdout, stderr) => {
        process.exec(`rsync -avz --delete --exclude={"node_modules",".git","dist"} ${workspacePath}/. ../compileFiles/${projectName}/`, (error, stdout, stderr) => {
            console.log('recursiveWorkspaceFile: ', {i, projectNameArr, projectName});
            recursiveWorkspaceFile(++i);

            // 没有匹配到编译项目，停止编译流程
            if (projectNameArr.length === 0) return;
            recursiveFile({ dir: `../compileFiles/${projectName}/src`, projectName });
        })
    })
}
recursiveWorkspaceFile();


// 递归文件
const recursiveFile = ({ dir, projectName }) => {
    //读取文件，并且替换文件中指定的字符串
    fs.readdir(dir, function (err, files) {
        if (err) return err;
        if (files.length < 1) return;

        fs_file({ dir, projectName, files });
    });
}

const fs_file = ({ dir, files, projectName, index = 0 }) => {
    if (files.length <= index) return;

    const fileName = files[index];

    let file_path = dir + '/' + fileName;
    //判断文件的状态，用于区分文件名/文件夹
    fs.stat(file_path, function (err, status) {
        let isFile = status.isFile();//是文件
        let isDir = status.isDirectory();//是文件夹

        if (isDir) recursiveFile({ dir: file_path, projectName });
        if (!isFile) return;

        // console.log(file_path);
        // return;

        // 是否全量替换
        if (compileFile[projectName].length === 0) {
            if (/\.vue/.test(fileName)) createCase({ file_path, fileName, withTs: true, withRuntimeImport: true });
            else removeVueMark({ file_path, fileName });
            return;
        }

        // 非全量替换时，单独处理路由文件
        if (file_path.indexOf('router_menu') >= 0) return routerRemoveAppointVueMark({ file_path, projectName });

        // 该文件是否是需编译文件夹内的文件
        const hasCompole = compileFile[projectName].some(name => file_path.indexOf(name) >= 0);
        if (!hasCompole) return;

        if (/\.vue/.test(fileName)) createCase({ file_path, fileName, withTs: true, withRuntimeImport: true });
        else removeVueMark({ file_path, fileName });
    })

    fs_file({ dir, files, projectName, index: ++index });
}

// compile a vue file from `vue dir` to `result dir`
function createCase({ file_path, fileName, ...opts }) {
    const result = compileVueFile(readVue(file_path), file_path, opts);
    fs.writeFileSync(
        file_path.replace(/\.vue$/, ".ts"),
        `//@ts-nocheck
    ${result.code.replace(/\.vue/g, '')}`
    );
    fs.unlinkSync(file_path);
}

function removeVueMark({ file_path, fileName, }) {
    const result = readVue(file_path);
    fs.writeFileSync(
        file_path,
        result.replace(/\.vue/g, '')
    );
}

// 替换路由文件中的vue模块路径
const routerRemoveAppointVueMark = ({ file_path, projectName }) => {
    let result = readVue(file_path);
    compileFile[projectName].map(name => { result = result.replace(RegExp(`${name}(\\/index)?\\.vue`, 'g'), `${name}`) });
    fs.writeFileSync(file_path, result);
}

