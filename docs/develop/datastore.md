# 数据存储策略

生态后台默认采用 **PostgreSQL** 作为关系型 OLTP，避免多产品私有化时维护异构数据库栈。

## 选型原则

| 原则 | 说明 |
|------|------|
| **PostgreSQL 默认** | DataLuminary、SyncroBrain、Logto、BlockyEdu、VistaCast、VistaRemote 等后台统一 PG |
| **SQLite 特例** | DoerFlow 链下索引采用嵌入式 SQLite，适配单机 / 边缘部署 |
| **客户侧 MySQL** | 仅作为 DataTalk 连接客户已有库的数据源插件，不作为平台后台引擎 |

### 为什么是 PostgreSQL

1. **扩展性好** — JSONB、`pgvector` 等扩展便于 AI 元数据、RAG 与权限模型演进  
2. **行业默认** — 新项目与 AI / IdP 开源栈普遍以 PG 为默认关系库  
3. **运维一致** — 多产品私有化交付只需维护一种 OLTP

## 各产品存储定位

| 产品 | OLTP | 说明 |
|------|------|------|
| **DataLuminary** | PostgreSQL | 平台主库与大屏元数据 |
| **Identity / Logto** | PostgreSQL | 统一身份数据 |
| **SyncroBrain** | PostgreSQL | 网关与业务元数据；时序可叠加 ClickHouse |
| **BlockyEdu** | PostgreSQL | 课程、账号与教学数据 |
| **VistaCast** | PostgreSQL | 摄像头、规则与告警数据 |
| **VistaRemote** | PostgreSQL | 会话、设备与审计数据 |
| **DoerFlow** | SQLite | 链下索引与边缘友好部署 |

## 其他存储

ClickHouse（分析）· Milvus（向量）· Redis（缓存）· S3 / MinIO（对象存储）
