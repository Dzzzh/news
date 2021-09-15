<template>
	<swiper class="swiper" :current="activeIndex" @change="onChange">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]" @loadMore="loadMore" :load="load[index]"> </list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		data() {
			return {
				list: [],
				listCatchData: {},
				load: {}
			};
		},
		props: {
			tab: {
				type: Array,
				default: () => {
					return []
				}
			},

			activeIndex: {
				type: Number,
				default: 0
			}
		},
		// onLoad 页面 created 组件
		created() {
			// this.getList(0)
		},
		watch: {
			tab(val) {
				if (val === 0) return;
				this.getList(this.activeIndex)
			}
		},
		methods: {
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loadType: 'loading'
					}
				}
				let name = this.tab[current].name
				this.$api.getList({
					name,
					page: this.load[current].page,
					size: 5
				}).then(res => {
					const {
						data
					} = res;
					if (data.length == 0) {
						let oldLoad = {}
						oldLoad.loadType = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面 this.$forceUpdate
						this.$forceUpdate()
						return
					}

					// 数据懒加载
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData, current, oldList)
				})

			},
			onChange(e) {
				let {
					current
				} = e.detail
				this.$emit("change", current)
				// 当数据不存在 或者 长度等于0的情况下才会请求数据
				if (!this.listCatchData[current] || this.listCatchData.length == 0) {
					this.getList(current)
				}
			},
			// 上拉加载更多
			loadMore() {
				if(this.load[this.activeIndex].loadType == "noMore") return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
		},
	}
</script>

<style lang="scss">
	.swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}

		}

	}
</style>
