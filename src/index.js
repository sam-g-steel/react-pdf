import React from "react";
import ReactDOM from "react-dom";
import { PDFPage, PaperSize } from "./PDF/PDFPage";
import { PDFText } from "./PDF/PDFText";
import { PDFImage } from "./PDF/PDFImage";
import { ReportFooter } from "./Report/ReportFooter";

import {} from "./PDF/PDFInstructionBuilder";

import "./styles.css";

import { DQMLogo } from "./DQMLogo";
import { ACELogo } from "./ACELogo";

const { flip } = PaperSize;

function App() {
    return (
        <div className="App">
            <br />
            <b>Hello CodeSandbox</b>

            <PDFPage pageSize={flip(PaperSize.Letter)}>
                {/* Header */}
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.66 }}>
                        <PDFImage src={ACELogo} height={33} />
                        <div
                            style={{
                                paddingLeft: "1em",
                                display: "inline-block",
                            }}
                        >
                            <PDFText bold italic fontSize={8} text="DREDGING" />
                            <br />
                            <PDFText bold italic fontSize={8} text="QUALITY" />
                            <br />
                            <PDFText bold italic fontSize={8} text="MANAGEMENT" />
                        </div>
                        <br />
                        <PDFText fontSize={8} text="US Army Corps of Engineers" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <br />
                        <br />
                        <PDFText bold fontSize={18} text="Cumulative Dredging Plot" />
                    </div>
                    <div style={{ flex: 0.5 }}>
                        <PDFImage src={DQMLogo} height={48} />
                    </div>
                </div>

                <hr />

                {/* Header 2 */}
                <br />
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.66 }}>
                        <PDFText fontSize={10} text="Phone: (877)840-8024" />
                        <br />
                        <PDFText fontSize={10} text="Email: DQM-Support@usace.army.mil" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <PDFText fontSize={10} text="Plant: Columba " />
                        <PDFText fontSize={10} italic text="(Hopper)" />
                        <br />
                        <PDFText fontSize={10} text="1 Day Tracking 7/12/2018 - 7/13/2018" />
                    </div>
                    <div style={{ flex: 0.5 }}>
                        <PDFText fontSize={10} text="Project: Crazy Bay Reach 4" />
                        <br />
                        <PDFText fontSize={10} text="Contract: W11234-20-C-0236" />
                    </div>
                </div>

                {/* Images and legend */}

                <br />
                <br />
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 3.33, opacity: 0.1 }}>
                        <PDFImage src={ACELogo} height={420} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <PDFText fontSize={10} text="[=] Start" />
                        <br />
                        <br />
                        <PDFText fontSize={10} text="[>] End" />
                        <br />
                        <br />
                        <PDFText fontSize={10} text="[=]-+-[>] Cycle 45" />
                        <br />
                        <br />
                        <PDFText fontSize={10} text="[=]-+-[>] Cycle 46" />
                        <br />
                        <br />
                        <PDFText fontSize={10} text="[=]-+-[>] Cycle 47" />
                        <br />
                        <br />
                        <PDFText fontSize={10} text="[=]-+-[>] Cycle 48" />
                    </div>
                </div>

                {/* Footer */}
                <ReportFooter />
            </PDFPage>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
