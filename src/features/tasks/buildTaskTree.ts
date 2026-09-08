import type {
  TaskStep,
  TaskStepTreeNode,
} from './taskApi';

export function buildTaskTree(
  steps: TaskStep[],
): TaskStepTreeNode[] {
  const nodeMap = new Map<
    string,
    TaskStepTreeNode
  >();

  // 1. Convert every step into a tree node
  for (const step of steps) {
    nodeMap.set(step.id, {
      ...step,
      children: [],
    });
  }

  const roots: TaskStepTreeNode[] = [];

  // 2. Connect children to their parents
  for (const step of steps) {
    const node = nodeMap.get(step.id)!;

    if (step.parentStepId === null) {
      roots.push(node);
      continue;
    }

    const parent = nodeMap.get(
      step.parentStepId,
    );

    if (parent) {
      parent.children.push(node);
    }
  }

  // 3. Keep sibling order
  const sortByPosition = (
    a: TaskStepTreeNode,
    b: TaskStepTreeNode,
  ) => a.position - b.position;

  roots.sort(sortByPosition);

  for (const node of nodeMap.values()) {
    node.children.sort(sortByPosition);
  }

  return roots;
}