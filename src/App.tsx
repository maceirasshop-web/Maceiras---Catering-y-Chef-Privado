import React, { lazy, Suspense, useCallback, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { SeoHead } from './components/SeoHead';
import { HashMigrator } from './components/HashMigrator';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SelectedItemState } from './components/MenuBuilderSection';

const EmpresasPage = lazy(() =>
  import('./components/EmpresasPage').then((m) => ({ default: m.EmpresasPage }))
);
const RecipesPage = lazy(() =>
  import('./components/RecipesPage').then((m) => ({ default: m.RecipesPage }))
);
const RecipeDetailPage = lazy(() =>
  import('./components/RecipeDetailPage').then((m) => ({ default: m.RecipeDetailPage }))
);
const AdminDashboardPage = lazy(() =>
  import('./components/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);

function PageFallback() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
      <p className="kicker">Cargando…</p>
    </div>
  );
}

function RecipeDetailRoute({ onOpenQuote }: { onOpenQuote: (s?: string) => void }) {
  const { recipeId = '' } = useParams();
  const navigate = useNavigate();
  return (
    <RecipeDetailPage
      recipeId={recipeId}
      onNavigateBack={() => navigate('/recetas')}
      onOpenQuote={onOpenQuote}
    />
  );
}

function LegacyRecipeRedirect() {
  const { recipeId = '' } = useParams();
  return <Navigate to={`/recetas/${recipeId}`} replace />;
}

function AdminAwareWhatsApp() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/admin')) return null;
  return <WhatsAppWidget />;
}

function AppRoutes() {
  const navigate = useNavigate();
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');
  const [selectedCatalogItems, setSelectedCatalogItems] = useState<SelectedItemState[]>([]);

  const openQuote = useCallback(
    (serviceName?: string) => {
      if (serviceName) setSelectedServiceForQuote(serviceName);
      navigate('/?cotizar=1');
    },
    [navigate]
  );

  const handleProceedFromMenuBuilder = useCallback(
    (items: SelectedItemState[]) => {
      setSelectedCatalogItems(items);
      setSelectedServiceForQuote('Menú Personalizado de Canapés / Banquete');
      navigate('/?cotizar=1');
    },
    [navigate]
  );

  return (
    <>
      <SeoHead />
      <HashMigrator />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                selectedServiceForQuote={selectedServiceForQuote}
                selectedCatalogItems={selectedCatalogItems}
                onOpenQuote={openQuote}
                onProceedFromMenuBuilder={handleProceedFromMenuBuilder}
                onClearSelectedCatalogItems={() => setSelectedCatalogItems([])}
              />
            }
          />
          <Route path="/empresas" element={<EmpresasPage onOpenQuote={openQuote} />} />
          <Route
            path="/recetas"
            element={
              <RecipesPage
                onNavigateHome={() => navigate('/')}
                onNavigateToRecipeDetail={(id) => navigate(`/recetas/${id}`)}
                onOpenQuote={openQuote}
              />
            }
          />
          <Route path="/recetas/:recipeId" element={<RecipeDetailRoute onOpenQuote={openQuote} />} />
          <Route path="/receta/:recipeId" element={<LegacyRecipeRedirect />} />
          <Route path="/privacidad" element={<PrivacyPage onOpenQuote={() => openQuote()} />} />
          <Route path="/terminos" element={<TermsPage onOpenQuote={() => openQuote()} />} />
          <Route
            path="/admin"
            element={<AdminDashboardPage onNavigateHome={() => navigate('/')} />}
          />
          <Route path="/cart" element={<Navigate to="/?cotizar=1" replace />} />
          <Route path="/checkout" element={<Navigate to="/?cotizar=1" replace />} />
          <Route path="*" element={<NotFoundPage onOpenQuote={() => openQuote()} />} />
        </Routes>
      </Suspense>
      <AdminAwareWhatsApp />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
