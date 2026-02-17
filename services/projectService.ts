import { supabase } from '../lib/supabase';
import { Project, ProjectStatus } from '../types/database';

export const projectService = {
    async fetchProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        return data as Project[];
    },

    async createProject(project: {
        title: string;
        description: string;
        status: ProjectStatus;
        budget?: number;
        leader_id: string;
    }) {
        const { data, error } = await supabase
            .from('projects')
            .insert([project])
            .select()
            .single();

        if (error) {
            console.error('Error creating project:', error);
            throw error;
        }

        return data as Project;
    },

    async deleteProject(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }
};
