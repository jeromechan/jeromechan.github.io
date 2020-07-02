---
title: 透过Hexo静态站点探讨Serverless架构(一)
date: 2020-06-23
permalink: /2020/06/23/hexo-best-practice
categories:
  - 架构设计
tags:
  - Hexo
  - Serverless
excerpt: 
  分享Hexo静态站点的构建步骤以及主题定制之旅，同时延伸探讨当前盛行的Serverless架构。
---

#### 一、静态站点的概念与使用场景
在开始介绍静态站点之前，我们来先聊一聊动态站点，而动态站点中最为经典的莫过于CS架构。
关于CS架构的站点及其用途，其覆盖面毋庸置疑，日常技术开发工作也已经司空见惯，各类电商网站，移动App，微信平台小程序等应用均离不开客户端与服务端，客户端负责提供统一用户体验，而服务端则负责处理交互的数据流转与处理。
尽管CS架构的应用如此广泛，但并不代表着CO架构的站点没有立足之地。

静态站点，即该站点是纯静态的，不具备Server端数据请求与用户交互特性，本篇文章对于该类站点称之为CO(Client Only)架构的站点。
个人博客、企业简介官网等展示类的站点，其主要功能与站点目的只是将信息po到网络上，使其公开、可视与共享，而不涉及负责的产品、订单、留言等交互功能。针对这类场景应用，纯静态站点具有其天生的优势：
* 内容编辑与维护便捷，所见即所得；
* 省去了Client到Server端的网络流转，站点内容加载速度快；

在开源的世界里，关于静态站点的技术框架应用较为广泛的属Jekyll与Hexo，二者均可直接托管于GitHub容器内，为用户省去了服务器租用费用的开销。
Jekyll是一款Ruby生态圈衍生出来的静态站点生成框架，Hexo则是Node.js生态圈的产物，二者要求的底层技术知识有所区别。在选用的时候，请选择自己熟悉的擅长的就好，二者在生产出的静态站点成品上对于普通用户而言，并无太大区别。
Jekyll与Hexo在主题定制方面都拥有着不错的社区，用的时候可以自己去对应的社区挑选自己喜爱的主题作为二次定制开发的基础。

本篇文章主要Focus在Hexo的应用上，而在过去的日子里，对于Jekyll已经有了一定成品研究，如果感兴趣可以前往本人GitHub上的项目进行观摩、留言与交流：
GitHub项目：[hyde-for-jekyll-v3](https://github.com/jeromechan/hyde-for-jekyll-v3)
这是一个不错的，可定制性很强的一个主题。在原项目poole/hyde的基础上，本人作了版本升级与功能定制开发，更符合国内用户的使用习惯。

#### 二、准备Hexo开发环境与工具
正所谓工欲善其事，必先利其器。我们先来说说折腾Hexo静态站点生成器所需要准备的各类资源，其中包含环境配置、工具安装、资料阅读等方面。本篇文章主要基于macOS环境开展讲解，同样也适用于Windows平台上的运用。
* Hexo官方网站：https://hexo.io/zh-cn/
学习如何安装Hexo、执行Hexo站点部署与调试的基本操作。
* Hexo官方主题：https://hexo.io/themes/
很多很赞的官方主题供你随意挑选。
* Node.js官方网站：https://nodejs.org/zh-cn/
这是Hexo框架的底层依赖，必须先安装好才便于更好地使用Hexo。
* EJS模板引擎：https://ejs.co/
这是示例中pure主题所使用到的JS模板引擎，基础的标签和模板语言需要简要学习一番。
* TAWK.to插件：https://www.tawk.to/
tawk.to是一个在线聊天插件，可以运用于静态站点，场景可以是提供用户文章留言、意见反馈、在线聊天等。
* cofess/hexo-theme-pure主题（案例）：https://github.com/cofess/hexo-theme-pure
适用于最新版本Hexo的hexo-theme-pure主题，本篇文章的讲述基于该主题逐步开展。该主题也是我个人博客的基础主题。

#### 三、Hexo静态站点搭建步骤
1. 安装node.js
如下图，下载安装文件并进行安装。建议下载LTS版本的进行安装，LTS即Long-term support长期维护版本，相较其它版本的稳定性更佳。
![-w811](/images/2020-06-23-hexo-best-practice/15937078276185.jpg)

2. 安装Hexo框架 
打开terminal，敲入命令进行安装。
```bash
npm install hexo-cli -g
```

3. 初始化一个Hexo静态站点
```bash
hexo init blog
cd blog
npm install
```

4. 下载并安装cofess/hexo-theme-pure主题
在`blog`目录下，执行如下命令：
```bash
git clone https://github.com/cofess/hexo-theme-pure.git themes/pure
```
然后，修改hexo根目录`/blog`下的`blog/_config.yml`文件，修改配置为`theme: pure`。
额外地，如果需要完全使用pure主题所具备的特性，如下插件建议安装，如下命令：

```bash
# hexo-wordcount
npm install hexo-wordcount --save

# hexo-generator-json-content
npm install hexo-generator-json-content --save

# hexo-generator-feed
npm install hexo-generator-feed --save

# hexo-generator-sitemap
npm install hexo-generator-sitemap --save

# hexo-generator-baidu-sitemap
npm install hexo-generator-baidu-sitemap --save
```

关于pure主题更多的优化点，请参考：[https://github.com/cofess/hexo-theme-pure#blog-optimization](https://github.com/cofess/hexo-theme-pure#blog-optimization)

5. 启动Hexo静态站点`blog`
在`blog`目录下执行命令，启动静态站点本地调试环境。
```bash
hexo server --debug
```

#### 四、cofess/hexo-theme-pure改造思路与定制性开发
1. 修复分页功能显示源代码问题
原因系`paginator()`方法内对传入的html源代码作了转义，而在页面渲染之时却未恢复为原样，导致页面渲染出现了html源代码。
![-w913](/images/2020-06-23-hexo-best-practice/15937097798901.jpg)

2. 移除冗余的篇章末签名功能块
（1）增加_config.yml配置
```yml
# post page configurations
postConfig:
  signature: false #是否在post底部展示站点作者签名
```
（2）修改copyright.ejs，实现篇章末的前面功能块被隐藏
if判断条件新增条件`&& theme.postConfig.signature`。
![-w946](/images/2020-06-23-hexo-best-practice/15937102869214.jpg)

3. 新增与配置gitalk评论模块
（1）注册GitHub OAuth application
[https://github.com/settings/applications/new](https://github.com/settings/applications/new)
![-w742](/images/2020-06-23-hexo-best-practice/15937109150632.jpg)

（2）配置pure主题的_config.yml
```yml
gitalk: # gitalk. https://gitalk.github.io/
    owner:  jeromechan #必须. GitHub repository 所有者，可以是个人或者组织。
    admin:  jeromechan #必须. GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)。
    repo: jeromechan.github.io #必须. GitHub repository.
    ClientID: ecf46d673fc8c48a8f6f #必须. GitHub Application Client ID.
    ClientSecret: 268a6dcde075fd5cc3e2f3e676c93cbde3868c3e #必须. GitHub Application Client Secret.
```

4. 修复豆瓣书单openAPI过期失效问题
（1）原豆瓣openAPI已失效，改到新的接口调用上
![-w839](/images/2020-06-23-hexo-best-practice/15937112195049.jpg)
（2）更换pure主题_config.yml配置中的豆瓣openAPI请求秘钥
```yml
douban:
  user: 205387900 # 豆瓣用户名
  start: 0 # 从哪一条记录开始
  count: 100 # 获取豆瓣书单数据条数
  apikey: 0df993c66c0c636e29ecbb5344252a4a # 网络流传 ApiKey 0df993c66c0c636e29ecbb5344252a4a 0b2bdeda43b5688921839c8ecb20399b
```

5. 新增tawk.to插件的支持
（1）新增tawk-to.ejs文件
![-w836](/images/2020-06-23-hexo-best-practice/15937115176825.jpg)

（2）将tawk-to.ejs内容进行动态加载
修改`themes/pure/layout/_common/script.ejs`，新增加载`tawk-to.ejs`文件内容
```
<%- partial('_script/tawk-to') %>
```

6. 更改菜单“关于”的超链接至LinkedIn
（1）修改pure主题下的_config.yml配置如下
![-w811](/images/2020-06-23-hexo-best-practice/15937120365118.jpg)
（2）更改header.ejs，完善内容的呈现逻辑
判断若文本内容为https或http开头，则以超链接形式进行`<a>`标签渲染，否则直接渲染文本。
![-w870](/images/2020-06-23-hexo-best-practice/15937121567220.jpg)

7. 更改博文url pattern配置
修改项目`blog`目录下的`_config.yml`配置。
![-w794](/images/2020-06-23-hexo-best-practice/15937118312500.jpg)

#### 五、在Hexo静态站点DevOps自动化方面做的一些改善
关于如何将Hexo静态站点托管到GitHub Pages上的操作流程，以及如何使用GitHub Pages实现Https加密配置，使用搜索引擎Google可以得到非常多的Tips和博文，这里就不再赘述。这里会额外讲述一下Hexo静态站点项目在DevOps自动化部署上的一些新的尝试。

GitHub原生支持Jekyll站点项目，无需额外生成全部静态站点文件即可部署使用。与Jekyll不同，Hexo需完全编译并生成全部静态站点文件才可部署到GitHub Pages上使用。故而Hexo项目的部署流程略复杂于Jekyll。
![-w525](/images/2020-06-23-hexo-best-practice/15937136700715.jpg)

针对`Core Operations: gen&sync`，通过shell脚本完成其自动化部署流程数最为便捷的实践方案。其实现细节与流程步骤如下源码所示：
源代码：[https://github.com/jeromechan/jeromechan.github.io/blob/source-hexo/deploy.sh](https://github.com/jeromechan/jeromechan.github.io/blob/source-hexo/deploy.sh)
```bash
#!/bin/bash

echo "###########################################################"
echo "执行开始"
echo "###########################################################"

# A script to build a Hexo site
REPO_NAME="jeromechan.github.io"
BRANCH_SOURCE="source-hexo"
BRANCH_MASTER="master"
CURRENT_DIR=${PWD}

# 0. 完善当前构建环境的依赖
echo "###########################################################"
echo "0. 完善当前构建环境的依赖，执行yarn install"
echo "###########################################################"
yarn install

# 1. 切换至source-hexo分支下，执行hexo clean & hexo generate
echo "###########################################################"
echo "1. 切换至source-hexo分支下，执行hexo clean & hexo generate"
echo "###########################################################"
git checkout $BRANCH_SOURCE
hexo clean
hexo generate

# 2. 执行git add * & git commit -am 'Auto update file using hexo-deploy.sh script.' & git push
echo "###########################################################"
echo "2. 执行git add * & git commit -am 'Auto update file using hexo-deploy.sh script.' & git push"
echo "###########################################################"
git add *
git commit -am 'Auto update file using hexo-deploy.sh script.'
git push

# 3. 将public文件夹内容拷贝至/tmp/jeromechan.github.io，额外包含项目目录下的"CNAME"文件
echo "###########################################################"
echo "3. 将public文件夹内容拷贝至/tmp/jeromechan.github.io，额外包含项目目录下的'CNAME'文件"
echo "###########################################################"
rm -rf /tmp/$REPO_NAME
cp -r ./public/ /tmp/$REPO_NAME
cp ./CNAME /tmp/$REPO_NAME/

# 4. 切换至master分支下，删除所有非隐藏的项目文件，然后执行git commit -am 'Auto reset master files using hexo-deploy.sh script.'
echo "###########################################################"
echo "4. 切换至master分支下，删除所有非隐藏的项目文件，然后执行git commit -am 'Auto reset master files using hexo-deploy.sh script.'"
echo "###########################################################"
git checkout $BRANCH_MASTER
rm -r $CURRENT_DIR/*
git commit -am 'Auto reset master files using hexo-deploy.sh script.'

# 5. 将/tmp/jeromechan.github.io文件内容全部拷贝至master分支下
echo "###########################################################"
echo "5. 将/tmp/jeromechan.github.io文件内容全部拷贝至master分支下"
echo "###########################################################"
cp -r /tmp/$REPO_NAME/* ./
rm -rf /tmp/$REPO_NAME

# 6. 执行git add * & git commit -am 'Refresh and add master files using hexo-deploy.sh script.' & git push
echo "###########################################################"
echo "6. 执行git add * & git commit -am 'Refresh and add master files using hexo-deploy.sh script.' & git push"
echo "###########################################################"
git add *
git commit -am 'Refresh and add master files using hexo-deploy.sh script.'
git push

# 7. 切换至source-hexo分支下
echo "###########################################################"
echo "7. 切换至source-hexo分支下"
echo "###########################################################"
git checkout $BRANCH_SOURCE

echo "###########################################################"
echo "执行完成"
echo "###########################################################"
```

#### 六、篇末总结
以上实现细节均可参考项目源码实现：
GitHub项目地址：[https://github.com/jeromechan/jeromechan.github.io/tree/source-hexo](https://github.com/jeromechan/jeromechan.github.io/tree/source-hexo)

透过以上Hexo静态站点的实践，我们可以了解到静态站点的优缺点，如何快速运用Hexo静态站点来构建自己的个人博客站点。同时通过在Hexo主题部分的定制化优化与改造，快速上手与提高Hexo开发技能。相信通过这篇文章，大家都可以学习到自己需要的知识点。后续还将撰写续篇，通过Hexo架构深入探讨当前业界盛行的Serverless架构设计。