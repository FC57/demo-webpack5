#### 一、npx作用

​		在工程中，用到一些命令工具，若全局安装，无法有效控制命令工具的版本，因此常针对不同工程，采用局部安装命令工具的方式，此时直接使用命令会报错，因为命令工具安装在工程目录 ***node_modules/.bin/xx*** 中，`npx 命令xxx` 的作用就是直接在该目录下找命令工具，而非全局找

- 在工程 *node_modules/.bin/xx* 中使用命令行工具

  > 在 *package.json* 中配置脚本可以省略 npx
  >
  > ```json
  > {
  >    "scripts":"webpack" // 等价于 npx webpack
  > }
  > ```

- 临时安装命令工具（非工程目录）并执行

  > 当执行某个命令时，如果无法从本地工程中找到对应命令，则会把命令对应的包下载到一个临时目录，下载完成后执行，临时目录中的命令会在适当的时候删除
  >
  > ```bash
  > npx prettyjson 1.json
  > ```
  >
  > 上述命令会将包 prettyjson 安装到临时目录，并执行命令，如果包名和命令名称不一致，可以手动指定包名，如包名 @vue/cli，命令名称 vue ，可使用命令
  >
  > ```bash
  > npx -p @vue/cli vue create my-app
  > ```



#### 二、Eslint 代码规范

##### 	1、安装

```bash
npm i -D eslint
```

##### 	2、校验（使用 eslint 命名行工具）

```bash
# 单个文件校验
npx eslint 文件名

# 校验全部文件
npx eslint src/**
```

##### 	3、配置文件

- .eslintrc  *JSON文件*
- .eslintrc.cjs 或 .eslintrc.js  *JS文件*
- .eslintrc.yml  *yaml 文件*

```javascript
// .eslintrc.js

module.exports = {
  rules:{
      // 规则级别 'off'或0 - 关闭规则；'warn'或1 - 验证不通过警告；'error'或 2 - 验证不通过退出程序
      // 规则名:规则级别
      eqeqeq:2
  }  
}
```



#### 三、typescript 配置文件

- 补充

  > 1、约束类的类型可以使用 new () => object
  >
  > ```typescript
  > // 约束一个类
  > const target:new (...args:any[]) => object
  > ```

- 配置文件说明

  -- tsconfig.json

```json
{
  "files": [], // 指定编译的特定文件
  // 编译选项
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "target": "ES2016", // 编译目标代码的版本标准
    "module": "ESNext", // 编译结果的模块化标准
    "moduleResolution": "Node", // 模块解析的模式
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "outDir":'./dist', // 编译结果输出目录
    "strictNullChecks":true, // 严格校验数据是否为 undefined 或 null
    "removeComments":true, // 不编译注释
    "noImplicitAny":true, // 不能使用隐式any，即必须有类型
    // "declaration":true, 编译后生成申明文件
  },
  "include":["./src/**/*"], // 指定编译目标文件路径
   // 参考配置文件
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
```



#### 四、Webpack 构建工具

##### 	<span style="color:deepskyblue">--- 【核心功能】</span>

##### 1、安装和使用

- 需要下载 *webpack* 和 命令行工具 *webpack-cli*

  ```bash
  npm i -D webpack webpack-cli
  ```

  > *webpack* ：核心包，包含前端工程构建过程所有 api
  >
  > *webpack-cli*：命令行工具，可以通过命令调用核心包的 api，完成工程的构建

- 使用命令 *webpack* 默认从 "./src/index.js" 该目录为入口文件，分析工程依赖关系，最终打包到目录 "./dist/main.js"

  > 可以使用 *--mode* 指定打包运行的环境，默认生产环境（*production*）
  >
  > 生产环境构建后的代码会压缩，开发环境不会

  ```bash
  # 构建工程（默认生产环境），等价于 webpack --mode=production
  webpack
  # 指定开发环境构建
  webpack --mode=development
  ```



##### 2、配置文件

- *webpack* 默认读取 *webpack.config.js* 作为配置文件，也可以使用命令指定配置文件

  ```bash
  # 指定配置文件
  webpack --config 文件路径
  ```

  > 配置文件内容使用 *CommonJS* 规范导出一个对象
  >
  > **问：** webpack 支持多模块化规范，但配置文件导出的配置对象，为何必须使用 *CommonJS* 规范？
  >
  > ​	💡 因为工程中的整个模块文件在编译过程中只是读取，识别模块之间的依赖关系，最终生成打包文件，这些文件在编译过程中是不参与运行的，而配置文件 *webpack.config.js* 是要参与运行的，因为整个编译过程是在 ***node* 环境中**，而后缀名为 *js* 时，默认是按照 *CommonJS* 解析的，并且 *webpack* 内部导入 *webpack.config.js* 是用的*CommonJS*，因此只能使用 *CommonJS* 规范

  > *node* 环境中
  >
  > 1）默认情况下，*.js* 文件 — *CommonJS* 规范，*.mjs* 文件 — *EsModule* 规范
  >
  > 2）工程在 *package.json* 中设置了 *type:"module"* ，则 *.js* 文件 — *Esmodule* 规范，*.cjs* 文件 — *CommonJs* 规范

  ```javascript
  // 配置文件 webpack.config.js
  
  const path = require('path');
  
  module.exports = {
      // 打包运行环境 development - 开发，production - 生产
      mode:"development",
      // 入口文件，通常是字符串（单入口），多入-单出时（字符串数组），多入-多出时（对象-{打包文件名："路径"}）
      // 入口文件不配置，默认是 "./src/index.js"
      entry:"./main.js",
      // 出口文件
      output:{
         path:path.resolve(__dirname,'./dist'),// 打包的路径，默认是 ./dist
         filename:"main.js", // 打包后的文件名称
      }
  }
  ```



##### 3、devtool 配置

- *source map* 源码地图

  > 在开发环境运用于调试用，运行打包后文件时，若报错，能定位打包前源码位置
  >
  > ![image-20240808152643462](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808152643462.png)

- *webpack* 使用 *devtool* 配置来优化调试体验，有很多方式，使用的时候查看官网即可



##### 4、编译过程

- 初始化

  > *webpack* 将 【cli参数】、【配置文件】、【默认配置】进行融合，形成最终配置文件，对配置的处理过程依托第三方库 *yargs*
  >
  > 是编译过程的准备工作，**即生成配置文件**

- 编译

  > 1）创建 *chunk* （块），通过入口文件找到所有依赖的统称，通常为一个（单入），也可以多个
  >
  > ![image-20240808155213734](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808155213734.png)
  >
  > > 每个 *chunk* 至少2个属性：
  > >
  > > - name：默认为 main
  > > - id：唯一编号，开发环境和name相同，生产环境是一个数字，从0开始
  >
  > 2）构建所有模块依赖，**生成模块列表**（模块id和转换后的代码）
  >
  > ![image-20240808155539250](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808155539250.png)
  >
  > 3）产生 *chunk assets*，根据配置，**生成最终生成文件的资源列表**（文件名-文件内容）
  >
  > ![image-20240808161034989](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808161034989.png)
  >
  > > *chunk hash* 是根据所有chunk assets的内容生成的一个hash字符串（hash是一种算法，内容不变，得到的hash值不变）
  >
  > ![image-20240808161504682](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808161504682.png)
  >
  > 4）将多个*chunk* 的 *hash assets* 合并到一起，**产生一个总的 *hash***
  >
  > ![image-20240808161823837](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808161823837.png)

- 输出

  > *webpack* 利用 node 的 *fs* 模块（文件处理模块），根据编译产生的总的 *assets* 生成不同的文件

- 总过程及术语

  ![image-20240808162343814](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808162343814.png)

  > 术语：
  >
  > 1. module：模块，分割的代码单元，webpack中的模块可以是任何内容的文件，不仅限于JS
  > 2. chunk：webpack内部构建模块的块，一个chunk中包含多个模块，这些模块是从入口模块通过依赖分析得来的
  > 3. bundle：chunk构建好模块后会生成chunk的资源清单，清单中的每一项就是一个bundle，可以认为bundle就是最终生成的文件
  > 4. hash：最终的资源清单（多个*chunk*生成的资源清单汇总）所有内容联合生成的hash值
  > 5. chunkhash：chunk生成的资源清单内容联合生成的hash值
  > 6. chunkname：chunk的名称，如果没有配置则使用main
  > 7. id：通常指chunk的唯一编号，如果在开发环境下构建，和chunkname相同；如果是生产环境下构建，则使用一个从0开始的数字进行编号

![image-20240808165950571](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808165950571.png)

![image-20240808165907470](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808165907470.png)



##### 5、入口和出口

- node 中路径说明

  > 📍	./ 
  >
  > 1）在模块化代码中，比如 ruquire( "./xx" )，表示当前 js 文件所在目录
  >
  > 2）在路径处理中，”./” 表示 node 运行目录
  >
  > 📍	*__dirname*  所有情况下，都表示当前运行 js 文件所在目录，是个绝对路径

- 多入多出中，出口文件的配置规则

  💡 说明：*output* 中指定 *filename* 时，想将打包的文件放入子文件夹中，可以配置成 *filename : 'scripts/[name].[hash:5].js'*
  
  > 1）name - *chunkname*
  >
  > 2）hash - 总的资源 *hash*，通常用于解决缓存问题，内容不变，*hash* 不变
  >
  > 3）chunkhash - 使用 *chunkhash*
  >
  > ```javascript
  > const { resolve } = require('path');
  > 
  > module.exports = {
  >     // 入口
  >     entry:{
  >         // 属性为 chunkname，值为入口模块路径
  >         main:'./src/index.js', 
  >         a:'./src/a.js',
  >         b:['./src/b/index.js','./src/b/other.js'] // 针对b有多个入口文件
  >     },
  >     // 出口
  >     output:{
  >         // 必须为绝对路径
  >         path:resolve(__dirname,'dist/app'),
  >         // 出口文件名称，这里的 name 是占位符，对应替换为入口定义的 chunkname
  >         // filename:'[name].bundle.js'
  >         
  >         // hash:指定位数
  >         filename:'[name].[hash:5].js'
  >     }
  > }
  > ```
  >



##### 6、扩展（loader、plugin）

> *webpack* 只是分析模块依赖关系，生成模块列表，并根据配置文件，生成资源文件列表，最后将多个资源文件列表合并生成打包文件，而更多的功能，需要扩展 *webpack loaders* 和 *webpack plugins* 

- **loader**

  - *loader* 本质是一个函数，它的作用是将某个源码字符串转换成另一个源码字符串返回
  - *loader* 函数将在模块解析的过程中被调用，以得到最终的源码

  ![image-20240808203300009](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808203300009.png)

  ![image-20240808203153841](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240808203153841.png)

  - loader 配置

    > 模块规则配置 *module* 中，运用的匹配规则 *rules*，多个规则对象是从上往下匹配，匹配到后统一加入一个数组（记作*tempRules*）中，当运行时相当于 *tempRules.pop()*
    >
    > 🎉 下列匹配到后，执行顺序是 <span style="color:red">*loader4 > loader3 > loader2 > loader1*</span>
    >
    > ```javascript
    > // 匹配到的规则后将 loader 放入数组 ['loader1','loader2','loader3','loader4']
    > module.exports = {
    >     module:{
    >         rules:[
    >             { test:/index\.js$/,use:[ 'loader1','loader2' ] },
    >             { test:/\.js$/,use:[ 'loader3','loader4' ] },
    >         ]
    >     }
    > }
    > ```

    - 简要配置（对应loader函数参数用默认值）

    ```javascript
    modele.exports = {
        // 模块处理配置
        module:{
            // 模块匹配规则，可以有多个
            rules:[
                {
                    test:/\.js$/, // 模块匹配的正则
                    // 匹配到的模块应用的规则模块（使用哪些加载器）
                    use: ["模块路径1", "模块路径2"] // loader模块的路径，该字符串会被放置到require中
                }
            ]
        }
    }
    ```

    - 完整配置（向对应loader函数传递额外参数）

      > 可以使用第三方库 *loader-utils* 获取 *options* 中传递的参数，或生成文件路径等
      >
      > ```bash
      > # 开发环境下载库
      > npm i -D loader-utils
      > ```
  
    ```javascript
    modele.exports = {
        // 模块处理配置
        module:{
            // 模块匹配规则，可以有多个
            rules:[
                {
                    test:/\.js$/, // 模块匹配的正则
                    // 匹配到的模块应用的规则模块（使用哪些加载器）
                    use: [
                        {
                            loader:'模块路径1',// loader模块的路径，该字符串会被放置到require中
                            options:{ ... } // 传递的额外参数
                        }
                    ]
                }
            ]
        }
    }
    ```
  
  - 自定义 loader
  
    - 定义（*CommonJs* 定义函数并返回字符串源码）
  
    ![image-20240812104848270](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240812104848270.png)
  
    > 如果给自定义 loader 函数绑定静态属性 *raw*，那获取的数据格式不会转为字符串，而是原始格式
    >
    > --- img-loader.js
    >
    > ```javascript
    > // 定义loader方法
    > function loaderFn(){
    >  // ...
    > }
    > 
    > // 绑定 raw 并导出方法
    > loaderFn.raw = true;
    > module.exports = loaderFn
    > ```
    
    ```javascript
    --- img-loader.js
    
    const loaderUtils = require('loader-utils');
    console.log(loaderUtils);
    
    /**
     * 图片loader
     * @param {Buffer} buffer 图片二进制数据
     */
    function imgLoader(buffer) {
      // 文件大小 KB
      const size = buffer.byteLength / 1024;
      console.log(`文件大小:${Math.floor(size)}KB`);
      console.log(this.query);
      
      // 通过 loader 上下文中的query，可以获取 loader 配置中的 options
      const { limit = 1024 , name = '[contenthash:5].[ext]' } = this.query;
      let content = '';
      const { fileName, ext } = getFilePath.call(this, buffer,name);
      if (size < limit) {
        content = getBase64(buffer, ext);
      } else {
        content = fileName;
        // 打包文件到最终目录
        this.emitFile(fileName, buffer);
      }
      return `module.exports=\`${content}\``;
    }
    imgLoader.raw = true;
    
    /**
     * 获取文件名称
     * @param {Buffer} buffer 图片二进制数据
     * @param {string} name 图片打包后文件名称格式
     */
    function getFilePath(buffer,name) {
      const fileName = loaderUtils.interpolateName(this, name, {
        content: buffer
      });
      return { fileName, ext: fileName.replace(/.*\./g, '') };
    }
    
    /**
     * 获取图片base64格式
     * @param {Buffer} buffer 图片二进制数据
     * @param {string} ext 图片后缀
     */
    function getBase64(buffer, ext) {
      const fileExt = ext === 'jpg' ? 'jpeg' : ext;
      return `data:img/${fileExt};base64,${buffer.toString('base64')}`;
    }
    
    module.exports = imgLoader;
    
    ```
    
    - 使用
    
    ![image-20240812162914422](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240812162914422.png)



- **plugin**

  - *plugin* 的作用是在编译过程中，嵌入一些额外的功能

  - *plugin* 的本质是一个带有 *apply* 方法的对象，通常写成一个构造函数的模式

    ```javascript
    const plugin = {
        apply:function(){
            // ...
        }
    }
    
    // 通常为构造函数
    module.exports = class MyPlugin{
        apply(compiler){
            // ...
        }
    }
    // 插件实例
    const myPlugin = new MyPlugin()
    ```

  - 使用 - 配置 *plugins*

    ```javascript
    const MyPlugin = require('./src/plugins/myPlugin.js')
    
    module.exports = {
        plugins:[
            new MyPlugin()
        ]
    }
    ```

  - 自定义插件

    > *apply* 方法会在初始化阶段，创建好 *compiler* 对象后，将 *compiler* 对象作为参数调用，整个构建过程中只有一个 *compiler* 对象，后续完成打包工作的是 *compiler* 对象内部创建的 *compilation*
    >
    > ![image-20240812170744427](C:\Users\11270\AppData\Roaming\Typora\typora-user-images\image-20240812170744427.png)
    >
    > *compiler* 对象提供了大量的钩子函数（hooks，可以理解为事件），*plugin*的开发者可以注册这些钩子函数，参与*webpack*编译和生成。
    >
    > 你可以在apply方法中使用下面的代码注册钩子函数:
    >
    > ```javascript
    > class MyPlugin{
    >     apply(compiler){
    >         compiler.hooks.事件名称.事件类型(name, function(compilation){
    >             // 事件处理函数
    >             
    >             // 可以通过 compilation.assets 获取到打包后生成的文件信息，是个对象
    >          // 形如： {'文件名称':{ source(){return '源码字符串或文件二进制'},size(){return '文件字节数'} }}
    >         })
    >     }
    > }
    > ```
    >
    > 【事件类型】
    >
    > - *tap*  注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
    > - *tapAsync*  注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
    > - *tapPromise*  注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束

    ```javascript
    module.exports = class FileListPlugin {
      constructor(fileName) {
        this._fileName = fileName;
      }
    
      // 插件方法
      apply(compiler) {
        console.log('插件运行');
        // 注册生成打包文件前的事件
        compiler.hooks.emit.tap('fileListPlugin', compilation => {
          const fileContent = [];
          for (const fileName in compilation.assets) {
            // js文件源码字符串或文件二进制数据
            const source = compilation.assets[fileName].source();
            // 文件字节数
            const size = compilation.assets[fileName].size();
            fileContent.push(`--【${fileName}】\n文件大小：${size / 1024}KB\n`);
          }
          console.log(`生成文件${this._fileName}`);
          const _size = fileContent.join('\n\n');
          compilation.assets[this._fileName] = {
            source() {
              return _size;
            },
            size() {
              return _size.length;
            }
          };
        });
      }
    };
    
    ```

    

##### 7、区分环境

- 配置文件

  通常是导出一个配置对象，也可以是个方法，方法的返回值是一个配置对象，这个函数会在开始构建的时候调用，传入参数 *env*，这样可以根据判断等实现不同环境不同的配置

```javascript
module.exports = function( env ){
    return {
        // 配置内容
    }
}
```

- 上述 *env* 的值可通过终端命令控制

```bash
npx webpack --env abc # env: "abc"

npx webpack --env.abc # env: {abc:true}
npx webpack --env.abc=1  # env： {abc:1}
npx webpack --env.abc=1 --env.bcd=2 # env: {abc:1, bcd:2}
```



##### 8、其他细枝末节的配置

- 1）context

  > 指定入口文件的绝对路径，通常入口文件配置中路径 './' 指当前运行终端的路径（即当前执行路径），配置了 *context* 会直接影响【入口 *entry*】和 *loader* 中的相对路径

  ```javascript
  entry:'./main.js',
  // 指定入口绝对路径
  context: path.resolve(__dirname, "app")
  ```

- 2）output 选项中其他配置 

  - ***library***   会将打包结果中，自执行函数的执行结果暴露给设置的值，如下的 'abc'，相当于：

    ```javascript
    // 打包编译后的文件
    var abc = ( function( modules ){ return ... } )( )
    ```

  - ***libraryTarget***  默认值为 'var' ，配合 *library* 使用，以控制如何暴露入口包的导出结果

    - *var* （默认值），暴露给一个普通变量
    - *window*，暴露给 *window* 对象的一个属性
    - *global*，暴露给 *global* 对象的一个属性
    - *this* ，暴露给 *this* 的一个属性
    - *commonjs*，暴露给 *exports* 的一个属性

  ```javascript
  // 出口配置
  output:{
      path:path.resolve( __dirname,'./dist' ),// 出口路径
      filename:'[name].[hash:5].js',// 打包后文件名
          
      library:'abc'
  }
  ```

- 3）target 设置打包结果运行的环境

  - ***target***
    - *web* （默认值），*web* 环境中运行
    - *node* ，*node* 环境中运行

- 4）module 选项中的其它配置

  - ***noparse*** ，正则匹配的模块不参与解析，通常用于大型单模块库，以提升构建性能

  ```javascript
  module:{
      noparse:/jquery/
  }
  ```

- 5）resolve 用于控制模块解析过程

  - ***modules*** 指定模块查找目录，默认 *[ 'node_modules' ]* ，即在导入模块时，路径没有写 './' 或 '../' 的，如 *require( 'jquery' )*
  - ***extensions*** 译为扩展名，即指定解析过程中，自动补全的后缀名，*webpack* 会根据配置中 *extensions* ，自动补全后缀名，例如：*require('./a')*，首先看有没有该文件，没有，*webpack* 会自动补全后缀 *.js*、*.json* 看是否存在
  - ***alias*** 路径别名

  ```javascript
  resolve:{
      modules:['node_modules'],// 指定模块查找目录
      extensions:['.js','.json'],// 指定补全文件后缀
      // 路径别名
      alias:{
         '@':path.resolve(__dirname,'src'),
         '_':dirname
      }
  }
  ```

- 6）externals （外观）作用是排除最终的 *bundle* 中配置的源码

  ```javascript
  externals:{
      jquery:'$',
      lodash:'_'
  }
  ```

- 7）publicPath，通常配置在 *outPut* 中，就是在编译过程中指定了一个路径字符串，在资源加载的代码中，会拼接在开头

  ```javascript
  output:{
      publicPath:'/'，// 通常配置成根路径
  }
  ```

  

##### 	<span style="color:deepskyblue">--- 【常用扩展】</span>

##### 1、打包前清除之前的文件

- *clean-webpack-plugin*

  ```javascript
  const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
  
  module.exports = {
      plugins:[
          new CleanWebpackPlugin( )
      ]
  }
  ```

##### 2、自动生成页面

- *html-webpack-plugin*

  ```javascript
  const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
  
  module.exports = {
      // 多入口
      entry:{
         list:'./src/list/list.js',
         home:'./src/home/home.js'
      },
      plugins:[
          new HtmlWebpackPlugin( {
              template:'./public/index.html',// 指定模板,
              filename:'index.html',// 指定打包后的文件名称
              chunks:['list'] // 指定引入的 chunk
          } )
      ]
  }
  ```

##### 3、赋值静态资源

- *copy-webpack-plugin*

  ```javascript
  const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
  
  module.exports = {
      plugins:[
          new CopyWebpackPlugin([
              // 每个对象就是一个复制规则
              {
                  from:'./public',// 从哪个资源复制
                  to:'./' // 复制到哪个目录，该路径相对于output配置的打包路径
              }
          ])
      ]
  }
  ```

##### 4、开发环境服务器

- *webpack-dev-server* 是 *webpack* 官方的模块，使用 *express* 开启一个开发服务器，并将模块打包放入内存中，当页面请求资源时，再给与响应打包资源

  ```javascript
  module.exports = {
      devServer: {
      port: 8080, // 监听端口
      open: true, // 开启后默认打开页面,
      openPage:'index.html',// 默认打开页面，默认值为 'index.html'
      // 代理服务器
      proxy: {
        // 代理规则
        '/api': {
          target: 'http://open.duyiedu.com',
          changeOrigin: true // 更改请求头中的 host 和 origin
        }
      }
    }
  }
  ```

##### 5、webpack 内置插件

> 所有 *webpack* 内置插件，都作为其静态属性存在，创建一个插件使用：
>
> ```javascript
> const webpack = requier('webpack');
> 
> // 创建一个插件
> new webpack.插件名( options )
> ```

- ***DefinePlugin*** 常量定义插件

  ```javascript
  new webpack.DefinePlugin({
      // 值为字符串，在编译后常量会替换为字符串的值
      PI:`Math.PI`,// const PI = Math.PI
      VISION:`'1.0.0'`
      DOMAIN:JSON.Stringify('duyi.com')
  })
  ```

- ***ProvidePlugin***  自动导入常用的包

  ```javascript
  new webpack.ProvidePlugin({
      $:'jquery',
      _:'lodash'
  })
  ```

  
