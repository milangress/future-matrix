<template>
  <div id="app">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="stylus">
@font-face
  font-family: 'oracle';
  src: url('/fonts/oraclegm-regularmono-webfont-webfont.woff2') format('woff2'),
    url('/fonts/oraclegm-regularmono-webfont-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;

@font-face
  font-family: "ArmandGrotesk";
  src: local("ArmandGrotesk"),
    url('/fonts/ArmandGroteskTRIAL-Bold.otf') format("opentype");
  font-weight: bold

@font-face
  font-family: "ArmandGrotesk";
  src: local("ArmandGrotesk"),
    url('/fonts/ArmandGroteskTRIAL-SemiLight.otf') format("opentype");
  font-weight: normal;
  font-stretch: 87.5% 112.5%;

@font-face
  font-family: "Sneaky-Times";
  src: url('/fonts/Sneaky-Times.woff2') format('woff2'),
    url('/fonts/Sneaky-Times.woff') format('woff');
  font-weight: normal

body
  margin 0
#app
  font-family oracle, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #ffffff
</style>
