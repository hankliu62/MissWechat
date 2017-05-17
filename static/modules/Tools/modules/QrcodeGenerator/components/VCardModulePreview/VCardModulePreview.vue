<template>
  <div class="vcard-preview-container">
    <div class="preview-header">
      <div class="preview-header-title">个人名片</div>
    </div>
    <vcard-module-item-preview
      mask-content="基本信息"
      extra-class="vcard-module-item-header"
      :is-actived="states.CONSTANTS.MODULE.Basic === selectedModule"
      :module-key="states.CONSTANTS.MODULE.Basic"
      @selected="onSelecteModuleItem">
      <div class="vcard-header" :style="coverStyle">
        <div class="vcard-avatar">
          <div class="vcard-avatar-bg" :style="{backgroundImage: `url('${vcardData.avatar}')`}"></div>
          <div class="vcard-avatar-alt" v-if="!vcardData.avatar">头像</div>
        </div>
        <div class="vcard-career">
          <div class="vcard-career-name" v-text="vcardData.name.value || '姓名'"></div>
          <div class="vcard-career-appointment" v-text="vcardData.appointment.value || '职位'"></div>
          <div class="vcard-career-company" v-text="vcardData.appointment.company || '公司'"></div>
        </div>
      </div>
    </vcard-module-item-preview>

    <vcard-module-item-preview
      mask-content="联系信息"
      :is-actived="states.CONSTANTS.MODULE.Contact === selectedModule"
      :module-key="states.CONSTANTS.MODULE.Contact"
      @selected="onSelecteModuleItem">
      <vcard-property property-key="固定电话" property-value="123213213213" extra-class="vcard-tel"></vcard-property>
      <vcard-property property-key="移动电话" property-value="213213213213213" extra-class="vcard-phone"></vcard-property>
      <vcard-property property-key="传真" property-value="213213213213213213213213213213213213213" extra-class="vcard-fax"></vcard-property>
      <vcard-property property-key="电子邮件" property-value="213213213213213213213213213213213213213213213213213213213213213@qq.com" extra-class="vcard-email"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview
      mask-content="社交账号"
      :is-actived="states.CONSTANTS.MODULE.Account === selectedModule"
      :module-key="states.CONSTANTS.MODULE.Account"
      @selected="onSelecteModuleItem">
      <vcard-property property-key="主页网址" property-value="123213213213" extra-class="vcard-website"></vcard-property>
      <vcard-property property-key="微博" property-value="213213213213213" extra-class="vcard-weibo"></vcard-property>
      <vcard-property property-key="QQ" property-value="213213213213213213213213213213213213213" extra-class="vcard-qq"></vcard-property>
      <vcard-property property-key="微信" property-value="miss_cc220" extra-class="vcard-wechat"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview
      mask-content="地址"
      :is-actived="states.CONSTANTS.MODULE.Address === selectedModule"
      :module-key="states.CONSTANTS.MODULE.Address"
      @selected="onSelecteModuleItem">
      <vcard-property property-key="地址" property-value="123213213213" extra-class="vcard-address"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview
      mask-content="个人说明"
      :is-actived="states.CONSTANTS.MODULE.Explanation === selectedModule"
      :module-key="states.CONSTANTS.MODULE.Explanation"
      @selected="onSelecteModuleItem">
      <vcard-property property-key="个人说明" property-value="123213213213" extra-class="vcard-explanation"></vcard-property>
    </vcard-module-item-preview>
  </div>
</template>

<script>
import VcardProperty from './VCardProperty'
import VcardModuleItemPreview from './VCardModuleItemPreview'
import { VCARD_MODULE, VCARD_COVER_IMAGE_TYPE, VCARD_COVER_PURE_TYPE } from '../../constants/constants'

export default {
  data () {
    this.states = {
      CONSTANTS: {
        DEFAULT_HEADER_BG: 'http://oiq00n80p.bkt.clouddn.com/bg1.jpg?imageView2/1/w/370/h/170',
        MODULE: VCARD_MODULE
      }
    }

    return {}
  },
  props: {
    vcardData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    selectedModule: {
      type: String,
      default: 'basic'
    }
  },
  methods: {
    onSelecteModuleItem (item) {
      this.$emit('onSelecteModule', item)
    }
  },
  computed: {
    coverStyle () {
      if (!this.vcardData || !this.vcardData.cover || !this.vcardData.cover.value) {
        return { backgroundImage: `url(${this.states.CONSTANTS.DEFAULT_HEADER_BG})` }
      }

      if (this.vcardData.cover.type === VCARD_COVER_PURE_TYPE) {
        return { backgroundColor: this.vcardData.cover.value }
      }

      if (this.vcardData.cover.type === VCARD_COVER_IMAGE_TYPE) {
        return { backgroundImage: `url(${this.vcardData.cover.value}?imageView2/1/w/370/h/170)` }
      }
    }
  },
  components: {
    VcardProperty,
    VcardModuleItemPreview
  }
}
</script>

<style lang="less">
@import './VCardModulePreview';
</style>
