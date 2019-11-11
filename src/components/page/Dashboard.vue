<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>{{ time }}</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="schart" id="myCharnt"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <div class="schart" id="myCharnZ"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import bus from '../common/bus';
import echarts from "echarts";
export default {
    name: 'dashboard',
    data() {
        return {
            time: this.getNowTime(),
            name: localStorage.getItem('ms_username'),
            todoList: [
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: false
                },
                {
                    title: '今天要修复100个bug',
                    status: true
                },
                {
                    title: '今天要写100行代码加几个bug吧',
                    status: true
                }
            ],
            chart: null,
            chart2: null
        };
    },
    computed: {
        role() {
            return this.name === 'huangzhenzong' ? '超级管理员' : '普通用户';
        }
    },
    mounted() {
        this.chartSet();
        this.accclist();
    },
    methods: {
        accclist() {
            const data = {
                loginChart: [
                    {
                        name: '1',
						curve: [
							{date: "2018-10-01", revenue: 0.01},
							{date: "2018-10-02", revenue: 0.02},
							{date: "2018-10-03", revenue: 0.03},
							{date: "2018-10-04", revenue: 0.04},
							{date: "2018-10-05", revenue: 0.05},
							{date: "2018-10-06", revenue: 0.06},
						]
                    },
                    {
                        name: '2',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '3',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '4',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },   
                    {
                        name: '5',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '6',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '7',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '8',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '9',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '10',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    },
                    {
                        name: '11',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.05},
							{date: "2018-10-03", revenue: 0.04},
							{date: "2018-10-04", revenue: 0.03},
							{date: "2018-10-05", revenue: 0.02},
							{date: "2018-10-06", revenue: 0.01},
						]
                    }
                ],
                huizongChart: [
                    {
                        name: '汇总1',
						curve: [
							{date: "2018-10-01", revenue: 0.013},
							{date: "2018-10-02", revenue: 0.0247},
							{date: "2018-10-03", revenue: 0.035},
							{date: "2018-10-04", revenue: 0.043},
							{date: "2018-10-05", revenue: 0.059},
							{date: "2018-10-06", revenue: 0.061},
						]
                    },
                    {
                        name: '汇总2',
						curve: [
							{date: "2018-10-01", revenue: 0.06},
							{date: "2018-10-02", revenue: 0.051},
							{date: "2018-10-03", revenue: 0.042},
							{date: "2018-10-04", revenue: 0.037},
							{date: "2018-10-05", revenue: 0.028},
							{date: "2018-10-06", revenue: 0.019},
						]
                    }
                ]
            }
            var thirdData = {
                list: [
                    {
                        name: '汇总1',
                        curve: [
                            {revenue: 0.013},
                            {revenue: 0.0247},
                        ]
                    },
                    {
                        name: '汇总2',
                        curve: [
                            {revenue: 0.06},
                            {revenue: 0.051},
                        ]
                    }
                ],
                list1: [
                    {
                        name: 'AAA',
                        curve: [
                            {revenue: 0.013}
                        ]
                    }
                ],
            }
            this.setEcharts(data);
            this.setEcharts2(thirdData)
        },
        // 图表
        chartSet() {
            let self = this;
            let el = document.getElementById('myCharnt');
            let el2 = document.getElementById('myCharnZ');
            self.chart = echarts.init(el);
            self.chart2 = echarts.init(el2);
        },
        setEcharts(data) {
            console.log(data)
            var name = [];
            var _xData = [];
            var arr = [];
            var list = [];
            list = data.huizongChart;
            list.map(item => {
                var obj = {			
					name: item.name,
					type:'line',
					data: []
				}
                name.push(item.name);
                item.curve.map(item2 => {
                    _xData.push(item2.date)
                    obj.data.push(item2.revenue);
				})
                arr.push(obj)
            })
			let option = {
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: {type: 'cross'}
                },
                grid: {
                    left: '3%',
                    right: '11%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    orient: 'vertical', // 'vertical'
                    x: '90%', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    padding: 20,
                    itemGap: 20,
                    data: name
                },
                xAxis: [
                    {
                        type: 'category',
                        data: _xData
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '数值',
                        min: 0,
                        max: 1,
                        interval: 0.2,
                        nameTextStyle : {
                            fontWeight : 'bold'
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: arr
            }
			this.chart.setOption(option, true);
        },
        setEcharts2(data) {
            console.log(data)
			let xLine = [];
			for (let i = 0; i < 10; i++) {
				xLine.push(' ');
			}
			let arr = [];
            var xLineList = data.list
 			xLineList.forEach((item, i) => {
				let color = i % 2 === 0 ? '#28d7d2' : '#0d98e2';
                var obj = {			
					name: item.name,
                    type:'bar',
                    barWidth: 20,
                    color: color,
					data: []
				}
                xLine[i] = item.name;
                item.curve.map(item2 => {
                    obj.data.push(item2.revenue);
				})
                arr.push(obj)
			})
			let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '11%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
					{
						type: 'category',
						axisLabel: {
							interval: 0
						},
						data: xLine,
					}
                ],
                legend: {
                    orient: 'vertical', // 'vertical'
                    x: '90%', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    padding: 20,
                    itemGap: 20,
                    data: xLine
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '_text',
                        min: 0,
                        max: 1,
                        interval: 0.2,
                        nameTextStyle : {
                            fontWeight : 'bold'
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: arr
            }
			this.chart2.setOption(option, true);
		},
        // 获取时间方法
        getNowTime (val) {
            let date = new Date();
            if (val) {
                date = new Date(date.getTime() + 86400000 * val);
            }
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
