import { DarkThemeToggle } from "flowbite-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  useCreateMutation,
  useLazyReadChatQuery,
  useLazyReadQuery,
  useReadQuery,
} from "../features/api/apiSlice";
import Response from "../components/Response";
import LoadingButton from "../components/loading/LoadingButton";
import Loading from "../components/loading/Loading";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import customerImage from "../../../../assets/images/customers/customer-i.jpg";
import Peer from "peerjs";
import { PushPinOutlined } from "@mui/icons-material";
import Messages from "../components/chat/Messages";
import MessageInput from "../components/chat/MessageInput";
import ChatHeader from "../components/chat/ChatHeader";
import UserList from "../components/chat/UserList";
import Video from "../components/chat/Video";
// import "./scroll.css";

const Message = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  //   const [currentUser, setCurrentUser] = useState();
  const currentUser = JSON.parse(localStorage.getItem("makuta_user"));

  const [sendMessageData, sendMessageResponse] = useCreateMutation();
  const [sender, setSenderId] = useState("");
  const [receiver, setReceiverId] = useState("");
  //   console.log(user, "users current");
  //   useEffect(() => {
  //     user &&
  //       setCurrentUser({
  //         _id: user?._id,
  //         email: user?.email,
  //       });
  //   }, [user]);

  const [onlineUsers, setOnlineUsers] = useState();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [texts, setTexts] = useState();
  const [typing, setTyping] = useState(false);
  const [chatId, setChatId] = useState("");
  const [files, setFiles] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [description, setDescription] = useState("");
  const refer = useRef(null);

  const [trigger, { data: messageData, isLoading, isError }] =
    useLazyReadChatQuery({ refetchOnFocus: false });

  useEffect(() => {
    if (receiver && sender) {
      trigger({
        url: `/chat/${sender}.${receiver}?populatingType=chats&populatingValue=sender,receiver`,
        tag: ["chats"],
      });
    }
  }, [receiver, sender]);

  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [totalPage, setTotalPage] = useState(1);
  const [role, setRole] = useState("");
  const [limit, setLimit] = useState(30);

  const [
    userDataTrigger,
    { data: userDatas, isFetching: userIsFetching, isError: userIsError },
  ] = useLazyReadQuery();

  // useEffect(() => {
  //   setPage(1);
  // }, []);

  useEffect(() => {
    const roles = role?.length > 0 ? `&role=${role}` : "";
    userDataTrigger({
      url: `/user/users?limit=${limit}${roles}&searchField=email&searchValue=${search}&populatingValue=user`,
      tag: ["users"],
    });
  }, [limit, search]);

  console.log(limit, search, role, "user list fetching");
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const aa = [];
    userDatas?.data?.map((e) => {
      onlineUsers?.includes(e?.email) ? aa.unshift(e) : aa.push(e);
    });
    setUserData(aa);
  }, [userDatas]);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    socket?.emit("connect-user", currentUser?.email);
    socket?.on("aaa", (val) => {
      setOnlineUsers(val);
    });
  }, [socket]);

  const sendHandler = () => {
    if (sender && receiver) {
      const formData = new FormData();
      formData.append("sender", sender);
      formData.append("receiver", receiver);
      formData.append("message", message);
      formData.append("messageType", messageType);
      formData.append("description", description);
      formData.append("url", "/chat");
      formData.append("tag", ["chats"]);
      files?.length > 0
        ? [...files].forEach((file) => {
            formData.append("chatFile", file);
          })
        : formData.append("chatFile", files);
      sendMessageData(formData);
    }
  };

  useEffect(() => {
    if (messageData !== undefined) {
      setChatId(messageData?.data[0]?.chatId);
      setTexts(messageData?.data);
      socket?.emit("aa", messageData?.data, messageData?.data[0]?.chatId);
      socket?.on("bb", (text) => {
        setTexts(text);
      });
    }
  }, [messageData]);

  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [texts]);

  useEffect(() => {
    refer.current?.scrollIntoView();
  }, [typing]);

  const popup = (id) => {
    const i = document.getElementById(id);
    i?.classList?.value?.includes("hidden")
      ? (i.classList?.remove("hidden"), i.classList?.add("flex"))
      : (i.classList?.remove("flex"), i.classList?.add("hidden"));
  };

  // typing handler
  const typingHandler = (e) => {
    if (e.target.value.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  };

  useEffect(() => {
    if (message.length > 0) {
      socket?.emit("typing t", true, chatId);
      socket?.on("typing true", (bool) => {
        setTyping(bool);
      });
    } else {
      socket?.emit("typing f", false, chatId);
      socket?.on("typing false", (bool) => {
        setTyping(bool);
      });
    }
  }, [message]);

  useEffect(() => {
    if (sendMessageResponse?.status === "fulfilled" && messageType === "file") {
      setMessageType("file");
      setFiles("");
      popup("file-send");
      setDescription("");
    }
  }, [sendMessageResponse]);

  useEffect(() => {
    if (sendMessageResponse?.status === "fulfilled") {
      setMessage("");
    }
  }, [sendMessageResponse]);

  return (
    <div className="flex text-xs overflow-hidden relative">
      <Response response={sendMessageResponse} setPending={setPending} />

      <div className="w-full overflow-hidden flex h-[92.5vh]">
        <div
          id="user_list_container"
          className="absolute hidden md:block bg-white bg-dark z-20 left-0 top-11 md:top-0  md:relative w-[80%] md:w-[25%]"
        >
          <UserList
            userIsFetching={userIsFetching}
            userIsError={userIsError}
            userData={userData}
            currentUser={currentUser}
            setReceiverId={setReceiverId}
            setSenderId={setSenderId}
            onlineUsers={onlineUsers}
            focusHandler={focusHandler}
            setSearch={setSearch}
            receiver={receiver}
            setReceiverUser={setReceiverUser}
            limit={limit}
            setLimit={setLimit}
          />
        </div>

        <div className="flex relative w-full md:w-[76%] overflow-hidden h-[92.5vh] flex-col border-r">
          <ChatHeader
            sender={sender}
            receiver={receiver}
            user={receiverUser ? receiverUser : currentUser}
          />
          <Messages
            isLoading={isLoading}
            isError={isError}
            receiver={receiver}
            sender={sender}
            texts={texts}
            currentUser={currentUser}
            typing={typing}
          />

          <MessageInput
            popup={popup}
            typingHandler={typingHandler}
            setMessage={setMessage}
            pending={pending}
            sendHandler={sendHandler}
            setFiles={setFiles}
            files={files}
            setDescription={setDescription}
            setMessageType={setMessageType}
            message={message}
            receiver={receiver}
            sender={sender}
          />
          <div ref={refer} />
        </div>
      </div>
    </div>
  );
};

export default Message;
