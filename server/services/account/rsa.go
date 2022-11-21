package accountService

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"os"

	"github.com/sheason2019/linkme/utils"
)

// 参考：https://www.jianshu.com/p/f666412a9a35

// 生成RSA密钥对文件
func GenRsaFile() {
	// 首先尝试获取当前的RsaKeyPair
	_, err := readRsaKeyFromFile()
	if err != nil {
		// 若产生错误，则表示无法获取到当前的RSA密钥对，需要重新生成
		keyPair, err := genRsaKey()
		if err != nil {
			panic(err)
		}
		// 将KeyPair写入文件系统实现持久化
		err = writeRsaKeyIntoFile(keyPair.PubKey, keyPair.PriKey)
		if err != nil {
			panic(err)
		}
	}
}

// 获取RSA密钥对
func GetRsaKeyPair() (*RsaKeyPair, error) {
	return readRsaKeyFromFile()
}

func genRsaKey() (*RsaKeyPair, error) {
	keyPair := &RsaKeyPair{}
	// 生成RSA密钥对
	privateKey, err := rsa.GenerateKey(rand.Reader, 1024)
	if err != nil {
		return nil, err
	}
	derStream := x509.MarshalPKCS1PrivateKey(privateKey)
	block := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: derStream,
	}
	prvkey := pem.EncodeToMemory(block)
	publicKey := &privateKey.PublicKey
	derPkix, err := x509.MarshalPKIXPublicKey(publicKey)
	if err != nil {
		return nil, err
	}
	block = &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: derPkix,
	}
	pubkey := pem.EncodeToMemory(block)
	keyPair.PriKey = string(prvkey)
	keyPair.PubKey = string(pubkey)
	return keyPair, nil
}

// 公钥加密
func RsaEncrypt(data, keyBytes []byte) []byte {
	//解密pem格式的公钥
	block, _ := pem.Decode(keyBytes)
	if block == nil {
		panic("public key error")
	}
	// 解析公钥
	pubInterface, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		panic(err)
	}
	// 类型断言
	pub := pubInterface.(*rsa.PublicKey)
	//加密
	ciphertext, err := rsa.EncryptPKCS1v15(rand.Reader, pub, data)
	if err != nil {
		panic(err)
	}
	return ciphertext
}

// 私钥解密
func RsaDecrypt(ciphertext, keyBytes []byte) []byte {
	//获取私钥
	block, _ := pem.Decode(keyBytes)
	if block == nil {
		panic("private key error!")
	}
	//解析PKCS1格式的私钥
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		panic(err)
	}
	// 解密
	data, err := rsa.DecryptPKCS1v15(rand.Reader, priv, ciphertext)
	if err != nil {
		panic(err)
	}
	return data
}

type RsaKeyPair struct {
	PubKey string
	PriKey string
}

const secret_path = "/var/linkme/secret"
const pri_file = "rsa_key"
const pri_file_path = secret_path + "/" + pri_file
const pub_file = "rsa_key_pub"
const pub_file_path = secret_path + "/" + pub_file

func writeRsaKeyIntoFile(pubKey, priKey string) error {
	// 判断目录是否存在
	_, err := os.Stat(secret_path)
	// 不存在则创建目录
	if err != nil {
		os.Mkdir(secret_path, 0777)
	}

	err = utils.WriteInfoFile(secret_path, pri_file, []byte(priKey))
	if err != nil {
		return err
	}

	err = utils.WriteInfoFile(secret_path, pub_file, []byte(pubKey))
	if err != nil {
		return err
	}

	return nil
}

func readRsaKeyFromFile() (keyPair *RsaKeyPair, err error) {
	keyPair = &RsaKeyPair{}
	priContent, err := os.ReadFile(pri_file_path)
	if err != nil {
		return nil, err
	}
	keyPair.PriKey = string(priContent)

	pubContent, err := os.ReadFile(pub_file_path)
	if err != nil {
		return nil, err
	}
	keyPair.PubKey = string(pubContent)

	return
}
