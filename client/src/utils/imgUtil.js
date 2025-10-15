export const IMG_MAP = {
  main_logo: 'main_logo.png',
  head_section: 'head_section.png',
  hero: 'head_section.png',
  python: 'python.png',
  파이썬: 'python.png',
  pandas: 'pandas.png',
  데이터: 'pyton_data.png',
  시각화: 'pyton_data.png',
  딥러닝: 'deep.png',
  신경망: 'deep.png',
  배터리: 'battery.png',
  블록체인: 'block.png',
  강의: 'edu_pro1.png',
  교육: 'edu_pro2.png'
};

export function resolveImg(nameOrKey) {
  if (!nameOrKey) return '/img/edu_pro1.png';
  const key = String(nameOrKey).toLowerCase();
  for (const [k,v] of Object.entries(IMG_MAP)) {
    if (key.includes(k.toLowerCase())) return `/img/${v}`;
  }
  if (/\.(png|jpg|jpeg|gif|webp)$/i.test(nameOrKey)) return `/img/${nameOrKey}`;
  return `/img/${nameOrKey}.png`;
}

export function pickCourseThumb(course){
  if (course?.thumbnail) return resolveImg(course.thumbnail);
  const hay = `${course?.title||''} ${course?.tags?.join(' ')||''}`;
  return resolveImg(hay);
}
