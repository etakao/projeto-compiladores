import { useState } from 'react';
import lexr from 'lexr';

import './styles.scss';

function App() {
  const [expression, setExpression] = useState('');
  const [compiled, setCompiled] = useState([]);

  let compiledReturn = [];

  const dictionary = {
    NUM: "NUMERO NATURAL",
    FLOAT: "NUMERO REAL",
    SUM: "OPERADOR SOMA",
    MINUS: "OPERADOR SUBTRACAO",
    MULTIPLY: "OPERADOR MULTIPLICACAO",
    DIVIDE: "OPERADOR DIVISAO",
    L_PAR: "SIMBOLO ABRE PARETESES",
    R_PAR: "SIMBOLO FECHA PARETESES",
    ERR: "CARACTERE INVALIDO",
    NUM_ERR: "NUMERO INVALIDO"
  }

  // INITIALIZES LEXR
  let tokenizer = new lexr.Tokenizer("");

  // RULES
  const tokens = {
    NUM: /[0-9]+/,
    FLOAT: /[0-9]+\.[0-9]+/,
    SUM: /[+]/,
    MINUS: /[-]/,
    MULTIPLY: /[*]/,
    DIVIDE: /[/]/,
    L_PAR: /[(]/,
    R_PAR: /[)]/,
    WHITESPACE: /\s/,
    NUM_ERR: /[.0-9]+|[0-9.]+/,
    ERR: /[^\s]/
  }

  // ADD TOKENS
  tokenizer.addTokenSet(tokens);

  // FUNCTIONS RESPONSE TO RULES
  const functions = {
    NUM: () => {
      compiledReturn.push("NUMERO NATURAL")
    },
    FLOAT: () => {
      compiledReturn.push("NUMERO REAL")
    },
    SUM: () => {
      compiledReturn.push("OPERADOR SOMA")
    },
    MINUS: () => {
      compiledReturn.push("OPERADOR SUBTRACAO")
    },
    MULTIPLY: () => {
      compiledReturn.push("OPERADOR MULTIPLICACAO")
    },
    DIVIDE: () => {
      compiledReturn.push("OPERADOR DIVISAO")
    },
    L_PAR: () => {
      compiledReturn.push("SIMBOLO ABRE PARETESES")
    },
    R_PAR: () => {
      compiledReturn.push("SIMBOLO FECHA PARETESES")
    },
    ERR: () => {
      compiledReturn.push("CARACTERE INVALIDO")
    }
  }

  // ADD FUNCTIONS
  tokenizer.addFunctionSet(functions);

  tokenizer.addIgnoreSet(["WHITESPACE"]);

  function getLexical(event) {
    event.preventDefault();

    const response = tokenizer.tokenize(expression);

    setCompiled(response);
  }

  return (
    <div className="App">
      <header>
        PROJETO DE COMPILADORES | ANALISADOR LEXICO
      </header>

      <form onSubmit={getLexical}>
        <input type="text" placeholder='Digite uma expressao' value={expression} onChange={e => setExpression(e.target.value)} autoFocus />
        <button type="submit">COMPILAR</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>TOKEN</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
          {compiled.map((data, index) => {
          return (
            <tr key={index}>
              <td>{dictionary[data.token]}</td>
              <td>{data.value}</td>
            </tr>
          );
        })}
      </tbody>
      </table>
    </div>
  )
}

export default App;
