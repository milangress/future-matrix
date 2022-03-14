<template lang="pug">
.questionBox-Wrapper
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
      questionArray: ['Loading…']
    }
  },
  watch: {
    questions: function () {
      this.questionArray = this.shuffleArray(this.questions)
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
  filter: var(--grain)
.newQuestion
  all: unset
  position relative
  cursor: pointer
  pointer-events auto
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
    animation: wiggle-me .2s cubic-bezier(.1,.6,.4,1) infinite

</style>
