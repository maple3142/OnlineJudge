<template lang="html">
	<b-navbar toggleable type="default" variant="success">

      <b-link class="navbar-brand" to="/">
        <span>{{ title }}</span>
      </b-link>
      
      <b-nav is-nav-bar>
        <navlink to="/login" v-if="!this.$root.login">login</navlink>
        <navlink to="/problems" v-if="this.$root.login">problems</navlink>
        <navlink to="/logout" v-if="this.$root.login">logout</navlink>
      </b-nav>

    </b-navbar>
</template>

<script>
import navlink from './navlink.vue';
export default {
  props: ['title'],
  components: { navlink }
}
</script>