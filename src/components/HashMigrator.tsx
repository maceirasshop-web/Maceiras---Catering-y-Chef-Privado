import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HASH_MAP: Record<string, string> = {
  '#/empresas': '/empresas',
  '#empresas': '/empresas',
  '#/recetas': '/recetas',
  '#recetas': '/recetas',
  '#/admin': '/admin',
  '#admin': '/admin',
  '#/': '/',
  '#/privacidad': '/privacidad',
  '#/terminos': '/terminos',
};

export function HashMigrator() {
  const navigate = useNavigate();

  useEffect(() => {
    const raw = window.location.hash;
    if (!raw) return;
    const lower = raw.toLowerCase();

    const receta = lower.match(/#\/?receta\/([^/?]+)/);
    if (receta?.[1]) {
      navigate(`/recetas/${receta[1]}`, { replace: true });
      return;
    }

    const mapped = HASH_MAP[lower] || HASH_MAP[lower.split('?')[0]];
    if (mapped) {
      navigate(mapped, { replace: true });
    }
  }, [navigate]);

  return null;
}
