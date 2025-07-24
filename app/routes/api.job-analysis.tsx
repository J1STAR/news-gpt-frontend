import { ActionFunction, json } from '@remix-run/node';
import { analyzeJob } from '~/services/job-analysis.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const query = formData.get('query') as string;
  let keyword = formData.get('keyword') as string;
  let reason = formData.get('reason') as string;

  if (!keyword) {
    keyword = '인공지능';
    reason = '사용자가 선택하지 않아 기본값으로 설정됨';
    console.warn(`⚠️ analysis_keyword가 제공되지 않아 '${keyword}'를 기본값으로 사용합니다.`);
  }

  if (!query) {
    return json({ error: '분석할 직무/산업을 입력해야 합니다.' }, { status: 400 });
  }

  try {
    const result = await analyzeJob(query, keyword, reason);
    return json(result);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ 직무/산업 분석 엔드포인트 오류: ${errorMessage}`);
    return json({ error: `직무/산업 분석 중 서버 오류 발생: ${errorMessage}` }, { status: 500 });
  }
};
