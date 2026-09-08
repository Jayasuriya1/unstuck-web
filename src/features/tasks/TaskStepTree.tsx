import { useState } from 'react';

import type { TaskStepTreeNode } from './taskApi';

interface TaskStepTreeProps {
  nodes: TaskStepTreeNode[];
  onEdit: (step: TaskStepTreeNode) => void;
  onDelete: (step: TaskStepTreeNode) => void;
  onAddChild: (step: TaskStepTreeNode) => void;
  onDeconstruct: (step: TaskStepTreeNode) => void;
}

export function TaskStepTree({
  nodes,
  onEdit,
  onDelete,
  onAddChild,
  onDeconstruct,
}: TaskStepTreeProps) {
  return (
    <div className="task-step-tree">
      {nodes.map((node) => (
        <TaskStepNode
          key={node.id}
          node={node}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
          onDeconstruct={onDeconstruct}
        />
      ))}
    </div>
  );
}

interface TaskStepNodeProps {
  node: TaskStepTreeNode;
  onEdit: (step: TaskStepTreeNode) => void;
  onDelete: (step: TaskStepTreeNode) => void;
  onAddChild: (step: TaskStepTreeNode) => void;
  onDeconstruct: (step: TaskStepTreeNode) => void;
}

function TaskStepNode({
  node,
  onEdit,
  onDelete,
  onAddChild,
  onDeconstruct,
}: TaskStepNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = node.children.length > 0;

  function formatEstimate(seconds: number) {
    const minutes = Math.ceil(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${remainingMinutes} min`;
  }

  return (
    <div className="task-step-node">
      <div className="task-step-row">
        {hasChildren ? (
          <button
            type="button"
            className="task-step-expand"
            onClick={() =>
              setIsExpanded((current) => !current)
            }
            aria-label={
              isExpanded
                ? 'Collapse step'
                : 'Expand step'
            }
          >
            {isExpanded ? '▾' : '▸'}
          </button>
        ) : (
          <span className="task-step-expand-placeholder" />
        )}

        <div className="task-step-content">
          <div className="task-step-title">
            {node.title}
          </div>

          <div className="task-step-meta">
            <span
              className={`task-step-status task-step-status-${node.status}`}
            >
              {node.status}
            </span>

            {node.estimatedSeconds !== null && (
              <span>
                ⏱ Estimated {formatEstimate(node.estimatedSeconds)}
              </span>
            )}
          </div>

          {node.description && (
            <div className="task-step-description">
              {node.description}
            </div>
          )}
        </div>

        <div className="task-step-actions">
          {node.depth < 3 && !node.aiDeconstructed && (
            <button
              type="button"
              className="task-step-action task-step-action-ai"
              onClick={() => onDeconstruct(node)}
            >
              Break down item by AI
            </button>
          )}

          {node.depth < 3 && (
            <button
              type="button"
              className="task-step-action"
              onClick={() => onAddChild(node)}
            >
              + Child
            </button>
          )}

          <button
            type="button"
            className="task-step-action"
            onClick={() => onEdit(node)}
          >
            Edit
          </button>

          <button
            type="button"
            className="task-step-action task-step-action-danger"
            onClick={() => onDelete(node)}
          >
            Delete
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="task-step-children">
          {node.children.map((child) => (
            <TaskStepNode
              key={child.id}
              node={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              onDeconstruct={onDeconstruct}
            />
          ))}
        </div>
      )}
    </div>
  );
}