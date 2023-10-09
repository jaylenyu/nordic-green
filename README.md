# Nordic Green

<br/>
<br />

<div align='center' >
  <img width="50%" alt="Logo" src="https://github.com/jaylenyu/nordic-green/assets/124610396/c957bce1-a815-4717-82b0-a50d42205936">
</div>

<br />
<br />

노르딕 그린은 실내 식물 및 관련 용품을 전문적으로 판매하는 온라인 커머스 웹 서비스입니다. 
<br />
사용자 중심의 디자인과 Nextjs의 최적화 기능을 통해 편리한 쇼핑 경험을 제공할 수 있도록 제작하였습니다.
<br />
배포 링크 : <a href="https://nordic-green.vercel.app">Nordic Green 🌿</a>

<br />

## ⚙️ Tech Stack

### Language & Frameworks
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)
![ReactQuery](https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white)

### Database & ORM
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=PlanetScale&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=Prisma&logoColor=white)

### Libraries
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white)
![styled components](https://img.shields.io/badge/styled%20components-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-D26AC2?style=flat-square&logo=Emotion&logoColor=white)

<br />
<br />

## 📝 Description

<br />
<br />
Next.js의 SSG를 활용하여 메인페이지를 서버 사이드 렌더링으로 구현하였고, 제품 상세 페이지는 ISG로 렌더링되도록 개발하였습니다. 
<br />
<a href="https://jaylenyu.tistory.com/61">개발기록</a>
TypeScript, Next.js, Prisma, PlanetScale을 사용하여 Wishlist, Cart, Order, Comment에 대한 CRUD 작업이 가능한 API를 개발하였습니다. 
<br />
<a href="https://jaylenyu.tistory.com/61">개발기록</a>
React-Query를 통해 데이터 캐싱을 적용하였고, 사용자 경험 개선을 위해 mutation를 적용하였습니다. 
<br />
<a href="https://jaylenyu.tistory.com/62">개발기록</a>
nextAuth를 통해 Google Login API를 프로젝트에 구현하였습니다. 
<br />
<a href="https://jaylenyu.tistory.com/60">개발기록</a>
useDebounce Hook을 React-Query를 이용하여 커스텀하여 서버에 부담을 줄일 수 있도록 구현하였습니다.
<br />
<a href="https://jaylenyu.tistory.com/66">개발기록</a>
 또한 반응형 레이아웃을 적용하고, 검색엔진(SEO)와 성능 최적화를 이루었습니다.

<br />
<br />

## 📅 Development Duration

<br />

> 2023.09.19 ~ 2023.10.09 (21 일)

<br />
<br />



## 💡 Project Flow Preview

<br />
<br />


| Page              | GIF                                                                                                     | Contents |
|-------------------|---------------------------------------------------------------------------------------------------------|----------|
| Main & Login      | ![main login](https://github.com/jaylenyu/nordic-green/assets/124610396/2a37c0f1-c459-4cb4-bd30-2b0d5bc899a0) | MainPage SSG 생성. <br/> NextAuth를 사용하여 인증 기능을 구현. <br/> Google Login Provider 인증 구현. <br/> Prisma를 사용하여 세션 정보를 데이터베이스에 저장. <br/>        |
| Products          | ![products](https://github.com/jaylenyu/nordic-green/assets/124610396/5ec1d9e3-a482-4395-8b5e-079541ba311a)   | useQuery를 활용하여 데이터 캐싱. <br/> useQuery와 useDebounce 훅으로 검색 성능 최적화. <br/> 필터링을 통해 정렬 구현 및 페이지네이션 구현. |
| Cart              | ![cart](https://github.com/jaylenyu/nordic-green/assets/124610396/2cd71c1e-f851-469d-93b0-f11160be44f4)     | useQuery와 useMutation로 데이터를 효율적으로 캐싱 및 변경 작업을 처리함(Optomistic Update). <br/> useMemo로 Cart 내의 전체 상품 가격 계산을 캐싱 및 최적화. <br/> 추천상품을 랜덤으로 보일 수 있도록 Custom Hook으로 구현. |
| Comment           | ![comment](https://github.com/jaylenyu/nordic-green/assets/124610396/c5387184-711f-4414-8038-a8394cab64cb)   | 리뷰내용과 평점(Rate) CRUD 구현. <br/> user의 session을 구분하여 작성한 사용자의 댓글만 수정 및 삭제가능하도록 구현. |
| Order             | ![order](https://github.com/jaylenyu/nordic-green/assets/124610396/144b7719-f5d0-4285-9cb6-a4e675350222)   | useQuery로 데이터 캐싱. <br/> useMutation으로 Optomistic Update구현. <br/> 제품 주문부터 주문한 주문내역 삭제까지 CRUD 구현. <br/> 결제하기 버튼으로 주문상태 업데이트 및 후기작성을 가능하도록 구현         |
| Wishlist          | ![wishlist](https://github.com/jaylenyu/nordic-green/assets/124610396/5a2d48b0-5669-4fe6-9158-723c94e52393) | useQuery로 데이터 캐싱. <br/> useMutation으로 위시리스트 Optomistic Update구현. |
| SEO          |![seo](https://github.com/jaylenyu/nordic-green/assets/124610396/4d6df71f-b055-45b0-9c56-22e34fa8c7da) | 검색엔진(SEO)최적화. <br/> 웹 성능 최적화. |

<br />
<br />

## 🗂️ Project Structure

<br />
<br />

```
.
├── 📁 components
│   ├── CommentItem.tsx
│   ├── CountControl.tsx
│   ├── Editor.tsx
│   ├── EmptyBox.tsx
│   ├── Footer.tsx
│   ├── GoogleLogin.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── Spinner.tsx
│
├── 📁 constants
│
├── 📁 hooks
│   ├── useDebounce.ts
│   ├── useRandomProducts.ts
│   └── useScreenWidth.ts
│
├── 📁 pages
│   ├── 📁 api
│   │   ├── 📁 auth
│   │   │   ├── [...nextauth].ts
│   │   │   └── sign-up.ts
│   │   ├── add-cart.ts
│   │   ├── add-order.ts
│   │   ├── delete-cart.ts
│   │   ├── delete-comment.ts
│   │   ├── delete-order.ts
│   │   ├── delete-wishlist.ts
│   │   ├── get-cart.ts
│   │   ├── get-comment.ts
│   │   ├── get-comments.ts
│   │   ├── get-order.ts
│   │   ├── get-product.ts
│   │   ├── get-products-count.ts
│   │   ├── get-products.ts
│   │   ├── get-wishlist.ts
│   │   ├── get-wishlists.ts
│   │   ├── update-cart.ts
│   │   ├── update-comment.ts
│   │   ├── update-order-status.ts
│   │   ├── update-product.ts
│   │   └── update-wishlist.ts
│   │
│   ├── 📁 auth
│   │   └── login.tsx
│   ├── 📁 cart
│   │   └── index.tsx
│   ├── 📁 comment
│   │   └── edit.tsx
│   ├── 📁 order
│   │   └── index.tsx
│   ├── 📁 products
│   │   ├── 📁 [id]
│   │   │   └── index.tsx
│   │   └── index.tsx
│   ├── 📁 wishlist
│   │   └── index.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
│
├── 📁 prisma
│   ├── productWithCategory.ts
│   └── schema.prisma
│
├── 📁 public
├── 📁 styles
├── 📁 types
├── api.tsx
.
```

<br />
<br />

## Pages and API Routes Overview

| Route                        |
|------------------------------|
| ● /                          |
| /_app                        |
| ○ /404                       |
| λ /api/*                     |
| ○ /auth/login                |
| ○ /cart                      |
| ○ /comment/edit              |
| ○ /order                     |
| ○ /products                  |
| λ /products/[id]             |
| ○ /wishlist                  |
