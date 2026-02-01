<template>
  <div class="page-container premium-service">
    <!-- 顶部英雄区域 -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">👑</span>
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
        <div class="section-icon">✈️</div>
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
        <div class="section-icon">🔬</div>
        <h3 class="section-title">顶级干细胞再生疗法 svCell</h3>
      </div>

      <!-- 系统性诊疗 -->
      <div class="therapy-category">
        <div class="category-header">
          <span class="category-icon">🏥</span>
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
          <span class="category-icon">💊</span>
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
        <div class="section-icon">⭐</div>
        <h3 class="section-title">至尊服务特色</h3>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🛫</div>
          <div class="feature-title">全程专属陪同</div>
          <div class="feature-desc">私人健康管家全程陪护</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏨</div>
          <div class="feature-title">五星级住宿</div>
          <div class="feature-desc">精选澳洲顶级酒店</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">👨‍⚕️</div>
          <div class="feature-title">顶级医疗团队</div>
          <div class="feature-desc">澳洲权威专家诊疗</div>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌿</div>
          <div class="feature-title">康养结合</div>
          <div class="feature-desc">医疗与旅游完美融合</div>
        </div>
      </div>
    </div>

    <!-- 联系按钮 -->
    <div class="contact-section">
      <button class="contact-btn" @click="contactAdvisor">
        <span class="btn-icon">📞</span>
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
  font-size: 16px;
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
  font-size: 24px;
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
  font-size: 20px;
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
  font-size: 32px;
  margin-bottom: 12px;
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
  font-size: 20px;
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
