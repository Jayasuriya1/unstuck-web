import { useState } from 'react';

import {
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    Link,
    useParams,
} from 'react-router-dom';

import {
    createTaskStep,
    deleteTaskStep,
    deconstructStep,
    getTask,
    getTaskSteps,
    updateTaskStep,
    deconstructTask,
} from './taskApi';

import type {
    TaskStepTreeNode,
} from './taskApi';

import {
    useDispatch,
    useSelector,
} from 'react-redux';

import { TaskStepTree } from './TaskStepTree';

import type { RootState } from '../../app/store';

import type { FormEvent } from 'react';

import { FocusPage } from '../focus/FocusPage';

import {
    enterFocusMode,
    setCurrentStepIndex,
} from '../focus/focusSlice';
import { PageState } from '../../components/PageState';
import { buildTaskTree } from './buildTaskTree';
import { getExecutableSteps } from './getExecutableSteps';
import { TimeInsight } from './TimeInsight';
import { TaskPageWrapper } from './styles/TaskPageStyle';

export function TaskPage() {
    const { taskId } = useParams<{
        taskId: string;
    }>();

    const queryClient = useQueryClient();

    const dispatch = useDispatch();

    const isFocusMode = useSelector(
        (state: RootState) =>
            state.focus.isFocusMode,
    );

    // ----------------------------------------
    // Local UI state
    // ----------------------------------------

    const [stepTitle, setStepTitle] = useState('');
    // const [estimatedMinutes, setEstimatedMinutes] =
    //     useState(5);

    // ----------------------------------------
    // Get task
    // ----------------------------------------

    const taskQuery = useQuery({
        queryKey: ['tasks', taskId],

        queryFn: () => getTask(taskId!),

        enabled: Boolean(taskId),
    });



    // ----------------------------------------
    // Get task steps
    // ----------------------------------------

    const stepsQuery = useQuery({
        queryKey: ['tasks', taskId, 'steps'],

        queryFn: () => getTaskSteps(taskId!),

        enabled: Boolean(taskId),
    });

    const tree = buildTaskTree(
        stepsQuery.data ?? [],
    );

    const executableSteps =
        getExecutableSteps(tree);

    console.log('TASK TREE:', tree);


    const task = taskQuery.data;
    const steps = stepsQuery.data ?? [];
    // ----------------------------------------
    // Create step
    // ----------------------------------------

    const createStepMutation = useMutation({
        mutationFn: ({
            taskId,
            title,
            estimatedSeconds,
            position,
            parentStepId,
        }: {
            taskId: string;
            title: string;
            estimatedSeconds?: number;
            position: number;
            parentStepId?: string;
        }) =>
            createTaskStep(taskId, {
                title,
                estimatedSeconds,
                position,
                parentStepId,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });

            setStepTitle('');
        },
    });

    // ----------------------------------------
    // Update step
    // ----------------------------------------

    const updateStepMutation = useMutation({
        mutationFn: ({
            taskId,
            stepId,
            title,
        }: {
            taskId: string;
            stepId: string;
            title: string;
        }) =>
            updateTaskStep(taskId, stepId, {
                title,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    // ----------------------------------------
    // Delete step
    // ----------------------------------------

    const deleteStepMutation = useMutation({
        mutationFn: ({
            taskId,
            stepId,
        }: {
            taskId: string;
            stepId: string;
        }) =>
            deleteTaskStep(taskId, stepId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });


    const deconstructMutation = useMutation({
        mutationFn: ({
            taskId,
            stepId,
        }: {
            taskId: string;
            stepId: string;
        }) => deconstructStep(taskId, stepId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    function handleDeconstructStep(
        step: TaskStepTreeNode,
    ) {
        if (step.children.length > 0) {
            const confirmed = window.confirm(
                'This will replace the existing steps under this item with a new AI breakdown. Any changes you made to those steps will be lost. Continue?',
            );

            if (!confirmed) {
                return;
            }
        }

        deconstructMutation.mutate({
            taskId: taskId!,
            stepId: step.id,
        });
    }

    function handleDeconstructTask() {
        if (steps.length > 0) {
            const confirmed = window.confirm(
                'This will replace the existing steps in this task with a new AI breakdown. Any changes you made to those steps will be lost. Continue?',
            );

            if (!confirmed) {
                return;
            }
        }

        deconstructTaskMutation.mutate();
    }


    const deconstructTaskMutation = useMutation({
        mutationFn: () => deconstructTask(taskId!),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', taskId, 'steps'],
            });
        },
    });

    // ----------------------------------------
    // Loading
    // ----------------------------------------

    if (
        taskQuery.isLoading ||
        stepsQuery.isLoading
    ) {
        return (
            <TaskPageWrapper>
                <PageState
                    title="Loading task..."
                    description="Just a moment."
                />
            </TaskPageWrapper>
        );
    }

    // ----------------------------------------
    // Error
    // ----------------------------------------

    if (
        taskQuery.isError ||
        stepsQuery.isError
    ) {
        return (
            <TaskPageWrapper>
                <PageState
                    title="Couldn't load this task"
                    description="Something went wrong while loading the task."
                    action={
                        <button
                            type="button"
                            className="button button-secondary"
                            onClick={() => {
                                taskQuery.refetch();
                                stepsQuery.refetch();
                            }}
                        >
                            Try again
                        </button>
                    }
                />
            </TaskPageWrapper>
        );
    }

    if (!task) {
        return (
            <TaskPageWrapper>
                <PageState
                    title="Task not found"
                    description="The requested task could not be found."
                />
            </TaskPageWrapper>
        );
    }



    // ----------------------------------------
    // Create step handler
    // ----------------------------------------

    function handleCreateStep(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        if (!stepTitle.trim()) {
            return;
        }

        createStepMutation.mutate({
            taskId: taskId!,
            title: stepTitle.trim(),
            position: steps.length,
        });
    }

    function handleEditStep(
        step: TaskStepTreeNode,
    ) {
        const newTitle = window.prompt(
            'Edit step title',
            step.title,
        );

        if (!newTitle || !newTitle.trim()) {
            return;
        }

        updateStepMutation.mutate({
            taskId: taskId!,
            stepId: step.id,
            title: newTitle.trim(),
        });
    }

    function handleDeleteStep(
        step: TaskStepTreeNode,
    ) {
        const confirmed = window.confirm(
            'Delete this step?',
        );

        if (!confirmed) {
            return;
        }

        deleteStepMutation.mutate({
            taskId: taskId!,
            stepId: step.id,
        });
    }

    function handleAddChild(
        parentStep: TaskStepTreeNode,
    ) {
        const title = window.prompt(
            `Add a child step to "${parentStep.title}"`,
        );

        if (!title || !title.trim()) {
            return;
        }

        createStepMutation.mutate({
            taskId: taskId!,
            title: title.trim(),
            position: parentStep.children.length,
            parentStepId: parentStep.id,
        });
    }



    if (isFocusMode) {
        return (
            <FocusPage taskId={taskId!} />
        );
    }
    // ----------------------------------------
    // UI
    // ----------------------------------------

    return (
        <TaskPageWrapper>
            <Link
                to="/tasks"
                className="back-link"
            >
                ← Back to tasks
            </Link>

            <section className="task-hero">
                <div className="task-hero-content">
                    <div>
                        <p className="eyebrow">
                            Task
                        </p>

                        <h1 className="task-page-title">
                            {task.title}
                        </h1>

                        {task.description && (
                            <p className="task-page-description">
                                {task.description}
                            </p>
                        )}

                        <div className="task-meta">
                            <span>
                                Level {task.overwhelmLevel}
                            </span>

                            <span>
                                {task.status}
                            </span>
                        </div>
                    </div>

                    <div className="task-hero-actions">
                        {!task.aiDeconstructed && (
                            <button
                                type="button"
                                className="button button-secondary"
                                onClick={handleDeconstructTask}
                                disabled={deconstructTaskMutation.isPending}
                            >
                                {deconstructTaskMutation.isPending
                                    ? 'Breaking down...'
                                    : 'Break down task by AI'}
                            </button>
                        )}

                        <button
                            type="button"
                            className="button button-primary focus-button"
                            disabled={executableSteps.length === 0}
                            onClick={() => {
                                if (executableSteps.length === 0) {
                                    return;
                                }

                                dispatch(setCurrentStepIndex(0));
                                dispatch(enterFocusMode());
                            }}
                        >
                            Start Focus Mode 🎯
                        </button>
                    </div>
                </div>
            </section>

            <section className="task-section">
                <div className="section-heading">
                    <h2>Steps</h2>

                    <p className="muted">
                        {steps.length === 0
                            ? 'Break this task into small actions.'
                            : `${steps.length} ${steps.length === 1
                                ? 'step'
                                : 'steps'
                            }`}
                    </p>
                </div>

                {steps.length === 0 ? (
                    <div className="card empty-state">
                        <p className="empty-state-title">
                            No steps yet 🌱
                        </p>

                        <p>
                            Add the first small action below.
                        </p>
                    </div>
                ) : (
                    <TaskStepTree
                        nodes={tree}
                        onEdit={handleEditStep}
                        onDelete={handleDeleteStep}
                        onAddChild={handleAddChild}
                        onDeconstruct={handleDeconstructStep}
                    />
                )}
            </section>

            <TimeInsight steps={steps} />
            <section className="task-section">
                <div className="card add-step-card">
                    <div className="section-heading">
                        <h2>
                            Add a step
                        </h2>

                        <p className="muted">
                            What's the next small action?
                        </p>
                    </div>

                    <form
                        className="add-step-form"
                        onSubmit={handleCreateStep}
                    >
                        <div className="form-group">
                            <label
                                htmlFor="step-title"
                                className="form-label"
                            >
                                What needs to happen?
                            </label>

                            <input
                                id="step-title"
                                className="form-input"
                                value={stepTitle}
                                onChange={(event) =>
                                    setStepTitle(
                                        event.target.value,
                                    )
                                }
                                placeholder="e.g. Create the project folder"
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="submit"
                                className="button button-primary"
                                disabled={
                                    !stepTitle.trim() ||
                                    createStepMutation.isPending
                                }
                            >
                                {createStepMutation.isPending
                                    ? 'Adding...'
                                    : 'Add step'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </TaskPageWrapper>
    );
}