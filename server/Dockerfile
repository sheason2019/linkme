FROM golang:alpine

WORKDIR /build

ADD . .

RUN go env -w GOPROXY=https://goproxy.cn,direct

RUN mkdir ./dist

RUN go build -o ./dist/linkme-server -tags product .

ENTRYPOINT ["/build/dist/linkme-server"]