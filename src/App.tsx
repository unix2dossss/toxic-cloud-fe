import React from 'react';
import { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient('https://sbzrocvvboojrfjeuosx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNienJvY3Z2Ym9vanJmamV1b3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzNzQ2NjQsImV4cCI6MjAwNTk1MDY2NH0.xddMLhlQCwWRNujs4eXss55HgBG74y27SgdDsmbBm_U');

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
  };
  
  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <div>
        <p>Logged in!</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }
}
