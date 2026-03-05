import { useState } from "react";
import "./App.css";
import { Input } from "./components/input";
import { ShopCard } from "./components/ShopCard";
import { Button } from "./components/Button";

function App() {
  const [myName, setMyName] = useState("Jon Gunnar");
  const [email, setEmail] = useState("");

  const onClick = () => {
    alert("submitted:" + email);
  };

  return (
    <>
      {/* bua til button component */}
      <h2>hello world</h2>

      <div>myName</div>
      <div>{myName}</div>

      <div>
        <Input value={myName} onChange={(e) => setMyName(e.target.value)} />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={onClick}>Submit</button>

        <Button onClick={onClick} />
      </div>

      <ShopCard />
    </>
  );
}

export default App;