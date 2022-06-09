<template>
  <div class="container">
    <h2>{{ $store.state.user.profile.account }}</h2>
    <button @click="$store.commit('user/setUser', { account: '4623' })">
      set
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
