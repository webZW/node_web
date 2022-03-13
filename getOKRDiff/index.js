var child_process = require("child_process");

var curl = `curl 'https://lr6n20hguf.feishu.cn/wiki/wikcnST1fgfrFzeqoBYEInZbavf' \
-H 'authority: lr6n20hguf.feishu.cn' \
-H 'cache-control: max-age=0' \
-H 'sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"' \
-H 'sec-ch-ua-mobile: ?0' \
-H 'sec-ch-ua-platform: "macOS"' \
-H 'upgrade-insecure-requests: 1' \
-H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36' \
-H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
-H 'sec-fetch-site: same-origin' \
-H 'sec-fetch-mode: navigate' \
-H 'sec-fetch-user: ?1' \
-H 'sec-fetch-dest: document' \
-H 'accept-language: zh-CN,zh;q=0.9' \
-H 'cookie: passport_web_did=7050744360589262850; locale=zh-CN; trust_browser_id=9ee66da2-22d0-4840-a4d4-974af3520a0e; __tea__ug__uid=7050744314205816355; session=XN0YXJ0-fd3jd604-8481-4e3f-898f-410f397c6b89-WVuZA; session_list=XN0YXJ0-fd3jd604-8481-4e3f-898f-410f397c6b89-WVuZA; _ga=GA1.2.1045528016.1641640756; is_anonymous_session=; lang=zh; garr_base_template_branch=master; garr_version_list=%7B%7D; MONITOR_WEB_ID=7049226988380438530; vt=1; et=b20fe19edd56233ccd5596e7e75f84c7; ot=b20fe19edd56233ccd5596e7e75f84c7; _csrf_token=ba2355361317b50da9c5cf1a3ec8ee1e8f1a50eb-1644938788; template-branch-fixed=1; Hm_lvt_e78c0cb1b97ef970304b53d2097845fd=1644205193; _uuid_hera_ab_path_1=7066323051490770945; _uuid_hera_ab_okr_path_1=7066323086307540993; admin-csrf-token=9Vis/MCFNrmEmUwGl2LR2bK5DdRCovSl+ZMAy9WN/7tHfJbHrnfWTEt7INEEEsZL5JphjsV+6OvM/lEx9SAs8rMb3xidXYAIcooxs9Ck1kQCRubUV1wjbRWNEtNvPpPPR4PCrA==; garr_master_versions=%7B%22garrMasterDocx%22%3A%2220220218%22%2C%22garrMasterBitable%22%3A%2220220214%22%2C%22garrMaster%22%3A%2220210315%22%2C%22garrMasterBottomTemplate%22%3A%2220220218%22%2C%22garrMasterSheet%22%3A%2220220217%22%7D; last_access_scm_version=1.0.5.9191; slardar_delay_type=a; swp_csrf_token=75d45db8-d903-43c6-b91b-3b95794705dd; t_beda37=fff3221f389841697825d5b3a670072a1b3901ef1f588d17ab61c988e047b265' \
--compressed`

var child = child_process.exec(curl, function(err, stdout, stderr) {

    // console.log(stdout);
    const html = stdout.match(/"text":".*?"/)[0];
    const arr = html.split('\\n*');
    console.log(2222, arr);
    const lastWeekArr = getLastWeekArr(arr);
    const nextWeekPlans = getNextWeekPlans(arr);
});

const getLastWeekArr = (arr) => {
    let lastWeekArr = [];

    arr.map((str, index) =>{
        if (/上周[状态|计划]/.test(str)) {
            lastWeekArr.push([{ str, index}]);
        }
    });

    lastWeekArr = lastWeekArr.map((item) => {
        const taskList = JSON.parse(JSON.stringify(item));
        for (let i = item[0].index - 1; i > 0; i--) {
            if (/[上周|下周|当前][状态|计划]/.test(arr[i])) break;
            taskList.unshift({str: arr[i], index: i});
        }
        for (let i = item[0].index + 1;; i++) {
            if (/[上周|下周|当前][状态|计划]/.test(arr[i])) {
                taskList.push({str: arr[i], index: i});
                break;
            }
        }
        return taskList;
    })
    
    return lastWeekArr;
}

const getNextWeekPlans = (arr) => {
    let nextWeekPlans = [];

    arr.map((str, index) =>{
        if (/下周[状态|计划]/.test(str)) {
            nextWeekPlans.push([{ str, index}]);
        }
    });

    nextWeekPlans = nextWeekPlans.map((item) => {
        const taskList = JSON.parse(JSON.stringify(item));
        let hasBreak = false;
        for (let i = item[0].index - 1; i > 0; i--) {
            if (/[上周|下周|当前][状态|计划]/.test(arr[i])) {
                if (hasBreak) break;
                else continue;
            }
            if (hasBreak && /[KR|TD]/.test(arr[i]) ) break;

            taskList.unshift({str: arr[i], index: i});
            hasBreak = true;
        }
        return taskList;
    })
    
    return nextWeekPlans;
}