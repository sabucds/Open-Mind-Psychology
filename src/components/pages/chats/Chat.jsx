import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { bd } from "../../../utils/firebaseConfig";
import firebase from "firebase/app";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
// Components
import Message from "./Message";
import Navbar from "../../Navbar/Navbar";
import Cargando from "../../cargando/Cargando";
import { useParams } from "react-router-dom";
import styles from "./Chats.module.css";

const Chat = () => {
  const params = useParams();
  const messagesRef = bd.collection("messages");
  const { user } = useContext(UserContext);

  function useFirestoreQuery(query) {
    const [docs, setDocs] = useState([]);
    // Store current query in ref
    const queryRef = useRef(query);

    // Compare current query with the previous one
    useEffect(() => {
      // Use Firestore built-in 'isEqual' method
      // to compare queries
      if (!queryRef?.curent?.isEqual(query)) {
        queryRef.current = query;
      }
    });

    // Re-run data listener only if query has changed
    useEffect(() => {
      if (!queryRef.current) {
        return null;
      }

      // Subscribe to query with onSnapshot
      const unsubscribe = queryRef.current.onSnapshot((querySnapshot) => {
        // Get all documents from collection - with IDs
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        // Update state
        setDocs(data);
      });

      // Detach listener
      return unsubscribe;
    }, [queryRef]);

    return docs;
  }
  const messages = useFirestoreQuery(
    messagesRef.orderBy("createdAt", "desc").limit(10000)
  );
  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef();
  const bottomListRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { id, name, img } = user;
    const from = user.id;
    const to = params.userId;
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      // Add new message in Firestore
      messagesRef.add({
        text: trimmedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name,
        img,
        from,
        to,
      });
      // Clear input field
      setNewMessage("");
      // Scroll down to the bottom of the list
      bottomListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      {!!user ? (
        <div className={styles.chatSect}>
          <div className={styles.encabezado}>
            <div className={styles.contact}>Bienvenido al chat</div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.messages}>
            <div className={styles.messagesContainer}>
              <ul>
                {messages
                  ?.sort((first, second) =>
                    first?.createdAt?.seconds <= second?.createdAt?.seconds
                      ? -1
                      : 1
                  )
                  ?.map((message) => (
                    <>
                      {(message.to === params.userId &&
                        message.from === user.id) ||
                      (message.to === user.id &&
                        message.from === params.userId) ? (
                        <li key={message.id}>
                          <Message {...message} />
                        </li>
                      ) : (
                        <div></div>
                      )}
                    </>
                  ))}
              </ul>
              <div ref={bottomListRef} />
            </div>
          </div>
          <div className={styles.barraInput}>
            <form onSubmit={handleOnSubmit} className={styles.form}>
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Type your message here..."
                className={styles.textInput}
              />
              <button
                type="submit"
                disabled={!newMessage}
                className={styles.button}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Cargando />
      )}
    </>
  );
};

Chat.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

export default Chat;
