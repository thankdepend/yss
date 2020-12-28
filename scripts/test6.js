let str = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>


<meta charset="UTF-8" />
<!-- <meta name="google" value="notranslate" /> -->
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate" />
<meta http-equiv="Expires" content="0" />
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title class="yss-icon">普通高校艺术类招生专业考试报名系统</title>


<script src="http://cdnStatic.51bm.net.cn/scripts/seajs/2.2.1/sea.js?v=20160101"></script>
<script src="http://cdnStatic.51bm.net.cn/scripts/seajs/2.2.1/seajs-text-1.0.2.js?v=20160101"></script>

<script>
var _ts = 20201223;

seajs.config({
        base: '/scripts/',
    alias: {
        'jquery': 'http://cdnStatic.51bm.net.cn/scripts/common/jquery-1.7.2.min.js',
        'knockout': 'http://cdnStatic.51bm.net.cn/scripts/common/knockout/knockout-3.3.0.js',
        'knockout-mapping': 'http://cdnStatic.51bm.net.cn/scripts/common/knockout/knockout.mapping-2.4.1.js',
        'jquery-cookie': 'http://cdnStatic.51bm.net.cn/scripts/common/jquery.cookie.js',
        'i18n': 'http://cdnStatic.51bm.net.cn/scripts/common/i18n.js',
                'swfobject': 'http://cdnStatic.51bm.net.cn/scripts/common/swfobject.js',
        'tree': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-tree/Tree.js',
        'date': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-datepicker/ui-datepicker.js?v=20141126',
        'dialog': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-dialog/ui-dialog.js',
        'editor': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-htmleditor/ui-htmleditor.js',
        'placeholder': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-placeholder/ui-placeholder.js',
        'page': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-page/ui-page.js',
        'thselect': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-thselect/ui-thselect.js',
        'echart': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-echarts/echart.js',
        'chart': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-echarts/chart.js',
        'jquery-ui':'http://cdnStatic.51bm.net.cn/scripts/common/jquery.ui-1.9.2.min.js',
        'jquery-ui-min':'http://cdnStatic.51bm.net.cn/scripts/common/jquery-ui.min.js',
        'autocomplete':'http://cdnStatic.51bm.net.cn/scripts/common/jquery.ui.autocomplete.min.js',
        'mustache': 'http://cdnStatic.51bm.net.cn/scripts/common/mustache.min.js',
        'json': 'http://cdnStatic.51bm.net.cn/scripts/common/json2.min.js',
        'validator': 'http://cdnStatic.51bm.net.cn/scripts/common/ui/ui-validator/validator.js',
        'utils': 'http://cdnStatic.51bm.net.cn/scripts/common/utils.js',
        'qrcode': 'http://cdnStatic.51bm.net.cn/scripts/common/jquery.qrcode.min.js',
        'barcode': 'http://cdnStatic.51bm.net.cn/scripts/common/jquery-barcode.min.js',
        'pagesort': '/scripts/common/page.sort.js',
        'fileuploader':'http://cdnStatic.51bm.net.cn/scripts/common/webuploader/uploader.js'
    },
    map: [
          [".js",".js?v=" + _ts]
     ],
    preload: [
                this.JSON ? '' : 'json'
        ]
});

window.ctx = '';
window.assets = '';
window.locale = 'zh_CN';

window.fileCenterSN = 'http://fileCenter.51bm.net.cn';
window.userSN = 'http://user.51bm.net.cn';
window.baseSN = 'http://base.51bm.net.cn';
window.newsSN = 'http://news.51bm.net.cn';
window.noticeSN = 'http://notice.51bm.net.cn';
window.befexamSN = 'http://befexam.51bm.net.cn';
window.aftexamSN = 'http://aftexam.51bm.net.cn';
window.paySN = 'http://pay.51bm.net.cn';
window.sysSN = 'http://sys.51bm.net.cn';
window.indexSN = 'http://index.51bm.net.cn';
window.helpSN = 'http://help.51bm.net.cn';
window.chuxingSN = 'http://chuxing.51bm.net.cn';
window.hulaquanSN = 'http://hulaquan.51bm.net.cn';
window.advertSN = 'http://advert.51bm.net.cn';
window.publicSN = 'http://public.51bm.net.cn';
window.infoSN = 'http://info.51bm.net.cn';
window.wishSN = 'http://wish.51bm.net.cn';
window.probSN = 'http://prob.51bm.net.cn';
window.poolSN = 'http://pool.51bm.net.cn';
window.examvideo = 'http://examvideo.51bm.net.cn';
window.live = 'http://live.51bm.net.cn';
window.course = 'http://course.51bm.net.cn';
window.achieveSN = '';
window.calculatorSN = '';
window.menuSN = 'http://menu.51bm.net.cn';
window.schoolSN = 'http://school.51bm.net.cn';
window.stuSN = 'http://stu.51bm.net.cn';
window.printSN = 'http://print.51bm.net.cn';
window.crmSN = 'http://crm.51bm.net.cn';
window.guideSN = 'http://guide.51bm.net.cn';

window.currentSystemTime = parseInt('' || new Date().getTime());
seajs.use('common/common');
</script>

<script type="text/javascript" src="http://cdnStatic.51bm.net.cn/scripts/common/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="http://cdnStatic.51bm.net.cn/scripts/common/global.js?v=20201223"></script>
<!-- 头部 根据角色显示 sessionUser.roleId不为空以及值不是100的是院校端 -->

        <script>
                $(function(){
                        var currGlobalStyle = getCookie("currGlobalStyle");
                        if(!currGlobalStyle){
                                currGlobalStyle = 'black';
                        }

                        $('link[@rel*=style][title]').each(function(i){
                                this.disabled = true;
                                if (this.getAttribute('title') == currGlobalStyle){
                                        this.disabled = false;
                                }

                        });

                        /* if(currGlobalStyle == 'blue'){
                                $("<link>").attr({rel: "stylesheet",type: "text/css",href: "/styles/school/global_blue.css?v=20201223">       
                        }else{
                                $("<link>").attr({rel: "stylesheet",type: "text/css",href: "/styles/school/global.css?v=20201223">
                        } */

                        //读取cookies
                        function getCookie(name){
                            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                            if(arr=document.cookie.match(reg)){
                                return unescape(arr[2]);
                            }
                            return null;
                        }
                });
        </script>
        <link rel="stylesheet" title="black" type="text/css" href="/styles/school/global.css?v=20201223">
        <link rel="stylesheet" title="blue" type="text/css" href="/styles/school/global_blue.css?v=20201223">

<!-- 头部 根据角色显示 sessionUser.roleId为空以及角色值100是未登录和已登录的考生端 -->




    <link rel="stylesheet" type="text/css" href="/styles/befexam/common/eye.css?v=20201223">
    <style>
        .cover-img{max-width: 260px;min-width: 260px;width:30%;}
        .img-box{display: inline-block;position: relative;}

    </style>
</head>
<body>
    <form id="form" class="m-form" style="display: none;">
        <input type="hidden" name="tiId" id="tiId" value="891">
        <input type="hidden" name="xueXiaoId" id="xueXiaoId" value="13166">
        <input type="hidden" name="kaoShiId" id="kaoShiId" value="13047">
        <input type="hidden" name="zhuanYeId" id="zhuanYeId" value="1223644">
        <input type="hidden" name="esId" id="esId" value="1688">
        <input type="hidden" name="checkFlag" id="checkFlag">
    </form>
        <h3 class="table-title" style="text-align:center">考生试题</h3>

        <div style="white-space:pre-line; display:block; overflow:auto;margin: 10px 45px;">
            <p>请演奏一段《二泉映月》</p>
        </div>

        <div style="text-align: center;margin: 50px 45px;">

        </div>






        <script>
            seajs.use('befexam/school/school/examination/kaoTiDetail');
        </script>
</body>
</html>
`

console.log(str.split('/n').join(',').split('<body>').join(',').split('<form>')); 