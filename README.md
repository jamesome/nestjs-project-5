<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## CLI

```bash
#install
$ nest new project-name

# Lint and autofix with eslint
$ yarn run lint

# Format with prettier
$ yarn run format

# Generates and/or modifies files based on a schematic
$ nest g resource resource-name

# ORM
# 1. typeOrm
$ yarn add @nestjs/typeorm typeorm mysql2

# 마이그레이션 파일 생성 script
# npm만 가능
$ npm run migration:create --name=<마이그레이션 파일명>

# 마이그레이션 파일 실행
$

# 2. prisma
# $ yarn add prisma --save-dev
# $ yarn prisma init
# $ yarn prisma migrate dev --name init

# 타입스크립트 경로 읽기 위한 패키지
$ yarn add tsconfig-paths

# Schema validation
# config에 추가한 환경변수가 유효한지 체크하는 모듈
$ yarn add class-validator class-transformer joi

# HMR
$ yarn add webpack-node-externals run-script-webpack-plugin webpack

# swagger
$ yarn add @nestjs/swagger

# swagger 보안
$ yarn add express-basic-auth

# .env 사용
$ yarn add @nestjs/config

# env 파일 읽기
$ yarn add dotenv

# .env 환경에 따라 cross
$ yarn add cross-env

# 국제화
$ yarn add nestjs-i18n

# View Template
$ yarn add hbs

# Rate Limiting
$ yarn add @nestjs/throttler

# compression
$ yarn add compression

# helmet (보안)
$ yarn add helmet

# Log
$ yarn add nest-winston winston winston-daily-rotate-file

# jwt
$ yarn add @nestjs/jwt

# SWC
$ yarn add @swc/cli @swc/core

# bull
$ yarn add @nestjs/bull bull

# seeder
$ yarn add typeorm-extension

# faker
$ yarn add @faker-js/faker

# excel, fs, 파일업로드
$ yarn add xlsx fs

# ts-node
# TypeScript를 NodeJs 환경에서 실행하기 위한 도구.
```

## 참고

```bash
# https://velog.io/@gkqkehs7/nest.js%EC%99%80-mysql%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0

# Using TypeORM Migration in NestJS
## https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75

# TYPEORM
## https://medium.com/zigbang/typeorm-%EC%82%AC%EC%9A%A9%EC%82%AC%EB%A1%80-3%EA%B0%80%EC%A7%80-6a3c2bcd6cff
## https://ilikezzi.tistory.com/category/Web/TypeOrm
## https://medium.com/zigbang/typeorm-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95-aadd80fe13eb

# 오류
# Property '어쩌구' has no initializer and is not definitely assigned in the constructor.
## https://velog.io/@gingaminga/%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-has-no-initializer-and-is-not-definitely-assigned-in-the-constructor

# [I18n] No resolvers provided! nestjs-i18n won't work properly
## resolver를 app.module useFactory 위로 설정해야됨

# 코딩 컨벤션
## https://blog.webudding.com/typeorm-0-3-%EC%A0%81%EC%9A%A9%EA%B8%B0-feat-refactoring-dc86e53619d3

# 도움
## https://blockmonkeys.tistory.com/192

# 스웨거 설정
## https://wooserk.tistory.com/105

# seeder
## https://whyhard.tistory.com/60
## https://velog.io/@gkqkehs7/typeorm-extension%EC%9C%BC%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-seeding
## https://junyharang.tistory.com/521
## https://www.testingfly.com/articles/seed-database-using-typeorm-seeding

# create()와 save()를 분리하여 사용하는 이유는 다음과 같습니다.
# 분리된 생성과 저장 과정: create()는 엔티티 객체를 생성하는 단계이고, save()는 데이터베이스에 엔티티를 저장하는 단계입니다. 이 두 과정을 명확히 분리함으로써 코드의 의도를 명확히 할 수 있습니다.
# 유효성 검사 및 후처리: create() 후에 save()를 호출하면 TypeORM은 엔티티의 유효성을 검사하고 데이터베이스에 저장할 때 필요한 적절한 쿼리를 생성합니다. 또한, save()를 호출하면 데이터베이스에 저장된 엔티티의 후처리 작업(예: 자동 생성된 기본 키값 등)을 수행할 수 있습니다.
# 트랜잭션 관리: create()와 save()는 트랜잭션을 명시적으로 분리하여 관리할 수 있습니다. 예를 들어, 여러 개의 엔티티를 한 번에 생성한 후 일괄적으로 저장하는 경우에 유용합니다.

# Multi Tenancy
## https://medium.com/@yangcar/multi-tenancy-implementation-with-nestjs-and-postgresql-507c6340269
## https://resilient-923.tistory.com/409#google_vignette
## https://gist.github.com/miyu4u/ebbe59e4ed173280ab14d26169242150

# EXCEL
## https://velog.io/@peter0618/NestJS-excel-%EC%97%85%EB%A1%9C%EB%93%9C%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C
## https://4sii.tistory.com/693

# VIRTUAL Column
# addSelect() 함수를 통해 Entity에 없는 계산된 컬럼을 노출시키려는 경우, getMany()나 getOne()으로는 노출 불가.(Entity에 없기 때문.)
## https://velog.io/@pk3669/%EA%B0%80%EC%83%81-%EC%BB%AC%EB%9F%BC
## https://pietrzakadrian.com/blog/virtual-column-solutions-for-typeorm
## https://seongsu.me/skill/typeorm-virtual-column-2/

# Logger
## https://orkhan.gitbook.io/typeorm/docs/logging#changing-default-logger
## https://stackoverflow.com/questions/77677988/configure-colors-for-nestjs-logger

# MYSQL2 - wait_timeout
## https://kim.heejae.info/post/dev/268
```
