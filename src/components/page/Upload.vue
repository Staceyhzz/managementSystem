<template>
    <div>
        <div style="position: absolute;top:-53px;left:60px;" class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                Element UI自带上传组件。
                访问地址：<a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
            </div>
            <!-- uploadImg上传成功时的方法，后台接口返回的数据在这里 -->
            <!-- handleRemove删除不用多说了把 -->
            <!-- limit:限制上传张数 -->
            <!-- beforeAvatarUpload验证图片上传的各种 -->
            <el-row :gutter="20">
                <el-col :span="12">
                    <h4 style="margin-bottom:20px;">基本上传（限制只能上传图片例子）</h4>
                    <el-upload
                        style="width:500px;"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="uploadImg"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span style="font-size:12px;color:#666666;margin:0 0 0 20px;" slot="tip" class="el-upload__tip">注：只支持jpg、jpeg、png格式的文件，大小不超过5M</span>
                    </el-upload>
                </el-col>
                <el-col :span="12">
                    <h4 style="margin-bottom:20px;">高级一点的例子：限制图片的宽高</h4>
                    <el-upload
                        style="width:500px;"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="uploadImg"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :beforeUpload="beforeAvatarUpload2"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span style="font-size:12px;color:#666666;margin:0 0 0 20px;" slot="tip" class="el-upload__tip">注：只支持jpg、jpeg、png格式的文件，大小不超过5M</span>
                    </el-upload>
                </el-col>
            </el-row>
            <div class="content-title">支持裁剪</div>
            <div class="plugins-tips">
                vue-cropperjs：一个封装了 cropperjs 的 Vue 组件。
                访问地址：<a href="https://github.com/Agontuk/vue-cropperjs" target="_blank">vue-cropperjs</a>
            </div>
            <div class="crop-demo">
                <img :src="cropImg" class="pre-img">
                <div class="crop-demo-btn">选择图片
                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                </div>
            </div>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    export default {
        name: 'upload',
        data: function(){
            return {
                // 上传图片headers
                headers:{
                    'token': 'XXX'
                },
                // 图片向后台传参
                imgData: {
                    width: '10',
                    height: '10',
                    isCheckSize: false
                },
                fileList: [],
                defaultSrc: require('../../assets/img/img.jpg'),
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
            }
        },
        components: {
            VueCropper
        },
        methods:{
            // 上传图片逻辑
            // 删除
            handleRemove (file, fileList) {
                this.fileList = fileList;
            },
			uploadImg (res) {
                this.fileList = res.data.url;
			},
            beforeAvatarUpload (file) {
                var self = this;        
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                
                const extension = testmsg === 'jpg' ||  testmsg === 'jpeg' ||  testmsg === 'png';
                const isLt50M = file.size / 1024 / 1024 < 5
                if(!extension ) {
                    self.$message({
                        message: '上传文件只能是jpg、jpeg、png格式！',
                        type: 'warning'
                    });
                    return false;//必须加上return false; 才能阻止
                }
                if(!isLt50M) {
                    self.$message({
                        message: '上传文件大小不能超过',
                        type: 'warning'
                    });
                    return false;
                }
                return extension ||  isLt50M
            },
            beforeAvatarUpload2 (file) {
				var self = this;        
				var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                
				const extension = testmsg === 'jpg' ||  testmsg === 'jpeg' ||  testmsg === 'png';
				const isLt50M = file.size / 1024 / 1024 < 5
				if(!extension ) {
                    self.$message({
                        message: '上传文件只能是jpg、jpeg、png格式！',
                        type: 'warning'
                    });
					return false;//必须加上return false; 才能阻止
				}
				if(!isLt50M) {
                    self.$message({
                        message: '上传文件大小不能超过',
                        type: 'warning'
                    });
					return false;
                }
                // 图片文件大小限制，限制宽高分别为1280px和800px
                let _this = this;
                let imgWidth="";
                let imgHight="";
                const isSize = new Promise(function (resolve, reject) {
                let width = 64;
                let height = 64;
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function () {
                    imgWidth = img.width;
                    imgHight = img.height;
                    let valid = img.width == width && img.height == height;
                    valid ? resolve() : reject();
                }
                img.src = _URL.createObjectURL(file);
                }).then(() => {
                    return file;
                }, () => {
                    _this.$message.warning({message: '上传文件的图片大小不合符标准,宽需要为64px，高需要为64px。当前上传图片的宽高分别为：'+imgWidth+'px和'+imgHight+'px', btn: false})
                    return Promise.reject();
                });
                return isSize;
				return extension ||  isLt50M
			},
            setImage(e){
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError(){
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }
        },
        created(){
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .content-title{
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    .pre-img{   
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>