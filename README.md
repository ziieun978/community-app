
# 📱 Community-app

> 한 줄 요약 — Expo와 Firebase를 활용한 간단한 커뮤니티 앱 MVP  

---

## 🧩 목차 (Table of Contents)
- [프로젝트 소개](#프로젝트-소개)
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
- [프로젝트 구조](#프로젝트-구조)
- (아래는 추후 수정예정)
- [화면 미리보기](#화면-미리보기)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [트러블슈팅](#트러블슈팅)
- [회고 / 느낀 점](#회고--느낀-점)

---

## 🧠 프로젝트 소개
- 개발 기간: 2025.10 (2일)  
- 개발 인원: 개인 프로젝트
- 목표: 간단한 MVP를 통해 Expo + Firebase 기반 앱 프로세스  
- 주요 특징: 로그인, 게시글 작성, 이미지 업로드, 댓글 등 커뮤니티 기본 기능 구현  

---

## ⚙️ 기술 스택

| 분류 | 사용 기술 |
|------|------------|
| **Frontend** | React Native (Expo 54.0.13), TypeScript |
| **Backend / DB** | Firebase Auth, Firestore, Firebase Storage |
| **State Management** | React Hooks, Context API |
| **UI Library** | React Native Paper / NativeWind / Custom Components |
| **Version Control** | Git, GitHub |
| **Deployment** | Expo Build / EAS |

---

## 🚀 주요 기능

| 기능 | 설명 |
|------|------|
| 🔐 회원가입 / 로그인 | Firebase Authentication 사용 |
| 📝 게시글 작성 | 텍스트 및 이미지 업로드 기능 |
| 💬 댓글 기능 | 실시간 Firestore 기반 댓글 |
| 🖼️ 이미지 업로드 | Firebase Storage 연동 |
| 🏠 홈 피드 | 최신 글 목록 및 상세보기 지원 |

---

## 📂 프로젝트 구조
```bash
📦 community-app
├─ 📁 src

