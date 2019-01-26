import React from "react";
import ReactDOM from "react-dom";
import { PDFPage, PaperSize } from "./PDF/PDFPage";
import { PDFText } from "./PDF/PDFText";

import "./styles.css";

const { flip } = PaperSize;

function App() {
    return (
        <div className="App">
            <br />
            <b>Hello CodeSandbox</b>
            <PDFPage pageSize={flip(PaperSize.Letter)}>
                <PDFText fontSize={12} text="Dredging Plot" />
            </PDFPage>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
