import React, { useEffect, useState } from "react";

const PageA = () => {
  //const [name, setName] = useState("");
  const [name, setName] = useState(() => {
    if (localStorage.getItem("name")) {
      const sampleValue = JSON.parse(localStorage.getItem("name") || "");
      return sampleValue;
    } else {
      localStorage.setItem("name", "");
    }
  });

  const [pwd, setPwd] = useState(() => {
    if (localStorage.getItem("pwd")) {
      const sampleNum = JSON.parse(localStorage.getItem("pwd") || "");
      return sampleNum || "";
    } else {
      localStorage.setItem("pwd", "");
    }
  });

  //const [pwd, setPwd] = useState("");

  // const handleSave = () => {
  //   localStorage.setItem("Name", name);
  //   localStorage.setItem("Password", pwd);

  //   alert(`あなたの名前は${name} Password:${pwd}`);
  // };

  const handleRemove = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("pwd");

    alert("データは削除されました");
  };
  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(name));
    console.log(name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("pwd", JSON.stringify(pwd));
    console.log(pwd);
  }, [pwd]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>あなたの名前:{localStorage.getItem("name")}</div>
      <div>Password:{localStorage.getItem("pwd")}</div>

      <h1>Full Name</h1>
      <input
        type="text"
        placeholder="名前を入力してください。"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1>Password</h1>
      <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
      />

      <button type="submit">Save</button>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </form>
  );
};

export default PageA;
