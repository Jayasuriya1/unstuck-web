import {
  useState,
  type FormEvent,
} from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createTask,
  deleteTask,
  getTasks,
} from './taskApi';
import { TaskListWrapper } from './styles/TaskListPageStyle';

export function TaskListPage() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [overwhelmLevel, setOverwhelmLevel] = useState(3);

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });

      setTitle('');
      setOverwhelmLevel(3);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

  function handleCreateTask(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    createTaskMutation.mutate({
      title: title.trim(),
      overwhelmLevel,
    });
  }

  if (tasksQuery.isLoading) {
    return (
      <TaskListWrapper>
        <div className="page-header">
          <h1 className="page-title">
            My tasks
          </h1>

          <p className="page-description">
            One thing at a time. No pressure.
          </p>
        </div>

        <div className="card empty-state">
          Loading your tasks...
        </div>
      </TaskListWrapper>
    );
  }

  if (tasksQuery.isError) {
    return (
      <TaskListWrapper>
        <div className="page-header">
          <h1 className="page-title">
            My tasks
          </h1>

          <p className="page-description">
            One thing at a time. No pressure.
          </p>
        </div>

        <div className="card empty-state">
          <p>
            We couldn't load your tasks.
          </p>

          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              tasksQuery.refetch()
            }
          >
            Try again
          </button>
        </div>
      </TaskListWrapper>
    );
  }

  const tasks = tasksQuery.data ?? [];

  return (
    <TaskListWrapper>
      <header className="page-header">
        <h1 className="page-title">
          My tasks
        </h1>

        <p className="page-description">
          One thing at a time. No pressure.
        </p>
      </header>

      <section className="dashboard-create card">
        <div className="section-heading">
          <h2>
            Create a task
          </h2>

          <p className="muted">
            Start with the outcome you want.
          </p>
        </div>

        <form
          className="task-create-form"
          onSubmit={handleCreateTask}
        >
          <div className="form-group">
            <label
              htmlFor="task-title"
              className="form-label"
            >
              What do you want to get done?
            </label>

            <input
              id="task-title"
              className="form-input"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Build my portfolio"
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="overwhelm-level"
              className="form-label"
            >
              How overwhelming does this feel?
            </label>

            <select
              id="overwhelm-level"
              className="form-select"
              value={overwhelmLevel}
              onChange={(event) =>
                setOverwhelmLevel(
                  Number(event.target.value),
                )
              }
            >
              <option value={1}>
                1 — Not overwhelming
              </option>

              <option value={2}>
                2 — A little overwhelming
              </option>

              <option value={3}>
                3 — Moderately overwhelming
              </option>

              <option value={4}>
                4 — Very overwhelming
              </option>

              <option value={5}>
                5 — Extremely overwhelming
              </option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="button button-primary"
              disabled={
                !title.trim() ||
                createTaskMutation.isPending
              }
            >
              {createTaskMutation.isPending
                ? 'Creating...'
                : 'Create task'}
            </button>
          </div>
        </form>
      </section>

      <section className="dashboard-tasks">
        <div className="section-heading">
          <h2>
            Your tasks
          </h2>

          <p className="muted">
            {tasks.length === 0
              ? 'Nothing here yet.'
              : `${tasks.length} ${
                  tasks.length === 1
                    ? 'task'
                    : 'tasks'
                }`}
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="card empty-state">
            <p className="empty-state-title">
              No tasks yet 🌱
            </p>

            <p>
              Create your first task above.
            </p>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <article
                key={task.id}
                className="task-card"
              >
                <div className="task-card-main">
                  <div>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="task-card-title"
                    >
                      {task.title}
                    </Link>

                    {task.description && (
                      <p className="task-card-description">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div className="task-card-meta">
                    <span>
                      Level {task.overwhelmLevel}
                    </span>

                    <span>
                      {task.status}
                    </span>
                  </div>
                </div>

                <div className="task-card-actions">
                  <Link
                    to={`/tasks/${task.id}`}
                    className="button button-secondary"
                  >
                    Open task →
                  </Link>

                  <button
                    type="button"
                    className="button button-danger"
                    disabled={
                      deleteTaskMutation.isPending
                    }
                    onClick={() => {
                      const confirmed =
                        window.confirm(
                          'Delete this task?',
                        );

                      if (!confirmed) {
                        return;
                      }

                      deleteTaskMutation.mutate(
                        task.id,
                      );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </TaskListWrapper>
  );
}