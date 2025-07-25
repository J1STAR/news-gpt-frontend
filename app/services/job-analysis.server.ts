const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export async function analyzeJob(query: string, keyword: string, reason: string) {
  if (!query) {
    throw new Error('분석할 직무/산업을 입력해야 합니다.');
  }

  console.log(`📊 직무/산업 분석 요청: 관점='${query}', 대상 키워드='${keyword}', 이유: '${reason}'`);

  try {
    const response = await fetch(`${API_BASE_URL}/job-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        selected_keyword: keyword,
        selected_keyword_reason: reason,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ 직무/산업 분석 API 오류:', errorData);
      throw new Error(errorData.detail || '직무/산업 분석 중 서버 오류가 발생했습니다.');
    }

    const data = await response.json();
    console.log(`✅ 직무/산업 분석 완료`);
    return data;
  } catch (error) {
    console.error(`❌ 직무/산업 분석 엔드포인트 호출 오류: ${error}`);
    throw error;
  }
}
