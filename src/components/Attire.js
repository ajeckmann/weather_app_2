import React, { Component } from "react";
import { isProperty } from "@babel/types";

const Attire = props => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="conditionsbox col">
          <div className="row justify-content-center">
            <h2>Attire Tips</h2>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="row tip_row justify-content-beginning ">
                <div className="col-6 text-left">
                  <h3>Flip Flops okay??</h3>
                </div>
                <div className="col-3 text-left ">
                  {props.isRain || props.farenheit < 63 ? (
                    <i
                      className="fas fa-times text-danger "
                      aria-hidden="true"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-check text-success"
                      style={{
                        color: "green",
                        fontSize: "2em"
                      }}
                    ></i>
                  )}
                </div>
              </div>

              <div className="row tip_row justify-content-beginning">
                <div className="col-6 text-left">
                  <h3>Pants or Shorts?</h3>
                </div>
                <div className="col-3 text-left">
                  {props.farenheit > 66 ? <h3>Shorts</h3> : <h3>Pants</h3>}
                </div>
              </div>
              <div className="row tip_row justify-content-beginning">
                <div className="col-6 text-left">
                  <h3>Rain Jacket?</h3>
                </div>
                <div className="col-3 text-left">
                  {props.isRain ? (
                    <i
                      className="fas fa-check text-success"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times text-danger"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row tip_row justify-content-beginning">
                <div className="col">
                  <h3>Hat/EarMuffs?</h3>
                </div>
                <div className="col">
                  {props.farenheit < 50 ? (
                    <i
                      className="fas fa-check text-success"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times text-danger"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  )}
                </div>
              </div>
              <div className="row tip_row justify-content-beginning">
                <div className="col">
                  <h3>Rain Jacket?</h3>
                </div>
                <div className="col">
                  {props.isRain ? <h3>Yes</h3> : <h3>No</h3>}
                </div>
              </div>
              <div className="row tip_row justify-content-beginning">
                <div className="col">
                  <h3>Snow Boots?</h3>
                </div>
                <div className="col">
                  {props.isSnow ? (
                    <i
                      className="fas fa-check text-success"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times text-danger"
                      style={{
                        fontSize: "2em"
                      }}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // if (props.tooHot == false) {
  //   return (
  //     (<h1>turn on your ac!!</h1>),
  //     (
  //       <h1>
  //         <i className="fas fa-trash"></i>
  //       </h1>
  //     )
  //   );
  // }
  // if (props.minTemp < 100) {
  //   return (
  //     <div>
  //       <h1>You should wear {props.minTemp}</h1>
  //       {props.weatherID > 722 && props.weatherID <= 730 ? (
  //         <h2>this is the weather id: {props.weatherID}</h2>
  //       ) : null}

  //       {props.weatherID > 500 && props.weatherID <= 600 ? (
  //         <h1>You should grab a rain jacket</h1>
  //       ) : null}

  //       <h3>
  //         Need a rain jacket?{" "}
  //         {props.weatherID > 500 && props.weatherID <= 600 ? "Yes" : "No"}
  //       </h3>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <h1>
  //       You should wear a <i className="fas fa-trash"></i>
  //     </h1>
  //   );
  // }
};
export default Attire;
