import axios from 'axios';
import type { ChatRequest } from '../dto/ChatRequest.dto';
import type { ChatResponse } from '../dto/ChatResponse.dto';

const API_BASE_URL = '/api';

export async function fetchChatResponse(prompt: string,  timestamp: string): Promise<string> {
  const requestData: ChatRequest = { 
    prompt: prompt,
    timestamp: timestamp 
  };

  try {
    // axios.post<응답타입>(URL, 요청Body 데이터)
    const response = await axios.post<ChatResponse>(
      `${API_BASE_URL}/openai/chat`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = response.data;

    if (!data.success || !data.message) {
      throw new Error(data.error || '답변을 가져오지 못했습니다.');
    }

    return data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 서버에서 전달한 에러 메시지가 있다면 사용, 없으면 기본 메시지 사용
      const serverMessage = error.response?.data?.error || error.message;
      throw new Error(`통신 오류: ${serverMessage}`);
    }
    throw error;
  }
}