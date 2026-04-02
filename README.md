# Nordic Green 🌿

<div align="center">
  <img width="50%" alt="Logo" src="https://github.com/jaylenyu/nordic-green/assets/124610396/7fa812ec-1b9b-4ad7-8341-961d1172a100">
  <br /><br />
  <p>실내 식물 및 관련 용품을 전문으로 판매하는 풀스택 온라인 커머스 서비스</p>
</div>

<br />

## ⚙️ Tech Stack

### Frontend
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=Next.js&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=ReactQuery&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=PostgreSQL&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSONWebTokens&logoColor=white)

### Infrastructure
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=Turborepo&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)
![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat-square&logo=AmazonEC2&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=GitHubActions&logoColor=white)

<br />

## 🏗️ Architecture

```
nordic-green/                    # Turborepo 모노레포
├── apps/
│   ├── frontend/                # Next.js 14 App Router (포트 3000)
│   └── backend/                 # NestJS REST API (포트 3001)
├── packages/
│   └── shared-types/            # 공유 타입 / DTO
├── nginx/
│   └── nginx.conf.template      # Reverse Proxy 설정
├── docker-compose.yml           # 로컬 개발 환경
├── docker-compose.prod.yml      # 프로덕션 환경 (GHCR 이미지)
├── pnpm-workspace.yaml
└── turbo.json
```

### 요청 흐름

```
클라이언트
    ↓ HTTPS
nginx (80/443)
    ├── / → Next.js Frontend (3000)
    └── /api → NestJS Backend (3001)
                    ↓
              PostgreSQL (5432)
```

<br />

## 📁 Project Structure

### Frontend (`apps/frontend/`)

```
src/
├── app/                         # Next.js App Router 페이지
│   ├── page.tsx                 # 홈 (SSG, revalidate 60s)
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── products/
│   │   ├── page.tsx             # 제품 목록 (검색/필터/페이지네이션)
│   │   └── [id]/page.tsx        # 제품 상세
│   ├── cart/page.tsx
│   ├── wishlist/page.tsx
│   ├── order/page.tsx
│   ├── comment/edit/page.tsx
│   ├── mypage/
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── orders/page.tsx
│   │   └── points/page.tsx
│   └── payment/
│       ├── page.tsx             # 토스페이먼츠 결제
│       ├── success/page.tsx
│       └── fail/page.tsx
│
├── components/
│   ├── Layout/                  # Header, Footer
│   ├── Auth/                    # GoogleLogin
│   ├── product/                 # ProductCard
│   ├── comment/                 # CommentItem, Editor (draft-js)
│   └── ui/                      # shadcn/ui 컴포넌트
│
├── hooks/
│   ├── mutations/               # useAddCart, useAddOrder, useToggleWishlist 등
│   ├── queries/                 # useQuery (cart, wishlist, order, comments)
│   ├── useValidation.ts
│   ├── useProducts.ts
│   └── useDebounce.ts
│
├── lib/
│   ├── api-client.ts            # JWT 인터셉터 포함 Axios 인스턴스
│   ├── api-paths.ts             # NestJS 엔드포인트 경로 상수
│   └── auth.ts                  # NextAuth v5 설정
│
└── types/type.ts
```

### Backend (`apps/backend/`)

```
src/
├── auth/         # JWT 인증, Google OAuth, 이메일 로그인/회원가입
├── products/     # 제품 목록/상세, 카테고리 필터, 페이지네이션
├── cart/         # 장바구니 CRUD
├── wishlist/     # 위시리스트 토글
├── orders/       # 주문 생성/조회/삭제/상태 변경
├── comments/     # 후기 작성/수정/삭제
├── payment/      # 토스페이먼츠 결제 승인 및 웹훅
├── user/         # 마이페이지, 포인트 내역
└── prisma/       # PrismaService
```

<br />

## 💡 주요 기능

| 기능 | 설명 |
|---|---|
| **인증** | NextAuth v5 + Google OAuth + 이메일/비밀번호 로그인, JWT 세션 |
| **제품 목록** | 카테고리 필터, 키워드 검색 (useDebounce), 정렬, 페이지네이션 |
| **제품 상세** | 이미지 캐러셀 (nuka-carousel), draft-js 리치텍스트 설명 |
| **장바구니** | 수량 조정, 금액 실시간 계산 (useMemo), 추천 상품 |
| **위시리스트** | 토글 방식 추가/제거, 낙관적 업데이트 |
| **주문** | 장바구니 일괄 주문 또는 즉시 주문, 주문 상태 관리 |
| **결제** | 토스페이먼츠 SDK 연동, 결제 승인 API, 웹훅 처리 |
| **후기** | 별점 + draft-js 에디터, 주문한 상품에만 작성 가능 |
| **마이페이지** | 프로필, 주문내역, 포인트 내역 |

<br />

## 🚀 Getting Started

### 사전 요구사항

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### 로컬 개발 환경

```bash
# 의존성 설치
pnpm install

# 환경변수 설정
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env

# PostgreSQL 실행
docker compose up -d postgres

# DB 마이그레이션
pnpm --filter @nordic-green/backend prisma:migrate

# 개발 서버 실행 (frontend + backend 동시)
pnpm dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 빌드 검증

```bash
# 프론트엔드 빌드
pnpm --filter @nordic-green/frontend build

# 타입 체크
pnpm --filter @nordic-green/frontend typecheck

# 린트
pnpm --filter @nordic-green/frontend lint
```

<br />

## 🔑 Environment Variables

### Frontend (`apps/frontend/.env.local`)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

NEXT_PUBLIC_API_URL=http://localhost:3001

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_...
```

### Backend (`apps/backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/nordicgreen

JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

TOSS_SECRET_KEY=test_sk_...
TOSS_WEBHOOK_SECRET=your-webhook-secret
```

<br />

## 🛠️ CI/CD Pipeline

```
git push → main
    ↓
GitHub Actions (.github/workflows/deploy.yml)
    ├── 1. Lint & Typecheck (pnpm --filter @nordic-green/frontend)
    ├── 2. Docker Build & Push → GHCR
    │       ├── ghcr.io/jaylenyu/nordic-green-frontend:latest
    │       └── ghcr.io/jaylenyu/nordic-green-backend:latest
    └── 3. SSH Deploy → AWS EC2
            ├── docker compose pull
            ├── docker compose up -d
            └── nginx reload (envsubst)
```

<br />

## 📊 Pages Overview

| Route | 렌더링 | 설명 |
|---|---|---|
| `/` | SSG (60s revalidate) | 홈, 추천 상품 |
| `/products` | CSR | 제품 목록 |
| `/products/[id]` | Dynamic SSR | 제품 상세 |
| `/cart` | CSR | 장바구니 |
| `/wishlist` | CSR | 위시리스트 |
| `/order` | CSR | 주문 내역 |
| `/comment/edit` | CSR | 후기 작성 |
| `/payment` | CSR | 토스 결제 |
| `/payment/success` | CSR | 결제 완료 |
| `/payment/fail` | CSR | 결제 실패 |
| `/auth/login` | CSR | 로그인 |
| `/auth/signup` | CSR | 회원가입 |
| `/mypage` | CSR | 마이페이지 |

<br />

## 📅 Development History

| 기간 | 내용 |
|---|---|
| 2023.09 ~ 2023.10 | v1.0 — Next.js 12 Pages Router, MySQL(PlanetScale), Prisma |
| 2024.03 ~ | v2.0 — Turborepo 모노레포, NestJS 분리, PostgreSQL 전환 |
| 2024 | v2.1 — shadcn/ui 전체 UI 리디자인, antd/emotion 제거 |
| 2026.04 | v2.2 — App Router 전환, pnpm 마이그레이션, AWS EC2 배포 |
