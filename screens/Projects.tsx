import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { projectService } from '../services/projectService';
import { Project, ProjectStatus } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export const Projects: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', budget: '', status: 'idea' as ProjectStatus });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    idea: 'bg-yellow-100 text-yellow-700',
    planning: 'bg-blue-100 text-blue-700',
    execution: 'bg-indigo-100 text-indigo-700',
    completed: 'bg-green-100 text-green-700',
  };

  const statusLabels = {
    idea: 'Idée',
    planning: 'Planification',
    execution: 'En cours',
    completed: 'Terminé',
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await projectService.createProject({
        title: newProject.title,
        description: newProject.description,
        status: newProject.status,
        budget: parseFloat(newProject.budget) || 0,
        leader_id: user.id
      });
      setShowModal(false);
      setNewProject({ title: '', description: '', budget: '', status: 'idea' as ProjectStatus });
      loadProjects();
    } catch (error) {
      alert('Erreur lors de la création du projet');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      await projectService.deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Projets & Missions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
        >
          <Icons.Plus size={24} />
        </button>
      </div>

      {/* Tabs / Filter (Visual only for now) */}
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2 no-scrollbar">
        {['Tous', 'En cours', 'Idées', 'Terminés'].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-slate-400">Chargement...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
            <p>Aucun projet pour le moment.</p>
            <button onClick={() => setShowModal(true)} className="text-blue-600 font-semibold mt-2">Créer le premier projet</button>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.99] transition-transform">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
                <button onClick={() => handleDelete(project.id)} className="text-slate-300 hover:text-red-500">
                  <Icons.FolderOpen size={18} />
                </button>
              </div>

              <h3 className="font-bold text-slate-800 mb-1">{project.title}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{project.description}</p>

              <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                <div className="flex -space-x-2">
                  <img src="https://picsum.photos/seed/user1/30/30" className="w-6 h-6 rounded-full border-2 border-white" alt="Member" />
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">+{project.members_count}</div>
                </div>
                <div className="text-xs font-semibold text-slate-700">
                  {project.budget ? `${project.budget} €` : 'Non défini'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold mb-4">Nouveau Projet</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <input
                className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500"
                placeholder="Titre du projet"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
              <textarea
                className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500 h-24 resize-none"
                placeholder="Description courte..."
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-1/2 p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500"
                  placeholder="Budget (€)"
                  value={newProject.budget}
                  onChange={e => setNewProject({ ...newProject, budget: e.target.value })}
                />
                <select
                  className="w-1/2 p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500"
                  value={newProject.status}
                  onChange={e => setNewProject({ ...newProject, status: e.target.value as ProjectStatus })}
                >
                  <option value="idea">Idée</option>
                  <option value="planning">Planification</option>
                  <option value="execution">En cours</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
