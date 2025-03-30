import "./Message.css";

const Message = ({ message, isError, onClose }) => {
    if (!message) return null;
    return(
        <div className= {`message-container ${isError ? "error": "success"}`}>
            <span>{message}</span>
            <button onClick={onClose} className="close-button">Close</button>
        </div>
    );
};

export default Message;