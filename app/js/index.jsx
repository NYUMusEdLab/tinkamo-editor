import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Tinkamo from "@musedlab/tinkamod/web/tinkamo"; 
import Sidebar from "./Sidebar"; 
import './index.css';

const tinkamo_ = new Tinkamo(); 

function TinkamoEditor() {
  const [code, setCode] = useState("");
  const [tinkamo, setTinkamo] = useState(tinkamo_); 
  const [cores, setTinkacores] = useState(tinkamo.tinkacores); 
  
  const onClick = () => {
    tinkamo.connect(() => { 
      setTinkamo({...tinkamo}); 
      setTinkacores(tinkamo.tinkacores); 
      console.log("IM HERE", tinkamo.getTinkamoList());
      console.log("IM HERE part 2 ", tinkamo.tinkacores);
      console.log("PART 3", {...tinkamo})

    });
  }
  useEffect(() => { 
    console.log('YEET', tinkamo.tinkacores)
    setTinkacores(tinkamo.tinkacores); 
  }, [tinkamo])

  return (
    <div>
      <Sidebar onClick={() => onClick()} />
      <h1 className="main">Tinkamo Editor</h1>
      <textarea className="main" value={code} onChange={e => setCode(e.target.value)} />
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
