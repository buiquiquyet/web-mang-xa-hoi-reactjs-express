import classNames from "classnames/bind";
import styles from "./LeftPostUserPageImage.module.scss";
import { memo, useContext, useEffect, useState } from "react";
import { MyContext } from "../../../../../../App";
import * as ServicePostApi from "./../../../../../../apiServices/postAPI";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function LeftPostUserPageImage({ userId }) {
  const { ImageUrlPath } = useContext(MyContext);
  const [showDataPost, setShowDataPost] = useState([]);

  const fecthPostByUser = async (userId) => {
    const rs = await ServicePostApi.showPostByUser(userId);

    if (rs.success) {
      if (rs.result.posts.length > 0) {
        setShowDataPost(rs.result.images.flat());
      } else {
        setShowDataPost([]);
      }
    } else {
      setShowDataPost([]);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fecthPostByUser(userId);
    }, 1000);
  }, [userId]);
  return (
    <div className={cx("wrapper-box")}>
      <div
        className={cx("friend-box")}
        style={{ flexDirection: "column", alignItems: "start" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className={cx("label")}>
            <span>Ảnh</span>
          </div>
          <Link to={`/userImage/${userId}`} className={cx("friendBox-seeAll")}>
            <span>Xem tất cả ảnh</span>
          </Link>
        </div>
        <div className={cx("friend-person")}>
          <div className={cx("friend-list")}>
            {showDataPost.length > 0 &&
              showDataPost.map((item, index) => (
                <div key={index} className={cx("friend-item")}>
                  <div className={cx("friend-img")}>
                    <img src={ImageUrlPath + item.url} alt="img" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LeftPostUserPageImage);
