# Komofunding
Komofunding은 사용자의 프로젝트를 홍보하고 다른 사용자로부터 후원을 받을 수 있도록 지원하는 크라우드 펀딩 플랫폼입니다. 
* 기간 : 2024.11.04 ~ 2024.12.18

* 기술스택
  - Frontend : JavaScript, React.js, HTML, CSS
  - Backend : Java, Spring Boot, JPA, MariaDB
  - Database : MariaDB
  - Design : Figma
  - Diagram : draw.io, PlantUML
<br>

## 소개
>### 메인
#### 메인 화면
- ###### 메인 화면은 프로젝트의 달성률과 대표 이미지를 중심으로 간결하게 구성하였습니다. Framer motion을 활용하여 다양한 애니메이션을 적용하여 동적인 사용자 경험을 제공합니다.
![main](https://github.com/user-attachments/assets/4d91e8cd-14d5-425d-a95b-7d1c6750df53)
---
#### 홈 화면 
- ###### 홈 화면은 전체 프로젝트를 카테고리 별로 확인할 수 있도록 구성하였습니다. 후원하는 품목에 집중할 수 있도록 이미지를 중심으로 한 레이아웃을 구성하였습니다.
~~~
Home: 운영자의 승인을 받은 모든 프로젝트 | Upcoming : 아직 후원이 시작되지 않은 프로젝트 | Active : 현재 후원이 진행 중인 프로젝트
~~~
![home](https://github.com/user-attachments/assets/ff4a7e5d-d1a5-4324-a5a8-05e4a4f0ebb8)  

---

>### 유저
#### 마이페이지 
- ###### 마이페이지에서는 사용자의 활동과 정보를 한 곳에서 관리할 수 있습니다.
![mypage](https://github.com/user-attachments/assets/20b59182-601e-4da3-a94b-9ea4fc547885)

- ###### 프로필 편집 : 사용자의 정보를 수정할 수 있습니다. 
![profile](https://github.com/user-attachments/assets/f6ce1bee-919e-4f94-8227-791ca27e3ef3)

- ###### 제작자 전환 신청 : 프로젝트를 생성하기 위해서는 제작자로 전환 신청을 해야하며, 전환 신청 후 운영자가 해당 내용을 확인한 다음 승인합니다. 
![application](https://github.com/user-attachments/assets/acbadcdd-36c9-412b-8886-e7019495ac81)

- ###### 나의 후원 : 사용자가 후원한 프로젝트를 한번에 확인할 수 있습니다. 진행 중인 후원일 경우에는 환불이 가능하며, 마감된 후원의 경우 달성률을 확인할 수 있습니다. 
![mydonation](https://github.com/user-attachments/assets/726069ea-aa4f-4f22-bc07-8dc3d360dff3)

- ###### 나의 문의 : 문의하기를 통해 운영진에게 1:1 문의가 가능하며, 나의 문의 내역을 통해 1:1 문의 내역 및 프로젝트 문의 댓글을 확인할 수 있습니다.
~~~
1:1 문의
~~~
![inquiry](https://github.com/user-attachments/assets/3285b72b-d4e2-420a-a146-2c1d21a5a524)

~~~
프로젝트 문의 댓글 : 프로젝트 문의 댓글 답글이 없을 경우에만 수정이 가능하며, 답변은 프로젝트 작성자만 작성할 수 있습니다. 
~~~
![comments](https://github.com/user-attachments/assets/754df2a0-713a-4516-a2ce-b71a207253f0)

---

>### 프로젝트
#### 프로젝트 관리
- ###### 프로젝트는 제작자 전환 후 생성할 수 있으며, 사용자는 마이페이지에서 본인의 프로젝트를 직접 생성, 수정, 삭제할 수 있습니다.
![mypage-projects](https://github.com/user-attachments/assets/d7b593e7-163d-4eab-97ec-139711e920b6)
---
#### 프로젝트 생성
- ###### 프로젝트 생성 시 프로젝트 제목, 짧은 소개 글, 카테고리, 프로젝트 상품 등 작성을 하게되며 운영자의 승인을 받은 후, 메인 페이지에서 프로젝트가 노출됩니다.
![new-project](https://github.com/user-attachments/assets/9c668ba9-638f-4e3b-8ab8-672d989e891f)
---
#### 프로젝트 확인
- ###### 마이페이지에서 본인이 생성한 프로젝트의 제목을 클릭하면 프로젝트 상세 페이지를 확인할 수 있습니다.
![view-projects](https://github.com/user-attachments/assets/32ff80ee-97cf-4f20-abfe-c344c6d5fe3f)
---
#### 프로젝트 수정
- ###### 프로젝트 수정 시 프로젝트 제목, 짧은 소개 글, 카테고리 및 프로젝트 소개 글만 수정이 가능합니다. 
![edit-projects](https://github.com/user-attachments/assets/9b18c681-3bd0-499a-bfcc-a9ee105ae02a)
![edit-project](https://github.com/user-attachments/assets/f66b80d4-a798-44bc-a1f6-f4510ca0c67e)
---
#### 프로젝트 삭제
- ###### 프로젝트 삭제는 프로젝트가 시작되지 않은 경우에만 가능합니다.
![delete-projects](https://github.com/user-attachments/assets/ef2c935a-e2b4-433d-acfa-a5e2de36b838)  

---

>### 결제
- ###### 결제는 포트원API(토스페이먼츠)를 통해 연동되어 있습니다.
![payment](https://github.com/user-attachments/assets/22a8054b-8337-4911-bb26-23ed2b9b7c26)

---
