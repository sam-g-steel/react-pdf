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
        fontSize: 8,
        text: "",
    };

    props: any & PDFPageProps;
    render() {
        return (
            <span
                style={{
                    fontSize: pointsToInches(this.props.fontSize) * 3 + "rem",
                }}
            >
                {this.props.text}
            </span>
        );
    }
}
