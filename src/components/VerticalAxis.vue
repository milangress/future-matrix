<template lang="pug">
  a-entity(:rotation="rotation")
    a-box(position='0 0 0' depth="0.1" height="0.1" width="20" color='#9e4cd9')
    a-entity(position="11 0 0" rotation="-45 0 -90" v-bind:text="leftTextObject")
    a-entity(position="-11 0 0" rotation="-45 0 -90" v-bind:text="rightTextObject")
    a-entity(position="11 0 0" rotation="135 0 -90" v-bind:text="leftTextObject")
    a-entity(position="-11 0 0" rotation="135 0 -90" v-bind:text="rightTextObject")
</template>

<script>

const mainTextObject = {
  width: 10,
  wrapCount: '20',
  color: 'black',
  anchor: 'center',
  align: 'center'
}

export default {
  name: 'HorizontalAxis',
  props: {
    leftTxt: String,
    rightTxt: String,
    rotation: {
      type: String,
      default: '0 90 90'
    }
  },
  data () {
    return {
      leftTextObject: {
        ...mainTextObject,
        value: this.leftTxt
      },
      rightTextObject: {
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
