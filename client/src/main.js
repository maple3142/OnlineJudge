import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './style.css';
import '../index.html';/* index.html hot reload */
Vue.use(BootstrapVue);
Vue.use(VueRouter);

import navbar from './vue/navbar.vue';
import root from './vue/root.vue';
import login from './vue/login.vue';
import logout from './vue/logout.vue';
import problems from './vue/problems.vue';
import showproblem from './vue/showproblem.vue';
const router=new VueRouter({
	routes: [
		{path: '/', component: root},
		{path: '/login', component: login},
		{path: '/logout', component: logout},
		{path: '/problems', component: problems},
		{path: '/problems/:id', component: showproblem}
	],
	linkActiveClass: ''
});
var app=new Vue({
	el: '#app',
	data: {
		login: localStorage.login=='true'||false,
		name: localStorage.name||'guest',
		id: localStorage.id||'1'
	},
	components: { navbar },
	router
});

axios.post('/checkid',{
	id: app.id
}).then(d=>{
	if(!d.data.ok){
		app.id='1';
		app.name='guest';
		app.login=false;
		router.replace('/');
	}
});