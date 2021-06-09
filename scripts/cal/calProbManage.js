const {
    common
} = require('../../lib/index');
const probApp = require('../../reqApi/app/prob');
const prob = require('../../reqApi/platfrom/prob');
const yssLogin = require('../../project/help/base/yssLogin');
const provinceScoreLine = require('../../reqApi/app/provinceScoreLine');



// 概率计算
class CalProb {
    constructor() {
        // 院校专业统考主要信息
        this.volDataMain = new VolDataMain();
        // 考生统考信息
        this.stuInfoMain = new StuInfoMain();
        // 分数线信息
        this.scoreLineMain = new ScoreLineMain();
        // 批次线信息
        this.batchLineMain = new Object();
        // 判线日志
        this.checkLineLog = new CheckLineLog();
        /** 替换公式 */
        this.formula = {
            S: '综合分',
            R: '文化分',
            W: '文化课满分',
            T: '考生校考专业课得分',
            P: '考生校考专业课满分',
            M: '考生校考专业考试合格线',
            U: '考生专业成绩',
            Q: '省统考满分',
            A: '普通类文科一批线',
            B: '普通类理科一批线',
            C: '普通类文科二批线',
            D: '普通类理科二批线',
            E: '英语成绩',
            F: '本批次相对最高分',
            G: '本批次合格线',
            I: '统考合格线',
            H: '文科-统考本科线',
            J: '文科-文化本科线',
            L: '文科-文化专科线',
            X: '文科-统考专科线',
            N: '理科-统考本科线',
            K: '理科-文化本科线',
            V: '理科-文化专科线',
            Y: '理科-统考专科线',
            Z: '专业分排名',
        }
    }

    // 计算统考概率
    async jointCalculate () {
        // 替换公式为相应字段中的值
        await this.replaceFormula();
        console.log(this.volDataMain.expression);
        let formulaRes;
        try {
            formulaRes = this.volDataMain.expression.replace(
                /[A-Z]/g,
                (...arg) => {
                    return this.formula[arg[0]]
                }
            )
        } catch (err) {
            throw new Error('投档或录取公式为空')
        }

        // 批次层次判线
        await this.jointDiplomaControl();
        // 省批次线判线
        await this.jointBatchControl();
        // 志愿数据校控线
        await this.jointSchoolControl();
        // 小分控制
        await this.artsControl();



        // 如果是平行志愿
        if (this.volDataMain.archiveRule == 1) {
            // 如果投档公式是"综合分"
            if (this.volDataMain.archiveMode == 1) {
                // 如果院校投档位次存在
                if (this.volDataMain.archiveRank != '' || null) {
                    // 如果考生综合分位次存在
                    if (this.stuInfoMain.comprehensiveRank != '' || null) {
                        console.log(33);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(4);
                        return val;
                    }
                }
                // 如果院校投档最低位次存在
                if (this.volDataMain.expectArchiveRank != '' || null) {
                    // 如果考生综合分位次存在
                    if (this.stuInfoMain.comprehensiveRank != '' || null) {
                        console.log(34);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(6);
                        return val;
                    }
                }
                if (this.volDataMain.archiveMinScore != '' || null) {
                    // 如果投档最低分存在
                    console.log(1);
                    console.log('综合分', eval(formulaRes));
                    console.log(Math.atan((eval(formulaRes) - this.volDataMain.archiveMinScore) / this.volDataMain.archiveMinScore) * 5.1);
                    console.log(this.volDataMain.competitionDegree * 100);
                    const val = await this.getCalProbResult(1);
                    return val;
                }
                else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                    // 如果预计投档分存在
                    console.log(4);
                    const val = await this.getCalProbResult(2);
                    return val;
                } else if (this.volDataMain.entrolScoreMin != '' || null) {
                    // 如果录取最低分存在
                    console.log(2);
                    const val = await this.getCalProbResult(7);
                    return val;
                } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    // 如果预计录取最低分存在
                    console.log(3);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('不可能出现');
                }
            }
            // 如果投档公式是"文化分"
            else if (this.volDataMain.archiveMode == 2) {
                if (this.volDataMain.archiveMinScore != '' || null) {
                    // 如果投档最低分存在
                    console.log(5);
                    const val = await this.getCalProbResult(1);
                    return val;
                }
                else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                    // 如果预计投档分存在
                    console.log(8);
                    const val = await this.getCalProbResult(2);
                    return val;
                }
                else if (this.volDataMain.entrolScoreMin != '' || null) {
                    // 如果录取最低分存在
                    console.log(6);
                    const val = await this.getCalProbResult(7);
                    return val;
                } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    // 如果预计录取最低分存在
                    console.log(7);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('不可能出现');
                }
            }
            // 如果投档公式是“专业分”
            else if (this.volDataMain.archiveMode == 3) {
                // 如果投档最低位次存在
                if (this.volDataMain.archiveRank != '' || null) {
                    // 如果考生的统考位次存在
                    if (this.stuInfoMain.jointRank != '' || null) {
                        console.log(35);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.jointRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(6);
                        return val;
                    }

                }
                // 如果预计投档最低位次存在
                if (this.volDataMain.expectArchiveRank != '' || null) {
                    // 如果考生的统考位次存在
                    if (this.stuInfoMain.jointRank != '' || null) {
                        console.log(36);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.jointRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(4);
                        return val;
                    }
                }

                if (this.volDataMain.archiveMinScore != '' || null) {
                    // 如果投档最低分存在
                    console.log(9);
                    const val = await this.getCalProbResult(1);
                    return val;
                }
                else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                    // 如果预计投档分存在
                    console.log(12);
                    const val = await this.getCalProbResult(2);
                    return val;
                }
                else if (this.volDataMain.entrolScoreMin != '' || null) {
                    // 如果录取最低分存在
                    console.log(10);
                    const val = await this.getCalProbResult(7);
                    return val;
                } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    // 如果预计录取最低分存在
                    console.log(11);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('不可能出现');
                }
            }
            // 如果投档公式是"专业分排名"
            else if (this.volDataMain.archiveMode == 4) {
                // 如果考生投档位次存在
                if (this.stuInfoMain.jointRank != '' || null) {
                    // 如果投档最低位次存在
                    if (this.volDataMain.archiveRank != '' || null) {
                        console.log(13);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.jointRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(3);
                        return val;
                    }
                    // 如果预计投档最低位次存在
                    else if (this.volDataMain.expectArchiveRank != '' || null) {
                        console.log(14);
                        // const val = Number((this.volDataMain.p0 - Math.atan((this.stuInfoMain.jointRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
                        const val = await this.getCalProbResult(4);
                        return val;
                    }
                    // 如果院校数据没有投档最低位次、预计投档最低位次，就按分数算
                    else {
                        if (this.volDataMain.archiveMinScore != '' || null) {
                            // 如果投档最低分存在
                            console.log(15);
                            const val = await this.getCalProbResult(1);
                            return val;
                        }
                        else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                            // 如果预计投档分存在
                            console.log(18);
                            const val = await this.getCalProbResult(2);
                            return val;
                        }
                        else if (this.volDataMain.entrolScoreMin != '' || null) {
                            // 如果录取最低分存在
                            console.log(16);
                            const val = await this.getCalProbResult(7);
                            return val;
                        } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                            // 如果预计录取最低分存在
                            console.log(17);
                            const val = await this.getCalProbResult(8);
                            return val;
                        } else {
                            console.log('不可能出现');
                        }

                    }

                }
                else {
                    console.log('用户没填位次');
                }
            }
            // 如果投档公式是"英语分成绩"
            else if (this.volDataMain.archiveMode == 5) {
                if (this.volDataMain.archiveMinScore != '' || null) {
                    // 如果投档最低分存在
                    console.log(70);
                    const val = await this.getCalProbResult(1);
                    return val;
                }
                else if (this.volDataMain.preArchiveScoreMin != '' || null) {
                    // 如果预计投档分存在
                    console.log(73);
                    const val = await this.getCalProbResult(2);
                    return val;
                }
                else if (this.volDataMain.entrolScoreMin != '' || null) {
                    // 如果录取最低分存在
                    console.log(71);
                    const val = await this.getCalProbResult(7);
                    return val;
                } else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    // 如果预计录取最低分存在
                    console.log(72);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('不可能出现');
                }
            }
            else {
                console.log('其他计算方式');
            }
        }
        // 梯度志愿  (部分统考和所有校考)
        else if (this.volDataMain.archiveRule == 2) {
            // 如果录取公式是“综合分”
            if (this.volDataMain.enrollBasisType == 1) {
                // 如果录取最低分存在
                if (this.volDataMain.entrolScoreMin != '' || null) {
                    console.log(25);
                    const val = await this.getCalProbResult(7);
                    return val;
                }
                // 如果预计录取最低分存在
                else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    console.log(26);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('取上一年，这里不做计算');
                }
            }
            // 如果录取公式是"文化分"
            else if (this.volDataMain.enrollBasisType == 2) {
                // 如果录取最低分存在
                if (this.volDataMain.entrolScoreMin != '' || null) {
                    console.log(27);
                    const val = await this.getCalProbResult(7);
                    return val;
                }
                // 如果预计录取最低分存在
                else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    console.log(28);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('取上一年，这里不做计算');
                }
            }
            // 如果录取公式是"专业分"
            else if (this.volDataMain.enrollBasisType == 3) {
                // 如果录取最低分存在
                if (this.volDataMain.entrolScoreMin != '' || null) {
                    console.log(29);
                    const val = await this.getCalProbResult(7);
                    return val;
                }
                // 如果预计录取最低分存在
                else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    console.log(30);
                    const val = await this.getCalProbResult(8);
                    return val;
                } else {
                    console.log('取上一年，这里不做计算');
                }
            }
            // 如果录取公式是"专业分排名"
            else if (this.volDataMain.enrollBasisType == 4) {
                // 如果录取最低位次存在
                if (this.volDataMain.entrolScoreMin != '' || null) {
                    console.log(31); await this.getCalProbResult(9);
                    return val;
                }
                // 如果预计录取最低分存在
                else if (this.volDataMain.preEnrollScoreMin != '' || null) {
                    console.log(32);
                    const val = await this.getCalProbResult(10);
                    return val;
                } else {
                    console.log('取上一年，这里不做计算');
                }
            } else {
                console.log('其他计算方式');
            }
        }
        else {
            console.log('那是什么志愿？？');
        }
    }

    /** 获取计算结果
     * @param {Number} [1:'平行-考生综合分-投档最低'，2:'平行-考生综合分-预计投档最低',3:'平行-考生统考位次-投档最低位次',
     *                  4:'平行-考生统考位次-预计投档最低位次',5:'平行-考生综合分位次-投档最低位次' ,
     *                  6:'平行-考生综合分位次-预计投档最低位次', 7:'梯度-考生综合分-录取最低',8:'梯度-考生综合分-预计录取最低',
     *                  9:'梯度-考生统考位次-录取最低位次',10:'梯度-考生统考位次-预计录取最低位次']
     */
    async getCalProbResult (cal) {
        if (cal == 1) {
            return Number((this.volDataMain.p0 + Math.atan((eval(formulaRes) - this.volDataMain.archiveMinScore) / this.volDataMain.archiveMinScore) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
        } else if (cal == 2) {
            return Number((this.volDataMain.p0 + Math.atan((eval(formulaRes) - this.volDataMain.preArchiveScoreMin) / this.volDataMain.preArchiveScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
        } else if (cal == 3) {
            return Number((Math.atan((this.stuInfoMain.jointRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        } else if (cal == 4) {
            return Number((Math.atan((this.stuInfoMain.jointRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        } else if (cal == 5) {
            return Number((Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.archiveRank) / this.volDataMain.archiveRank) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        } else if (cal == 6) {
            return Number((Math.atan((this.stuInfoMain.comprehensiveRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        } else if (cal == 7) {
            return Number((this.volDataMain.p0 + Math.atan((eval(formulaRes) - this.volDataMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
        } else if (cal == 8) {
            return Number((this.volDataMain.p0 + Math.atan((eval(formulaRes) - this.volDataMain.preEnrollScoreMin) / this.volDataMain.preEnrollScoreMin) * 5.1) * 100 - (this.volDataMain.competitionDegree * 100)).toFixed(2) + '%';
        } else if (cal == 9) {
            return Number((Math.atan((this.stuInfoMain.jointRank - this.volDataMain.entrolScoreMin) / this.volDataMain.entrolScoreMin) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        } else if (cal == 10) {
            return Number((Math.atan((this.stuInfoMain.jointRank - this.volDataMain.expectArchiveRank) / this.volDataMain.expectArchiveRank) * (-1) + this.volDataMain.p5) * 100).toFixed(2) + '%';
        }
    }

    // 将注释替换成字段值(例如：U = collEntrExamScore = 10)
    async replaceFormula () {
        this.formula.R = this.stuInfoMain.collEntrExamScore;
        this.formula.U = this.stuInfoMain.jointExamScore;
        this.formula.Q = this.scoreLineMain.q;
        this.formula.W = this.scoreLineMain.w;
        this.formula.Z = this.stuInfoMain.jointRank;
        this.formula.E = this.stuInfoMain.englishScore;
    }

    /** 批次层次判线 */
    async jointDiplomaControl () {
        // 若批次层次不存在
        if (this.batchLineMain.diploma == null) {
            // 如果统考合格线过线
            if (this.stuInfoMain.jointExamScore >= this.scoreLineMain.i) {
                // 标记为过线
                this.checkLineLog.i = 0;
            } else if (!this.scoreLineMain.i) {
                // 标记为过线
                this.checkLineLog.i = 0;
            } else {
                // 标记未过线
                this.checkLineLog.i = 1;
                throw new Error(`统考合格线未达线:${this.scoreLineMain.i}`);
            }
        }
        // 若批次层次为本科
        else if (this.batchLineMain.diploma == 1) {
            // 如果统考合格线过线
            if (this.stuInfoMain.jointExamScore >= this.scoreLineMain.h) {
                // 标记为过线
                this.checkLineLog.h = 0;
                // 艺术文化本科线过线
                if (this.stuInfoMain.collEntrExamScore >= this.scoreLineMain.j) {
                    this.checkLineLog.j = 0;
                } else if (!this.scoreLineMain.j) {
                    this.checkLineLog.j = 0;
                } else {
                    throw new Error(`艺术文化本科线未达线：${this.scoreLineMain.j}`)
                }
            } else if (!this.scoreLineMain.h) {
                // 本科批次线取不到值再判统考合格线
                if (this.stuInfoMain.jointExamScore >= this.scoreLineMain.i) {
                    // 标记2个过线
                    this.checkLineLog.i = 0;
                    this.checkLineLog.h = 0;
                } else {
                    // 标记2个过线
                    this.checkLineLog.i = 1;
                    this.checkLineLog.h = 1;
                    throw new Error(`统考本科线未达线：${this.scoreLineMain.i}`)
                }
            } else {
                this.checkLineLog.h = 1;
                throw new Error(`统考本科线未达线：${this.scoreLineMain.h}`)
            }
        }
        // 若批次层次为专科
        else if (this.batchLineMain.diploma == 2) {
            // 如果统考合格线过线
            if (this.stuInfoMain.jointExamScore >= this.scoreLineMain.x) {
                // 标记为过线
                this.checkLineLog.x = 0;
                // 艺术文化本科线过线
                if (this.stuInfoMain.collEntrExamScore >= this.scoreLineMain.l) {
                    this.checkLineLog.l = 0;
                } else if (!this.scoreLineMain.l) {
                    this.checkLineLog.l = 0;
                } else {
                    throw new Error(`艺术文化专科线未达线：${this.scoreLineMain.l}`)
                }
            } else if (!this.scoreLineMain.x) {
                // 本科批次线取不到值再判统考合格线
                if (this.stuInfoMain.jointExamScore >= this.scoreLineMain.i) {
                    // 标记2个过线
                    this.checkLineLog.i = 0;
                    this.checkLineLog.x = 0;
                } else {
                    // 标记2个过线
                    this.checkLineLog.i = 1;
                    this.checkLineLog.x = 1;
                    throw new Error(`统考专科线未达线：${this.scoreLineMain.i}`)
                }
            } else {
                this.checkLineLog.x = 1;
                throw new Error(`统考专科线未达线：${this.scoreLineMain.x}`)
            }
        } else {
            throw new Error(`批次层次异常${this.batchLineMain.diploma}`)
        }
    }

    /** 省批次线判线 */
    async jointBatchControl () {
        // 如果省批次：专业分数线，过线
        if (this.stuInfoMain.jointExamScore >= this.batchLineMain.profScoreLine) {
            this.checkLineLog.profScoreLine = 0;
            if (this.stuInfoMain.collEntrExamScore >= this.batchLineMain.profScoreLine) {
                this.checkLineLog.profScoreLine = 0;
            } else if (!this.scoreLineMain.profScoreLine) {
                this.checkLineLog.profScoreLine = 0;
            } else {
                throw new Error(`[省批次]文化分数线未达线：${this.batchLineMain.profScoreLine}`)
            }
        } else if (!this.batchLineMain.profScoreLine) {
            this.checkLineLog.profScoreLine = 0;
            if (this.stuInfoMain.collEntrExamScore >= this.batchLineMain.profScoreLine) {
                this.checkLineLog.profScoreLine = 0;
            } else if (!this.batchLineMain.profScoreLine) {
                this.checkLineLog.profScoreLine = 0;
            } else {
                throw new Error(`[省批次]文化分数线未达线：${this.batchLineMain.profScoreLine}`)
            }
        } else {
            this.checkLineLog.profScoreLine = 1;
            throw new Error(`[省批次]专业分数线未达线：${this.batchLineMain.profScoreLine}`)
        }
    }

    /** 志愿数据校控线 */
    async jointSchoolControl () {
        if (this.stuInfoMain.jointExamScore >= this.volDataMain.profControlLine) {
            this.checkLineLog.profControlLine = 0;
            // 院校文化录取控制线
            if (this.stuInfoMain.collEntrExamScore >= this.volDataMain.cultureControlLine) {
                this.checkLineLog.cultureControlLine = 0;
            } else if (!this.volDataMain.cultureControlLine) {
                this.checkLineLog.cultureControlLine = 0;
            } else {
                throw new Error(`[省批次]文化分数线未达线：${this.volDataMain.cultureControlLine}`)
            }
        } else if (!this.volDataMain.profControlLine) {
            this.checkLineLog.profControlLine = 0;
        } else {
            this.checkLineLog.profControlLine = 1;
            throw new Error(`统考专业分控制线未达线：${this.volDataMain.profControlLine}`)
        }
    }

    /** 小分控制 */
    async artsControl () {
        // 语文分过线
        if (this.stuInfoMain.chineseScore >= this.volDataMain.chineseScoreLimit) {
            this.checkLineLog.chineseScore = 0;
            // 英语分过线
            if (this.stuInfoMain.englishScore >= this.volDataMain.englishScoreLimit) {
                this.checkLineLog.englishScore = 0;
            } else if (!this.volDataMain.englishScoreLimit) {
                this.checkLineLog.englishScore = 0;
            } else {
                this.checkLineLog.englishScore = 1;
                throw new Error(`英语控制线未达线：${this.volDataMain.englishScoreLimit}`)
            }
        } else if (!this.volDataMain.chineseScoreLimit) {
            this.checkLineLog.chineseScore = 0;
        } else {
            this.checkLineLog.chineseScore = 1;
            throw new Error(`语文控制线未达线：${this.volDataMain.chineseScoreLimit}`)
        }
    }



    // 更新用户信息
    async updateUserInfo (params) {
        Object.assign(this.stuInfoMain, params.jointMain);
    }

    // 更新志愿专业数据
    async updateProbInfo (params) {
        Object.assign(this.volDataMain, params.jointInfo)
    }

    // 更新分数线信息
    async updateScoreLine (params) {
        Object.assign(this.scoreLineMain, params);
    }
    // 更新批次线信息
    async updateBatchLine (params) {
        Object.assign(this.batchLineMain, params);
    }
}

class VolDataMain {
    constructor() {
        /** 投档位次 */
        this.archiveRank = '';
        /** 投档规则 */
        this.archiveRule = 1; // 平行或非平行
        /** 投档方式 */
        this.archiveMode = 1; // 只取前4种其他的相对较少，[1:综合分,2:文化分,3:专业分,4:专业分排名]
        /** 投档公式 */
        this.archiveExpression = '';
        /** 投档最低分 */
        this.archiveMinScore = '';
        /** 录取最低分 */
        this.entrolScoreMin = '';
        /** 预计录取最低分 */
        this.preEnrollScoreMin = '';
        /** 预计录取投档分 */
        this.preArchiveScoreMin = '';
        /** 公式取值 */
        this.expression = 0;
        /** p4,修正录取概率 */
        this.competitionDegree = 0;
    }
}

// 考生信息
class StuInfoMain {
    constructor() {
        /** 用户id */
        this.userID = '';
        /** 考试类型 */
        this.profTypeStatus = ''; // 1为统考
        /** 统考专业分 */
        this.jointExamScore = '';
        /** 文化分*/
        this.collEntrExamScore = '';
        /** 省份id */
        this.provinceID = '';
        /** 省份名称 */
        this.provinceName = '';
        /** 文理科id */
        this.artsOrSciences = '';
        /** 统考专业id */
        this.jointProfTypeID = '';
        /** 统考专业名 */
        this.jointProfTypeName = '';
        /** 英语分 */
        this.englishScore = '';
        /** 语文分 */
        this.chineseScore = '';
        /** 文理科中文字符 */
        this.artsOrSciencesStr = '';
        /** 考试类型中文字符 */
        this.profTypeStatusStr = '';
        /** 省份简称 */
        this.simpleProvinceName = '';
        /** 统考位次 */
        this.jointRank = '';
        /** 综合分位次 */
        this.comprehensiveRank = '';

        /** 可以修改的统考分次数 */
        this.canModifyJointScoreNum = '';
        /** 可以修改的文化分次数 */
        this.canModifyCollEntrNum = '';
        /** probabilityCanModProvNum */
        this.probabilityCanModProvNum = '';
        /** 英语修改次数 */
        this.englishLeftNum = '';
        /** 语文修改次数 */
        this.chineseLeftNum = '';
    }
}

// 分数线主要信息
class ScoreLineMain {
    constructor() {
        /** 数据id */
        this.dataId = '';
        /** 数据年份 */
        this.dataYear = '';
        /** 省份id */
        this.provinceId = '';
        /** 省份名称 */
        this.provinceName = '';
        /** 统考类别id */
        this.jointCategoryId = '';
        /** 统考类别名称 */
        this.jointCategoryName = '';
        /** 文理科 */
        this.aos = '';
        /** 文理科名称 */
        this.aosName = '';
        /** 专业状态 */
        this.profTypeStatus = '';
        /** 专业状态名称 */
        this.profTypeStatusName = '';
        this.q = '';
        this.w = '';
        this.a = '';
        this.c = '';
        /** 艺术文化本科线 */
        this.j = '';
        /** 艺术文化专科线 */
        this.l = '';
        /** 统考合格线 */
        this.i = '';
        /** 分数描述 */
        this.scoreExpression = '';
        /** 专业描述 */
        this.probExpression = '';
        /** 等级使用状态 */
        this.rankUsingStatus = '';
        /** 统考类别id */
        this.jointProfTypeID = '';
        /** 统考类别名称 */
        this.jointProfTypeName = '';
    }
}

class CheckLineLog {
    constructor() {
        /** 统考合格线 */
        this.i = '';
        /** 统考本科线 */
        this.h = '';
        /** 统考专科线 */
        this.x = '';
        /** 艺术文化本科线 */
        this.j = '';
        /** 艺术文化专科线 */
        this.l = '';
        /** 专业分数线 */
        this.profScoreLine = '';
        /** 统考专业分控制线 */
        this.profControlLine = '';
        /** 统考文化分控制线 */
        this.cultureControlLine = '';
        /** 语文控制线 */
        this.chineseScore = '';
        /** 英语控制线 */
        this.englishScore = '';
    }


}

const calProbManage = module.exports = {};

// 初始化
calProbManage.setupCalProb = function () {
    return new CalProb();
}

calProbManage.userLogin = async function (params) {
    await yssLogin.clientLogin(Object.assign({
        loginName: 'mihuan30', // 
        password: 'Csk001' // 
    }, params))
    const res = await probApp.getUser({
        ticket: TICKET
    });

    const jointMain = res.result.datas.obj;
    console.log(jointMain);
    return { jointMain }
}

calProbManage.getProbInfo = async function (id) {
    await yssLogin.platfrom({
        userType: 'zyzg'
        // userName: '水濑_zyzg',
        // password: 'Abc12345'
    });

    // 概率-志愿专业数据-业务表(统考计算公式)
    const res = await prob.getJointScoreList({
        id: id, // 院校专业数据id
        ticket: PLAT_TICKET
    })
    const jointInfo = res.result.datas.page.dataList[0];
    return { jointInfo };
}

// 获取省份分数线
calProbManage.getProvinceScoreLine = async function (provinceId) {
    const res = await provinceScoreLine.getAosAndProfTypeList({
        data: {
            p: {
                provinceId: provinceId
            },
            m: ""
        }, ticket: TICKET
    });
    console.log('打印省分数线', res.result.datas.list[0].jointCategoryList);
    return res.result.datas.list[0].jointCategoryList[0];
}

// 获取省份批次线
calProbManage.getProvinceBatchLine = async function (batchLineParam) {
    const res = await prob.getProvinceBatchLine(Object.assign({
        ticket: PLAT_TICKET,
    }, batchLineParam));
    console.log('打印省批次线', res.result.datas);
    return res.result.datas.page.dataList[0];
}