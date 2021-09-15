<script>
	export default {
		onLaunch: function() {
			console.log('App Launch',process.env)
			if (process.env.NODE_ENV === 'development') {
				console.log('开发环境')
			} else {
				console.log('生产环境')
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

</style>
