<template>
  <div class="page-container premium-service">
    <!-- 顶部英雄区域 -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <svg class="badge-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>
          <span class="badge-text">至尊专享</span>
        </div>
        <h1 class="hero-title">国际高端康养</h1>
        <h2 class="hero-subtitle">干细胞至尊服务</h2>
        <p class="hero-desc">澳大利亚10日顶级康养之旅 · svCell干细胞再生疗法</p>
      </div>
    </div>

    <!-- 价格区域 -->
    <div class="price-section">
      <div class="price-card">
        <div class="price-label">服务费用</div>
        <div class="price-amount">
          <span class="currency">¥</span>
          <span class="number">500,000</span>
          <span class="unit">/次</span>
        </div>
        <div class="price-note">含全程医疗服务、高端住宿、专属陪同</div>
      </div>
    </div>

    <!-- 行程安排 -->
    <div class="section itinerary-section">
      <div class="section-header">
        <div class="section-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
        <h3 class="section-title">澳大利亚10日高端康养旅行</h3>
      </div>
      
      <div class="timeline">
        <div v-for="(day, index) in itinerary" :key="index" class="timeline-item">
          <div class="timeline-marker">
            <span class="day-number">{{ day.day }}</span>
          </div>
          <div class="timeline-content">
            <div class="day-label">{{ day.label }}</div>
            <div class="day-activity">{{ day.activity }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 干细胞疗法 -->
    <div class="section therapy-section">
      <div class="section-header">
        <div class="section-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 19c-1.1 0-2 .9-2 2h14c0-1.1-.9-2-2-2h-4v-2h3c1.1 0 2-.9 2-2h-8c-1.66 0-3-1.34-3-3 0-1.09.59-2.04 1.46-2.56C8.17 9.03 8 8.54 8 8c0-.21.02-.42.05-.62C6.83 8.36 6 9.84 6 11.5c0 2.21 1.79 4 4 4h.5v2H7v1.5zm5-15c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3 0 .35.06.69.17 1H9c-1.1 0-2 .9-2 2v1h2V8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v1h2V8c0-1.1-.9-2-2-2h-.17c.11-.31.17-.65.17-1 0-1.66-1.34-3-3-3z"/>
          </svg>
        </div>
        <h3 class="section-title">顶级干细胞再生疗法 svCell</h3>
      </div>

      <!-- 系统性诊疗 -->
      <div class="therapy-category">
        <div class="category-header">
          <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
          </svg>
          <span class="category-title">系统性诊疗</span>
        </div>
        <div class="therapy-grid">
          <div v-for="(item, index) in systematicTherapy" :key="index" class="therapy-item">
            <span class="therapy-number">{{ index + 1 }}</span>
            <span class="therapy-text">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- 综合性调理 -->
      <div class="therapy-category">
        <div class="category-header">
          <svg class="category-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.22 11.29l5.66-5.66c1.56-1.56 4.1-1.56 5.66 0l2.83 2.83c1.56 1.56 1.56 4.1 0 5.66l-5.66 5.66c-1.56 1.56-4.1 1.56-5.66 0l-2.83-2.83c-1.56-1.56-1.56-4.1 0-5.66zm1.41 4.24l2.83 2.83c.78.78 2.05.78 2.83 0l2.83-2.83-5.66-5.66-2.83 2.83c-.78.78-.78 2.05 0 2.83z"/>
          </svg>
          <span class="category-title">综合性调理</span>
        </div>
        <div class="therapy-list">
          <div v-for="(item, index) in comprehensiveTherapy" :key="index" class="therapy-detail-item">
            <span class="therapy-index">{{ index + 6 }}</span>
            <div class="therapy-detail-content">
              <div class="therapy-detail-title">{{ item.title }}</div>
              <div class="therapy-detail-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务特色 -->
    <div class="section features-section">
      <div class="section-header">
        <div class="section-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </div>
        <h3 class="section-title">至尊服务特色</h3>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="feature-title">全程专属陪同</div>
          <div class="feature-desc">私人健康管家全程陪护</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
          <div class="feature-title">五星级住宿</div>
          <div class="feature-desc">精选澳洲顶级酒店</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 8c-1.66 0-3 1.34-3 3 0 .79.31 1.5.81 2.03-.49 2.43-2.17 4.34-4.81 4.87V13c2.21 0 4-1.79 4-4V4h-2v5c0 1.1-.9 2-2 2s-2-.9-2-2V4H8v5c0 2.21 1.79 4 4 4v4.9c-2.64-.53-4.32-2.44-4.81-4.87.5-.53.81-1.24.81-2.03 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.31.84 2.41 2 2.83V15c0 3.52 2.94 6.5 6.5 6.5S17 18.52 17 15v-2.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3z"/>
            </svg>
          </div>
          <div class="feature-title">顶级医疗团队</div>
          <div class="feature-desc">澳洲权威专家诊疗</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 4.38C17.38 10.77 17.99 12 18 14H6z"/>
            </svg>
          </div>
          <div class="feature-title">康养结合</div>
          <div class="feature-desc">医疗与旅游完美融合</div>
        </div>
      </div>
    </div>

    <!-- 联系按钮 -->
    <div class="contact-section">
      <button class="contact-btn" @click="contactAdvisor">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span class="btn-text">联系专属健康顾问</span>
      </button>
      <p class="contact-note">专业顾问将在24小时内与您联系</p>
    </div>

    <!-- 返回按钮 -->
    <div class="back-section">
      <button class="back-btn" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        返回服务页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const itinerary = [
  { day: 1, label: '第一天', activity: '飞赴澳大利亚' },
  { day: 2, label: '第二天', activity: '参观旧国会、圣派翠克教堂、皇家植物园等景点' },
  { day: 3, label: '第三天', activity: '空腹全面体检、筛查，游览亚拉山谷' },
  { day: 4, label: '第四天', activity: '前往实验室进行干细胞治疗和全科诊疗' },
  { day: 5, label: '第五天', activity: '飞赴黄金海岸，漫步沙滩、海洋世界公园' },
  { day: 6, label: '第六天', activity: '前往澳洲天堂农场，喂袋鼠、剪羊毛' },
  { day: 7, label: '第七天', activity: '返回墨尔本，前往全科医生私人诊所复检' },
  { day: 8, label: '第八天', activity: '前往丹迪农山国家公园、菲利普岛' },
  { day: 9, label: '第九天', activity: '前往大洋路，身临驰名全球的海岸线风景' },
  { day: 10, label: '第十天', activity: '返回国内' }
]

const systematicTherapy = [
  '慢性病（三高）管理和辅助治疗',
  '泌尿生殖系统修复和重建',
  '退行性骨关节炎治疗',
  '皮肤再生与抗衰管理',
  '其他疾病'
]

const comprehensiveTherapy = [
  { title: '疑难病防治', desc: '清理炎症细胞，修复组织器官损伤' },
  { title: '慢性病调理', desc: '清除衰老细胞，恢复正常生理功能' },
  { title: '亚健康管理', desc: '分化功能性细胞，提高细胞活性' },
  { title: '免疫力提升', desc: '清理老化细胞，促进新陈代谢' },
  { title: '科学抗衰老', desc: '焕新全身器官细胞，恢复青春活力' }
]

const contactAdvisor = () => {
  // 跳转到消息页面或触发联系功能
  router.push('/messages')
}

const goBack = () => {
  router.push('/service-projects')
}
</script>

<style scoped>
.premium-service {
  padding-bottom: 100px;
  background: linear-gradient(180deg, #0a1628 0%, #1a2a4a 100%);
  min-height: 100vh;
}

/* 英雄区域 */
.hero-section {
  position: relative;
  height: 280px;
  background: 
    linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(26, 42, 74, 0.75) 100%),
    url('https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 30% 20%, rgba(201, 169, 98, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 80%, rgba(201, 169, 98, 0.1) 0%, transparent 40%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 20px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.3) 0%, rgba(201, 169, 98, 0.15) 100%);
  border: 1px solid rgba(201, 169, 98, 0.5);
  border-radius: 30px;
  margin-bottom: 16px;
}

.badge-icon {
  width: 18px;
  height: 18px;
  color: #C9A962;
}

.badge-text {
  font-size: 13px;
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 2px;
}

.hero-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
  letter-spacing: 4px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: 24px;
  font-weight: 600;
  color: #C9A962;
  margin: 0 0 12px 0;
  letter-spacing: 3px;
}

.hero-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  letter-spacing: 1px;
}

/* 价格区域 */
.price-section {
  padding: 0 16px;
  margin-top: -40px;
  position: relative;
  z-index: 2;
}

.price-card {
  background: linear-gradient(135deg, #1a2a4a 0%, #243656 100%);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.price-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.price-amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 8px;
}

.currency {
  font-size: 24px;
  font-weight: 600;
  color: #C9A962;
}

.number {
  font-size: 48px;
  font-weight: 700;
  color: #C9A962;
  letter-spacing: 2px;
  font-family: var(--font-display);
}

.unit {
  font-size: 16px;
  color: rgba(201, 169, 98, 0.7);
}

.price-note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 通用区块样式 */
.section {
  padding: 24px 16px;
  margin-top: 16px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.section-icon {
  width: 28px;
  height: 28px;
  color: #C9A962;
}

.section-icon svg {
  width: 100%;
  height: 100%;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: 1px;
}

/* 行程时间线 */
.timeline {
  position: relative;
  padding-left: 20px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #C9A962 0%, rgba(201, 169, 98, 0.3) 100%);
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 20px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: relative;
  z-index: 1;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(201, 169, 98, 0.4);
}

.day-number {
  font-size: 12px;
  font-weight: 700;
  color: #1a2a4a;
}

.timeline-content {
  flex: 1;
  padding-top: 4px;
}

.day-label {
  font-size: 12px;
  font-weight: 600;
  color: #C9A962;
  margin-bottom: 4px;
}

.day-activity {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

/* 疗法区域 */
.therapy-category {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.category-icon {
  width: 22px;
  height: 22px;
  color: #C9A962;
}

.category-title {
  font-size: 15px;
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 1px;
}

.therapy-grid {
  display: grid;
  gap: 10px;
}

.therapy-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(201, 169, 98, 0.08);
  border-radius: 8px;
}

.therapy-number {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #1a2a4a;
  flex-shrink: 0;
}

.therapy-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.therapy-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.therapy-detail-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: rgba(201, 169, 98, 0.08);
  border-radius: 8px;
}

.therapy-index {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #1a2a4a;
  flex-shrink: 0;
}

.therapy-detail-content {
  flex: 1;
}

.therapy-detail-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.therapy-detail-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

/* 特色区域 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(201, 169, 98, 0.08);
  border-color: rgba(201, 169, 98, 0.3);
  transform: translateY(-2px);
}

.feature-icon {
  width: 36px;
  height: 36px;
  margin: 0 auto 12px;
  color: #C9A962;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
}

.feature-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 联系区域 */
.contact-section {
  padding: 32px 16px;
  text-align: center;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  padding: 18px 32px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(201, 169, 98, 0.4);
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(201, 169, 98, 0.5);
}

.contact-btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 22px;
  height: 22px;
  color: #1a2a4a;
}

.btn-text {
  font-size: 16px;
  font-weight: 700;
  color: #1a2a4a;
  letter-spacing: 1px;
}

.contact-note {
  margin-top: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}

/* 返回按钮 */
.back-section {
  padding: 0 16px 32px;
  text-align: center;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

/* 移动端适配 */
@media (max-width: 375px) {
  .hero-title {
    font-size: 26px;
  }
  
  .hero-subtitle {
    font-size: 20px;
  }
  
  .number {
    font-size: 40px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
