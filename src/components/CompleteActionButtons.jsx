import {logEvent} from "firebase/analytics";
import {analytics, AnalyticsEvents} from "../analytics/firebase.js";
import React from "react";
import {RefreshIcon} from './Icons/RefreshIcon.jsx'
import {DownloadIcon} from "./Icons/DownloadIcon.jsx";

export const CompleteActionButtons = ({isCompleted, imageSrc, reset, t}) => {
    return (
    isCompleted ? (
        <>
            <a
                onClick={() => logEvent(analytics, AnalyticsEvents.ButtonDownloadClick)}
                href={imageSrc}
                download="CutBG.png"
                aria-label={t("ariaDownloadButton")}
            >
                <button className="absolute bg-accent text-reversed right-4 top-4 p-1 rounded cursor-pointer">
                    <RefreshIcon />
                </button>
            </a>
            <button
                onClick={reset}
                className="absolute bg-accent text-reversed left-4 top-4 p-1 rounded cursor-pointer"
                aria-label={t("ariaRestButton")}
            >
                <DownloadIcon />
            </button>
        </>
    ) : null
    )
}