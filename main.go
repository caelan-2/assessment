package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"os/exec"
)

var (
	mongoURL = "mongodb://127.0.0.1:27017"
	collectionName = "caelan-assessment"
	noBuild = false
)

func main() {
	flag.StringVar(&mongoURL, "db", mongoURL, "URL of the MongoDB instance.")
	flag.StringVar(&collectionName, "table", collectionName, "MongoDB collection (table) to use.")
	flag.BoolVar(&noBuild, "nobuild", noBuild, "Skip the Install and Build steps.")
	flag.Parse()
	var err error
	if !noBuild {
		createEnvFile()
		// install
		installCmd := exec.Command("npm", "install")
		installCmd.Stdin = os.Stdin
		installCmd.Stdout = os.Stdout
		installCmd.Stderr = os.Stderr
		if err = installCmd.Run(); err != nil {
			log.Fatal("failed to execute 'npm install': ", err)
		}
		// build
		buildCmd := exec.Command("npm", "run", "build")
		buildCmd.Stdin = os.Stdin
		buildCmd.Stdout = os.Stdout
		buildCmd.Stderr = os.Stderr
		if err = buildCmd.Run(); err != nil {
			log.Fatal("failed to execute 'npm run build': ", err)
		}
	}
	// start
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
	envFile.Write([]byte(fmt.Sprintf("ASSESSMENT_MONGO_URL=%s\n", mongoURL)))
	envFile.Write([]byte(fmt.Sprintf("ASSESSMENT_COLLECTION_NAME=%s\n", collectionName)))
	if err = envFile.Sync(); err != nil {
		log.Fatal("failed to sync .env file: ", err)
	}
}