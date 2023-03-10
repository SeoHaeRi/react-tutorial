import React, { Component } from "react";
import { FaRegSmileBeam } from "react-icons/fa";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../../redux/actions/chatRoom_action";

export class Favorited extends Component {
  state = {
    usersRef: firebase.database().ref("users"),
    favoritedChatRooms: [],
    activeChatRoomId: "",
  };

  componentDidMount() {
    if (this.props.user) {
      this.addListeners(this.props.user.uid);
    }
  }

  componentWillUnmount() {
    if (this.props.user) {
      this.removeListener(this.props.user.uid);
    }
  }

  removeListener = (userId) => {
    this.state.usersRef.child(userId).child("favorited").off();
  };

  addListeners = (userId) => {
    this.state.usersRef
      .child(userId)
      .child("favorited")
      .on("child_added", (DataSnapshot) => {
        const favoritedChatRoom = {
          id: DataSnapshot.key,
          ...DataSnapshot.val(),
        };
        this.setState({
          favoritedChatRooms: [
            ...this.state.favoritedChatRooms,
            favoritedChatRoom,
          ],
        });
      });

    this.state.usersRef
      .child(userId)
      .child("favorited")
      .on("child_removed", (DataSnapshot) => {
        const chatRoomToRemove = {
          id: DataSnapshot.key,
          ...DataSnapshot.val(),
        };
        const filteredChatRooms = this.state.favoritedChatRooms.filter(
          (chatRoom) => {
            return chatRoom.id !== chatRoomToRemove.id;
          }
        );

        this.setState({ favoritedChatRooms: filteredChatRooms });
      });
  };

  changeChatRoom = (room) => {
    this.props.dispatch(setCurrentChatRoom(room)); //클래스형 컴포넌트에서 dispatch시
    this.props.dispatch(setPrivateChatRoom(false));
    this.setState({ activeChatRoomId: room.id });
  };

  renderFavoritedChatRooms = (favoritedChatRooms) =>
    favoritedChatRooms.length > 0 &&
    favoritedChatRooms.map((chatRoom) => (
      <li
        key={chatRoom.id}
        onClick={() => this.changeChatRoom(chatRoom)}
        style={{
          backgroundColor:
            chatRoom.id === this.props.currentChatRoom.id &&
            chatRoom.id === this.state.activeChatRoomId &&
            "#ffffff45",
        }}
      >
        # {chatRoom.name}
      </li>
    ));

  render() {
    return (
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaRegSmileBeam style={{ marginRight: "3px" }} />
          FAVORITED ({this.state.favoritedChatRooms.length})
        </span>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {this.renderFavoritedChatRooms(this.state.favoritedChatRooms)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    currentChatRoom: state.chatRoom.currentChatRoom,
  };
};

export default connect(mapStateToProps)(Favorited);
