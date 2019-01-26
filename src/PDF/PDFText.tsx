import React from "react";
import { pointsToInches } from "./PDFPage";

interface PDFTextProps {
    bold: boolean;
    italic: boolean;
    fontSize?: number;
    text: string;
}

export class PDFText extends React.Component<PDFTextProps> {
    static defaultProps = {
        bold: false,
        fontSize: 8,
        italic: false,
        text: "",
    };

    props: any & PDFTextProps;
    render() {
        return (
            <span
                style={{
                    fontSize: pointsToInches(this.props.fontSize) * 3 + "rem",
                    fontStyle: this.props.italic ? "italic" : "normal",
                    fontWeight: this.props.bold ? "bold" : "normal",
                }}
            >
                {this.props.text}
            </span>
        );
    }
}
