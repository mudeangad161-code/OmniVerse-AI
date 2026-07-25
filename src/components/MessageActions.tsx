import { Copy, RefreshCw, ThumbsDown, ThumbsUp } from "lucide-react";

type Props = {
  message: string;
};

function MessageActions({ message }: Props) {
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      alert("✅ Copied to clipboard");
    } catch {
      alert("❌ Failed to copy");
    }
  };

  return (
    <div className="message-actions">

      <button title="Like">
        <ThumbsUp size={16} />
      </button>

      <button title="Dislike">
        <ThumbsDown size={16} />
      </button>

      <button
        title="Copy"
        onClick={copyMessage}
      >
        <Copy size={16} />
      </button>

      <button title="Regenerate">
        <RefreshCw size={16} />
      </button>

    </div>
  );
}

export default MessageActions;