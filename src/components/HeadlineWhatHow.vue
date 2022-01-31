<template lang="pug">
header
  .headline
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
  width 100%
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
