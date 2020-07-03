import React from "react";

const LocationForm = props => {
  return (
    <div class="container">
      {props.errors ? (
        <h5 style={{ color: "red", opacity: "0.3" }}>
          *Sorry, Canada is not considered a real country*
        </h5>
      ) : null}
      <form onSubmit={props.weatherfunction}>
        <div className="row justify-content-center">
          <div className="col-3 offset-2  ">
            <input
              className="form_row location "
              placeholder="Enter City"
              type={props.type}
              name={props.cityname}
              onChange={e => {
                props.onChangeHandler1(e);
              }}
            />
          </div>
          <div className="col-3">
            <input
              className="form_row location"
              placeholder="Enter Country "
              type={props.type}
              name={props.countryname}
              onChange={e => {
                props.onChangeHandler2(e);
              }}
            />
          </div>
          <div className="col-2 ">
            <input
              className="btn-outline-info btn submitbutton"
              value="Get Weather"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationForm;
