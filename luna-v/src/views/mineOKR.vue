<template>
	<div class="body-coat">
		<div class="bodymain">
			<div class="nav-list">
				<router-link to="/not" class="nav-list-item">今天</router-link>
				<router-link to="/records" class="nav-list-item">历史</router-link>
				<router-link to="/mine" class="nav-list-item">我的OKR</router-link>
			</div>
			<div class="bodymain-container">
				<div class="bodymain-container-list">
					<div class="container-list twodata" v-for='(item,index) in basics' :key='index' @click='check(item.id)'>
							<div class="enddata-main purple">
								<span>截止日期:</span>
								<p>{{item.deadline}}</p>
							</div>
							<p class="object-text">目标 Object</p>
							<div class="object-content">
								<p class="chinese-text">{{item.objective}}</p>
							</div>
					</div>
				</div>
			</div>
		</div>
		<div class="addbtn-main">
			<button class="addbtn" @click='add'>添加OKR</button>
		</div>
	</div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
export default {
	name: 'mineOKR',
	data(){
		return{
			basics:[],
		}
	},
	created:function(){
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
	},
	methods:{
		add:function(){
		this.$router.push({name: 'addition',params:{}});
		},
		check:function(id){
		let token = localStorage.getItem('todos');
		let d = id;
		this.$router.push({name: 'look',params:{id:id,csrf:token},query:{
            id: d
          }});






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
.bodymain{
	margin: 30px/@ppr 50px/@ppr;
	background-color: #fff;
	height: 100%;
	border-radius: 30px/@ppr;
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
}
.nav-right-btn-hover{
	background: url(./../assets/image/frame.png)!important;
	background-size:100%!important;
	width: 250px/@ppr!important;
	height: 100px/@ppr!important;
	position: absolute;
	right: 0;
	top: -5px;
}
.bodymain-container{
	margin-left: 70px/@ppr;
	margin-top: 30px/@ppr;
	font-size: 24px/@ppr;
	padding-bottom:30px/@ppr;
}
.bodymain-container-list{
	width: 550px/@ppr;
	.enddata-main{
		margin-bottom: 19px/@ppr;
		font-size: 24px/@ppr;
		span{
			display: inline-block;
		}
		p{
			display: inline-block;
		}
	}
	.object-text{
		margin-bottom: 10px/@ppr;
	}
	.object-content{
		margin-bottom: 10px/@ppr;
		background: #f2f8fc;
		padding:10px/@ppr;
		.chinese-text{
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap
		}
	}
}
.purple{
	position: relative;
}
.purple:before{
	position: absolute;
	left: -40px/@ppr;
	top: 5px/@ppr;
	display: inline-block;
	content: '';
	width: 10px/@ppr;
	height: 10px/@ppr;
	border-radius: 50%;
	border:5px/@ppr solid #5f1783;
	z-index: 1;
}














.orange{
	position: relative;
	line-height: 32px/@ppr;
}
.orange:before{
	position: absolute;
	left: -40px/@ppr;
	top: 5px/@ppr;
	display: inline-block;
	content: '';
	width: 10px/@ppr;
	height: 10px/@ppr;
	border-radius: 50%;
	border:5px/@ppr solid #ff4701;
	z-index: 1;
}
.addbtn-main{
	width: 100%;
	text-align: center;
	padding-bottom:30px/@ppr;
	.addbtn {
		border-radius: 6px;
		background-color: rgb(0, 0, 0);
		width: 650px/@ppr;
		height: 88px/@ppr;
		color: #fff;
		font-size: 32px/@ppr;
		outline: none;
		border: none;
	}
}
.onedate{
	position: relative;
}
.onedate:after{
		position: absolute;
		left: -31px/@ppr;
		top: 20px/@ppr;
		display: inline-block;
		content: '';
		height: 100%;
		width: 1px/@ppr;
		border-right:1px/@ppr solid #000; 
	}
.twodata{
	position: relative;
}
.twodata:after{
	position: absolute;
	left: -31px/@ppr;
	top: 20px/@ppr;
	display: inline-block;
	content: '';
	height: 100%;
	width: 1px/@ppr;
	border-right:1px/@ppr solid #000; 
}



.twodata:last-child:after{
	display:none;
	content: none;
}
</style>