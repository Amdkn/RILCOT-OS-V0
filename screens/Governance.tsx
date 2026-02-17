import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { documentService } from '../services/documentService';
import { Document, DocumentCategory } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export const Governance: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'documents' | 'decisions' | 'calendar'>('documents');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Upload State
  const [file, setFile] = useState<File | null>(null);
  const [uploadMeta, setUploadMeta] = useState({ title: '', description: '', category: 'report' as DocumentCategory });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (activeTab === 'documents') {
      loadDocuments();
    }
  }, [activeTab]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await documentService.fetchDocuments();
      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) return;

    setUploading(true);
    try {
      await documentService.uploadDocument(file, {
        ...uploadMeta,
        uploader_id: user.id
      });
      setShowUploadModal(false);
      setFile(null);
      setUploadMeta({ title: '', description: '', category: 'report' });
      loadDocuments();
    } catch (error) {
      alert('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'statute': return <Icons.ShieldCheck size={20} />;
      case 'budget': return <Icons.PiggyBank size={20} />;
      case 'report': return <Icons.FileText size={20} />;
      default: return <Icons.FolderOpen size={20} />;
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      statute: 'Statuts',
      budget: 'Budget',
      report: 'Rapport',
      nomination: 'Nomination',
      regulation: 'Règlement'
    };
    return labels[category] || category;
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-slate-900">Gouvernance</h1>
        {activeTab === 'documents' && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            <Icons.Plus size={24} />
          </button>
        )}
      </div>

      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('documents')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === 'documents' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('decisions')}
          className={`pb-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === 'decisions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
        >
          Décisions
        </button>
      </div>

      {activeTab === 'documents' ? (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-slate-400">Chargement...</div>
          ) : documents.length === 0 ? (
            <div className="text-center py-10 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
              <p>Aucun document public.</p>
            </div>
          ) : (
            documents.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-500">
                  {getCategoryIcon(doc.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">{getCategoryLabel(doc.category)}</span>
                    <h3 className="font-semibold text-slate-900 leading-tight truncate">{doc.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{doc.description}</p>
                  <div className="mt-1 text-[10px] text-slate-400">{new Date(doc.created_at).toLocaleDateString()}</div>
                </div>
                <div className="self-center">
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Icons.Download size={16} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="text-center py-10 text-slate-400">
          <Icons.Building className="mx-auto mb-2 opacity-50" size={32} />
          <p>Module en construction</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-lg font-bold mb-4">Ajouter un document</h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Fichier (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full mt-1 text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>

              <div>
                <input
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500"
                  placeholder="Titre du document"
                  value={uploadMeta.title}
                  onChange={e => setUploadMeta({ ...uploadMeta, title: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2">
                <select
                  className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500"
                  value={uploadMeta.category}
                  onChange={e => setUploadMeta({ ...activeTab, category: e.target.value as DocumentCategory })}
                >
                  <option value="report">Rapport</option>
                  <option value="statute">Statuts</option>
                  <option value="budget">Budget</option>
                  <option value="nomination">Nomination</option>
                  <option value="regulation">Règlement</option>
                </select>
              </div>

              <textarea
                className="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200 outline-none focus:border-blue-500 h-20 resize-none"
                placeholder="Description..."
                value={uploadMeta.description}
                onChange={e => setUploadMeta({ ...uploadMeta, description: e.target.value })}
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50"
                  disabled={uploading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 flex justify-center items-center gap-2"
                  disabled={uploading}
                >
                  {uploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Uploader'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
