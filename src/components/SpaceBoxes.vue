<template lang="pug">
a-entity
  a-box.spaceBox(position='-5 5 5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='5 5 5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='-5 -5 5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='-5 -5 -5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='5 -5 -5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='5 5 -5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='-5 5 -5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
  a-box.spaceBox(position='5 -5 5' depth="9.3" height="9.3" width="9.3" mixin="SpaceBox")
</template>

<script>

export default {
  name: 'SpaceBoxes',
  props: {
  },
  data () {
    return {}
  },
  mounted () {
    const boxes = document.querySelectorAll('.spaceBox')
    boxes.forEach(box => {
      box.addEventListener('hitstart', function () {
        console.log(box.attributes)
        box.setAttribute('material', {
          src: '#SpaceBoxTextur',
          opacity: 1
        })
        box.setAttribute('color', 'white')
      })
      box.addEventListener('hitend', function () {
        box.setAttribute('material', {
          src: false,
          opacity: 0
        })
        box.setAttribute('color', '#000')
      })
    })
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
