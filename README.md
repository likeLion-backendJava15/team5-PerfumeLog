# 🍀 향기 저장소 (PerfumeLog)

<p align="center">
<img src="https://yennies.notion.site/image/attachment%3A6fa24add-2514-4e5f-aa44-9d0348f9a3c6%3Alogo1.png?table=block&id=1dd38212-968b-80f9-bfbe-c34242c5cc92&spaceId=937e129d-9aca-46d3-86d9-97391bcf515f&width=1100&userId=&cache=v2" width="200px">
</p>

> 사용자 리뷰 기반 향수 정보 공유 플랫폼

---

## 📌 프로젝트 소개

향기 저장소 (PerfumeLog)는 사용자들이 다양한 향수에 대한 리뷰와 정보를 공유하는 커뮤니티 기반 플랫폼입니다.

### 🎯 제작 목표

- 사용자 리뷰 기반 향수 정보 공유 플랫폼 구축
- 향기 노트, 지속력, 잔향 등 향수 특화 정보 기반 리뷰 시스템 제공

### 🎈 기대 효과

- 직접 시향이 어려운 사용자들에게 리뷰 기반 향수 선택의 기준 제공
- 지속력·확산력·성별 인식 등 감성 정보를 정량화하여 비교 가능
- 찜 기능과 사용자 맞춤형 정보 제공으로 구매 결정에 도움

---

## ⚙️ 기능

| 구분      | 기능 설명                                  |
| --------- | ------------------------------------------ |
| 사용자    | 회원가입 / 로그인                          |
| 검색      | 향수명, 브랜드명, 향 노트 기반 검색        |
| 향수 목록 | 브랜드, 향 계열 필터링                     |
| 상세 정보 | 향기 노트, 지속력, 정가, 리뷰 등 상세 보기 |
| 리뷰      | 리뷰 작성, 평점 등록                       |

---

## 🛠 기술 스택

### 💻 Frontend

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
<img src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/figma-89AAE6.svg?style=for-the-badge&logo=figma&logoColor=white">

### 🧩 Backend

<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

### 🗃️ Database

<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">

### 🛠 Version Control & Collaboration

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white">
[🔗 Notion Project Page](https://yennies.notion.site/PerfumeLog-1d938212968b8044bfd1e0e8cea5720c)

---

## 👥 팀원 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/catapillar0505">
          <img src="https://avatars.githubusercontent.com/u/62907792?v=4" width="100px;" alt=""/><br />
          <sub><b>김진아</b></sub>
        </a><br />
      </td>
      <td align="center">
        <a href="https://github.com/sunhyun0508">
          <img src="https://avatars.githubusercontent.com/u/200905713?v=4" width="100px;" alt=""/><br />
          <sub><b>윤선현</b></sub>
        </a><br />
      </td>
      <td align="center">
        <a href="https://github.com/ghkdWkrqor">
          <img src="https://avatars.githubusercontent.com/u/106655707?v=4" width="100px;" alt=""/><br />
          <sub><b>윤형일</b></sub>
        </a><br />
      </td>
      <td align="center">
        <a href="https://github.com/petite-coder">
          <img src="https://avatars.githubusercontent.com/u/156408029?v=4" width="100px;" alt=""/><br />
          <sub><b>이예은</b></sub>
        </a><br />
      </td>
      <td align="center">
        <a href="https://github.com/Seungmi97">
          <img src="https://avatars.githubusercontent.com/u/132995507?v=4" width="100px;" alt=""/><br />
          <sub><b>황승미</b></sub>
        </a><br />
      </td>
    </tr>
    <tr>
      <td align="center">제품 목록 / 나의 찜 목록 / 향수 검색 / 로그인 / 회원가입</td>
      <td align="center">제품 필터링 / 제품 카드</td>
      <td align="center">자신이 쓴 리뷰 수정 삭제 / 리뷰 좋아요</td>
      <td align="center">리뷰 CRUD / 통계 / 로그인 / 회원가입</td>
      <td align="center">제품 카드 / 상세페이지 / 제품 찜</td>
    </tr>
  </tbody>
</table>


### 🗂️ 파일별 역할 분배

| 팀원 | 프론트 담당 컴포넌트 | 백엔드 담당 파일 |
| --- | --- | --- |
| 김진아 | `Header.jsx`, `ProductList.jsx`, `WishList.jsx`, `LoginForm.jsx`, `SignUpForm.jsx`, `LoginPage.js`, `SignUpPage.js` | `productController.js`, `productModel.js`, `productRoutes.js`, `productDTO.js`, `wishController.js`, `wishModel.js`, `wishDTO.js`, `userController.js`, `userModel.js`, `userRoutes.js`, `userDTO.js` |
| 황승미 | `ProductCard.jsx`, `ProductDetail.jsx` | `productNoteController.js`, `productNoteModel.js`, `productNoteRoutes.js`, `productNoteDTO.js`, `wishController.js`, `wishModel.js`, `wishRoutes.js`   |
| 윤선현 | `ProductFilter.jsx`, `HomePage.js` | `noteController.js`, `noteModel.js`, `noteRoutes.js`, `noteDTO.js` |
| 이예은 | `ReviewForm.jsx`, `ReviewStats.jsx`, `ReviewCard.jsx`, `ReviewList.jsx`, `ReviewPage.js`, `LoginForm.jsx`, `SignUpForm.jsx`, `LoginPage.js`, `SignUpPage.js` | `reviewController.js`, `reviewModel.js`, `reviewRoutes.js`, `reviewDTO.js`, `userController.js`, `userModel.js`, `userRoutes.js`, `userDTO.js` |
| 윤형일 | `MyReview.js`, `MyPage.js` | `reviewLikeController.js`, `reviewLikeModel.js`, `reviewLikeRoutes.js`, `reviewLikeDTO.js` |


---

## 🚀 실행 방법

### 1. DB 설정
1. data 폴더에 있는 csv 파일 다운로드
    - `brand.csv`
    - `fragnance_family.csv`
    - `note.csv`
    - `product_note.csv`
    - `sample.csv`
2. mysql 에서 `SHOW VARIABLES LIKE 'secure_file_priv';` 에서 나온 폴더에 perfume_data/ 폴더 생성 후 다운로드 받은 파일들 저장 (예 : `C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/brand.csv'`
3. mysql에서 다음 sql 실행
    ```sql
    CREATE TABLE USER (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userid VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE BRAND (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );
    CREATE TABLE FRAGRANCE_FAMILY (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE NOTE (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE PRODUCT (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand_id INT NOT NULL,
        family_id INT NOT NULL,
        image_url TEXT NOT NULL,
        price INT NOT NULL,
        description_url TEXT NOT NULL,
        FOREIGN KEY (brand_id) REFERENCES BRAND(id),
        FOREIGN KEY (family_id) REFERENCES FRAGRANCE_FAMILY(id)
    );

    CREATE TABLE PRODUCT_NOTE (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT,
        note_id INT,
        type ENUM('TOP', 'MIDDLE', 'BASE') NOT NULL,
        FOREIGN KEY (product_id) REFERENCES PRODUCT(id),
        FOREIGN KEY (note_id) REFERENCES NOTE(id)
    );

    CREATE TABLE REVIEW (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        rating INT CHECK (rating BETWEEN 1 AND 5),
        longevity ENUM('매우약함', '약함', '중간', '강함', '아주강함') NOT NULL,
        sillage ENUM('매우약함', '약함', '중간', '강함', '아주강함') NOT NULL,
        gender ENUM('여성적', '중성적', '남성적') NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES USER(id),
        FOREIGN KEY (product_id) REFERENCES PRODUCT(id)
    );

    CREATE TABLE WISH (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id INT,
        created_at DATETIME DEFAULT NOW(),
        UNIQUE(user_id, product_id),
        FOREIGN KEY (user_id) REFERENCES USER(id),
        FOREIGN KEY (product_id) REFERENCES PRODUCT(id)
    );

    CREATE TABLE REVIEW_LIKE (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        review_id INT,
        created_at DATETIME DEFAULT NOW(),
        UNIQUE(user_id, review_id),
        FOREIGN KEY (user_id) REFERENCES USER(id),
        FOREIGN KEY (review_id) REFERENCES REVIEW(id)
    );
    ```
    ```sql
    LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/brand.csv'
    INTO TABLE brand
    FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS
    (id, name);

    LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/fragrance_family.csv'
    INTO TABLE fragrance_family
    FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS
    (id, name);

    LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/note.csv'
    INTO TABLE note
    FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS
    (id, name);

    LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/sample.csv'
    INTO TABLE product
    FIELDS TERMINATED BY ',' ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS
    (id, name, brand_id, @family_id, @image_url, price, @description_url)
    SET 
      family_id = NULLIF(@family_id, ''),
      image_url = NULLIF(@image_url, ''),
      description_url = NULLIF(@description_url, '');

    LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/perfume_data/product_note.csv'
    INTO TABLE product_note
    FIELDS TERMINATED BY ',' ENCLOSED BY '"' 
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS
    (product_id, note_id, type);```

### 2. 환경 변수 설정

backend 폴더에 `.env` 파일을 생성하고 `.env.example` 참고하여 값을 입력하세요.

### 3. 백엔드 설정 및 실행

```shell
cd backend
npm init -y
npm install express cors mysql2 dotenv

node app.js
```

### 4. 프론트엔드 설정 및 실행

```bash
npx create-react-app frontend
cd frontend
npm install bootstrap react-router-dom axios

npm start
```
