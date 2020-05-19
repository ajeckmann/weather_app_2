import React from 'react';



const LocationForm = props => {

    return (
        <div class="container">

            <form onSubmit={props.weatherfunction}>
                <div className="row justify-content-center">
                    <div className="col-2  ">
                        <input className="form_row form-control" placeholder="Enter City" type={props.type} name={props.cityname} onChange={(e) => { props.onChangeHandler1(e) }} />
                    </div>
                    <div className="col-2">
                        <input className="form_row form-control" placeholder="Enter Country " type={props.type} name={props.countryname} onChange={(e) => { props.onChangeHandler2(e) }} />
                    </div>
                    <div className="col-1 ">
                        <input className="btn-outline-info btn" value="submit" type="submit" />
                    </div>
                </div>
            </form>




        </div>



    );

};

export default LocationForm;