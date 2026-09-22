# 배포와 도구 버전

빌드와 배포가 어떻게 돌아가는지, 그리고 한 번씩 발을 헛디뎠던 자리를 적어 둔다.
코드를 쓸 때 지켜야 하는 규칙은 `AGENTS.md`에 있고, 여기는 사람이 배포를 만질 때 읽는다.

## 도구 버전 고정

**도구 버전은 `mise.toml`이 고정한다.** `bun`, `fnox`, `node`, `wrangler`를 정확한 버전으로
박고 `mise.lock`이 플랫폼별 checksum까지 잠근다. 전에는 로컬이 전역 mise의 `latest`를, CI가
`setup-bun`의 `bun-version: latest`를 각자 탔다. `engines.bun`의 `>=1.3.0`은 하한선이라
둘이 갈리는 것을 막지 못한다. CI는 `jdx/mise-action@v4`가 `--locked`로 설치한다.

`[settings]`에 `locked`는 넣지 않는다. 전역 설정까지 잠그고, `locked_scopes`로 범위를
좁히려 해도 비전역 config에서는 보안상 무시되기 때문이다. `disable_tools`처럼 잘 먹는
설정은 있다.

### `mise.toml`과 `package.json`의 경계

mise는 **저장소 바깥에서 와야 하는 것**을 맡는다. `bun`은 package.json을 읽는 주체라 거기
들어갈 수 없고, `fnox`는 shell hook이며, `wrangler`는 배포 CLI다. `node`는 wrangler가 타는
runtime이다. 나머지 npm 패키지는 전부 `package.json`에 있고 `bun.lock`이 잠근다. prettier,
eslint, playwright, panda, astro가 다 거기 있다.

**`node`를 빼면 안 된다.** `wrangler`는 `#!/usr/bin/env node`로 시작해서, 박아 두지 않으면
로컬과 빌드 환경이 각자 다른 node를 타고 버전이 갈린다.

### `disable_tools`를 지우면 빌드가 깨진다

Cloudflare 빌드 이미지는 자기 mise config에 `hugo`, `go`, `ruby`, `python`, `nub`을 들고
있고 그것이 우리 `mise.toml`과 합쳐진다. 그중 `hugo@extended_0.147.7`은 mise가
`vextended_...`로 조회하는 버그 때문에 **설치가 영영 되지 않는다.** 이미지에는 이미 깔려
있는데도 그렇다. 거기서 비정상 종료해 빌드가 통째로 실패한다. 덤으로 ruby 92MB, go 78MB를
내려받지 않아서 빌드도 빨라진다. 로컬에는 그 도구들이 없으므로 껐을 때 잃는 것이 없다.

**`fnox`는 여기 넣으면 안 된다.** `mise.toml`은 로컬과 CI가 같이 읽어서, 끄면 로컬에서
secret이 나오지 않는다. CI에서 fnox를 설치하기는 하지만 쓰지는 않는다. R2 자격증명은
worker 환경변수로 직접 준다.

## 환경변수와 secret

**`PUBLIC_*` toggle은 `mise.toml`의 `[env]`에 있다.** 비밀이 아니므로 fnox가 아니다.
한 번 켜 볼 때는 `PUBLIC_DEVTOOLS=1 bun run dev`로 그 자리에서 덮는다.

**secret은 `fnox`가 준다. `.env` 파일은 없다.** `fnox.toml`이 1Password 참조만 담아
커밋되어 있고, `fnox activate zsh` hook이 이 디렉토리에 들어올 때 값을 export한다. 그래서
대화형 shell에서는 그냥 `bun run ...`이면 되고, CI나 GUI 앱처럼 hook이 없는 곳에서만
`fnox exec -- <cmd>`를 앞에 붙인다. 새 secret은 `fnox.toml`의 `[secrets]`에
`value = "op://<vault>/<item>/<field>"`로 적는다. 필드 이름이 `key`가 아니라 `value`다.

## 배포 경로

**배포는 Cloudflare Workers Builds가 한다.** GitHub Actions가 아니다. worker마다 저장소가
연결되어 있고(`rhseung`은 `main`, `rhseung-staging`은 `staging`), 대시보드의 빌드와 배포
명령이 `mise`를 그 자리에 설치해 `mise.toml` 버전으로 빌드한다. Cloudflare 빌드 이미지가
주는 bun은 1.2.15라서 그냥 두면 우리 1.4.2와 갈린다.

**빌드와 배포 명령은 `mise.toml`의 `[tasks]`에 있다.** 대시보드에는 `mise run cloudflare:build`
처럼 부르는 줄만 넣는다. worker가 둘이라 명령을 대시보드에만 두면 복사본이 갈리고
`git blame`으로 닿을 수도 없기 때문이다. `mise run`은 **누락된 도구를 알아서 설치하고**
task를 실행할 때 PATH에 올려 주므로, `mise install`과 `mise exec --`가 둘 다 필요 없다.
앞의 `curl | sh`와 `export PATH`만 대시보드에 남는데, mise 자체를 올리는 bootstrap이라
그것은 task로 옮길 수 없다.

### secret이 어디에 들어가는가

**빌드 환경변수는 대시보드에서만 넣을 수 있다.** wrangler에 builds 명령이 없고 API도 없다.
문서가 "Workers Builds does not honor the configurations set in Custom Builds within your
Wrangler configuration file"이라고 못 박는다. 그래서 빌드가 아는 secret을 최소로 줄였다.

| secret                                      | worker 런타임 | 빌드 환경변수 |
| ------------------------------------------- | ------------- | ------------- |
| `RENDER_TOKEN`                              | 양쪽          | 양쪽          |
| `ACCESS_CLIENT_ID` / `ACCESS_CLIENT_SECRET` | staging만     | staging만     |

production은 하나, staging은 셋이다. Access 둘이 빌드 환경에도 필요한 이유는
`cloudflare:resume` task가 거기서 돌면서 render 호출과 smoke 확인에 그 헤더를 싣기
때문이다. staging의 Access 정책은 worker 자체에 붙어 있어서 경로로 우회할 수 없다.

런타임 쪽은 손으로 넣지 않는다.

```sh
fnox export --format json | wrangler secret bulk --env staging
```

R2 자격증명은 아예 없앴다. `gen:fonts`가 S3 API 대신 `wrangler r2 object get`을 쓰는데,
Workers Builds가 wrangler를 이미 인증된 상태로 주기 때문이다. bucket 이름은
`wrangler.jsonc`가 소유하고 script가 그것을 import한다.

**받지 못하면 빌드는 그냥 통과하고 MonoLisa만 조용히 빠진다.** `ci.yml`에는 일부러 넣지
않는다. 검증에는 font가 필요 없다.

Workers Builds는 `bun install`을 두 번 돌린다. 먼저 mise를 깔기 전에 자기가 한 번 돌리고,
그 다음 `mise run cloudflare:build`가 task 안에서 또 한 번 돌린다. 첫 번째 pass에는 wrangler가
PATH에 없어서 font를 받지 못하고 넘어가며, 실제로 받아 오는 것은 `bun run build`의 `gen`이다.
그래서 `gen:fonts`는 wrangler가 없을 때 예외를 던지지 않고 건너뛰어야 한다. 그러지 않아서
빌드를 한 번 깨뜨렸다.

font는 R2 bucket의 `fonts/` prefix에 있다. 전에는 private GitHub 저장소에 두고 Contents API로
받았는데, 그 API가 base64로 주는 탓에 1MB 한계에 묶여 있었다.

`SITE_ENV`는 production worker에만 `production`으로 준다. staging은 값이 없으면 gate가
꺼진 상태이므로 그것이 원하는 동작이다.

**production으로 가는 길은 `main` push 하나다.** 로컬에서 바로 올리는 경로를 두지 않는다.
커밋 없이 파일을 production에 올리면 배포된 것과 `git log`가 어긋나기 때문이다.

## Worker

`wrangler.jsonc`의 `main`이 `worker/index.ts`를 가리킨다. Worker가 정적 자산 앞에 서서
라우트 넷을 처리하고, 나머지는 `env.ASSETS.fetch()`로 넘긴다. 페이지는 전부 빌드 타임에
굳은 정적 자산 그대로다.

| 라우트                | 하는 일                                                |
| --------------------- | ------------------------------------------------------ |
| `/api/favicon/<host>` | 외부 favicon proxy. Cache API로 받아 둔다              |
| `/api/contributions`  | 잔디. KV cache, cron이 매시 17분에 갱신(production만)  |
| `/api/render-resume`  | `x-render-token`으로 막혀 있다. PDF를 구워 R2에 넣는다 |
| `/resume-{lang}.pdf`  | R2에서 읽어 내보낸다                                   |

### 자산으로 안 떨어지는 것들

- **404는 언어 접두사를 본다.** 정적 사이트의 404는 한 장뿐이라 기본 언어로 굳는다. 경로가
  `/en/`으로 시작하면 Worker가 그 언어의 404를 대신 낸다.
- **favicon이 없는 host에는 본문 없는 404를 준다.** 200에 기본 지구본을 실어 보내면
  `<ExternalLink>`의 `<object>`가 자식(화살표)으로 떨어지는 분기를 못 탄다. upstream으로
  넘기기 전에 host 모양인지도 본다. 경로 조각이 그대로 들어오면 s2가 엉뚱한 도메인을 조회한다.
- **잔디는 우리 오리진으로 들였다.** 서드파티가 GitHub을 긁어 주는데, 전에는 방문자 브라우저가
  그것을 직접 쳤다. cache도 rate limit 보호도 없었다. 지금은 독자가 KV hit만 보고 upstream을
  치는 것은 cron뿐이다. KV가 비어 있으면 그 요청이 그 자리에서 받아 채운다.
- **`/api/render-resume`은 실패 이유를 본문에 그대로 담는다.** token으로 막힌 엔드포인트라
  드러나서 곤란할 것이 없고, 배포 task의 로그에서 무엇이 터졌는지 바로 보여야 한다.

### Env는 설정에서 나온다

`wrangler types worker/env.d.ts --env-interface Env --include-runtime=false`가
`wrangler.jsonc`의 binding을 읽어 `Env` interface를 만든다. 손으로 적던 때는 `BROWSER`를
`Fetcher`로 잘못 쓰고 있었다(실제 타입은 `BrowserRun`이다). 생성물이므로 gitignore한다.

`gen`이 아니라 **`typecheck`에 붙인다.** `gen`은 `postinstall`로도 돌고, Workers Builds는
mise를 깔기 전에 `bun install`을 한 번 돌려서 그 pass에는 wrangler가 PATH에 없다. 거기서
죽으면 빌드가 통째로 실패한다(`gen:fonts`로 한 번 겪었다). worker 타입은 배포 빌드가 보지
않으므로 `typecheck`에만 있으면 된다. CI는 `mise-action`으로 wrangler를 깔고 `verify`를 돌린다.

secret은 `wrangler.jsonc`에 없어서 생성물에 들어가지 않는다. `worker/secrets.d.ts`가 같은
전역 `Env` interface에 선언 병합으로 얹는다. 둘 다 ambient 선언이라 import가 필요 없다.

### worker는 DOM이 없다

`tsc -p worker`가 루트와 따로 도는 이유이기도 하다(`AGENTS.md` §1). 그래서 Browser Rendering의
`page.evaluate()`에 **함수가 아니라 문자열을 넘긴다.** 콜백은 브라우저 안에서 도는데 worker의
`lib`에 DOM이 없어서 타입이 안 맞고, DOM을 넣으면 `Request`/`Response` 정의가
`@cloudflare/workers-types`와 충돌한다.

## 크롤러

`src/pages/robots.txt.ts`가 환경마다 다른 본문을 낸다. 정적 파일이 아니라 route인 이유가
이것이다. staging은 production과 같은 빌드를 쓰면서 크롤러만 막아야 하는데,
`public/robots.txt`는 환경을 모른다.

| 환경       | 내용                                                    |
| ---------- | ------------------------------------------------------- |
| production | 학습용 crawler만 `Disallow: /`, 나머지는 허용 + sitemap |
| staging    | `User-agent: * / Disallow: /` 전면 차단                 |

**목록은 주요 사업자만 짧게 든다.** OpenAI, Anthropic, Google, Apple, Meta, Common Crawl,
ByteDance 일곱이다. 긴 꼬리를 손으로 따라다니지 않는 이유는 Cloudflare가 목록을 대신
관리하기 때문이다. robots.txt는 관례대로 의사를 밝히는 자리이고, 실제로 막는 것은 대시보드다.

**막는 것은 학습용으로 긁어 가는 crawler뿐이다.** 사용자가 물어봐서 그때 한 번 가져가는
assistant(`ChatGPT-User`, `Perplexity-User`)와 인용과 함께 링크를 돌려보내는
search(`OAI-SearchBot`, `PerplexityBot`)는 통과시킨다. Cloudflare의 AI Crawl Control을 같은
기준으로 맞춰 두었다. **둘이 어긋나면 규칙을 지키는 봇에게는 더 엄한 쪽이 이겨서, 대시보드에서
허용한 것이 robots.txt 때문에 무효가 된다.**

`Google-Extended`와 `Applebot-Extended`는 검색 색인과 분리된 이름이라, 막아도 `Googlebot`과
`Applebot`의 색인은 그대로 돈다. 그래서 검색 노출을 잃지 않고 학습 수집만 뺄 수 있다.
`facebookexternalhit` 같은 링크 미리보기 봇도 막지 않는다. `robots.txt.test.ts`가 양쪽
경계를 다 고정한다.

**robots.txt로는 무시하는 쪽을 못 막는다.** 지키기로 한 봇만 지킨다. `User-agent: *`를
`Disallow: /`로 바꿔도 실제로 막히는 것은 얌전한 봇뿐이고 scraper는 그대로 들어온다. 강제
차단은 Cloudflare 대시보드의 AI Crawl Control(Security > Bots의 "Block AI Scrapers and
Crawlers")이 맡는다. 무료 플랜에 들어 있고 코드가 필요 없다.

staging은 Cloudflare Access 뒤라 크롤러가 애초에 닿지 못한다. robots.txt는 이중 방어다.

### 쓰지 않기로 한 제품

Cloudflare로 올인원하면서 한 번씩 후보에 올렸다가 뺀 것들이다. 다시 올라올 때 처음부터
따지지 않으려고 적어 둔다.

| 제품                      | 왜 안 쓰나                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D1**                    | 관계형 데이터가 없다. 후보였던 조회수는 지금 있는 문제가 아니라 새 기능이고, 설령 원해도 요청마다 강한 일관성이 필요 없어서 D1이 틀린 도구다        |
| **Durable Objects**       | 공유 가변 상태도 실시간도 없다. "지금 읽는 사람 N명"은 좋은 예제지만 문제 해결이 아니라 새 기능이다                                                 |
| **Workflows**             | 여러 step과 step별 재시도와 장시간 실행을 위한 물건인데, 후보가 전부 "실패하면 다음 cron에 다시"로 충분하다. Cron Trigger와 worker 한 장이면 끝난다 |
| **Queues**                | 무료 플랜에 들어왔으니 비용 문제는 아니지만 생산자와 소비자를 뗄 이유가 없다. 디버깅 대상만 는다                                                    |
| **Cloudflare Images**     | 푸는 문제가 없다. favicon은 이미 64px PNG라 리사이즈할 것이 없고, remote origin 변환을 열면 남이 우리 zone으로 변환을 서빙하게 된다                 |
| **Analytics Engine**      | `writeDataPoint`를 부르려면 `run_worker_first`로 **모든 페이지 요청을 worker에 태워야** 한다. 정적 자산 직행으로 얻는 성능을 통째로 내주는 대가다   |
| **`@astrojs/cloudflare`** | SSG를 지킨다. SSR을 할 것이면 Astro가 아니라 TanStack Start가 맞다. adapter를 붙이면 `astro preview`가 wrangler 기반으로 바뀌어 e2e가 거기 걸린다   |

학습이 목적이면 **별도 장난감 저장소**가 낫다. 이 저장소의 문서와 lint 규칙을 덜 오염시킨다.

## 환경 - production과 staging

| 환경       | 브랜치    | 주소           | WIP gate |
| ---------- | --------- | -------------- | -------- |
| Production | `main`    | www.rhseung.me | 켜짐     |
| Staging    | `staging` | stg.rhseung.me | 꺼짐     |

그 외 브랜치와 PR은 자동으로 배포되지 않는다. 확인이 필요하면 `staging`에 올린다.

환경을 가르는 것은 둘이다. `wrangler.jsonc`의 `env.staging`이 어느 worker와 도메인에
올릴지를, 빌드 때 들어가는 `SITE_ENV`가 WIP gate를 켤지를 정한다. worker가 추적하는
브랜치로 둘이 같이 정해지므로 손으로 맞출 일은 없다.

### staging은 Cloudflare Access 뒤에 있다

`stg.rhseung.me` 로 가는 모든 요청이 Access를 거친다. 정책은 둘이다.

| 정책     | Action             | Include                    |
| -------- | ------------------ | -------------------------- |
| `me`     | `Allow`            | Cloudflare 계정 멤버       |
| `render` | **`Service Auth`** | service token `stg-render` |

`render` 정책을 `Allow`로 만들면 안 된다. 브라우저 로그인 흐름을 타서 자동화가 통과하지
못한다. `Service Auth`라야 헤더만으로 지나간다.

**경로 하나만 여는 것은 되지 않는다.** `/api/render-resume`은 `RENDER_TOKEN`으로 이미 막혀
있어서 Access까지 걸 이유가 없다. 그래서 그 경로만 `Bypass`하는 app을 따로 만들어 봤는데
동작하지 않았다. 문서가 말하는 "더 구체적인 경로의 app이 우선한다"는 규칙이 **worker에 붙은
정책에는 적용되지 않기** 때문이다.

> Access attaches the policy to the Worker itself, so every associated domain and preview URL
> stays protected even when its routes or domains change.

정책이 hostname이 아니라 worker에 붙으면 경로를 가리지 않는다. **경로만 여는 app을 따로
만들면 오히려 나빠진다.** 그 app이 경로를 선점하는데 우회는 되지 않고, 거기엔 Service Auth
정책이 없어서 service token까지 무시된다. 잘 돌던 배포 task가 그래서 깨졌다. 되돌리려면 그
app을 지우면 된다.

그래서 자동화 둘이 모두
service token을 지고 간다. worker의 renderer(런타임 secret)와 배포 task의 `curl`(빌드
환경변수)이다. 둘 중 하나라도 빠지면 이력서 대신 로그인 페이지를 받고, renderer가 그것을
PDF로 구우면 이미 공유된 링크가 로그인 화면 그림을 받는다.

코드는 secret이 없으면 헤더를 붙이지 않고 그냥 진행한다. Access가 없는 production에서 같은
task와 renderer가 그대로 돌아야 하기 때문이다.

**`curl -f` 는 3xx를 실패로 보지 않는다.** Access가 보내는 302 로그인 리다이렉트를 성공으로
읽으면, 렌더가 돌지 않았는데도 배포가 통과한다. 뒤이은 smoke도 R2에 남은 이전 PDF를 보고
ok를 찍어서 아무도 눈치채지 못한다. 실제로 그렇게 한 번 속았다. 그래서 task는 `-f`가 아니라
`%{http_code}`를 직접 본다.

`robots.txt`가 crawler를 막고 모든 페이지에 `noindex`가 붙는 것은 그대로다. Access가
걸리기 전부터 있던 방어이고, 둘은 서로를 대신하지 않는다.

## Cloudflare 설정에서 겪은 것

**`env`의 `routes`를 비우지 않는다.** `routes`는 상속되는 key라서 `"staging": {}`로 두면
top-level의 `www.rhseung.me`를 물려받는다. 즉 staging 배포가 production 도메인을 가져간다.
실제로 그렇게 해 보았는데, 그 host에 다른 DNS record가 물려 있어서 API가 거부해 준 덕에
막혔다.

**바인딩은 `env` 에 다시 적는다.** `routes` 와 정반대다. `r2_buckets`, `browser`, `kv_namespaces`,
`vars` 는 named environment에 **상속되지 않는다.** top-level에만 적어 두면 staging worker가
`env.ASSETS` 만 갖고 떠서, R2를 만지는 순간 `error code: 1101` 로 죽는다. wrangler가 배포할 때
경고를 내주기는 하는데 배포를 막지는 않는다. 배포 로그의
`Your Worker has access to the following bindings:` 목록으로 확인하는 것이 확실하다.

**`triggers` 는 반대로 상속된다.** `routes` 와 같은 쪽이다. top-level에 cron을 적으면 staging도
같은 cron을 받아서, 두 worker가 같은 KV key를 번갈아 쓴다. staging에서는 `"triggers": { "crons": [] }`
로 비워 둔다. 무엇이 상속되고 무엇이 아닌지는 외우지 말고 `wrangler deploy --dry-run` 출력으로
확인한다. 바인딩 목록과 `schedule:` 줄이 거기 다 나온다.

**apex와 `www` 둘 다 worker의 custom domain이다.** 한때 apex를 떼고 Redirect Rules로
`www`에 보냈다가(`1235a50`) 되돌렸다(`47bf5cf`). 지금은 두 host가 같은 worker로 들어와 같은
화면을 낸다.

`_redirects` 파일로 도메인 redirect를 하려던 적도 있는데 거부당했다(`code: 100324`). Workers의
`_redirects`는 Pages와 달리 **도메인 수준 source pattern을 받지 않는다.** 목적지로는 외부
URL을 써도 되지만 출발지는 상대 경로여야 한다.

**custom domain을 새로 붙일 때는 그 host의 기존 DNS record를 먼저 지운다.** 남아 있으면
`already has externally managed DNS records [code: 100117]`로 거부되고, 그 실패가 배포
전체를 막는다. 지우고 나면 `wrangler deploy`가 record를 알아서 만든다.

## 생성물

`src/types/`의 `i18next.d.ts`와 `resources.d.ts`는 생성물이고 **gitignore한다.** `bun install`의 `postinstall`이 `bun run gen`으로
타입과 font를 만들고(Bun 1.3은 루트 패키지의 `prepare`와 `postinstall`을 실행한다),
`bun run build`가 앞에서 한 번 더 돌린다. 손으로 고치면 다음 `bun run gen`에 사라진다.

프레시 클론은 `mise trust && mise install && bun install && bun run dev`다. `mise.toml`이
`[env]`를 가져서 trust 전에는 mise가 읽기를 거부한다.

이력서 PDF는 빌드가 만들지 않는다. 로컬과 dev에서는 `/resume-{lang}.pdf`가 404다.

`src/locales/**`는 생성물이 아니다. key는 추출기가 만들지만 **값(번역문)은 사람이 채운다.**
그래서 커밋하고, CI(`.github/workflows/ci.yml`)는 `bun run gen` 뒤 `src/locales`가 깨끗한지
본다. 더러우면 key를 추가하고 재생성을 하지 않았거나, 호출부가 사라진 key가 남은 것이다.

README의 `<!-- tech:start -->`부터 `<!-- tech:end -->`까지도 생성물이지만 README는 소스
파일이라 커밋한다. marker 바깥(로고, GitHub 위젯, 푸터)은 손으로 고친다. `bun run verify`가
`gen:readme`를 돌린 뒤 `git diff --exit-code`로 drift를 잡는다.

## 이력서 PDF

**배포 뒤에 Worker가 굽는다.** `mise run cloudflare:deploy`가 `wrangler deploy` 다음에
`cloudflare:resume` task를 부르고, 그 task가 워커의 `/api/render-resume`를 친다. 워커는
Browser Rendering 바인딩으로 방금 배포된 `/{lang}/resume/`를 열어 PDF로 굽고 R2에 넣는다.
`/resume-{lang}.pdf` 요청은 워커가 R2에서 꺼내 준다.

전에는 빌드가 `playwright` + `@sparticuz/chromium`으로 구웠다. 67MB 의존성을 배포 빌드마다
설치했고, 빌드 중에 preview 서버를 띄워야 했다. 둘 다 사라졌다.

지켜야 하는 것 셋이다.

- **브라우저 하나로 언어 둘을 순차 처리한다.** 무료 플랜의 제한은 동시 실행이 아니라
  "새 브라우저 20초에 1개"라서, 언어마다 띄우면 두 번째가 거부당한다.
- **PDF는 고정 key(`resume/{lang}.pdf`)로 덮어쓴다.** R2의 과금 축 셋 중 읽기는 Workers Free의
  하루 10만 요청이, 쓰기는 배포 횟수가 막아 준다. 저장 용량만 안 묶여 있어서, 배포 버전별
  key로 쌓으면 그것만 무한히 는다.
- **렌더가 실패하면 배포 task가 비영 종료한다.** 빌드가 막아 주던 것을 배포가 막는다. 다만
  배포 자체는 이미 끝난 뒤라 한 발 늦는다. 이것이 이 방식의 실질 비용이다.
- **배포 직후 첫 렌더는 실패할 수 있다.** 자산 전파가 덜 끝났거나 "새 브라우저 20초당 1개"
  제한에 걸린다. 둘 다 기다리면 풀려서 task가 25초 간격으로 세 번까지 재시도한다.

mise는 task를 `sh`로 돌린다. `set -o pipefail` 같은 bash 전용 문법을 쓰면
`Illegal option -o pipefail` 로 죽는다.

`e2e`는 로컬 `astro preview`를 상대로 돌아서 PDF를 검사할 수 없다. 그래서 그 검사는
`cloudflare:resume` task의 `curl`로 옮겼다.

## collection schema를 바꿨으면 `.astro/`를 지운다

파싱된 콘텐츠는 `.astro/data-store.json`에 캐시된다. 캐시는 **파일 내용**으로 갱신 여부를
정하기 때문에, schema만 바꾸고 파일을 건드리지 않은 항목은 옛 모양 그대로 남는다.
그러면 `Cannot read properties of undefined (reading 'length')` 같은 예외가 난다.
새 필드가 `.default([])`여도 채워지지 않는다.

**dev와 빌드 둘 다 깨진다.** 깨지지 않는 것은 파일까지 같이 고친 항목뿐이라, 일부만
멀쩡해서 더 헷갈린다.

```sh
astro dev stop && rm -rf .astro node_modules/.astro dist && bun run dev
```

**`node_modules/.astro`도 같이 지워야 한다.** `.astro`만 지우면 그대로 재현된다. 실제로
그렇게 한 번 헤맸다.

에러가 컴포넌트를 가리키기 때문에 캐시를 의심하기 어렵다. schema를 만졌는데 이상하면
이것부터 지운다.
