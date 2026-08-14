import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "hackable.savedResources";

function readSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Bookmark state for the learning library, persisted to localStorage so it survives navigation
 * between the Resources catalogue, a resource's detail page, and the Saved resources screen —
 * no backend or global store needed for a single-user demo.
 */
export function useSavedResources() {
  const [savedIds, setSavedIds] = useState<string[]>(() => readSavedIds());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
  }, [savedIds]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((current) => (current.includes(id) ? current.filter((saved) => saved !== id) : [...current, id]));
  }, []);

  return { savedIds, isSaved, toggleSaved };
}
