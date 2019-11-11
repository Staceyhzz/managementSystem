<template>
<div class="biaoqian">
    <div class="main-layout-con">
        <div class="tags-nav-wapper">
            <div class="tags-nav">
                <div class="btn-con left-btn">
                    <el-button type="text" @click="handleScroll(240)">
                        <i class="el-icon-arrow-left"></i>
                    </el-button>
                </div>
                <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
                    <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">    
                        <li ref="tagsPageOpened" class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                            <router-link :to="item.path" :data-route-item="item" class="tags-li-title">
                                {{item.title}}
                            </router-link>
                            <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
                        </li>
                    </div>
                </div>
            </div>
            <div style="margin:0 33px 0 0" class="btn-con right-btn">
                <el-button style="padding: 0 19px;height: 34px;" type="text" @click="handleScroll(-240)">
                    <i class="el-icon-arrow-right"></i>
                </el-button>
            </div>
            <div style="cursor:pointer;" class="btn-con right-btn">
                <el-dropdown @command="handleTags">
                    <i style="width:32px;height:34px;line-height:34px;text-align:center;" class="el-icon-close"></i>
                    <el-dropdown-menu size="small" slot="dropdown">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>           
</div>  
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                outerPadding: 4,
                tagsList: [],
                tagBodyLeft: 0
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagBodyLeft = 0;
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                this.tagBodyLeft = 0;
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            moveToView (tag) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth
                const bodyWidth = this.$refs.scrollBody.offsetWidth
                if (bodyWidth < outerWidth) {
                    this.tagBodyLeft = 0
                } else if (tag.offsetLeft < -this.tagBodyLeft) {
                    // 标签在可视区域左侧
                    this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
                } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
                    // 标签在可视区域
                    this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
                } else {
                    // 标签在可视区域右侧
                    this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
                }
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if(!isExist){
                    if(this.tagsList.length >= 800){
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                        name: route.matched[1].components.default.name
                    })
                }
                bus.$emit('tags', this.tagsList);
                this.$nextTick(() => {
                    this.refsTag = this.$refs.tagsPageOpened;
                    this.refsTag.forEach((item, index) => {
                        if(item.className != 'tags-li active') {
                        } else {
                            let tag = this.refsTag[index]
                            this.moveToView(tag)
                        }
                    })
                })
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            /*tags 滚动事件 */
            handlescroll (e) {
                var type = e.type
                let delta = 0
                if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                    delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
                }
                this.handleScroll(delta)
            },
            /*tags 滑动事件 */
            handleScroll (offset) {
                const outerWidth = this.$refs.scrollOuter.offsetWidth
                const bodyWidth = this.$refs.scrollBody.offsetWidth
                if (offset > 0) {
                    this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
                } else {
                    if (outerWidth < bodyWidth) {
                        if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                            this.tagBodyLeft = this.tagBodyLeft
                        } else {
                            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
                        }
                    } else {
                        this.tagBodyLeft = 0
                    }
                }
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
            // 监听关闭当前页面的标签页
            bus.$on('close_current_tags', () => {
                for (let i = 0, len = this.tagsList.length; i < len; i++) {
                    const item = this.tagsList[i];
                    if(item.path === this.$route.fullPath){
                        if(i < len - 1){
                            this.$router.push(this.tagsList[i+1].path);
                        }else if(i > 0){
                            this.$router.push(this.tagsList[i-1].path);
                        }else{
                            this.$router.push('/');
                        }
                        this.tagsList.splice(i, 1);
                        break;
                    }
                }
            })
        }
    }

</script>

<style>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #E7EAED;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    display: inline-block;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
}

.tags-li-title {
    display: inline;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #ccc;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
}
.main-layout-con{
    height: 100%;
    overflow: hidden;
}
.tags-nav-wapper{
    background: #E7EAED;
    height: 35px;
    padding: 0;
}
.tags-nav{
    height: 100%;
    width: 100%;
    position: relative;
    border-top: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
}
.btn-con{
    position: absolute;
    top: 0px;
    background: #fff;
    z-index: 10;            
}
button{
    padding: 6px 4px;
    line-height: 14px;
    text-align: center;
}
.left-btn{
    padding: 0 19px;
    height: 33px;
    left: 0px;
    border-right: 1px solid #F0F0F0;
}
.right-btn{
    right: 0px;
    border-left: 1px solid #F0F0F0;
}
.scroll-outer{
    position: absolute;
    left: 52px;
    right: 85px;
    top: 0;
    bottom: 0;
    box-shadow: 0px 0 3px 1px rgba(100,100,100,.1) inset;
}
.scroll-body{
    height: calc(100% - 1px);
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    transition: left .3s ease;
}
</style>