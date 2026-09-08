import type { TaskStep } from './taskApi';

interface TimeInsight {
    completedSteps: number;
    totalEstimatedSeconds: number;
    totalActualSeconds: number;
    differenceSeconds: number;
}

export function calculateTimeInsight(
    steps: TaskStep[],
): TimeInsight {
    const completedEstimatedSteps =
        steps.filter(
            (step) =>
                step.status === 'completed' &&
                step.estimatedSeconds !== null &&
                step.actualSeconds !== null,
        );

    const totalEstimatedSeconds =
        completedEstimatedSteps.reduce(
            (total, step) =>
                total + step.estimatedSeconds!,
            0,
        );

    const totalActualSeconds =
        completedEstimatedSteps.reduce(
            (total, step) =>
                total + step.actualSeconds!,
            0,
        );

    return {
        completedSteps:
            completedEstimatedSteps.length,

        totalEstimatedSeconds,

        totalActualSeconds,

        differenceSeconds:
            totalActualSeconds -
            totalEstimatedSeconds,
    };
}