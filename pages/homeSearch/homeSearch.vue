<template>
	<view class="home">
		<d-navbar :isSearch="true" @input="inputChange" :inputVal="searchVal"></d-navbar>
		<view class="home-list">
			<view v-if="isHistory" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="onClear">清空</text>
				</view>
				<view class="label-content" v-if="historyLists.length > 0">
					<view class="label-content_item" v-for="(item,index) in historyLists" :key="index"
						@click="onSearchItem(item.name)">
						{{item.name}}
					</view>
				</view>
				<u-empty class="no-data" text="没有搜索历史" mode="search" v-else></u-empty>
				<!-- <view class="no-data" v-else>
					没有搜索历史
				</view> -->
			</view>

			<d-list-scroll v-else class="list-scroll">
				<u-loadmore :status="'loading'" v-if="loading" />
				<view class="no-data" v-if="searchList.length == 0 && !loading">
					<u-empty text="没有搜索到相关数据" mode="search"></u-empty>
				</view>
				<view v-if="searchList.length > 0">
					<d-list-card @openDetail="openDetail" v-for="item in searchList" :key="item._id" :item="item">
					</d-list-card>
				</view>

			</d-list-scroll>
		</view>
		<u-modal v-model="show" :content="'是否清空历史搜索？'" :title="'提示'" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				searchVal: "",
				show: false,
				isHistory: true,
				searchList: [],
				loading: false
			};
		},
		computed: {
			...mapState(["historyLists"])
		},
		methods: {
			inputChange(value) {
				this.searchVal = value
				this.loading = true
				console.log(value);
				if (!value) {
					this.mark = false
					this.searchList = []
					this.isHistory = true
					clearTimeout(this.timer)
					return
				}
				if (!this.mark) {
					this.isHistory = false;
					this.mark = true;
					this.timer = setTimeout(() => {

						this.getSearch(value)
						this.mark = false
					}, 1000)
				}
			},
			// 清空按钮
			onClear() {
				this.show = true;
			},
			// 获取搜索数据 Api
			getSearch(value) {
				this.$api.getSearch({
					value
				}).then(res => {
					const {
						data
					} = res;
					this.searchList = data
					this.loading = false
					console.log(res);
				}).catch(() => {
					this.loading = false
				})
			},
			openDetail() {
				this.$store.dispatch("set_history", {
					name: this.searchVal
				})
			},
			onSearchItem(e) {
				this.loading = true
				this.searchVal = e
				this.isHistory = false
				this.getSearch(e)
			},
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.home-list {


			.label-box {
				background-color: #fff;
				margin-bottom: 10px;

				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px solid #f5f5f5;

					.label-title {
						color: $navbar-bc;
					}

					.label-clear {
						color: #30b33a;
						font-weight: bold;
					}
				}


				.label-content {
					display: flex;
					flex-wrap: wrap;
					padding: 15px;
					padding-top: 0;

					.label-content_item {
						padding: 2px 10px;
						margin-top: 12px;
						margin-right: 10px;
						border-radius: 5px;
						border: 1px #666 solid;
						font-size: 14px;
						color: #666;
					}
				}


			}

			.no-data {
				height: 200px;
				line-height: 200px;
				text-align: center;
				font-size: 12px;
			}

		}
	}
</style>
