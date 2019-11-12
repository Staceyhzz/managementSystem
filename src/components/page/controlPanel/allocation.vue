<template>
    <div id="accountindex" class="table">
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>控制面板</el-breadcrumb-item>
                <el-breadcrumb-item>资源分配组管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button style="margin:0 0 14px 0;" type="primary" @click="adduser(null)">+  新增资源组</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="formInline.user" placeholder="请输入资源组名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="onSubmit">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table
                v-loading="loading"
                ref="table"
                :header-cell-style="{background:'#f8f8f9'}"
                :data="data1"
                border
                style="width: 100%">
                <el-table-column prop="id" label="资源id" align="center"></el-table-column>
                <el-table-column prop="userName" label="资源组名称" align="center"></el-table-column>
                <el-table-column prop="email" label="描述" align="center"></el-table-column>
                <el-table-column prop="userGroup" label="用户查看" align="center"></el-table-column>
                <el-table-column prop="department" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="date" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button style="padding:5px;background:#2d8cf0;color:white;" @click="adduser(scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.status == 1" style="padding:5px;background:#ed4014;color:white;" @click="sealing(scope.row)">封禁</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style="text-align:right;padding:16px;"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataCount">
            </el-pagination>
            <my-modal v-model="modal2" :title="modalType === 'add' ? '新增资源组':'编辑资源组'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="资源组名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源组描述：" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <p style="margin:10px 0 10px 0;">Feeds业务</p>
                    <div style="max-width:650px;margin:0 0 20px 0;border:1px solid #E5E5E5;">
                        <h3 style="text-align:center;padding:15px 0;border-bottom:1px solid #E5E5E5;background:#f3f3f3;">业务名称
                            <el-checkbox style="float:right;margin-right:20px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        </h3>
                        <el-checkbox-group style="margin:10px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <p style="margin:10px 0 10px 0;">外输业务</p>
                    <div style="max-width:650px;margin:0 0 20px 0;border:1px solid #E5E5E5;">
                        <h3 style="text-align:center;padding:15px 0;border-bottom:1px solid #E5E5E5;background:#f3f3f3;">业务名称
                            <el-checkbox style="float:right;margin-right:20px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        </h3>
                        <el-checkbox-group style="margin:10px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>          
                    <p style="margin:10px 0 10px 0;">普通业务</p> 
                    <div style="max-width:650px;margin:0 0 20px 0;border:1px solid #E5E5E5;">
                        <h3 style="text-align:center;padding:15px 0;border-bottom:1px solid #E5E5E5;background:#f3f3f3;">业务名称
                            <el-checkbox style="float:right;margin-right:20px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        </h3>
                        <el-checkbox-group style="margin:10px;" v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>  
                    <el-form-item>
                        <el-button v-if="bianji" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button v-else type="primary" @click="submitForm('ruleForm')">编辑</el-button>
                        <el-button @click="modal2 = false">取消</el-button>
                    </el-form-item>
                </el-form>
            </my-modal>
        </div>
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
import MyModal from '../../modal/myModal.vue';
export default {
    components:{
        MyModal
    },
    data(){
        return {
            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            bianji: true,
            formInline: {
                user: '',
                region: ''
            },
            ruleForm: {
                name: '',
                userName: '',
                telephone: '',
                pass: '',
                region: '',
                group: '',
                resources: '',
                desc: '',
                email: ''   
            },
            rules: {
                name: [
                    { required: true, message: '请输入账号名称', trigger: 'blur' },
                ],
                userName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                telephone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                region: [
                    { required: true, message: '请选择角色组', trigger: 'change' }
                ],
                group: [
                    { required: true, message: '请选择用户组', trigger: 'change' }
                ],
                resources: [
                    { required: true, message: '请选择资源分配组', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            },
            modal2: false,
            loading: true,
            modalType: 'add',
            dataCount: 0, // 初始化信息总条数
            pageNum: 1, // 页数
            pageSize: 10,
            data1: [
                {
                    id: 1,
                    userName: '黄振宗',
                    email: '1296532122@qq.com',
                    userGroup: 'AD妈妈',
                    department: '前端程序员',
                    assignName: '暂无',
                    loginTime: '2019-7-7',
                    userDescription: '前端程序员',
                    dingId: 123156,
                    status: 1,
                }
            ]
        }
    },
    mounted() {
        this.accountsList();
    },
    methods:{
        // 账号列表
        accountsList () {
            this.loading = false;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                    this.modal2 = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        sealing () {
            this.$confirm('确认封禁？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        adduser(data) {
            if(data) {
                this.$refs['ruleForm'].resetFields();
                this.modalType = 'edit';
                this.bianji = false;
                this.ruleForm.name = data.userName;
                this.ruleForm.userName = data.userName;
                this.ruleForm.pass = '132123'
                this.ruleForm.email = data.email;
                this.ruleForm.telephone = data.dingId;
                this.ruleForm.region = 'shanghai';
                this.ruleForm.group = 'shanghai';
                this.ruleForm.resources = 'beijing';
                this.ruleForm.desc = data.userDescription;
            } else {
                this.$refs['ruleForm'].resetFields();
                this.modalType = 'add';
                this.bianji = true;
            }
            this.modal2 = true;
        },
        onSubmit() {
            console.log('submit!');
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
    }
}
</script>