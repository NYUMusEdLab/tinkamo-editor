import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Tinkamo from "@musedlab/tinkamod/src/tinkamo"; 
import Sidebar from "./Sidebar"; 
import './index.css';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const tinkamo_ = new Tinkamo(); 


function TinkamoEditor() {
  const [code, setCode] = useState("");
  const [tinkamo, setTinkamo] = useState(tinkamo_); 
  const [cores, setTinkacores] = useState(tinkamo.tinkacores); 
  //set Tinkamo in event listener
  tinkamo.addEventListener('*', (event) => {
    console.log('EVENT\n\n', event);
  });

  
  const onClick = () => {
    tinkamo.connect();
  }
  useEffect(() => { 
    // console.log('YEET', tinkamo.tinkacores)
    setTinkacores(tinkamo.tinkacores); 
  }, [tinkamo])

  return (
    <div>
      <Sidebar onClick={() => onClick()} />
      <h1 className="main">Tinkamo Editor</h1>
      {/* <textarea className="main" value={code} onChange={e => setCode(e.target.value)} /> */}
      <CodeMirror
        value={code}
        options={{
          mode: 'xml',
          theme: 'material',
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value)
        }}
        // onChange={(editor, data, value) => {
        //   setCode(value)
        // }}
      />
      <pre>{code}</pre>
      <TinkaList tinkamos={Object.entries(cores)} />
    </div>
  );
}




function TinkaList({ tinkamos }) {
  return (
    <div className="main"> 
      Connected Tinkamos
      <ul>
        {tinkamos.map(tinka => {
          console.log('mynameyeff', tinka)
          return (
          <li key={tinka[1].id}>
            {console.log("yooyoo", tinka[1].sensor, tinka[1].sensor_connected)}
            {tinka[1].name + " / " + (tinka[1].sensor_connected ? tinka[1].sensor.name : "loops")}
          </li>
        )})}
      </ul>
      {console.log('boop', tinkamos)}
      {tinkamos.length > 0 ? tinkamos[0][1].name: undefined }
    </div>
  );
}





window.addEventListener("load", () => {
  render(<TinkamoEditor />, document.getElementById("main"));
});
