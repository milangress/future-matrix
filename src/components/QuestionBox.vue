<template lang="pug">
.questionBox-Wrapper(:style="wrapperStyle")
  button.newQuestion(@click="newQuestion") New Question
  .question {{questionArray[0]}}

</template>

<script>
export default {
  name: 'QuestionBox',
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      questionArray: ['']
    }
  },
  watch: {
    questions: function () {
      // this.questionArray = this.shuffleArray(this.questions)
    }
  },
  computed: {
    wrapperStyle () {
      return {
        width: this.questionArray.length <= 1 ? 'auto' : '40ch'
      }
    }
  },
  methods: {
    newQuestion: function () {
      const newQuestion = this.shuffleArray(this.questions)
      console.log('newQuestion')
      this.questionArray = newQuestion
    },
    shuffleArray: function (arrParam) {
      const arr = arrParam.slice()
      let length = arr.length
      let temp
      let i
      while (length) {
        i = Math.floor(Math.random() * length--)
        temp = arr[length]
        arr[length] = arr[i]
        arr[i] = temp
      }
      return arr
    }
  }
}
</script>

<style scoped lang="stylus">
.questionBox-Wrapper
  background black
  width 40ch
  position fixed
  left 1rem
  bottom 1rem
  padding 1rem
  border-radius 2rem
  font-size 1.2rem
  pointer-events auto
  outline: 1px solid white
.newQuestion
  all: unset
  text-transform uppercase
  position relative
  cursor: pointer
  pointer-events auto
  user-select: none
  background white
  color black
  padding-block  0.2em
  padding-inline 1em
  border-radius 1em
  margin-block-end 3em
  &:after
    content ''
    position absolute
    inset 0
    background white
    border-radius 1em
    transform translateY(90%)
  &:hover
    filter: var(--grain-2)
    animation: wiggle-me .2s cubic-bezier(.1,.6,.4,1) infinite
  &:focus-visible
    outline 5px solid blue

</style>
