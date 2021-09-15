<template>
	<view @click="open">
		<!-- 基础卡片 -->
		<view class="card" v-if="item.mode === 'base'">
			<view class="card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="card-content">
				<view class="card-content_title"><text>{{item.title}}</text>
					<d-likes :item="item"></d-likes>
				</view>
				<view class="card-content_des">
					<view class="card-content__des-label">
						<view class="card-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="card-content__des-browse">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图卡片 -->
		<view class="card mode-column" v-if="item.mode === 'multiple'">
			<view class="card-content">
				<view class="card-content_title"><text>{{item.title}}</text>
					<d-likes :item="item"></d-likes>
				</view>
				<view class="card-img">
					<view v-for="(item,index) in item.cover" class="card-img_item" :key="index" v-if="index < 3">
						<image :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view class="card-content_des">
					<view class="card-content__des-label">
						<view class="card-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="card-content__des-browse">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 大图卡片 -->
		<view class="card mode-img" v-if="item.mode === 'large'">
			<view class="card-img">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="card-content">

				<view class="card-content_title"><text>{{item.title}}</text>
					<d-likes :item="item"></d-likes>
				</view>
				<view class="card-content_des">
					<view class="card-content__des-label">
						<view class="card-content__des-label-item">{{item.classify}}</view>
					</view>
					<view class="card-content__des-browse">
						{{item.browse_count}}浏览
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//基础(base) 多图(multiple) 大图(large) 
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {

			};
		},
		methods: {
			open() {
				this.$emit("openDetail")
			}
		},
	}
</script>

<style lang="scss" scoped>
	.card {
		display: flex;
		padding: 10px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;


		.card-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 5px;
			overflow: hidden;
			flex-shrink: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.card-content {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding-left: 20rpx;
			width: 100%;

			.card-content_title {
				font-size: 14px;
				color: #333333;
				font-weight: 400;
				line-height: 1.2;
				position: relative;

				text {
					margin-right: 40px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

			}

			.card-content_des {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;

				.card-content__des-label {
					display: flex;

					.card-content__des-label-item {
						padding: 0 5px;
						margin: 5px;
						border-radius: 15px;
						color: #F07373;
						border: 1px #F07373 solid;
					}

				}

				.card-content__des-browse {
					color: #999999;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {

			.card-content {
				width: 100%;
				padding-left: 0;

				.card-content_des {
					margin-top: 10px;
				}

				.card-img {
					width: 100%;
					height: 140rpx;
					margin-top: 10px;
					display: flex;

					.card-img_item {
						width: 100%;
						margin-left: 10px;
						border-radius: 5px;
						overflow: hidden;

						&:first-child {
							margin-left: 0;
						}

						image {
							width: 100%;
							height: 100%;
						}


					}

				}
			}
		}

		&.mode-img {
			flex-direction: column;

			.card-img {
				width: 100%;
				height: 200rpx;
			}

			.card-content {
				padding-left: 0;
				margin-top: 10px;

				.card-content_des {
					display: flex;
					align-items: center;
					margin-top: 10px;
				}
			}


		}
	}
</style>
