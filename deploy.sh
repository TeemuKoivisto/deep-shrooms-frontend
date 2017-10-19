#!/bin/bash
export AWS_PROFILE=deepshroom
# Copy the build into bucket and delete all existing files
aws s3 sync ./build s3://deep-shrooms-frontend \
  --region eu-central-1 \
  --acl bucket-owner-full-control \
  --cache-control max-age=2592000 \
  --delete

# Copy index.html the second time with decreased cache duration
aws s3 cp ./build/index.html s3://deep-shrooms-frontend \
  --region eu-central-1 \
  --acl bucket-owner-full-control \
  --cache-control max-age=120
