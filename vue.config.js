const path = require("path");
const Spritesmith = require("webpack-spritesmith");

//  雪碧图样式模板
const templateFunction = function (data) {
  var shared = ".icon { display: inline-block; vertical-align: middle; background-image: url(I) }".replace(
    "I",
    data.sprites[0].image
  );

  // 所有素材都使用2倍稿，除以2代表将原图缩小一半恢复到1倍稿大小
  var perSprite = data.sprites
    .map(function (sprite) {
      return ".icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; background-size: SWpx SHpx; }"
        .replace("N", sprite.name)
        .replace("W", sprite.width / 2)
        .replace("H", sprite.height / 2)
        .replace("X", sprite.offset_x / 2)
        .replace("Y", sprite.offset_y / 2)
        .replace("SW", sprite.total_width / 2)
        .replace("SH", sprite.total_height / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};

module.exports = {
  // 这里配置scss的全局变量，这些变量在任何一个组件中无需引入可直接使用
  css: {
    loaderOptions: {
      sass: {
        prependData: `
              @import "~@/styles/variables.scss";
              @import "~@/styles/mixin.scss";
            `
      }
    }
  },
  // 这里配置代理实现跨域，这个只能解决开发时的跨域问题，而非发布模式的跨域问题
  devServer: {
    // proxy: "http://10.10.10.115:8002"
  },
  productionSourceMap: false,
  chainWebpack: config => {
    // 设置系统的title
    config.plugin("html").tap(args => {
      args[0].title = "111";
      return args;
    });
    // 将png小图标拼接成雪碧图，以便节省体积，并快速引用本地图片
    config.plugin("webpack-spritesmith").use(Spritesmith, [
      {
        src: {
          cwd: "./src/assets/images/icon/",
          glob: "*.png"
        },
        target: {
          image: "./src/assets/images/sprite/sprite.png",
          css: [
            [
              path.resolve(__dirname, "./src/assets/scss/_sprite.scss"),
              {
                // 引用自己的模板
                format: "function_based_template"
              }
            ]
          ]
        },
        apiOptions: {
          cssImageRef: "../images/sprite/sprite.png"
        },
        customTemplates: {
          function_based_template: templateFunction
        },
        spritesmithOptions: {
          algorithm: "binary-tree",
          padding: 10
        }
      }
    ]);

    // svg图标的雪碧图技术，减少静态资源的体积
    config.module
      .rule("svg")
      .exclude.add(path.join(__dirname, ".", "src/assets/images/icon"))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.join(__dirname, ".", "src/assets/images/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  }
};
