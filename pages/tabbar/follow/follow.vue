<template>
		<view class="page-body">
			<view class="uni-padding-wrap uni-common-mt">
				<view class="uni-title uni-common-mt">
					示例 1
					<text>\nmovable-view 区域小于 movable-area</text>
				</view>
				<movable-area style="width: 10vw;height: 50px;background-color: #909399;">
					<movable-view style="width: 100vw;height: 500px;background-color: red;" :x="x" :y="y" direction="all" @change="onChange">text</movable-view>
				</movable-area>
				<view @tap="tap" class="uni-link uni-center uni-common-mt">
					点击这里移动至 (30px, 30px)
				</view>
				<view class="uni-title uni-common-mt">
					示例 2
					<text>\nmovable-view区域大于movable-area</text>
				</view>
				<movable-area>
					<movable-view class="max" direction="all">text</movable-view>
				</movable-area>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				}
			}
		},
		methods: {
			tap: function(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},
			onChange: function(e) {
				
				console.log("old: ",this.old.x);
				console.log("x: ",this.x);
				
				
			}
		}
	}
</script>

<style lang="scss">

</style>
