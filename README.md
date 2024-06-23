# Assessment - Caelan

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone this repository:

```bash
git clone https://todo.todo.com
```

## Setup

To run the app the following software is required:
- NodeJS + npm [https://nodejs.org/en/download/package-manager]
- MongoDB Community Edition [https://www.mongodb.com/docs/manual/administration/install-community/]
- (OPTIONAL) Go [https://go.dev/doc/install]

After installing the required software, start MongoDB:
- Note: The instructions for starting MongoDB are available within the MongoDB install link above.

## Build

### Building with Go

First, run:

```bash
go build main.go
```

To start the app with the default configuration, run:

```bash
./main
```

To view configuration info, run:

```bash
./main --help
```

To use custom configuration, run:

```bash
./main -db=<enter-mongo-url> -table=<enter-collection-name>
```

### Building without Go

(OPTIONAL) To use custom configuration, edit the .env file:

```bash
ASSESSMENT_MONGO_URL=<enter-mongo-url>
ASSESSMENT_COLLECTION_NAME=<enter-collection-name>
```

Then, run:

```bash
npm run build
```

To start the app, run:

```bash
npm run start
```