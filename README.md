This is a boilerplate for new Serverless project. 

The project used mono repo style (frontend, lib and services) and using `yarn workspace` to handle dependencies easily. To install all requires dependencies for lib, frontend and all services, run `yarn install` in the root of the project


# set up environment from scratch 
If needed to set up a new environment, remember to run `bash ssm-put.sh` first to set up necessary ssm secret. 
Remember to edit the `ssm-put.sh` before run, required mongoDB user and mongoDB password need to be updated
Command: `ssm-put.sh <stage> <profile>`


# Deploy backend 
cd to  `services/cat-api/` and run `sls deploy --stage <stage> --aws-profile <your-profile>`


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
│    │
│    └───cat-api
│    │    │
│    │    └───src
│    │    │     └───get.js
│    │    │     └───list.js
│    │    │     └───etc...
│    │    │
│    │    └───package.json
│    │    │
│    │    └───servless.yaml (each service is a separate CF stack)
│    │    │
│    │    └───webpack.config.js
│    │
│    └───service 2
│
└───tests - Tests for services or utils
```
