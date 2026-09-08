import type { TaskStep } from './taskApi';
import { calculateTimeInsight } from './timeInsightCalculator';

// import {
//     calculateTimeInsight,
// } from './timeInsight';

interface TimeInsightProps {
    steps: TaskStep[];
}

function formatDuration(
    seconds: number,
): string {
    const minutes = Math.round(
        seconds / 60,
    );

    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(
        minutes / 60,
    );

    const remainingMinutes =
        minutes % 60;

    if (remainingMinutes === 0) {
        return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
}

export function TimeInsight({
    steps,
}: TimeInsightProps) {
    const insight =
        calculateTimeInsight(steps);

    if (insight.completedSteps === 0) {
        return (
            <section className="task-section">
                <div className="card time-insight">
                    <div className="section-heading">
                        <h2>
                            Time insight ⏱️
                        </h2>
                    </div>

                    <p className="muted">
                        Complete a few estimated
                        steps to see how your
                        actual time compares.
                    </p>
                </div>
            </section>
        );
    }

    const difference =
        Math.abs(
            insight.differenceSeconds,
        );

    let message = '';

    if (insight.differenceSeconds > 0) {
        message =
            `You spent ${formatDuration(
                difference,
            )} more than estimated.`;
    } else if (
        insight.differenceSeconds < 0
    ) {
        message =
            `You finished ${formatDuration(
                difference,
            )} faster than estimated.`;
    } else {
        message =
            'Your actual time matched the estimate.';
    }

    return (
        <section className="task-section">
            <div className="card time-insight">
                <div className="section-heading">
                    <h2>
                        Time insight ⏱️
                    </h2>

                    <p className="muted">
                        Based on{' '}
                        {insight.completedSteps}{' '}
                        completed{' '}
                        {insight.completedSteps === 1
                            ? 'step'
                            : 'steps'}
                    </p>
                </div>

                <div className="time-insight-summary">
                    <div>
                        <span className="time-insight-label">
                            Estimated
                        </span>

                        <strong>
                            {formatDuration(
                                insight.totalEstimatedSeconds,
                            )}
                        </strong>
                    </div>

                    <div>
                        <span className="time-insight-label">
                            Actual
                        </span>

                        <strong>
                            {formatDuration(
                                insight.totalActualSeconds,
                            )}
                        </strong>
                    </div>
                </div>

                <p className="time-insight-message">
                    {message}
                </p>
            </div>
        </section>
    );
}