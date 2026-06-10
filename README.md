# Azure Image Compare

Azure Image Compare는 `MAI-Image-2e`와 `gpt-image-2`를 동일한 텍스트 프롬프트로 비교하는 데모 웹 앱입니다. 이미지 생성 결과, 생성 시간, 비용 비교를 함께 확인할 수 있습니다.

## 프로젝트 구조

- `index.html` - 비교 UI 및 비용/시간 분석 인터페이스
- `proxy.js` - Azure/Foundry 이미지 생성 호출을 위한 로컬 프록시 서버
- `package.json` - 실행 스크립트 및 종속성

## 요구 사항

- Node.js 18 이상
- `npm` 또는 `pnpm` 사용 가능
- Azure/Foundry API 엔드포인트 및 API 키
- `MAI-Image-2e` 및 `gpt-image-2` 배포 이름

## 설치 및 실행

```bash
cd /path/to/codeTest
npm install
node proxy.js
```

기본 프록시 서버는 `http://localhost:3000`에서 실행됩니다.

## 사용 방법

1. `index.html`을 웹 브라우저에서 엽니다.
2. Azure 또는 Foundry 엔드포인트를 입력합니다.
3. API 키를 입력합니다.
4. `MAI-Image-2e` 및 `gpt-image-2` 배포 이름을 입력합니다.
5. 텍스트 프롬프트를 입력하고 `이미지 생성 비교` 버튼을 클릭합니다.
6. 각 모델에 대한 이미지, 생성 시간, 누적 비용 비교를 확인합니다.

## 참고 사항

- 이 페이지는 브라우저에서 로컬 프록시(`proxy.js`)와 함께 실행되어야 합니다.
- `MAI-Image-2e`는 비용 효율 모델로 설정되어 있으며, 실제 가격 비교는 Azure 요금 및 사용량에 따라 달라집니다.
- 디버그 패널은 기본적으로 화면에 표시되지 않도록 숨겨져 있습니다.

## 추가

- `proxy.js`의 CORS 설정은 로컬 브라우저에서 프록시를 사용할 수 있도록 구성되어 있습니다.
- 모델 이름, 토큰/이미지 비용 입력을 통해 비용 비교를 즉시 확인할 수 있습니다.
