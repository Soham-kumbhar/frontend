import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createProject,
} from './api/projectsApi';

export function CreateProjectPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);

      const project = await createProject({
        name: name.trim(),
        description: description.trim() || undefined,
      });

      navigate(`/projects/${project.id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create project.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page create-project-page">
      <div className="page-heading">
        <div>
          <div className="page-kicker">
            DATA / PROJECTS / CREATE
          </div>

          <h1>CREATE NEW PROJECT</h1>

          <div className="page-description">
            Create a new DATAGIT project workspace.
          </div>
        </div>

        <button
          type="button"
          className="cli-action"
          onClick={() => navigate('/projects')}
        >
          &lt; BACK TO PROJECTS
        </button>
      </div>

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <label htmlFor="project-name">
            PROJECT NAME
          </label>

          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="my-project"
            maxLength={200}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="project-description">
            DESCRIPTION
          </label>

          <textarea
            id="project-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Optional project description..."
            rows={5}
          />
        </div>

        {error && (
          <div className="state-panel state-error">
            <span className="state-label">ERROR</span>

            <span>{error}</span>
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="cli-action secondary-action"
            onClick={() => navigate('/projects')}
            disabled={submitting}
          >
            CANCEL
          </button>

          <button
            type="submit"
            className="cli-action"
            disabled={
              submitting ||
              !name.trim()
            }
          >
            {submitting
              ? 'CREATING...'
              : '> CREATE PROJECT'}
          </button>
        </div>
      </form>
    </section>
  );
}
