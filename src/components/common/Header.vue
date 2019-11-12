<template>
    <div class="header">
        <div v-if="headerModal">
            <div :style="logo" class="logo">
                <img :style="leng" src="@/assets/img/project.png">
                后台管理
            </div>
            <div class="collapse-btn" @click="collapseChage">
                <i style="color:#909191;" class="el-icon-menu"></i>
            </div>
        </div>
        <Dropdown v-else trigger="click" style="margin-left: 20px">
            <a href="javascript:void(0)">
                <!-- <Icon @click="collapseChage2" style="margin-top:20px;" color='black' size='28' type="ios-list" /> -->
            </a>
            <div slot="list">
                <v-sidebar></v-sidebar>
            </div> 
        </Dropdown>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div v-if="headerModal" class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i style="color:#909191;" class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip effect="dark" :content="msg?`有${msg}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i style="color: rgb(144, 145, 145);" class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="msg"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator1"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from '../common/bus';
    import vSidebar from './Sidebar.vue';
    export default {
        data() {
            return {
                leng: {
                    'float': 'left',
                    'width': '50px',
                    'height': '33px',
                    'margin': '15px 13px 0 20px'
                },
                logo: {
                    'float': 'left',
                    'width':'219px',
                    'line-height': '69px',
                    'background': 'rgb(81, 90, 110)',
                    'border-bottom': '1px solid #242f42',
                },
                headerModal: true,
                collapse: false,
                fullscreen: false,
                name: '',
                msg: 2
            }
        },
        components:{
            vSidebar
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                if(this.collapse == true) {
                    this.logo.width = '219px';
                    this.leng.margin = '13px 13px 0 20px'
                    
                } else {
                    this.logo.width = '63px';
                    this.leng.margin = '13px 13px 0 9px'
                }
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            collapseChage2 (){
                bus.$emit('collapse', true);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1000){
                this.headerModal = false
            }
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style>
    .header .ivu-dropdown .ivu-select-dropdown {
        width: 1px;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
        color: black;
    }
    .header-right{
        float: right;
        padding-right: 8px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
        color: black;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator1{
        margin-left: 20px;
    }
    .user-avator1 img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: black;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .leng {
        float: left;
        width: 44px;
        height: 44px;
        margin-top: 13px;
        margin-right: 13px;
        margin-left: 15px
    }
    .logo {
        transition: width .3s ease-in-out;
        -moz-transition: width .3s ease-in-out;	/* Firefox 4 */
        -webkit-transition: width .3s ease-in-out;	/* Safari 和 Chrome */
        -o-transition: width .3s ease-in-out;	/* Opera */
    }
</style>
