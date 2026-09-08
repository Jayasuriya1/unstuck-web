import type { ReactNode } from 'react';

interface PageStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageState({
  title,
  description,
  action,
}: PageStateProps) {
  return (
    <div className="card page-state">
      <h2 className="page-state-title">
        {title}
      </h2>

      {description && (
        <p className="page-state-description">
          {description}
        </p>
      )}

      {action && (
        <div className="page-state-action">
          {action}
        </div>
      )}
    </div>
  );
}