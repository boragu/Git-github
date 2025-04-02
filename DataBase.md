## 데이터베이스란? 
- 서로 관련된 데이터들의 집합 / 특정 조직의 여러 사용자가 공유하여 사용할 수 있도록 통합해서 저장된 윤영 데이터의 집합

### 특성
<!--Table-->
|Code|Meaning|
|:--:|:--:|
|실시간 접근|실시간으로 서비스, 사용자가 데이터 요청 시, 수 초 내에 결과를 서비스|
|계속적인 변화|저장된 내용은 어느 한순간의 상태를 나타내지말, 바뀐 데이터 값을 저장하여 정확한 데이터를 유지|
|동시 공유|서로 다른 업무를 하는 여러 사용자들이 동시(병행)에 다른/같은 데이터를 공유. 데이터베이스에 접근하는 프로그램이 여러개 있을 수 있음|
|내용 기반 참조|데이터베이스에 저장된 데이터는 데이터의 물리적인 위치가 아니라 데이터 값에 따라 참조할 수 있어야 함|

### 데이터 종류
<!--Table-->
|TYPE|Meaning|
|:--:|:--:|
|통합데이터|데이터를 통합. 각자 사용하던 데이터의 중복을 최소화하여 중복으로 인한 데이터 불일치 현상을 제거|
|저장데이터|문서로 보관된 데이터가 아니라 디스크 같은 컴퓨터 저장장치에 저장된 데이터|
|운영데이터|조직의 주요 기능 수행을 위해 사용되는 데이터(업무를 위한 검색 목적으로 저장됨)|
|공용데이터|한 사람 또는 한 업무를 위해 사용되는 데이터가 아닌, 공동으로 사용되는 데이터|

### 종류
<!--Table-->
|TYPE|Meaning|Example|
|:--:|:--:|:--:|
|RDBMS(관계형 데이터베이스|테이터를 테이블 형식으로 구성, 행과 열로 이루어짐, SQL 언어 사용, 정확성과 일관성(ACID 원칙) 중요하게 생각|MySQL, PostgreSQL, Microsoft SQL Server, Oracle, Microsoft SQL Server ..|
|NoSQL(Not Only SQL, 비관계형 데이터베이스)|정형화되지 않은 데이터를 저장, 테이블 대신 문서, 키-값, 그래프, 컬럼 기반 구조 사용. 스키마 유연, 속도 중시 (BASE 원칙)|MongoDB, Cassandra, Redis, Couchbase, Firebase..|

## SQL이란? 
- Structured Query Language의 약자. 일정한 형식으로 데이터를 정리, 도메인 특화 언어에 가깝다.

## NoSQL이란? 
 -Not Only SQL의 약자. RDBMS의 테이블 기반 구조가 아닌 다양한 데이터 모델을 지원하는 데이터베이스, 스키마 없이도 데이터 저장 가능, 확장성과 유연성, 빅데이터나 실시간 웹 애플리케이션에 주로 사용됨
 ![스크린샷 2025-04-02 211240](https://github.com/user-attachments/assets/6254170f-afb2-4ec2-8bdf-564d8eaa7441)


### SQL과 DBMS의 차이점
![스크린샷 2025-04-02 211249](https://github.com/user-attachments/assets/10081a33-4635-4da8-a08a-82009a63fcb7)


## DBMS란? 
- Database Management System의 약자. 데이터베이스를 관리하는 시스템, 정보를 수정, 삭제, 조회 가능

## ERD란? 
- Entity-Relationship Diagram의 약자. 현실의 데이터를 개체, 속석, 관계로 나누어 표현한 데이터베이스 설계도(시각적으로 구현)

## SQL 기본 문법
```https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_all```

#### 1) 자료형
##### 1. 숫자 자료형
<!--Table-->
|TYPE|Byte|Signed|Unsigned|
|:--:|:--:|:--:|:--:|
|TINYINT|1|-128 ~ 127|0 ~ 255|
|SMALLINT|2|-32,768 ~ 32,767|0 ~ 65,535|
|MEDIUMINT|3|-8,388,608 ~ 8,388,607	0|~ 16,777,215|
|INT|4|-2,147,483,648 ~ 2,147,483,647|0 ~ 4,294,967,295|
|BIGINT|8|-2^63 ~ 2^63 - 1|0 ~ 2^64 - 1|
```
고정 소수점 수: 좁은 범위의 수 표현 가능, 정확한 값
|DECIMAL( s, d )|실수 부분 총 자릿수( s ) & 소수 부분 자릿수 ( d )|s 최대 65|

부동 소수점 수
|FLOAT|-3.402...E+38 ~ -1.175...E-38 , 0 , 1.175...E-38 ~ 3.402...E+38|
|DOUBLE|-1.797...E+308 ~ -2.225E-308 , 0 , 2.225...E-308 ~ 1.797...E+308|
```
##### 2. 문자 자료형
- 문자열
<!--Table-->
|TYPE|Byte|Byte|Maximum Byte|
|:--:|:--:|:--:|:--:|
|CHAR( s )|고정 사이즈 (남는 글자 스페이스로 채움)|s (고정값)|255|
|VARCHAR ( s )|가변 사이즈|실제 글자 수[최대 s] + 1 [글자수 정보]|65,535|
- 검색 시 CHAR가 더 빠름
- VARCHAR 컬럼 길이값이 4글자보다 적을 경우 CHAR로 자동변환

- 텍스트
<!--Table-->
|TYPE|Maximum Byte|
|:--:|:--:|
|TINYTEXT|255|
|TEXT|65,535|
|MEDIUMTEXT|16,777,215|
|LONGTEXT|4,294,967,295|

##### 3. 시간 자료형
<!--Table-->
|TYPE|Meaning||
|:--:|:--:|:--:|
|DATE|YYYY-MM-DD||	
|TIME|HHH:MI:SS|HHH: -838 ~ 838까지의 시간|
|DATETIME	|YYYY-MM-DD HH:MI:SS|입력된 시간을 그 값 자체로 저장|
|TIMESTAMP|YYYY-MM-DD HH:MI:SS|MySQL이 설치된 컴퓨터의 시간대를 기준으로 저장|
- 시간 데이터를 가감없이 기록할 때 DATETIME
- 시간 자동기록, 국제적인 서비스를 할 경우 TIMESTAMP 사용

#### 3) 테이블 
<!--Table-->
|Code|Meaning|Example|
|:--:|:--:|:--:|
|CREATE TABLE 테이블 이름 {데이터 형식}|생성|```CREATE TABLE people ( person_id INT, person_name VARCHAR(10), age TINYINT, birthday DATE);```|
|DROP TABLE 테이블 이름|삭제|```DROP TABLE friends; or DROP COLUMN birthday;```|
|INSERT INTO 테이블 명 (컬럼명) VVALUES (넣을 값)|삽입|```INSERT INTO people (person_id, person_name, age, birthday) VALUES (4, '존 스미스', 30, '1991-03-01'), (5, '루피 D. 몽키', 15, '2006-12-07');```|

##### 테이블 변경
<!--Table-->
|Switch|Code|Example|
|:--:|:--:|:--:|
|테이블명|ALTER TABLE 테이블이름 RENAME TO 바꿀 테이블 이름|```ALTER TABLE people RENAME TO  friends```|
|컬럼 자료형|CHANDE COLUMN 컬럼 이름 TINYINT|```CHANGE COLUMN person_id person_id TINYINT```
|컬럼명|CHANGE COLUMN 컬럼이름 VARCHAR(!))|```CHANGE COLUMN person_name person_nickname VARCHAR(10)```|
|컬럼추가|ADD COLUMN 컬럼 이름 TINYINT AFTER 타입|```ADD COLUMN is_married TINYINT AFTER age```|

##### 테이블 생성시 제약
<!--Table-->
|Code|Meaning|
|:--:|:--:|
|AUTO_INCREMENT|새 행 생성시마다 자동으로 1씩 증가|
|PRIMARY KEY|중복 입력 불가, NULL(빈 값) 불가|
|UNIQUE|중복 입력 불가|
|NOT NULL	NULL(빈 값)|입력 불가|
|UNSIGNED|(숫자일시) 양수만 가능|
|DEFAULT|값 입력이 없을 시 기본값|

##### PRIMARY KET(기본키)
- 테이블마다 하나만 가능
- 기본적으로 인덱스 생성(기본키 행 기준으로 빠른 검색 가능)
- 보통 AUTO_INCREMENT와 함께 사용
- 각 행을 고유하게 식별 가능 : 테이블마다 하나씩 둘 것
- ex) ```INSERT INTO people 
  (person_name, nickname, age, is_married)
  VALUES ('박쇳물', '아이언워터', NULL, 1);
  -- nickname에 NULL, '아이언수' 넣어보기```

#### 4) 데이터 조회
<!--Table-->
|Code|Meaning|Example|
|:--:|:--:|:--:|
|--|주석||
|SELECT * FROM Customers;|*은 모든 컬럼을 말한다.|```SELECT CustomerName FROM Customers;```|
|SELECT 열이름(여러개도 가능) FROM 테이블이름|원하는 열만 골라서 보기|```SELECT CustomerName, ContactName, Country FROM Customers;```|
||테이블의 컬럼이 아닌 값도 선택 가능|```SELECT CustomerName, 1, 'Hello', NULL FROM Customers;```|
|SELECT*FROM 테이블이름 WHERE 조건|원하는 행만 골라서 보기|```SELECT * FROM Orders WHERE EmployeeID = 3;```|
|ORDER BY 컬럼 이름 (ASC/DESC)|ASC:오름차순, DESC:내림차순|```SELECT * FROM OrderDetails ORDER BY ProductID ASC, Quantity DESC;```|
|LIMIT 가져올개수 or LIMIT 건너뛸 개수, 가져올 개|원하는 만큼만 데이터 가져오기|```SELECT * FROM Customers LIMIT 30, 10;```|
||원하는 별병으로 데이터 가져오기 한글은 ''안에 널기|```SELECT CustomerId AS ID, CustomerName AS NAME, Address AS ADDR FROM Customers;```|
|||```SELECT CustomerID AS '아이디', CustomerName AS '고객명', City AS '도시', Country AS '국가' FROM Customers WHERE City = 'London' OR Country = 'Mexico' ORDER BY CustomerName LIMIT 0, 5;```|

#### 5) 연산자
<!--Table-->
|Code|Meaning|Example|
|:--:|:--:|:--:|
|+-*/|각각 더하기, 빼기, 곱하기, 나누기|```SELECT 5 - 2.5 AS DIFFERENCE;```|
|% MOD|나머지|SELECT 10 % 3;|
||||
|IS|양쪽이 모두 TRUE 또는 FALSE|```SELECT TRUE IS TRUE;```|
|IS NOT||한쪽은 TRUE, 한쪽은 FALSE|```SELECT (TRUE IS FALSE) IS NOT TRUE;```|
|AND, &&|양쪽이 모두 TRUE일 때만 TRUE|```SELECT TRUE AND FALSE, TRUE OR FALSE;```|
|OR(||) |한쪽이 TRUE면 TRUE|```SELECT 2 + 3 = 6 OR 2 * 3 = 6;```|
|=|양쪽 값이 같음|```SELECT 1 = 1, !(1 <> 1), NOT (1 < 2), 1 > 0 IS NOT FALSE;```|
|!=, <>|양쪽 값이 다름|```SELECT 'A' = 'A', 'A' != 'B', 'A' < 'B', 'A' > 'B';```|
|>,<|값이 더 큼|```SELECT 'Apple' > 'Banana' OR 1 < 2 IS TRUE;```|
|>=,<=|값이 같거나 더 큼||
||||
|BETWEEN {MIN} AND {MAX}|두 값 사이에 있음|```SELECT 5 BETWEEN 1 AND 10;```|
|NOT BETWEEN {MIN} AND {MAX}	|두 값 사이가 아닌 곳에 있음|```SELECT 'banana' NOT BETWEEN 'Apple' AND 'camera';```|
|IN (...)|괄호 안의 값들 가운데 있음|```SELECT 1 + 2 IN (2, 3, 4) ```|
|NOT IN (...)|괄호 안의 값들 가운데 없음||
|LIKE '... % ...'|0~N개 문자를 가진 패턴||
|LIKE '... _ ...'|_ 갯수만큼의 문자를 가진 패턴||

###### 문자열은 '0'으로 인식

#### 6) 숫자와 문자열을 다루는 함수
<!--Table-->
|Code|Meaning|Example|
|:--:|:--:|:--:|
|ROUND|반올림|```ROUND(0.5)```|
|CEIL|올림|```CEIL(0.4)```|
|FLOOR|내림|```FLOOR(0.6);```|
|ABS|절댓값|```SELECT ABS(1), ABS(-1), ABS(3 - 10);```|
|GREATEST|가장 큰 값|```GREATEST(1, 2, 3)```|
|LEAST|가장 작은 |```LEAST(1, 2, 3, 4, 5);```|
|MAX|	가장 큰 값|
|MIN|	가장 작은 값|
|COUNT|	갯수 (NULL값 제외)|
|SUM|	총합|
|AVG|	평균 값|
||||
|UCASE, UPPER|	모두 대문자로||
|LCASE, LOWER|	모두 소문자로||
|CONCAT(...)|	괄호 안의 내용 이어붙임|
|CONCAT_WS(S, ...)|	괄호 안의 내용 S로 이어붙임|
|LENGTH|	문자열의 바이트 길이|
|CHAR_LENGTH, CHARACTER_LEGNTH|	문자열의 문자 길이|

#### 7)시간/날짜 관련 및 기타 함수들
<!--Table-->
|Code|Meaning|
|:--:|:--:|
|DATE|	문자열에 따라 날짜 생성|
|TIME|	문자열에 따라 시간 생성|
|CURRENT_DATE, CURDATE|	현재 날짜 반환|
|CURRENT_TIME, CURTIME|	현재 시간 반환|
|CURRENT_TIMESTAMP, NOW|	현재 시간과 날짜 반환|
|YEAR|	주어진 DATETIME값의 년도 반환|
|MONTHNAME|	주어진 DATETIME값의 월(영문) 반환|
|MONTH|	주어진 DATETIME값의 월 반환|
|WEEKDAY|	주어진 DATETIME값의 요일값 반환(월요일: 0)|
|DAYNAME|	주어진 DATETIME값의 요일명 반환|
|DAYOFMONTH, DAY|	주어진 DATETIME값의 날짜(일) 반환|
|HOUR|	주어진 DATETIME의 시 반환|
|MINUTE|	주어진 DATETIME의 분 반환|
|SECOND|	주어진 DATETIME의 초 반환|

#### 8) 조건에 따라 그룹으로 묶기
GROUP BY -조건에 따라 집계된 값 가져오기
WITH ROLLUP -전체의 집계값
HAVING -그룹화된 데이터 걸러내기
DISTINCT -중복된 값들 제거


```
심화
1. 쿼리 안에 서브쿼리
2. JOIN
3. UNION
```






