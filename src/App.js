import React, {useState, useMemo, useEffect, useRef} from 'react';
import {ThemeProvider} from 'styled-components';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';

import themes from './styles/themes';

function App() {

  
  const localTheme = JSON.parse(localStorage.getItem('theme'))

  const [theme, setTheme] = useState(localTheme);

  const firstRender = useRef(true);
 
  const currentTheme = useMemo(() => {
    return themes[theme] || themes.dark;
  }, [theme]);

  function handleToogleTheme() {
    setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
      return;
    }

    console.debug({theme})
  }, [theme])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme])
  
  return (
    <ThemeProvider theme={currentTheme} >
      <GlobalStyle />
      <Layout onToogleTheme={handleToogleTheme} selectedTheme={theme}/>
    </ThemeProvider>
  );
};

export default App;
