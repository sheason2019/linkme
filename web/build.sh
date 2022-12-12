docker build ../ -t sheason/linkme-web -f ./Dockerfile

docker run -v /var/linkme/web:/var/linkme/web sheason/linkme-web 