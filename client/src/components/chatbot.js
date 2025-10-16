const pairs = [
  {q:/객체와 (?:클래스|오브젝트) 차이/, a:`클래스(Class)는 설계도, 객체(Object)는 설계도로 만든 실제 인스턴스입니다.
- 클래스: 속성/메서드 정의 (예: Student 클래스)
- 객체: 메모리에 생성된 실체 (예: student1, student2)`},
  {q:/예제|샘플|코드/, a:`클래스 예시)
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`},
  {q:/실습|연습/, a:`실습 팁)
- 클래스로 개념을 먼저 정의
- 인스턴스를 만들어 메서드 호출
- 에러가 나면 속성/메서드 이름부터 확인하기`},
  {q:/정리|요약/, a:`핵심 정리)
1) 클래스: 데이터+기능의 묶음
2) 객체: 클래스로 만든 실체
3) self: 인스턴스 자신을 참조
4) 메서드: 클래스로 정의, 객체로 호출`}
]
export function reply(msg){
  const found = pairs.find(p => p.q.test(msg))
  if(found) return found.a
  return "강의와 관련된 질문을 해 주세요. 예) '객체와 클래스 차이점', '예제 코드', '실습 팁'"
}
