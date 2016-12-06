---
layout: post
title: "Git协作之合并代码"
date: 2016-12-06 09:00:00
description: "merge, fetch, 合并代码, 衍合"
keywords: "git fetch, git merge"
permalink: /2016/12/06/git-fetch-among-branch/
categories:
- VCS
tags:
- Git分支合并
---

继上一次撰写GIT相关文章已经数月有余，半年来在团队内实践GIT的过程中，遇到了很多个人项目所不会接触到的疑问和问题，最为典型的无异于分支、代码之间的合并操作。本篇我们来讲一讲如何在本地仓库中做好多人协作过程中的分支代码合并。

#### 一、前言

在开始之前，如果你对于GIT的基础知识已经有些遗忘了，可以参考以下这几篇文章，知识都比较基础：

* [GIT基础知识讲解（一）](http://aboutcoder.com/2014/06/29/git-basic-knowledge-1/)
* [GIT基础知识讲解（二）](http://aboutcoder.com/2014/06/29/git-basic-knowledge-2/)

如果你想将GIT流程应用到研发工作当中去，GIT流程是你必须要知道的：

* [Git软件开发过程](http://aboutcoder.com/2015/11/16/work-in-git/)

希望上面几篇文章可以帮助到你学习和回顾GIT应用知识。

#### 二、合并代码之前，需要理解的概念

**1. FETCH_HEAD**

`FETCH_HEAD`可以视为一个版本链接，或者说是版本commit-id的履历文件，该文件的路径在Git项目下的`.git/FETCH_HEAD`文件中。   
当运行`git fetch remote_repo src_branch`类似的命令之时，将从远程repo获取分支的末端版本信息，记录到`.git/FETCH_HEAD`文件中：

```sh
➜ /jeromechan/project git:(project) ✗>git fetch origin test
remote: Counting objects: 334, done.
remote: Compressing objects: 100% (211/211), done.
remote: Total 334 (delta 177), reused 167 (delta 51)
Receiving objects: 100% (334/334), 96.42 KiB | 0 bytes/s, done.
Resolving deltas: 100% (177/177), completed with 70 local objects.
From https://github.com/jeromechan/project
 * branch            test       -> FETCH_HEAD
   f5a095a..18b49aa  test       -> origin/test
```

然后，我们看下`.git/FETCH_HEAD`文件内容：

```sh
➜ /jeromechan/project git:(project) ✗>vim .git/FETCH_HEAD

## 文件内容如下
18b49aaa008731ff17768d6b18905fc5865b3aa7  branch 'test' of https://github.com/jeromechan/project
```

**2. git fetch**

该命令可以将远程repo所包含的所有分支（或者指定分支）的最新commit-id记录到`.git/FETCH_HEAD`文件中。

**3. git pull**

该命令是GIT更新local repo和working copy的文件。在之前的文章中，提及过`git pull = git fetch + git merge FETCH_HEAD(by default)`，这里就不再重复提及了，如果想复习了解，请看“前言”中列出的几篇GIT基础知识文章。

**4. commit-id**

commit-id指的是每一次`git commit`操作所生成的每一个版本号，是一个能唯一标识一个版本的序列号。在使用git push后，这个序列号还会同步到远程repo。

#### 三、如何执行合并操作

这里举例两个常见的场景对合并操作进行解释。

**1. 将相同分支下，已经产生分支冲突的代码，合并到本地working copy中**

这类场景下，由于分支是相同的，产生冲突无异于因为差异版本之间，相同的代码区块发生了相同位置的变更，然后冲突就这样产生了。   
这类冲突不难解决，可以使用交互式命令行`git rebase`、Git-GUI客户端工具的rebase-from的操作，指定来源分支，借用其中的交互式操作，可以逐个逐个地进行`commit-id`的代码合并。

**2. 将其他分支B的代码差异，合并到当前工作分支A的working copy中**

这类场景常常发生在多人协作的实际工作中。例如需要将工作分支A的代码提交到分支B上，但分支B与工作分支A出现了不可合并的代码冲突，此时就需要将分支B的差异代码合并到当前的工作分支A中，然后再做提交与合并。

这个时候，我们可以按照如下几个步骤进行：

（1）git checkout A

将当前工作分支切换到分支A。

（2）git fetch https://github.com/jeromechan/project B 

将分支B的末端版本（HEAD）检出到FETCH_HEAD文件中。

（3）git merge FETCH_HEAD

基于本地`.git/FETCH_HEAD`记录，比对本地工作分支A的版本与FETCH_HEAD所记录的分支B末端版本信息，利用`git merge`将分支B的差异内容合并更新到工作分支A中。   
此操作过程中如果出现conflicts，那么是需要开发者进行自助解决的。这一部分，如果是整体作accept合并，那么一定要留意“theirs”和“mine”的关系，“theirs”通常指的是来源代码分支（即当前示例所述的分支B），而“mine”便是你的本地分支A了。

（4）git commit

将当前合并下来的commit-id及其内容提交到A分支上。

（5）git push https://github.com/jeromechan/project HEAD

将提交的commit-id及其变更内容，推送到远程repo的分支A上。

本篇到这里已阐述完。以上所述内容，一定可以帮助各位解决许多的合并代码的问题了。

 

