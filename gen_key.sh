#!/bin/bash
mkdir -p /root/.ssh
ssh-keygen -t ed25519 -f /root/.ssh/github_deploy -N "" -C "github-actions-deploy"
echo "---PUBLIC KEY---"
cat /root/.ssh/github_deploy.pub
echo "---PRIVATE KEY---"
cat /root/.ssh/github_deploy
