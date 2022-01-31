<template lang="pug">
a-entity(:rotation="rotation")
  a-box(position='100 0 0' depth="0.1" height="0.1" width="200" :color='leftAxisColor')
  //a-cone(position="10 0 0" rotation="0 0 -90" radius-bottom="0.4" radius-top="0" :color='barColor')
  //a-cone(position="-10 0 0" rotation="0 0 90" radius-bottom="0.4" radius-top="0" :color='barColor')
  a-entity(position="11.5 -0.5 0.5" rotation="-45 0 -90" v-bind:text="leftTextObject")
  a-entity(position="11.5 0.5 -0.5" rotation="135 0 -90" v-bind:text="leftTextObject")

  a-box(position='-100 0 0' depth="0.1" height="0.1" width="200" :color='rightAxisColor')

  a-entity(position="-11 -0.5 0.5" rotation="-45 0 -90" v-bind:text="rightTextObject")
  a-entity(position="-11 0.5 -0.5" rotation="135 0 -90" v-bind:text="rightTextObject")
  endless-axis(rotation='0 0 0' :startPosition="18" :barColor='barColor')
  endless-axis(rotation='0 180 0' :startPosition="18" :barColor='barColor')
  // a-text(position="2 2 2" rotation="0 0 0" v-bind:value="zAxis[0]")
</template>

<script>
import EndlessAxis from '@/components/EndlessAxis'

const mainTextObject = {
  width: 10,
  wrapCount: '20',
  color: 'black',
  anchor: 'left',
  baseline: 'top',
  align: 'left',
  font: '/oracle-msdf.json',
  // 'font-image': '/oracle-msdf.png',
  negate: 'false'
}

export default {
  name: 'VerticalAxis',
  components: { EndlessAxis },
  props: {
    leftTxt: String,
    rightTxt: String,
    barColor: String,
    rotation: {
      type: String,
      default: '0 90 90'
    },
    activeAxis: Object
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
    },
    leftAxisColor: function () {
      return this.activeAxis.z === this.leftTxt ? '#01f' : '#000'
    },
    rightAxisColor: function () {
      return this.activeAxis.z === this.rightTxt ? '#01f' : '#000'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
