import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import C3Chart from './C3Chart';
import 'c3/c3.css';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/sky.css';
import './App.css';

const MATHJAX_CDN_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML';

const regression = 'y~~f(X,beta)';
const conditionalExpectation = 'E(Y|X) = f(X,beta)';
const logitModel = 'h_theta(x) = g(Xtheta) = 1/(1+e^(-Xtheta))';
const linearRegression = 'y = Xbeta, yinRR';
const generalizedModel = 'E(Y|X)=f(X,beta)=mu=g^-1(Xbeta)';
const linkFunction = 'Xbeta = g(mu)';
const beachExample = 'P(go|temperature) = p, P(notgo|temperature) = 1 - p';
const logOdds = 'ln(p/(1-p)) = temperaturebeta';
const sigmoidChartConfig = makeFunctionLineChart(
  -4.5,
  4.5,
  0.5,
  v => (1 / (1 + Math.exp(-v))).toFixed(2),
  ''
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

    document.addEventListener('keydown', e => {
      if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        // Temp workaround for the wrong chart size
        window.dispatchEvent(new Event('resize'));
      }
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
          </section>
          <section>
            <header>
              <h3>Regression Analysis</h3>
            </header>
            <div className="fragment" data-fragment-index="0">
              New data regress towards mean
            </div>
            <br />
            <div className="fragment" data-fragment-index="1">
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{regression}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
            <br />
            <div className="fragment" data-fragment-index="2">
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{conditionalExpectation}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
            <br />
            <div className="fragment" data-fragment-index="3">
              Given a set observations, what's the expected value of response
              variable?
            </div>
          </section>
          <section>
            <h3>Generalized Linear Model</h3>
            <section>
              <div className="fragment" data-fragment-index="0">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{linearRegression}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{generalizedModel}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{linkFunction}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="3">
                <div>
                  Y is from a particular distribution in the exponential family
                </div>
              </div>
            </section>
          </section>
          <section>
            <h3>Logistic Regression</h3>
            <section>
              <div className="fragment" data-fragment-index="0">
                Likelihood of a given person going to the beach at some
                temperature
              </div>
              <br />
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{beachExample}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{logOdds}</MathJax.Node>
                  </div>
                </MathJax.Context>
                <br />
                <div>
                  a constant change in temperature leads to a constant change in
                  odds
                </div>
              </div>
              <br />
              <div className="fragment" data-fragment-index="3">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{logitModel}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <h4>Sigmoid</h4>
              <div className="demo-chart demo-chart__half demo-chart__center">
                <C3Chart
                  title={sigmoidChartConfig.title}
                  data={sigmoidChartConfig.data}
                  tooltip={sigmoidChartConfig.tooltip}
                />
              </div>
            </section>
            <section>
              <h4>Cross Entropy Cost function</h4>
            </section>
            <section>
              <h4>Gradient descent</h4>
            </section>
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
