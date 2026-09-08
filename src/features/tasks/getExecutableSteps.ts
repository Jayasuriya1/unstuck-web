import type { TaskStepTreeNode } from './taskApi';

export function getExecutableSteps(
  nodes: TaskStepTreeNode[],
): TaskStepTreeNode[] {
  const executableSteps: TaskStepTreeNode[] = [];

  function visit(node: TaskStepTreeNode) {
    if (node.children.length === 0) {
      if (
        node.status !== 'completed' &&
        node.status !== 'parked'
      ) {
        executableSteps.push(node);
      }

      return;
    }

    for (const child of node.children) {
      visit(child);
    }
  }

  for (const node of nodes) {
    visit(node);
  }

  return executableSteps;
}