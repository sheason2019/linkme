# 开发须知

为了防止生产环境的数据库用户密码泄漏，该项目在`.gitignore`文件中屏蔽了一些敏感文件，如果不将这些文件再次手动写入项目，则源码编译将无法通过。

目前主要有以下两个文件需要手动进行写入：

- /server/db/profile_product.go

    ```go
    //go:build product
    package db

    // 开发状态下的Database Profile信息
    var host = "localhost"
    var user = "postgres"
    var password = "123456"
    ```

- /docker-compose.override.yml

    ```yml
    version: "3"
    services:
    postgres:
        environment:
        - POSTGRES_USER=postgres
        - POSTGRES_PASSWORD=123456
        ports:
        - 5432:5432
    ```

其实主要就是数据库相关的信息，将这两个文件按照自己的需要改写好用户名或密码后即可正常进行编译。