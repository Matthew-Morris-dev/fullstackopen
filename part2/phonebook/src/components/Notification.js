const Notification = ({ notificationInfo }) => {
    if (notificationInfo === null) {
        return null;
    }

    const notificationBaseStyle = {
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    };

    const notificationSuccessStyle = {
        ...notificationBaseStyle,
        color: "green"
    };

    const notificationErrorStyle = {
        ...notificationBaseStyle,
        color: "red"
    };

    let notificationStyle;
    if (notificationInfo.type === "success") {
        notificationStyle = notificationSuccessStyle;
    } else if (notificationInfo.type === "error") {
        notificationStyle = notificationErrorStyle;
    } else {
        return null;
    }

    return <div style={notificationStyle}>{notificationInfo.message}</div>;
};

export default Notification;
