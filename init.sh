# 创建博客根目录
mkdir /var/linkme
# 修改目录权限
chmod -R 777 /var/linkme
# 将Nginx配置文件放到指定的位置
cd ./nginx
sh ./cp-to-volumn.sh
cd ../
# 构建Web网站
cd ./web
sh build.sh
cd ../

