<template>
	<view>
		<view class="like">
			<u-icon :name="likeFlag?'star-fill':'star'" color="#f07373" size="34" @click="onLike"></u-icon>
			<u-toast ref="uToast"/>
		</view>
	</view>
</template>

<script>
	export default {
		name: "d-likes",
		data() {
			return {
				likeFlag: false
			};
		},
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		created() {
			this.likeFlag = this.item.is_like
		},
		watch: {
			item(newValue) {
				this.likeFlag = this.item.is_like
			}
		},
		methods: {
			onLike() {
				this.likeFlag = !this.likeFlag
				this.setUpdateCollectApi({
					articleId: this.item._id
				})
			},

			setUpdateCollectApi(p) {
				this.$api.updateCollect(p).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							title: this.likeFlag?'收藏成功！':"取消收藏！",
							type: 'success',
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.like {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
