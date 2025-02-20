"use client"
import type React from "react"
import { useState } from "react"
import { X, Send, Paperclip, Minus, Search, ArrowLeft, Phone, Video, PhoneOff, VideoOff } from "lucide-react"
import { type User, type Message, sampleUsers, initialMessages, type FloatingChatProps } from "@/app/Data/chat/chatdata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"

const FloatingChat: React.FC<FloatingChatProps> = ({ isVisible, onClose }) => {
  // Existing state
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeChat, setActiveChat] = useState<number | null>(null)
  const [users] = useState<User[]>(sampleUsers)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isOpen, setIsOpen] = useState(false)

  // New state for calls
  const [isInCall, setIsInCall] = useState(false)
  const [isInVideoCall, setIsInVideoCall] = useState(false)

  // Existing filter function
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Existing message handling
  const handleSendMessage = () => {
    if (message.trim() && activeChat) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date(),
        userId: activeChat,
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "ได้รับข้อความแล้วค่ะ/ครับ",
          sender: "other",
          timestamp: new Date(),
          userId: activeChat,
        }
        setMessages((prev) => [...prev, response])
      }, 1000)
    }
  }

  // New call handling functions
  const handleVoiceCall = () => {
    setIsInCall(!isInCall)
    if (!isInCall) {
      // Simulate starting a call
      alert("Starting voice call...")
    } else {
      // Simulate ending a call
      alert("Ending voice call...")
    }
  }

  const handleVideoCall = () => {
    setIsInVideoCall(!isInVideoCall)
    if (!isInVideoCall) {
      // Simulate starting a video call
      alert("Starting video call...")
    } else {
      // Simulate ending a call
      alert("Ending video call...")
    }
  }

  return (
    <div className="fixed bottom-4 right-8 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faFacebookMessenger} className="h-6 w-6" />
        </button>
      ) : (
        <div
          className={`bg-white rounded-lg shadow-xl w-80 ${
            isMinimized ? "h-14" : "h-96"
          } flex flex-col transition-all duration-300`}
          style={
            {
              "--scrollbar-track": "rgb(241 245 249)",
              "--scrollbar-thumb": "rgb(203 213 225)",
            } as React.CSSProperties
          }
        >
          <div className="p-4 bg-blue-500 text-white rounded-t-lg flex justify-between items-center h-12">
            <div className="flex items-center gap-2">
              {activeChat && (
                <button onClick={() => setActiveChat(null)} className="hover:bg-blue-600 p-1 rounded">
                  <ArrowLeft size={18} />
                </button>
              )}
              <h3 className="font-medium">{activeChat ? users.find((u) => u.id === activeChat)?.name : "Chat"}</h3>
            </div>
            <div className="flex gap-2">
              {/* Add call buttons when in active chat */}
              {activeChat && (
                <>
                  <button
                    onClick={handleVoiceCall}
                    className="hover:bg-blue-600 p-1 rounded"
                    title={isInCall ? "End voice call" : "Start voice call"}
                  >
                    {isInCall ? <PhoneOff size={18} /> : <Phone size={18} />}
                  </button>
                  <button
                    onClick={handleVideoCall}
                    className="hover:bg-blue-600 p-1 rounded"
                    title={isInVideoCall ? "End video call" : "Start video call"}
                  >
                    {isInVideoCall ? <VideoOff size={18} /> : <Video size={18} />}
                  </button>
                </>
              )}
              <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-blue-600 p-1 rounded">
                <Minus size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Rest of the component remains the same */}
          {!isMinimized && (
            <>
              {!activeChat ? (
                // ... existing user list code ...
                <div className="flex-1 flex flex-col">
                  <div className="p-3 border-b h-12 flex items-center">
                    <div className="relative w-full">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ค้นหา..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-8 pl-10 pr-4 py-1 border rounded-full focus:outline-none focus:border-blue-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar max-h-60">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => setActiveChat(user.id)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b"
                      >
                        <div className="relative">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{user.name}</h4>
                            <span className="text-xs text-gray-500">{user.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                        </div>
                        {user.unread > 0 && (
                          <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {user.unread}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Add call status indicator if in a call */}
                  {(isInCall || isInVideoCall) && (
                    <div className="bg-green-100 text-green-800 text-sm py-1 px-4 text-center">
                      {isInCall ? "Voice Call in Progress" : "Video Call in Progress"}
                    </div>
                  )}
                  <div className="flex-1 p-4 overflow-y-auto custom-scrollbar max-h-64">
                    {messages // แสดงข้อความทั้งหมด
                      .filter((msg) => msg.userId === activeChat) // กรองข้อความของ user ที่เลือก
                      .map(
                        (
                          msg, //  แสดงข้อความ
                        ) => (
                          <div
                            key={msg.id} // กำหนด key ให้กับแต่ละข้อความ
                            className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`rounded-lg p-2 max-w-[80%] ${
                                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span className="text-xs opacity-75">{msg.timestamp.toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ),
                      )}
                  </div>

                  <div className="p-4 border-t">
                    <div className="flex space-x-3">
                      <button className=" rounded ">
                        <Paperclip size={20} className="text-gray-500" />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="พิมพ์ข้อความ..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                      <button onClick={handleSendMessage} className=" rounded text-blue-500">
                        <Send size={20} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default FloatingChat

