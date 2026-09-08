import { apiClient } from '../../api/client';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  overwhelmLevel: number;
  status: 'active' | 'completed' | 'archived';
  aiDeconstructed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStep {
  id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'active' | 'completed' | 'parked';
  estimatedSeconds: number | null;
  actualSeconds: number | null;
  depth: number;
  position: number;
  parentStepId: string | null;
  taskId: string;
  aiDeconstructed: boolean;
}

export interface TaskStepTreeNode extends TaskStep {
  children: TaskStepTreeNode[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  overwhelmLevel: number;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  overwhelmLevel?: number;
  status?: Task['status'];
}

export interface CreateStepInput {
  title: string;
  description?: string;
  estimatedSeconds?: number;
  position: number;
  parentStepId?: string;
}

export interface UpdateStepInput {
  title?: string;
  description?: string;
  estimatedSeconds?: number;
  status?: TaskStep['status'];
  position?: number;
  actualSeconds?: number;
}

export interface DeconstructStepResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStep['status'];
  estimatedSeconds: number | null;
  actualSeconds: number | null;
  depth: number;
  position: number;
  taskId: string;
  parentStepId: string | null;
  createdAt: string;
  updatedAt: string;
}

// TASKS

// GET     /tasks
// GET     /tasks/:taskId
// POST    /tasks
// PATCH   /tasks/:taskId
// DELETE  /tasks/:taskId


// STEPS

// GET     /tasks/:taskId/steps
// POST    /tasks/:taskId/steps
// PATCH   /tasks/:taskId/steps/:stepId
// DELETE  /tasks/:taskId/steps/:stepId

//Task API functions
export async function getTasks(): Promise<Task[]> {
  const response = await apiClient.get<Task[]>('/tasks');

  return response.data;
}

export async function getTask(taskId: string): Promise<Task> {
  const response = await apiClient.get<Task>(`/tasks/${taskId}`);

  return response.data;
}

export async function createTask(
  input: CreateTaskInput,
): Promise<Task> {
  const response = await apiClient.post<Task>('/tasks', input);

  return response.data;
}

export async function updateTask(
  taskId: string,
  input: UpdateTaskInput,
): Promise<Task> {
  const response = await apiClient.patch<Task>(
    `/tasks/${taskId}`,
    input,
  );

  return response.data;
}

export async function deleteTask(taskId: string): Promise<void> {
  await apiClient.delete(`/tasks/${taskId}`);
}

//Task Step API functions

export async function getTaskSteps(
  taskId: string,
): Promise<TaskStep[]> {
  const response = await apiClient.get<TaskStep[]>(
    `/tasks/${taskId}/steps`,
  );

  return response.data;
}

export async function createTaskStep(
  taskId: string,
  input: CreateStepInput,
): Promise<TaskStep> {
  const response = await apiClient.post<TaskStep>(
    `/tasks/${taskId}/steps`,
    input,
  );

  return response.data;
}

export async function updateTaskStep(
  taskId: string,
  stepId: string,
  input: UpdateStepInput,
): Promise<TaskStep> {
  const response = await apiClient.patch<TaskStep>(
    `/tasks/${taskId}/steps/${stepId}`,
    input,
  );

  return response.data;
}

export async function deleteTaskStep(
  taskId: string,
  stepId: string,
): Promise<void> {
  await apiClient.delete(
    `/tasks/${taskId}/steps/${stepId}`,
  );
}


export async function deconstructStep(
  taskId: string,
  stepId: string,
) {
  const response = await apiClient.post<DeconstructStepResponse[]>(
    '/ai/deconstruct',
    {
      taskId,
      stepId,
    },
  );

  return response.data;
}

export async function deconstructTask(
  taskId: string,
): Promise<DeconstructStepResponse[]> {
  const response = await apiClient.post<DeconstructStepResponse[]>(
    '/ai/deconstruct-task',
    {
      taskId,
    },
  );

  return response.data;
}