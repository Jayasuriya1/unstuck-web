import type { TaskStep } from '../tasks/taskApi';

import { formatDuration } from './formatDuration';

interface FocusStepProps {
    step: TaskStep;
    currentStep: number;
    totalSteps: number;
    elapsedSeconds: number;
    isCompleting: boolean;
    onDone: () => void;
    onPark: () => void;
}

export function FocusStep({
    step,
    currentStep,
    totalSteps,
    elapsedSeconds,
    isCompleting,
    onDone,
    onPark,
}: FocusStepProps) {
    return (
        <div className="focus-step">
            <div className="focus-progress">
                Step {currentStep + 1} of {totalSteps}
            </div>

            <div className="focus-content">
                <h1 className="focus-title">
                    {step.title}
                </h1>

                {step.description && (
                    <p className="focus-description">
                        {step.description}
                    </p>
                )}

                <div
                    className={`focus-timer ${step.estimatedSeconds !== null &&
                        elapsedSeconds > step.estimatedSeconds
                        ? 'focus-timer-over'
                        : ''
                        }`}
                >
                    {formatDuration(elapsedSeconds)}
                </div>

                {step.estimatedSeconds !== null && (
                    <p className="focus-estimate">
                        Estimated ·{' '}
                        {Math.round(
                            step.estimatedSeconds / 60,
                        )}{' '}
                        min
                    </p>
                )}

                <button
                    type="button"
                    className="button button-primary focus-done-button"
                    disabled={isCompleting}
                    onClick={onDone}
                >
                    {isCompleting
                        ? 'Completing...'
                        : '✓ Done'}
                </button>

                <button
                    type="button"
                    className="button button-secondary focus-park-button"
                    disabled={isCompleting}
                    onClick={onPark}
                >
                    Park It and Continue
                </button>
            </div>
        </div>
    );
}