<template lang="pug">
  a-entity(:rotation="rotation")
    a-box(position='5 5 5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='-5 5 5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='-5 -5 5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='-5 -5 -5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='5 -5 -5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='5 5 -5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='-5 5 -5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
    a-box(position='5 -5 5' depth="9.5" height="9.5" width="9.5" mixin="SpaceBox")
</template>

<script>

export default {
  name: 'SpaceBoxes',
  props: {
  },
  data () {
    return {}
  },
  methods: {
    boxHover: function (event) {
      console.log(event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
