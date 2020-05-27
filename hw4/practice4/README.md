## User
| userIdx | name | id | password |
|---------|------|----|----------|
| 1 | gainkim | gain | qwerty |
| 2 | gngsnpark | gngsn | fl0wer |

## article
| artIdx | author | title | content | createdAt |
|--------|--------|-------|---------|-----------|
| 1 | LJY | Data Structure | c로 배우는 쉬운 자료구조 | 19/02/20 |
| 2 | KYH | Database | 데이터베이스 개론 | 18/08/06 |

## likes
| likeIdx | userIdx | artIdx |
|---------|---------|--------|
| 1 | 1 | 1 |
| 2 | 1 | 2 |
| 3 | 2 | 1 |

## comment
| comIdx | artIdx | author | comment | createdAt |
|--------|--------|--------|---------|-----------|
| 1 | 1 | Stella | Great! | 20/04/30 |
| 2 | 2 | Qingdao | Not bad | 20/05/11 |
| 3 | 1 | Cass | Gooood | 20/05/23 |

## tag
| tagIdx | artIdx | tag |
|--------|--------|-----|
| 1 | 2 | db |
| 2 | 2 | mysql |