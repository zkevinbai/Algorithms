import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
// import GeocodeService from "./geocode_service";

class GeocodeService {
    static geocode = ({ street, city, state, zip }) => {
        return new Promise((resolve, reject) => {
            if (street && city && state && zip && zip.length >= 5) {
                resolve({
                    lat: 33.8554385,
                    long: -84.0323683
                });
            } else {
                reject({ error: "Requires all address fields" });
            }
        });
    };
}

// export default GeocodeService;

const STREET = "STREET";
const CITY = "CITY";
const STATE = "STATE";
const ZIP = "ZIP";

class App extends React.Component {
    state = {
        STREET: "",
        CITY: "",
        STATE: "",
        ZIP: "",
        lat: 0,
        lng: 0,
        isGeocoded: false
    };

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state, this.STREET);
        const isValidAddress =
            this.state.STREET &&
            this.state.CITY &&
            this.state.STATE &&
            this.state.ZIP &&
            this.state.ZIP.length >= 5;

        const isSameAddress =
            this.state.STREET === prevState.STREET &&
            this.state.CITY === prevState.CITY &&
            this.state.STATE === prevState.STATE &&
            this.state.ZIP === prevState.ZIP //&&
        // !this.state.isGeocoded;

        // this.state.lat !== prevState.lat &&
        // this.state.lng !== prevState.lng;

        console.log("PrevProps", prevProps);
        console.log("PrevState", prevState);
        // console.log('stret', this.state.STREET, prevState.STREET );
        // console.log('street same', this.state.STREET === prevState.STREET, );
        console.log("State", this.state);

        console.log("Is Valid", isValidAddress);
        // console.log("Is Not Same", isNotSameAddress);

        // const getData = () => {
        //   return;
        // };

        if (isValidAddress && !isSameAddress) {
            GeocodeService.geocode({
                street: this.state.STREET,
                city: this.state.CITY,
                state: this.state.STATE,
                zip: this.state.ZIP
            })
                .then((res) => {
                    console.log("res is happening");

                    const { lat, long } = res;
                    console.log(lat, long);
                    this.setState({
                        lat,
                        lng: long,
                        isGecoded: true
                    });
                })
                .catch((err) => console.log(err));
        }
    }

    handleChangeAddress = ({ key, value }) => {
        this.setState({
            [key]: value
        });
    };

    get lat() {
        return Number.parseFloat(this.state.lat || 0).toPrecision(5);
    }

    get lng() {
        return Number.parseFloat(this.state.lng || 0).toPrecision(5);
    }

    render() {
        // console.log(this.state);
        return (
            <div className="App">
                <h1>Address Geocoder</h1>
                <div className="field-group">
                    <label>Street</label>
                    <input
                        name="street"
                        value={this.state.street}
                        onChange={(e) =>
                            this.handleChangeAddress({
                                key: STREET,
                                value: e.currentTarget.value
                            })
                        }
                    />
                </div>
                <div className="field-group">
                    <label>City</label>
                    <input
                        name="city"
                        value={this.state.city}
                        onChange={(e) =>
                            this.handleChangeAddress({
                                key: CITY,
                                value: e.currentTarget.value
                            })
                        }
                    />
                </div>
                <div className="field-group">
                    <label>State</label>
                    <input
                        name="state"
                        value={this.state.state}
                        onChange={(e) =>
                            this.handleChangeAddress({
                                key: STATE,
                                value: e.currentTarget.value
                            })
                        }
                    />
                </div>
                <div className="field-group">
                    <label>Zip code</label>
                    <input
                        name="zip"
                        value={this.state.zip}
                        onChange={(e) =>
                            this.handleChangeAddress({
                                key: ZIP,
                                value: e.currentTarget.value
                            })
                        }
                    />
                </div>

                <div>
                    <h4>Geocoding results:</h4>({this.state.lat}, {this.state.lng})
        </div>
            </div>
        );
    }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
