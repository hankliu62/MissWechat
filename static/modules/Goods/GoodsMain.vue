<template>
  <div class="todoapp">
    <input v-model="name" :id="id" type="text" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: 'main.html',
      id: 'name'
    }
  },
  methods: {
    onEnter: function (e) {
      console.log(this, e, 'vvvvvvvvvvvvvvvv')
    }
  },
  created () {
    console.log(123);
  }
}
</script>
