omi-codegen -packageRoot github.com/sheason2019/linkme/omi -o omi -l go -t server ../idl/user.omi

go fmt ./omi

find ./omi -name "*.go" | xargs gofmt -w