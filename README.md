# 프로젝트 설명

## 기술스택 선택 사유
### package manager - pnpm
- Global 저장소에 install되고 symbolic link로 참조하는 방식.
  - monorepo에 가장 최적화 된 디펜던시 관리 방식
- non-flat node_modules directory no hoist no phantom dependency issue
- 병렬 install 지원
  - pnpm is up to 2x faster than npm

