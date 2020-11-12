import React from "react";
import "./App.css";
import Container from "@material-ui/core/Container/Container";
import SpacexUpcoming from "../SpaceX/SpacexUpcoming";

/** The main entry point for the application, wraps up all the main components */
function App() {
  return (
    <Container className="upcoming-container">
      <SpacexUpcoming />
    </Container>
  );
}

export default App;
