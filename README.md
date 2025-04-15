# 간단한 블로그 서비스 개발

## 프로젝트 설명

Next.js의 App Router를 사용하여 React와 Tailwind CSS로 구현한 간단한 블로그 서비스입니다. 제공된 RESTful API와 React Query를 활용하여 데이터 페칭 및 상태 관리를 진행했습니다.

## 설치 및 실행 방법

### 1. 설치

```bash
npm install
```

### 2. 실행

```bash
npm run dev
```

### 3. 접속

실행 후 브라우저에서 `http://localhost:3000`로 접속

## 구현한 기능 목록

### 1. 로그인 및 로그아웃

### 2. 블로그 글 등록 (이미지 포함)

- 글 등록 완료 시 상세화면으로 이동 및 히스토리 삭제
- 뒤로가기 시 경고 컨펌창 표시

### 3. 블로그 목록 조회

- 카테고리 필터링
- 제목 검색
- 페이지네이션
- 블로그 상세 조회

### 4. 블로그 수정 및 삭제

- 수정 완료 시 상세화면 이동 및 히스토리 삭제
- 수정 중 뒤로가기 시 경고 컨펌창 표시

## 사용한 기술 스택 및 라이브러리

- 프론트엔드: React, Next.js (App Router)
- 데이터 관리 및 상태 관리: React Query
- 스타일링: Tailwind CSS
- API 연동: 제공된 RESTful API

## 트러블 슈팅

### 1. Route.js에서 404 / 500 에러

- 문제 상황
  - Next.js App Router에서 /api/blog/[id]로 요청 보냈는데 404가 나오거나 500 에러 발생
  - route.js를 만들었는데도 동작하지 않음
- 원인 분석
  - 파일 경로가 src/app/api/blog/[id]/route.js가 아닌 다른 곳에 있었음
  - 동일한 GET 함수를 두 번 선언해서 충돌이 있었음
  - LocalStorage에만 토큰이 있고 쿠키엔 없어서 서버에서 쿠키 인증을 시도했지만 유저는 로컬스토리지만 쓰는 구조가 맞물려 401 에러가 뜸
- 해결 과정

  - 경로 점검: route.js 파일을 src/app/api/blog/[id]/route.js로 정확히 위치시키기
  - 중복 GET 함수 제거. 하나의 GET, PATCH, DELETE만 남김.
  - 로컬스토리지로만 토큰을 관리하기로 결정 → 서버용 라우트를 삭제하고 직접 백엔드(https://api.example.com)를 호출하는 방식으로 전환.

- 결과
  - 404/500 문제가 사라지고, 직접 백엔드 호출로 로그인, 등록, 수정이 원활히 동작하게 됨.

### 2. CORS 오류

- 문제 상황
  - 클라이언트에서 바로 fetch("https://api.example.com") 호출 시 CORS 에러`
No 'Access-Control-Allow-Origin' header is present...`
- 원인 분석
  - 브라우저는 Cross-Origin 요청을 막고 있는데 서버에서 CORS 허용 설정이 충분하지 않았음
- 해결 과정
  - 처음엔 Next.js 중계 라우트(/api/...)를 만들어 CORS 우회하려 했지만, 서버 인증이 `쿠키` 기반인지, `로컬스토리지 토큰인`지에 따라 충돌 발생.
  - 최종적으로 CORS를 열어둔 백엔드로 직접 호출(토큰은 Bearer로 헤더에 첨부) → 문제 해결
- 결과
  - CORS 에러 없이 정상 통신 완료
    `fetch("https://api.interview.l-league.co.kr", { headers: { Authorization: ... } })`

### 3. 이미지 업로드 URL (Presigned URL)에서 401

- 문제 상황
  - S3 Presigned URL 생성 /api/v1/aws/upload 요청 시 401 Unauthorized 발생
- 원인 분석
  - 이 API는 ActiveUserAuth가 필요한데 요청 시 토큰을 Authorization 헤더에 넣지 않음
  - `fetch("/api/aws/upload", { ... })`를 썼는데 server route가 토큰 전달 누락
- 해결 과정
  - 직접 백엔드(https://api.interview.l-league.co.kr/api/v1/aws/upload)로 요청하고 헤더에 `Authorization: Bearer <token>` 추가
  - 401 해결 → 업로드 URL과 이미지URL 정상 수신
- 결과
  - S3 업로드 가능해져서 대표/서브 사진 등록 구현 완성

### 4. 로그인 후 토큰 저장 위치 이슈

- 문제 상황
  - 백엔드가 쿠키로 인증을 하려고 했지만 이미 `localStorage`에 토큰 저장
  - 서버 라우트에서 cookies()로 토큰을 못 찾아 401 에러
- 원인 분석
  - 서버 라우트(route.js)는 쿠키 기반 인증 로직
  - 이미 단순히 `로컬스토리지`에 저장 → 서버 라우트에서는 보이지 않음
- 해결 과정
  - 결국 서버 라우트를 삭제하고 클라이언트에서 직접 백엔드로 Bearer 토큰 전달
  - "직접 백엔드 호출" 방식으로 일원화
- 결과
  - 401 문제 해결, `로컬스토리지 토큰 방식` 유지하면서 모든 API 가능

### 5. 뒤로가기 시 confirm이 2~3번 뜸

- 문제 상황
  - 수정 페이지 등에서 뒤로가기할 때 **confirm("작성 중인 내용이 삭제됩니다.")**가 2~3번 중복으로 뜨는 현상
- 원인 분석
  - `popstate` 이벤트에서 confirm,수동 버튼에서 confirm,그리고 `beforeunload` 이벤트 중복
  - 브라우저가 `router.back()` 또는 `history.back()` 호출 시 `popstate` 재트리거 → 다중 confirm
- 해결 과정

  - 중복 confirm 제거
  - `popstate`로만 confirm 처리,
  - 수동 버튼은 단순 `history.back()`만 쓰거나 반대 확인 시 → `router.back()` 호출, 취소 시 `history.pushState` 다시 세팅

- 결과
  - 뒤로가기 1회 confirm 정상 동작

### 6. `빈 문자열 src=""`로 인한 경고

- 문제 상황
  - `<img src="" alt="..." />`일 때 브라우저 경고나타남
    `"An empty string ('') was passed to the src attribute..."`
- 원인 분석
  - 서버에서 `main_image`가 `""` 또는 `undefined`
  - `<img>` 태그가 빈 src로 렌더링
- 해결 과정

  - 조건부 렌더링으로 대체

- 결과
  - 경고 사라지고 이미지 없는 경우가 깔끔하게 처리됨

### 7. 기타

1. Tailwind 퍼블리싱 이슈 (폰트, 전역 스타일, etc.)
   Tailwind config와 globals.css 내용이 적용 안 됨

   → `content` 경로 수정, `@import` 위치 확인으로 해결

2. 글씨체 미적용

   → 실제 css 경로와 `woff2` 경로 오류, `CDN` import 시도
