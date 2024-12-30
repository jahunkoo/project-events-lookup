# 프로젝트 설명

## 기술스택 선택 사유

### package manager - pnpm

- Global 저장소에 install되고 symbolic link로 참조하는 방식.
  - monorepo에 가장 최적화 된 디펜던시 관리 방식
- non-flat node_modules directory no hoist no phantom dependency issue
- 병렬 install 지원
  - pnpm is up to 2x faster than npm

### commitlint, husky

- 일관된 커밋메세지는 히스토리 파악을 포함, 팀원과의 협업에 많은 이점이 있습니다. 따라서 가장 널리 사용되는 [commitlint](https://commitlint.js.org/)를 본 과제에 적용하였습니다.
- 커밋 컨벤션 확인 스크립트를 pre-commit hook에 추가하기 위하여, husky를 추가로 install하였습니다.
