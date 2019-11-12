<template>
    <div id="accountindex" class="table">
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>控制面板</el-breadcrumb-item>
                <el-breadcrumb-item>用户组管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="20" class="">
                <el-col :span="5">
                    <div style="min-height:700px;" class="drag-box-item">
                        <p style="font-size:18px;padding:15px 0;text-align:center;border-bottom:1px solid #E5E5E5;">组织结构管理</p>
                        <div class="tree" style="padding:0 15px;">
                            <el-tree
                                style="margin:10px 0 0 0;"
                                :data="treeData1"
                                node-key="id"
                                default-expand-all
                                :expand-on-click-node="false">
                                <span class="custom-tree-node" slot-scope="{ node, data }">
                                    <span style="display:inline-block;" @click="ceshi(data)">{{ data.label }}</span>
                                    <span>
                                        <i @click="userDepartment(data)" style="margin:0 7px 0 0;font-size:16px;" class="el-icon-edit-outline"></i>
                                        <i @click="remove(data)" style="font-size:16px;" class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </el-tree>
                        </div>
                    </div>
                </el-col>
                <el-col :span="19">
                    <el-button style="margin:10px 0 10px 8px;" type="primary" icon="md-add" @click="userDepartment(null)">新增用户组</el-button>
                    <div style="padding:20px 20px 30px 20px;">
                        <h3 style="float:left;">{{ staffName }}子成员</h3>
                        <h3 style="padding:0 0 10px 0;margin: 0 0 0 0;text-align:right;">{{ staffName }}<span style="margin-right:20px;">负责人：</span>{{ fuzeren }}</h3>
                        <div class="cener">
                            <el-table
                                :header-cell-style="{background:'#f8f8f9'}"
                                :data="data1"
                                border
                                style="width: 100%">
                                <el-table-column min-width="100" prop="id" label="用户id" align="center"></el-table-column>
                                <el-table-column min-width="100" prop="name" label="组员名称" align="center"></el-table-column>
                                <el-table-column min-width="550" prop="viewName" label="用户权限" align="center">
                                    <template slot-scope="scope">
                                        <el-popover width="600" trigger="hover" placement="bottom">
                                            <div style="overflow-y:scroll;max-height:300px;min-height:0px;">{{ scope.row.viewName }}</div>
                                            <div slot="reference" class="name-wrapper">
                                                <span style="display: inline-block;width: 800px;overflow: hidden;textOverflow: ellipsis;whiteSpace: nowrap;">{{ scope.row.viewName }}</span>
                                            </div>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column min-width="100" prop="date" label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button style="float:left;padding:5px;" type="primary" @click="addChannel(scope.row)">数据查看</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <my-modal v-model="modal2" :title="modalType === 'add' ? '新增用户组':'编辑用户组'">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="选择层级：">
                        <el-radio-group v-model="ruleForm.radio">
                            <el-radio :label="1">顶级部门</el-radio>
                            <el-radio :label="2">次级部门</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div v-if="ruleForm.radio == 1">
                        <el-form-item label="部门名称：" prop="userName">
                            <el-input style="width:215px;" v-model="ruleForm.userName">  </el-input>
                        </el-form-item>
                        <el-form-item label="负责人：" prop="desc">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div v-else>
                        <el-form-item label="上级部门选择：" prop="desc">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>                        
                        <el-form-item label="部门名称：" prop="userName">
                            <el-input style="width:215px;" v-model="ruleForm.userName">  </el-input>
                        </el-form-item>
                        <el-form-item label="部门负责人：" prop="desc">
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
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
import MyModal from '../../modal/myModal.vue';
export default {
    components:{
        MyModal
    },
    data(){
        return {
            staffName: null,
            fuzeren: null,
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
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
            bianji: true,   
            ruleForm: {
                radio: 1
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
            data1: []
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
        userDepartment(data) {
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
        ceshi (data) {
            this.staffName = data.label;
            this.fuzeren = data.id;
        },
        remove() {
            this.$confirm('确认删除？')
            .then(_ => {
                
            })
            .catch(_ => {});
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

<style>
.tree .el-tree {
    background: #f9f9f9;
}
.tree1 .el-tree {
    background: white;
}
.tree1 .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.tree1 .el-icon-caret-right:before {
  content: "+";
  font-size: 18px;
}
.tree1 .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  content: "-";
  font-size: 18px;
}
.tree .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.tree .el-icon-caret-right:before {
  content: "+";
  font-size: 18px;
}
.tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  content: "-";
  font-size: 18px;
}
.drag-box-item {
    /* flex: 1; */
    /* max-width: 330px;
    min-width: 300px; */
    background-color: #f9f9f9;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
}
</style>
