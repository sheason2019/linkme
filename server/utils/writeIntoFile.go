package utils

import "os"

func WriteInfoFile(path, file string, content []byte) error {
	err := os.MkdirAll(path, os.ModePerm)
	if err != nil {
		return err
	}

	f, err := os.Create(path + "/" + file)
	if err != nil {
		return err
	}

	defer f.Close()

	_, err = f.Write(content)
	if err != nil {
		return err
	}

	return nil
}
