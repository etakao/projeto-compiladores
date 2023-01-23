import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import lexr from 'lexr';

import { FiChevronsLeft, FiChevronsRight, FiGithub, FiPlay, FiUpload } from 'react-icons/fi';

import './global.scss';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT ALL TOKENS, KEYWORDS, ERRORS, TYPES
import { dictionary, tokens, keywords, errors, types } from './utils/Lexical';
import { useCompile } from './context/Compile';
import { analyzer } from './utils/Syntax/analyzer';

function App() {
  // const { 
  //   compiledCode,
  //   updateCompiledCode,
  //   variablesTable,
  //   updateVariablesTable,
  //   syntaxErrors,
  //   updateSyntaxErrors,
  //   semanticErrors, 
  //   updateSemanticErrors 
  // } = useCompile();

  // program teste; int a; boolean b; procedure proc(var c : int); begin a := 12 if (a>12) end .

  const [editorText, setEditorText] = useState("a := 12;");
  const [compiledCode, setCompiledCode] = useState([]);
  const [variablesTable, setVariablesTable] = useState([]);
  const [syntaxErrors, setSyntaxErrors] = useState([]);
  const [semanticErrors, setSemanticErrors] = useState([]);
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("lexical");


  // INITIALIZES LEXR
  let tokenizer = new lexr.Tokenizer("");

  // ADD RULES
  tokenizer.addTokenSet(keywords);
  tokenizer.addTokenSet(types);
  tokenizer.addTokenSet(tokens);
  tokenizer.addTokenSet(errors);

  tokenizer.addIgnoreSet(["WHITESPACE"]);

  function handleSubmit() {
    setVariablesTable([]);
    setSyntaxErrors([]);
    setSemanticErrors([]);

    let editorTextLines = editorText.split("\r\n");
    let compiledCodeLines = [];

    editorTextLines.forEach((line, lineIndex) => {
      const response = tokenizer.tokenize(line);

      response.forEach((column, columnIndex) => {
        response[columnIndex] = { ...column, line: lineIndex + 1, column: columnIndex + 1 };
      });
      
      Array.prototype.push.apply(compiledCodeLines, response);
    });

    // updateCompiledCode(compiledCodeLines);
    setCompiledCode(compiledCodeLines);
    analyzer(0, compiledCodeLines, [], setVariablesTable, [], setSyntaxErrors, [], setSemanticErrors);
  }

  function handleEditorChange(value, event) {
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
        <h1>PROJETO DE COMPILADORES | COMPILADOR</h1>

        <a 
          href="https://github.com/etakao/projeto-compiladores" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FiGithub size={16} />
          Veja o codigo aqui!
        </a>
      </header>

      <section className="code-editor">
        <div className="actions">
          <div className="editor-actions">
            <button type="button" onClick={handleSubmit}>
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

          <button type="button" onClick={() => setIsAsideVisible(true)}>
            <FiChevronsLeft />
            MOSTRAR TABELA
          </button>
        </div>

        <Editor 
          height="100%"
          width="100%"
          value={editorText}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{ fontSize: "16px" }}
        />
      </section>

      <aside className={`aside-container ${(isAsideVisible ? "visible" : "invisible")}`}>
        <button type="button" onClick={() => setIsAsideVisible(false)}>
          <FiChevronsRight />
          OCULTAR TABELA
        </button>

        <div className="aside-content">
          <ul className="tables-tab">
            <li 
              className={`tab ${activeTab === "lexical" ? "active-tab" : "inactive-tab"}`} 
              onClick={() => setActiveTab("lexical")}
            >
              <h3>TOKENS</h3>
            </li>

            <li 
              className={`tab ${activeTab === "syntax" ? "active-tab" : "inactive-tab"}`} 
              onClick={() => setActiveTab("syntax")}
            >
              <h3>SINTAXE</h3>
            </li>

            <li 
              className={`tab ${activeTab === "semantic" ? "active-tab" : "inactive-tab"}`} 
              onClick={() => setActiveTab("semantic")}
            >
              <h3>SEMÂNTICO</h3>
            </li>

            <li 
              className={`tab ${activeTab === "variables" ? "active-tab" : "inactive-tab"}`} 
              onClick={() => setActiveTab("variables")}
            >
              <h3>VARIÁVEIS</h3>
            </li>
          </ul>

          <div className={activeTab === "lexical" ? "active-table" : "inactive-table"}>
            <table>
              <thead>
                <tr>
                  <th>LEXEMA</th>
                  <th>TOKEN</th>
                  <th>LINHA</th>
                  <th>COLUNA</th>
                </tr>
              </thead>
              <tbody>
                {compiledCode.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.value}</td>
                      <td>{dictionary[data.token]}</td>
                      <td>{data.line}</td>
                      <td>{data.column}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={activeTab === "syntax" ? "active-table" : "inactive-table"}>
            <table>
              <thead>
                <tr>
                  <th>ERRO</th>
                  <th>LINHA</th>
                  <th>COLUNA</th>
                </tr>
              </thead>
              <tbody>
                {syntaxErrors.length ? (
                  syntaxErrors.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.error}</td>
                        <td>{data.line}</td>
                        <td>{data.column}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Nenhum erro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table> 
          </div>

          <div className={activeTab === "variables" ? "active-table" : "inactive-table"}>
            <table>
              <thead>
                <tr>
                  <th>LEXEMA</th>
                  <th>TOKEN</th>
                  <th>LINHA</th>
                  <th>COLUNA</th>
                </tr>
              </thead>
              <tbody>
                {variablesTable.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.value}</td>
                      <td>{dictionary[data.token]}</td>
                      <td>{data.line}</td>
                      <td>{data.column}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </aside>
      
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
