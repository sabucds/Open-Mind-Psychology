import React from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import styles from "./Chats.module.css";

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date());
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({ createdAt = null, text = "", name = "", img = "" }) => {
  if (!text) return null;

  return (
    <>
      {text.includes("http://g.co/meet/") ? (
        <>
          <div className={styles.messageContainer}>
            <div className={styles.meetContainer}>
              <a href={text} target="_blank">
                <div className={styles.link}>
                  {name} quiere iniciar una videollamada, haga click aquí para
                  ingresar
                </div>
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.messageContainer}>
            {Image ? (
              <img
                src={img}
                alt="Avatar"
                className={styles.profilePhoto}
                width={45}
                height={45}
              />
            ) : null}
            <div>
              <div className={styles.nameDate}>
                {name ? <p className={styles.messageName}>{name}</p> : null}
                {createdAt?.seconds ? (
                  <span className="text-gray-500 text-xs">
                    {formatDate(new Date(createdAt.seconds * 1000))}
                  </span>
                ) : null}
              </div>
              <div className={styles.text}>
                <p>{text}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  name: PropTypes.string,
  img: PropTypes.string,
};

export default Message;
