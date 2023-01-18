import Track from "../track/Track"

import "./Garage.scss";

function Garage() {
  return (
    <div className="garage">
      <section className="garage_settings">
        <div className="settings_control">
          <div className="settings_remote">
            <input className="remote_input" type="text" />
            <div className="remote_color"></div>
            <button className="remote_button">Create</button>
          </div>
          <div className="settings_remote">
            <input className="remote_input" type="text" />
            <div className="remote_color"></div>
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
