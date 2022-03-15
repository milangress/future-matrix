<template lang="pug">
.sliderWrapper
  span(v-bind:class="leftTextActive") {{leftText}}
  input(type="range" min="-9" max="9"
       v-model="sliderValue"
       @input="update")
  span(v-bind:class="rightTextActive") {{rightText}}
</template>

<script>
export default {
  name: 'CustomSlider',
  emits: ['update:value'],
  props: {
    leftText: {
      type: String,
      default: 'left'
    },
    rightText: {
      type: String,
      default: 'right'
    },
    value: {
      required: true,
      default: ''
    }
  },
  data () {
    return {
      sliderValue: null
    }
  },
  methods: {
    changeValues () {
      this.sliderValue = this.value
      this.update()
    },
    update () {
      this.$emit('update:value', parseInt(this.sliderValue))
    }
  },
  computed: {
    leftTextActive: function () {
      return {
        textIsActive: this.sliderValue < 0
      }
    },
    rightTextActive: function () {
      return {
        textIsActive: this.sliderValue > 0
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.changeValues()
      }
    }
  }
}

</script>

<style scoped lang="sass">
.sliderWrapper
  display: flex
  align-items: center
  justify-content: center
  padding-block-end: 0.2em

.sliderWrapper
  input
    width: 40%

  span
    width: 25%
    font-size: 0.8em
    &:first-of-type
      text-align: right
      padding-right: 1rem

    &:nth-of-type(2)
      padding-left: 1rem

@media (max-width: 500px)
  .sliderWrapper input
    width: 30%
  .sliderWrapper span
    font-size: 0.6em

.textIsActive
  color: rgb(0, 35, 255)
  // text-shadow: 1px 1px 2px rgb(0, 0, 0), 0px 0px 15px rgb(255, 255, 255)

// Styling Cross-Browser Compatible Range Inputs with Sass
// Github: https://github.com/darlanrod/input-range-sass
// Author: Darlan Rod https://github.com/darlanrod
// Version 1.5.2
// MIT License

$track-color: rgba(0, 0, 0, 1) !default
$thumb-color: #0023ff !default

$thumb-radius: 50% !default
$thumb-height: 22px !default
$thumb-width: 25px !default
$thumb-shadow-size: 0px !default
$thumb-shadow-blur: 4px !default
$thumb-shadow-color: rgb(241, 244, 245) !default
$thumb-border-width: 0px !default
$thumb-border-color: rgba(0, 0, 0, 0.99) !default

$track-width: 100% !default
$track-height: 2px !default
$track-shadow-size: 0px !default
$track-shadow-blur: 0px !default
$track-shadow-color: rgba(0, 0, 0, .2) !default
$track-border-width: 0px !default
$track-border-color: #cfd8dc !default

$track-radius: 0px !default
$contrast: 5% !default

$ie-bottom-track-color: darken($track-color, $contrast) !default

@mixin shadow($shadow-size, $shadow-blur, $shadow-color)
  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%)

@mixin track
  cursor: default
  height: $track-height
  transition: all .2s ease
  width: $track-width

@mixin thumb
  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color)
  background: $thumb-color
  border: $thumb-border-width solid $thumb-border-color
  border-radius: $thumb-radius
  box-sizing: border-box
  cursor: grab
  height: $thumb-height
  width: $thumb-width

[type='range']
  -webkit-appearance: none
  background: transparent
  margin: $thumb-height / 2 0
  // width: $track-width

  &::-moz-focus-outer
    border: 0

  &:focus
    outline: 0

    &::-webkit-slider-runnable-track
      background: lighten($track-color, $contrast)

    &::-ms-fill-lower
      background: $track-color

    &::-ms-fill-upper
      background: lighten($track-color, $contrast)

  &::-webkit-slider-runnable-track
    @include track
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color)
    background: $track-color
    border: $track-border-width solid $track-border-color
    border-radius: $track-radius

  &::-webkit-slider-thumb
    @include thumb
    -webkit-appearance: none
    margin-top: ((-$track-border-width * 2 + $track-height) / 2 - $thumb-height / 2)

  &::-moz-range-track
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color)
    @include track
    background: $track-color
    border: $track-border-width solid $track-border-color
    border-radius: $track-radius
    height: $track-height / 2

  &::-moz-range-thumb
    @include thumb

  &::-ms-track
    @include track
    background: transparent
    border-color: transparent
    border-width: ($thumb-height / 2) 0
    color: transparent

  &::-ms-fill-lower
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color)
    background: $ie-bottom-track-color
    border: $track-border-width solid $track-border-color
    border-radius: ($track-radius * 2)

  &::-ms-fill-upper
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color)
    background: $track-color
    border: $track-border-width solid $track-border-color
    border-radius: ($track-radius * 2)

  &::-ms-thumb
    @include thumb
    margin-top: $track-height / 4

  &:disabled
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper
      cursor: not-allowed

</style>
