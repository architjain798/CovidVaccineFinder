import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  state = { result: [], responseCod: "", todayData: "" };

  onInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state.inputText);
  };

  componentDidMount() {
    let d = new Date();
    let day = d.getDate();
    if (day / 10 === 0) {
      day = `0${day}`;
    }
    let month = d.getMonth();
    month++;
    if (month / 10 === 0) {
      month = `0${month}`;
    }
    let year = d.getFullYear();
    let finalData = `${day}-${month}-${year}`;
    //console.log(finalData);
    this.setState({ todayData: finalData });
  }

  onTermSubmit = async (term) => {
    const response = await axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin/",
        {
          params: {
            pincode: term,
            date: this.state.todayData
          }
        }
      )
      .catch((err) => {
        console.log(err);
        return;
      });
    //console.log(response.status);
    if (response === undefined) {
      this.setState({ responseCod: 400 });
      return;
    }
    if (response.data.sessions.length === 0) {
      alert("No vaccine available");
    }
    this.setState({
      result: response.data.sessions,
      responseCode: response.status
    });
  };
  renderContent() {
    if (this.state.responseCod === 400) {
      return <h1>Invalid pincode</h1>;
    } else if (this.state.result.length === 0) {
      return (
        <>
          {console.log(this.state.responseCod)}
          <br />
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <br />
        </>
      );
    } else {
      return (
        <>
          <br />
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <br />
          <table className="table table-hover table-light table-responsive table-bordered">
            <thead>
              <tr>
                <th scope="col">Hospital Name</th>
                <th scope="col">Address</th>
                <th scope="col">Age Limit</th>
                <th scope="col">available_capacity_dose1</th>
                <th scope="col">available_capacity_dose2</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map((e) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{e.name}</th>
                      <td>{e.address}</td>
                      <td>{e.min_age_limit}</td>
                      <td>{e.available_capacity_dose2}</td>
                      <td>{e.available_capacity_dose1}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      );
    }
  }
  render() {
    return (
      <div>
        <h1 class="text-center">Covid Vaccine</h1>
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
