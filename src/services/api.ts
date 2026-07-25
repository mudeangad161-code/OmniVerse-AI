const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/chat`;

// Send message
export async function sendToAI(
  message: string,
  chatId: string | null
) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      chatId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reply || "AI Error");
  }

  return data;
}

// Get all chats
export async function getChats() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load chats");
  }

  return await response.json();
}

// Get one chat
export async function getChat(id: string) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load chat");
  }

  return await response.json();
}