# 数据存储策略 — 后台弃 MySQL，默认 PostgreSQL

> 权威规格：[datastore-strategy v2.2](https://github.com/dataluminary/DataLuminary-Platform/blob/main/spec/datastore-strategy.md)

## 架构选型（服务端）

**LuminaryWorks 后台 OLTP 彻底弃用 MySQL。** 凡需要关系型数据库的服务端，统一 **PostgreSQL**。这是架构层决策，不是单次迁移项目。

| 原则 | 说明 |
|------|------|
| **弃 MySQL（后台）** | 新产品/新服务不得把 MySQL 当 OLTP；遗留 compose 须清理 |
| **PostgreSQL** | DataLuminary、SyncroBrain、Logto、BlockyEdu、VistaCast 等后台默认引擎 |
| **SQLite** | **仅 DoerFlow** 链下索引（嵌入式，非 MySQL 折中） |
| **MySQL 插件** | **仅** DataTalk 连接**客户**已有库 — 与平台后台无关 |

### 为何选 PostgreSQL（尤其 AI 生态）

1. **扩展性好** — JSONB、扩展（如 `pgvector`）便于 AI 元数据、RAG、权限字段演进。  
2. **行业默认** — 新项目与 AI 圈子（Supabase、Neon、开源 Agent/IdP 栈）普遍以 PG 为默认关系库。  
3. **运维一致** — 与 Logto、多产品私有化交付同栈，客户只需维护一种 OLTP。  

更完整说明：[why-postgresql](https://github.com/dataluminary/DataLuminary-Platform/blob/main/spec/development/why-postgresql.md)

## 各产品 OLTP

| 产品 | 引擎 | 状态 |
|------|------|------|
| **DataLuminary** | PostgreSQL :5433 | ✅ 已迁移 |
| **Logto** | PostgreSQL :5432 | ✅ |
| **SyncroBrain** | PostgreSQL :5434 | 🟡 |
| **BlockyEdu** | PostgreSQL（目标） | ⬜ 自 SQLite MVP，不经 MySQL |
| **DoerFlow** | **SQLite**（文件库） | ✅ 保持 |
| **VistaCast** | PostgreSQL（目标） | ⬜ ADM-1，不经 MySQL |

## DataLuminary 验收

`pnpm bootstrap` → `data_talk` 库含 `user`、`space`、`dashboard`、`migrations` 等表。

## 路线图

[ecosystem-datastore-roadmap](https://github.com/dataluminary/DataLuminary-Platform/blob/main/plan/ecosystem-datastore-roadmap.md)

## 其他存储

ClickHouse（分析）· Milvus（向量）· Redis（缓存）· S3/MinIO（对象）
