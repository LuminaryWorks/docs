# 文档使用边界

本文件约束本 Git 仓库中的产品文档；文档站若已发布，站内页面适用同一边界。许可证原文在仓库根目录 [LICENSE](./LICENSE)。

这些文档是公开的，供人阅读。发布站点：https://docs.luminaryworks.dev。

搜索引擎可以抓取页面、建立索引，并在搜索结果中显示标题和短摘录。短摘录不包括把正文交给生成式模型。

## 不许可

权利人是 LuminaryWorks（启明工坊）。仓库根目录的 LICENSE 是 [Polyform Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0)。下面两种使用没有获得许可，也不属于该许可证中的允许目的：

1. 用这些文档训练、微调或评测机器学习模型，包括当作预训练语料、指令数据或偏好数据。
2. 把这些文档当作规格或输入，生成、改写或拼装出与 LuminaryWorks（启明工坊） 实质相同或可替代的产品、架构或实现。包括把全文交给对话式 AI，让它按这些文档做一套一样的产品。

普通人阅读、链接到文档、引用短句，以及法律没有允许权利人排除的合理使用，仍然可以。

## 机器可读声明

同一边界也写在爬虫能读的位置。文档站发布后可以在这些地址看到：

- `/robots.txt`：允许搜索；`Content-Signal: search=yes, ai-train=no, ai-input=no`；并拒绝常见 AI 爬虫抓取全文
- `/.well-known/tdmrep.json`：按欧盟《数字化单一市场版权指令》第 4 条，保留文本与数据挖掘权利（`tdm-reservation: 1`）
- 每个 HTML 页面的 `noai`、`noimageai`、`noarchive` 与 `tdm-reservation`

GitHub 上的仓库页面由 GitHub 控制，不能靠文档站的 robots.txt 挡住。对仓库副本，以本说明和 LICENSE 为准。

## 做不到的事

文档只要公开，就拦不住有人复制文字再贴进某个 AI。这些声明也删不掉已经进过模型的旧副本。它们写明这项使用没有许可，并让遵守 robots.txt 和欧盟保留声明的爬虫不要把文档收进训练集，或当作模型输入。

## English

This documentation is public for people to read and for search engines to index titles and short excerpts.

You may not use it to train or fine-tune machine-learning models, or as input to generate a competing or substantially similar implementation of LuminaryWorks（启明工坊）. That includes pasting these documents into a chatbot and asking it to rebuild the product.

This is not a technical lock. It is a rights reservation, including a machine-readable reservation of text-and-data-mining rights under EU Directive 2019/790 Article 4.
