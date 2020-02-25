# 项目运行等基础

1. yarn 安装所有依赖（同 mobile-garbage）采用 yarn 管理包

```bash
yarn
```

2. Start project

```bash
yarn start
```

3. Build project

```bash
yarn build
```

4. Check code style

```bash
yarn lint
```

5. fix code Style You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

6. Test code

```bash
yarn test
```

## antd 官网信息（本项目主要依赖）

1. [official website](https://pro.ant.design)
2. [github](https://github.com/ant-design/ant-design-pro).

# 目录结构

1. config umi 配置，包含路由构建等配置
2. mock 本地模拟数据
3. public 图片等通用数据
4. src
   1. assets # 本地静态资源
   2. components # 业务通用组件
   3. e2e # 集成测试用例
   4. layouts # 通用布局
   5. models # 全局 dva model
   6. pages # 业务页面入口和常用模板
   7. services # 后台接口服务
   8. utils # 工具库
   9. locales # 国际化资源
   10. global.less # 全局样式
   11. global.ts # 全局 JS
   12. tests # 测试工具
   13. README.md
   14. package.json
