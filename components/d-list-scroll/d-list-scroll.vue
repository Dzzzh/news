<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y @scrolltolower="loadMore" @loadMore="loadMore">
			<view style="overflow: hidden;">
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: "",
			};
		},
		methods: {
			loadMore() {
				this.$emit("loadMore")
			}
		},
	}
</script>

<style lang="scss">
	.scroll {
		flex: 1;
		overflow: hidden;
		height: 100%;
		box-sizing: border-box;


		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;

			.uni-scroll-view {
				.uni-scroll-view {
					overflow: hidden;
				}
			}
		}
	}
</style>
