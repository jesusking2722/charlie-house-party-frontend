import { useWindowSize } from "react-use";
import { IconButton, Input } from "../../components";
import { useState } from "react";
import { MessageBox } from "react-chat-elements";
import { fetchAiResponse } from "../../lib/scripts";

const OpenAiForm = () => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { height } = useWindowSize();

  const handleContent = async () => {
    try {
      if (content === "") return;
      setLoading(true);
      const response = await fetchAiResponse(content);
      if (response.ok) {
      }
    } catch (error) {
      console.log("handle content error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full flex flex-col gap-2 flex-1"
      style={{ height: (height / 3) * 2 }}
    >
      <div className="w-full flex-1 shadow-lg rounded-xl overflow-auto p-4">
        <MessageBox
          id="1" // Unique identifier for the message
          position="left" // Position of the message ("left" or "right")
          title="Charlie" // Sender's name
          titleColor="#000000" // Title color
          type="text" // Type of message ("text", "photo", etc.)
          text="Hi there!" // Message content
          date={new Date()} // Date object for timestamp
          replyButton={true} // Enables reply button
          removeButton={true} // Enables remove button
          status="read" // Message status ("sent", "delivered", "read")
          focus={false} // Whether the message is focused
          forwarded={false} // Whether the message is forwarded
          notch={true} // Whether to display a notch on the bubble
          retracted={false} // Whether the message is retracted
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <Input
          type="text"
          placeholder="Describe about your party here..."
          value={content}
          onChange={setContent}
        />
        <IconButton icon="solar:plain-bold-duotone" onClick={handleContent} />
      </div>
    </div>
  );
};

export default OpenAiForm;
