# demo-webpack@5

This demo should help you practice webpack@5

### notes

https://juejin.cn/post/7402549800547860491#heading-6

### Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm start
```

### Project Tree

```text
demo-webpack
├─ public
│  └─ index.html                        # 模板html
├─ src
│  ├─ assets
│  │  ├─ css
│  │  │  ├─ index.pcss                  # postcss-loader测试样式文件
│  │  │  ├─ one.module.css              # css-loader测试css module，style-loader引入样式
│  │  │  └─ two.module.css
│  │  ├─ images
│  │  │  ├─ note.jpg                    # 自定义插件 img-loader.js 测试图片
│  │  │  └─ preview.jpg
│  │  └─ index.css                      # 自定义loader style-loader.js测试样式
│  ├─ cssModule.js                      # 测试css module in js
│  ├─ index.js                          # 测试模块变量，不会污染全局
│  ├─ loaders
│  │  ├─ img-loader.js                  # 自定义loader，处理图片成base64或为资源路径
│  │  └─ style-loader.js                # 自定义loader，处理样式文件并加入页面
│  ├─ module1.js                        # 测试js兼容转换生成器和async await 语法
│  ├─ plugins
│  │  └─ file-list-plugin.js            # 自定义插件，使用emit钩子，生成打包资源文件清单
│  └─ showImgs.js                       # 使用自定义插img-loader.js转换图片资源后测试
├─ .babelrc                             # js兼容性配置文件（配置预设和插件）
├─ .env                                 # 全局环境变量（在webpack.config.js中通过dotenv注入到process.env）
├─ .env.development                     # 开发环境的环境变量（同样通过dotenv注入到process.env）
├─ .env.production                      # 生成环境的环境变量（同样通过dotenv注入到process.env）
├─ .gitignore                           # git 提交忽略文件
├─ main.js                              # 入口文件（该demo为单入口）
├─ package.json                         # 包管理配置文件
├─ pnpm-lock.yaml                       # pnpm 下载包版本锁定
├─ postcss.config.js                    # postcss 配置文件
├─ readme.md                            # 说明文档
└─ webpack.config.js                    # webpack 配置文件

```
