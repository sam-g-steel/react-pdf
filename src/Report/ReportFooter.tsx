import React from "react";
import { PDFText } from "../PDF/PDFText";

interface ReportFooterProps {
    page: number;
    totalPageCount: number;
}

export function ReportFooter(inputProps: ReportFooterProps) {
    const props = {
        ...{
            page: 1,
            totalPageCount: 1,
        },
        ...inputProps,
    };

    return (
        <div
            style={{
                bottom: "1rem",
                position: "absolute",
                display: "flex",
                width: "100%",
            }}
        >
            <div style={{ flex: 0.5 }}>
                <PDFText fontSize={10} text="DQM Viewer v3.0.11" />
            </div>
            <div style={{ flex: 1.5 }}>
                <PDFText
                    fontSize={10}
                    text="All latitude and longitude coordinates are in WGS84 using NAD83 datum or Geographic"
                />
            </div>
            <div style={{ flex: 0.35 }}>
                <PDFText fontSize={10} text={`Page ${props.page} of ${props.totalPageCount}`} />
            </div>
        </div>
    );
}
