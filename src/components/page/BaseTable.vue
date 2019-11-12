<template>
    <div>
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h4 style="margin-bottom:20px;">基本的列表</h4>
            <el-button style="margin-bottom:10px;" @click="dayin">打印</el-button>
            <span>（main.js引入print.js注册下就可以用打印功能了）</span>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                :header-cell-style="{background:'#f8f8f9'}"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column label="账户余额" align="center">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <h4 style="margin-bottom:20px;">expand列表(点击按钮展开)例子</h4>
            <el-table
                v-loading="loading"
                ref="table"
                :data="tableData"
                :header-cell-style="{background:'#f8f8f9'}"
                border
                tooltip-effect="dark"
                row-key="id">
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column label="账户余额" align="center">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column label="操作" width="80" align='center'>
                    <template slot-scope="scope">
                        <el-button style="float:left;padding:5px;background:#2d8cf0;color:white;" @click="toogleExpand(scope.row,scope.$index)">查看明细</el-button>
                    </template>
                </el-table-column>
                <el-table-column type="expand" width="1">
                    <template slot-scope="props">
                        <el-table
                        :data="tableData5"
                        :header-cell-style="{background:'#f8f8f9'}"
                        style="width: 100%">
                            <el-table-column label="消耗月份" prop="year" align='center' ></el-table-column>
                            <el-table-column label="消耗金额" prop="usePrice" align='center'></el-table-column>
                            <el-table-column label="月末结存金额" prop="minusPrice" align='center'></el-table-column>
                            <el-table-column label="qidcode" prop="qidCode" align='center'></el-table-column>
                            <el-table-column label="消耗月份" prop="dateMonth" align='center'></el-table-column>
                            <el-table-column label="消耗量级" prop="totalNumber" align='center'></el-table-column>
                            <el-table-column label="消耗金额" prop="totalPrice" align='center'></el-table-column>
                        </el-table> 
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <h4 style="margin-bottom:20px;">点击当前行（checked打勾当前行高亮，支持多选反选）例子</h4>
            <el-table
                v-loading="loading"
                ref="tableData"
                :data="tableData"
                :header-cell-style="{background:'#f8f8f9'}"
                border
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                @row-click="handleclick"
                :row-style="rowClass"
                row-key="id">
                <el-table-column type="selection" width="55" align='center'></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名" align="center"></el-table-column>
                <el-table-column label="账户余额" align="center">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            selectRow: [],
			multipleSelection:[],
            loading: false,
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            tableData5: [
                {
                    year: '10月',
                    usePrice: 4,
                    minusPrice: 89,
                    qidCode: '0314',
                    dateMonth: '9月',
                    totalNumber: 0.5,
                    totalPrice: 23
                },
                {
                    year: '1月',
                    usePrice: 8,
                    minusPrice: 5.6,
                    qidCode: '14',
                    dateMonth: '5月',
                    totalNumber: 1.5,
                    totalPrice: 84
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    watch: {
		multipleSelection(data) {  //存储选中的row
			this.selectRow = [];
			if (data.length > 0) {
			data.forEach((item, index) => {
				this.selectRow.push(item.id);
			});
			}
		}
	},
    methods: {
        // 获取数据
        getData() {
            var data = {
                "list": [{
                        "id": 1,
                        "name": "张三",
                        "money": 123,
                        "address": "广东省东莞市长安镇",
                        "state": "成功",
                        "date": "2019-11-1",
                        "thumb": "https://lin-xin.gitee.io/images/post/wms.png"
                    },
                    {
                        "id": 2,
                        "name": "李四",
                        "money": 456,
                        "address": "广东省广州市白云区",
                        "state": "成功",
                        "date": "2019-10-11",
                        "thumb": "https://lin-xin.gitee.io/images/post/node3.png"
                    },
                    {
                        "id": 3,
                        "name": "王五",
                        "money": 789,
                        "address": "湖南省长沙市",
                        "state": "失败",
                        "date": "2019-11-11",
                        "thumb": "https://lin-xin.gitee.io/images/post/parcel.png"
                    },
                    {
                        "id": 4,
                        "name": "赵六",
                        "money": 1011,
                        "address": "福建省厦门市鼓浪屿",
                        "state": "成功",
                        "date": "2019-10-20",
                        "thumb": "https://lin-xin.gitee.io/images/post/notice.png"
                    }
                ],
                "pageTotal": 4
            }
            this.tableData = data.list;
            this.pageTotal = data.pageTotal;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
            })
            .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //  点击展开的逻辑
        toogleExpand(row,index) {
            let self = this;
            let $table = self.$refs.table;
            self.tableData.map((item) => {
                if (row.id != item.id) {
                    $table.toggleRowExpansion(item, false)
                } 
            })
            $table.toggleRowExpansion(row)
            self.$refs.table.clearSelection();
        },
        // 多选反选高亮
        rowClass({ row, rowIndex }) {
			if (this.selectRow.includes(row.id)) {
			    return { "background-color": "rgba(201,233,255,1)" };
			}
		},
		handleSelectionChange(val) {
			var list = [];
			this.multipleSelection = val;
			this.multipleSelection.map(item => {
				list.push(item.id)
			})
            this.dataId = list;
		},
		handleclick(row){
			this.$refs.tableData.toggleRowSelection(row)
        },    
        // 打印
        dayin () {
            this.$print(this.$refs.multipleTable) // 使用
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
