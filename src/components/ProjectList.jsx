import React from 'react';
import moment from 'moment';
import '../styles/kanban.css';

const ProjectList = ({ projects, onUpdateProject, onRemoveProject }) => {
  if (!Array.isArray(projects)) {
    console.error('Expected projects to be an array, but got:', projects);
    return null;
  }

  // Ordena los proyectos por fecha de vencimiento
  const sortedProjects = projects.sort((a, b) => {
    return moment(a.dueDate).isAfter(moment(b.dueDate)) ? 1 : -1;
  });

  return (
    <div className="board">
      {['Pending', 'In Progress', 'Completed'].map(status => (
        <div key={status} className="column">
          <h2>{status}</h2>
          {sortedProjects.filter(project => project.status === status).map(project => {
            const isExpired = moment(project.dueDate).isBefore(moment(), 'day');
            return (
              <div
                key={project._id}
                className={`project ${isExpired ? 'expired' : ''}`}
              >
                <h3>{project.name}</h3>
                <p className={`due-date ${isExpired ? 'expired-date' : ''}`}>
                  Due: {moment(project.dueDate).format('MMM DD, YYYY')}
                </p>
                {isExpired && <p className="expired-message">(Date Expired)</p>}
                {status === 'Pending' && (
                  <button
                    className="start"
                    onClick={() => onUpdateProject(project._id, { status: 'In Progress' })}
                  >
                    Start Project
                  </button>
                )}
                {status === 'In Progress' && (
                  <button
                    className="in-progress"
                    onClick={() => onUpdateProject(project._id, { status: 'Completed' })}
                  >
                    Move to Completed
                  </button>
                )}
                <button
                  className="remove"
                  onClick={() => onRemoveProject(project._id)}
                >
                  Remove Project
                </button>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
