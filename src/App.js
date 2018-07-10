import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import C3Chart from 'react-c3js';
import 'c3/c3.css';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/sky.css';
import './App.css';

const logitModel = 'h_theta(x) = g(theta^TX) = 1/(1+e^(-theta^TX))';
const sigmoidChartConfig = makeFunctionLineChart(
  -4.5,
  4.5,
  0.5,
  v => (1 / (1 + Math.exp(-v))).toFixed(2),
  'Sigmoid'
);

function makeFunctionLineChart(min, max, step, fn, title) {
  const x = [];
  for (let i = min; i <= max; i += step) {
    x.push(i);
  }
  const y = x.map(fn);
  return {
    title: { text: title },
    data: {
      x: 'x',
      columns: [['x', ...x], ['y', ...y]]
    },
    tooltip: {
      show: true,
      format: {
        value: value => {
          return `x: ${value}`;
        }
      }
    }
  };
}

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
            <div className="demo-chart demo-chart--half demo-chart__center">
              <C3Chart
                title={sigmoidChartConfig.title}
                data={sigmoidChartConfig.data}
                tooltip={sigmoidChartConfig.tooltip}
              />
            </div>
          </section>
          <section>
            <div>
              <MathJax.Context input="ascii">
                <div>
                  <MathJax.Node>{logitModel}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </section>
          <section>S3</section>
        </div>
      </div>
    );
  }
}

export default App;
