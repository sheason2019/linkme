omi-codegen -packageRoot github.com/sheason2019/linkme/omi -o omi -l go -t server ../idl/account.omi

omi-codegen -packageRoot github.com/sheason2019/linkme/omi -o omi -l go -t server ../idl/chat.omi

omi-codegen -packageRoot github.com/sheason2019/linkme/omi -o omi -l go -t server ../idl/admin.omi

omi-codegen -packageRoot github.com/sheason2019/linkme/omi -o omi -l go -t client ../idl/socket.omi

go fmt ./omi

find ./omi -name "*.go" | xargs gofmt -w