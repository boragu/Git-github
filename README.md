# Git-Github
## Git
### Git 명령어
 -저장소 내에서 버전 관리, 협업 등 깃이 제공하는 다양한 기능을 수행하기 위해 입력하는 명령어, git으로 시작
<!--Table-->
|Code|Meaning|
|:--:|:--:|
|$ git config --global user.name "사용자명"|깃 저장소에서 사용할 사용자 정보 중 사용자 명 설정|
|$ git config --global user.email "사용자 메일"|깃 저장소에서 사용할 사용자 정보 중 사용자 메일 주소를 설정|
|$ git init|터미널이 열려있는 폴더를 깃 저장소로 초기화|
|$ git status|깃 프로젝트를 확인|
|$ git add|워킹 디렉터리 내 문서를 스테이징 영역에 추가|
||(add 파일이름 - 해당 파일만 스테이징으로, add . - 모든 파일을 스테이징으로)|
|$ git commit|스테이징 영역 내에 대기 중인 문서를 리포지토리에 추가|
||(shift+i-수정, esc-나가기, shift+:wq-저장후 끝내기, $ git commit -m "쓰고싶은 말" - 위의 단계 한번에)|
|$ git log|커밋한 수정 이력을 확인|
|$ touch 파일이름|만들고 싶은 파일 생성|
|||

### system 명령어
 -폴더 이동, 파일 생성 및 삭제 등 컴퓨터 시스템 관련 기능을 수행하기 위해 입력하는 명령어로, 리눅스 운영체제의 시스템 명령어에 기반을 두고 있다.
<!--Table-->
|Code|Meaning|
|:--:|:--:|
|$ ls|터미널이 열려있는 폴더 내에 있는 항목들을 나열(보이는 것만)|
|$ la -al|.git파일이 있다면 git파일이 만들어진 것(안 보이는 것까지)|
|||
|||
|||

### git의 세가지 관리 영역
 1. Working Directiory : 내가 만든 프로젝트 폴더. 항상 이곳에서 작업을 진행
 2. Staging Area :수정 이력을 기록할 파일을 대기시키는 장소(깃이 관리하는 영역)
 3. Repository : 스테이징 영역에서 대기 중이던 파일들의 수정 이력이 최종적으로 기록되는 곳

## Github
### What is GitHub?
git 프로젝트를 지원하는 2008년 시작된 호스칭 서비스, 깃 기반의 오픈 소스가 이곳에 공개.
```
1. 호스팅 서비스
  -프로젝트 진행에는 원격 저장소 필요, 별도 서버 구축할 수 있지만 관리 측면에서 번거로움 -> 깃허브의 호스팅 서비스 이용 
2. 공개 및 비공개 저장소
  -private와 public 저장소로 나뉨
   -public: 소스 코드가 누구에게나 공개
   -private:제한된 인원에게만 공개
3. 고급 기능
  -GitHub action과 GitHub deployment API로 빌드 및 배포 자동화 구성
  -project boards로 협업 프로젝트 관리 가능
```
