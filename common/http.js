export default function http(p) {
	const {
		name,
		data
	} = p;
	const obj ={
		userId:"6006a6eab31e8f0001b17d1b",
		...data
	}
	return new Promise((reslove, reject) => {
		uniCloud.callFunction({
			name,
			data:obj
		}).then(res => {
			if (res.result.code === 200) {
				reslove(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})

}
