import React, { useState } from "react";
import { PopoverPicker } from "../popoverPicker/PopoverPicker";

import Track from "../track/Track";

import "./Garage.scss";
import "../../App.scss";

function Garage({ garageView }: { garageView: boolean }) {
  const [colorCreate, setColorCreate] = useState("#bbbbbb");
  const [colorUpdate, setColorUpdate] = useState("#bbbbbb");

  return (
    <div className={`garage ${garageView ? "" : "hidden"}`}>
      <section className="garage_settings">
        <div className="settings_control">
          <div className="settings_remote">
            <input className="remote_input" type="text" />
            <PopoverPicker color={colorCreate} onChange={setColorCreate} />
            <button className="remote_button">Create</button>
          </div>
          <div className="settings_remote">
            <input className="remote_input" type="text" />
            <PopoverPicker color={colorUpdate} onChange={setColorUpdate} />
            <button className="remote_button">Update</button>
          </div>
        </div>
        <div className="settings_buttons">
          <button className="remote_button">Race</button>
          <button className="remote_button">Reset</button>
          <button className="remote_button">Generate Cars</button>
        </div>
      </section>
      <h2>Garage / 100 /</h2>
      <section className="garage_autodrom">
        <Track />
      </section>
      <div className="garage_pagination"></div>
    </div>
  );
}

export default Garage;
