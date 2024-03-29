import { useState, useEffect } from "react";
import { Badge, IconButton, Popover } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { clearNotifs, getPharmacist, seenNotifs } from "../services/api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popover" : undefined;
  const [seen, setSeen] = useState(false);
  const [reload, setReload] = useState(false);
  const notificationsIcon = `${process.env.PUBLIC_URL}/icons/notifications.svg`;

  useEffect(() => {
    getPharmacist()
      .then((result) => {
        countNewNotifications(result.data.notifications);
        setNotifications(result.data.notifications);
        console.log(result.data.notifications);
      })
      .catch((err) => console.log(err.message));
  }, [reload]);

  useEffect(() => {
    if (seen) {
      seenNotifs()
        .then((result) => console.log(result))
        .catch((err) => console.log(err.message));
    }
  }, [seen]);

  const handleNotifDelete = async (id) => {
    console.log(id);
    await clearNotifs(id);
    setReload(!reload);
  };

  const countNewNotifications = (notifs) => {
    let count = 0;

    for (let i = 0; i < notifs.length; i++) {
      if (!notifs[i].seen) {
        count++;
      }
    }

    setNotificationsCount(count);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSeen(true);
    notifications.map((notification) => {
      notification.seen = true;
    });
    countNewNotifications(notifications);
  };

  return (
    <IconButton color="inherit" sx={{ marginRight: "20px" }}>
      <Badge badgeContent={notificationsCount} color="error">
        {/* <NotificationsIcon onClick={handleClick} sx={{ fill: "white" }} /> */}
        <img
          src={notificationsIcon}
          style={{ maxWidth: "30px" }}
          onClick={handleClick}
        />
        <Popover
          id={id}
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div style={{ padding: "10px" }}>
            {notifications.map((notification) => (
              <div
                key={notification._id}
                style={notification.seen ? {} : { backgroundColor: "#F0F0F0" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h4>{notification.title}</h4>
                  <DeleteForeverIcon
                    id={notification._id}
                    onClick={() => handleNotifDelete(notification._id)}
                  />
                </div>
                <p>{notification.body}</p>
              </div>
            ))}
          </div>
        </Popover>
      </Badge>
    </IconButton>
  );
};

export default Notifications;
