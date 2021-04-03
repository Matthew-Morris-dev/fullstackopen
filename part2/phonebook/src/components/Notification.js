const Notification = ({ notificationMessage }) => {
    if (notificationMessage === null) {
        return null;
    }

    const notificationStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    return <div style={notificationStyle}>{notificationMessage}</div>;
};

export default Notification;
