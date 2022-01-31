<template lang="pug">
header
  .headline
    .headline-background
    h1 HSDF Matrix <br>
      span 💞A future storytelling Tool
  .whatHow
    details
      summary What?
      p Test
    details
      summary How?
      p Test 2
</template>

<script>
export default {
  name: 'HeadlineWhatHow'
}
</script>

<style scoped lang="stylus">
header
  top 0
  padding 1rem
  width 100vw
  height 100vh
  position: fixed;
  color: black
  transform-origin left top
  transform: scaleX(0.8)
  pointer-events none
  h1
    font-family 'ArmandGrotesk'
    font-weight: bold
    margin 0
    span
      font-family 'Sneaky-Times'
      text-transform uppercase
      font-weight normal
  .headline
    position: relative
    contain paint
  .headline-background
    width: 15rem
    height: 4rem
    background-color: #fff15f;
    position: absolute
    top: 10%
    left: 1rem
    z-index: -1;
    filter: blur(20px)
.whatHow
  margin-top 2rem
  font-family 'Sneaky-Times'
  text-transform uppercase
  font-size 2em
  summary
    cursor: pointer
    width fit-content
    pointer-events auto
  p
    margin 0

</style>
