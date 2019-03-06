<template>
	<div class="container">
		<div class="todos-section">
			<div class="nav-list">
				<router-link to="/not" class="nav-list-item">今天</router-link>
				<router-link to="/records" class="nav-list-item">历史</router-link>
				<router-link to="/mine" class="nav-list-item">我的OKR</router-link>
			</div>
			<div class="todos-banner">
				<img class='todos-banner-img' src="./../assets/image/complete-tixin.png">
			</div>
			
		</div>
	</div>
</template>

<script>

export default {
  name: 'complete',
  components: {

  },
};
</script>
<style lang="less">





@divide: 10;
@pswWidth: 750px;
@ppr: @pswWidth/@divide/1rem;
*{
	margin:0 auto;
	padding:0;
	box-sizing:border-box;
}
a{
	text-decoration: none;		
}
html,body{
	width: 100%;
	height: 100%;
	background-color:#f7f7f7;
}
.container{
	width: 750px/@ppr;
	height: 1107px/@ppr;
	
	padding-top: 30px/@ppr;
	.todos-section{
		width: 650px/@ppr;
		.nav-list{
			display: flex;
			justify-content: space-between;
			border-radius: 5px 5px 0 0;
			background-color:#a7cae4;
			height: 89px/@ppr;
			font-size:0;
			.nav-list-item{
				display: inline-block;
				text-align: center;
				line-height: 100px/@ppr;
				height: 90px/@ppr;
				width: 33%;
				font-size: 28px/@ppr;
				margin: 0;
				color:#333;
			}
			.nav-list-item:last-child{
				border-bottom:#fff;
				background-image: url(./../assets/image/lookOKR-link.png);
				background-size: cover;
				background-repeat: no-repeat;
			}
		}
		.todos-banner{
			width: 100%;
			height: 950px/@ppr;
			display: inline-block;
			background-color:#fff;
			border-radius:0 0 28px/@ppr 28px/@ppr;
			font-size: 0;
			.todos-banner-img{
				display: inline-block;
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>