<template>
    <div id="accountindex" class="table">
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>控制面板</el-breadcrumb-item>
                <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button style="margin:0 0 14px 0;" type="primary" @click="adduser(null)">+  新增模块</el-button>
            <!-- table -->
            <el-table
                v-loading="loading"
                ref="table"
                :header-cell-style="{background:'#f8f8f9'}"
                :data="data1"
                border
                style="width: 100%">
                <el-table-column prop="id" label="菜单id" min-width="40" align="center"></el-table-column>
                <el-table-column prop="moduleName" label="模块名称" min-width="100" align="center"></el-table-column>
                <el-table-column prop="moduleUrl" label="模块链接" min-width="100" align="center"></el-table-column>
                <el-table-column prop="userGroup" label="模块图标" min-width="100" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-edit"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="department" label="是否显示" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.online == true">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="moduleSort" label="排序（列表排序）" min-width="100" align="center"></el-table-column>
                <el-table-column prop="loginTime" label="子菜单管理" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button style="padding:5px;background:#3CC4C4;color:white;" @click="subLing(scope.row)">子菜单管理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="userDescription" label="功能管理" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button style="padding:5px;background:#3CC4C4;color:white;" @click="sealing(scope.row)">功能管理</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="操作" min-width="80" align="center">
                    <template slot-scope="scope">
                        <div class="elbutton">
                            <el-button style="padding:5px;background:#2d8cf0;color:white;" @click="adduser(scope.row)">编辑</el-button>
                            <el-button style="padding:5px;background:#ed4014;color:white;" @click="remove(scope.row)">删除</el-button>
                        </div>
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
            <my-modal v-model="modal2" :title="modalType === 'add' ? '新增账号':'编辑账号'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="模块名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="模块链接：" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="图标：">
                        <el-select v-model="ruleForm.region" placeholder="请选择图标">
                            <el-option label="区域一" value="shanghai">
                                <i class="el-icon-delete"></i>
                            </el-option>
                            <el-option label="区域二" value="beijing">
                                <i class="el-icon-share"></i>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序：" prop="group">
                        <el-input-number v-model="num" :min="1" :max="100" label="描述文字"></el-input-number>
                    </el-form-item>
                    <el-form-item label="是否显示：" prop="resources">
                        <el-select v-model="ruleForm.resources" placeholder="是否显示？">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="bianji" type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
            num: null,
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
        remove() {
            this.$confirm('确认删除？')
            .then(_ => {
                
            })
            .catch(_ => {});
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