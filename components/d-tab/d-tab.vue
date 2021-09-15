<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x show-scrollbar>
			<view class="tab-scroll_box">
				<view class="tab-scroll_item" :class="{'ac':activeIndex==index}" v-for="(item,index) in tabData" :key="index" 
				 @tap="onTab_item(index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icon">
			<u-icon name="setting" size="52" color="#666"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabData: {
				type: Array,
				default: () => {
					return []
				}
			},
			tabIndex: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				activeIndex: 0
			};
		},
		methods: {
			onTab_item(index) {
				this.activeIndex = index;
				this.$emit("tab",index)
			}
		},
		watch: {
			tabIndex(val) {
				this.activeIndex = this.tabIndex;
			}
		},
	
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100vw;
		background-color: #fff;
		border-bottom: 1px #f5f5f5 solid;
		box-sizing: border-box;
		
		.tab-scroll {
			flex: 1;
			overflow: hidden;

			.tab-scroll_box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 90rpx;


				.tab-scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					color: #333333;
					font-size: 14px;
				}
				
				
				.ac {
					color: #F07373;
				}
			}
		}

		.tab-icon {
			position: relative;
			width: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			&::after {
				content: '';
				position: absolute;
				top: 24rpx;
				bottom: 24rpx;
				left: 0;
				width: 1px;
				background-color: #ddd;

			}
		}
	}
</style>
