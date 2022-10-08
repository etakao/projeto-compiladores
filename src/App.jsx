import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import lexr from 'lexr';

import { FiGithub, FiPlay, FiUpload } from 'react-icons/fi';

import './global.scss';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT ALL TOKENS, KEYWORDS, ERRORS, TYPES
import { dictionary, tokens, keywords, errors, types } from './utils';

function App() {
  const [editorText, setEditorText] = useState("70 * 7");
  const [compiled, setCompiled] = useState([]);

  // INITIALIZES LEXR
  let tokenizer = new lexr.Tokenizer("");

  // ADD RULES
  tokenizer.addTokenSet(keywords);
  tokenizer.addTokenSet(types);
  tokenizer.addTokenSet(tokens);
  tokenizer.addTokenSet(errors);

  tokenizer.addIgnoreSet(["WHITESPACE"]);

  function getLexical() {
    const response = tokenizer.tokenize(editorText);
    setCompiled(response);
  }

  function handleEditorChange(value, event) {
    console.log("Valor: ", value);
    console.log("Evento: ", event);
    setEditorText(value);
  }

  async function handleUpload(event) {
    event.preventDefault();

    const exampleFileReader = new FileReader();
    exampleFileReader.onload = async (event) => { 
      setEditorText(event.target.result);
      toast.success("Arquivo carregado com sucesso!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    };
    exampleFileReader.readAsText(event.target.files[0]);
  }
  
  return (
    <div className="container">
      <header>
        <h1>PROJETO DE COMPILADORES | ANALISADOR LEXICO</h1>

        <a 
          href="https://github.com/etakao/projeto-compiladores" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FiGithub size={16} />
          Veja o codigo aqui!
        </a>
      </header>

      <section className="content">
        <Editor 
          height="100%"
          width="100%"
          value={editorText}
          theme="vs-dark"
          onChange={handleEditorChange}
        />

        <div>
          <div className="actions">
            <button type="button" onClick={getLexical}>
              <FiPlay size={16} />
              COMPILAR
            </button>

            <label htmlFor="upload" className="upload" >
              <FiUpload size={16} />
              UPLOAD
            </label>
            <input 
              id="upload" 
              type="file" 
              onChange={(event) => handleUpload(event)} 
            />
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>LEXEMA</th>
                  <th>TOKEN</th>
                </tr>
              </thead>
              <tbody>
                {compiled.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.value}</td>
                      <td>{dictionary[data.token]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "#1E1E1E", color: "#D4D4D4" }}
        limit={1}
      />
    </div>
  )
}

export default App;
