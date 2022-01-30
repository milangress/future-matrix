<template lang="pug">
a-entity(:rotation="rotation")
  a-box(position='0 0 0' depth="0.1" height="0.1" width="200" :color='barColor')
  //a-cone(position="10 0 0" rotation="0 0 -90" radius-bottom="0.4" radius-top="0" :color='barColor')
  //a-cone(position="-10 0 0" rotation="0 0 90" radius-bottom="0.4" radius-top="0" :color='barColor')
  a-entity(position="11 -2 0" v-bind:text="leftTextObject")
  a-entity(position="-11 -2 0" v-bind:text="rightTextObject")
  a-entity(position="11 -2 0" rotation='0 180 0' v-bind:text="leftBackTextObject")
  a-entity(position="-11 -2 0" rotation='0 180 0' v-bind:text="rightBackTextObject")
  endless-axis(v-bind:startPosition="25" :barColor='barColor')
  endless-axis(rotation='0 180 0' v-bind:startPosition="25" :barColor='barColor')
</template>

<script>
import EndlessAxis from '@/components/EndlessAxis'

const mainTextObject = {
  width: 10,
  wrapCount: '20',
  color: 'black',
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
    rotation: String,
    barColor: String
  },
  data () {
    return {
    }
  },
  computed: {
    leftTextObject: function () {
      return {
        ...mainTextObject,
        anchor: 'left',
        align: 'left',
        value: this.leftTxt
      }
    },
    leftBackTextObject: function () {
      return {
        ...mainTextObject,
        anchor: 'right',
        align: 'right',
        value: this.leftTxt
      }
    },
    rightTextObject: function () {
      return {
        ...mainTextObject,
        anchor: 'right',
        align: 'right',
        value: this.rightTxt
      }
    },
    rightBackTextObject: function () {
      return {
        ...mainTextObject,
        anchor: 'left',
        align: 'left',
        value: this.rightTxt
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
