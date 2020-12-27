/* eslint-disable */
// prettier-ignore
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const IndividualComment = Vue.component("individual-comment", {template: ` <div> <li> <img class="post-img" :src="commentpost.authorImg" /> <small>{{ commentpost.author }}</small> <p class="post-comment">"{{ commentpost.text }}"</p> </li> </div>`, name: 'individual-comment', props: ["commentpost"],});
const App = new Vue({template: ` <div id="app"> <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-post-photo.jpg" class="main-photo" /> <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/vue-main-profile.jpg" class="main-profile" /> <div class="main-info"> <span class="name">Julianne Delfina</span> <h3>"It's lovely after it rains"</h3> </div> <hr /> <ul> <individual-comment v-for="comment in allComments" :key="comment.key" :commentpost="comment" ></individual-comment> </ul> <input v-model="newComment" @keyup.enter="addComment" placeholder="Add a comment" /> </div>`, name: 'app', components: { IndividualComment, }, data() { return { newComment: '', allComments: [], count: 0, }; }, computed: { comments() { console.log('x'); }, }, methods: { addComment() { const post = { key: this.count, text: this.newComment, author: 'VNO TEAM', authorImg: 'https://i.ibb.co/Kw9HYXv/Asset-3.png', }; console.log(this.newComment); this.allComments = [...this.allComments, post]; this.newComment = ''; this.count += 1; }, },});

App.$mount("#app");
export default App;
