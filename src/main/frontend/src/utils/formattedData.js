// 날짜 형식을 yyyy-MM-dd로 변환하는 함수
export const formattedDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 날짜 형식을 MM-DD로 변환하는 함수
export const formattedMMDD = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}-${day}`;
};

// 날짜 형식을 YYYY-MM-DD 오전/오후 00시 00분으로 변환하는 함수 
export function formatCustomDate(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작해서 +1
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0시를 12시로 변경
  minutes = minutes < 10 ? '0' + minutes : minutes; // 분이 한 자리가 될 경우 0 추가

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시 ${minutes}분`;
}


// 캐시 형식을 00,000 로 변환
export const formatCurrency = (number) => {
  return new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 0, // 소수점 제거
  }).format(number);
};

//소수점 반올림 
export function formatAchievementRate(rate) {
  return `${Math.round(rate)}`; // 소수점 반올림 후 % 추가
}