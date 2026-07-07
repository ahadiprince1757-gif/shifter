import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { syncEngine } from "./sync/syncEngine";

function App() {
  // Measure app load and sync performance
  useEffect(() => {
    const loadStart = performance.now();
    console.log('App mount start', loadStart);
    async function runSync() {
      console.time('SyncAll');
      await syncEngine.syncAll();
      console.timeEnd('SyncAll');
    }
    runSync().catch(err => console.error('Initial sync failed', err)).finally(() => {
      const loadEnd = performance.now();
      console.log('App mount end', loadEnd, 'duration ms', loadEnd - loadStart);
    });
  }, []);

  useEffect(() => {
    // Initiate background sync cycle as soon as the app loads
    syncEngine.syncAll().catch(err => console.error("Initial sync failed", err));
  }, []);

  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--sur)",
            color: "var(--t)",
            border: "1px solid var(--bd)",
            borderRadius: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;