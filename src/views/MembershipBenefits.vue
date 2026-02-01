<template>
  <div class="page-container membership-benefits">
    <!-- 会员等级展示 -->
    <div class="membership-hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="level-badge">
          <span class="badge-icon">♦</span>
          <span class="badge-text">{{ healthStore.memberInfo.membershipType === 'premium' ? '至尊会员' : '尊享会员' }}</span>
        </div>
        <h2 class="hero-title">{{ healthStore.memberInfo.name }}</h2>
        <p class="hero-subtitle">尊享全方位健康管理服务</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-value">10</span>
            <span class="stat-label">项核心服务</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">365</span>
            <span class="stat-label">天全程守护</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">24h</span>
            <span class="stat-label">专属响应</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 核心权益 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">核心权益</h3>
        <span class="section-badge">专属特权</span>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card" v-for="benefit in coreBenefits" :key="benefit.title">
          <div class="benefit-icon">
            <component :is="benefit.icon" />
          </div>
          <div class="benefit-content">
            <h4 class="benefit-title">{{ benefit.title }}</h4>
            <p class="benefit-desc">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务项目详情 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">十大服务项目</h3>
        <span class="section-badge">全面覆盖</span>
      </div>
      <div class="services-list">
        <div class="service-detail" v-for="(service, index) in serviceDetails" :key="service.name">
          <div class="service-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="service-content">
            <h4 class="service-title">{{ service.name }}</h4>
            <p class="service-desc">{{ service.description }}</p>
            <div class="service-features">
              <span class="feature-tag" v-for="feature in service.features" :key="feature">
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 专属服务团队 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">专属服务团队</h3>
        <span class="section-badge">一对一</span>
      </div>
      <div class="team-intro">
        <div class="team-card">
          <div class="team-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="team-info">
            <h4>专属健康管家</h4>
            <p>7×24小时在线，随时响应您的健康需求</p>
          </div>
        </div>
        <div class="team-card">
          <div class="team-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
            </svg>
          </div>
          <div class="team-info">
            <h4>全科专家团队</h4>
            <p>三甲医院主任级专家，提供精准诊疗建议</p>
          </div>
        </div>
        <div class="team-card">
          <div class="team-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z"/>
            </svg>
          </div>
          <div class="team-info">
            <h4>医疗协调专员</h4>
            <p>全程陪诊服务，协调优质医疗资源</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务承诺 -->
    <div class="section commitment-section">
      <div class="commitment-card">
        <div class="commitment-header">
          <svg viewBox="0 0 24 24" fill="currentColor" class="commitment-icon">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          <h3>服务承诺</h3>
        </div>
        <div class="commitment-list">
          <div class="commitment-item">
            <span class="check-icon">✓</span>
            <span>专业医疗团队，持证上岗</span>
          </div>
          <div class="commitment-item">
            <span class="check-icon">✓</span>
            <span>隐私数据加密，安全保障</span>
          </div>
          <div class="commitment-item">
            <span class="check-icon">✓</span>
            <span>服务不满意，全额退款</span>
          </div>
          <div class="commitment-item">
            <span class="check-icon">✓</span>
            <span>7×24小时客服，即时响应</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部联系 -->
    <div class="contact-footer">
      <p class="contact-text">如有疑问，请联系您的专属健康管家</p>
      <button class="contact-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
        立即联系
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useHealthStore } from '@/stores/health'

const healthStore = useHealthStore()

// 图标组件
const IconShield = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z' })
])

const IconClock = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z' })
])

const IconStar = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' })
])

const IconHeart = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' })
])

const coreBenefits = [
  { title: '全程健康守护', description: '365天不间断健康监测与管理', icon: IconShield },
  { title: '即时响应服务', description: '7×24小时专属健康管家在线', icon: IconClock },
  { title: '顶级医疗资源', description: '三甲医院专家团队优先预约', icon: IconStar },
  { title: '个性化方案', description: '量身定制健康管理计划', icon: IconHeart }
]

const serviceDetails = [
  {
    name: '病史系统全面回顾',
    description: '深入了解您的健康历史，建立完整的健康档案基础',
    features: ['既往病史', '家族史', '用药史', '过敏史']
  },
  {
    name: '国际健康病历建档',
    description: '按照国际标准建立电子健康档案，便于全球医疗机构查阅',
    features: ['国际标准', '多语言', '云端存储', '随时调阅']
  },
  {
    name: '专属健康管家陪诊',
    description: '全程陪同就医，协调医疗资源，让就医更轻松',
    features: ['预约挂号', '全程陪同', '报告解读', '后续跟进']
  },
  {
    name: '健康生活动态监测',
    description: '实时监测各项健康指标，及时发现异常并预警',
    features: ['实时监测', '智能预警', '趋势分析', '健康报告']
  },
  {
    name: '全科专家精准诊疗',
    description: '汇聚各科室顶级专家，提供精准诊疗建议',
    features: ['专家会诊', '精准诊断', '治疗方案', '康复指导']
  },
  {
    name: '精准健康体检评估',
    description: '根据个人情况定制体检方案，全面评估健康状况',
    features: ['个性定制', '深度检查', '风险评估', '健康建议']
  },
  {
    name: '体检报告精细解读',
    description: '专业医生逐项解读体检报告，让您真正了解自己的身体',
    features: ['逐项解读', '风险提示', '改善建议', '跟踪复查']
  },
  {
    name: '慢性疾病管理建议',
    description: '针对慢性病提供长期管理方案，控制病情发展',
    features: ['用药指导', '生活调整', '定期复查', '并发症预防']
  },
  {
    name: '重症急症转诊建议',
    description: '紧急情况快速响应，协调优质医疗资源',
    features: ['快速响应', '绿色通道', '专家对接', '全程协调']
  },
  {
    name: '国际前沿新药推荐',
    description: '追踪全球最新医疗进展，推荐适合的前沿治疗方案',
    features: ['全球追踪', '新药信息', '临床试验', '海外就医']
  }
]
</script>

<style scoped>
.membership-benefits {
  padding: 0;
  background: var(--color-bg-primary);
  min-height: 100vh;
}

/* 会员等级展示 */
.membership-hero {
  position: relative;
  padding: var(--spacing-xl) var(--spacing-md);
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 50%, #1E3A5F 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(201, 169, 98, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(201, 169, 98, 0.1) 0%, transparent 40%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.3) 0%, rgba(201, 169, 98, 0.15) 100%);
  border: 1px solid rgba(201, 169, 98, 0.5);
  border-radius: 30px;
  margin-bottom: var(--spacing-md);
}

.badge-icon {
  color: #C9A962;
  font-size: 14px;
}

.badge-text {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 2px;
}

.hero-title {
  font-size: 32px;
  font-weight: 300;
  color: white;
  letter-spacing: 8px;
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-display);
}

.hero-subtitle {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--spacing-lg);
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(0, 0, 0, 0.2);
  border-radius: var(--radius-lg);
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #C9A962;
  font-family: var(--font-display);
}

.stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
}

/* 通用区块 */
.section {
  padding: var(--spacing-lg) var(--spacing-md);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.section-badge {
  padding: 4px 12px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.15) 0%, rgba(201, 169, 98, 0.05) 100%);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #C9A962;
}

/* 核心权益网格 */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
}

.benefit-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.benefit-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
}

.benefit-icon :deep(svg) {
  width: 22px;
  height: 22px;
  color: #C9A962;
}

.benefit-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  font-family: var(--font-display);
}

.benefit-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  line-height: 1.5;
}

/* 服务项目列表 */
.services-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.service-detail {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.service-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #C9A962;
  flex-shrink: 0;
  font-family: var(--font-display);
}

.service-content {
  flex: 1;
}

.service-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  font-family: var(--font-display);
}

.service-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.feature-tag {
  padding: 3px 10px;
  background: rgba(201, 169, 98, 0.1);
  border-radius: 12px;
  font-size: 10px;
  color: #C9A962;
  font-weight: 500;
}

/* 团队介绍 */
.team-intro {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.team-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.team-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.team-icon svg {
  width: 24px;
  height: 24px;
  color: #C9A962;
}

.team-info h4 {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 4px;
  font-family: var(--font-display);
}

.team-info p {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* 服务承诺 */
.commitment-section {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  margin: 0;
  padding: var(--spacing-xl) var(--spacing-md);
}

.commitment-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.commitment-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.commitment-icon {
  width: 28px;
  height: 28px;
  color: #C9A962;
}

.commitment-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: white;
  font-family: var(--font-display);
}

.commitment-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.commitment-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.9);
}

.check-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(201, 169, 98, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #C9A962;
  flex-shrink: 0;
}

/* 底部联系 */
.contact-footer {
  padding: var(--spacing-xl) var(--spacing-md);
  text-align: center;
  background: var(--color-bg-secondary);
}

.contact-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-md);
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: linear-gradient(135deg, #2E8B57 0%, #3FA76F 100%);
  border: none;
  border-radius: 30px;
  font-size: var(--font-size-md);
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(46, 139, 87, 0.3);
  transition: all 0.3s ease;
}

.contact-btn svg {
  width: 18px;
  height: 18px;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(46, 139, 87, 0.4);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 26px;
    letter-spacing: 6px;
  }
  
  .hero-stats {
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    flex: 1;
    min-width: 80px;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
