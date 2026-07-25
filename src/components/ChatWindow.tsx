import { useEffect, useRef } from "react";
import type { Message } from "../types/chat";

type Props = {
  messages: Message[];
  loading: boolean;
};

function ChatWindow({ messages, loading }: Props) {

  const bottomRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);



  const suggestions = [
    "💡 Give me creative ideas",
    "💻 Help me write code",
    "📚 Explain a topic",
    "🚀 Help me build a project",
  ];



  return (

    <div className="chat-window">


      {messages.length === 0 ? (

        <div className="welcome-screen">


          <div className="welcome-title">

            <div className="welcome-logo">
              🌌
            </div>


            <h1>
              Welcome to OmniVerse AI
            </h1>

          </div>



          <p>
            Your intelligent AI assistant
          </p>



          <div className="suggestion-cards">

            {suggestions.map((item,index)=>(

              <div
                key={index}
                className="suggestion-card"
              >

                {item}

              </div>

            ))}

          </div>


        </div>



      ) : (


        <div className="messages">


          {messages.map((msg,index)=>(


            <div
              key={index}
              className={`message-box ${msg.role}`}
            >


              <div className="avatar">

                {msg.role === "user"
                  ? "👤"
                  : "🌌"
                }

              </div>



              <div className="message">

                {msg.text}

              </div>


            </div>


          ))}



          {loading && (

            <div className="message-box ai">


              <div className="avatar">
                🌌
              </div>



              <div className="message typing">

                <span></span>
                <span></span>
                <span></span>

              </div>


            </div>

          )}



          <div ref={bottomRef}></div>


        </div>


      )}


    </div>

  );

}


export default ChatWindow;