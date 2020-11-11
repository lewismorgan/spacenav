import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";

function App() {
  return (
    <Container className="upcoming-container">
      <SpacexUpcoming />
    </Container>
  );
}

export default App;
