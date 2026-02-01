<template>
  <div class="login-page">
    <!-- 顶部深蓝色区域 + Logo -->
    <div class="login-header">
      <img src="/images/logo-white.png" alt="道远医疗" class="logo-image" />
    </div>

    <!-- 登录表单区域 -->
    <div class="login-body">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            clearable
          >
            <template #prefix>
              <el-icon class="input-icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            clearable
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <el-icon class="input-icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 演示提示 -->
      <div class="demo-notice">
        <span class="notice-dot"></span>
        <span>演示账号：用户名和密码可任意输入</span>
      </div>
    </div>

    <!-- 底部品牌文字 -->
    <div class="login-footer">
      <p>澳大利亚道远医疗预防保健集团</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      setTimeout(() => {
        const success = userStore.login(loginForm.username, loginForm.password)

        if (success) {
          ElMessage.success('登录成功')
          router.push('/')
        } else {
          ElMessage.error('登录失败')
        }

        loading.value = false
      }, 500)
    }
  })
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  background: #f5f7fa;
  overflow: hidden;
}

/* 顶部深蓝色区域 */
.login-header {
  background: linear-gradient(135deg, #1E3A5F 0%, #2a4a6f 100%);
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo-image {
  width: 200px;
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* 登录表单区域 */
.login-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 20px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 16px;
}

.login-form :deep(.el-input__wrapper) {
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  background: #fff;
  transition: all 0.3s;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: #1E3A5F;
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #1E3A5F;
  box-shadow: 0 0 0 2px rgba(30, 58, 95, 0.1);
}

.login-form :deep(.el-input__inner) {
  font-size: 15px;
  color: #333;
}

.input-icon {
  color: #1E3A5F;
  font-size: 18px;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border: none;
  border-radius: 8px;
  color: #1E3A5F;
  letter-spacing: 4px;
  box-shadow: 0 4px 12px rgba(201, 169, 98, 0.3);
  transition: all 0.3s;
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(201, 169, 98, 0.4);
}

/* 演示提示 */
.demo-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: rgba(46, 139, 87, 0.08);
  border-radius: 6px;
  margin-top: 16px;
  font-size: 13px;
  color: #666;
}

.notice-dot {
  width: 6px;
  height: 6px;
  background: #2E8B57;
  border-radius: 50%;
  margin-right: 8px;
}

/* 底部品牌文字 */
.login-footer {
  background: linear-gradient(135deg, #1E3A5F 0%, #2a4a6f 100%);
  padding: 16px 20px;
  text-align: center;
  flex-shrink: 0;
}

.login-footer p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  letter-spacing: 1px;
  margin: 0;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .login-header {
    padding: 32px 16px;
  }

  .logo-image {
    width: 160px;
  }

  .login-body {
    padding: 20px 16px;
  }

  .login-form :deep(.el-input__wrapper) {
    padding: 10px 14px;
  }

  .login-button {
    height: 44px;
    font-size: 15px;
  }

  .login-footer {
    padding: 14px 16px;
  }

  .login-footer p {
    font-size: 11px;
  }
}
</style>
