import React from "react";
import ReactDOM from "react-dom";
import { PDFPage, PaperSize } from "./PDF/PDFPage";
import { PDFText } from "./PDF/PDFText";

import "./styles.css";

import { DQMLogo } from "./DQMLogo";

const { flip } = PaperSize;

function App() {
    return (
        <div className="App">
            <br />
            <b>Hello CodeSandbox</b>
            <PDFPage pageSize={flip(PaperSize.Letter)}>
                {/* Header */}
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0 }}>
                        <PDFText bold italic fontSize={8} text="DREDGING" />
                        <br />
                        <PDFText bold italic fontSize={8} text="QUALITY" />
                        <br />
                        <PDFText bold italic fontSize={8} text="MANAGEMENT" />
                    </div>
                    <div style={{ maxWidth: "32%" }}>
                        <img src={DQMLogo} style={{ height: "33%" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <PDFText bold fontSize={12} text="Cumulative Dredging Plot" />
                        <br />
                        <br />
                        <PDFText fontSize={12} text="Plant: Columba " />
                        <PDFText fontSize={12} italic text="(Hopper)" />
                        <br />
                        <PDFText fontSize={12} text="1 Day Tracking 7/12/2018 - 7/13/2018" />
                    </div>
                    <div style={{ flex: 0.5 }}>
                        <PDFText bold fontSize={12} text="Dredging Plot" />
                    </div>
                </div>
            </PDFPage>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
