<!--SOURCE: https://jsfiddle.net/bc_rikko/gbpw2q9x/3/-->
<template lang="html">
	<div :id="editorId"></div>
</template>

<script>
export default {
  props: ['editorId', 'content', 'lang', 'theme', 'fontSize'],
  data () {
    return {
      editor: Object,
      beforeContent: ''
    };
  },
  watch: {
    'content' (value) {
      if(this.beforeContent !== value) {
      	this.editor.setValue(value, 1);
      }
    }
  },
  mounted () {
  	const lang = this.lang || 'c_cpp';
    const theme = this.theme || 'Eclipse';
  
	this.editor = window.ace.edit(this.editorId);
    this.editor.setValue(this.content, 1);
    
    this.editor.getSession().setMode(`ace/mode/${lang}`);
    this.editor.setTheme(`ace/theme/${theme}`);

	this.editor.setOptions({
		fontSize: this.fontSize || 14
	});

    this.editor.on('change', () => {
    	this.beforeContent = this.editor.getValue();
      this.$emit('change', this.editor.getValue());
    });
  }
}
</script>