# 创建博客根目录
mkdir /var/linkme
# 修改目录权限
chmod -R 777 /var/linkme
# 将Nginx配置文件放到指定的位置
cd ./nginx
sh ./cp-to-volumn.sh
cd ../
# 构建服务端镜像
cd ./server
sh ./build.sh
cd ../
# 构建Web网站
cd ./web
rm -rf node_modules
npm i
npm run build
cd ../
# 再次修改目录下所有文件的权限
chmod -R 777 /var/linkme
# 构建Socket服务
cd socket
sh build.sh
cd ../
# 使用docker-compose构建
docker-compose up -d

