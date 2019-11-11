<template>
	<div>
		<div v-show="visible" class="my-modal-mask">
			<div v-show="visible" class="my-modal" :class="{fullscreen: isFullscreen}">
			<header class="my-modal-header">
				<h4 style="font-size:14px;">{{title}}</h4>
				<div class="icon-wrap">
					<i @click="cancel" class="el-icon-close" style="cursor: pointer;"></i>
				</div>
			</header>
			<div ref="msgContainer" class="my-modal-content" :class="{'full-content': isFullscreen}">
				<slot></slot>
			</div>
			<!-- <div class="my-modal-footer">
			<Button type="text" @click.native="cancel">取消</Button>
			<Button type="primary" style="margin-left: 10px;" @click.native="ok" >确认</Button>
			</div>-->
			</div>
		</div>
	</div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
	name: "MyModal",
	props: {
		title: {
		type: String,
		default: ""
		},
		value: {
		type: Boolean,
		default: false
		}
	},
	data() {
		return {  
		isFullscreen: false,
		visible: false
		};
	},
	methods: {
		cancel() {
			this.visible = false;
			this.$emit("input", false);
			this.$emit("on-cancel");
		},
		ok() {
			this.visible = false;
			this.$emit("input", false);
			this.$emit("on-ok");
		}
	},
	watch: {
		value(val) {
		this.$nextTick(() => {
			this.$refs.msgContainer.scrollTop = 0;
		});
		this.visible = val;
		}
	},
	computed: {
	},
};
</script>
<style>
.my-modal {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 650px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 6px;
  z-index: 1001;
}
.my-modal-footer {
    border-top: 1px solid #e8eaec;
    padding: 12px 18px;
    text-align: right;
} 
.my-modal-content {
    padding: 25px 25px 150px 25px;
    font-size: 12px;
    line-height: 1.5;
    max-height: 550px;
    overflow: auto;
}
  .full-content {
    max-height: 100%;
  }
.my-modal-header {
    border-bottom: 1px solid #e8eaec;
    padding: 14px 16px;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.icon-wrap a {
    margin-left: 20px;
}
.my-modal-mask {
    position: fixed;
    top: 105px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
}
.toggle {
    left: 64px;
}
.fullscreen {
    width: 100%;
    height: 100%;
    top: 2px;
}
</style>


