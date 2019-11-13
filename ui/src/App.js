import React, { Component } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        pregnant: 1,
        glucose: 89,
        bp: 66,
        skin: 23,
        insulin: 94,
        bmi: 28.1,
        pedigree: 0.167,
        age: 21
      },
      result: ""
    };
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  };

  handlePredictClick = event => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch("http://127.0.0.1:5000/prediction/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  };

  handleCancelClick = event => {
    this.setState({ result: "" });
  };

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Diabetes Prediction</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Pregnant</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.pregnant}
                  name="pregnant"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Blood Glucose</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.glucose}
                  name="glucose"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Blood Pressure</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.bp}
                  name="bp"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Skin Thickness</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.skin}
                  name="skin"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Insulin Level</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.insulin}
                  name="insulin"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Body Mass Index</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.bmi}
                  name="bmi"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Pedigree</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.pedigree}
                  name="pedigree"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  as="input"
                  value={formData.age}
                  name="age"
                  onChange={this.handleChange}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}
                >
                  {isLoading ? "Making prediction" : "Predict"}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="dark"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}
                >
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null : (
            <Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    );
  }
}

export default App;
