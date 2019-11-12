<template>
    <div>
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row>
                <el-col style="margin:0 0 30px 0;" :span="24">
                    <h4 style="margin-bottom:20px;">搜索例子（可以对多余的隐藏）</h4>
                    <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                        <el-form-item prop="region">
                            <el-select style="width:160px;" v-model="formInline.region" placeholder="请选择角色组">
                                <el-option label="AD妈妈" value="shanghai"></el-option>
                                <el-option label="DSP平台" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="group">
                            <el-select style="width:160px;" v-model="formInline.group" placeholder="请选择用户组">
                                <el-option label="前端工程师" value="shanghai"></el-option>
                                <el-option label="测试工程师" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="searchKey" prop="Resources">
                            <el-select style="width:160px;" v-model="formInline.Resources" placeholder="请选择资源分配组">
                                <el-option label="权限一" value="shanghai"></el-option>
                                <el-option label="权限二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="searchKey" prop="user">
                            <el-input style="width:160px;" v-model="formInline.user" placeholder="请输入登陆账号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">查询</el-button>
                            <el-button @click="resetForm('formInline')">重置</el-button>
                            <div style="float:right;margin-left:20px;">
                                <div style="cursor:pointer;" @click='changeSearch(false)' v-if='searchKey'>收起<span><i class="el-icon-arrow-up"></i></span></div>
                                <div style="cursor:pointer;" @click='changeSearch(true)' v-if='!searchKey'>展开<span><i class="el-icon-arrow-down"></i></span></div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="9">
                    <h4 style="margin-bottom:20px;">基本表单</h4>
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="表单名称">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="选择器">
                            <el-select v-model="form.region" placeholder="请选择">
                                <el-option key="bbk" label="步步高" value="bbk"></el-option>
                                <el-option key="xtc" label="小天才" value="xtc"></el-option>
                                <el-option key="imoo" label="imoo" value="imoo"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="日期时间">
                            <el-col :span="11">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="form.date1"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"
                                ></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker
                                    placeholder="选择时间"
                                    v-model="form.date2"
                                    style="width: 100%;"
                                ></el-time-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="城市级联">
                            <el-cascader :options="options" v-model="form.options"></el-cascader>
                        </el-form-item>
                        <el-form-item label="选择开关">
                            <el-switch v-model="form.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="多选框">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="步步高" name="type"></el-checkbox>
                                <el-checkbox label="小天才" name="type"></el-checkbox>
                                <el-checkbox label="imoo" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="单选框">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="步步高"></el-radio>
                                <el-radio label="小天才"></el-radio>
                                <el-radio label="imoo"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="文本框">
                            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">表单提交</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col style="margin-left:200px;" :span="9">
                    <h4 style="margin-bottom:20px;">表单验证</h4>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="活动名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域" prop="region">
                            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="活动时间" required>
                            <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                            </el-form-item>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="即时配送" prop="delivery">
                            <el-switch v-model="ruleForm.delivery"></el-switch>
                        </el-form-item>
                        <el-form-item label="活动性质" prop="type">
                            <el-checkbox-group v-model="ruleForm.type">
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="特殊资源" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="活动形式" prop="desc">
                            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <div class="form-box">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            searchKey: false,
            formInline: {
                region: '',
                group: '',
                Resources: '',
                user: ''
            },
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: []
            },
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        },
        // 显示隐藏搜索框
        changeSearch(bool) {
            this.searchKey = bool;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>