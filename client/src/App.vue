<template>
  <div id="app">
    <postComponent />
  </div>
</template>

<script>
import postComponent from './components/postComponent.vue'

export default {
  name: 'App',
  components: {
    postComponent
  }
}
</script>

<!-- Styling med hjälp av CSS -->
<style>
input {
  width: 60%;
  height: 20%;
  font-size: 1.1em;
}
h1 { 
font-family: 'Sacramento';
font-size: 4em; 
}
p{ 
  font-size: 1.2em;
}
body { 
  background-color: rgb(251, 155, 126); 
}

footer { 
  text-align: center; 
  width: 100%; 
  margin: auto; 
  padding-top: 3%; 
  padding-bottom: 3%; 
  font-weight: bold; 
}
textarea{ 
  width: 100%; 
  max-width: 480px; 
  height: 100px;
  font-size: 1.2em; 
  border: 1px solid black; 
}
button{
  color: white; 
  background-color: black;
  font-size: 1em; 
}

#app {
  font-family: Avenir, Arial, sans-serif;
  text-align: center;
  margin-top: 5%;
}
</style>
