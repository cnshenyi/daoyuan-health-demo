<template>
  <div class="page-container profile-page">
    <!-- 用户头像和基本信息 -->
    <div class="profile-header">
      <div class="avatar-section">
        <el-avatar :size="100" :src="userStore.user?.avatar" />
        <div class="member-badge">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
          <span>至尊会员</span>
        </div>
      </div>
      <h2 class="user-name">{{ healthStore.memberInfo.name }}</h2>
      <p class="user-id">会员编号：{{ getMemberNo() }}</p>
    </div>

    <!-- 基本信息卡片 -->
    <div class="info-section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <h3 class="section-title">基本信息</h3>
      </div>
      
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">姓名</span>
          <span class="info-value">{{ healthStore.memberInfo.name }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">年龄</span>
          <span class="info-value">{{ healthStore.memberInfo.age }}岁</span>
        </div>
        <div class="info-item">
          <span class="info-label">性别</span>
          <span class="info-value">{{ healthStore.memberInfo.gender === 'male' ? '男' : '女' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">职业</span>
          <span class="info-value">{{ healthStore.memberInfo.occupation }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">婚姻状况</span>
          <span class="info-value">{{ healthStore.memberInfo.maritalStatus }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">联系电话</span>
          <span class="info-value">{{ userStore.user?.phone }}</span>
        </div>
      </div>
    </div>

    <!-- 会员信息卡片 -->
    <div class="info-section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
        <h3 class="section-title">会员信息</h3>
      </div>
      
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">会员等级</span>
          <span class="info-value highlight">至尊会员</span>
        </div>
        <div class="info-item">
          <span class="info-label">入会日期</span>
          <span class="info-value">{{ healthStore.memberInfo.joinDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">会员费用</span>
          <span class="info-value">¥{{ formatPrice(healthStore.memberInfo.membershipFee) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">有效期至</span>
          <span class="info-value">2026-06-01</span>
        </div>
      </div>
    </div>

    <!-- 健康档案摘要 -->
    <div class="info-section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
        </svg>
        <h3 class="section-title">健康档案摘要</h3>
      </div>
      
      <div class="info-card">
        <div class="info-item">
          <span class="info-label">过敏史</span>
          <span class="info-value">{{ healthStore.medicalHistory.allergies?.join('、') || '无' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">慢性病</span>
          <span class="info-value">{{ getChronicDiseases() }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">当前用药</span>
          <span class="info-value">{{ healthStore.medicalHistory.medicationHistory?.length || 0 }}种</span>
        </div>
      </div>
      
      <button class="view-more-btn" @click="goToHealthRecords">
        <span>查看完整健康档案</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>

    <!-- 专属服务团队 -->
    <div class="info-section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
        <h3 class="section-title">专属服务团队</h3>
      </div>
      
      <div class="team-card">
        <div class="team-member">
          <div class="member-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="member-info">
            <div class="member-name">李医生</div>
            <div class="member-role">主治医师</div>
          </div>
          <button class="contact-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>
        </div>
        <div class="team-member">
          <div class="member-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="member-info">
            <div class="member-name">王顾问</div>
            <div class="member-role">健康管家</div>
          </div>
          <button class="contact-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 设置选项 -->
    <div class="settings-section">
      <div class="settings-item">
        <div class="settings-left">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          <span>消息通知</span>
        </div>
        <el-switch v-model="notifications" />
      </div>
      <div class="settings-item" @click="goToMessages">
        <div class="settings-left">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          <span>我的消息</span>
        </div>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
      <div class="settings-item" @click="goToMembership">
        <div class="settings-left">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          <span>会员权益</span>
        </div>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout-section">
      <button class="logout-btn" @click="handleLogout">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        <span>退出登录</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useHealthStore } from '@/stores/health'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const healthStore = useHealthStore()

const notifications = ref(true)

const getMemberNo = () => {
  return 'DY' + String(healthStore.memberInfo.age * 1000 + 2025).padStart(8, '0')
}

const formatPrice = (price: number) => {
  return price.toLocaleString('zh-CN')
}

const getChronicDiseases = () => {
  const diseases = healthStore.medicalHistory.pastIllnesses || []
  if (diseases.length === 0) return '无'
  return diseases.slice(0, 2).map(d => d.split('（')[0]).join('、')
}

const goToHealthRecords = () => {
  router.push('/health-records')
}

const goToMessages = () => {
  router.push('/messages')
}

const goToMembership = () => {
  router.push('/membership-benefits')
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('退出登录成功')
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  padding-bottom: 100px;
}

/* 头部区域 */
.profile-header {
  text-align: center;
  padding: 32px 16px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  margin: calc(-1 * var(--spacing-lg)) calc(-1 * var(--spacing-lg)) var(--spacing-lg);
  border-radius: 0 0 24px 24px;
}

.avatar-section {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-section :deep(.el-avatar) {
  border: 3px solid rgba(201, 169, 98, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.member-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border-radius: 12px;
  white-space: nowrap;
}

.member-badge svg {
  width: 14px;
  height: 14px;
  color: #1a2a4a;
}

.member-badge span {
  font-size: 11px;
  font-weight: 600;
  color: #1a2a4a;
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
}

.user-id {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* 信息区块 */
.info-section {
  margin-bottom: 20px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.section-icon {
  width: 22px;
  height: 22px;
  color: #C9A962;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0;
}

.info-card {
  background: var(--color-bg-secondary);
  border-radius: 12px;
  padding: 4px 0;
  box-shadow: var(--shadow-sm);
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: var(--color-text-tertiary);
}

.info-value {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.info-value.highlight {
  color: #C9A962;
  font-weight: 600;
}

.view-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 8px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  background: var(--color-primary-alpha);
}

.view-more-btn svg {
  width: 16px;
  height: 16px;
}

/* 团队卡片 */
.team-card {
  background: var(--color-bg-secondary);
  border-radius: 12px;
  padding: 8px;
  box-shadow: var(--shadow-sm);
}

.team-member {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.team-member:hover {
  background: var(--color-bg-tertiary);
}

.member-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-avatar svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.member-info {
  flex: 1;
}

.member-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.member-role {
  font-size: 12px;
  color: var(--color-text-tertiary);
}

.contact-btn {
  width: 36px;
  height: 36px;
  background: var(--color-accent-alpha);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: var(--color-accent);
}

.contact-btn:hover svg {
  color: #fff;
}

.contact-btn svg {
  width: 18px;
  height: 18px;
  color: var(--color-accent);
}

/* 设置区域 */
.settings-section {
  background: var(--color-bg-secondary);
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: var(--shadow-sm);
}

.settings-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border-light);
  cursor: pointer;
  transition: background 0.2s ease;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item:hover {
  background: var(--color-bg-tertiary);
}

.settings-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.settings-left svg {
  width: 22px;
  height: 22px;
  color: var(--color-text-tertiary);
}

.settings-left span {
  font-size: 15px;
  color: var(--color-text-primary);
}

.arrow-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text-tertiary);
}

/* 退出登录 */
.logout-section {
  padding: 0 16px;
}

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: transparent;
  border: 1px solid var(--color-danger);
  border-radius: 12px;
  color: var(--color-danger);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: var(--color-danger);
  color: #fff;
}

.logout-btn svg {
  width: 20px;
  height: 20px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .profile-header {
    margin: -16px -16px 16px;
  }
}
</style>
