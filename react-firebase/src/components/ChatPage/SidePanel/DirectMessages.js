import React, { Component } from "react";
import { FaRegSmile } from "react-icons/fa";
import firebase from "../../../firebase";
import { connect } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../../redux/actions/chatRoom_action";

export class DirectMessages extends Component {
  state = {
    usersRef: firebase.database().ref("users"),
    users: [],
    activeChatRoom: "",
  };
  //컴포넌트가 마운트된 직후, 즉 트리에 삽입된 직후에 호출, 초기화 작업에 적합
  componentDidMount() {
    if (this.props.user) {
      this.addUsersListeners(this.props.user.uid);
    }
  }

  addUsersListeners = (currentUserId) => {
    const { usersRef } = this.state;
    let usersArray = [];
    usersRef.on("child_added", (Datasnapshot) => {
      if (currentUserId !== Datasnapshot.key) {
        //내가 아닌 유저들만
        let user = Datasnapshot.val(); //여러 정보 가져옴
        user["uid"] = Datasnapshot.key;
        user["status"] = "offline";
        usersArray.push(user);
        this.setState({ users: usersArray });
      }
    });
  };

  getChatRoomId = (userId) => {
    const currentUserId = this.props.user.uid;

    return userId > currentUserId
      ? `${userId}/${currentUserId}`
      : `${currentUserId}/${userId}`;
  };

  changeChatRoom = (user) => {
    const chatRoomId = this.getChatRoomId(user.uid);
    const chatRoomData = {
      id: chatRoomId,
      name: user.name,
    };
    this.props.dispatch(setCurrentChatRoom(chatRoomData));
    this.props.dispatch(setPrivateChatRoom(true));
    this.setActiveChatRoom(user.uid); //클릭시 리스트에 음영표시(user.uid로 표시하니까 전달해줌)
  };

  setActiveChatRoom = (userId) => {
    this.setState({ activeChatRoom: userId });
  };

  renderDirectMessages = (users) =>
    users.length > 0 &&
    users.map((user) => (
      <li
        key={user.uid}
        style={{
          backgroundColor:
            this.props.isPrivate &&
            user.uid === this.state.activeChatRoom &&
            "#ffffff45",
        }}
        onClick={() => this.changeChatRoom(user)}
      >
        # {user.name}
      </li>
    ));

  render() {
    const { users } = this.state;
    return (
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaRegSmile style={{ marginRight: 3 }} /> DIRECT MESSAGES(1)
        </span>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          {this.renderDirectMessages(users)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    isPrivate: state.chatRoom.isPrivateChatRoom,
  };
};

export default connect(mapStateToProps)(DirectMessages);
