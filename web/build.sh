docker build ../ -t sheason/linkme-web -f ./Dockerfile

docker run sheason/linkme-web -v /var/linkme/web:/var/linkme/web