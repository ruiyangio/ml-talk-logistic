import React, { Component } from 'react';
import Reveal from 'reveal.js';
import MathJax from 'react-mathjax2';
import C3Chart from './C3Chart';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';
import 'c3/c3.css';
import '../node_modules/reveal.js/css/reveal.css';
import '../node_modules/reveal.js/css/theme/sky.css';
import './App.css';
import eggImage from './egg.jpg';
import derivativeImage from './derivative.gif';
import objFImage from './f.png';
import objD1Image from './1d.png';

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
const sigmoid = 'S(x) = e^x / (e^x + 1) = 1 / (1 + e^-x)';
const sigmoidPdfInt =
  'F(x;mu;s) = intf(x;mu;s)dx = inte^(-(x-mu)/s)/(s*(1+e^(-(x-mu)/s))^2)dx = 1/(1 + e^(-(x-mu)/s))';
const sigmoidInt = 'intS(x)dx = ln(1+e^x)';
const sigmoidDerivative =
  "S^'(x) = -(1+e^-x)^-2*(-e^-x) = 1/(1+e^-x)*(1-1/(1+e^-x)) = S(x)*(1-S(x))";
const massFunction1 = 'P(y=1|Xtheta) = h_theta(X)';
const massFunction2 = 'P(y=0|Xtheta) = 1-h_theta(X)';
const massFunction = 'P(y|Xtheta) = h_theta(X)^y*(1-h_theta(X))^y';
const massFunctionSpread =
  'P(y|Xtheta) = prod_ih_theta(x_i)^(y_i)*(1-h_theta(x_i)^(1-y_i))';
const logProb =
  'll = 1/nsum_i^ny_ilog(h_theta(x_i))+(1-y_i)*log(1-h_theta(x_i))';
const logProb2 =
  '= 1/nsum_i^ny_ilog((h_theta(x_i))/(1-h_theta(x_i)))+log(1-h_theta(x_i))';
const gradientAsc = 'theta_n = theta_(n-1) + alpha*(partialll)/(partialtheta)';
const gradient =
  'gradf(x_1, x_2,...,x_3) = [(partialf)/(partialx_1), (partialf)/(partialx_2), ...,(partialf)/(partialx_n)]';
const logProb3 = '1/nsum_i^ny_iXtheta-log(1+e^(Xtheta))';
const gradientAwd =
  '(partialll)/(partialtheta) = 1/nsumyX - X*(e^(Xtheta)/(1+e^Xtheta))';
const gradientAwd2 = '= X^T(Y-(1/(1+e^-(X*theta))))';
const multinomial1 = 'P(y=1|X) = e^(Xtheta_1)/(1+sum_(k=1)^(K-1)e^(Xtheta_k))';
const multinomial2 = 'P(y=2|X) = e^(Xtheta_2)/(1+sum_(k=1)^(K-1)e^(Xtheta_k))';
const multinomial3 =
  'P(y=K-1|X) = e^(Xtheta_(K-1))/(1+sum_(k=1)^(K-1)e^(Xtheta_k))';
const multinomial4 = 'P(y=K|X) = 1/(1+sum_(k=1)^(K-1)e^(Xtheta_k))';
const sigmoidChartConfig = makeFunctionLineChart(
  -4.5,
  4.5,
  0.5,
  v => (1 / (1 + Math.exp(-v))).toFixed(2),
  ''
);

const accuracyChart = {
  title: { text: 'Sentiment Model Accuracy' },
  data: {
    columns: [
      ['My Logistic', 87, 72, 70.7],
      ['sklearn Logistic', 89, 82.5, 82.5],
      ['MNB', 86, 80.7, 80.6],
      ['SVM', 91, 81.6, 81.7]
    ],
    type: 'bar'
  },
  bar: {
    width: {
      ratio: 0.5
    }
  },
  axis: {
    x: {
      type: 'category',
      categories: [
        'IMDB Review Bi-gram feature',
        'Twitter Sentiment Bi-gram',
        'Overall Bi-gram'
      ]
    }
  },
  tooltip: {
    show: true,
    format: {
      value: value => {
        return `${value} %`;
      }
    }
  }
};

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
            <section>
              <div>
                A biological phenomenon that the heights of descendants of tall
                ancestors tend to regress down towards a normal average.
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
              <img src={eggImage} alt="egg" />
            </section>
          </section>
          <section>
            <h3>Generalized Linear Model</h3>
            <section>
              <div>
                Linear combination + transformation function &#10132;
                non-continuous prediction
              </div>
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
                <C3Chart {...sigmoidChartConfig} />
              </div>
              <br />
              <div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{sigmoid}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <div>
                <div>
                  Cumulative distribution function of Logistic distribution
                </div>
                <br />
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{sigmoidPdfInt}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="0">
                <div>Softplus function</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{sigmoidInt}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="1">
                <div>Derivative of sigmoid function</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{sigmoidDerivative}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <h4>Learning the model</h4>
              <div className="fragment" data-fragment-index="0">
                <div>Probability Mass function</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{massFunction1}</MathJax.Node>
                  </div>
                </MathJax.Context>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{massFunction2}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="1">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{massFunction}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{massFunctionSpread}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="3">
                <div>Reward function</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{logProb}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="4">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{logProb2}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <h4>Derivative</h4>
              <div className="fragment" data-fragment-index="0">
                <img src={derivativeImage} alt="derivative" />
              </div>
            </section>
            <section>
              <h4>Gradient</h4>
              <div className="fragment" data-fragment-index="0">
                <div>A vector of first order partial derivative</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{gradient}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="1">
                Points to the direction of largest increase
              </div>
            </section>
            <section>
              <div className="fragment" data-fragment-index="0">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{logProb3}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="1">
                <div>Partial derivative</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{gradientAwd}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <div className="fragment" data-fragment-index="2">
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{gradientAwd2}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
              <br />
              <div className="fragment" data-fragment-index="4">
                <div>Iteratively update unknown parameters</div>
                <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                  <div>
                    <MathJax.Node>{gradientAsc}</MathJax.Node>
                  </div>
                </MathJax.Context>
              </div>
            </section>
            <section>
              <div>
                <div>Object function</div>
                <img
                  src={objFImage}
                  alt="object function"
                  className="demo-img__quarter"
                />
              </div>
            </section>
            <section>
              <div>
                <div>Derivative</div>
                <img
                  src={objD1Image}
                  alt="derivative"
                  className="demo-img__quarter"
                />
              </div>
            </section>
          </section>
          <section>
            <h2>Implementation</h2>
            <SyntaxHighlighter
              language="python"
              style={monokaiSublime}
              wrapLines={true}
            >
              {`
                  def sigmoid(self, x):
                    return 1.0 / (1 + np.exp(-x))

                  def fit(self, x, y):
                      self.w = np.zeros(x.shape[1])
                      n_sample = x.shape[0]
                      for i in range(self.max_iteration):
                          scores = x.dot(self.w)
                          y_pred = self.sigmoid(scores)
                          error = y - y_pred
                          gradient = 1/n_sample*x.T.dot(error)
                          self.w += self.learning_rate * gradient
                  
                  def predict(self, x):
                      scores = x.dot(self.w)
                      return np.round(self.sigmoid(scores))
                  `}
            </SyntaxHighlighter>
          </section>
          <section>
            <h2>Multinomial Logistic Regression</h2>
            <div>K outcome instead of 1/0 outcome</div>
            <div>
              Take a pivot class and do K-1 Binomial Logistic Regression
            </div>
            <div
              className="fragment"
              data-fragment-index="0"
              style={{ 'font-size': '1.5vw' }}
            >
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{multinomial1}</MathJax.Node>
                </div>
              </MathJax.Context>
              <br />
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{multinomial2}</MathJax.Node>
                </div>
              </MathJax.Context>
              <br />
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{multinomial3}</MathJax.Node>
                </div>
              </MathJax.Context>
              <div>...</div>
              <MathJax.Context input="ascii" script={MATHJAX_CDN_URL}>
                <div>
                  <MathJax.Node>{multinomial4}</MathJax.Node>
                </div>
              </MathJax.Context>
            </div>
          </section>
          <section>
            <div>Sentiment Analysis example</div>
            <div>
              <C3Chart {...accuracyChart} />
            </div>
            <br />
            <div style={{ 'font-size': '1.2vw' }}>
              <div>
                Training accuracy and speed on the whole data set(IMDB +
                Twitter)
              </div>
              <div>1145k Train cases and 505k Validation cases</div>
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Accuracy %</th>
                    <th>Training Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>My Logistic(10000 iteration)</td>
                    <td>70.7%</td>
                    <td>101 min</td>
                  </tr>
                  <tr>
                    <td>Sklearn Logistic</td>
                    <td>82.5%</td>
                    <td>3.3 min</td>
                  </tr>
                  <tr>
                    <td>Multinomial Naive Bayes</td>
                    <td>80.6%</td>
                    <td>2 min</td>
                  </tr>
                  <tr>
                    <td>Support Vector Machine</td>
                    <td>81.7%</td>
                    <td>2.6 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
