import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class SearchBar extends React.Component {
  state = { inputText: "" };

  onInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.inputText); //we have received the props in that we
    //have onFormSubmit to which will
  };

  render() {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <input
            class="form-control"
            type="text"
            placeholder="Enter the Pincode"
            value={this.state.inputText}
            onChange={this.onInputChange}
          />
        </form>
      </>
    );
  }
}

export default SearchBar;
