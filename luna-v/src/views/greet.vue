<template>
<div class="section-background">
    <div class="background-color">
        <div class="luna-greet">
            <div class="luna-logo">
                <img class="luna-logo-image" src=".././assets/image/greet-logo.png">
            </div>
            <p class="luna-title">探月学院OKR</p>
            <div class="luna-desc-container">
                <p class="luna-desx-Chinese">我对阳光有信心。我对雨水有信心。我深信春天会再来。我对自己更有信心。</p>
                <p class="luna-desc-English">I have confidence in sunshine. I have confidence in rain. I have confidence that spring will come again. Besides which you see I have confidence in me.</p>
                <p class="luna-suffix">——音乐之声 The Sound of Music (1965)</p>
            </div>
            <div class="luna-button-container">
                <router-link to="/enter" class="luna-button">开启今天</router-link>
            </div>
            
        </div>
    </div>
    
</div>
</template>

<script>

export default {
  name: 'enter',
  methods:{

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

html,body{
    display:block;
    height: 100%;
    width: 100%;

    
}


.section-background{
    background-color: #000000;
    display:inline-block;
    width: 100%;
    height: 100%;
    .background-color{
        display:flex;
        align-items: center;
        justify-content:center;
        width: 100%;
        height: 100%;
        .luna-greet{
            background-color: #fff;
            display: inline-block;
            width: 652px/@ppr;
            border-radius: 30px;
            padding-bottom: 59px/@ppr;
            
            .luna-logo{
                width: 650px/@ppr;
                height: 307px/@ppr;
                margin-bottom: 30px/@ppr;
                .luna-logo-image{
                    display: inline-block;
                    width: 100%;;
                    height: 100%;
                }
            }
            .luna-title{
                display: block;
                text-align: left;
                font-size: 48px/@ppr;
                padding-left: 62px/@ppr;
                line-height: 48px/@ppr;
                color: #333;
                font-weight: 500;
                margin-bottom: 84px/@ppr;
            }
            .luna-desc-container{
                display: block;
                padding: 0 62px/@ppr;
                text-align: left;
                position: relative;
                .luna-desx-Chinese{
                    font-size: 28px/@ppr;
                    color: #333;
                    line-height: 40px/@ppr;
                }
                .luna-desc-English{
                    margin-top: 30px/@ppr;
                    font-size: 28px/@ppr;
                    color: #333;
                    line-height: 40px/@ppr;
                }
                .luna-suffix{
                    display: block;
                    margin-top:30px/@ppr;
                    font-size: 24px/@ppr;
                    text-align: right;
                    color: #666666;
                }
            }
            .luna-desc-container:before{
                content: '';
                display: inline-block;
                width: 50px/@ppr;
                height: 2px/@ppr;
                background-color:#333;
                position: absolute;
                left: 62px/@ppr;
                top: -26px/@ppr;
            }
            .luna-button-container{
                display:flex;
                margin-top: 74px/@ppr;
                justify-content:center;
                .luna-button{
                    
                    background-color: #333;
                    display: inline-block;
                    text-decoration:none;
                    color: #fff;
                    width: 530px/@ppr;
                    height: 90px/@ppr;
                    font-size: 32px/@ppr;
                    line-height: 88px/@ppr;
                    text-align: center;
                    border-radius: 5px;
                    margin:0 auto;
                }
            }
            
        }
    }
    
}



</style>
