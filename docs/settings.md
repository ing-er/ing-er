# Settings



## Local

- spring
  - JAVA 1.8 설치 및 환경변수 설정

  - STS 3버전 설치

  - 프로젝트 import 

    `file - import - gradle - Existing gradle project - 잉어 프로젝트 선택`

  - UTF-8설정

    `window - preference - UTF-8 설정`

  - spring 설정

    `Add Spring project Nature`

  - lombok 설치

    `java -jar lombok.jar 실행`

  - gradle 설정

    `Gradle Sync - Gradle - Refresh gradle project`

  - webpack 설정

    `gradle tasks - npm - webpack 클릭`

  - project 실행

    `project Refresh - Run As - Spring Boot App`

- mysql

  - mysql , workbench 설치
  - mysql schema 생성 - "ssafy_web_db"  
  - 프로젝트 실행

- react
  - 기반 개발환경

    - Node JS, Visual Studio Code(IDE) 설치

  - 환경설정

    - api 서버와 openvidu 서버를 별도 설치하였을 경우

      ```bash
      /.env
      
      REACT_APP_SERVER_URL={your api server url}
      REACT_APP_OPENVIDU_URL={your openvidu server url}
      ```

    - local 환경에서 api 서버와 openvidu 서버를 설치하는 경우(spring server port 8080, openvidu port 4443의 경우)

      ```bash
      /.env
      
      REACT_APP_SERVER_URL=http://localhost:8080/api/v1/
      REACT_APP_OPENVIDU_URL=https://localhost:4443
      ```

      - local spring 서버와 연결할 때 배포 버전의 url 규칙으로 인해 맨 뒤에 `/`를 반드시 붙여줘야 함

  - 실행

    - node package install

      ```bash
      $ npm install
      ```

    - start

      ```bash
      $ npm start
      ```

    - 접속

      - default 3000 port로 접근

      - `http://localhost:3000` 접속

- openvidu

  - docker 설치(공식 사이트 참조)

  - openvidu-server-kms 도커 image pull and run

    ```bash
    $ docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.19.0
    ```

  - openvidu local server 실행 테스트

    - `https://localhost:4443/dashboard` 접속
    - `ID: OPENVIDUAPP` `PWD: MY_SECRET` 입력 후 접속
    - TEST 버튼 클릭하여 카메라 권한 허용 후 테스트



## Deployment

> OS: ubuntu.20.04
>
> spring, mysql, react, openvidu 서버 별도 배포 후 nginx 웹서버를 통해 location 설정 수정
>
> 프로젝트 루트 폴더의 경로는 `/home/ubuntu/` 를 전제

- spring

  - pem키를 이용한 ssh 접속

  - project clone

    ```bash
    $ git clone {프로젝트 깃 주소}
    ```

  - jdk jre 설치

  - gradle 설치

  - backend 폴더 접근

    ```bash
    $ cd backend
    ```

  - 프로젝트 빌드

    ```bash
    $ ./gradlew clean build - ./gradlew build
    ```

  - 프로젝트 실행

    ```bash
    $ cd build/libs
    $ java -jar skeleton-project-1.0-SNAPSHOT.jar
    ```

- mysql

  - ubuntu 패키지 정보 업데이트

    ```bash
    $ sudo apt update
    ```

  - mysql 설치

    ```bash
    $ sudo apt install mysql-server`
    ```

  - mysql 설치 확인

    ```bash
    $ dpkg -l | grep mysql-server`
    ```

  - mysql 실행여부 확인

    ```bash
    $ sudo netstat -tap | grep mysql
    ```

  - mysql 접속

    ```bash
    $ mysql -u root -p
    ```

  - database 접속

    ```bash
    $ use ssafy_web_db;
    ```

- react

  - Node JS 설치

  - project clone 후 frontend 폴더 접근

    ```bash
    $ cd frontend
    ```

  - 환경설정

    - api 서버와 openvidu 서버를 별도 설치하였을 경우

      ```bash
      /.env
      
      REACT_APP_SERVER_URL={your api server url}
      REACT_APP_OPENVIDU_URL={your openvidu server url}
      ```

    - 배포 환경에서 api 서버와 openvidu 서버를 설치하는 경우(spring server port 8080, openvidu port 4443의 경우)

      ```bash
      /.env
      
      REACT_APP_SERVER_URL=https://{YOUR_DOMAIN}/api/v1
      REACT_APP_OPENVIDU_URL=https://{YOUR_DOMAIN}:4443
      ```

      - 배포된 api 서버와 연결할 때 url 규칙으로 인해 맨 뒤에 `/`를 반드시 제외시켜야 함

  - build

    - frontend 폴더 접근

      ```bash
      $ cd frontend
      ```

    - node package install

      ```bash
      $ npm install
      ```

    - build

      ```bash
      $ npm run build
      ```

    - build 파일을 docroot 폴더에 symbolic link를 통해 바라보게 함(/var/www/html 경로에서 진행)

      ```bash
      $ cd /var/www/html
      $ ln -s /home/ubuntu/{yourPjtRoot}/frontend/build build
      ```

    - nginx 설정을 통해 build 폴더를 root directory로 설정 후 접근 

      `https://{YOUR_DOMAIN}`

- openvidu

  - [공식사이트](https://docs.openvidu.io/en/2.19.0/deployment/ce/on-premises/) 참조

  - docker, docker-compose 설치

  - 보안그룹 인바운드 설정

  - /opt 폴더 내 설치 권장

    ```bash
    $ cd /opt
    $ curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
    ```

  - configuration

    - /opt/openvidu/.env 파일 수정

      ```bash
      DOMAIN_OR_PUBLIC_IP={YOUR_DOMAIN}
      CERTIFICATE_TYPE=letsencrypt
      OPENVIDU_SECRET=MY_SECRET
      LETSENCRYPT_EMAIL={VALID_YOUR_EMAIL}
      HTTP_PORT=8081  // 또는 사용하지 않는 port
      HTTPS_PORT=4443  // 또는 사용하지 않는 port
      ```

    - 실행

      ```bash
      $ cd /opt/openvidu
      $ ./openvidu start
      ```

    - 테스트

      `https://{YOUR_DOMAIN}:4443/dashboard` 접속 후 local과 동일한 방식으로 진행

- nginx 서버 설정
  - nginx 설치(공식 사이트 참조)

  - {YOUR_DOMAIN} SSL 인증서 발급(letsencrypt)

  - nginx configruation

    react, spring 서버와 연결하기 위한 서버 설정

    ```bash
    $ cd /etc/nginx/sites-available
    $ sudo vi default
    ```

    ```bash
    /etc/nginx/sites-available/default
    
    server {
            listen 80 default_server;
            listen [::]:80 default_server;
    
          root /var/www/html/build;
    
          server_name <<YOUR_DOMAIN>>;
    
          return 301 https://$server_name$request_uri;
    
          location / {
                  # First attempt to serve request as file, then
                  # as directory, then fall back to displaying a 404.
                  try_files $uri $uri/ = 404;
          }
    }
    
    server {
            listen 443 ssl;
            listen [::]:443 ssl;
    
          server_name i5a208.p.ssafy.io;
    
          ssl_certificate <<YOUR_FULLCHAIN_ROUTE>>;
          ssl_certificate_key <<YOUR_PRIVATEKEY_ROUTE>>;
    
          root /var/www/html/build;
          index index.html;
    
    
          location / {
                  try_files $uri $uri/ /index.html;
          }
    
          location /api/v1 {
                  proxy_pass http://{YOUR_DOMAIN}/api/v1/;
                  proxy_redirect off;
                  charset utf-8;
    
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Forwarded-Proto $scheme;
                  proxy_set_header X-NginX-Proxy true;
          }
    }
    ```

  - nginx 재실행

    ```bash
    $ sudo service nginx -t  // success 시
    $ sudo service nginx start
    ```

    
