import type { MenuNode } from '../../types';

/**
 * 메뉴 트리 mock — 시스템관리자_화면_v1.0.HTML 메뉴 마스터 카탈로그 기준.
 * 백엔드 시드(backend/src/database/seed/menu.seed.ts)와 동일하게 유지할 것.
 */
export const mockMenuTree: MenuNode[] = [
  {
    "menuCode": "OP",
    "name": "운영콘솔",
    "nameEn": "Operator Console",
    "menuType": "GROUP",
    "channel": "OP",
    "path": null,
    "screenId": null,
    "sortOrder": 10,
    "requiresStepUp": false,
    "children": [
      {
        "menuCode": "OP-00",
        "name": "운영 진입",
        "nameEn": "Operation Entry",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-00",
        "sortOrder": 20,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-00-M01",
            "name": "이용회사 선택",
            "nameEn": "Company Selection",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/00/m01",
            "screenId": "BF-00",
            "sortOrder": 30,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-01",
        "name": "운영 현황",
        "nameEn": "Operations Dashboard",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-01",
        "sortOrder": 40,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-01-M01",
            "name": "운영 현황 대시보드",
            "nameEn": "OP-01",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/01/m01",
            "screenId": "OP-01",
            "sortOrder": 50,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-02",
        "name": "관리회사·조직",
        "nameEn": "Operator Organization",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-02",
        "sortOrder": 60,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-02-M01",
            "name": "운영조직 도메인",
            "nameEn": "Operations Organization Domain",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/02/m01",
            "screenId": "BF-01",
            "sortOrder": 70,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-03",
        "name": "이용회사/테넌트",
        "nameEn": "Tenant Operations",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-03",
        "sortOrder": 80,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-03-M01",
            "name": "테넌트 인프라",
            "nameEn": "OP-03",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/03/m01",
            "screenId": "OP-03",
            "sortOrder": 90,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-04",
        "name": "구독·요금·사용량",
        "nameEn": "Subscription Billing",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-04",
        "sortOrder": 100,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-04-M01",
            "name": "구독·청구·결제",
            "nameEn": "Subscription Billing Payment",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/04/m01",
            "screenId": "BF-10",
            "sortOrder": 110,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-05",
        "name": "공통 표준 카탈로그",
        "nameEn": "Common Standards",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-05",
        "sortOrder": 120,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-05-M01",
            "name": "시스템 공통코드 관리",
            "nameEn": "System Common Code Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/05/m01",
            "screenId": "OP-05C",
            "sortOrder": 130,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-05-M02",
            "name": "표준 카탈로그 관리",
            "nameEn": "Standard Catalog Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/05/m02",
            "screenId": "BF-08",
            "sortOrder": 140,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-06",
        "name": "사용자·인증·권한",
        "nameEn": "Users, Authentication and Permissions",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-06",
        "sortOrder": 150,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-06-M01",
            "name": "사용자 관리",
            "nameEn": "User Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m01",
            "screenId": "OP-06A",
            "sortOrder": 160,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-06-M02",
            "name": "사용자그룹 관리",
            "nameEn": "User Group Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m02",
            "screenId": "OP-06G",
            "sortOrder": 170,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-06-M06",
            "name": "그룹별 메뉴권한",
            "nameEn": "Group Menu Permission",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m06",
            "screenId": "OP-06P",
            "sortOrder": 175,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-06-M03",
            "name": "인증 정책 관리",
            "nameEn": "Authentication Policy Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m03",
            "screenId": "OP-06B",
            "sortOrder": 180,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-06-M04",
            "name": "메뉴 마스터 관리",
            "nameEn": "Menu Master Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m04",
            "screenId": "OP-06D",
            "sortOrder": 190,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "OP-06-M05",
            "name": "Role·권한 관리",
            "nameEn": "Role and Permission Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/06/m05",
            "screenId": "OP-06C",
            "sortOrder": 200,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-07",
        "name": "접근 거버넌스",
        "nameEn": "Access Governance",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-07",
        "sortOrder": 210,
        "requiresStepUp": true,
        "children": [
          {
            "menuCode": "OP-07-M01",
            "name": "Break-glass·접근",
            "nameEn": "OP-07",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/07/m01",
            "screenId": "OP-07",
            "sortOrder": 220,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-08",
        "name": "기장 워크벤치 [기장]",
        "nameEn": "Bookkeeping Workbench",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-08",
        "sortOrder": 230,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-08-M01",
            "name": "기장 전환 워크플로우",
            "nameEn": "Bookkeeping Transfer Workflow",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/08/m01",
            "screenId": "BF-03",
            "sortOrder": 240,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-09",
        "name": "운영·배치·연계 모니터링",
        "nameEn": "Batch and Integration Monitoring",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-09",
        "sortOrder": 250,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-09-M01",
            "name": "배치·연계 운영",
            "nameEn": "OP-09",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/09/m01",
            "screenId": "OP-09",
            "sortOrder": 260,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-10",
        "name": "로그 관리",
        "nameEn": "Log Management",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-10",
        "sortOrder": 270,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-10-M01",
            "name": "로그 관리",
            "nameEn": "Log Management",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/10/m01",
            "screenId": "OP-10",
            "sortOrder": 280,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "OP-11",
        "name": "AI·규칙 운영 [AI]",
        "nameEn": "AI Rule Operations",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-11",
        "sortOrder": 290,
        "requiresStepUp": false,
        "children": [
        {
          "menuCode": "OP-11-M01",
          "name": "AI·규칙 운영",
          "nameEn": "AI Rule Operations",
          "menuType": "MENU",
          "channel": "OP",
          "path": "/operator/op/11/m01",
          "screenId": "OP-11",
          "sortOrder": 295,
          "requiresStepUp": false,
          "children": []
        }
      ]
      },
      {
        "menuCode": "OP-12",
        "name": "개인정보보호",
        "nameEn": "Privacy Protection",
        "menuType": "GROUP",
        "channel": "OP",
        "path": null,
        "screenId": "OP-12",
        "sortOrder": 300,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "OP-12-M01",
            "name": "개인정보보호",
            "nameEn": "Privacy Protection",
            "menuType": "MENU",
            "channel": "OP",
            "path": "/operator/op/12/m01",
            "screenId": "OP-12",
            "sortOrder": 310,
            "requiresStepUp": false,
            "children": []
          }
        ]
      }
    ]
  },
  {
    "menuCode": "TN",
    "name": "업무화면",
    "nameEn": "Tenant Workspace",
    "menuType": "GROUP",
    "channel": "TN",
    "path": null,
    "screenId": null,
    "sortOrder": 320,
    "requiresStepUp": false,
    "children": [
      {
        "menuCode": "TN-00",
        "name": "홈·현황",
        "nameEn": "Home Dashboard",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-00",
        "sortOrder": 330,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-00-M01",
            "name": "대시보드",
            "nameEn": "Dashboard",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/dashboard",
            "screenId": "TN-00",
            "sortOrder": 331,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "TN-01",
        "name": "회사 설정·기초",
        "nameEn": "Company Settings",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-01",
        "sortOrder": 340,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-01-M01",
            "name": "차원·조직·사용정책",
            "nameEn": "Dimension Organization Policy",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/01/m01",
            "screenId": "BF-09",
            "sortOrder": 350,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-01-M02",
            "name": "알림 매트릭스 관리",
            "nameEn": "Notification Matrix Management",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/01/m02",
            "screenId": "BF-11",
            "sortOrder": 360,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "TN-02",
        "name": "기초정보관리",
        "nameEn": "Basic Information",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-02",
        "sortOrder": 370,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-02-G01",
            "name": "회사·권한·환경",
            "nameEn": "Company Authorization Environment",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 380,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-02-G01-M01",
                "name": "회사등록",
                "nameEn": "Company Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g01/m01",
                "screenId": "SA-BAS-01",
                "sortOrder": 390,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G01-M02",
                "name": "권한설정",
                "nameEn": "Permission Settings",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g01/m02",
                "screenId": "SA-BAS-02",
                "sortOrder": 400,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G01-M03",
                "name": "환경설정",
                "nameEn": "Environment Settings",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g01/m03",
                "screenId": "SA-BAS-03",
                "sortOrder": 410,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-02-G02",
            "name": "조직·인력·현장",
            "nameEn": "Organization People Site",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 420,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-02-G02-M01",
                "name": "부서등록",
                "nameEn": "Department Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g02/m01",
                "screenId": "SA-BAS-04",
                "sortOrder": 430,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G02-M02",
                "name": "사원등록",
                "nameEn": "Employee Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g02/m02",
                "screenId": "SA-BAS-05",
                "sortOrder": 440,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G02-M03",
                "name": "현장등록",
                "nameEn": "Site Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g02/m03",
                "screenId": "SA-BAS-08",
                "sortOrder": 450,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G02-M04",
                "name": "프로젝트등록",
                "nameEn": "Project Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g02/m04",
                "screenId": "SA-BAS-09",
                "sortOrder": 460,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G02-M05",
                "name": "외주처등록",
                "nameEn": "Outsourcer Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g02/m05",
                "screenId": "SA-BAS-11",
                "sortOrder": 470,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-02-G03",
            "name": "거래처·계정",
            "nameEn": "Customer Account Setup",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 480,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-02-G03-M01",
                "name": "거래처등록",
                "nameEn": "Customer Vendor Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g03/m01",
                "screenId": "SA-BAS-06",
                "sortOrder": 490,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G03-M02",
                "name": "계정과목 및 적요등록",
                "nameEn": "Account Subject and Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g03/m02",
                "screenId": "SA-BAS-07",
                "sortOrder": 500,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G03-M03",
                "name": "거래처등코드변환",
                "nameEn": "Customer Code Conversion",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g03/m03",
                "screenId": "SA-BAS-13",
                "sortOrder": 510,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G03-M04",
                "name": "거래처DM인쇄",
                "nameEn": "Customer DM Printing",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g03/m04",
                "screenId": "SA-BAS-12",
                "sortOrder": 520,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-02-G04",
            "name": "이월·차량",
            "nameEn": "Carryforward Vehicle",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 530,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-02-G04-M01",
                "name": "업무용승용차 등록",
                "nameEn": "Business Vehicle Registration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g04/m01",
                "screenId": "SA-BAS-10",
                "sortOrder": 540,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-02-G04-M02",
                "name": "마감후이월",
                "nameEn": "Closing Carryforward",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/02/g04/m02",
                "screenId": "SA-BAS-14",
                "sortOrder": 550,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-03",
        "name": "전기이월·개시잔액",
        "nameEn": "Opening Balance",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-03",
        "sortOrder": 560,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-03-G01",
            "name": "전기 재무제표",
            "nameEn": "Prior Financial Statements",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 570,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-03-G01-M01",
                "name": "전기분재무상태표",
                "nameEn": "Prior Financial Position",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m01",
                "screenId": "SA-OPN-01",
                "sortOrder": 580,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G01-M02",
                "name": "전기분손익계산서",
                "nameEn": "Prior Income Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m02",
                "screenId": "SA-OPN-02",
                "sortOrder": 590,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G01-M03",
                "name": "전기분원가명세서",
                "nameEn": "Prior Cost Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m03",
                "screenId": "SA-OPN-03",
                "sortOrder": 600,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G01-M04",
                "name": "전기분이익잉여금처분계산서",
                "nameEn": "Prior Retained Earnings Appropriation",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m04",
                "screenId": "SA-OPN-04",
                "sortOrder": 610,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G01-M05",
                "name": "전기분자본변동표",
                "nameEn": "Prior Equity Changes",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m05",
                "screenId": "SA-OPN-05",
                "sortOrder": 620,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G01-M06",
                "name": "전기분현금흐름표",
                "nameEn": "Prior Cash Flow Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g01/m06",
                "screenId": "SA-OPN-06",
                "sortOrder": 630,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-03-G02",
            "name": "초기이월",
            "nameEn": "Opening Carryforward",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 640,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-03-G02-M01",
                "name": "거래처별초기이월",
                "nameEn": "Customer Opening Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m01",
                "screenId": "SA-OPN-07",
                "sortOrder": 650,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G02-M02",
                "name": "부서/사원별초기이월",
                "nameEn": "Department Employee Opening Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m02",
                "screenId": "SA-OPN-08",
                "sortOrder": 660,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G02-M03",
                "name": "프로젝트초기이월",
                "nameEn": "Project Opening Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m03",
                "screenId": "SA-OPN-13",
                "sortOrder": 670,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G02-M04",
                "name": "미완성공사초기이월",
                "nameEn": "Unfinished Construction Opening",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m04",
                "screenId": "SA-OPN-17",
                "sortOrder": 680,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G02-M05",
                "name": "외주처별초기이월",
                "nameEn": "Subcontractor Opening Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m05",
                "screenId": "SA-OPN-18",
                "sortOrder": 690,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G02-M06",
                "name": "현장별/거래처별초기이월",
                "nameEn": "Site Customer Opening Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g02/m06",
                "screenId": "SA-OPN-19",
                "sortOrder": 700,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-03-G03",
            "name": "기간·프로젝트 손익",
            "nameEn": "Period Project Profit",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 710,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-03-G03-M01",
                "name": "전기 기간별손익계산서",
                "nameEn": "Prior Period Income Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g03/m01",
                "screenId": "SA-OPN-09",
                "sortOrder": 720,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G03-M02",
                "name": "전기 기간별원가계산서",
                "nameEn": "Prior Period Cost Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g03/m02",
                "screenId": "SA-OPN-10",
                "sortOrder": 730,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G03-M03",
                "name": "전기 프로젝트손익현황",
                "nameEn": "Prior Project Profit Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g03/m03",
                "screenId": "SA-OPN-11",
                "sortOrder": 740,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G03-M04",
                "name": "전기 프로젝트원가현황",
                "nameEn": "Prior Project Cost Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g03/m04",
                "screenId": "SA-OPN-12",
                "sortOrder": 750,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-03-G04",
            "name": "중단사업·시산표",
            "nameEn": "Discontinued Trial Balance",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 760,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-03-G04-M01",
                "name": "전기 중단사업손익계산서",
                "nameEn": "Prior Discontinued Ops Income",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g04/m01",
                "screenId": "SA-OPN-14",
                "sortOrder": 770,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G04-M02",
                "name": "전기 중단사업원가명세서",
                "nameEn": "Prior Discontinued Ops Cost",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g04/m02",
                "screenId": "SA-OPN-15",
                "sortOrder": 780,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-03-G04-M03",
                "name": "중도시산표",
                "nameEn": "Interim Trial Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/03/g04/m03",
                "screenId": "SA-OPN-16",
                "sortOrder": 790,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-04",
        "name": "전표 입력·결재",
        "nameEn": "Journal Entry and Approval",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-04",
        "sortOrder": 800,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-04-M01",
            "name": "일반전표입력",
            "nameEn": "General Journal Entry",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/04/m01",
            "screenId": "SA-JNL-01",
            "sortOrder": 810,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-04-M02",
            "name": "매입매출전표입력",
            "nameEn": "Purchase Sales Journal Entry",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/04/m02",
            "screenId": "SA-JNL-02",
            "sortOrder": 820,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-04-M03",
            "name": "정기청구입력 — 2차",
            "nameEn": "Journal Entry Menu 3",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/04/m03",
            "screenId": "SA-JNL-03",
            "sortOrder": 830,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-04-M04",
            "name": "물류전표처리 — 2차",
            "nameEn": "Journal Entry Menu 4",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/04/m04",
            "screenId": "SA-JNL-04",
            "sortOrder": 840,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "TN-05",
        "name": "보조부·관리항목",
        "nameEn": "Auxiliary Ledger Management",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-05",
        "sortOrder": 850,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-05-G01",
            "name": "보조원장",
            "nameEn": "Auxiliary Ledgers",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 860,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-05-G01-M01",
                "name": "거래처별 보조원장",
                "nameEn": "Customer Auxiliary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m01",
                "screenId": "AUX-01",
                "sortOrder": 870,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M02",
                "name": "어음 보조원장",
                "nameEn": "Bills Auxiliary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m02",
                "screenId": "AUX-02",
                "sortOrder": 880,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M03",
                "name": "예금 보조원장",
                "nameEn": "Deposit Auxiliary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m03",
                "screenId": "AUX-03",
                "sortOrder": 890,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M04",
                "name": "가지급금·가수금 보조원장",
                "nameEn": "Advance Receipt Payment Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m04",
                "screenId": "AUX-05",
                "sortOrder": 900,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M05",
                "name": "부가세 보조원장",
                "nameEn": "VAT Auxiliary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m05",
                "screenId": "AUX-06",
                "sortOrder": 910,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M06",
                "name": "현금출납장",
                "nameEn": "Cash Book",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m06",
                "screenId": "AUX-07",
                "sortOrder": 920,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M07",
                "name": "고정자산대장",
                "nameEn": "Fixed Asset Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m07",
                "screenId": "AUX-09",
                "sortOrder": 930,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M08",
                "name": "카드 보조원장",
                "nameEn": "Card Auxiliary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m08",
                "screenId": "AUX-04",
                "sortOrder": 940,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G01-M09",
                "name": "재고 수불부",
                "nameEn": "Inventory Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g01/m09",
                "screenId": "AUX-08",
                "sortOrder": 950,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-05-G02",
            "name": "웹전표 입력보조",
            "nameEn": "Web Journal Entry Aids",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 960,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-05-G02-M01",
                "name": "관리항목 도킹패널",
                "nameEn": "Management Item Docking Panel",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m01",
                "screenId": "WJV-02",
                "sortOrder": 970,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G02-M02",
                "name": "부가세 부속서류",
                "nameEn": "VAT Attachments",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m02",
                "screenId": "WJV-03",
                "sortOrder": 980,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G02-M03",
                "name": "받을어음 입력",
                "nameEn": "Notes Receivable Entry",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m03",
                "screenId": "WJV-04",
                "sortOrder": 990,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G02-M04",
                "name": "지급어음 입력",
                "nameEn": "Notes Payable Entry",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m04",
                "screenId": "WJV-05",
                "sortOrder": 1000,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G02-M05",
                "name": "차입금 입력",
                "nameEn": "Borrowing Entry",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m05",
                "screenId": "WJV-06",
                "sortOrder": 1010,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-05-G02-M06",
                "name": "관리항목 통합관리",
                "nameEn": "Management Item Integration",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/05/g02/m06",
                "screenId": "WJV-07",
                "sortOrder": 1020,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-06",
        "name": "자동전표·증빙",
        "nameEn": "Auto Journal and Evidence",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-06",
        "sortOrder": 1030,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-06-G01",
            "name": "수집 설정",
            "nameEn": "Collection Settings",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1040,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-06-G01-M01",
                "name": "수집정보등록 — 1차",
                "nameEn": "Auto Journal Evidence Menu 1",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g01/m01",
                "screenId": "SA-ATX-01",
                "sortOrder": 1050,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G01-M02",
                "name": "홈택스 수집/엑셀업로드",
                "nameEn": "SA-ATX-HOME",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g01/m02",
                "screenId": "SA-ATX-HOME",
                "sortOrder": 1060,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-06-G02",
            "name": "증빙 수집",
            "nameEn": "Evidence Collection",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1070,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-06-G02-M01",
                "name": "전자세금계산서 — 1차",
                "nameEn": "Auto Journal Evidence Menu 2",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g02/m01",
                "screenId": "SA-ATX-02",
                "sortOrder": 1080,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G02-M02",
                "name": "전자계산서 — 1차",
                "nameEn": "Auto Journal Evidence Menu 3",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g02/m02",
                "screenId": "SA-ATX-03",
                "sortOrder": 1090,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G02-M03",
                "name": "신용카드 — 1차",
                "nameEn": "Auto Journal Evidence Menu 4",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g02/m03",
                "screenId": "SA-ATX-04",
                "sortOrder": 1100,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G02-M04",
                "name": "현금영수증 — 1차",
                "nameEn": "Auto Journal Evidence Menu 5",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g02/m04",
                "screenId": "SA-ATX-05",
                "sortOrder": 1110,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G02-M05",
                "name": "통장 — 1차",
                "nameEn": "Auto Journal Evidence Menu 6",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g02/m05",
                "screenId": "SA-ATX-06",
                "sortOrder": 1120,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-06-G03",
            "name": "검증·전표전송",
            "nameEn": "Validation Transmission",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1130,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-06-G03-M01",
                "name": "자료수집현황 — 1차",
                "nameEn": "Auto Journal Evidence Menu 7",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g03/m01",
                "screenId": "SA-ATX-07",
                "sortOrder": 1140,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G03-M02",
                "name": "전표전송현황 — 1차",
                "nameEn": "Auto Journal Evidence Menu 8",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g03/m02",
                "screenId": "SA-ATX-08",
                "sortOrder": 1150,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G03-M03",
                "name": "국세청자료검증 및 사이트비교 — 1차",
                "nameEn": "Auto Journal Evidence Menu 9",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g03/m03",
                "screenId": "SA-ATX-09",
                "sortOrder": 1160,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-06-G03-M04",
                "name": "ScrappingBoard — 3차",
                "nameEn": "Auto Journal Evidence Menu 10",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/06/g03/m04",
                "screenId": "SA-ATX-10",
                "sortOrder": 1170,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-07",
        "name": "장부·원장·보조장부",
        "nameEn": "Ledgers",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-07",
        "sortOrder": 1180,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-07-G01",
            "name": "기본 장부",
            "nameEn": "Core Ledgers",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1190,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-07-G01-M01",
                "name": "전표출력",
                "nameEn": "Journal Print",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m01",
                "screenId": "SA-LDG-01",
                "sortOrder": 1200,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M02",
                "name": "분개장",
                "nameEn": "Journal Book",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m02",
                "screenId": "SA-LDG-02",
                "sortOrder": 1210,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M03",
                "name": "일/월계표",
                "nameEn": "Daily Monthly Trial Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m03",
                "screenId": "SA-LDG-03",
                "sortOrder": 1220,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M04",
                "name": "총계정원장",
                "nameEn": "General Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m04",
                "screenId": "SA-LDG-04",
                "sortOrder": 1230,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M05",
                "name": "현금출납장",
                "nameEn": "Cash Book",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m05",
                "screenId": "SA-LDG-05",
                "sortOrder": 1240,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M06",
                "name": "계정별원장",
                "nameEn": "Account Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m06",
                "screenId": "SA-LDG-06",
                "sortOrder": 1250,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M07",
                "name": "거래처원장",
                "nameEn": "Customer Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m07",
                "screenId": "SA-LDG-07",
                "sortOrder": 1260,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M08",
                "name": "총괄원장",
                "nameEn": "Consolidated Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m08",
                "screenId": "SA-LDG-08",
                "sortOrder": 1270,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G01-M09",
                "name": "매입매출장",
                "nameEn": "Purchase Sales Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g01/m09",
                "screenId": "SA-LDG-09",
                "sortOrder": 1280,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-07-G02",
            "name": "차량·관리원장",
            "nameEn": "Vehicle Management Ledgers",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1290,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-07-G02-M01",
                "name": "운행기록부",
                "nameEn": "Driving Log",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m01",
                "screenId": "SA-LDG-17",
                "sortOrder": 1300,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M02",
                "name": "차량비용현황",
                "nameEn": "Vehicle Expense Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m02",
                "screenId": "SA-LDG-18",
                "sortOrder": 1310,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M03",
                "name": "총계정관리원장",
                "nameEn": "Managed General Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m03",
                "screenId": "SA-LDG-10",
                "sortOrder": 1320,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M04",
                "name": "세금/계산서 발급 및 수취현황",
                "nameEn": "Tax Invoice Issue Receipt Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m04",
                "screenId": "SA-LDG-11",
                "sortOrder": 1330,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M05",
                "name": "신용카드매출전표 발행현황",
                "nameEn": "Credit Card Sales Slip Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m05",
                "screenId": "SA-LDG-12",
                "sortOrder": 1340,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M06",
                "name": "적요별원장",
                "nameEn": "Summary Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m06",
                "screenId": "SA-LDG-13",
                "sortOrder": 1350,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G02-M07",
                "name": "전도금원장",
                "nameEn": "Imprest Fund Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g02/m07",
                "screenId": "SA-LDG-14",
                "sortOrder": 1360,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-07-G03",
            "name": "현장·공사 원장",
            "nameEn": "Site Construction Ledgers",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1370,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-07-G03-M01",
                "name": "공사대장",
                "nameEn": "Construction Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m01",
                "screenId": "SA-LDG-15",
                "sortOrder": 1380,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M02",
                "name": "외주대장",
                "nameEn": "Subcontract Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m02",
                "screenId": "SA-LDG-16",
                "sortOrder": 1390,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M03",
                "name": "현장/프로젝트/부서 원가안분",
                "nameEn": "Site Project Cost Allocation",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m03",
                "screenId": "SA-LDG-19",
                "sortOrder": 1400,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M04",
                "name": "현장/프로젝트/부서 원가현황",
                "nameEn": "Ledger Menu 20",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m04",
                "screenId": "SA-LDG-20",
                "sortOrder": 1410,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M05",
                "name": "현장/프로젝트/부서 원가손익",
                "nameEn": "Ledger Menu 23",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m05",
                "screenId": "SA-LDG-23",
                "sortOrder": 1420,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M06",
                "name": "현장별 공사원가집계표",
                "nameEn": "Site Construction Cost Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m06",
                "screenId": "SA-LDG-24",
                "sortOrder": 1430,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M07",
                "name": "공사비용현황",
                "nameEn": "Ledger Menu 25",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m07",
                "screenId": "SA-LDG-25",
                "sortOrder": 1440,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G03-M08",
                "name": "현장별 잔액명세서",
                "nameEn": "Site Balance Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g03/m08",
                "screenId": "SA-LDG-26",
                "sortOrder": 1450,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-07-G04",
            "name": "손익·차원 분석",
            "nameEn": "Profit Dimension Analysis",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1460,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-07-G04-M01",
                "name": "손익안분",
                "nameEn": "P&L Allocation",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g04/m01",
                "screenId": "SA-LDG-21",
                "sortOrder": 1470,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G04-M02",
                "name": "손익현황",
                "nameEn": "P&L Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g04/m02",
                "screenId": "SA-LDG-22",
                "sortOrder": 1480,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G04-M03",
                "name": "차원 거래처원장",
                "nameEn": "Dimension Customer Ledger",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g04/m03",
                "screenId": "SA-LDG-27",
                "sortOrder": 1490,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G04-M04",
                "name": "프로젝트 누적손익현황",
                "nameEn": "Ledger Menu 28",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g04/m04",
                "screenId": "SA-LDG-28",
                "sortOrder": 1500,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-07-G04-M05",
                "name": "프로젝트 누적원가현황",
                "nameEn": "Project Cumulative Cost Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/07/g04/m05",
                "screenId": "SA-LDG-29",
                "sortOrder": 1510,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-08",
        "name": "마감·결산·재무제표",
        "nameEn": "Closing and Financial Statements",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-08",
        "sortOrder": 1520,
        "requiresStepUp": true,
        "children": [
          {
            "menuCode": "TN-08-G01",
            "name": "결산 입력·시산표",
            "nameEn": "Closing Input Trial Balance",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1530,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-08-G01-M01",
                "name": "결산자료입력",
                "nameEn": "Closing Data Input",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g01/m01",
                "screenId": "SA-CLS-01",
                "sortOrder": 1540,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G01-M02",
                "name": "합계잔액시산표",
                "nameEn": "Trial Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g01/m02",
                "screenId": "SA-CLS-02",
                "sortOrder": 1550,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G01-M03",
                "name": "AI 합계잔액시산표",
                "nameEn": "AI Trial Balance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g01/m03",
                "screenId": "SA-CLS-12",
                "sortOrder": 1560,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-08-G02",
            "name": "재무제표",
            "nameEn": "Financial Statements",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1570,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-08-G02-M01",
                "name": "재무상태표",
                "nameEn": "Statement of Financial Position",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m01",
                "screenId": "SA-CLS-03",
                "sortOrder": 1580,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M02",
                "name": "손익계산서",
                "nameEn": "Income Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m02",
                "screenId": "SA-CLS-04",
                "sortOrder": 1590,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M03",
                "name": "제조원가명세서",
                "nameEn": "Manufacturing Cost Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m03",
                "screenId": "SA-CLS-05",
                "sortOrder": 1600,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M04",
                "name": "이익잉여금처분계산서",
                "nameEn": "Retained Earnings Appropriation",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m04",
                "screenId": "SA-CLS-06",
                "sortOrder": 1610,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M05",
                "name": "자본변동표",
                "nameEn": "Statement of Changes in Equity",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m05",
                "screenId": "SA-CLS-07",
                "sortOrder": 1620,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M06",
                "name": "현금흐름표",
                "nameEn": "Cash Flow Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m06",
                "screenId": "SA-CLS-08",
                "sortOrder": 1630,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G02-M07",
                "name": "재무제표 일괄출력",
                "nameEn": "Financial Statement Batch Print",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g02/m07",
                "screenId": "SA-CLS-13",
                "sortOrder": 1640,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-08-G03",
            "name": "부속·증빙 명세",
            "nameEn": "Supplement Evidence Statements",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1650,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-08-G03-M01",
                "name": "결산부속명세서",
                "nameEn": "Closing Supplementary Schedules",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g03/m01",
                "screenId": "SA-CLS-09",
                "sortOrder": 1660,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G03-M02",
                "name": "영수증수취명세서",
                "nameEn": "Receipt Collection Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g03/m02",
                "screenId": "SA-CLS-15",
                "sortOrder": 1670,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G03-M03",
                "name": "경비등의송금명세서",
                "nameEn": "Expense Remittance Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g03/m03",
                "screenId": "SA-CLS-16",
                "sortOrder": 1680,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G03-M04",
                "name": "지출증명서류합계표",
                "nameEn": "Expenditure Evidence Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g03/m04",
                "screenId": "SA-CLS-17",
                "sortOrder": 1690,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-08-G04",
            "name": "경영·기간 분석",
            "nameEn": "Management Period Analysis",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1700,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-08-G04-M01",
                "name": "경영정보",
                "nameEn": "Management Information",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g04/m01",
                "screenId": "SA-CLS-14",
                "sortOrder": 1710,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G04-M02",
                "name": "기간별손익계산서",
                "nameEn": "Period Income Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g04/m02",
                "screenId": "SA-CLS-18",
                "sortOrder": 1720,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G04-M03",
                "name": "기간별원가명세서",
                "nameEn": "Period Cost Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g04/m03",
                "screenId": "SA-CLS-19",
                "sortOrder": 1730,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G04-M04",
                "name": "현금및예금잔액검토",
                "nameEn": "Cash Deposit Balance Review",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g04/m04",
                "screenId": "SA-CLS-10",
                "sortOrder": 1740,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G04-M05",
                "name": "카드·상품권 사용검토",
                "nameEn": "Card Gift Certificate Usage Review",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g04/m05",
                "screenId": "SA-CLS-11",
                "sortOrder": 1750,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-08-G05",
            "name": "중단사업",
            "nameEn": "Discontinued Operations",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1760,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-08-G05-M01",
                "name": "중단사업손익계산서",
                "nameEn": "Discontinued Ops Income Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g05/m01",
                "screenId": "SA-CLS-20",
                "sortOrder": 1770,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-08-G05-M02",
                "name": "중단사업원가명세서",
                "nameEn": "Discontinued Ops Cost Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/08/g05/m02",
                "screenId": "SA-CLS-21",
                "sortOrder": 1780,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-09",
        "name": "부가세·신고서류",
        "nameEn": "VAT Filing",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-09",
        "sortOrder": 1790,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-09-G01",
            "name": "신고·전자신고",
            "nameEn": "VAT Filing E-filing",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1800,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G01-M01",
                "name": "신고서 항목 매핑",
                "nameEn": "Return Field Mapping",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m01",
                "screenId": "SA-VAT-01",
                "sortOrder": 1810,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M02",
                "name": "세무리스크 자동검증",
                "nameEn": "VAT Filing Menu 2",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m02",
                "screenId": "SA-VAT-02",
                "sortOrder": 1820,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M03",
                "name": "부가가치세 전자신고",
                "nameEn": "VAT E-Filing",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m03",
                "screenId": "SA-VAT-07",
                "sortOrder": 1830,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M04",
                "name": "부가가치세 납부서",
                "nameEn": "VAT Payment Form",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m04",
                "screenId": "SA-VAT-08",
                "sortOrder": 1840,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M05",
                "name": "사업장별 부가세 납부/환급 신고명세",
                "nameEn": "Workplace VAT Payment Refund Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m05",
                "screenId": "SA-VAT-25",
                "sortOrder": 1850,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M06",
                "name": "사업자단위과세 사업장별 부가세",
                "nameEn": "Business Unit VAT by Workplace",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m06",
                "screenId": "SA-VAT-26",
                "sortOrder": 1860,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M07",
                "name": "과표수정 및 추가납부계산서",
                "nameEn": "VAT Filing Menu 27",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m07",
                "screenId": "SA-VAT-27",
                "sortOrder": 1870,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M08",
                "name": "과표 및 세액 경정청구서",
                "nameEn": "VAT Filing Menu 28",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m08",
                "screenId": "SA-VAT-28",
                "sortOrder": 1880,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G01-M09",
                "name": "납부서 작성",
                "nameEn": "Payment Form Entry",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g01/m09",
                "screenId": "SA-VAT-49",
                "sortOrder": 1890,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-09-G02",
            "name": "매출·매입 합계",
            "nameEn": "Sales Purchase Summaries",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 1900,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G02-M01",
                "name": "세금계산서합계표",
                "nameEn": "Tax Invoice Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m01",
                "screenId": "SA-VAT-03",
                "sortOrder": 1910,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M02",
                "name": "신용카드매출전표등 수령명세서",
                "nameEn": "Credit Card Sales Receipt Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m02",
                "screenId": "SA-VAT-04",
                "sortOrder": 1920,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M03",
                "name": "신용카드매출전표 발행집계표",
                "nameEn": "Credit Card Sales Issue Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m03",
                "screenId": "SA-VAT-05",
                "sortOrder": 1930,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M04",
                "name": "계산서합계표",
                "nameEn": "Invoice Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m04",
                "screenId": "SA-VAT-06",
                "sortOrder": 1940,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M05",
                "name": "현금매출명세서",
                "nameEn": "Cash Sales Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m05",
                "screenId": "SA-VAT-14",
                "sortOrder": 1950,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M06",
                "name": "월별판매액합계표",
                "nameEn": "Monthly Sales Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m06",
                "screenId": "SA-VAT-17",
                "sortOrder": 1960,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M07",
                "name": "매입자발행세금계산서합계표",
                "nameEn": "Purchaser-issued Tax Invoice Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m07",
                "screenId": "SA-VAT-46",
                "sortOrder": 1970,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M08",
                "name": "과세유흥장소 과표신고서",
                "nameEn": "Entertainment Place Tax Base Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m08",
                "screenId": "SA-VAT-47",
                "sortOrder": 1980,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G02-M09",
                "name": "사업양도신고서",
                "nameEn": "Business Transfer Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g02/m09",
                "screenId": "SA-VAT-50",
                "sortOrder": 1990,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-09-G03",
            "name": "공제·환급 신고",
            "nameEn": "Deduction Refund Filing",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2000,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G03-M01",
                "name": "의제매입세액공제신고서",
                "nameEn": "Deemed Input Tax Credit Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m01",
                "screenId": "SA-VAT-11",
                "sortOrder": 2010,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M02",
                "name": "재활용폐자원세액공제신고서",
                "nameEn": "Recycled Resource Tax Credit Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m02",
                "screenId": "SA-VAT-12",
                "sortOrder": 2020,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M03",
                "name": "구리스크랩등 매입세액공제신고서",
                "nameEn": "Copper Scrap Input Tax Credit Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m03",
                "screenId": "SA-VAT-13",
                "sortOrder": 2030,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M04",
                "name": "공제받지못할매입세액명세서",
                "nameEn": "Non-deductible Input VAT Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m04",
                "screenId": "SA-VAT-22",
                "sortOrder": 2040,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M05",
                "name": "건물등감가상각자산취득명세서",
                "nameEn": "Depreciable Asset Acquisition",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m05",
                "screenId": "SA-VAT-23",
                "sortOrder": 2050,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M06",
                "name": "대손세액공제신고서",
                "nameEn": "Bad Debt Tax Credit Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m06",
                "screenId": "SA-VAT-24",
                "sortOrder": 2060,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M07",
                "name": "농어업기자재 부가세환급신청",
                "nameEn": "Agricultural Materials VAT Refund",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m07",
                "screenId": "SA-VAT-18",
                "sortOrder": 2070,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M08",
                "name": "전자신고세액공제신청서",
                "nameEn": "E-Filing Tax Credit Application",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m08",
                "screenId": "SA-VAT-20",
                "sortOrder": 2080,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G03-M09",
                "name": "과세사업전환 감가상각자산 신고서",
                "nameEn": "Taxable Conversion Asset Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g03/m09",
                "screenId": "SA-VAT-45",
                "sortOrder": 2090,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-09-G04",
            "name": "업종별 부속명세",
            "nameEn": "Industry Attachments",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2100,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G04-M01",
                "name": "부동산임대공급가액명세서",
                "nameEn": "Real Estate Rental Supply Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m01",
                "screenId": "SA-VAT-09",
                "sortOrder": 2110,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M02",
                "name": "건물관리명세서",
                "nameEn": "Building Management Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m02",
                "screenId": "SA-VAT-10",
                "sortOrder": 2120,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M03",
                "name": "동물진료용역매출명세서",
                "nameEn": "Veterinary Service Sales Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m03",
                "screenId": "SA-VAT-15",
                "sortOrder": 2130,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M04",
                "name": "면세유류공급명세서",
                "nameEn": "VAT Filing Menu 16",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m04",
                "screenId": "SA-VAT-16",
                "sortOrder": 2140,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M05",
                "name": "관세환급금등명세서",
                "nameEn": "Customs Refund Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m05",
                "screenId": "SA-VAT-33",
                "sortOrder": 2150,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M06",
                "name": "전자화폐결제명세서",
                "nameEn": "Electronic Money Payment Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m06",
                "screenId": "SA-VAT-19",
                "sortOrder": 2160,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G04-M07",
                "name": "보세판매장 공급실적",
                "nameEn": "Bonded Store Supply Performance",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g04/m07",
                "screenId": "SA-VAT-21",
                "sortOrder": 2170,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-09-G05",
            "name": "영세율·수출",
            "nameEn": "Zero Rate Export",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2180,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G05-M01",
                "name": "수출실적명세서",
                "nameEn": "Export Performance Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m01",
                "screenId": "SA-VAT-29",
                "sortOrder": 2190,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M02",
                "name": "영세율첨부서류제출명세서",
                "nameEn": "Zero-rated Attachment Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m02",
                "screenId": "SA-VAT-30",
                "sortOrder": 2200,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M03",
                "name": "내국신용장/구매확인서 전자발급",
                "nameEn": "Local LC Purchase Confirmation Issue",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m03",
                "screenId": "SA-VAT-31",
                "sortOrder": 2210,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M04",
                "name": "외화획득명세서",
                "nameEn": "Foreign Currency Earning Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m04",
                "screenId": "SA-VAT-32",
                "sortOrder": 2220,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M05",
                "name": "재화·용역 공급기록표",
                "nameEn": "Goods Services Supply Record",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m05",
                "screenId": "SA-VAT-39",
                "sortOrder": 2230,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M06",
                "name": "공급가액확정명세서",
                "nameEn": "Supply Value Confirmation Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m06",
                "screenId": "SA-VAT-40",
                "sortOrder": 2240,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M07",
                "name": "선박에 의한 운송용역 공급가액일람표",
                "nameEn": "Ship Transport Supply Schedule",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m07",
                "screenId": "SA-VAT-41",
                "sortOrder": 2250,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M08",
                "name": "외항선박등에 제공한 재화·용역 일람표",
                "nameEn": "Ocean Vessel Supply Schedule",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m08",
                "screenId": "SA-VAT-42",
                "sortOrder": 2260,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G05-M09",
                "name": "영세율매출명세서",
                "nameEn": "Zero-rated Sales Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g05/m09",
                "screenId": "SA-VAT-43",
                "sortOrder": 2270,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-09-G06",
            "name": "외국인·기타 신고",
            "nameEn": "Foreign Visitor Misc Filing",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2280,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-09-G06-M01",
                "name": "외국인관광객 면세판매 및 환급명세서",
                "nameEn": "Foreigner Tax-free Sales Refund",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m01",
                "screenId": "SA-VAT-34",
                "sortOrder": 2290,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M02",
                "name": "외국인 의료용역 환급",
                "nameEn": "Foreigner Medical Service Refund",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m02",
                "screenId": "SA-VAT-35",
                "sortOrder": 2300,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M03",
                "name": "사업용계좌 개설신고서",
                "nameEn": "Business Account Opening Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m03",
                "screenId": "SA-VAT-48",
                "sortOrder": 2310,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M04",
                "name": "외국인관광객 숙박용역 환급실적명세서",
                "nameEn": "Foreigner Lodging Service Refund",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m04",
                "screenId": "SA-VAT-36",
                "sortOrder": 2320,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M05",
                "name": "외국인 즉시환급 판매",
                "nameEn": "Foreigner Instant Refund Sales",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m05",
                "screenId": "SA-VAT-37",
                "sortOrder": 2330,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M06",
                "name": "외국인물품",
                "nameEn": "Foreigner Goods Sales",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m06",
                "screenId": "SA-VAT-38",
                "sortOrder": 2340,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-09-G06-M07",
                "name": "일반/간이과세 전환 시 재고품등 신고",
                "nameEn": "Tax Conversion Inventory Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/09/g06/m07",
                "screenId": "SA-VAT-44",
                "sortOrder": 2350,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-10",
        "name": "세무·고정자산·차량",
        "nameEn": "Tax and Fixed Assets",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-10",
        "sortOrder": 2360,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-10-M01",
            "name": "고정자산등록",
            "nameEn": "Fixed Asset Registration",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m01",
            "screenId": "SA-FA-01",
            "sortOrder": 2370,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M02",
            "name": "미상각분 감가상각계산",
            "nameEn": "Undepreciated Asset Depreciation",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m02",
            "screenId": "SA-FA-02",
            "sortOrder": 2380,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M03",
            "name": "양도자산 감가상각계산",
            "nameEn": "Transferred Asset Depreciation",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m03",
            "screenId": "SA-FA-03",
            "sortOrder": 2390,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M04",
            "name": "원가경비별 감가상각명세서",
            "nameEn": "Depreciation Expense Statement",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m04",
            "screenId": "SA-FA-04",
            "sortOrder": 2400,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M05",
            "name": "고정자산관리대장",
            "nameEn": "Fixed Asset Ledger",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m05",
            "screenId": "SA-FA-05",
            "sortOrder": 2410,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M06",
            "name": "현장/프로젝트/부서 자산명세서",
            "nameEn": "Asset Statement by Site Project",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m06",
            "screenId": "SA-FA-06",
            "sortOrder": 2420,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-10-M07",
            "name": "월별 감가상각비 계상",
            "nameEn": "Monthly Depreciation Posting",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/10/m07",
            "screenId": "SA-FA-07",
            "sortOrder": 2430,
            "requiresStepUp": false,
            "children": []
          }
        ]
      },
      {
        "menuCode": "TN-11",
        "name": "자금·예산·어음",
        "nameEn": "Treasury, Budget and Bills",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-11",
        "sortOrder": 2440,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-11-G01",
            "name": "일일 자금관리",
            "nameEn": "Daily Cash Management",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2450,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-11-G01-M01",
                "name": "일일자금명세/경리일보",
                "nameEn": "Daily Cash Statement",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g01/m01",
                "screenId": "SA-FND-01",
                "sortOrder": 2460,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G01-M02",
                "name": "일일자금현황",
                "nameEn": "Daily Cash Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g01/m02",
                "screenId": "SA-FND-03",
                "sortOrder": 2470,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G01-M03",
                "name": "자금일월보",
                "nameEn": "Cash Daily Monthly Report",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g01/m03",
                "screenId": "SA-FND-04",
                "sortOrder": 2480,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G01-M04",
                "name": "자금입출금내역",
                "nameEn": "Cash Receipt Payment Details",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g01/m04",
                "screenId": "SA-FND-05",
                "sortOrder": 2490,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-11-G02",
            "name": "자금계획·예산",
            "nameEn": "Cash Planning Budget",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2500,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-11-G02-M01",
                "name": "자금계획입력",
                "nameEn": "Cash Plan Input",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m01",
                "screenId": "SA-FND-02",
                "sortOrder": 2510,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M02",
                "name": "자금계획서",
                "nameEn": "Cash Plan",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m02",
                "screenId": "SA-FND-06",
                "sortOrder": 2520,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M03",
                "name": "예산입력",
                "nameEn": "Budget Input",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m03",
                "screenId": "SA-FND-07",
                "sortOrder": 2530,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M04",
                "name": "당기예산 월별 실적현황",
                "nameEn": "Current Budget Monthly Actuals",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m04",
                "screenId": "SA-FND-08",
                "sortOrder": 2540,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M05",
                "name": "당기예산 분기/반기 실적현황",
                "nameEn": "Current Budget Period Actuals",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m05",
                "screenId": "SA-FND-09",
                "sortOrder": 2550,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M06",
                "name": "전기실행액입력",
                "nameEn": "Prior Execution Amount Input",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m06",
                "screenId": "SA-FND-10",
                "sortOrder": 2560,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M07",
                "name": "전기예산 월별 실적현황",
                "nameEn": "Prior Budget Monthly Actuals",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m07",
                "screenId": "SA-FND-11",
                "sortOrder": 2570,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M08",
                "name": "전기예산 분기/반기 실적현황",
                "nameEn": "Prior Budget Period Actuals",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m08",
                "screenId": "SA-FND-12",
                "sortOrder": 2580,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M09",
                "name": "차기예산입력",
                "nameEn": "Next Budget Input",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m09",
                "screenId": "SA-FND-13",
                "sortOrder": 2590,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G02-M10",
                "name": "추정예산",
                "nameEn": "Estimated Budget",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g02/m10",
                "screenId": "SA-FND-14",
                "sortOrder": 2600,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-11-G03",
            "name": "예적금·차입금",
            "nameEn": "Deposits Borrowings",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2610,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-11-G03-M01",
                "name": "예적금현황",
                "nameEn": "Deposit Balance Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g03/m01",
                "screenId": "SA-DEP-01",
                "sortOrder": 2620,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G03-M02",
                "name": "차입금스케줄관리",
                "nameEn": "Borrowing Schedule Management",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g03/m02",
                "screenId": "SA-DEP-02",
                "sortOrder": 2630,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G03-M03",
                "name": "차입금현황",
                "nameEn": "Borrowing Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g03/m03",
                "screenId": "SA-DEP-03",
                "sortOrder": 2640,
                "requiresStepUp": false,
                "children": []
              }
            ]
          },
          {
            "menuCode": "TN-11-G04",
            "name": "어음·수표관리",
            "nameEn": "Bills Checks Management",
            "menuType": "GROUP",
            "channel": "TN",
            "path": null,
            "screenId": null,
            "sortOrder": 2650,
            "requiresStepUp": false,
            "children": [
              {
                "menuCode": "TN-11-G04-M01",
                "name": "받을어음현황",
                "nameEn": "Notes Receivable Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g04/m01",
                "screenId": "SA-BIL-01",
                "sortOrder": 2660,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G04-M02",
                "name": "지급어음현황",
                "nameEn": "Notes Payable Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g04/m02",
                "screenId": "SA-BIL-02",
                "sortOrder": 2670,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G04-M03",
                "name": "어음집계표",
                "nameEn": "Bills Summary",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g04/m03",
                "screenId": "SA-BIL-03",
                "sortOrder": 2680,
                "requiresStepUp": false,
                "children": []
              },
              {
                "menuCode": "TN-11-G04-M04",
                "name": "당좌수표현황",
                "nameEn": "Cashier Check Status",
                "menuType": "MENU",
                "channel": "TN",
                "path": "/tenant/tn/11/g04/m04",
                "screenId": "SA-BIL-04",
                "sortOrder": 2690,
                "requiresStepUp": false,
                "children": []
              }
            ]
          }
        ]
      },
      {
        "menuCode": "TN-12",
        "name": "외화·관계사·관리회계 [선택]",
        "nameEn": "FX and Intercompany Management",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-12",
        "sortOrder": 2700,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "TN-13",
        "name": "원가·재고·제조 [Phase/업종]",
        "nameEn": "Cost, Inventory and Manufacturing",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-13",
        "sortOrder": 2710,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "TN-14",
        "name": "협업·AI [AI]",
        "nameEn": "Collaboration and AI",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-14",
        "sortOrder": 2720,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "TN-15",
        "name": "데이터관리·이관",
        "nameEn": "Data Migration",
        "menuType": "GROUP",
        "channel": "TN",
        "path": null,
        "screenId": "TN-15",
        "sortOrder": 2730,
        "requiresStepUp": false,
        "children": [
          {
            "menuCode": "TN-15-M01",
            "name": "전표 삭제 → 복구",
            "nameEn": "Journal Deletion and Recovery",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m01",
            "screenId": "SA-DAT-01",
            "sortOrder": 2740,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M02",
            "name": "데이터백업 / 데이터복구",
            "nameEn": "Data Backup and Recovery",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m02",
            "screenId": "SA-DAT-02",
            "sortOrder": 2750,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M03",
            "name": "SmartA로 보낼 데이터 만들기",
            "nameEn": "Create Data for Smart A Export",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m03",
            "screenId": "SA-DAT-03",
            "sortOrder": 2760,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M04",
            "name": "SmartA로 보낼 데이터 만들기",
            "nameEn": "Create Data for Smart A Export",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m04",
            "screenId": "SA-DAT-04",
            "sortOrder": 2770,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M05",
            "name": "SmartA 데이터올리기",
            "nameEn": "Smart A Data Upload",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m05",
            "screenId": "SA-DAT-05",
            "sortOrder": 2780,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M06",
            "name": "SmartA 데이터올리기",
            "nameEn": "Smart A Data Upload",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m06",
            "screenId": "SA-DAT-06",
            "sortOrder": 2790,
            "requiresStepUp": false,
            "children": []
          },
          {
            "menuCode": "TN-15-M07",
            "name": "기수변경",
            "nameEn": "Fiscal Year Change",
            "menuType": "MENU",
            "channel": "TN",
            "path": "/tenant/tn/15/m07",
            "screenId": "SA-DAT-07",
            "sortOrder": 2800,
            "requiresStepUp": false,
            "children": []
          }
        ]
      }
    ]
  },
  {
    "menuCode": "CO",
    "name": "공통·기술·설계 추적",
    "nameEn": "Common Platform",
    "menuType": "GROUP",
    "channel": "CO",
    "path": null,
    "screenId": null,
    "sortOrder": 2810,
    "requiresStepUp": false,
    "children": [
      {
        "menuCode": "CO-01",
        "name": "로그인·내 계정",
        "nameEn": "Login and My Account",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-01",
        "sortOrder": 2820,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-02",
        "name": "알림·커뮤니케이션",
        "nameEn": "Notification and Communication",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-02",
        "sortOrder": 2830,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-03",
        "name": "API·서비스 계약",
        "nameEn": "API and Service Contract",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-03",
        "sortOrder": 2840,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-04",
        "name": "검증·오류 처리",
        "nameEn": "Validation and Error Handling",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-04",
        "sortOrder": 2850,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-05",
        "name": "데이터 모델·상태값",
        "nameEn": "Data Model and Status Values",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-05",
        "sortOrder": 2860,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-06",
        "name": "배치·스케줄",
        "nameEn": "Batch and Schedule",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-06",
        "sortOrder": 2870,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-07",
        "name": "보안·개인정보",
        "nameEn": "Security and Privacy",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-07",
        "sortOrder": 2880,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-08",
        "name": "시스템 운영·인프라",
        "nameEn": "System Operations and Infrastructure",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-08",
        "sortOrder": 2890,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-09",
        "name": "산출물·보고서",
        "nameEn": "Outputs and Reports",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-09",
        "sortOrder": 2900,
        "requiresStepUp": false,
        "children": []
      },
      {
        "menuCode": "CO-10",
        "name": "설계서 부록 추적",
        "nameEn": "Design Appendix Trace",
        "menuType": "GROUP",
        "channel": "CO",
        "path": null,
        "screenId": "CO-10",
        "sortOrder": 2910,
        "requiresStepUp": false,
        "children": []
      }
    ]
  }
];
