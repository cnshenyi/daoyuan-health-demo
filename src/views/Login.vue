<template>
  <div class="login-page">
    <!-- 顶部深蓝色区域 + Logo -->
    <div class="login-header">
      <img src="/images/logo-white.png" alt="道远医疗" class="logo-image" />
    </div>

    <!-- 登录表单区域 -->
    <div class="login-body">
      <!-- 步骤一：手机号 + 验证码 -->
      <template v-if="step === 1">
        <h2 class="login-title">登录</h2>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="login-form"
          @submit.prevent="handleNextStep"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              maxlength="11"
              clearable
            >
              <template #prefix>
                <el-icon class="input-icon"><Phone /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="code">
            <div class="code-row">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                maxlength="6"
                clearable
                @keyup.enter="handleNextStep"
              >
                <template #prefix>
                  <el-icon class="input-icon"><Key /></el-icon>
                </template>
              </el-input>
              <el-button
                class="send-code-btn"
                :disabled="codeSent"
                @click="handleSendCode"
              >
                {{ codeSent ? `${countdown}s后重发` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>

          <div v-if="mockCode" class="code-hint">
            <span class="hint-icon">📱</span>
            <span>演示验证码：<strong class="code-value">{{ mockCode }}</strong></span>
          </div>

          <el-form-item style="margin-top: 4px;">
            <el-button
              type="primary"
              class="login-button"
              @click="handleNextStep"
            >
              下一步
            </el-button>
          </el-form-item>
        </el-form>

        <div class="demo-notice">
          <span class="notice-dot"></span>
          <span>演示模式：输入任意手机号，点击获取验证码</span>
        </div>
      </template>

      <!-- 步骤二：选择角色 -->
      <template v-if="step === 2">
        <h2 class="login-title">选择身份</h2>

        <div class="role-grid">
          <div
            v-for="item in roleOptions"
            :key="item.role"
            :class="['role-card', { active: selectedRole === item.role }]"
            @click="selectedRole = item.role"
          >
            <span class="role-icon">{{ item.icon }}</span>
            <span class="role-label">{{ item.label }}</span>
            <span class="role-desc">{{ item.description }}</span>
            <span v-if="selectedRole === item.role" class="role-check">✓</span>
          </div>
        </div>

        <div class="step2-actions">
          <el-button class="back-button" @click="step = 1">返回</el-button>
          <el-button
            type="primary"
            :loading="loading"
            class="login-button"
            :disabled="!selectedRole"
            @click="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登录中...</span>
          </el-button>
        </div>
      </template>
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
import { Phone, Key } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { UserRole } from '@/types'
import { roleOptions } from '@/mock/data'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const codeSent = ref(false)
const countdown = ref(60)
const mockCode = ref('')
const step = ref(1)
const selectedRole = ref<UserRole>('member')
let countdownTimer: ReturnType<typeof setInterval> | null = null

const loginForm = reactive({
  phone: '',
  code: ''
})

const validatePhone = (_rule: unknown, value: string, callback: (err?: Error) => void) => {
  if (!value) {
    callback(new Error('请输入手机号'))
  } else if (!/^1[3-9]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 6, max: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
}

const generateCode = () => {
  return String(Math.floor(100000 + Math.random() * 900000))
}

const handleSendCode = async () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validateField('phone', (valid) => {
    if (valid) {
      const code = generateCode()
      mockCode.value = code
      codeSent.value = true
      countdown.value = 60

      ElMessage.success('验证码已发送（演示模式）')

      countdownTimer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          clearInterval(countdownTimer!)
          codeSent.value = false
        }
      }, 1000)
    }
  })
}

const handleNextStep = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate((valid) => {
    if (valid) {
      step.value = 2
    }
  })
}

const roleHomeMap: Record<UserRole, string> = {
  member: '/',
  'health-manager': '/manager',
  doctor: '/doctor',
  wellness: '/wellness',
  'mental-education': '/mental'
}

const handleLogin = async () => {
  loading.value = true

  setTimeout(() => {
    const success = userStore.loginWithPhone(loginForm.phone, loginForm.code, selectedRole.value)

    if (success) {
      ElMessage.success('登录成功')
      router.push(roleHomeMap[selectedRole.value])
    } else {
      ElMessage.error('登录失败，请重试')
    }

    loading.value = false
  }, 600)
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
  padding: 28px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.logo-image {
  width: 160px;
  height: auto;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
}

/* 登录表单区域 */
.login-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
}

.login-title {
  font-size: 18px;
  font-weight: 600;
  color: #1E3A5F;
  margin: 0 0 16px 0;
  text-align: center;
  letter-spacing: 2px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 14px;
}

.login-form :deep(.el-input__wrapper) {
  padding: 0 12px;
  height: 40px;
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

/* 验证码行 */
.code-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.code-row .el-input {
  flex: 1;
}

.send-code-btn {
  flex-shrink: 0;
  white-space: nowrap;
  height: 40px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 500;
  background: #1E3A5F;
  border: none;
  border-radius: 8px;
  color: #C9A962;
  transition: all 0.3s;
}

.send-code-btn:hover:not(:disabled) {
  background: #2a4a6f;
  color: #D4B87A;
}

.send-code-btn:disabled {
  background: #e0e0e0;
  color: #999;
  cursor: not-allowed;
}

/* 验证码提示框 */
.code-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(201,169,98,0.12) 0%, rgba(212,184,122,0.08) 100%);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
  animation: fadeIn 0.3s ease;
}

.hint-icon {
  font-size: 16px;
}

.code-value {
  font-size: 18px;
  font-weight: 700;
  color: #1E3A5F;
  letter-spacing: 4px;
  margin-left: 4px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-button {
  width: 100%;
  height: 42px;
  font-size: 15px;
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

/* ========================================
   角色选择网格
   ======================================== */
.role-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.role-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #fff;
  border: 2px solid #e8e8e8;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
}

.role-card:hover {
  border-color: #C9A962;
  background: rgba(201, 169, 98, 0.04);
}

.role-card.active {
  border-color: #C9A962;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.08) 0%, rgba(201, 169, 98, 0.04) 100%);
  box-shadow: 0 2px 8px rgba(201, 169, 98, 0.2);
}

.role-icon {
  font-size: 24px;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 58, 95, 0.06);
  border-radius: 8px;
}

.role-label {
  font-size: 15px;
  font-weight: 600;
  color: #1E3A5F;
  white-space: nowrap;
}

.role-desc {
  font-size: 12px;
  color: #999;
  flex: 1;
}

.role-check {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: #C9A962;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

/* 步骤二操作按钮 */
.step2-actions {
  display: flex;
  gap: 10px;
}

.back-button {
  height: 42px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  background: #fff;
  border: 1px solid #ddd;
  color: #666;
  flex-shrink: 0;
}

.back-button:hover {
  border-color: #1E3A5F;
  color: #1E3A5F;
}

/* 演示提示 */
.demo-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgba(46, 139, 87, 0.08);
  border-radius: 6px;
  margin-top: 12px;
  font-size: 12px;
  color: #666;
}

.notice-dot {
  width: 6px;
  height: 6px;
  background: #2E8B57;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}

/* 底部品牌文字 */
.login-footer {
  background: linear-gradient(135deg, #1E3A5F 0%, #2a4a6f 100%);
  padding: 12px 20px;
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
    padding: 24px 16px;
  }

  .logo-image {
    width: 140px;
  }

  .login-body {
    padding: 16px 16px;
  }

  .login-form :deep(.el-input__wrapper) {
    padding: 0 10px;
    height: 38px;
  }

  .send-code-btn {
    height: 38px;
    padding: 0 12px;
    font-size: 12px;
  }

  .login-button {
    height: 40px;
    font-size: 14px;
  }

  .role-card {
    padding: 10px 12px;
  }

  .login-footer {
    padding: 10px 16px;
  }

  .login-footer p {
    font-size: 11px;
  }
}
</style>
