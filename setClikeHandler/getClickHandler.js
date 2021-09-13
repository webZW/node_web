let process = require('child_process');

let fs = require('fs');
let root_path = '/Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib';
function getAllFiles(root) {
    let res = [], files = fs.readdirSync(root);
    // console.log(11, {root, files});
    files.forEach(function (file) {
        let path = root + '/' + file
            , stat = fs.lstatSync(path);

        if (!stat.isDirectory()) {
            if(/vue/.test(path)) {
                const files_path = path.replace(root_path, '.');
                res.push({ path, files_path });
            }
        } else {
            res = res.concat(getAllFiles(path));
        }
    });
    return res
}

const test_path = [
    {
      path: '/Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib/CraftRecipe/components/CraftsConfigDialog.vue',
      files_path: './CraftRecipe/components/CraftsConfigDialog.vue'
    },
    {
      path: '/Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib/CraftRecipe/components/EditRecipeDialog.vue',
      files_path: './CraftRecipe/components/EditRecipeDialog.vue'
    },
    {
      path: '/Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib/CraftRecipe/components/FormulaContent.vue',
      files_path: './CraftRecipe/components/FormulaContent.vue'
    },
];

let vue_paths = getAllFiles(root_path); // test_path
 
// console.log(22, vue_paths);

const getVueClickArr = async (index = 0) => {
    if (vue_paths.length <= index) return;

    const { path } = vue_paths[index];
    process.exec(`nl ${path} |grep  "@click.+?>" -E`, function (error, stdout, stderr) {
        // console.log(333, stdout.split('\n'))
        const config = {
            ...vue_paths[index],
            stdout
        }
        analysisClick(config);
        getVueClickArr(++index);
    });
}

getVueClickArr();

let isEnptyNameNum = 0,
    enptyNameArr = [],
    isHasNameNum = 0;
const analysisClick = (config) => {
    const clickArr = config.stdout.split('\n');
    console.log(444, clickArr);
    for (const str of clickArr) {
        if (!str) continue;
        const descArr = str.match(/([\u4e00-\u9fa5](\s)*)+/g);
        const desc = Array.isArray(descArr) ? descArr[0].replace(/\s+/g, '') : '';
        if (!desc) {
            ++isEnptyNameNum;
            enptyNameArr.push(config.files_path)
        } else ++isHasNameNum;
        // console.log(555, config.files_path, desc);
    }

}

setTimeout(() => {
    console.log({isHasNameNum, isEnptyNameNum, enptyNameArr});
}, 1000 * 10)

// const reg = `/@click.+?[\s\S|\d|\D|\w\W]*?([\u4e00-\u9fa5]+)?[\s\S|\d|\D|\w\W]*?</.+/`;


// sed -i 's/http:\/\/192.168.100.37:8900\/seldom_gallery/https:\/\/libs.poi-t.cn\/seldom_gallery/g' `grep "http://192.168.100.37:8900/seldom_gallery" ./* .[^.]* -R -l | xargs`;

// sed -i  's/\("version":\s*\).*/\1"'"$res5"'",/g'  ./src/components/*

// nl /Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib/classesManagement.vue | sed -n "/@click/p"

// nl /Users/zw_mac/POI_DEVELOP/poi-cloud-config/src/components/lib/classesManagement.vue |grep  "@click.+[\s\S|\w\W|\d\D]*" -E