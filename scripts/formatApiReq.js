/**
 *
 * =>>>>>> 粘贴json到h   生成这样的格式  * @param {*} id
 * 
 */

const h = {
    schId: 65001,
    errPhone: '',
    errKaoShengHao: '',
    err: '',
    remark: '',
    authCodeErr: '验证码错误',
    partPhone: '',
    zhengJianLX: 1,
    shenFenZH: 500101197003075879,
    kaoShengHao: 20500102011001,
    shouJiHao: 13221197201,
    yongHuKL: 'Csk001',
    agginYongHuKL: 'Csk001',
    authCode: 'wne35',
    sid: 'c5f1c1d6344648a284f9f0c5079ea512',
}


Object.keys(h).map((key) => {
    // s += `/** \n * title \n * @param {*} ${key}\n */ \n`
    console.log(` * @param {*} ${key}`);
})