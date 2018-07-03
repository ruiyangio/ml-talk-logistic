import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/sky.css';
import './App.css';

const logitModel = 'h_theta(x) = g(theta^TX) = 1/(1+e^(-theta^TX))';

class App extends Component {
  componentDidMount() {
    Reveal.initialize({
      width: '100%',
      height: '100%'
    });
  }

  render() {
    return (
      <div className="demo reveal">
        <div className="slides">
          <section>
            <header>
              <h2>Learning session: Logistic Regression</h2>
            </header>
            <div>
              <MathJax.Context input="ascii">
                <div>
                  <MathJax.Node>{logitModel}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </section>
          <section>S2</section>
          <section>S3</section>
        </div>
      </div>
    );
  }
}

export default App;
