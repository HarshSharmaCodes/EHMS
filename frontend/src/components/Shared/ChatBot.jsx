import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, SendHorizonal, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatBot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 How can I assist you with your health today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isConversationEnded, setIsConversationEnded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [blink, setBlink] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isNegative = (msg) => {
    const negativeWords = [
      "bad",
      "useless",
      "worst",
      "hate",
      "stupid",
      "idiot",
    ];
    return negativeWords.some((word) => msg.toLowerCase().includes(word));
  };

  const fetchDoctors = async () => {
    try {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Fetching doctors, please wait..." },
      ]);
      const res = await axios.get("http://localhost:5000/doctor/get-doctors");
      const doctorList = res.data
        .map((doc) => `- Dr. ${doc.name} (${doc.specialization})`)
        .join("\n");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Here's a list of our doctors:\n${doctorList}`,
          },
        ]);
      }, 800);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Oops! Failed to fetch doctors. Please try again later.",
        },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim().toLowerCase();
    const newMessage = { sender: "user", text: input };

    // If chat has ended, reset it
    if (isConversationEnded) {
      setMessages([
        {
          sender: "bot",
          text: "Chat has been reset. 👋 How can I assist you now?",
        },
      ]);
      setInput("");
      setConversationStarted(false);
      setIsConversationEnded(false);
      return;
    }

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setConversationStarted(true);
    setBlink(false);

    if (
      conversationStarted &&
      (userMessage === "hello" || userMessage === "start")
    ) {
      setMessages([
        {
          sender: "bot",
          text: "Chat has been reset. 👋 How can I assist you now?",
        },
      ]);
      setConversationStarted(false);
      setIsConversationEnded(false);
      return;
    }

    if (["hi", "hey", "hello"].includes(userMessage)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Welcome! What would you like to know?",
          options: ["Sign Up", "Log In", "Doctors", "General Health"],
        },
      ]);
      return;
    }

    if (isNegative(userMessage)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm really sorry if something went wrong. Let's try to help!",
        },
      ]);
      return;
    }

    if (["okay", "done", "nothing"].includes(userMessage)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Anything Else You would like to explore?",
          options: ["Sign Up", "Log In", "Doctors", "General Health"],
        },
      ]);
      return;
    }

    if (["no", "nahi", "nope", "nothing", "never"].includes(userMessage)) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thankyou for Your patience!",
        },
      ]);
      setIsConversationEnded(true);
      return;
    }

    switch (userMessage) {
      case "sign up":
      case "signup":
        navigate("/sign-up");
        break;
      case "log in":
      case "login":
        navigate("/sign-in");
        break;
      case "doctors":
        fetchDoctors();
        break;
      case "general health":
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "Feel free to ask:\n" +
              "- How can I boost immunity?\n" +
              "- What are signs of stress?\n" +
              "- Best diet for weight loss?",
          },
        ]);
        break;
      case "exit":
      case "bye":
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Take care! 😊 See you again soon!" },
        ]);
        setIsConversationEnded(true);
        break;
      default:
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I'm still learning. Would You like choose from options?",
            options: ["Sign Up", "Log In", "Doctors", "General Health"],
          },
        ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleOptionClick = (option) => {
    const lowerOpt = option.toLowerCase();

    setMessages((prev) => [...prev, { sender: "user", text: option }]);

    switch (lowerOpt) {
      case "how can i boost immunity?":
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "To boost immunity:\n" +
              "- Eat a balanced diet with fruits & veggies 🍎🥦\n" +
              "- Get enough sleep 😴\n" +
              "- Exercise regularly 🏃‍♂️\n" +
              "- Stay hydrated 💧\n" +
              "- Manage stress well 🧘‍♂️",
          },
        ]);
        break;

      case "what are signs of stress?":
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "Common signs of stress:\n" +
              "- Trouble sleeping 😵‍💫\n" +
              "- Headaches 😣\n" +
              "- Irritability 😠\n" +
              "- Fatigue 🛏️\n" +
              "- Difficulty concentrating 🤯",
          },
        ]);
        break;

      case "best diet for weight loss?":
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text:
              "Best diet tips for weight loss:\n" +
              "- Include high-protein foods 🍗\n" +
              "- Eat more fiber-rich meals 🥗\n" +
              "- Avoid sugary drinks 🧃\n" +
              "- Watch portion sizes 🍽️\n" +
              "- Stay consistent! 💪",
          },
        ]);
        break;
      case "sign up":
      case "signup":
        navigate("/sign-up");
        break;
      case "log in":
      case "login":
        navigate("/sign-in");
        break;
      case "doctors":
        fetchDoctors();
        break;
      case "general health":
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Choose a general health question below:",
            options: [
              "How can I boost immunity?",
              "What are signs of stress?",
              "Best diet for weight loss?",
            ],
          },
        ]);
        break;
      default:
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "I'm still learning. Please choose a valid option like 'Sign Up', 'Doctors', or 'General Health'.",
          },
        ]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden"
          >
            <div className="bg-black text-white px-4 py-3 font-semibold flex justify-between items-center">
              <span>MediBot</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="h-64 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-[70%] text-sm whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-gray-200 text-gray-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-white border text-sm px-3 py-1 rounded-full shadow-sm hover:bg-blue-100"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSend}
                className="bg-black text-white p-2 rounded-full"
              >
                <SendHorizonal size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setBlink(false);
          }}
          className={`bg-black text-white p-3 rounded-full shadow-lg hover:bg-opacity-80 ${
            blink ? "animate-pulse ring-2 ring-red-400" : ""
          }`}
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
