## 🌿 Branch 가이드

### 🔁 브랜치 작업 흐름

#### 1. 기능 메인 브랜치 생성

```bash
git checkout develop
git pull
git checkout -b feature/review
git push origin feature/review
```

#### 2. 각자 하위 브랜치 생성

```bash
git checkout feature/review
git pull
git checkout -b feature/review-ui
```

#### 3. 작업 후 커밋 & 푸시

```bash
git add .
git commit -m "feat: 리뷰 작성 UI 구현"
git push origin feature/review-ui
```

#### 4. PR 생성 흐름

1. 하위 브랜치 `feature/review-ui` → 상위 브랜치 `feature/review` 로 PR 생성 (팀원 리뷰)
2. 모든 하위 브랜치 병합 완료 후 → `feature/review` → `develop` 로 최종 PR

---

### 🏷 브랜치 네이밍 규칙

| 용도             | 네이밍 예시                                    |
| ---------------- | ---------------------------------------------- |
| 기능 메인 브랜치 | feature/review, feature/login                  |
| 하위 브랜치      | feature/review-ui, feature/login-ui            |
| 버그 수정 브랜치 | fix/버그명, fix/login-error, fix/review-button |

> ✅ 브랜치는 모두 `소문자 + 하이픈`으로 작성

---

### 📝 커밋 메시지 규칙

#### ✅ 기본 형식

```
<타입>: <변경 내용 요약>
```

#### ✅ 커밋 타입 예시

| 타입     | 의미                                      |
| -------- | ----------------------------------------- |
| feat     | 새로운 기능 추가                          |
| fix      | 버그 수정                                 |
| refactor | 리팩토링 (기능 변화 없음)                 |
| style    | 코드 포맷팅, 세미콜론 누락 등 비기능 변경 |
| docs     | 문서 수정 (README 등)                     |
| test     | 테스트 코드 추가 또는 수정                |

#### ✅ 예시

```
feat: 리뷰 작성 폼 컴포넌트 추가
fix: 리뷰 목록 정렬 오류 수정
refactor: 리뷰 상세 컴포넌트 구조 개선
docs: README에 기술 스택 배지 추가
```

> 커밋은 한 작업 단위마다 하나씩, 메시지는 명확하게!

---

### 🛠 병합 순서 요약

1. 각자 `feature/기능명-작업` 브랜치에서 작업
2. `feature/기능명` 브랜치에 Pull Request → 팀원 리뷰
3. 리뷰 완료 시 `develop` 브랜치에 최종 Merge (담당자 또는 팀장)
4. `main`은 배포 전 마지막 병합만 담당

---

### ⚠️ 유의사항

- `develop`에서 바로 작업하지 않기!
- 기능 통합 브랜치 (`feature/기능명`)는 작업 금지, 병합 전용!
- 충돌이 발생할 수 있으므로 자주 `pull` 받아 최신 상태 유지
- 커밋 메시지는 명확하게 (`feat:`, `fix:`, `refactor:` 등 prefix 활용)
