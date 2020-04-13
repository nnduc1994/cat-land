# Cat land full stack app
This is a demo of the full-stack web-app built with the following stack: 
* Backend: Serverless, AWS lambda, MongoDB Atlast, Mongoose
* Frontend: React + Material UI component
* Static frontend hosted in : AWS S3

App features include: 
* Showing a list of cat breeds
* User can search cat breeds by name and/or country origin
* Pagination is handled in backend to optimize performance
* User can click on the cat breed's name to see a cat breed's page

### Demo: http://cat-land-frontend.s3-website-eu-west-1.amazonaws.com/

### TODO - MISSING: 
* Unit / Snapshot for frontend
* Better way to connect to monogoDB atlast in AWS Lambda. For example: `set callbackWaitsForEmptyEventLoop = false on the context`, this will let's lambda to reuse existed connection rather than making new connection everytime


The project used mono repo style (frontend, lib and services) and using `yarn workspace` to handle dependencies easily. To install all requires dependencies for lib, frontend and all services, run `yarn install` in the root of the project


## Set up environment from scratch 
If needed to set up a new environment, remember to run `bash ssm-put.sh` first to set up necessary ssm secret. 
Remember to edit the `ssm-put.sh` before run, required mongoDB user and mongoDB password need to be updated
Command: `ssm-put.sh <stage> <profile>`

## How to run project locally
In the root of the project run `yarn install` for the very first time.
`cd` to services/cat-api and run  `sls offline start` --> this will start a backend locally
In another terminal `cd ` to frontend and run `yarn start` --> this will start the frontend (**Remember to run backend before frontend**)

**Note** when running the backend locally, the backend will connect to test db - which hosted in Mongo Atlast. With this setup, developer doesn't need to set up mongoDB in his/her computer (This also follow GDPR if some real user data is needed during development cycle)

## Deploy backend 
cd to  `services/cat-api/` and run `sls deploy --stage <stage> --aws-profile <your-profile>`
note down the AWS lambda endpoint (will need when deploy frontend). Make sure all the necessary ssm keys are in AWS (check **Set up environment from scratch** section) 

## Deploy frontend
Create a new S3 bucket in AWS
Configure a Amazon S3 Bucket for Static Website Hosting
Set `index.html` for both Index document and Error document
Uncheck Block all public access in S3 bucket setting
Adding Bucket policy
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::<front-end-bucket-name>/*"
            ]
        }
    ]
} 
```

`cd` to frontend folder and update `prod - backendURL` in `config.js` with the URL from deployed backend
run `yarn build`, new build will be created in build folder
copy paste every files inside `build` folder ( **Not the build folder** ) and upload it to S3 bucket
Check the website URL from S3


The project structure is described below:
```
/ - root folder
│
│
└─── frontend (React)
│
│
└───lib - shared library between services within project
│    │
│    └───models - Monggoes models and classes 
│    │
│    └───utils
│
└───services - Code for APIs
    │
    └───cat-api
    │    │
    │    └───src
    │    │     └───get.js
    │    │     └───list.js
    │    │     └───etc...
    │    │
    │    └───package.json
    │    │
    │    └───servless.yaml (each service is a separate CF stack)
    │    │
    │    └───webpack.config.js
    │
    └───service 2

```
