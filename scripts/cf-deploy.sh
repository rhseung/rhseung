#!/bin/sh
# Cloudflare Workers Builds 의 배포 명령. 인자는 그대로 wrangler 에 넘어간다.
#   production  sh scripts/cf-deploy.sh --env=""
#   staging     sh scripts/cf-deploy.sh --env staging
set -e

export PATH="$HOME/.local/bin:$PATH"
export PATH="$(dirname "$(mise which node)"):$(dirname "$(mise which wrangler)"):$PATH"

exec wrangler deploy "$@"
