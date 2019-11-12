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
                <el-form-item>
                    <el-input v-model="formInline.user" placeholder="请输入权限名"></el-input>
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
                    <el-form-item label="角色名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色组标识：" prop="userName">
                        <el-input v-model="ruleForm.userName">  </el-input>
                    </el-form-item>
                    <el-form-item label="角色描述：" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="权限配置：" prop="desc">
                        <treeselect
                            style="width:300px;"
                            :options="treeData1"
                            :multiple="true"
                            v-model="zhi"
                            :normalizer="normalizer"
                            :value-consists-of="valueConsistsOf"
                            :flatten-search-results="true"
                            placeholder=""/>
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
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    components:{
        MyModal,
        Treeselect
    },
    data(){
        return {
            valueConsistsOf: 'ALL_WITH_INDETERMINATE',
            zhi: null,
            treeData1: [ 
                {
                    id: 'a',
                    label: 'a',
                    children: [ 
                        {
                        id: 'aa',
                        label: 'aa',
                        }, 
                        {
                        id: 'ab',
                        label: 'ab',
                        } 
                    ],
                }, 
                {
                    id: 'b',
                    label: 'b',
                }, 
                {
                    id: 'c',
                    label: 'c',
                } 
            ],
            bianji: true,
            formInline: {
                user: '',
                region: ''
            },
            ruleForm: {
                name: '',
                userName: '',
                desc: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                userName: [
                    { required: true, message: '请输入角色组标识', trigger: 'blur' },
                ],
                desc: [
                    { required: true, message: '请填角色组描述', trigger: 'blur' }
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
                this.zhi = ['aa','b']
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
        sealing () {
            this.$confirm('确认封禁？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        normalizer(node) {
            return {
                id: node.id,
                label: node.label,
                children: node.children,
                isDefaultExpanded: false
            }
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