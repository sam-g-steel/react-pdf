import React from "react";
import { pointsToInches } from "./PDFPage";

interface PDFImageProps {
    height?: number;
    width?: number;
    src: string;
}

export class PDFImage extends React.Component<PDFImageProps> {
    static defaultProps = {};

    props: any & PDFImageProps;
    render() {
        return (
            <img
                src={this.props.src}
                style={{
                    height: pointsToInches(this.props.height) * 3 + "rem",
                    width: pointsToInches(this.props.width) * 3 + "rem",
                }}
            />
        );
    }
}
