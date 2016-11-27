<template>
  <div class="home-container">
    <input v-model="name" :id="id" type="text" />
    </div>
  </div>
</template>

<script>
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
  }
}
</script>
