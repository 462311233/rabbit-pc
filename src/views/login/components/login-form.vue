<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <!-- 传入校验规则对象 -->
    <Form
      ref="target"
      class="form"
      :validation-schema="schema"
      v-slot="{ errors }"
    >
      <!-- 用户名 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />
            {{ errors.account }}
          </div>
        </div>
        <!-- 密码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />
            {{ errors.password }}
          </div>
        </div>
      </template>
      <!--手机号  -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />
            {{ errors.mobile }}
          </div>
        </div>
        <!-- 验证码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="text"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send">{{
              time === 0 ? '发送验证码' : `${time}秒后发送`
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />
            {{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" />
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning" />
          {{ errors.isAgree }}
        </div>
      </div>
      <a @click="login()" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, onUnmounted } from 'vue-demi'
//导入校验组件，Form, Field替换form和input 再给Field添加name属性对应校验规则
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema.js'
import {
  userAccountLogin,
  userMobileLogin,
  userMobileLoginMsg
} from '@/api/user.js'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import Message from '@/components/library/Message.js'
import { useIntervalFn } from '@vueuse/shared'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup() {
    //登陆方式切换
    const isMsgLogin = ref(false)
    //表单数据,给表单组件双向绑定
    const form = reactive({
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })
    //校验规则引用
    const mySchema = {
      account: schema.account,
      password: schema.password,
      mobile: schema.mobile,
      code: schema.code,
      isAgree: schema.isAgree
    }
    //监听登陆方式切换，重置表单数据
    watch(isMsgLogin, () => {
      // 还原数据
      form.isAgree = true
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
    })
    //获取Form表单dom,为了调用内置方法
    const target = ref(null)
    const store = useStore()
    //调用路由方法
    const router = useRouter()
    //拿去路由信息
    const route = useRoute()
    //登录时整体校验
    const login = async () => {
      //Form组件提供的校验方法,返回promise
      //调用组件的方法 await === promise.then(res)
      const valid = await target.value.validate()
      //如果格式正确则发送登录请求
      if (valid == true) {
        if (isMsgLogin.value == true) {
          //手机验证码登录
          const { mobile, code } = form
          userMobileLogin({ mobile, code })
            .then((data) => {
              const { id, account, avatar, mobile, nickname, token } =
                data.result
              //将接口返回的用户信息存储到vuex
              store.commit('user/setUser', {
                id,
                account,
                avatar,
                mobile,
                nickname,
                token
              })
              //跳转回登陆前页面
              router.push(route.query.redirectUrl || '/')
              Message({ type: 'success', text: '登陆成功！' })
            })
            .catch((error) => {
              //错误
              if (error.response.data) {
                Message({ type: 'error', text: error.response.data.message })
              }
            })
        } else {
          //解构帐号密码
          const { account, password } = form
          userAccountLogin(account, password)
            .then((data) => {
              const { id, account, avatar, mobile, nickname, token } =
                data.result
              //将接口返回的用户信息存储到vuex
              store.commit('user/setUser', {
                id,
                account,
                avatar,
                mobile,
                nickname,
                token
              })
              //跳转回登陆前页面
              router.push(route.query.redirectUrl || '/')
              Message({ type: 'success', text: '登陆成功！' })
            })
            .catch((error) => {
              //错误
              if (error.response.data) {
                Message({ type: 'error', text: error.response.data.message })
              }
            })
        }
      }
    }
    //定时器
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
      () => {
        if (time.value <= 0) {
          pause()
        } else {
          time.value--
        }
      },
      1000,
      false
    )
    onUnmounted(() => {
      pause()
    })
    //验证码发送
    const send = async () => {
      //将手机号提交给校验规则 返回true或者错误信息
      console.log(time.value)
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        //通过则发送验证码
        if (time.value === 0) {
          await userMobileLoginMsg(form.mobile)
          Message({ type: 'success', text: '发送成功' })
          //时间设置60秒开启定时器
          time.value = 60
          resume()
        }
      } else {
        //失败则显示错误信息,Form组件内置方法setFieldError
        target.value.setFieldError('mobile', valid)
      }
    }
    return { target, isMsgLogin, form, schema: mySchema, login, send, time }
  }
}
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
