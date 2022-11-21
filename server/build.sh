echo "开始编译Go程序"
go build -o ./build/linkme-server -tags product . 
echo "Go程序编译完成"

echo "开始构建Docker镜像"
docker build . -t sheason/linkme-server
echo "Docker镜像已构建完成"