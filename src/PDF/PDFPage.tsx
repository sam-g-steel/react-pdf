import React from "react";

export const PaperSize = {
    flip: (size: [number, number]) => {
        return [size[1], size[0]];
    },
    Letter: [8.5, 11],
    HalfLetter: [8.5, 5.5],
};

interface PDFPageProps {
    pageSize?: [number, number];
}

export function pointsToInches(points: number) {
    return points / 72;
}

export class PDFPage extends React.Component<PDFPageProps> {
    static defaultProps = {
        pageSize: PaperSize.Letter,
    };

    props: any & PDFPageProps;
    render() {
        return (
            <div
                style={{
                    background: "#ffffff",
                    height: this.props.pageSize[1] * 3 + "rem",
                    width: this.props.pageSize[0] * 3 + "rem",
                    padding: "1rem",
                    margin: "2rem",
                    fontSize: pointsToInches(1) * 3 + "rem",
                    boxShadow:
                        "0 0px 8px 0 rgba(0, 0, 0, 0.3), 0 0px 20px 0 rgba(0, 0, 0, 0.25)",
                }}
            >
                {this.props.children}
            </div>
        );
    }
}
