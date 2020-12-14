<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch')
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    }
})
</script>

<style lang="stylus">
/* 每个页面公共css */
@import './common/uni.fix'
@import './common/style'
@import './common/icon'
</style>
