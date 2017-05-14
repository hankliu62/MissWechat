<template>
  <div class="vcard-preview-container">
    <div class="preview-header">
      <div class="preview-header-title">个人名片</div>
    </div>
    <vcard-module-item-preview mask-content="基本信息" :is-actived="states.CONSTANTS.MODULE.Basic === selectedModule" extra-class="vcard-module-item-header">
      <div class="vcard-header" :style="{backgroundImage: `url('${vcard.headerBg || states.CONSTANTS.DEFAULT_HEADER_BG}')`}">
        <div class="vcard-avatar">
          <div class="vcard-avatar-bg" :style="{backgroundImage: `url('${vcard.avatar}')`}"></div>
          <div class="vcard-avatar-alt" v-if="!vcard.avatar">头像</div>
        </div>
        <div class="vcard-career">
          <div class="vcard-career-name" v-text="vcard.name || '姓名'"></div>
          <div class="vcard-career-appointment" v-text="vcard.name || '职位'"></div>
          <div class="vcard-career-company" v-text="vcard.name || '公司'"></div>
        </div>
      </div>
    </vcard-module-item-preview>

    <vcard-module-item-preview mask-content="联系信息" :is-actived="states.CONSTANTS.MODULE.Contact === selectedModule">
      <vcard-property property-key="固定电话" property-value="123213213213" extra-class="vcard-tel"></vcard-property>
      <vcard-property property-key="移动电话" property-value="213213213213213" extra-class="vcard-phone"></vcard-property>
      <vcard-property property-key="传真" property-value="213213213213213213213213213213213213213" extra-class="vcard-fax"></vcard-property>
      <vcard-property property-key="电子邮件" property-value="213213213213213213213213213213213213213213213213213213213213213@qq.com" extra-class="vcard-email"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview mask-content="社交账号" :is-actived="states.CONSTANTS.MODULE.Account === selectedModule">
      <vcard-property property-key="主页网址" property-value="123213213213" extra-class="vcard-website"></vcard-property>
      <vcard-property property-key="微博" property-value="213213213213213" extra-class="vcard-weibo"></vcard-property>
      <vcard-property property-key="QQ" property-value="213213213213213213213213213213213213213" extra-class="vcard-qq"></vcard-property>
      <vcard-property property-key="微信" property-value="miss_cc220" extra-class="vcard-wechat"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview mask-content="地址" :is-actived="states.CONSTANTS.MODULE.Address === selectedModule">
      <vcard-property property-key="地址" property-value="123213213213" extra-class="vcard-address"></vcard-property>
    </vcard-module-item-preview>

    <vcard-module-item-preview mask-content="个人说明" :is-actived="states.CONSTANTS.MODULE.Explanation === selectedModule">
      <vcard-property property-key="个人说明" property-value="123213213213" extra-class="vcard-explanation"></vcard-property>
    </vcard-module-item-preview>
  </div>
</template>

<script>
import VcardProperty from './VCardProperty'
import VcardModuleItemPreview from './VCardModuleItemPreview'
import { VCARD_MODULE } from '../../constants/constants'

export default {
  data () {
    this.states = {
      CONSTANTS: {
        DEFAULT_HEADER_BG: 'http://oiq00n80p.bkt.clouddn.com/vcardbg7.jpg',
        MODULE: VCARD_MODULE
      }
    }

    return {}
  },
  props: {
    vcard: {
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
  components: {
    VcardProperty,
    VcardModuleItemPreview
  }
}
</script>

<style lang="less">
@import './VCardModulePreview';
</style>
