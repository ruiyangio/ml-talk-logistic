import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import C3Chart from './C3Chart';
import 'c3/c3.css';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/serif.css';
import './App.css';

const MATHJAX_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML';

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

    // Temp workaround for the wrong chart size
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  render() {
    return (
      <div className="demo reveal">
        <div className="slides">
          <section>
            <header>
              <h2>Learning session: Logistic Regression</h2>
            </header>
            <div className="demo-chart demo-chart__half demo-chart__center">
              <C3Chart
                title={sigmoidChartConfig.title}
                data={sigmoidChartConfig.data}
                tooltip={sigmoidChartConfig.tooltip}
              />
            </div>
          </section>
          <section>
            <h2>Regression Analysis</h2>
            <div>
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{logitModel}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </section>
          <section>
            <h2>Generalized Linear Model</h2>
          </section>
          <section>
            <h2>Why Sigmoid</h2>
          </section>
          <section>
            <h2>Gradient descent</h2>
          </section>
          <section>
            <h2>Implementation in Vector space</h2>
          </section>
          <section>
            <h2>Demo</h2>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
