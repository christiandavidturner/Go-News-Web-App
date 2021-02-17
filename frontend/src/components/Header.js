import React from "react";
import logo from "../gopher.jpg";

export default class Header extends React.Component {
  render() {
    return (
      <header className="App-header">
        <h1>{this.props.title}</h1>
        <img src={logo} alt="golang-gopher" />

        <p className="credit">
          work in progress:{" "}
          <a href="https://twitter.com/imcdt" target="_blank" rel="noreferrer">
            me
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/christiandavidturner/Go-News-Aggregator"
            target="_blank"
            rel="noreferrer"
          >
            repo
          </a>
        </p>
      </header>
    );
  }
}
