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
  
  // 캐시 형식을 00,000 로 변환
  export const formatCurrency = (number) => {
    return new Intl.NumberFormat('ko-KR', {
      maximumFractionDigits: 0, // 소수점 제거
    }).format(number);
  };