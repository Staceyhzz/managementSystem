<template>
    <div>
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> Echart图表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-card class="box-card">
                <div class="plugins-tips">
                    Echart.js的图表组件。
                    访问地址：
                    <a
                        href="https://www.echartsjs.com/zh/index.html"
                        target="_blank"
                    >echart</a>
                </div>
                <el-row :gutter="20">
                    <h4 style="margin-bottom:20px;">基础例子</h4>
                    <el-col :span="12">
                        柱状图
                        <div class="schart" id="myCharnt"></div>
                    </el-col>
                    <el-col :span="12">
                        折线图
                        <div class="schart" id="myCharnZ"></div>
                    </el-col>
                    <el-col :span="12">
                        环形图
                        <div class="schart" id="myCharnJ"></div>
                    </el-col>
                    <el-col :span="12">
                        饼状图
                        <div class="schart" id="myCharnH"></div>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-card style="margin-top:20px;" class="box-card">
            <h4 style="margin-top:20px;">tabs切换例子（切换后图表样式全乱，大小不对，这边就写个例子）</h4>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="图表1" name="first">
                    <div class="schart" id="myCharnG"></div>
                </el-tab-pane>
                <el-tab-pane label="图表2" name="second">
                    <div class="schart" id="myCharnC"></div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <el-card style="margin-top:20px;" class="box-card">
            <h4 style="margin:20px 0;">高级例子(各种下拉筛选和数据筛选)</h4>
            <el-select @change="chartList" style="width:150px;" v-model="params.leftVal" filterable placeholder="请选择">
                <el-option
                :disabled='item.id===params.rightVal'
                v-for="item in trend"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-checkbox @change="qushiDb" style="margin:0 20px;" v-model="checkedTime">对比</el-checkbox>
            <el-select @change="chartList" v-if="checkedTime" style="width:150px;" v-model="params.rightVal" filterable placeholder="请选择">
                <el-option
                :disabled='item.id===params.leftVal'
                v-for="item in trend"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-select @change="chartList" style="float:right;width:150px;" v-model="params.summary" filterable placeholder="请选择">
                <el-option
                v-for="item in trendDisplay"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <div class="schart" id="myCharnK"></div>
        </el-card>
    </div>
</template>

<script>
import echarts from "echarts";
export default {
    name: 'basecharts',
    data() {
        return {
            checkedTime: false,
            params: {
                leftVal: 2,//左边选择展示值
                rightVal: 1,//右边选择展示值
                summary: 1
            },
            trend: [
                {
                    id: 1,
                    name: '消耗'
                },
                {
                    id: 2,
                    name: '展示数'
                },
                {
                    id: 3,
                    name: '平均千次展现费用'
                },
                {
                    id: 4,
                    name: '点击数'
                },
                {
                    id: 5,
                    name: '点击率'
                },
                {
                    id: 6,
                    name: '平均点击单价'
                },
                {
                    id: 7,
                    name: '转化数'
                },
                {
                    id: 8,
                    name: '转化率'
                },
                {
                    id: 9,
                    name: '转化成本'
                },
                {
                    id: 10,
                    name: '激活数'
                },
                {
                    id: 11,
                    name: '注册数'
                },
                {
                    id: 12,
                    name: '关键行为数'
                },
                {
                    id: 13,
                    name: '分享数'
                },
                {
                    id: 14,
                    name: '评论提交数'
                },
                {
                    id: 15,
                    name: '点赞数'
                },
                {
                    id: 16,
                    name: '新增关注数'
                },
                {
                    id: 17,
                    name: '主页访问量'
                }
            ],
            trendDisplay: [
                {
                    id: 1,
                    name: '显示Top5'
                },
                {  
                    id: 2,
                    name: '显示Top10'
                },
                {
                    id: 3,
                    name: '显示汇总数据'
                }
            ],
            activeName: 'first',
            chart: null,
            chart2: null,
            chart3: null,
            chart4: null,
            chart5: null,
            chart6: null,
            chart7: null
        };
    },
    mounted () {
        this.chartSet();
        this.firstEchars();
        this.accclist();
        this.tabsList();
        // 最后一个图表方法
        this.lastSet();
        this.chartList();
    },
    methods: {
        // 绘制基础4个图表
        chartSet() {
            let self = this;
            // 柱状图
            let el = document.getElementById('myCharnt');
            self.chart = echarts.init(el);
            // 折线图
            let al = document.getElementById('myCharnZ');
            self.chart2 = echarts.init(al);
            // 饼图
            let bl = document.getElementById('myCharnJ');
            self.chart3 = echarts.init(bl);
            // 环形图
            let hl = document.getElementById('myCharnH');
            self.chart4 = echarts.init(hl);
        },
        // 执行基础4个图表
        accclist () {
            this.setEcharts();
            this.lineEcharts();
            this.annularEcharts();
            this.cakeEcharts();
        },
        // 柱状图绘制
        setEcharts() {
			let option = {
                color: ['#3398DB'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    data: ['直接访问']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'直接访问',
                        type:'bar',
                        barWidth: '60%',
                        data:[10, 52, 200, 334, 390, 330, 220]
                    }
                ]
            }
			this.chart.setOption(option, true);
        },
        // 折线图绘制
        lineEcharts() {
			let option = {
                title: {
                    text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['邮件营销','联盟广告','视频广告']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    }
                ]
            }
			this.chart2.setOption(option, true);
        },
        // 饼图绘制
        annularEcharts() {
			let option = {
                title : {
                    text: '南丁格尔玫瑰图',
                    subtext: '纯属虚构',
                    x:'center',
                    y:'center',
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:[ 'rose3','rose5','rose6','rose7','rose8']
                },
                // 需要下载和看文字数据的请//出来
                // toolbox: {
                //     show : true,
                //     feature : {
                //         mark : {show: true},
                //         dataView : {show: true, readOnly: false},
                //         magicType : {
                //             show: true,
                //             type: ['funnel']
                //         },
                //         restore : {show: true},
                //         saveAsImage : {show: true}
                //     }
                // },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [70, 100],
                        center : ['50%', '50%'],
                        data:[
                            {value:10, name:'吴际帅\n牛亚莉'},
                            {value:5, name:'rose2'},
                            {value:15, name:'rose3'},
                            {value:25, name:'rose4'},
                            {value:20, name:'rose5'},
                            {value:35, name:'rose6'},
                            {value:30, name:'rose7'},
                            {value:40, name:'rose8'}
                        ]
                    }
                ]
            }
			this.chart3.setOption(option, true);
        },
        // 环形图绘制
        cakeEcharts() {
			let option = {
                title : {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                },
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
			this.chart4.setOption(option, true);
        },
        // tabs第一个图表
        firstEchars() {
            let self = this;
            let gl = document.getElementById('myCharnG');
            self.chart5 = echarts.init(gl);
        },
        // 切换的事件
        handleClick(tab, event) {
            let self = this;
            setTimeout(function () {
                let cl = document.getElementById('myCharnC');
                self.chart6 = echarts.init(cl);
                self.tabsList();
            }, 400)
        },
        // 获取数据
        tabsList() {
            let data = [{
                "value": 17.6,
                "name": "保险"
            }, {
                "value": 16.5,
                "name": "知识产权"
            }, {
                "value": 16.5,
                "name": "出版"
            }, {
                "value": 15.5,
                "name": "轻工业"
            }, {
                "value": 14.8,
                "name": "金融"
            }, {
                "value": 13.7,
                "name": "化工"
            }, {
                "value": 13.6,
                "name": "科技"
            }, {
                "value": 13.4,
                "name": "教育"
            }, {
                "value": 13.1,
                "name": "对外经贸合作"
            }, {
                "value": 12.6,
                "name": "节能"
            }, {
                "value": 12.6,
                "name": "电力"
            }, {
                "value": 12.6,
                "name": "资源综合利用"
            }, {
                "value": 12.4,
                "name": "能源"
            }, {
                "value": 12.2,
                "name": "矿产"
            }, {
                "value": 12,
                "name": "信息产业"
            }, {
                "value": 12,
                "name": "基础设施"
            }, {
                "value": 11.7,
                "name": "物流"
            }, {
                "value": 11.6,
                "name": "环境保护"
            }, {
                "value": 11.6,
                "name": "国家安全"
            }, {
                "value": 11.6,
                "name": "水运"
            }]
            this.rectangleEcharts(data);
            // 有tabs的时候记得判断一下，不然控制台会报错
            if(this.activeName == 'second') {
                this.funnelEcharts();
            }
        },
        // 矩形图绘制
        rectangleEcharts(data) {
            data.map((item,index) => {
                data[index]['name'] = data[index]['name'] + ' ' + data[index]['value'] + '%'
            })
			let option = {
                // backgroundColor: "#000",
                title: {
                    text: '“一带一路”沿线各省区市分析——上海',
                    subtext: '纯属虚构',
                    left: '50%',
                    top: '0',
                    textAlign: 'center',
                    textStyle: {
                        color: "#000",
                        fontWeight: 'normal',
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}"
                },
                series: [{
                    type: 'treemap',
                    width: '100%',
                    height: '85%',
                    top: '15%',
                    roam: false, //是否开启拖拽漫游（移动和缩放）
                    nodeClick: false, //点击节点后的行为,false无反应
                    breadcrumb: {
                        show: false
                    },
                    label: { //描述了每个矩形中，文本标签的样式。
                        normal: {
                            show: true,
                            position: ['10%', '40%']
                        }
                    },
                    itemStyle: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 16,
                            },
                            borderWidth: 1,
                            borderColor: '#fff',
                        },

                        emphasis: {
                            label: {
                                show: true
                            }
                        }
                    },
                    data: data
                }]
            }
			this.chart5.setOption(option, true);
        },
        // 折线柱状图绘制
        funnelEcharts(data) {
            let xData = function() {
                var data = [];  
                for (var i = 1; i < 13; i++) {
                    data.push(i + "月份");
                }
                return data;
            }();
			let option = {
                // backgroundColor: "#344b58",
                "title": {
                    "text": "本年商场顾客男女人数统计",
                    "subtext": "BY Wang Dingding",
                    x: "4%",
                    top: '-20',
                    textStyle: {
                        color: '#fff',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '16',

                    },
                },
                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow",
                        textStyle: {
                            color: "#fff"
                        }

                    },
                },
                "grid": {
                    "borderWidth": 0,
                    "top": 110,
                    "bottom": 95,
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    x: '4%',
                    top: '11%',
                    textStyle: {
                        color: '#90979c',
                    },
                    "data": ['女', '男', '平均']
                },
                

                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "data": xData,
                }],
                "yAxis": [{
                    "type": "value",
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0,

                    },
                    "splitArea": {
                        "show": false
                    },

                }],
                "dataZoom": [{
                    "show": true,
                    "height": 30,
                    "xAxisIndex": [
                        0
                    ],
                    bottom: 30,
                    "start": 10,
                    "end": 80,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle:{
                        color:"#d3dee5",
                        
                    },
                    textStyle:{
                        color:"#fff"},
                    borderColor:"#90979c"
                    
                    
                }, {
                    "type": "inside",
                    "show": true,
                    "height": 15,
                    "start": 1,
                    "end": 35
                }],
                "series": [{
                        "name": "女",
                        "type": "bar",
                        "stack": "总量",
                        "barMaxWidth": 35,
                        "barGap": "10%",
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(255,144,128,1)",
                                "label": {
                                    "show": true,
                                    "textStyle": {
                                        "color": "#fff"
                                    },
                                    "position": "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": [
                            709,
                            1917,
                            2455,
                            2610,
                            1719,
                            1433,
                            1544,
                            3285,
                            5208,
                            3372,
                            2484,
                            4078
                        ],
                    },

                    {
                        "name": "男",
                        "type": "bar",
                        "stack": "总量",
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(0,191,183,1)",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": [
                            327,
                            1776,
                            507,
                            1200,
                            800,
                            482,
                            204,
                            1390,
                            1001,
                            951,
                            381,
                            220
                        ]
                    }, {
                        "name": "总数",
                        "type": "line",
                        "stack": "总量",
                        symbolSize:10,
                        symbol:'circle',
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(252,230,48,1)",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": true,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        "data": [
                            1036,
                            3693,
                            2962,
                            3810,
                            2519,
                            1915,
                            1748,
                            4675,
                            6209,
                            4323,
                            2865,
                            4298
                        ]
                    },
                ]
            }
			this.chart6.setOption(option, true);
        },
        // 高级图表
        lastSet() {
            let self = this;
            let zl = document.getElementById('myCharnK');
            self.chart7 = echarts.init(zl);
        },
        // 获取数据
        chartList() {
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
            this.drawEcharts(data);
        },
        // 对比on-change
        qushiDb(data) {
            if(data == true) {
                this.params.summary = 3
            } else {
                this.params.summary = 1
            }
            this.chartList();
        },
        // 绘制
        drawEcharts(data) {
            console.log(data)
            var name = [];
            var _xData = [];
            var arr = [];
            var list = [];
            var valueName = '';
            var valueName2 = '';
            const _text = this.trend.filter(item => item.id === this.params.leftVal)[0].name
            const _text2 = this.trend.filter(item => item.id === this.params.rightVal)[0].name
            if(this.params.summary == 1) {
                list = data.loginChart.slice(0,5);
                this.checkedTime = false;
            } else if(this.params.summary == 2) {
                list = data.loginChart.slice(0,10);
                this.checkedTime = false;
            } else {
                list = data.huizongChart;
                this.checkedTime = true;
            }
            if(_text == '消耗' || _text == '平均千次展现费用' || _text == '平均点击单价') {
                valueName = '元';
            } else if(_text == '点击率') {
                valueName = '%'
            } else {
                valueName = '';
            }
            if(_text2 == '消耗' || _text2 == '平均千次展现费用' || _text2 == '平均点击单价') {
                valueName2 = '元';
            } else if(_text2 == '点击率') {
                valueName2 = '%'
            } else {
                valueName2 = '';
            }
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
                    x: '92%', // 'center' | 'left' | {number},
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
                        name: _text,
                        min: 0,
                        max: 1,
                        interval: 0.2,
                        nameTextStyle : {
                            fontWeight : 'bold'
                        },
                        axisLabel: {
                            formatter: '{value}' + valueName
                        }
                    },
                    {
                        type: 'value',
                        name: _text2,
                        min: 0,
                        max: 1,
                        interval: 0.2,
                        show: this.checkedTime,
                        nameTextStyle : {
                            fontWeight : 'bold'
                        },
                        axisLabel: {
                            formatter: '{value}' + valueName2
                        }
                    }
                ],
                series: arr
            }
			this.chart7.setOption(option, true);
        },
    }
};
</script>

<style scoped>
.schart {
    width: 100%;
    height: 300px;
}
</style>