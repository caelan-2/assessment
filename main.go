package main

import (
	"bytes"
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
)

var (
	mongoURL = "mongodb://127.0.0.1:27017"
	collectionName = "caelan-assessment"
	apiTokenFile = "demo-token"
	noBuild = false
)

func main() {
	flag.StringVar(&mongoURL, "mongo-url", mongoURL, "URL of the MongoDB instance.")
	flag.StringVar(&collectionName, "table", collectionName, "MongoDB collection (table) to use.")
	flag.StringVar(&apiTokenFile, "token-file", apiTokenFile, "API authorization token file.")
	flag.BoolVar(&noBuild, "nobuild", noBuild, "Skip the 'npm install' and 'npm run build' steps and only run the 'npm run start' step.")
	flag.Parse()
	var err error
	if !noBuild {
		createEnvFile()
		// Install
		installCmd := exec.Command("npm", "install")
		installCmd.Stdin = os.Stdin
		installCmd.Stdout = os.Stdout
		installCmd.Stderr = os.Stderr
		if err = installCmd.Run(); err != nil {
			log.Fatal("failed to execute 'npm install': ", err)
		}
		// Build
		buildCmd := exec.Command("npm", "run", "build")
		buildCmd.Stdin = os.Stdin
		buildCmd.Stdout = os.Stdout
		buildCmd.Stderr = os.Stderr
		if err = buildCmd.Run(); err != nil {
			log.Fatal("failed to execute 'npm run build': ", err)
		}
	}
	// Start
	runCmd := exec.Command("npm", "run", "start")
	runCmd.Stdin = os.Stdin
	runCmd.Stdout = os.Stdout
	runCmd.Stderr = os.Stderr
	if err = runCmd.Run(); err != nil {
		log.Fatal("failed to execute 'npm run start': ", err)
	}
}

func createEnvFile() {
	envFile, err := os.Create(".env")
	if err != nil {
		log.Fatal("failed to create .env file: ", err)
	}
	defer envFile.Close()
	tokenFile, err := os.Open(apiTokenFile)
	if err != nil {
		log.Fatal("failed to open API token file: ", err)
	}
	defer tokenFile.Close()
	tokenBuffer := bytes.NewBuffer(nil)
	if _, err = tokenBuffer.ReadFrom(tokenFile); err != nil {
		log.Fatal("failed to read token from file: ", err)
	}
	envFile.Write([]byte(fmt.Sprintf("ASSESSMENT_MONGO_URL=%s\n", mongoURL)))
	envFile.Write([]byte(fmt.Sprintf("ASSESSMENT_COLLECTION_NAME=%s\n", collectionName)))
	envFile.Write([]byte(fmt.Sprintf("NEXT_PUBLIC_ASSESSMENT_API_TOKEN=%s\n", tokenBuffer.String())))
	if err = envFile.Sync(); err != nil {
		log.Fatal("failed to sync .env file: ", err)
	}
}