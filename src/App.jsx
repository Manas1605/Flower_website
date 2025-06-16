// App.js
import useLenis from './useLenis';

import DahliaSection from './DahliaSection';
import SunflowerSection from './SunflowerSection';
import HibiscusSection from './HibiscusSection';

function App() {
  useLenis(); // 👈 This is all you need

  return (
    <main>
      <DahliaSection />
      <SunflowerSection />
      <HibiscusSection />
    </main>
  );
}

export default App;
