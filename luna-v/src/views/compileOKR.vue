<template>
<div>
	<div class="container-main">
		<div class="container-main-list">
			<div class="objectmain">  
				<div class="headline">
					<span>目标 Object</span>
					<p class="subhead">心之所向，神之向往</p>
				</div>
				<div class="object-content">
					<div class="chinese-title">
						<p class="title-text">中文o</p>
						<input  class="entry-input"  type="text" name="chinese" placeholder="写下一个能点燃我的状态" v-model='aim'>
					</div>
				</div>
			</div>
			<div class="keyresult">
				<div class="headline">
					<span>关键成果 Key Result</span>
					<p class="subhead">内心丰盈，积极行动</p>
				</div>
				<div class="key-content" data-index='1'  v-for='(item,index) in list' :key='item.id' >
					<div class="chinese-title">
						<p class="title-text">中文KR</p>
						<input  class="entry-input"  type="text" name="chinese" :placeholder="item.keyresult" @input='Modify(index, $event)' >
					</div>
					<p class="close-btn" id="close-btn">X</p>
				</div>
			</div>
			<div class="decline">
				<span>OKR截止时间</span>
				<div class="decline-content">
					<input class="decline-entry" type="date" v-model='time'>
				</div>
			</div>
		</div>  
	</div>
	<div class="options-btn">
		<button class="off" @click='backtrack'>取消</button>
		<button class="save" @click='save'>保存</button>
	</div>
</div>

</template>

<script>
import axios from "axios";
export default {
  name: 'lookOKR',
  data(){
		return{
			basics:[],
			// 目标
			aim:'',
			time:'',
			list:[],
			// 新的数据
			storage:[],
		}
  },
  created:function(){
	let id = this.$route.query.id;
	let token = localStorage.getItem('todos');
	let URL = 'http://localhost:3000/api/okr/' + id;
	axios.get(URL,{
	params:{
		token:token,
		id:id,
	}
	}).then(res => {
		console.log(res);
	if (res.data.code == 200) {
		this.basics = res.data.data.keyresults;
		let dom = this.basics;
		this.id = res.data.data.id;
		this.aim = res.data.data.objective;
		let future = (new Date(res.data.data.deadline)).getTime();
		var date =  new Date(future);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    let conversion = y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
		this.time = conversion;
		dom.forEach((item,index) => {
			let list = this.list;
			let storage = this.storage;
			list.push(item);
			storage.push(item);
		}) 
		}else if(res.data.code == 0){
		}
	}).catch( err => {
	})
  },
  methods:{
  	backtrack:function(){
  		let id = this.id;
  		let token = localStorage.getItem('todos');
			this.$router.push({name: 'look',params:{id:id,csrf:token},query:{
            id: id
          }});
  	},
  	save:function(){
  		let token = localStorage.getItem('todos');
  		let id = this.id;
	  	let URL = 'http://localhost:3000/api/okr/' + id;
	  	let aim = this.aim;
	  	let valTime = this.time;
	  	let keyresult = this.storage;
			axios.put(URL,{
				token:token,
				id: id,
				objective:aim,
				keyresults:keyresult,
				deadline:valTime,
			}).then(res => {
				if (res.data.code == 200) {
				   this.$router.push({name: 'look',params:{id: id},query:{
            id: id
          }});
				   console.log(res);
					}else if(res.data.code == 0){
					
					}
			}).catch( err => {
			})
	  },
	  Modify:function(index,evt){
	  	let storage = this.storage;
	  	storage[index].keyresult = evt.target.value;
	  }
  },

};
</script>




<style lang="less">
	* {
	margin: 0;
	padding: 0;
}

@divide: 10;
@pswWidth: 750px;
@ppr: @pswWidth/@divide/1rem;

body{
	background-color: #f7f7f7;
}
button{
	border: none;
}
.headline span{
	font-size: 36/@ppr;
	font-family: "PingFang SC";
	color: rgb(0, 0, 0);
	line-height: 1.167;
}
.headline{
	display: flex;
	flex-direction: column;
	padding-top: 32px/@ppr;
}
.subhead{ /*副标题*/
	font-size: 24/@ppr;
	font-family: "PingFang SC";
	color: rgb(179, 179, 179);
}
.title-text {
		font-size: 24/@ppr;
		font-family: "PingFang SC";
		color: rgb(102, 102, 102);
}
.redtext {
		display: inline-block;
		color: #ff1c26;
}
/*.entry {
		font-size: 28/@ppr;
		height: 68/@ppr;
		width: 100%;
		background-color: #f2f8fc;
		border: none;
		border-bottom: 0.01rem solid #000;
}*/
.addbtn {
		border-radius: 6/@ppr;
		width: 100%;
		height: 88/@ppr;
		font-size: 32/@ppr;
		color: #fff;
		background-color: #000;
		outline: none;
}
/*统一设置以上的是*/
.container-main {
	height: 100%;
	width: 86.7%;
	background: #fff;
	margin: 30px/@ppr auto;
	border-radius: 3/@ppr;
	.container-main-list {
		margin: 20/@ppr 40/@ppr;
		.objectmain{
			.headline{
				display: flex;
				flex-direction: column;
				span {
					font-size: 36/@ppr;
					font-family: "PingFang SC";
					color: #000000;
					line-height: 1.167;
				}
			}
			.object-content {
				padding: 10/@ppr;
				margin: 10/@ppr 0;
				background-color: #f2f8fc;
				.chinese-title {
					display: flex;
					flex-direction: column;
					height: 100/@ppr;
					margin: 10/@ppr auto;
					width: 90%;
					input{
						color: #000;
						font-size: 28/@ppr;
						height: 68/@ppr;
						width: 100%;
						background-color: #f2f8fc;
						border: none;
						outline: none;
						border-bottom: 1/@ppr solid #000;
					}
					input::-webkit-input-placeholder{
						color: #000;
					}
			}
				.englis-title{
					display: flex;
					flex-direction: column;
					height: 100/@ppr;
					margin: 10/@ppr auto;
					width: 90%;
					input{
						color: #000;
						font-size: 28/@ppr;
						height: 68/@ppr;
						width: 100%;
						background-color: #f2f8fc;
						border: none;
						outline: none;
						border-bottom: 1/@ppr solid #000;
					}
					input::-webkit-input-placeholder{
						color: #000;
					}
				}
			}
		}
		.decline{
			display: flex;
			flex-direction: column;
			padding-top: 32px/@ppr;
			span {
				font-size: 36/@ppr;
				font-family: "PingFang SC";
				color: rgb(0, 0, 0);
				line-height: 1.167;
			}
			.decline-content {
				display: flex;
				padding: 10/@ppr 32px/@ppr;
				height: 68px/@ppr;
				background-color:#fff;
				margin-top:50px/@ppr;
				.decline-entry {
					display: inline-block;
					font-size: 28px/@ppr;
					width: 90%;
					border: none;
					border-bottom: 1px/@ppr solid #000;
					padding: 10px/@ppr auto;
					outline: none;
					background-color: #fff;
				}
			}
		}
	}
}

.key-content{
	position: relative;
	background-color: #f2f8fc;
	padding: 10/@ppr;
	margin: 10/@ppr 0;
	.chinese-title {
		display: flex;
		flex-direction: column;
		height: 100/@ppr;
		margin: 10/@ppr auto;
		width: 90%;
		input{
			font-size: 28/@ppr;
			height: 68/@ppr;
			width: 100%;
			background-color: #f2f8fc;
			border: none;
			outline: none;
			border-bottom: 1px/@ppr solid #000;
		}
		input::-webkit-input-placeholder{
			color: #000;
		}
		input{

		}
	}
	.englis-title {
		display: flex;
		flex-direction: column;
		height: 100/@ppr;
		margin: 10/@ppr auto;
		width: 90%;
		input{
			font-size: 28/@ppr;
			height: 68/@ppr;
			width: 100%;
			background-color: #f2f8fc;
			border: none;
			outline: none;
			border-bottom: 1px/@ppr solid #000;
		}
		input::-webkit-input-placeholder{
			color: #000;
		}
	}
	.close-btn {
		position: absolute;
		display: inline-block;
		background: #000;
		color: #fff;
		height: 48px/@ppr;
		width: 48px/@ppr;
		top: 0;
		right: 0;
		font-size: 40/@ppr;
		text-align: center;
	}
}

.options-btn {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		margin-bottom: 130/@ppr;
		width: 86.7%;
		.off {
			display: inline-block;
			font-size: 32/@ppr;
			font-family: "PingFang SC";
			text-align: center;
			line-height: 88px/@ppr;
			border-radius: 6px/@ppr;
			background-color: rgb(255, 28, 38);
			width: 48%;
			height: 88px/@ppr;
			outline: none;
		}
		.save {
			display: inline-block;
			font-size: 32/@ppr;
			font-family: "PingFang SC";
			color: #fff;
			text-align: center;
			line-height: 88px/@ppr;
			border-radius: 6px/@ppr;
			background-color: rgb(0, 0, 0);
			width: 48%;
			height: 88px/@ppr;
			outline: none;
		}
}
</style>