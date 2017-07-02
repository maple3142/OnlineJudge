<template lang="html">
	<div v-if="this.$root.login">
		<div class="col-md-offset-2 col-md-8">
			<div v-html="content">
				
			</div>
			<div class="form-group">
				<label for="code">C/C++程式碼:</label>
				<b-form-input id="code" textarea v-model="code" :rows="15" v-if="classic_editor">
				</b-form-input>
				<div style="height: 300px" v-if="!classic_editor">
					<editor editor-id="code" :content="code" lang="c_cpp" style="width: 100%;height: 100%;" @change="update" :fontSize="14"></editor>
					<br>
				</div>
				<b-button class="btn btn-primary" @click="submit">送出</b-button>
			</div>
			<b-alert variant="danger" dismissible :show="this.emptymsg" @dismissed="emptymsg=false">
				程式碼不能為空
			</b-alert>
			<b-alert variant="danger" dismissible :show="this.autherror" @dismissed="autherror=false">
				認證錯誤，請重新登入
			</b-alert>
			<b-alert :variant="resultvar" dismissible :show="this.showresult" @dismissed="showresult=false">
				結果: {{ result }}
				<br>
				時間: {{ time }}ms
			</b-alert>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import editor from  './editor.vue';
export default {
	components: { editor },
	data(){
		return {
			content: 'please wait...',
			code: '',
			emptymsg: false,
			autherror: false,
			result: "null",
			time: 0,
			showresult: false,
			resultvar: 'success',
			classic_editor: false
		}
	},
	created(){
		axios.post('/getProblem',{
			id: this.$route.params.id
		}).then(d=>{
			this.content=d.data.content;
		});
		if(!window.ace){
			this.classic_editor=true;
		}
	},
	methods: {
		update(val){
			if(val!==this.code)
				this.code=val;
		},
		submit(){
			if(!this.code){
				this.emptymsg=true;
			}
			else{
				axios.post('/judge',{
					code: this.code,
					id: this.$root.id,
					problem: this.$route.params.id
				}).then(d=>{
					if(!d.data.ok)this.autherror=true;
					else{
						console.log(d.data);
						this.result=d.data.result;
						this.time=d.data.time;
						switch(this.result){
							case 'AC':
								this.resultvar='success';
								break;
							case 'WA':
							case 'TLE':
							case 'CE':
							case 'RE':
								this.resultvar='danger';
								break;
							default: 
								this.resultvar='info';
						}
						this.showresult=true;
					}
				});
			}
		}
	}
}
</script>