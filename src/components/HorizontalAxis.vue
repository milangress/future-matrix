<template lang="pug">
  a-entity(:rotation="rotation")
    a-box(position='0 0 0' depth="0.1" height="0.1" width="20" color='#9e4cd9')
    a-cone(position="10 0 0" rotation="0 0 -90" radius-bottom="0.4" radius-top="0" color='#9e4cd9')
    a-cone(position="-10 0 0" rotation="0 0 90" radius-bottom="0.4" radius-top="0" color='#9e4cd9')
    a-entity(position="11 0 0" v-bind:text="leftTextObject")
    a-entity(position="-11 0 0" v-bind:text="rightTextObject")
    a-entity(position="11 0 0" rotation='0 180 0' v-bind:text="leftBackTextObject")
    a-entity(position="-11 0 0" rotation='0 180 0' v-bind:text="rightBackTextObject")
</template>

<script>

const mainTextObject = {
  width: 10,
  wrapCount: '20',
  color: 'black'
}

export default {
  name: 'HorizontalAxis',
  props: {
    leftTxt: String,
    rightTxt: String,
    rotation: String
  },
  data () {
    return {
      leftTextObject: {
        ...mainTextObject,
        anchor: 'left',
        align: 'left',
        value: this.leftTxt
      },
      leftBackTextObject: {
        ...mainTextObject,
        anchor: 'right',
        align: 'right',
        value: this.leftTxt
      },
      rightTextObject: {
        ...mainTextObject,
        anchor: 'right',
        align: 'right',
        value: this.rightTxt
      },
      rightBackTextObject: {
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
