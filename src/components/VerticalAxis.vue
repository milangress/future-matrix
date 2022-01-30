<template lang="pug">
a-entity(:rotation="rotation")
  a-box(position='0 0 0' depth="0.1" height="0.1" width="200" :color='barColor')
  //a-cone(position="10 0 0" rotation="0 0 -90" radius-bottom="0.4" radius-top="0" :color='barColor')
  //a-cone(position="-10 0 0" rotation="0 0 90" radius-bottom="0.4" radius-top="0" :color='barColor')
  a-entity(position="11.5 2 0" rotation="-45 0 0" v-bind:text="leftTextObject")
  a-entity(position="-11 2 0" rotation="-45 0 0" v-bind:text="rightTextObject")
  a-entity(position="11.5 2 0" rotation="135 0 0" v-bind:text="leftTextObject")
  a-entity(position="-11 2 0" rotation="135 0 0" v-bind:text="rightTextObject")
  endless-axis(rotation='0 0 0' :startPosition="18" :barColor='barColor')
  endless-axis(rotation='0 180 0' :startPosition="18" :barColor='barColor')
  // a-text(position="2 2 2" rotation="0 0 0" v-bind:value="zAxis[0]")
</template>

<script>
import EndlessAxis from '@/components/EndlessAxis'

const mainTextObject = {
  width: 5,
  wrapCount: '10',
  color: 'black',
  anchor: 'center',
  align: 'left',
  font: '/oracle-msdf.json',
  // 'font-image': '/oracle-msdf.png',
  negate: 'false'
}

export default {
  name: 'HorizontalAxis',
  components: { EndlessAxis },
  props: {
    leftTxt: String,
    rightTxt: String,
    barColor: String,
    rotation: {
      type: String,
      default: '0 90 90'
    }
  },
  data () {
    return {}
  },
  computed: {
    leftTextObject: function () {
      return {
        ...mainTextObject,
        value: this.leftTxt
      }
    },
    rightTextObject: function () {
      return {
        ...mainTextObject,
        value: this.rightTxt
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
