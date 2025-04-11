import React from "react";

const page = () => {
  return (
    <div
      id="wrapper"
      className="h-screen flex flex-col items-center justify-start bg-white sm:justify-center sm:bg-gray-100"
    >
      <div
        id="login-section"
        className="h-1/2 w-1/2 flex flex-col justify-center items-center bg-white"
      >
        <div
          id="header"
          className="flex justify-center mb-7 text-xl text-orange-400"
        >
          <div id="title" className="font-extrabold">
            BLOG
          </div>
        </div>
        <div id="body">
          <div id="id">
            <div id="id-label" className="text-gray-400">
              아이디
            </div>
            <input
              id="id-input"
              type="text"
              className="bg-gray-100 mt-2 p-3 rounded-xl"
              placeholder="실명을 입력해주세요."
            />
          </div>
          <div id="pw">
            <div id="pw-label" className="text-gray-400 mt-3">
              비밀번호
            </div>
            <input
              id="pw-input"
              type="password"
              className="bg-gray-100 mt-2 p-3 rounded-xl"
              placeholder="-제외"
            ></input>
          </div>
          <button
            id="login-btn"
            className="  w-full text-gray-400 p-3  rounded-xl bg-gray-100 fixed bottom-0 sm:static sm:mt-7 sm:rounded-xl sm:w-full"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
