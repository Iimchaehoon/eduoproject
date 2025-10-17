export async function aiChat(q, context) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ text: `(${q}) 에 대한 답변입니다.` }), 300)
  );
}
export async function aiSummary(context) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ text: "요약 예시 텍스트" }), 200)
  );
}
export async function aiQuiz(context, n = 5) {
  const items = Array.from({ length: n }).map((_, i) => ({
    text: `문제 ${i + 1}`,
    choices: ["A", "B", "C", "D"],
    answerIndex: 0,
  }));
  return new Promise((resolve) => setTimeout(() => resolve({ items }), 200));
}
