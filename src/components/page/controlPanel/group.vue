<template>
    <div id="accountindex" class="table">
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>控制面板</el-breadcrumb-item>
                <el-breadcrumb-item>角色组管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button style="margin:0 0 14px 0;" type="primary" @click="adduser(null)">+  新增角色组</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
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
                <el-table-column prop="id" label="角色id" align="center"></el-table-column>
                <el-table-column prop="userName" label="角色组名称" align="center"></el-table-column>
                <el-table-column prop="email" label="组员详情" align="center"></el-table-column>
                <el-table-column prop="userGroup" label="角色组key" align="center"></el-table-column>
                <el-table-column prop="department" label="描述" align="center"></el-table-column>
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
            <my-modal v-model="modal2" :title="modalType === 'add' ? '新增角色组':'编辑角色组'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="登录名：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="telephone">
                        <el-input v-model="ruleForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="角色组：" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择角色组">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户组：" prop="group">
                        <el-select v-model="ruleForm.group" placeholder="请选择用户组">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资源分配组：" prop="resources">
                        <el-select v-model="ruleForm.resources" placeholder="请选择资源分配组">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
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
import MyModal from '../../modal/myModal.vue';
export default {
    components:{
        MyModal
    },
    data(){
        return {
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