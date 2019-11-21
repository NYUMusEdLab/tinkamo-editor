import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { render } from "react-dom";
import Tinkamo from "@musedlab/tinkamod/src/tinkamo";
import Sidebar from "./Sidebar";
import "./index.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

const tinkamo = new Tinkamo();

function TinkamoEditor() {
  const [code, setCode] = useState("");
  const [cores, setTinkacores] = useState({});

  //set Tinkamo in event listener
  useEffect(() => {
    const topEventListener = event => {
      console.log("THE STATE ", JSON.stringify(cores));
      cores[event.tinkacore.id] = {
        name: event.tinkacore.name,
        sensor: event.sensor,
        value: event.value
      };
      setTinkacores({ ...cores });
      console.log("THE STATE PART 2", JSON.stringify(cores));
    };
    // have 2 event listeners where one will check for sensor changes, the other for readings.
    // on sensor change, the value should not be set cuz that will just be true/false
    // on reading, set value

    tinkamo.addEventListener("connect", event => {
      console.log("EVENT 1\n\n", JSON.stringify(event));

      event.tinkacore.addEventListener("*", topEventListener);
    });
  }, []);

  const onClick = () => {
    tinkamo.connect();
  };

  const cleanData = val => {
    const type = typeof val;
    console.log("TYPE", type);
    console.log("VALUE", val);
    switch (type) {
      case "boolean": {
        console.log("IN BOOLEAN");
        return "";
      }
      case "number": {
        return val % 1 === 0 ? val : val.toFixed(2);
      }
      case "object": {
        return val.map(elem => elem.toFixed(2));
      }
      default:
        return val;
    }
  };

  return (
    <div>
      {/* <Sidebar onClick={() => onClick()} /> */}
      <h1>Tinkamo Editor</h1>
      <CodeMirror
        value={code}
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        // onChange={(editor, data, value) => {
        //   setCode(value)
        // }}
      />
      {/* <pre>{code}</pre> */}
      {console.log("got here", JSON.stringify(cores))}
      {console.log("CORES", Object.getOwnPropertyNames(cores).length)}
      <h2>Connected Tinkamos:</h2>
      <Sidebar onClick={() => onClick()} />
      {Object.getOwnPropertyNames(cores).length === 0 ? (
        <p>No Tinkamos Connected! Please connect one!</p>
      ) : (
        <div>
          {Object.values(cores).map((elem, i) => {
            console.log(JSON.stringify(elem));
            return (
              <Card key={i} className="card">
                {" "}
                <p>Name: {elem.name}</p> <p>Sensor connected: {elem.sensor}</p>{" "}
                <p>Value: {cleanData(elem.value)}</p>{" "}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// function TinkaList({ tinkamos }) {
//   return (
//     <div className="main">
//       Connected Tinkamos
//       <ul>
//         {tinkamos.map(tinka => {
//           console.log('mynameyeff', JSON.stringify(tinka))
//           return (
//           <li key={tinka[1].id}>
//             {console.log("yooyoo", tinka[1].sensor, tinka[1].sensor_connected)}
//             {tinka[1].name + " / " + (tinka[1].sensor ? tinka[1].sensor.name : "loops")}
//           </li>
//         )})}
//       </ul>
//       {console.log('boop', tinkamos)}
//       {tinkamos.length > 0 ? tinkamos[0][1].name: undefined }
//     </div>
//   );
// }

window.addEventListener("load", () => {
  render(<TinkamoEditor />, document.getElementById("main"));
});
