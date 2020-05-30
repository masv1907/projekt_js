<template>
  <div class="container">
    <h1>För en roligare dag</h1>
    <p> Välkommen, här sparar vi roliga saker! Skriv jättegärna ett skämt eller en ordvits!  </p> <br/>
    <div class="create-post">
      <textarea id="create-post" v-model="text"></textarea> <br/><br/>
      <button class="send-joke" v-on:click="createPost">Skicka skämt</button> 
    </div><br/><br/>


    <hr>
    <!-- Skriv inlägget här -->
    <!-- Felmeddelande -->
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id">

<!-- Texten, det vill säga inlägget -->
      <p class="text"
        v-if ="!post.edit"
        v-on:click="editPost(post)"
        >
        {{post.text}}
      </p>

<!-- Redigera inlägget -->
      <input class="edittext"
        v-else
        v-model="post.text"
        >
        <!-- Publiceringsdatum av inlägget -->
        <p class="published">Publicerad: {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}`}}</p>
      
      <!-- Knapp för bekräfta uppdatering -->
      <button class="update"
        v-on:click="updatePost(post._id, post.text)">Uppdatera</button>
      
      <!-- Knapp för radering, kopplad till id -->
      <button class="delete"
v-on:click="deletePost(post._id)">Radera</button>
    </div>
  </div>
  </div>
</template>

<script>

import PostService from '../postService';

export default {
  name: 'postComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      isFinished:true,
    } 
  },

 // Skapade inlägg
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    // För att skapa inlägg
    async createPost() {
       /* Kontrollerar om fältet är ifyllt */
      if (this.text != ""){
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.error = "";
      this.text = "";
      // Ruta för att bekräfta att inlägget skickats
      alert("Tack för att du bidrar till en roligare dag :)"); 
    }else {
        this.error = "Du måste fylla i fältet!"; /* Felmeddelande om fältet ej är ifyllt */
      }},

    async deletePost(id) {
      /* Raderar utefter id */ 
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    },
    async updatePost(id, text) {
      /* Uppdaterar efter vilket id som klickats på */ 
      await PostService.updatePost(id, text);
      this.posts = await PostService.getPosts();
    },
    editPost(post) {
      /* För att redigera inlägget */ 
      post.edit = true;
      this.posts = [...this.posts];
    },
  },

}

</script>


<!-- Kod för design  -->
<style scoped>

hr {
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 1%; 
}
div.container{ 
  max-width: 800px; 
}

p.error { 
  border: 1px solid red; 
  padding: 10px; 
  margin-bottom: 15px; 
}

p.text { 
  font-size: 1.2em; 
  font-weight: bold; 
}

div.container { 
  max-width: 800px; 
  margin: 0 auto;
  margin-top: 3%; 
  margin-bottom: 2%; 
}

p.error { 
  border: 1px solid red; 
  padding: 2%; 
  margin-bottom: 3%; 
}

div.post { 
  background-color: white;
  border: 1px solid black; 
  padding:2%;
  margin-bottom: 1.5%; 
  margin-top: 2%; 
  text-align: center; 
}

p.text {
  font-size: 1.1em; 
  width:100%;
  text-align: center;
}
button:hover{
  background-color: rgb(77, 72, 71); 
color: white; 
}


</style>
