import classNames from "classnames/bind";
import styles from "./Introduce.module.scss";
import schoolImg from "./../../../../Img/school.png";
import phoneNumberImg from "./../../../../Img/phone.png";
import locationImg from "./../../../../Img/location.png";
import statusImg from "./../../../../Img/statusLove.png";
import homeImg from "./../../../../Img/home.png";
import { LogoDel, LogoEdit, LogoNavMore, LogoPlus } from "../../../../Icon";
import React, { useContext, useEffect, useState } from "react";
import * as ServiceIntroduceApi from "./../../../../apiServices/introduceAPI";
import { message } from "antd";
import HeadelessTippy from "@tippyjs/react/headless";
import { useParams } from "react-router-dom";
import { MyContext } from "../../../../App";
const cx = classNames.bind(styles);

function IntroducePage() {
  const { dataUser } = useContext(MyContext);
  const { userId } = useParams();
  const [statusShowArrInput, setStatusShowArrInput] = useState([]);
  const [dataIntrocudeInput, setDataIntrocudeInput] = useState({});
  const [dataIntrocudeInputApi, setDataIntrocudeInputApi] = useState({});

  const handleSetStatusInput = (idInput) => {
    const isCheck = statusShowArrInput.includes(idInput);
    if (isCheck) {
      const newArr = statusShowArrInput.filter((item) => item !== idInput);
      setStatusShowArrInput(newArr);
      return;
    }
    setStatusShowArrInput((prev) => {
      return [...prev, idInput];
    });
  };
  const onChangeInput = (idInput, e) => {
    setDataIntrocudeInput((prev) => {
      return {
        ...prev,
        [idInput]: e.target.value,
      };
    });
  };
  const handleSubmit = async (dataIntrocudeInput, idInput, userId) => {
    const data = {
      userId,
      [idInput]: dataIntrocudeInput[idInput],
    };
    const rs = await ServiceIntroduceApi.Create(data);
    if (rs.success) {
      message.success(rs.success);
      handleSetStatusInput(idInput);
      fecthIntroduceUserId(userId);
    }
  };
  const handleDelIntroduce = async (userId, idInput) => {
    const data = {
      userId,
      column: idInput,
    };
    const rs = await ServiceIntroduceApi.DelEachColumn(data);
    if (rs.success) {
      message.success(rs.success);
      fecthIntroduceUserId(userId);
    }
  };
  const fecthIntroduceUserId = async (userId) => {
    const rs = await ServiceIntroduceApi.GetByUserId(userId);
    if (rs.success) {
      if (rs.data) {
        setDataIntrocudeInputApi(rs.data);
        setDataIntrocudeInput(rs.data);
        return;
      }
      setDataIntrocudeInputApi({});
      return;
    }
    setDataIntrocudeInputApi({});
  };
  useEffect(() => {
    setTimeout(() => {
      fecthIntroduceUserId(userId);
    }, 1000);
  }, [userId]);
  const renderInputButton = (dataIntrocudeInput, idInput) => {
    return (
      <div className={cx("right-input")}>
        <div className={cx("input-placeholder")}>
          <input
            value={(dataIntrocudeInput && dataIntrocudeInput[idInput]) || ""}
            onChange={(e) => onChangeInput(idInput, e)}
            placeholder="Nhập vào thông tin"
            type={idInput === "phoneNumber" ? "number" : "text"}
          />
        </div>
        <div className={cx("input-button")}>
          <button onClick={() => handleSetStatusInput(idInput)}>Hủy</button>
          <button
            className={cx(
              {
                activeBtn:
                  dataIntrocudeInput[idInput] !== null &&
                  dataIntrocudeInput.hasOwnProperty(idInput) &&
                  dataIntrocudeInput[idInput].length > 0,
              },
              "disbled"
            )}
            onClick={() => {
              if (
                dataIntrocudeInput.hasOwnProperty(idInput) &&
                dataIntrocudeInput[idInput].length > 0
              ) {
                handleSubmit(dataIntrocudeInput, idInput, userId);
              }
            }}
          >
            Lưu
          </button>
        </div>
      </div>
    );
  };
  const renderInfoIntroduce = (
    dataIntrocudeInputApi,
    idInput,
    imgUrl,
    textItem1,
    textItem2
  ) => {
    return dataIntrocudeInputApi &&
      dataIntrocudeInputApi.hasOwnProperty(idInput) &&
      dataIntrocudeInputApi[idInput] !== null &&
      dataIntrocudeInputApi[idInput] !== "" ? (
      <div className={cx("item-label")}>
        <img className={cx("right-iconCreate")} src={imgUrl} alt="img" />
        <div className={cx("right-span")}>
          <span style={{ color: "var(--color-text)" }}>
            {textItem1}
            <b> {dataIntrocudeInputApi[idInput]}</b>
          </span>
          {dataUser && dataUser._id === userId && (
            <HeadelessTippy
              render={(attrs) => (
                <div className={cx("option-select")} tabIndex="-1" {...attrs}>
                  <div
                    className={cx("select-item")}
                    onClick={() => handleSetStatusInput(idInput)}
                  >
                    <LogoEdit className={cx("icon-select")} />
                    <span>Sửa {textItem2}</span>
                  </div>
                  <div
                    className={cx("select-item")}
                    onClick={() => handleDelIntroduce(userId, idInput)}
                  >
                    <LogoDel className={cx("icon-select")} />
                    <span>Xóa {textItem2}</span>
                  </div>
                </div>
              )}
              interactive
              placement="top"
              trigger="click"
            >
              <div className={cx("more-option")}>
                <LogoNavMore className={cx("icon")} />
              </div>
            </HeadelessTippy>
          )}
        </div>
      </div>
    ) : dataUser && dataUser._id !== userId ? (
      <div className={cx("item-label")}>
        <img className={cx("right-iconCreate")} src={imgUrl} alt="img" />
        <div className={cx("right-span")}>
          <span style={{ color: "var(--color-text)", fontWeight: "bold" }}>
            Không có {textItem2}
          </span>
        </div>
      </div>
    ) : (
      <div
        className={cx("item-label")}
        onClick={() => handleSetStatusInput(idInput)}
      >
        <LogoPlus className={cx("right-iconCreate")} />
        <div className={cx("right-span")}>
          <span>Thêm {textItem2}</span>
        </div>
      </div>
    );
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("app")}>
        <div className={cx("left-introduce")}>
          <div className={cx("left-lable")}>
            <span>Giới thiệu</span>
          </div>
          <div className={cx("left-nav")}>
            <div className={cx("left-item")}>
              <span>Tổng quan</span>
            </div>
          </div>
        </div>
        <div className={cx("right-introduce")}>
          <div className={cx("right-nav")}>
            {[
              {
                key: "school",
                img: schoolImg,
                text1: "Đã học tại",
                text2: "trường học",
              },
              {
                key: "province",
                img: homeImg,
                text1: "Sống tại",
                text2: "tỉnh/thành phố hiện tại",
              },
              {
                key: "place",
                img: locationImg,
                text1: "Đến từ",
                text2: "nơi sống hiện tại",
              },
              {
                key: "status",
                img: statusImg,
                text1: "",
                text2: "tình trạng mối quan hệ hiện tại",
              },
              {
                key: "phoneNumber",
                img: phoneNumberImg,
                text1: "",
                text2: "số điện thoại cá nhân",
              },
            ].map((item, index) => {
              return dataUser && dataUser._id !== userId ? (
                <React.Fragment key={index}>
                  {renderInfoIntroduce(
                    dataIntrocudeInputApi,
                    item.key,
                    item.img,
                    item.text1,
                    item.text2
                  )}
                </React.Fragment>
              ) : !statusShowArrInput.includes(item.key) ? (
                <React.Fragment key={index}>
                  {renderInfoIntroduce(
                    dataIntrocudeInputApi,
                    item.key,
                    item.img,
                    item.text1,
                    item.text2
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  {renderInputButton(dataIntrocudeInput, item.key)}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroducePage;
