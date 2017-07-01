<template lang="html">
	<div v-if="this.$root.login">
		<div class="col-md-offset-2 col-md-8 table-responsive">
			<b-table :fields="tablefield" :items="data">
				<template slot="ok" scope="data">
					{{ data.value?'yes':'no' }}
				</template>
				<template slot="id" scope="data">
					{{ data.value }}
				</template>
				<template slot="problem" scope="data">
					<router-link :to="{ path: './'+data.index }" append>{{ data.value }}</router-link>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data(){
		return {
			data: [],
			tablefield: {
				ok: {
					label: 'AC?',
					sortable: false,
					class: 'col-md-1'
				},
				id: {
					label: 'ID',
					sortable: true,
					class: 'col-md-1'
				},
				problem: {
					label: 'problem',
					sortable: false,
					class: 'col-md-10'
				}
			}
		}
	},
	created(){
		axios.post('/getProblems',{
			id: this.$root.id
		}).then(d=>{
			this.data=d.data;
		});
	}
}
</script>