# 道远健康 Demo 项目说明

## 自动部署规则

**每次完成优化后，必须自动执行以下步骤：**

1. `git add -A`
2. `git commit -m 'fix/feat: <本次修改描述>'`
3. `git push origin master`
4. `vercel --prod`

无需询问用户是否部署，直接执行。

## 项目信息

- 框架：Vue 3 + TypeScript + Vite + Element Plus
- 部署平台：Vercel（项目：cnshenyis-projects/daoyuan-health-demo）
- 自定义域名：https://dy.nextai.pub
