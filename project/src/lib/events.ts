import { supabase } from './supabaseClient';
import { Event } from '../types';

interface EventRow {
  id: string;
  title: string;
  description: string;
  date: string;
  end_date: string | null;
  location: string;
  college: string;
  type: Event['type'];
  link: string;
  image: string | null;
}

const fromRow = (row: EventRow): Event => ({
  id: row.id,
  title: row.title,
  description: row.description,
  date: row.date,
  endDate: row.end_date ?? undefined,
  location: row.location,
  college: row.college,
  type: row.type,
  link: row.link,
  image: row.image ?? undefined,
});

export const fetchEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return (data as EventRow[]).map(fromRow);
};

export const fetchEventById = async (id: string): Promise<Event | null> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? fromRow(data as EventRow) : null;
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .insert({
      title: event.title,
      description: event.description,
      date: event.date,
      end_date: event.endDate || null,
      location: event.location,
      college: event.college,
      type: event.type,
      link: event.link,
      image: event.image || null,
    })
    .select()
    .single();

  if (error) throw error;
  return fromRow(data as EventRow);
};
