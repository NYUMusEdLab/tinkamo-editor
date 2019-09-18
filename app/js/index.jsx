import React, { useState } from "react";
import { render } from "react-dom";

function TinkamoEditor() {
  const [code, setCode] = useState("");

  return (
    <div>
      <h1>Tinkamo Editor</h1>
      <textarea value={code} onChange={e => setCode(e.target.value)} />
      <pre>{code}</pre>
      <TinkaList tinkamos={[]} />
    </div>
  );
}

function TinkaList({ tinkamos }) {
  return (
    <ul>
      {tinkamos.map(tinka => (
        <li>{tinka.id}</li>
      ))}
    </ul>
  );
}

window.addEventListener("load", () => {
  render(<TinkamoEditor />, document.getElementById("main"));
});
