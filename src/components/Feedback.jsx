import {logEvent} from "firebase/analytics";
import {analytics, AnalyticsEvents} from "../analytics/firebase.js";
import React from "react";

export const Feedback = ({isCompleted, isFeedbackSent, setIsFeedbackSent, t}) => {

    const onLikeClick = () => {
        setIsFeedbackSent(true);
        logEvent(analytics, AnalyticsEvents.ButtonLikeClick)
    }

    const onDislikeClick = () => {
        setIsFeedbackSent(true);
        logEvent(analytics, AnalyticsEvents.ButtonDislikeClick,)
    }

    return (
        isCompleted ? (
            <div className="bg-secondary w-full mt-4 p-4 rounded-lg text-center text-gray-600 text-xs">
                {!isFeedbackSent ? (<div>
                    {t('howIsYourExpirience')}
                    <div className="flex flex-row space-x-1 items-center justify-center mt-2">
                        <button
                            onClick={() => onLikeClick()}
                            className="p-2 rounded bg-accent text-reversed w-38 cursor-pointer"
                            aria-label={t('buttonLike')}
                        >
                            {t('buttonLike')}
                        </button>
                        <button
                            onClick={() => onDislikeClick()}
                            className="bg-accent p-2 rounded text-reversed w-38 cursor-pointer"
                            aria-label={t('buttonDislike')}
                        >
                            {t('buttonDislike')}
                        </button>
                    </div>
                </div>) : (
                    <div>
                        {t('thanksForFeedback')}
                    </div>
                )}
            </div>
        ) : null
    )
}