const client = require("../config/ai");
const Chat = require("../models/Chat");
const knowledgeBase = require("../config/knowledgeBase");
// POST /api/v1/chat
const chat = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    let chatDoc = null;

    // Existing chat load
    if (chatId) {
      chatDoc = await Chat.findById(chatId);
    }

    // New chat create
    if (!chatDoc) {
      chatDoc = new Chat({
        title: message.substring(0, 40),
        messages: [],
      });
    }

    // Save user message
    chatDoc.messages.push({
      role: "user",
      content: message,
    });
    // ================================
// Founder / Owner Detection
// ================================

const text = message.toLowerCase().trim();

const founderQuestion =
  (
    text.includes("owner") ||
    text.includes("founder") ||
    text.includes("creator") ||
    text.includes("developer") ||
    text.includes("made") ||
    text.includes("created") ||
    text.includes("kisne") ||
    text.includes("banaya") ||
    text.includes("malik") ||
    text.includes("kiska")
  ) &&
  (
    text.includes("omni") ||
    text.includes("verse") ||
    text.includes("ai") ||
    text.includes("website") ||
    text.includes("app") ||
    text.includes("you") ||
    text.includes("tum")
  );

if (founderQuestion) {

  const reply = `The founder and owner of OmniVerse AI is Mude Angad.

==================================================
OFFICIAL OMNIVERSE AI FOUNDER INFORMATION
==================================================

Founder & Owner:
Mude Angad

Date of Birth:
29 August 2010

Father's Name:
Mude Pramod

Mother's Name:
Mude Ashwini

Education:
Diploma First Year

Branch:
Automation and Robotics (AR)

College:
Sanjeev Gandhi Government Polytechnic College,
Adilabad, Telangana, India.

About OmniVerse AI:
OmniVerse AI is a personal AI project created and developed by Mude Angad.

Rules:

1. If anyone asks about the founder, owner, creator, developer or asks about Mude Angad, answer using ONLY the information above.

2. Never invent another founder or company.

3. Never guess information that is not provided above.

4. If the question is in English, answer in English.

5. If the question is in Hindi, answer in Hindi.

6. If the question is in Hinglish, answer in Hinglish.

7. Keep the answer professional and natural.

About:
OmniVerse AI is a personal AI project created and developed by Mude Angad to provide an intelligent, modern and helpful AI assistant experience.`;
  chatDoc.messages.push({
    role: "assistant",
    content: reply,
  });

  await chatDoc.save();

  return res.json({
    chatId: chatDoc._id,
    reply,
  });

}
const currentDateTime = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});
    // Send complete conversation to AI
    const completion = await client.chat.completions.create({
      model: "meta/llama-3.1-8b-instruct",
      messages: [
  {
    role: "system",
    content: `You are OmniVerse AI, a smart, friendly and helpful AI assistant.

Today's date and time is ${currentDateTime}.

Always use this as the current date and time.
Never use an outdated date.`,
  },
  ...chatDoc.messages,
],
      temperature: 0.7,
      max_tokens: 512,
    });

    const reply = completion.choices[0].message.content;

    // Save AI reply
    chatDoc.messages.push({
      role: "assistant",
      content: reply,
    });

    await chatDoc.save();

    res.json({
      chatId: chatDoc._id,
      reply,
    });

  } catch (error) {
    console.error("AI ERROR:", error);

    res.status(500).json({
      reply: "AI Error",
      error: error.message,
    });
  }
};

// GET /api/v1/chat
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ updatedAt: -1 })
      .select("_id title updatedAt");

    res.json(chats);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// GET /api/v1/chat/:id
const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found",
      });
    }

    res.json(chat);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE /api/v1/chat/:id
const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findByIdAndDelete(req.params.id);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  chat,
  getChats,
  getChat,
  deleteChat,
};