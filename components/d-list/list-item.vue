<template>
	<d-list-scroll class="list-scroll" @loadMore="loadMore">
		<d-list-card v-for="item in list" :key="item._id" :item="item"></d-list-card>
		<u-loadmore v-if="list.length > 4 || list.length ==0" icon-type="flower" :status="load.loadType||'loading'" />
	</d-list-scroll>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			load:{
				type:Object,
				default:()=>{
					return {
						loadType:'loading'
					}
				}
			}
		},
		methods: {
			loadMore() {
				this.$emit("loadMore")
			}
		},
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
