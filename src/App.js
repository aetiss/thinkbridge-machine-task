import React, { Component } from 'react';
import Axios from 'axios';

//sai@thinkbridge.com
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      selectedCountry: null,
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    let response = await Axios.get(
      'http://api.worldbank.org/v2/country?format=json',
    );

    // console.log('countries', response.data[1]);
    this.setState({ countries: response.data[1] });
    this.setState({ selectedCountry: response.data[1][0] });
  }

  componentWillUnmount() {
    this.setState({ countries: [], selectedCountry: null });
    this._isMounted = false;
  }

  handleChange = (e) => {
    // console.log('event value::', e.target.value);

    let selectedId = e.target.value;
    let selectedCountry = this.state.countries.filter(
      (country) => country.id === selectedId,
    );

    this.setState({ selectedCountry: selectedCountry[0] });
  };
  render() {
    const selectedCountry = this.state.selectedCountry;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '50%',
          margin: 'auto',
        }}
      >
        <h1>Countries</h1>

        <select data-testid="select" onChange={this.handleChange}>
          {this.state.countries.map((country, index) => {
            return (
              <option value={country.id} key={index}>
                {country.name}
              </option>
            );
          })}
        </select>

        {selectedCountry && (
          <div>
            <h4>Selected Country</h4>
            <p data-testid="country">{selectedCountry.name}</p>
            <h4>Capital</h4>
            <p>{selectedCountry.capitalCity}</p>
          </div>
        )}
      </div>
    );
  }
}
