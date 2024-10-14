# demo-webpack@5

This demo should help you practice webpack@5

<p align="center">
   <img src='https://img.shields.io/badge/node-v18.14.2-brightgreen?logo=nodedotjs'/>
   <img src='https://img.shields.io/badge/pnpm-v9.4.0-brightgreen?logo=pnpm'/>
   <img src='https://img.shields.io/badge/typescript-v5.5.2-blue?logo=typescript'/>
   <img src='https://img.shields.io/badge/webpack-v5.93.0-blue?logo=webpack'/>
</p>

<br/>

### notes（欢迎掘友点评 🎉🎉🎉）

https://juejin.cn/post/7402549800547860491#heading-6

<p align="center">
  <img src="./src/assets/images/webpack-notes.png"/>
</p>

### Installation and usage steps

- clone:

```bash
# gitee
git clone https://gitee.com/franky57/demo-webpack5.git

# github
git clone https://github.com/FC57/demo-webpack5.git
```

- install:

```bash
pnpm install
```

- run:

```bash
# env development 运行开发环境
pnpm start

# env production 打包并执行预览生产环境
# 用到 cross-env、serve、open、open-cli，自动打包后链接到预览地址
pnpm preview
```

- build:

```bash
# env production 保留了部分注释并执行自定义插件 file-list-plutin
# 打包文件多生成打包资源文件清单 fileList.md
pnpm build

# env production 代码极度压缩
pnpm build:prod
```

- commit

```bash
# 提交代码时，会自动触发 eslint 校验和 prettier 格式化
pnpm commit
```

- preview:

<p align="center">
  <img src="./src/assets/images/webpack-preview.png"/>
</p>

### Project Tree

```text
demo-webpack
├─ .env                                   # 在webpack.config.ts中通过dotenv注入到process.env
├─ .env.development                       # 开发环境环境变量
├─ .env.production                        # 生产环境的环境变量（同样通过dotenv注入到process.env）
├─ .eslintignore
├─ .eslintrc.js                           # 格式校验规则文件
├─ .husky                                 # 定义在git提交的指定钩子中额外执行脚本
│  ├─ commit-msg                          # git commit 时触发的钩子（校验提交信息规范性）
│  ├─ pre-commit                          # git commit 时触发，优先于commit-msg（校验代码格式和规范）
│  └─ _
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc.js                         # 文件格式化规则
├─ .vscode
│  └─ settings.json                       # 解决 Vscode 中当前使用的 typescript 版本与项目不一致问题
├─ babel.config.js                        # babel 配置文件（js兼容或处理jsx等文件）
├─ build
│  ├─ index.ts                            # 打包构建区分环境的方法
│  ├─ package.json                        # 辅助 ts 模块化解析
│  ├─ typing.d.ts
│  ├─ webpack.dev.ts                      # 开发环境 webpack 额外配置
│  └─ webpack.prod.ts                     # 生产环境 webpack 额外配置
├─ commitlint.config.js                   # commitlint、cz-git 配置文件（规范和校验提交信息）
├─ env.d.ts                               # 各类模块文件定义，防止 ts 报错
├─ LICENSE
├─ lint-staged.config.js
├─ package.json                           # 包管理配置文件
├─ pnpm-lock.yaml                         # pnpm 下载包版本锁定
├─ postcss.config.js                      # postcss 配置文件
├─ public                                 # 除 index.html ，均为静态资源不参与编译
│  ├─ assets
│  │  └─ imgs
│  │     └─ webpack.svg
│  ├─ index.html                          # 模板html
│  └─ script
│     └─ index.js
├─ README.md                              # 说明文档
├─ src
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ index.pcss                    # postcss-loader测试样式文件
│  │  │  ├─ one.module.css                # css-loader测试css module，style-loader引入样式
│  │  │  └─ two.module.css
│  │  ├─ images
│  │  │  ├─ note.jpg                      # 自定义插件 img-loader.js 测试图片
│  │  │  ├─ preview.png                   # 《鬼灭之刃-柱》
│  │  │  └─ webpack-notes.png             # 掘金笔记
│  │  └─ index.css                        # 自定义loader style-loader.ts测试样式
│  ├─ cssModule.ts
│  ├─ index.ts                            # 模块变量，不会污染全局
│  ├─ loaders
│  │  ├─ img-loader.ts                    # 自定义loader，处理图片成base64或为资源路径
│  │  └─ style-loader.ts                  # 自定义loader，处理样式文件并加入页面
│  ├─ main.ts                             # 入口文件（该demo为单入口）
│  ├─ module1.ts                          # 测试js兼容转换生成器和async await 语法
│  ├─ plugins
│  │  └─ file-list-plugin                 # 自定义插件，使用emit钩子，生成打包资源文件清单
│  │     ├─ index.ts
│  │     ├─ package.json                  # 指定该自定义插件类型文件和入口文件（辅助ts模块化解析）
│  │     └─ typing.d.ts
│  ├─ showImgs.ts                         # 使用自定义插img-loader.ts转换图片资源后测试
│  └─ types
│     ├─ global.d.ts                      # 全局ts类型，扩展 Window 等类型
│     ├─ style.d.ts                       # 定义样式模块类型
│     ├─ tool.d.ts                        # 自定义类型工具
│     └─ webpack.d.ts                     # 解决在 webpack.config.ts 中书写 CommonJS 规范代码导致类型丢失
├─ tsconfig.json                          # ts 配置文件，typescript及ts-node 会用
└─ webpack.config.ts                      # webpack 配置文件

```
