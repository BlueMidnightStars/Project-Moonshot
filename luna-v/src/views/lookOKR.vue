<template>
<div>
    
    <div class="container-main-lookOKR">
        <div class="nav-list">
            <router-link to="/not" class="nav-list-item">今日</router-link>
            <router-link to="/records" class="nav-list-item">历史</router-link>
            <router-link to="/mine" class="nav-list-item">我的OKR</router-link>
        </div>
        <div class="coatmain">
            <div class="Object-item">
                <span class="headline">目标 Object</span>
                <div class="text-content">
                    <p>{{aim}}</p>
                </div>
            </div>
            <div class="keyresult-item" v-for='(item,index) in list' :key='index'>
                <span class="headline">关键成果 Key Result</span>
                <div class="key-text-content">
                    <p>{{item.keyresult}}</p>
                </div>
            </div>
            <div class="decline-item">
                <span class="headline">OKR截止时间</span>
                <div class="data-item">
                    <div class="dataEnd">{{enact}}</div>
                    <div class="dataGood">
                        <i class="iconfont iconi-good"></i>
                        <p class="remainData" id="remainData">还有{{surplus}}天，要加油哦！</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="compile-btn">
        <button class="compile" @click='skip'>编辑</button>
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
        // 剩余时间
        surplus:'',
        enact:'',

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
        console.log(res.data.data.keyresults);
    if (res.data.code == 200) {
        this.basics = res.data.data.keyresults;
        let dom = this.basics;
        this.aim = res.data.data.objective;
        this.time = res.data.data.deadline;
        let future = new Date(res.data.data.deadline);
        let nowadays = (new Date()).getTime();
        console.log(future, res.data.data.deadline)
        let total = (future - nowadays)/1000;
        console.log(total);
        let day = parseInt(total / (24*60*60));
        console.log(day);
        let enact = new Date(future).toLocaleString().replace(/:\d{1,2}$/,' ');
        this.enact = enact;
        if (day < 0) {
            this.surplus = 0
        }else{
            this.surplus = day;
        }
        dom.forEach((item,index) => {
            let list = this.list;
            list.push(item);
        }) 
        }else if(res.data.code == 0){
        }
    }).catch( err => {
    })
  },
  methods:{
    skip:function(){
        let id = this.$route.query.id;
        let token = localStorage.getItem('todos');
        this.$router.push({name: 'compile',params:{id:id,csrf:token},query:{
            id: id
          }});
    },
  }
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
.headline {
    font-size: 0.36rem;
    font-family: "PingFang SC";
    color: rgb(0, 0, 0);
    line-height: 1.167;
}

.container-main-lookOKR {
    height: 100%;
    width: 86.7%;
    background: #fff;
    margin: 50px/@ppr auto;
    display: block;
    border-radius: 5px 5px 0 0;
    .nav-list{
        display: flex;
        justify-content: space-between;
        border-radius: 5px 5px 0 0;
        background-color:#a7cae4;
        height: 90px/@ppr;
        .nav-list-item{
            display: inline-block;
            text-align: center;
            line-height: 90px/@ppr;
            width: 33%;
            font-size: 28px/@ppr;
            vertical-align: top;
            margin: 0;
        }
        .nav-list-item:last-child{
            
            background-image: url(./../assets/image/lookOKR-link.png);
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    .coatmain {
       margin: 20px/@ppr 40px/@ppr;
       padding-bottom:188px/@ppr;
       .Object-item{
          .text-content{
            padding: 10px/@ppr;
            margin: 10px/@ppr 0;
            background-color: #f2f8fc;
            p{
              font-size: 28px/@ppr;
              font-family: "PingFang SC";
              color: rgb(51, 51, 51);
              }
          }
       }
       .keyresult-item{
          .key-text-content {
              padding: 10/@ppr;
              margin: 10/@ppr 0;
              background-color: #f2f8fc;
              p{
                font-size: 28px/@ppr;
                font-family: "PingFang SC";
                color: rgb(51, 51, 51);
              }
          }
       }
       .decline-item{
          .data-item {
              display: flex;
              justify-content: space-between;
              font-size: 28px/@ppr;
              background-color: #f2f8fc;
              height: 44px/@ppr;
              .dataEnd {
                  margin-left: 10px/@ppr;
              }
              .dataGood {
                  display: flex;
              }
          }
       }
    }
}
.compile-btn {
    width: 86.7%;
    margin: 0 auto;
    .compile{
      font-size: 32px/@ppr;
      width: 100%;
      background: #000;
      color: #fff;
      outline: none;
      height: 88px/@ppr;
    }
}
</style>