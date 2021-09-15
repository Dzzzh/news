<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏高度 -->
			<view :style="{height: statusBarHeight + 'px'}"></view>
			<!-- 导航栏内容 -->
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:navbarHeight + 'rpx',width:windowWidth + 'rpx'}" @click="onToSearch">
				<view class="navbar-content_search-icons" @click="onSearcBack" v-if="isSearch">
						<u-icon name="arrow-left" size="40" color="#fff"></u-icon>
				</view>
				<view class="navbar-serach" v-if="!isSearch">
					<view class="navbar-serach_icon">
						<u-icon name="search"></u-icon>
					</view>
					<view class="navbar-serach_text">
						学习、面试
					</view>
				</view>
				<view v-else class="navbar-serach">
					<input class="navbar-serach_text" placeholder="请输入内容" v-model="val" :focus="isSearch" @input="inputChange"></input>
				</view>
				
			</view>

		</view>
		<!-- navbar占位 -->
		<view :style="{height: 48 + statusBarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			inputVal:{
				type:[String,Number],
				default:''
			},
			isSearch: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				statusBarHeight: '',//状态栏高度
				navbarHeight:"90",//导航栏高度
				windowWidth:"750",//导航栏宽度
				val:""
			};
		},
		watch: {
			inputVal(newValue) {
				this.val = newValue
			}
		},
		created() {
			//获取设备信息
			let info = uni.getSystemInfoSync()
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			console.log("状态栏高度:",this.statusBarHeight);
			// #ifndef H5||APP-PLUS
			//获取胶囊位置
			const mentBtn = uni.getMenuButtonBoundingClientRect()
			//(胶囊底部高度 - 状态栏高度) + (胶囊顶部高度 - 状态栏高度) = 导航栏高度
			this.navbarHeight = [(mentBtn.bottom - info.statusBarHeight) + (mentBtn.top - info.statusBarHeight)] * 2
			this.windowWidth = mentBtn.left * 2
			// #endif
			
		},
		methods: {
			// 点击navbar 跳转到搜索页
			onToSearch(){
				uni.navigateTo({
					url:"../../homeSearch/homeSearch"
				})
			},
			inputChange(e){
				let {value} = e.detail
				this.$emit("input",value)
			},
			//点击返回 返回上一页
			onSearcBack(){
				uni.switchTab({
					url:"/pages/tabbar/index/index"
				})
			}
		},
	}
</script>

<style lang="scss">
	.navbar {
		.navbar-fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100vw;
			background-color: $navbar-bc;

			.navbar-content {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;

				.navbar-serach {
					display: flex;
					width: 100%;
					align-items: center;
					height: 30px;
					background-color: #fff;
					border-radius: 30px;
					padding: 0 10px;

					.navbar-serach_icon {
						margin-right: 10px;
					}
					
					.navbar-serach_text{
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				
				&.search{
					padding-left: 0;
					
					.navbar-serach {
						border-radius: 5px;
					}
					
					.navbar-content_search-icons{
						padding: 0 10px;
					}
				}
			}
		}
	}
</style>
