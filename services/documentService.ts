import { supabase } from '../lib/supabase';
import { Document, DocumentCategory } from '../types/database';

export const documentService = {
    async fetchDocuments() {
        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching documents:', error);
            throw error;
        }

        return data as Document[];
    },

    async uploadDocument(file: File, metadata: { title: string; description: string; category: DocumentCategory; uploader_id: string }) {
        // 1. Upload to Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('governance_docs')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            throw uploadError;
        }

        // 2. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('governance_docs')
            .getPublicUrl(filePath);

        // 3. Create DB Record
        const { data, error: dbError } = await supabase
            .from('documents')
            .insert([{
                title: metadata.title,
                description: metadata.description,
                category: metadata.category,
                file_url: publicUrl,
                uploader_id: metadata.uploader_id
            }])
            .select()
            .single();

        if (dbError) {
            console.error('Error saving document record:', dbError);
            throw dbError;
        }

        return data as Document;
    }
};
