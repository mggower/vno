<template>
<div class="hello">
<h1>{{ msg }}</h1>
<p>
For github documentation:<br>
<a href="https://github.com/oslabs-beta/vno" target="_blank" rel="noopener">&nbsp;vno documentation</a>.
</p>
<h3>Installed CLI Plugin</h3>
<ul>
<li><a href="https://github.com/oslabs-beta/vno/tree/main/command-line" target="_blank" rel="noopener">Click Here</a></li>
<br>
</ul>
</div>

</template>

<script>

export default {
name: 'hello-vno',
props: {
msg: String
},
}

</script>

<style>
h3 {
margin: 40px 0 0;
}
ul {
list-style-type: none;
padding: 0;
}
li {
display: inline-block;


margin: 0 10px;
}
a {
color: #79D0B2;
}

</style>