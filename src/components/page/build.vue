<template>
    <div>
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-receiving"></i> 打包相关
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <p>项目肯定是分开发环境，生产环境，测试环境等等，这边说下怎么配置直接使用命令行操作，省的每次都要手动换链接！</p>
            <p>vue3.0版本支持了.env文件
                在最外层先创建.env.alpha和.env.build
            </p>
            <img src="@/assets/img/work.png">
            <p>
                分别的内容是这样的
            </p>
            <img style="margin-right:20px;" src="@/assets/img/main1.png">
            <img src="@/assets/img/main2.png">
            <p>然后在你放js的文件里面创建一个叫constans.js的文件 内容如下（图里都有注释标注）</p>
            <img src="@/assets/img/comm.png">
            <p>最后我们在package.json文件里面配置下</p>
            <img src="@/assets/img/pack.png">
            <p>配置完后就可以到控制台敲命令行了如：npm run alpha(要什么环境就敲配置的对应名字)</p>
            <p>成功示例：</p>
            <img src="@/assets/img/ent1.png">
            <img src="@/assets/img/ent2.png">
            <p>成功后就看到你文件里面多了一个dist文件，就是你的打包文件了，static里面就是打包后的js,css,img</p>
            <img src="@/assets/img/ent3.png">
        </div>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {

        };
    },
    created() {

    },

    methods: {

    }
};
</script>

<style scoped>

</style>
