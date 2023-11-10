<template>
  <div class="account-root">
    <div class="account-root-item  root-left-item">
      <div>
        <div class="root-left-logo"></div>
        <div class="root-left-title">医院在线管理系统</div>
        <div class="root-left-desc">在线管理医院机构，在线挂号</div>
        <div class="coding-img">
          <img src="~@/assets/images/medicine-b1ol.png">
        </div>
      </div>
    </div>
    <div class="account-root-item  root-right-item">
      <div class="account-form">
        <div class="account-top">
          <div class="user-account">登陆你的账户</div>
          <div class="user-register">
            <span>没有账户？</span>
            <n-button text type="primary" size="medium" icon-placement="right">
              免费注册
              <template #icon>
                <n-icon>
                  <RightCircleFilled />
                </n-icon>
              </template>
            </n-button>
          </div>
        </div>
        <div class="account-tabs">
          <n-tabs type="segment" v-model:value="loginType" pane-style="margin-top:12px">
            <n-tab-pane name="account" tab="账号密码登陆">
              <n-form ref="accountLoginformRef" :model="model" :rules="rules" label-placement="top" :show-label="false">
                <n-form-item label="" path="account">
                  <n-input v-model:value="model.account" placeholder="请输入账号">
                    <template #prefix>
                      <n-icon :component="UserOutlined" />
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item label="" path="password">
                  <n-input type="password" v-model:value="model.password" placeholder="请输入密码">
                    <template #prefix>
                      <n-icon :component="LockOutlined" />
                    </template>
                  </n-input>
                </n-form-item>
                <div class="mb6 flex justify-between">
                  <div class="auto-login">
                    <n-checkbox v-model:checked="autoLogin">自动登陆</n-checkbox>
                  </div>
                  <div class="forget-pwd">忘记密码？</div>
                </div>
                <n-form-item>
                  <n-button block type="info" @click="handleAccountLogin" :loading="loading">登陆</n-button>
                </n-form-item>
              </n-form>
            </n-tab-pane>
            <n-tab-pane name="code" tab="手机验证码登陆">
              <n-form ref="codeLoginformRef" :model="model" :rules="rules" label-placement="top" :show-label="false">
                <n-form-item label="" path="phone">
                  <n-input v-model:value="model.account" placeholder="输入手机号码">
                    <template #prefix>
                      <n-icon :component="MobileOutlined" />
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item label="" path="checkCode">
                  <n-input v-model:value="model.password" placeholder="输入验证码">
                    <template #prefix>
                      <n-icon :component="SafetyOutlined" />
                    </template>
                    <template #suffix>
                      <n-button text type="info">获取验证码</n-button>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item>
                  <n-button block type="info" @click="handleCodeLogin" :loading="loading">登陆</n-button>
                </n-form-item>
              </n-form>
            </n-tab-pane>
          </n-tabs>
        </div>
        <n-divider class="login-type" title-placement="center">其他登陆方式</n-divider>
        <div class="pb-8">
          <n-space justify="space-between">
            <n-button circle type="tertiary">
              <template #icon>
                <n-icon size="20" :component="WechatFilled" />
              </template>
            </n-button>
            <n-button circle type="tertiary">
              <template #icon>
                <n-icon size="20" :component="QqCircleFilled" />
              </template>
            </n-button>
            <n-button circle type="tertiary">
              <template #icon>
                <n-icon size="20" :component="AlipayCircleFilled" />
              </template>
            </n-button>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { RightCircleFilled, UserOutlined, LockOutlined, MobileOutlined, SafetyOutlined, WechatFilled, QqCircleFilled, AlipayCircleFilled } from '@vicons/antd'
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import { useMessage } from 'naive-ui';
import { ResultEnum } from '@/enums/httpEnum';
import { PageEnum } from '@/enums/pageEnum'
import { useRoute, useRouter } from 'vue-router';
const rules = reactive({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  checkCode: [{ required: true, message: '验证码不能为空' }]
})

const message = useMessage()
const loading = ref(false);
const userStore = useUserStore()
const autoLogin = ref(true);
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME

const accountLoginformRef = ref(null)
const codeLoginformRef = ref(null)
const loginType = ref('account')
const model = reactive({
  account: 'admin',
  password: '123456'
})

const router = useRouter();
const route = useRoute();

// 账号密码登陆
const handleAccountLogin = (e) => {
  e.preventDefault()
  // 验证账号密码格式
  accountLoginformRef.value.validate(async (errors) => {
    if (errors) {
      return message.error('请填写完整信息，并且进行验证码校验');
    }
    // 验证通过
    const { account, password } = model
    message.loading('登陆中')
    loading.value = true
    try {
      const params = {
        account,
        password
      }
      // 发起登陆请求
      const { code, message: msg } = await userStore.login(params);
      if (code == ResultEnum.SUCCESS) {
        const toPath = decodeURIComponent((route.query?.redirect || '/'));
        message.success('登录成功，即将进入系统');
        if (route.name === LOGIN_NAME) {
          router.replace('/');
        } else router.replace(toPath);
      } else {
        message.info(msg || '登录失败');
      }
      message.destroyAll();
    } finally {
      loading.value = false;
    }
  })
}

// 验证码登陆
const handleCodeLogin = () => {

}
</script>
  
<style lang="less" scoped>
.account-root {
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  height: 100vh;

  .account-root-item {
    box-sizing: border-box;
    margin: 0;
    flex-direction: row;
    flex-grow: 0;

    &.root-left-item {
      width: 780px;
      display: flex;
      align-items: center;
      padding: 20px 0;
      background: linear-gradient(140.02deg, #f9f9fa, #f7f8ff);

      .root-left-logo {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .root-left-title {
        height: 80px;
        margin: 0 auto;
        font-weight: 600;
        font-size: 1.5rem;
        line-height: 80px;
        color: #333;
        text-align: center;
      }

      .root-left-desc {
        height: 34px;
        margin: 0 auto;
        font-size: 1.1rem;
        line-height: 34px;
        text-align: center;
        color: #666;
      }

      .coding-img {
        width: 70%;
        margin: 50px auto 20px;
      }
    }

    &.root-right-item {
      flex: 1 1;
      background: #fff;
      box-sizing: border-box;
      flex-flow: row wrap;
      display: flex;
      justify-content: center;
      align-items: center;

      .account-form {
        width: 348px;

        .account-top {
          text-align: left;
          margin: 20px 0;

          .user-account {
            font-family: SourceHanSansCN_Bold;
            color: #333;
            font-size: 1.5rem;
            line-height: 30px;
            margin-bottom: 5px;
          }

          .user-register {
            span {
              opacity: .7;
              margin-right: 10px;
            }
          }
        }

        .login-type {
          opacity: .5;
        }
      }
    }
  }
}

.mb6 {
  margin-bottom: 1.5rem;
}

.pb-8 {
  padding-bottom: 2rem !important;
}

.justify-between {
  justify-content: space-between;
}

@media (min-width: 600px) {
  .account-root-item {
    flex-basis: 100%;
    flex-grow: 0;
    max-width: 100%;
  }
}

@media (min-width: 1200px) {
  .account-root-item {
    flex-basis: 40%;
    flex-grow: 0;
    max-width: 40%;

    &.root-right-item {
      flex-basis: 60%;
      flex-grow: 0;
      max-width: 60%;

      .account-form {
        flex-basis: 32%;
        flex-grow: 0;
        max-width: 32%;
      }
    }
  }
}
</style>
