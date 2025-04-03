
import { supabase } from "@/integrations/supabase/client";

export interface AIProject {
  id: number;
  content: string;
  user_id: string | null;
}

export const fetchUserProjects = async (): Promise<AIProject[]> => {
  const { data, error } = await supabase
    .from("AI project")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching AI projects:", error);
    throw error;
  }

  return data || [];
};

export const createProject = async (content: string): Promise<AIProject> => {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error("Error getting user:", userError);
    throw userError;
  }

  const { data, error } = await supabase
    .from("AI project")
    .insert([{ content, user_id: userData.user?.id }])
    .select()
    .single();

  if (error) {
    console.error("Error creating AI project:", error);
    throw error;
  }

  return data;
};

export const updateProject = async (id: number, content: string): Promise<AIProject> => {
  const { data, error } = await supabase
    .from("AI project")
    .update({ content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating AI project:", error);
    throw error;
  }

  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from("AI project")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting AI project:", error);
    throw error;
  }
};
