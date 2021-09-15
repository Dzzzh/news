<template>
	<view class="wrap">
		<view class="box" v-for="item in data"></view>
		<view class="box" style="border: #007AFF;" v-for="item in 1" v-if="data.length % 4 == 3"></view>
		<view class="box" style="border: #007AFF;" v-for="item in 2" v-if="data.length % 4 == 2"></view>
		<view class="box" style="border: #007AFF;" v-for="item in 3" v-if="data.length % 4 == 1"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:[
					"1",
					"1",
					"1",
					"1",
					"1",
					"1",
					"1",
					"1",
				]
			};
		}
	}
</script>

<style lang="scss">
	.wrap {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		padding-top: 200px;

		.box {
			width: 80px;
			height: 60px;
			border: 1px solid red;
			margin-bottom: 10px;
		}
	}
</style>
