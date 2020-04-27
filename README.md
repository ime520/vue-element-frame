# 项目目录说明

    ## api 存放接口
    ## assets 存放资源文件
    ## components 存放公共的组件，注意如果不是公共（指多个模块共用）的，单纯的某个模块的组件（缺少复用性），则在views文件夹对应模块下，新建components文件夹存放
    ## coonfig 存放配置文件，主要是axios、工具函数tool.js(blob、storage、其他公共方法)、原型方法定义文件prototype.js等
    ## constants 存放固定的变量
    ## directives 存放固定的指令
    ## filters 存放固定的过滤器
    ## layouts 存放固定的布局组件
    ## mixins 存放固定的混合选项
    ## plugins 固定的用于加载插件
    ## routers 存放系统路由
    ## styles 存放固定的样式文件

# 项目设计说明

    ## 插件使用  需在plugins目录中增加插件引入
    ## 减少插件依赖 本项目尽可能减少对第三方插件的依赖，比如moment.js、lodash.js等，这些实际上能用到的函数较少并大多并不困难，建议使用原生js实现，再参考下面的可复用性进行复用
    ## 跨域方案 开发模式使用devServer.proxy实现跨域请求，线上环境是cors
    ## 雪碧图 使用webpack-spritesmith、svg-sprite-loader实现png、svg的雪碧图，png素材采用2倍稿，以减小项目体积和实现本地图片资源的快速引用，详见后面说明

# 模式和环境变量

    ## VUE_APP_BASE_URL
    ## VUE_APP_BASE_EDITOR_URL
    ## VUE_APP_EDITOR_JS

# 可复用性

    ## 可复用性mixin  需固定在mixins文件夹中增加mixins的定义文件
    ## 可复用性指令   需固定在directive文件夹中增加指令的定义文件
    ## 可复用性过滤器 需固定在filters文件夹中增加过滤器的定义文件
    ## 可复用性全局scss变量 已在vue.config.js中配置，因此可以在任何组件中直接使用variables.scss中的变量
    ## 可复用性常量  需固定在constant文件夹中增加常量定义文件，并且一个文件夹应对应于一个模块，比如发票模块应新建一个ticket.js文件，里面存放所有发票模块的常量。
                    并且所有的状态都应如此操作，不建议在任何视图中写死任何值，譬如v-if(ticket.state ===0){}else if(ticket.state ===1){}，这样会导致难以复用，
                    并且维护时不知道每个state的取值代表什么含义。需注意这里建议个mixin配合使用，达到最佳复用效果
    ## 可复用性工具函数 需固定在config/tool.js中定义，可在任何地方引入使用，也建议和mixin等其他复用方式配合，达到最佳效果
    ## 可复用性原型方法 需固定在config/prototypt.js中定义，这样在任何vue的实例中均可以使用this.$message.success()这样直接调用
    ## 可复用性表单校验 需固定在config/validator.js中定义，在需要的地方引入

# 组件提取

# 样式规范

    ## 建议统一使用scss
    ## 建议统一使用mixin，不保留除mixin之外外的其他样式代码，这些mixin采用可变参数。你可能会觉得这样繁琐，事实上这样做的理由是，非常清晰，易于维护，mixin的参数可随时增加，比如要增加一个属性只需给  mixin多传入一个参数即可，任何样式都是一目了然的，几乎没有冗余代码,并且
    ## 建议统一使用scoped的style，避免任何全局污染的可能性
    ## 如需在父组件中修改子组件的样式，请使用/deep/运算符或者参考vue官网css作用域文档
    ## 如需在子组件中修改父组件的样式，一般意味着组件的设计有问题，请考虑是否应该重新划分组件。如果确有必要，可在mouted和beforeDestory钩子函数使用js修改，或者
       采用其他优雅方式
    ## 各个html元素的默认样式在reset.scss中定义
    ## 可复用性mixin: 已在vue.config.js中配置，因此可以在任何组件中直接使用mixin.scss中的混合
    ## 可复用性全局变量：已在vue.config.js中配置，因此可以在任何组件中直接使用variables.scss中的变量
    ## 可复用性全局类：请在class.scss中定义，写在该文件的中类样式，将在任何地方生效。该文件中的样式不存在嵌套，如.article{...}
    ## 可复用性全局组件自定义样式：请在custom.scss中定义，该文件中主要存放组件级别的样式，将在任何地方生效。即该文件中的样式将存在嵌套.custom-article{.article-title{...}}

# http 及后端交互设计规范

    ## 统一使用axios处理ajax请求
    ## 统一使用axios拦截器处理请求头、处理错误消息
    ## 上传类非ajax的地址，不会触发axios
    ## this.axios 访问本系统后端接口
    ## this.$axios 访问编辑器后端接口

# 注释规范

    ## 建议每一个函数都注明其功能，极大方便维护和查阅

# 雪碧图

    ## 本地图片可通过<i class="local-icon icon-home"><i/>的方式就能直接引入assets/images/icon里面的png图片
    ## 本地图片可通过<svg-icon icon-class="tel"></svg-icon>的方式就能直接引入assets/images/icon里面的tel.svg图片
    ## 两者适用场景：正方形适用于svg，非正方形适用于png

# 页面加载中

    # 请使用v-loading控制元素的加载状态
    # 请使用element-loading-text控制元素loading状态下方文字

# 防抖、节流、访问次数控制

    ## 对于发起请求的按钮一律需要控制其点击次数，除非点击了就跳转到新页面，不可能在短时间内反复点击
    ## 对于el-button，使用elementui的loading来控制，使用mixin进行封装，这样会有一个加载的动画效果，体验更好
    ## 对于非el-button的按钮，不需要动画效果，需使用节流函数处理，同样封装在mixin之中

# vuex 规范

    ## 获取state、getters、mutation、actions均提倡两种方式：
        （1）mapState、mapGetters、mapMutations、mapActions
        （2）this.$store.state式的风格，好处是无需引入辅助函数
    ## 什么情况下应该用getter：
        要基于state进行计算，类似于计算属性那样，这时可以使用getters。
        比如state中存了userInfo，userInfo.token就比较适合使用getter;
        userInfo.works是一个数组，每项是一个对象，现在要对userInfo.works进行筛选，将state=== 0的暴露出去也比较适合使用getter；
