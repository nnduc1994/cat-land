#! /usr/bin/env bash

if [ "$1" != "" ]; then
    ENV=$1
else
    echo "Please add an environment to deploy (dev,testing,production)"
    exit 0
fi

if [ "$2" != "" ]; then
    PROFILE=$2
else
    echo "Please define profile to be used"
    exit 0
fi

mongoUser="cat-db-prod"
mongoPassword="Abcprod123"

aws ssm put-parameter --cli-input-json "{\"Name\": \"/cat-land/${ENV}/mongo-user\", \"Value\": \"${mongoUser}\", \"Type\": \"SecureString\"}" --overwrite --region eu-west-1 --profile ${PROFILE}
aws ssm put-parameter --cli-input-json "{\"Name\": \"/cat-land/${ENV}/mongo-password\", \"Value\": \"${mongoPassword}\", \"Type\": \"SecureString\"}" --overwrite --region eu-west-1 --profile ${PROFILE}
