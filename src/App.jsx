import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ToastContainer, toast } from 'react-toastify';
import lexr from 'lexr';

import { FiChevronsLeft, FiChevronsRight, FiGithub, FiPlay, FiUpload } from 'react-icons/fi';

import './global.scss';
import 'react-toastify/dist/ReactToastify.css';

// IMPORT ALL TOKENS, KEYWORDS, ERRORS, TYPES
import { dictionary, tokens, keywords, errors, types } from './utils/Lexical';
import { analyzer } from './utils/Syntax/analyzer';


function App() {
  // "program correto;\n int a, b, c;\n boolean d, e, f;\n int a, b, c;\n procedure proc(var a1 : int);\n int a, b, c;\n boolean d, e, f;\n begin\n a:=1;\n if (a<1) then\n a:=12;\n end\n begin\n a:=2;\n b:=10;\n c:=11;\n a:=b+c;\n d:=true;\n e:=false;\n f:=true;\n read(a);\n write(b);\n if (d) then\n begin\n a:=20;\n b:=10*c;\n c:=a/b;\n end\n while (a>1) do\n begin\n if (b>10) then\n b:=2;\n a:=a-1;\n end\n end.\n"
  const [editorText, setEditorText] = useState("program correto;\n int a, b, c;\n boolean d, e, f;\n begin\n a:=2;\n b:=10;\n c:=11;\n a:=b+c;\n d:=true;\n e:=false;\n f:=true;\n read(a);\n write(b);\n if (d) then\n begin\n a:=20;\n b:=10*c;\n c:=a/b;\n end\n while (a>1) do\n begin\n if (b>10) then\n b:=2;\n a:=a-1;\n end\n end.\n");
  const [compiledCode, setCompiledCode] = useState([]);
  const [variablesTable, setVariablesTable] = useState([]);
  const [syntaxErrors, setSyntaxErrors] = useState([]);
  const [semanticErrors, setSemanticErrors] = useState([]);
  const [generatedCode, setGeneratedCode] = useState([]);
  const [dataTable, setDataTable] = useState([]);
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
    let editorTextLines = editorText.split("\n");
    let compiledCodeLines = [];
    let updatedVariablesTable = [];
    let updatedSyntaxErrors = [];
    let updatedSemanticErrors = [];
    let updatedGeneratedCode = [];
    let updatedDataTable = [];

    editorTextLines.forEach((line, lineIndex) => {
      const response = tokenizer.tokenize(line);

      response.forEach((column, columnIndex) => {
        response[columnIndex] = { ...column, line: lineIndex + 1, column: columnIndex + 1 };
      });
      
      Array.prototype.push.apply(compiledCodeLines, response);
    });

    //updateCompiledCode(compiledCodeLines);
    setCompiledCode(compiledCodeLines);
    
    analyzer(0, compiledCodeLines, updatedVariablesTable, updatedSyntaxErrors, updatedSemanticErrors, updatedGeneratedCode, updatedDataTable);

    setVariablesTable(updatedVariablesTable);
    setSyntaxErrors(updatedSyntaxErrors);
    setSemanticErrors(updatedSemanticErrors);
    setGeneratedCode(updatedGeneratedCode);
    setDataTable(updatedDataTable);
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

          <div className={activeTab === "lexical" ? "active-table lexical-table" : "inactive-table"}>
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

          <div className={activeTab === "syntax" ? "active-table syntax-table" : "inactive-table"}>
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
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table> 
          </div>

          <div className={activeTab === "semantic" ? "active-table semantic-table" : "inactive-table"}>
            <table>
              <thead>
                <tr>
                  <th>LINHA</th>
                  <th>ERRO</th>
                </tr>
              </thead>
              <tbody>
                {semanticErrors.length ? (
                  semanticErrors.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{data.line}</td>
                        <td>{data.error}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td></td>
                    <td>Nenhum erro encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table> 
          </div>

          <div className={activeTab === "variables" ? "active-table variables-table" : "inactive-table"}>
            <table>
              <thead>
                <tr>
                  <th>TIPO</th>
                  <th>ID</th>
                  <th>VALOR</th>
                  <th>LINHA</th>
                  <th>COLUNA</th>
                </tr>
              </thead>
              <tbody>
                {variablesTable.map((variable, index) => {
                  return (
                    <tr key={index}>
                      <td>{variable.type}</td>
                      <td>{variable.value}</td>
                      <td>{variable.data}</td>
                      <td>{variable.line}</td>
                      <td>{variable.column}</td>
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
