<template>
<div class="container">
	<div class="todos-section">
		<div class="todos-topbar">
			<img class="topbar-background" src="./../assets/image/save-tab.png">
			<router-link to="/not" class="topbar-operation step-1">今日</router-link>
			<router-link to="/records" class="topbar-operation step-2">历史</router-link>
			<router-link to="/mine" class="topbar-operation step-3">我的OKR</router-link>
		</div>
		<div class="todos-content">
			<div class="todos-today">
				<div class="todos-title">今日三件事</div>
				<div class="todos-list">
					<div class="todos-item" v-for='(item,index) in dataDom' :key='item.id' @click='pitchUp(item.id, $event)'>
						<div class="todo-work">{{item.value}}</div>
						<div class="todos-click">OKR</div>
					</div>
				</div>
			</div>
			<div class="todos-happiness">
				<h3 class="happiness-title">今日小确幸</h3>
				<p class="happiness-text">
					{{surprise}}
				</p>
			</div>
			<div class="todos-introspection">
				<h3 class="introspection-title">今日反思</h3>
				<textarea class="introspection-text" placeholder='真诚反思就是成长！想想看，什么要继续坚持，什么要立刻停止，什么要崭新开始？' v-model='reflection'>
					
				</textarea>
			</div>
			<div class="todos-element">
				<h3 class="element-title">幸福五元素</h3>
				<p class="element-text">
					回忆今日份的幸福，将五元素按符合程度高低从上到下拖动排序
				</p>
				<div class="element-list">
					<div class="element-item" @click='choose(1, $event)'>
						<div class="element-item-text">
							Positive emotion
							<br>
							积极情绪
						</div>
					</div>
					<div class="element-item" @click='choose(2, $event)'>
						<div class="element-item-text">
							Engagement
							<br>
							投入
						</div>
					</div>
					<div class="element-item" @click='choose(3, $event)'>
						<div class="element-item-text">
							Relationship
							<br>
							人际关系
						</div>
					</div>
					<div class="element-item" @click='choose(4, $event)'>
						<div class="element-item-text">
							Meaning
							<br>
							意义
						</div>
					</div>
					<div class="element-item" @click='choose(5, $event)'>
						<div class="element-item-text">
							Accomplishment
							<br>
							成就
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="todos-confirm" @click='submit'>保存</div>
		<div class="todos-confirm-hint">
			<img src="./../assets/image/save-icon_notice.png">
			<p>拉钩，保存了就不许修改啦！</p>
		</div>
	</div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Reflection',
  data(){
  	return{
  		// 小确幸
  		surprise:'',
  		dataDom:[],
  		// 完成状态
  		complete:[],
  		// 状态
  		state:[],
  		// 反思
  		reflection:''

  	}
  },
  created:function(id, evt){
		let token = localStorage.getItem('todos');
		let todos_id = this.$route.query.id;
		console.log(todos_id);
		let URL = 'http://localhost:3000/api/todos/' + todos_id;
		console.log(token);
		axios.get(URL,{
			params:{"token":token}
		}).then(res => {
			console.log(res);
			if (res.data.codo == 200) {
				this.surprise = res.data.data.surprise;
				this.dataDom = res.data.data.todos;
				this.dataDom.forEach((item,index) => {
				this.complete.push({id:item.id,status:0})
				})
				console.log(this.complete);
				}else if(res.data.codo == 0){
				}
		}).catch( err => {
		})
	},
  components: {
  },
  methods:{
  	pitchUp:function(id, evt){
  		let dom ;
		console.log(evt.target.className);
  		console.log(evt);
		if (evt.target.className == 'todos-item') {
			dom = evt.target;
		}else{
			dom = evt.target.parentNode;
		}
  		let key = dom.className.match(new RegExp("(\\s|^)" + 'todos-item' + "(\\s|$)"))
		if (key) {
			let ke = dom.className.match(new RegExp("(\\s|^)" + 'active' + "(\\s|$)"))
			if(ke){ 
	        var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
        	dom.className = dom.className.replace(reg, "");
        	console.log(id);
        	this.complete.forEach((item,index) => {
        		if (item.id == id) {
        			item.status = 0;
        		}
        	})
		    }else{ 
		        dom.className += " " + 'active';
	        	console.log(id);
	        	this.complete.forEach((item,index) => {
	        		if (item.id == id) {
	        			item.status = 1;
	        		}
	        	})
	        	

		    } 
		}
		console.log(this.complete,this.reflection);
  	},
  	choose:function(id,evt){
    let dom ;
	console.log(evt.target.className);
		console.log(evt);
	if (evt.target.className == 'element-item') {
		dom = evt.target;
	}else{
		dom = evt.target.parentNode;
	}
	let key = dom.className.match(new RegExp("(\\s|^)" + 'element-item' + "(\\s|$)"))
	if (key) {
		let ke = dom.className.match(new RegExp("(\\s|^)" + 'active' + "(\\s|$)"))
		if(ke){ 
        var reg = new RegExp("(\\s|^)" + 'active' + "(\\s|$)");
    	dom.className = dom.className.replace(reg, "");
    	console.log(id);
    	let idx = '';
    	this.state.forEach((item,index) => {
    		if (item == id) {
    			idx = index;
    		}
    	})
    	this.state.splice(idx,1);
	    }else{ 
	        dom.className += " " + 'active';
        	console.log(id);
        	this.state.push(id);
	    } 
	}
  	},
  	submit:function(){
  		let token = localStorage.getItem('todos');
		let todos_id = this.$route.query.id;
		console.log(todos_id);
		let URL = 'http://localhost:3000/api/todos/' + todos_id;
		console.log(token);
		if (this.reflection == '' || this.state == []) {
			return alert('请输入反思以及选择情绪')
		}
		axios.post(URL,{
			todos:this.complete,
			reflect:this.reflection,
			happiness:this.state,
		}).then(res => {
			console.log(res);
			if (res.data.code == 200) {
				console.log(111);
				this.$router.push({name: 'complete'})
				console.log(22);
				}else if(res.data.codo == 0){
				}
		}).catch( err => {
		})
  	}
  }
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
	// background-color:#f7f7f7;

}
.container{
	width: 750px/@ppr;
	// height: 1107px/@ppr;
	background-color:#f7f7f7;
	padding-top: 30px/@ppr;
	.todos-section{
		width: 650px/@ppr;
		.todos-topbar{
			width: 100%;
			height: 79px/@ppr;
			font-size: 0;
			position:relative;
			.topbar-background{
				position:absolute;
				top:0;
				left: 0;
				width: 650px/@ppr;
				height: 79px/@ppr;
			}
			.topbar-operation{
				display: inline-block;
				width: 33.33%;
				vertical-align: top;
				text-align: center;
				font-size: 28px/@ppr;
				color: #000000;
				font-weight: 600;
				position:absolute;
				top:33px/@ppr;
			}
			.topbar-operation.step-2{
				left: 216px/@ppr;
			}
			.topbar-operation.step-3{
				left: 433px/@ppr;
			}
		}
		.todos-content{
			width: 100%;
			// height: 830px/@ppr;
			background-color:#fff;
			vertical-align: top;
			border-radius:0 0 25px/@ppr 25px/@ppr;
			.todos-today{
				text-align: center;
				padding-top:60px/@ppr;
				.todos-title{
					font-size: 36px/@ppr;
					color: #000000;
					font-weight: 600;				
				}
				.todos-list{
					margin-top: 60px/@ppr;
					.todos-item{
						width: 590px/@ppr;
						height: 110px/@ppr;
						border-bottom:1px/@ppr solid #000;
						font-size: 0;
						position:relative;
						.todo-work{
							display: inline-block;
							width: 472px/@ppr;
							height: 100%;
							font-size: 28px/@ppr;
							color: #b3b3b3;
							line-height: 110px/@ppr;
							text-align: left;
							font-weight: 600;
							white-space:nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding-left:50px/@ppr;
							
							}
							
						.todos-click{
							vertical-align: top;
							display: inline-block;
							width: 118px/@ppr;
							height: 100%;
							line-height: 110px/@ppr;
							font-size: 28px/@ppr;
							color: #333;
							text-align: center;
							font-weight: 600;
						}
					}
					.todos-item:before{
						content: '';
						display: inline-block;
						position:absolute;
						width: 30px/@ppr;
						height: 30px/@ppr;
						border-radius:3px;
						border:1px solid #999;
						top: 36px/@ppr;
						left: 0;
					}
					.todos-item.active:before{
						display: inline-block;
						border:none;
						width: 30px/@ppr;
						height: 30px/@ppr;
						background-image:url();
						background: url(./../assets/image/save-frame.png) no-repeat center center/ contain;

					}
					.todos-item.active{
						.todo-work{
							color: #333;
							text-decoration:line-through;
						}						
					}


				}	
			}
			.todos-happiness{
				width: 100%;
				padding-top:38px/@ppr;
				padding-left:50px/@ppr;
				padding-bottom:15px/@ppr;
				text-align: center;
				border-bottom:1px/@ppr solid #cccccc;
				.happiness-title{
					// text-align: center;
					font-size: 36px/@ppr;
					color: #000;
				}
				.happiness-text{
					width: 540px/@ppr;
					margin-top:20px/@ppr;
					font-size: 28px/@ppr;
					color: #b3b3b3;
					font-weight: 600;
					line-height: 48px/@ppr;
					position:relative;
					text-align: left;
				}
				.happiness-text:before{
					content: '';
					display: inline-block;
					width: 30px/@ppr;
					height: 30px/@ppr;
					border-radius:3px/@ppr;
					border:1px/@ppr solid #cccccc;
					margin-right: 20px/@ppr;					
					cursor: pointer;
					position: absolute;
					top:34px/@ppr;
					left: -50px/@ppr;

				}
			}
			.todos-introspection{
				width: 100%;
				height: 243px/@ppr;
				padding:30px/@ppr 30px/@ppr 0 30px/@ppr;
				font-size: 0;
				.introspection-title{
					font-size: 36px/@ppr;
					color: #000000;
					font-weight:700;
				}
				.introspection-title:after{
					content: '';
					display: inline-block;
					width: 17px/@ppr;
					height: 17px/@ppr;
					background: url(./../assets/image/save-xin.png) no-repeat center center/ contain;
					vertical-align: top;
					margin-top: 10px/@ppr;
					margin-left: 7px/@ppr;
				}
				.introspection-text{
					width:590px/@ppr;
					height: 158px/@ppr;
					background-color:#f2f8fc;
					border:none;
					font-size: 28px/@ppr;
					color: #000;
					padding-left:20px/@ppr;
					font-weight: 600;
					vertical-align: top;
					resize: none;
					outline: none;
					margin-top: 20px/@ppr;

				}
			}
			.todos-element{
				width: 100%;
				padding:30px/@ppr;
				.element-title{
					font-size: 36px/@ppr;
					color: #000000;
					font-weight:700;
				}
				.element-title:after{
					content: '';
					display: inline-block;
					width: 17px/@ppr;
					height: 17px/@ppr;
					background: url(./../assets/image/save-xin.png) no-repeat center center/ contain;
					vertical-align: top;
					margin-top: 10px/@ppr;
					margin-left: 7px/@ppr;
				}
				.element-text{
					font-size: 24px/@ppr;
					color: #b3b3b3;
					margin-top: 4px/@ppr;
				}
				.element-list{
					margin-top: 20px/@ppr;
					.element-item{
						width: 590px/@ppr;
						height: 75px/@ppr;
						border:1px/@ppr solid #000;
						border-radius: 4px/@ppr;
						text-align: center;
						position:relative;
						margin-bottom:10px/@ppr;
						.element-item-text{
							font-size: 24px/@ppr;
							color: #333;
							font-weight: 600;
							line-height: 29px/@ppr;
							padding-top:5px/@ppr;
						}
					}
					.element-item:before{
						content: '';
						display: inline-block;
						width: 16px/@ppr;
						height: 33px/@ppr;
						background: url(./../assets/image/save-icon_move.png) no-repeat center center/ contain;
						position:absolute;
						top:20px/@ppr;
						left: 20px/@ppr;
					}
					.element-item.active{
						background-color:#999;
						color:#333;
					}
				}
			}
		}
		.todos-confirm{
			margin-top: 30px/@ppr;
			width: 650px/@ppr;
			height: 88px/@ppr;
			background-color:#000000;
			color: #fff;
			font-size: 32px/@ppr;
			line-height: 88px/@ppr;
			font-weight:600;
			border-radius:5px/@ppr;
			text-align: center;
		}
		.todos-confirm-hint{
			text-align: center;
			font-size: 0;
			margin-top: 30px/@ppr;
			padding-bottom: 30px/@ppr;
			img{
				display: inline-block;
				margin-right:10px/@ppr;
				vertical-align: top;
			}
			p{
				display: inline-block;
				font-size: 24px/@ppr;
				font-weight: 600;
				color: #ff1d25;
				vertical-align: top;
			}
		}
	}
}
</style>