# Assessment - Caelan

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The following software is required:
- NodeJS + npm [https://nodejs.org/en/download/package-manager]
- MongoDB Community Edition [https://www.mongodb.com/docs/manual/administration/install-community/]
- (OPTIONAL) Go [https://go.dev/doc/install]

After installing the required software, start MongoDB:
- Note: The instructions for starting MongoDB are available within the [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/) link above.

## Setup

Navigate to the directory where you would like to clone the repository.
Then clone this repository:

```bash
git clone https://github.com/caelan-2/assessment.git
```

Then change directory to the project:

```bash
cd assessment
```

## Building

To use custom configuration, edit the .env file:

Note: this step is optional.

```bash
ASSESSMENT_MONGO_URL=<enter-mongo-url>
ASSESSMENT_COLLECTION_NAME=<enter-collection-name>
NEXT_PUBLIC_ASSESSMENT_API_TOKEN=<enter-file-name>
```

Then, run:

```bash
npm run build
```

To start the app, run:

```bash
npm run start
```

## Building with Go (OPTIONAL)

First, run:

```bash
go build main.go
```

Executing the generated binary will start the app.

To start the app with the default configuration, execute the binary without any options. For example:

```bash
./main
```

To view configuration info, execute the binary with the '--help' option. For example:

```bash
./main --help
```

To use custom configuration, execute the binary with the desired config options:

```bash
./main -mongo-url=<enter-mongo-url> -table=<enter-table-name> -token-file=<enter-token-file>
```

- -mongo-url: is the URL for the MongoDB instance to be used. (default: "mongodb://127.0.0.1:27017")
- -table: is the name of the collection (table) to be used by the app. (default: "caelan-assessment")
- -token-file: is the name of the file that contains the API authorization token. (default: "api-token")
- -nobuild: is used to skip the build step, this is useful if the build step has already been run.

NOTE: The provided token in this repository is a demo token. Providing your own token file or editing the provided token file with a valid token is required for non-demo use.

NOTE: The token file must be within the project root directory: 'assessment'.
