const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export type ChatResponse = {
  answer: string;
};

export async function getChatResponse(question: string): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend API error:", errorText);
      throw new Error(
        `Failed to fetch chat response from backend. Status: ${response.status}`,
      );
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getChatResponse:", error);
    throw error;
  }
} 