echo "开始构建服务端Docker镜像"
docker build . -t sheason/linkme-server
echo "服务端Docker镜像已构建完成"