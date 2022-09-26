import "../../style/userAvatar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import { UserMenu } from "./UserMenu";
import { useAppSelector } from "../../redux";

export function UserAvatar() {
  const photoUrl = useAppSelector((state) => state.user.loginInfo.photo);
  let userImage: JSX.Element;

  if (photoUrl) {
    userImage = (
      <UserMenu
          avatar={
            <img className="user-icon" alt="avatar" src={photoUrl} />
          }
        />
    );
  } else {
    userImage = (
      <UserMenu
        avatar={
          <FontAwesomeIcon
            icon={regular("circle-user")}
            className="user-icon"
          />
        }
      /> 
      )
  }
  return <> {userImage} </>;
}

export default UserAvatar;
