#!/bin/sh
# Cloudflare Workers Builds 의 빌드 명령. 대시보드에는 `sh scripts/cf-build.sh` 만 넣는다.
set -e

curl -fsSL https://mise.run | sh
export PATH="$HOME/.local/bin:$PATH"

# CF 빌드 이미지의 mise config 가 우리 것과 합쳐지는데, 거기 hugo 가 설치 불가라
# (mise 가 `vextended_...` 로 조회해 404) 실패를 받아넘겨야 체인이 안 끊긴다.
# bun 이 진짜 안 깔리면 아래 `mise which` 가 빈 값을 내고 bun install 에서 죽는다.
mise install || true

export PATH="$(dirname "$(mise which bun)"):$(dirname "$(mise which node)"):$PATH"

bun install --frozen-lockfile
bun run build
