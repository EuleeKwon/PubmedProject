# 모바일웹 실습을 위한 예시 프로젝트

```
├── app // 기본 프로젝트 폴더
│   ├── controllers
│   │   ├── ExternalController.js //외부 API 연동 컨트롤러
│   │   └── InternalController.js //외부 API 요청 후 DB저장 컨트롤러
│   ├── models
│   │   └── MarketHistory.js //저장데이터
│   └── views
│       ├── external //외부 API 연동 View
│       ├── internal //외부 API 요청 후 DB저장뷰
│       └── layouts //기본 뷰
│
├── app.js //기본 프로젝트
├── config //설정
│   ├── enviroment.js //환경변수
│   ├── express.js
│   ├── marketData.json //마켓데이터
│   └── routes.js
├── dummy
│   └── result.json //로컬테스트용
├── helper
│   └── utility.js //유틸리티 모듈
├── package-lock.json
├── package.json
└── public
    └── assets
```




## 리턴받는 데이터예시
```json
{
    "response": {
        "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL SERVICE."
        },
        "body": {
            "items": {
                "item": [
                    {
                        "avgprice": 33000,
                        "coname": "남일청과",
                        "dates": "2018/08/29",
                        "gradename": "없음",
                        "marketname": "순천도매시장",
                        "maxprice": 33000,
                        "mclassname": "배",
                        "minprice": 33000,
                        "rnum": 1,
                        "sclassname": "신고",
                        "sumamt": 110,
                        "unitname": "15kg"
                    }
                ]
            },
            "numOfRows": 10,
            "pageNo": 1,
            "totalCount": 361
        }
    }
}
```
