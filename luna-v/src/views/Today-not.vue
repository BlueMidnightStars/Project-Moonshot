<template>
<div class="not-section">
	<div class="container">
		<div class="todos-contaner active">
			<div class="todos-section">
				<div class="nav-list">
		            <router-link to="/not" class="nav-list-item-link">今日</router-link>
		            <router-link to="/records" class="nav-list-item-link">历史</router-link>
		            <router-link to="/mine" class="nav-list-item-link">我的OKR</router-link>
		        </div>
				<div class="todos-content">
					<div class="todos-title">今日三件事</div>
					<div class="todos-content-list">
						<div class="todos-content-item">
							<div class="todos-item-input"><input type="text" placeholder="想想是否与目标相关" v-model='todayOne'></div>
							<div class="todos-click" @click='connect(1)'>OKR</div>
						</div>
						<div class="todos-content-item">
							<div class="todos-item-input"><input type="text" placeholder="想想完成的标准是什么" v-model='todayTwo'></div>
							<div class="todos-click" @click='connect(2)'>OKR</div>
						</div>
						<div class="todos-content-item">
							<div class="todos-item-input"><input type="text" placeholder="想想描述的是否清晰" v-model='todayThree'></div>
							<div class="todos-click" @click='connect(3)'>OKR</div>
						</div>
					</div>
				</div>
				<div class="todos-happiness">
					<div class="happiness-title">今日小确幸</div>
					<div class="happiness-inputbox"><textarea placeholder='微小但确切的幸福' v-model='felicity'></textarea></div>
				</div>
			</div>
			<div class="todos-confirm" @click='save'>确定</div>
			<div class="todos-confirm-hint">
				<img src="./../assets/image/icon_notice.png">
				<p>拉钩，保存了就不许修改啦！</p>
			</div>
		</div>		
	</div>
	<div class="shade-contanter" v-if='show'>
		<div class="shade-popup">
			<div class="shade-blocklevel">
				<div class="shade-topbar">
					<p>请选择要关联的KR</p>
					<img class="shade-topbar-clone" src="./../assets/image/icon_close.png" @click='hideNO'>
				</div>
				<div class="overflow">
					<div class="shade-main-content">
						<div class="shade-content" v-for='(item, idx) in basics' :key='item.id'>
							<div class="shade-content-title">
								<p class="shade-Chinese">{{item.objective}}</p>	
							</div>
							<div>
								<div class="shade-content-text" v-for='(data,index) in item.keyresults' :key='data.id' @click='highlight(data.id, data.keyresult, $event)' >
									<p class="shade-text-chinese">{{data.keyresult}}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="shade-select">
						<div class="shade-select-block" >
							<h2>已选择</h2>
							<p v-for='(data,index) in temporary' :key='index'>
								<span>{{data}}</span>
							</p>
						</div>
					</div>
					<div class="confirm-button"  @click='hide'>确定</div><!-- 确定按钮 -->
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios";
export default {
	name: 'not',
  data(){
		return{
			basics:[],
			show:false,
			// 当前显示的页面
			today:'',
			// 今日三件事的
			todayOne:'',
			todayTwo:'',
			todayThree:'',
			// 三件事的关联ID
			OKROne:[],
			OKRTwo:[],
			OKRThree:[],
			// 三件事的关联文字
			writingOne:[],
			writingTwo:[],
			writingThree:[],
			// 临时显示的三件事关联文字
			temporary:[],
			// 小确幸
			felicity:'',
		}
	},
	created:function(){
		let token = localStorage.getItem('todos');
		let URL = 'http://localhost:3000/api/todos';
		axios.get(URL,{
			params:{"token":token}
			}).then(res => {
				console.log(res);
				if (res.data.code == 200) {
					let finallyO = res.data.data.length - 1;
					console.log(finallyO);
					let time = res.data.data[finallyO].created_at;

					}else if(res.data.code == 0){
					}
			}).catch( err => {
		})
	},
	methods:{
		connect:function(today){
			this.show = true;
			let token = localStorage.getItem('todos');
			let dom = [];
			let URL = 'http://localhost:3000/api/okr';
			console.log(token);
			axios.get(URL,{
				params:{"token":token}
				}).then(res => {
					console.log(res);
					if (res.data.code == 200) {
						dom = res.data.data; 
						this.basics = dom;
						console.log(dom);
						}else if(res.data.code == 0){
						}
				}).catch( err => {
			})
			this.today = today;
		},
		highlight:function(id, keyresult, evt){
			console.log(evt.target.className);
			console.log(this);
			let dom ;
			if (evt.target.className == 'shade-content-text') {
				dom = evt.target;
			}else{
				dom = evt.target.parentNode;
			}
			console.log(dom);
			let key = dom.className.match(new RegExp("(\\s|^)" + 'shade-content-text' + "(\\s|$)"))
			if (key) {
				let ke = dom.className.match(new RegExp("(\\s|^)" + 'gray' + "(\\s|$)"))
				if(ke){ 
		        var reg = new RegExp("(\\s|^)" + 'gray' + "(\\s|$)");
	        	dom.className = dom.className.replace(reg, "");
	        	console.log(id);
	        	if (this.today == 1) {
	        		let index;
	        		this.OKROne.forEach((item, data) => {
	        			if (item ==id) {
	        				index = data;
	        			}
	        		})
	        		this.OKROne.splice(index,1);
	        		this.writingOne.splice(index,1);

	        	}else if (this.today == 2) {
	        		let index;
	        		this.OKRTwo.forEach((item, data) => {
	        			if (item ==id) {
	        				index = data;
	        			}
	        		})
	        		this.OKRTwo.splice(index,1);
	        		this.writingTwo.splice(index,1);

	        	}else{
	        		let index;
	        		this.OKRThree.forEach((item, data) => {
	        			if (item ==id) {
	        				index = data;
	        			}
	        		})
	        		this.OKRThree.splice(index,1);
	        		this.writingThree.splice(index,1);

	        	}
		    }else{ 
		        dom.className += " " + 'gray';
	        	console.log(id);
	        	if (this.today == 1) {
	        		this.OKROne.push(id);
	        		this.writingOne.push(keyresult);
	        	}else if (this.today == 2) {
	        		this.OKRTwo.push(id);
	        		this.writingTwo.push(keyresult);

	        	}else{
	        		this.OKRThree.push(id);
	        		this.writingThree.push(keyresult);

	        	}

		    } 
			}
			console.log(this.OKROne, this.OKRTwo, this.OKRThree)
			
		},
		hideNO:function(){
			this.show = false;
			let today = this.today;
			if (today == 1) {
				this.OKROne = [];
				this.writingOne = [];
			}else if(today == 2) {
				this.OKRTwo = [];
				this.writingTwo = [];
			}else{
				this.OKRThree = [];
				this.writingThree = [];
			}
		},
		hide:function(){
			this.show = false;
			
		},
		save:function(){
			let one = (this.todayOne == [] || this.todayTwo == []) || this.todayThree == [];
			if (this.felicity == '' || one) {
				return alert('请添加事件及关联,还有今日的小确幸哦！')
			}
			let token = localStorage.getItem('todos');
			let URL = 'http://localhost:3000/api/todos';
			console.log(this.todayOne);
			let data = [{value:this.todayOne, keyresults:this.OKROne},{value:this.todayTwo, keyresults:this.OKRTwo},{value:this.todayThree, keyresults:this.OKRThree}];
			console.log(data);
			console.log(1);
			axios.post(URL,{
				token: token,
				todos:[{value:this.todayOne, keyresults:this.OKROne},{value:this.todayTwo, keyresults:this.OKRTwo},{value:this.todayThree, keyresults:this.OKRThree}],
				surprise:this.felicity,
			}).then(res => {
				console.log(res);
				if (res.data.code == 200) {
					console.log(res.data.todos_id);
					let todos_id = res.data.todos_id;
				   	this.$router.push({name: 'notReflection',query:{id:todos_id}});
					}else if(res.data.code == 0){
					}
			}).catch( err => {
			})
		},
	},
	watch:{
		today:function(){
			if (this.today == 1) {
				this.temporary = this.writingOne
			}else if (this.today == 2) {
				this.temporary = this.writingTwo

			}else{
				this.temporary = this.writingThree
			}
			console.log(this.temporary);
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
	background-color:#f7f7f7;

}
.not-section{
	.container{
		// display: none;
		width: 750px/@ppr;
		height: 1294px/@ppr;
		padding-top:56px/@ppr;
		.todos-contaner{
			// background-color:red;
			padding-bottom:30px/@ppr;
			.todos-section{
				width: 650px/@ppr;
				background-color: #fff;
				padding-bottom:50px/@ppr;
				border-radius: 5px 5px 0 0;
				.nav-list{
			        display: flex;
			        justify-content: space-between;
			        border-radius: 18px 5px 0 0;
			        background-color:#a7cae4;
			        height: 90px/@ppr;
			        .nav-list-item-link{
			            display: inline-block;
			            text-align: center;
			            line-height: 90px/@ppr;
			            width: 33%;
			            font-size: 28px/@ppr;
			            vertical-align: top;
			            margin: 0;
			            color:#000;
			        }
			        .nav-list-item-link:nth-child(1){
			            background-image: url(./../assets/image/not.png);
			            background-size: cover;
			            background-repeat: no-repeat;
			        }
	    		}

				.todos-content{
					width: 100%;
					
					.todos-title{
						font-size: 36px/@ppr;
						font-weight: 600;
						color: #000000;
						text-align: center;
						margin-top:44px/@ppr;
						margin-bottom: 42px/@ppr;
					}
					.todos-content-list{
						width: 590px/@ppr;
						.todos-content-item{
							width: 100%;
							height: 112px/@ppr;
							border-bottom:1px/@ppr solid #000000;
							font-size: 0;
							position:relative;
							.todos-item-input{
								display: inline-block;
								vertical-align: top;
								height: 108px/@ppr;
								input{
								padding-top: 20px/@ppr;
								width: 472px/@ppr;
								height: 100%;
								border:none;
								font-size: 28px/@ppr;
								line-height: 28px/@ppr;
								color: #b3b3b3;
								outline: none;

							}
							} 
							.todos-click{
								vertical-align: top;
								display: inline-block;
								width: 118px/@ppr;
								height: 108px/@ppr;
								font-size: 28px/@ppr;
								color: #000;
								text-align: center;
								padding-top:42px/@ppr;
								position:relative;
							}					
						}
						.todos-content-item:before{
							content: '';
							display: inline-block;
							width: 2px/@ppr;
							height: 54px/@ppr;
							background-color: #000;
							position:absolute;
							right: 118px/@ppr;
							top: 27px/@ppr;
						}
					}
				}
				.todos-happiness{
					width: 100%;
					.happiness-title{
						font-size: 36px/@ppr;
						color: #000000;
						font-weight: 600;
						text-align: center;
						margin:38px/@ppr 0 30px/@ppr 0;
					}
					.happiness-inputbox{
						width: 590px/@ppr;
						height: 159px/@ppr;							
						textarea{
							display: inline-block;
							width: 100%;
							height: 100%;
							border:none;
							outline: none;
							font-size: 28px/@ppr;
							line-height: 28px/@ppr;
							font-weight: 600;
							color: #b3b3b3;
							vertical-align: top;
							padding-top:20px/@ppr;
							padding-left:20px/@ppr;
							background-color:#f2f8fc;
							border-radius: 5px/@ppr;
							resize:none;

						}
					}
				}
			}
			.todos-confirm{
				width: 650px/@ppr;
				height: 88px/@ppr;
				background-color:#000000;
				color: #fff;
				text-align: center;
				font-size: 32px/@ppr;
				font-weight: 600;
				line-height: 88px/@ppr;
				border-radius:10px/@ppr;
				margin-top: 30px/@ppr;
				margin-bottom: 83px/@ppr;
			}
			.todos-confirm-hint{
				text-align: center;
				font-size: 0;
				margin-bottom: 30px/@ppr;
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
	.shade-contanter{
		position:fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		animation: showmask .25s ease forwards;
		background-color:rgba(0,0,0,.4);
	  z-index: 999;
	  .shade-popup{
	   	background-color:rgba(0,0,0,.4);
	   	position: absolute;
	   	bottom: 0;
			.shade-blocklevel{
				background-color:#fff;
				.shade-topbar{
					width: 100%;
					height: 85px/@ppr;
					background-color: #ffffff;
					border-radius: 20px/@ppr 20px/@ppr 0 0 ;					
					padding-left:30px/@ppr;
					padding-right:30px/@ppr;			
					p{
						display: inline-block;
						font-size: 36px/@ppr;
						line-height: 36px/@ppr;
						color: #000000;
						font-weight: 600;
						line-height: 85px/@ppr;
						vertical-align: top;
					}
					.shade-topbar-clone{
						float: right;
						width: 32px/@ppr;
						height: 33px/@ppr;
						margin-top: 30px/@ppr;
						margin-right: 30px/@ppr;
					}
				}
				.overflow{
					overflow:auto;
					display: inline-block;
					height: 800px/@ppr;
					.shade-main-content{
						width: 100%;
						background-color: #fff;
						padding:30px/@ppr 30px/@ppr 0 30px/@ppr;
						.shade-content-title{														
							.shade-Chinese{
								display: inline-block;
								font-size: 28px/@ppr;
								color: #333333;
								font-weight: 600;
								margin-left: 18px/@ppr;
								position:relative;							
							}
							.shade-Chinese:before{
									content: '';
									display: inline-block;
									width: 3px/@ppr;
									height: 26px/@ppr;
									background-color: #000000;						
									position:absolute;
									top: 3px/@ppr;
									left: -18px/@ppr;
								}							
						}
						.shade-content-text{
							position:relative;
							width: 690px/@ppr;
							// height: 74px/@ppr;
							border:1px/@ppr solid #cccccc;
							border-radius:7px/@ppr;				
							padding-top: 20px/@ppr;
							padding-bottom: 10px/@ppr;
							padding:26px/@ppr 80px/@ppr 20px/@ppr 80px/@ppr;						
							.shade-text-chinese{
								font-size: 24px/@ppr;
								color:#666666;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.shade-text-english{
								display: none;
								font-size: 24px/@ppr;
								color:#666666;
							}
						}
						.shade-content-text:before{
							content: '';
							display: inline-block;
							width: 40px/@ppr;
							height: 40px/@ppr;
							background-image: url(./../assets/image/icon_key.png);
							position:absolute;
							top: 17px/@ppr;
							left: 20px/@ppr;
						}
						.shade-content-text:after{
							content: '';
							display: inline-block;
							width: 12px/@ppr;
							height: 12px/@ppr;
							border-left:2px/@ppr solid #323232;
							border-bottom:2px/@ppr solid #323232;
							position:absolute;
							top:30px/@ppr;
							right: 20px/@ppr;
							transform: rotate(-45deg);
						}
						.gray{
							background-color: #999;
							.shade-text-chinese{
								color:#fff;
							}
						}
					}
					.shade-select{
								width: 100%;
								background-color:#fff;
								.shade-select-block{
									width: 690px/@ppr;
									h2{
										font-size: 28px/@ppr;
										line-height: 28px/@ppr;
										color: #333333;
										margin-top: 22px/@ppr;
									}
									p{
										margin-top:12px/@ppr;
										margin-bottom: 30px/@ppr;
										font-size: 24px/@ppr;
										line-height: 34px/@ppr;
										color: #333333;
									}
								}
					}
					.confirm-button{
						width: 100%;
						height: 88px/@ppr;
						background-color: #000000;
						text-align: center;
						font-size: 32px/@ppr;
						font-weight: 600;
						color: #fff;
						line-height: 88px/@ppr;
					}
				}

			}
	   		
	  }
	}
}

</style>