import { supabase } from "../lib/supabase";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  message: string;
  created_at: string;
  status?: "new" | "read" | "replied";
}

export async function saveContactMessage(messageData: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  plan?: string;
  message: string;
}) {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([messageData])
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  } catch (err) {
    console.error("saveContactMessage error:", err);
    return null;
  }
}

export async function getContactMessages() {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as ContactMessage[];
  } catch (err) {
    console.error("getContactMessages error:", err);
    return [] as ContactMessage[];
  }
}

export async function updateMessageStatus(
  messageId: string,
  status: "new" | "read" | "replied"
) {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", messageId)
      .select()
      .single();

    if (error) throw error;
    return data as ContactMessage;
  } catch (err) {
    console.error("updateMessageStatus error:", err);
    return null;
  }
}
