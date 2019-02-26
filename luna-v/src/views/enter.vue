<template>
<div class="luna-section">
    <div class="luna-container">
        <div class="luna-logo">
            <img src="./../assets/image/emter-logo.png" class="logo-image">
        </div>
        <div class="luna-name-input">
            <div class="name-image">
                <img src="./../assets/image/emter-name.png" class="name-map">
            </div>
            <input type="text" class="name-input" placeholder="请输入用户名称" v-model='name'>
        </div>
        <div class="luna-code-input">
            <div class="luna-code-image">
                <img src="./../assets/image/emter-code.png" class="luna-code-map">
            </div>  
            <input class="code-input" placeholder="请输入密码" v-model='code'  type="password" >
        </div>
        <div class="show" >
            <div class="luna-input-slip" v-show='vanish'>
                <div class="luna-slip-image">
                    <img src="./../assets/image/emter-slip.png" class="luna-slip-map">
                </div>
                <p class="slip-title">{{err}}</p>
            </div>
        </div>
        <button class="luna-enter" @click='judge'>登录</button>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: 'enter',
  data(){
    return {
        name:'',
        code:'',
        vanish:false,
        err:''
    }
    
  },
  methods:{
    judge:function(){
        let name = this.name == '';
        let code = this.code == '';
        let namev = this.name;
        let codev = this.code;
        if (!name & !code) {
            this.vanish = false;
            let URL = 'http://localhost:3000/api/login';
            axios.post(URL,{
                name: namev,
                password: codev,
            }).then(res => {
                if (res.data.code == 200) {
                   this.err =  res.data.message;
                   this.vanish = true;
                }else if(res.data.code == 0){
                    this.err =  res.data.data.msg;
                    this.vanish = true;
                }
            }).catch( err => {
            this.err = "用户名或密码错误，请重新输入";
              this.vanish = true;
            })
        }else if (!name || !code) {
            this.err = "用户名或密码错误，请重新输入";
            this.vanish = true;
        }else{
            this.err = "用户名或密码错误，请重新输入";
            this.vanish = true;
        }
    }
  },
  components: {

  },
};
</script>
<style lang="less">
@divide: 10;
@pswWidth: 750px;
@ppr: @pswWidth/@divide/1rem;

*{
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
}
html body{
    height: 100%;
    width: 100%;


}
.luna-section{
    background-color: #fff;
    height: 100%;
    width: 100%;
    display:flex;
    align-items: center;
    .luna-container{
        text-align: center;
        padding: 150px/@ppr 0 124px/@ppr;
        .luna-logo{
            width: 200px/@ppr;
            height: 200px/@ppr;
            .logo-image{
                display: block;
                text-align: center;
                width: 100%;
                width: 100%;
                
            }
        }
        .luna-name-input{
            margin-top:142px/@ppr;
            padding:0 30px/@ppr;
            position: relative;
            height: 68px/@ppr;
            .name-image{
                display:inline-block;
                width: 30px/@ppr;
                height: 27px/@ppr;
                vertical-align: top;
                font-size: 0;
                .name-map{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .name-input{
                display: inline-block;
                height: 30px/@ppr;
                width: 600px/@ppr;
                border: none;
                vertical-align: top;
                outline: none;
                font-size: 28px/@ppr;
                margin-left:30px/@ppr;


            }
        }
        .luna-name-input:before{
            content: '';
            display: inline-block;
            width: 690px/@ppr;
            height: 2px/@ppr;
            background-color: #333;
            position: absolute;
            bottom: 0;
            left: 30px/@ppr;


        }
        .luna-code-input{
            margin-top:37px/@ppr;
            padding:0 30px/@ppr;
            position: relative;
            height: 68px/@ppr;
            .luna-code-image{
                display:inline-block;
                width: 30px/@ppr;
                height: 38px/@ppr;
                vertical-align: top;
                font-size: 0;
                .luna-code-map{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }
            .code-input{
                display: inline-block;
                height: 30px/@ppr;
                width: 600px/@ppr;
                border: none;
                vertical-align: top;
                outline: none;
                font-size: 28px/@ppr;
                margin-left:30px/@ppr;

            }
        }
        .luna-code-input:before{
            content: '';
            display: inline-block;
            width: 690px/@ppr;
            height: 2px/@ppr;
            background-color: #333;
            position: absolute;
            bottom: 0;
            left: 30px/@ppr;


        }
        .show{
            height: 24px/@ppr;
            margin-top:30px/@ppr;
            .luna-input-slip{
                text-align: left;
                padding-left: 30px/@ppr;
                margin-top:30px/@ppr;
                display: block;
                font-size: 0;
                .luna-slip-image{
                    display: inline-block;
                    width: 24px/@ppr;
                    height: 24px/@ppr;
                    .luna-slip-map{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }

                }
                .slip-title{
                    display: inline-block;
                    font-size: 28px/@ppr;
                    color:#ff1d25;
                    margin-left: 8px/@ppr;
                }
            }
        }
        .vanish{
            height: 24px/@ppr;
            margin-top:30px/@ppr;
            .luna-input-slip{
                display: none;
            }
        }
        .luna-enter{
            margin-top: 170px/@ppr;
            width:690px/@ppr;
            height: 88px/@ppr;
            background-color: #000;
            display: inline-block;
            border-radius: 5px;
            font-size: 32px/@ppr;
            color: #fff;
            outline: none;
        }
    }
}







</style>