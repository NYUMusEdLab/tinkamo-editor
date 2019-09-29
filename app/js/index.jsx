import React, { useState } from "react";
import { render } from "react-dom";
import Tinkamo from "@musedlab/tinkamod/web/tinkamo"; 
import Sidebar from "./Sidebar"; 


let tinkamo_ = new Tinkamo(); 

function TinkamoEditor() {
  const [code, setCode] = useState("");
  const [tinkamo, setTinkamo] = useState(tinkamo_); 
  
  const onClick = () => tinkamo.connect();
  
  return (
    <div>
      <h1>Tinkamo Editor</h1>
      <textarea value={code} onChange={e => setCode(e.target.value)} />
      <pre>{code}</pre>
      <TinkaList tinkamos={tinkamo.getTinkamoList()} />
      <Sidebar onClick={() => onClick()}/>
    </div>
  );
}

function TinkaList({ tinkamos }) {
  return (
    <div> 
      Connected Tinkamos
      <ul>
        {tinkamos.map(tinka => (
          <li>{tinka.id}</li>
        ))}
      </ul>
    </div>
  );
}

window.addEventListener("load", () => {
  render(<TinkamoEditor />, document.getElementById("main"));
});
