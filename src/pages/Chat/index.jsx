import { useState, useEffect } from "react";
import { ModalRegister, DrawerList } from "../../components";
import HeaderLayout from "../../layout";
import { get } from "../../service";
import Pusher from "pusher-js";

const Chat = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    const response = await get(`/user`);

    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("b5ad2f998793b8d713c8", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("my-chat");
    channel.bind("my-list-contacts", async ({ message }) => {
      console.log("message from pusher", message);
    });
  }, []);

  return (
    <HeaderLayout>
      {users.length > 0 && <DrawerList users={users} />}
      <ModalRegister fetchUsers={fetchUsers} />
    </HeaderLayout>
  );
};

export default Chat;
