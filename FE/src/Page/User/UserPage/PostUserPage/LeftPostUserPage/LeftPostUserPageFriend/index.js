import classNames from "classnames/bind";
import styles from "./LeftPostUserPageFriend.module.scss";
import { Link } from "react-router-dom";
import userNoneImg from "./../../../../../../Img/userNone.png";
import { useContext, useEffect, useState } from "react";
import * as ServiceUserApi from "./../../../../../../apiServices/userAPI";
import * as ServiceFriendApi from "./../../../../../../apiServices/friendAPI";
import * as ServicePostApi from "./../../../../../../apiServices/postAPI";
import { MyContext } from "../../../../../../App";

const cx = classNames.bind(styles);

function LeftPostUserPageFriend({ userId }) {
  const { ImageUrlPath } = useContext(MyContext);
  const [userIdFriends, setUserIdFriends] = useState([]);
  const [dataByUserIdFriend, setDataByUserIdFriend] = useState([]);

  const fecthGetAllFriend = async (userId) => {
    const rs = await ServiceFriendApi.getAllFriend(userId, "accepted");
    if (rs.success) {
      setUserIdFriends(rs.data);
    } else {
      setUserIdFriends([]);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fecthGetAllFriend(userId);
    }, 1000);
  }, [userId]);
  useEffect(() => {
    const fecthProfileUsers = async (userIdFriends) => {
      const IdUsers = userIdFriends.map((item) => {
        if (item.userId1 === userId) return item.userId2;
        else return item.userId1;
      });
      const profileUsers = await Promise.all(
        IdUsers.map(async (item) => {
          const fullNames = await ServiceUserApi.getNameUser(item);
          const imagesAvartar = await ServicePostApi.showPostByUserAvartarCover(
            { typePost: "avartar", userId: item }
          );
          if (fullNames.success && imagesAvartar.success) {
            const fullName = fullNames.data;
            const image = imagesAvartar.result.image.flat()[0];
            return { fullName, image };
          }
          return { fullName: fullNames.data };
        })
      );
      setDataByUserIdFriend(profileUsers);
    };
    if (userIdFriends.length > 0) {
      setTimeout(() => {
        fecthProfileUsers(userIdFriends);
      }, 1000);
    } else {
      setDataByUserIdFriend([]);
    }
  }, [userIdFriends, userId]);
  return (
    <div className={cx("wrapper-box")}>
      <div className={cx("friend-box")}>
        <div className={cx("label")}>
          <span>Bạn bè</span>
        </div>
        <Link to={`/userFriend/${userId}`} className={cx("friendBox-seeAll")}>
          <span>Xem tất cả bạn bè</span>
        </Link>
      </div>
      <div className={cx("friend-total")}>
        <span>{dataByUserIdFriend && dataByUserIdFriend.length} bạn bè</span>
      </div>
      <div className={cx("friend-person")}>
        <div className={cx("friend-list")}>
          {dataByUserIdFriend.length > 0 &&
            dataByUserIdFriend.map((item, index) => (
              <Link
                to={`/userPost/${item.fullName._id}`}
                key={index}
                className={cx("friend-item")}
              >
                <div className={cx("friend-img")}>
                  <img
                    src={
                      item.image ? ImageUrlPath + item.image.url : userNoneImg
                    }
                    alt="img"
                  />
                </div>
                <div className={cx("friend-name")}>
                  <span>
                    {item.fullName.first_name + " " + item.fullName.last_name}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LeftPostUserPageFriend;
