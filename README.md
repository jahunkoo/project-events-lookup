# 프로젝트 설명

## 기술스택 선택 사유

### package manager - pnpm
- Global 저장소에 install되고 symbolic link로 참조하는 방식.
  - monorepo에 가장 최적화 된 디펜던시 관리 방식
- non-flat node_modules directory no hoist no phantom dependency issue
- 병렬 install 지원
  - pnpm is up to 2x faster than npm

### lint - commitlint, husky
- 일관된 커밋메세지는 히스토리 파악을 포함, 팀원과의 협업에 많은 이점이 있습니다. 따라서 가장 널리 사용되는 [commitlint](https://commitlint.js.org/)를 본 과제에 적용하였습니다.
- 커밋 컨벤션 확인 스크립트를 pre-commit hook에 추가하기 위하여, husky를 추가로 install하였습니다.

### format - prettier
- 일관된 코드 포맷 또한 협업에 많은 이점을 가져다 주기 때문에, prettier를 적용하였습니다.
- 현 과제에는 제가 그동안 사용해 온 rule을 적용하였지만, .prettierrc에 정의된 rule들은 기본적으로 팀원들과의 합의를 통해 정합니다.
- 개개인의 스타일은 존중하되, 커밋상에서는 팀내 합의된 format을 남기기 위해 pre-commit hook에 format 체크 기능을 추가하였습니다.
