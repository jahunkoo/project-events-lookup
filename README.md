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


### Architecture - [FSD](https://feature-sliced.design/)
> Good Software Design에 대한 Martin Fowler의 글과 다음 그래프에 대해 많이 공감하는 편입니다.
![Design Stamina Hypothesis by Martin Fowler.png](./design-stamina-hypothesis-by-martin-fowler.png)

Project의 Architecture는 Good Software Design의 시작점이자 코드의 방향을 잡는 키 역할을 하기 때문에 매우 중요한데요,
지난 경험을 통해 기술 중심보다는 기능 단위로 코드를 묶는 것이 협업에 있어서 Conflict나 Side Effect를 줄이는데 많은 이점이 있다는 사실을 확인했던 것 같습니다.

#### **기술 중심의 프로젝트 예시**
```
src/
  ├── assets/           icon, images, translations, ...
  ├── components/       React components ...
  ├── contexts/         React contexts ...      
  ├── hooks/            React hooks ...
  ├── stores/           Store data for client side ...
  ├── styles/           css, scss css-in-js fragments ...
  ├── constants/  
  ├── utils/      
  ├── App.tsx
  └── package.json      
```
#### **기능 중심의 프로젝트 예시**
```
src/
  ├── features/
  │    ├── auth/
  │    ├── profile/
  │    │    ├── api/
  │    │    ├── components/
  │    │    ├── contexts/
  │    │    ├── stores/
  │    │    ├── hooks/
  │    │    ├── models/
  │    │    └── ...
  │    ├── dashboard/
  │    └── ...
  ├── shared/
  │    ├── utils/
  │    ├── components/
  │    ├── libs/
  │    └── ...    
  ├── App.tsx
  └── package.json      
```

Feature-Sliced Design(FSD)은 한 단계 더 발전하여 종축으로는 app, pages, widgets, features, entities, shared.
횡축으로는 Layer, Slice, Segment라는 3개의 단계를 두어 좀 더 체계적인 프로젝트 구조를 제시하는데요, 
![Concept of Feature-Sliced Design](./fsd-concept.jpg)
1. 비즈니스 중심의 아키텍처 방법론이고 단방향 의존성 규칙이 있어서 유지보수성이 높고
2. 표준화된 아키텍처이기 때문에 글로벌하게 해당 아키텍쳐를 익힌 사람들간에는 common sense를 가질 수 있다는데에 확장성을 고려해

올해부터 프로젝트에 적용하고 있으며 기대한대로 유지보수성이 뛰어나 만족하고 있는 디자인입니다. 그렇기에 이번 과제에도 적용하였습니다.
