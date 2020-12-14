export default {
    getRegion: {
        url: '',
        method: 'get',
        before: (requestData: any) => requestData,
        filter(responseData: { data: { [s: string]: PlainObject } | ArrayLike<PlainObject> }) {
            const items: PlainObject[] = Object.values(responseData.data)
            responseData.data = items.map((item: PlainObject) => {
                const province: PlainObject = {
                    name: item.local_name,
                    value: item.region_id,
                    children: []
                }
                if (item.children) {
                    province.children = item.children.map((city: { local_name: any; region_id: any }) => {
                        return {
                            name: city.local_name,
                            value: city.region_id
                        }
                    })
                }
                if (!province.children.length) {
                    province.children.push({
                        name: item.local_name,
                        value: item.region_id
                    })
                }
                return province
            })
            return responseData
        }
    }
}
