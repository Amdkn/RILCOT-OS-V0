export type Profile = {
    id: string;
    updated_at: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
};

export type ProjectStatus = 'idea' | 'planning' | 'execution' | 'completed';

export type Project = {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    status: ProjectStatus;
    leader_id: string | null;
    budget: number | null;
    members_count: number;
};

export type DocumentCategory = 'statute' | 'budget' | 'report' | 'nomination' | 'regulation';

export type Document = {
    id: string;
    created_at: string;
    title: string;
    description: string | null;
    file_url: string;
    category: DocumentCategory;
    uploader_id: string | null;
};