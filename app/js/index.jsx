import React from 'react';
import { render } from 'react-dom';

function TinkamoEditor() {
  return <div><h1>Tinkamo Editor</h1></div>;
}

window.addEventListener('load', () => {
  render(<TinkamoEditor />, document.getElementById('main'));
});
