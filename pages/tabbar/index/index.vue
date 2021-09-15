<template>
	<view class="home">
		<!-- 自定组件 -->
		<d-navbar></d-navbar>
		<d-tab :tabData="tabList" :tabIndex="tabIndex" @tab="onTab"></d-tab>
		<view class="home-list">
			<d-list :tab="tabList" :activeIndex="activeIndex" @change="onChange"></d-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0,
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			getLabel() {
				this.$api.getLabel().then(res => {
					let {
						data
					} = res;
					data.unshift({
						'name': '全部'
					})
					console.log("data: ", data);
					this.tabList = data
				})
			},
			onTab(index) {
				this.activeIndex = index
			},
			onChange(index) {
				this.tabIndex =index;
				this.activeIndex = index;
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
			height: 100%;
		}
	}
</style>
