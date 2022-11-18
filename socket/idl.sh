omi-codegen -commonjs -o api-lib -l ts -t client ../idl/chat.omi

omi-codegen -commonjs -o api-lib -l ts -t client ../idl/account.omi

omi-codegen -commonjs -o api-lib -l ts -t server ../idl/socket.omi
