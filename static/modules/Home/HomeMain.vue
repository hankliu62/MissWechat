<template>
  <div class="home-container">
    <search-bar></search-bar>
    <input v-model="name" :id="id" type="text" />
    </div>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar/SearchBar'

export default {
  data () {
    return {
      name: 'main.html',
      id: 'name',
      content: '<h1>Hi Bady</h1>'
    }
  },
  methods: {
    onEnter: function (e) {
      console.log(this, e, 'vvvvvvvvvvvvvvvv')
    }
  },
  created () {
    console.log(123)
  },
  components: { SearchBar }
}
</script>
