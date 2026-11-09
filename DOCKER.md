# Docker 镜像与架构策略（LuminaryWorks 生态）

适用于 **LuminaryWorks** 本仓及旗下产品（BlockyEdu、DataLuminary、DoerFlow、SyncroBrain、VistaCast、VistaRemote、deployment 等）在本机开发与服务器部署时的镜像选型。

## 本机运行

- 只跑与**本机 CPU**匹配的镜像。
- Apple Silicon（arm64）：**禁止** amd64/x86 镜像（含 Docker Desktop qemu / Rosetta 模拟）。
- 需要重 CPU 工具（如 ffmpeg）时：优先本机原生二进制（如 Homebrew），其次才是 arm64 容器。

## 选型与迁移

- 优先 **multi-arch** 镜像（同一 tag 含 `linux/arm64` 与 `linux/amd64` manifest list）。
- 不要绑死「只能在 AMD 服务器」或「只能在 ARM」；换机/换云应尽量不改 tag。
- 禁止在 compose 中为本地图省事写死 `platform: linux/amd64`。
- 业务镜像发布：`docker buildx build --platform linux/arm64,linux/amd64` 推同一 tag。

## 自检

```bash
uname -m
docker buildx imagetools inspect IMAGE:TAG
docker image inspect IMAGE --format '{{.Architecture}}'
```
