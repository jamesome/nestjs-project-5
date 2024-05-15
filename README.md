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

# ts-node
# TypeScript를 NodeJs 환경에서 실행하기 위한 도구.
```

## 참고

```bash
# https://velog.io/@gkqkehs7/nest.js%EC%99%80-mysql%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0

# Using TypeORM Migration in NestJS
## https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75

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
```
