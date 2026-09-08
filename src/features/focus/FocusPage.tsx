import {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

import type { RootState } from '../../app/store';

import {
    exitFocusMode,
} from './focusSlice';

import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    getTaskSteps,
    updateTaskStep,
} from '../tasks/taskApi';

import { FocusStep } from './FocusStep';

import { buildTaskTree } from '../tasks/buildTaskTree';
import { getExecutableSteps } from '../tasks/getExecutableSteps';
import { FocusPageWrapper } from './styles/FocusPageStyle';

interface FocusPageProps {
    taskId: string;
}

export function FocusPage({
    taskId,
}: FocusPageProps) {
    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    // ----------------------------------------
    // Focus state
    // ----------------------------------------

    const currentStepIndex = useSelector(
        (state: RootState) =>
            state.focus.currentStepIndex,
    );

    // ----------------------------------------
    // Focus session progress
    // ----------------------------------------

    const [totalFocusSteps, setTotalFocusSteps] =
        useState<number | null>(null);

    const [processedCount, setProcessedCount] =
        useState(0);

    // ----------------------------------------
    // Timer state
    // ----------------------------------------

    const [elapsedSeconds, setElapsedSeconds] =
        useState(0);

    const stepStartedAtRef =
        useRef<number | null>(null);

    // ----------------------------------------
    // Get task steps
    // ----------------------------------------

    const stepsQuery = useQuery({
        queryKey: ['tasks', taskId, 'steps'],

        queryFn: () => getTaskSteps(taskId),
    });

    const tree = buildTaskTree(
        stepsQuery.data ?? [],
    );

    const executableSteps =
        getExecutableSteps(tree);

    const currentStep =
        executableSteps[currentStepIndex];

    // ----------------------------------------
    // Activate step
    // ----------------------------------------

    const activateStepMutation = useMutation({
        mutationFn: (stepId: string) =>
            updateTaskStep(taskId, stepId, {
                status: 'active',
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    // ----------------------------------------
    // Complete step
    // ----------------------------------------

    const completeStepMutation = useMutation({
        mutationFn: ({
            stepId,
            actualSeconds,
        }: {
            stepId: string;
            actualSeconds: number;
        }) =>
            updateTaskStep(taskId, stepId, {
                status: 'completed',
                actualSeconds,
            }),

        onSuccess: () => {
            setProcessedCount(
                (current) => current + 1,
            );

            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    // ----------------------------------------
    // Park step
    // ----------------------------------------

    const parkStepMutation = useMutation({
        mutationFn: (stepId: string) =>
            updateTaskStep(taskId, stepId, {
                status: 'parked',
            }),

        onSuccess: () => {
            setProcessedCount(
                (current) => current + 1,
            );

            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    function handleParkStep() {
        if (!currentStep) {
            return;
        }

        parkStepMutation.mutate(currentStep.id);
    }

    // ----------------------------------------
    // Preserve original total
    // ----------------------------------------

    useEffect(() => {
        if (
            totalFocusSteps === null &&
            executableSteps.length > 0
        ) {
            setTotalFocusSteps(
                executableSteps.length,
            );
        }
    }, [
        executableSteps.length,
        totalFocusSteps,
    ]);

    // ----------------------------------------
    // Timer + activate current step
    // ----------------------------------------

    useEffect(() => {
        if (!currentStep) {
            return;
        }

        activateStepMutation.mutate(
            currentStep.id,
        );

        const startedAt = Date.now();

        stepStartedAtRef.current =
            startedAt;

        setElapsedSeconds(0);

        const intervalId =
            window.setInterval(() => {
                const elapsed = Math.floor(
                    (Date.now() - startedAt) /
                    1000,
                );

                setElapsedSeconds(elapsed);
            }, 1000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [currentStep?.id]);

    // ----------------------------------------
    // Complete current step
    // ----------------------------------------

    function handleCompleteStep() {
        if (!currentStep) {
            return;
        }

        const startedAt =
            stepStartedAtRef.current;

        const actualSeconds =
            startedAt
                ? Math.floor(
                    (Date.now() - startedAt) /
                    1000,
                )
                : elapsedSeconds;

        completeStepMutation.mutate({
            stepId: currentStep.id,
            actualSeconds,
        });
    }

    // ----------------------------------------
    // Loading
    // ----------------------------------------

    if (stepsQuery.isLoading) {
        return <p>Loading...</p>;
    }

    // ----------------------------------------
    // Error
    // ----------------------------------------

    if (stepsQuery.isError) {
        return <p>Failed to load steps.</p>;
    }

    // ----------------------------------------
    // No steps
    // ----------------------------------------

    if (!stepsQuery.data || stepsQuery.data.length === 0) {
        return (
            <main>
                <p>No steps available.</p>

                <button
                    type="button"
                    onClick={() => {
                        dispatch(exitFocusMode());
                    }}
                >
                    Exit Focus
                </button>
            </main>
        );
    }

    // ----------------------------------------
    // All actionable steps processed
    // ----------------------------------------

    if (!currentStep) {
        return (
            <FocusPageWrapper>
                <div className="focus-finished">
                    <p className="focus-progress">
                        All done
                    </p>

                    <h1 className="focus-title">
                        You're done 🎉
                    </h1>

                    <p className="focus-description">
                        All actionable steps are complete.
                    </p>

                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => {
                            dispatch(exitFocusMode());
                        }}
                    >
                        Back to task
                    </button>
                </div>
            </FocusPageWrapper>
        );
    }

    // ----------------------------------------
    // UI
    // ----------------------------------------

    return (
        <FocusPageWrapper>
            <div className="focus-container">
                <FocusStep
                    step={currentStep}
                    currentStep={processedCount}
                    totalSteps={
                        totalFocusSteps ??
                        executableSteps.length
                    }
                    elapsedSeconds={elapsedSeconds}
                    isCompleting={
                        completeStepMutation.isPending ||
                        parkStepMutation.isPending
                    }
                    onDone={handleCompleteStep}
                    onPark={handleParkStep}
                />
            </div>

            <button
                type="button"
                className="focus-exit-button"
                onClick={() => {
                    dispatch(exitFocusMode());
                }}
            >
                Exit focus
            </button>
        </FocusPageWrapper>
    );
}