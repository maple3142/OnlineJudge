<template lang="html">
	<div>
		<b-btn v-b-toggle.data variant="primary">{{ this.btn }}</b-btn>
		<b-collapse id="data">
			<b-card :title="this.title">
				<slot></slot>
			</b-card>
		</b-collapse>
	</div>
</template>

<script>
export default {
	props: ['btn','title']
}
</script>