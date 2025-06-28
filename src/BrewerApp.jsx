import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

// --- ICONS (Brand Aligned: minimalist, line-style) ---
const Coffee = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8c0-2.21-1.79-4-4-4s-4 1.79-4 4v3h8v-3z" /><path d="M6 8v3a6 6 0 0 0 6 6h2c3.31 0 6-2.69 6-6V8" /><path d="M4 15h14" /></svg>
);
const Users = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const Globe = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const SlidersHorizontal = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="21" y1="4" x2="14" y2="4" /><line x1="10" y1="4" x2="3" y2="4" /><line x1="21" y1="12" x2="12" y2="12" /><line x1="8" y1="12" x2="3" y2="12" /><line x1="21" y1="20" x2="16" y2="20" /><line x1="12" y1="20" x2="3" y2="20" /><line x1="14" y1="2" x2="14" y2="6" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="16" y1="18" x2="16" y2="22" /></svg>
);
const Info = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
);


function BrewerApp() {
  const getInitialState = (key, defaultValue) => {
      try {
          if (typeof window !== 'undefined') {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
          }
      } catch (error) {
          console.error(`Error reading from localStorage for key "${key}":`, error);
      }
      return defaultValue;
  };

  const [activeBrewMethod, setActiveBrewMethod] = useState('iced-v60');
  const [people, setPeople] = useState(1);
  const [useCustomWeight, setUseCustomWeight] = useState(false);
  const [customCoffeeWeight, setCustomCoffeeWeight] = useState(20);
  const [currentStep, setCurrentStep] = useState('setup');
  const [currentBloom, setCurrentBloom] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);
  const [checklist, setChecklist] = useState({ grinder: false, kettle: false, scale: false, filter: false, v60: false, server: false });
  const [currentPage, setCurrentPage] = useState('app');
  
  const [personalBrews, setPersonalBrews] = useState(() => getInitialState('cba_personalBrews', 0));

  const [settings, setSettings] = useState(() => getInitialState('cba_settings', {
    gramsPerPerson: 18, coffeeRatio: 65, waterSplit: 60, bloomRatioMin: 2, bloomRatioMax: 3, bloomTimeMin: 45, bloomTimeMax: 55
  }));
  
  const [useCustomBloom, setUseCustomBloom] = useState(() => getInitialState('cba_useCustomBloom', false));

  const [customBloomConfig, setCustomBloomConfig] = useState(() => getInitialState('cba_customBloomConfig', { 
    count: 2, durations: [45, 45] 
  }));

  useEffect(() => {
    try { if (typeof window !== 'undefined') { window.localStorage.setItem('cba_settings', JSON.stringify(settings)); } } catch (e) { console.error(e) }
  }, [settings]);

  useEffect(() => {
    try { if (typeof window !== 'undefined') { window.localStorage.setItem('cba_useCustomBloom', JSON.stringify(useCustomBloom)); } } catch (e) { console.error(e) }
  }, [useCustomBloom]);
  
  useEffect(() => {
    try { if (typeof window !== 'undefined') { window.localStorage.setItem('cba_customBloomConfig', JSON.stringify(customBloomConfig)); } } catch (e) { console.error(e) }
  }, [customBloomConfig]);
  
  useEffect(() => {
    try { if (typeof window !== 'undefined') { window.localStorage.setItem('cba_personalBrews', JSON.stringify(personalBrews)); } } catch (e) { console.error(e) }
  }, [personalBrews]);

  const coffeeWeight = useCustomWeight ? customCoffeeWeight : people * settings.gramsPerPerson;

  const brewConfig = useMemo(() => {
    const totalWater = Math.round((coffeeWeight / settings.coffeeRatio) * 1000);
    const brewWater = Math.round(totalWater * (settings.waterSplit / 100));
    const iceWeight = totalWater - brewWater;
    if (useCustomBloom) {
        const waterPerBloom = Math.round(brewWater / customBloomConfig.count);
        return { coffeeWeight, totalWater, brewWater, iceWeight, bloomCount: customBloomConfig.count, waterPerBloom, bloomTimes: customBloomConfig.durations, reasoning: `Using your custom bloom plan: ${customBloomConfig.count} pours.` };
    }
    for (let blooms = 4; blooms >= 2; blooms--) {
        const waterPer = Math.round(brewWater / blooms);
        const ratio = waterPer / coffeeWeight;
        if (ratio >= settings.bloomRatioMin && ratio <= settings.bloomRatioMax) {
            return { coffeeWeight, totalWater, brewWater, iceWeight, bloomCount: blooms, waterPerBloom: waterPer, bloomTimes: Array(blooms).fill(settings.bloomTimeMin), reasoning: `We've calculated ${blooms} blooms for an ideal ${ratio.toFixed(1)}x water-to-coffee ratio.` };
        }
    }
    const blooms = 2;
    const waterPer = Math.round(brewWater / blooms);
    return { coffeeWeight, totalWater, brewWater, iceWeight, bloomCount: blooms, waterPerBloom: waterPer, bloomTimes: Array(blooms).fill(settings.bloomTimeMin), reasoning: `Using our standard of ${blooms} blooms as a reliable starting point.` };
  }, [coffeeWeight, settings, useCustomBloom, customBloomConfig]);

  useEffect(() => {
    if (!isTimerRunning) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
                clearInterval(timerRef.current);
                setIsTimerRunning(false);
                if (currentStep === 'brewing') {
                    if (currentBloom < brewConfig.bloomCount - 1) {
                        const nextBloomIndex = currentBloom + 1;
                        setCurrentBloom(nextBloomIndex);
                        setTimeLeft(brewConfig.bloomTimes[nextBloomIndex]);
                        setIsTimerRunning(true);
                    } else { setCurrentStep('finishing'); }
                }
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, currentStep, currentBloom, brewConfig]);

  const handleStartBrewing = () => { setCurrentStep('brewing'); setCurrentBloom(0); setTimeLeft(brewConfig.bloomTimes[0]); };
  const handleReset = () => { setCurrentStep('setup'); setIsTimerRunning(false); setTimeLeft(0); setCurrentBloom(0); setChecklist({ grinder: false, kettle: false, scale: false, filter: false, v60: false, server: false }); };
  const handleCompleteBrew = () => { setPersonalBrews(prev => prev + 1); setCurrentStep('complete'); };
  const handleChecklistToggle = (item) => setChecklist(prev => ({...prev, [item]: !prev[item]}));
  const handleCustomBloomCountChange = (newCount) => setCustomBloomConfig(prev => ({ count: newCount, durations: [...prev.durations].slice(0, newCount).concat(Array(Math.max(0, newCount - prev.durations.length)).fill(45)) }));
  const handleCustomBloomDurationChange = (index, newDuration) => setCustomBloomConfig(prev => ({ ...prev, durations: prev.durations.map((d, i) => i === index ? newDuration : d) }));
  const isChecklistComplete = Object.values(checklist).every(Boolean);

  const Card = ({ children, className = '' }) => <div className={`bg-white/50 backdrop-blur-sm border border-black/5 shadow-md rounded-2xl p-6 transition-all duration-300 ${className}`}>{children}</div>;
  const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`w-full flex items-center justify-center text-center font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${className} ${disabled ? 'bg-brand-tan/50 text-brand-brown/70 cursor-not-allowed' : 'bg-brand-tan text-brand-brown hover:bg-brand-tan/80 shadow-sm hover:shadow-lg focus:ring-brand-tan/50'}`}>{children}</button>;
  const Toggle = ({ checked, onChange }) => <button role="switch" aria-checked={checked} onClick={onChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-brand-green' : 'bg-brand-brown/30'}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} /></button>;

  const renderSetupPhase = () => (
    <div className="space-y-6">
      <Card><h2 className="text-xl font-bold text-brand-brown mb-4">1. Choose Your Amount</h2><div className="grid grid-cols-2 gap-3 mb-4"><button onClick={() => setUseCustomWeight(false)} className={`py-3 rounded-lg font-semibold transition-colors ${!useCustomWeight ? 'bg-brand-tan text-brand-brown shadow' : 'bg-brand-brown/10 text-brand-brown'}`}>By People</button><button onClick={() => setUseCustomWeight(true)} className={`py-3 rounded-lg font-semibold transition-colors ${useCustomWeight ? 'bg-brand-tan text-brand-brown shadow' : 'bg-brand-brown/10 text-brand-brown'}`}>By Weight</button></div>{!useCustomWeight ? (<div><label htmlFor="people" className="block text-sm font-medium text-brand-brown/80 mb-2">How many servings?</label><div className="flex items-center space-x-4"><Users className="text-brand-brown/60" /><input type="range" min="1" max="6" value={people} onChange={e => setPeople(Number(e.target.value))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" /><span className="font-bold text-lg text-brand-brown w-8 text-center">{people}</span></div></div>) : (<div><label htmlFor="customWeight" className="block text-sm font-medium text-brand-brown/80 mb-2">Coffee (grams)</label><div className="flex items-center space-x-4"><Coffee className="text-brand-brown/60" /><input type="range" min="10" max="120" value={customCoffeeWeight} onChange={e => setCustomCoffeeWeight(Number(e.target.value))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" /><input type="number" value={customCoffeeWeight} onChange={e => setCustomCoffeeWeight(Number(e.target.value))} className="w-20 text-center font-bold text-lg text-brand-brown bg-brand-brown/10 rounded-lg p-1 border border-transparent focus:border-brand-tan focus:ring-0" /></div></div>)}</Card>
      <Card><h2 className="text-xl font-bold text-brand-brown mb-4">2. Your Recipe</h2><div className="space-y-3 text-brand-brown"><div className="flex justify-between items-center"><span className="font-medium">Coffee:</span><span className="font-bold text-xl text-brand-brown">{brewConfig.coffeeWeight}g</span></div><div className="flex justify-between items-center"><span className="font-medium">Brew Water (hot):</span><span className="font-bold text-xl text-brand-brown">{brewConfig.brewWater}g</span></div><div className="flex justify-between items-center"><span className="font-medium">Ice in Server:</span><span className="font-bold text-xl text-brand-brown">{brewConfig.iceWeight}g</span></div><hr className="my-3 border-t border-brand-brown/10" /><div className="flex justify-between items-center"><span className="font-medium">Bloom Plan:</span><span className="font-bold text-lg text-brand-brown">{brewConfig.bloomCount} x {brewConfig.waterPerBloom}g</span></div><div className="flex justify-between items-center"><span className="font-medium">Bloom Durations:</span><span className="font-bold text-lg text-brand-brown">{brewConfig.bloomTimes.join('s, ')}s</span></div></div><p className="text-xs text-center text-brand-brown/70 mt-4 p-2 bg-brand-brown/10 rounded-lg"><Info size={14} className="inline mr-1" />{brewConfig.reasoning}</p></Card>
      <Card><h2 className="text-xl font-bold text-brand-brown mb-4">3. Get Ready</h2><div className="space-y-3">{[{ key: 'grinder', label: `Grind ${brewConfig.coffeeWeight}g of coffee` }, { key: 'kettle', label: `Heat water to ~96°C` }, { key: 'scale', label: 'Get your scale ready' }, { key: 'filter', label: 'Rinse paper filter' }, { key: 'v60', label: 'Assemble brewer on server' }, { key: 'server', label: `Add ${brewConfig.iceWeight}g of ice to server` },].map(item => (<div key={item.key} onClick={() => handleChecklistToggle(item.key)} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${checklist[item.key] ? 'bg-brand-green/30 text-brand-brown/60' : 'bg-brand-brown/10'}`}><div className={`w-5 h-5 rounded-md border-2 mr-3 flex-shrink-0 flex items-center justify-center transition-all ${checklist[item.key] ? 'bg-brand-green border-brand-green' : 'border-brand-brown/20'}`}>{checklist[item.key] && <svg className="text-white" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}</div><span className={`flex-grow text-brand-brown ${checklist[item.key] ? 'line-through' : ''}`}>{item.label}</span></div>))}</div></Card>
      <Button onClick={handleStartBrewing} disabled={!isChecklistComplete}>{!isChecklistComplete ? "Complete Your Checklist" : "Let's Start Brewing"}</Button>
    </div>
  );
  
  const renderBrewingPhase = () => {
    const showSwirl = timeLeft <= brewConfig.bloomTimes[currentBloom] * 0.6 && timeLeft > 5;
    const showStartButton = currentBloom === 0 && !isTimerRunning;
    const progress = (brewConfig.bloomTimes.slice(0, currentBloom).reduce((a, b) => a + b, 0) + (brewConfig.bloomTimes[currentBloom] - timeLeft)) / brewConfig.bloomTimes.reduce((a, b) => a + b, 0) * 100;

    return (
        <Card className="text-center">
            <h2 className="text-2xl font-bold text-brand-brown"> Pour <span className="text-brand-tan">{currentBloom + 1}</span> of {brewConfig.bloomCount} </h2>
            {showStartButton ? (<div className="my-8 flex flex-col items-center justify-center space-y-4"><p className="text-brand-brown/80 text-lg">Ready for your first pour?</p><div className="w-1/2 mx-auto"> <Button onClick={() => setIsTimerRunning(true)}> Start Bloom </Button> </div></div>) : (<div className="my-6"><div className="relative w-48 h-48 mx-auto"><div className="absolute inset-0 flex flex-col items-center justify-center z-10"><div className={`text-6xl font-mono font-bold ${timeLeft < 10 ? "text-orange-500" : "text-brand-brown"} transition-colors`}>{timeLeft}</div><div className="text-brand-brown/60">seconds left</div></div>{isTimerRunning && (<div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">{[...Array(6)].map((_, i) => (<svg key={i} className="absolute top-0 w-3 h-auto text-brand-tan/50 animate-pour" style={{ left: `${15 + i * 14}%`, animationDelay: `${i * 0.2}s` }} viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0V22" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>))}</div>)}<svg className="w-full h-full" viewBox="0 0 36 36" transform='rotate(-90)'><path className="text-brand-brown/10" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className="text-brand-tan transition-all duration-500" strokeWidth="3" strokeDasharray={`${progress}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg></div></div>)}
            <div className="bg-brand-brown/10 p-4 rounded-lg space-y-2"><p className="text-lg font-semibold text-brand-brown"> Pour <span className="font-bold">{brewConfig.waterPerBloom}g</span> of water. </p><p className="text-brand-brown/80 text-sm"> Pour evenly in a circular motion, from the center outwards. </p>{showSwirl && <div className="flex items-center justify-center text-brand-tan font-semibold animate-pulse pt-2"><svg className="w-5 h-5 mr-2 animate-swirl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Gently Swirl the slurry now.</div>}</div>
            <div className="mt-6"><button onClick={handleReset} className="text-brand-brown/60 hover:text-brand-brown transition-colors"> Cancel and Start Over </button></div>
        </Card>
    );
  };
  
  const renderFinishingPhase = () => <Card className="text-center"><h2 className="text-2xl font-bold text-brand-brown mb-4">Brewing Complete!</h2><p className="text-brand-brown/80 mb-6">Let the coffee finish dripping.</p><div className="bg-brand-brown/10 p-4 rounded-lg space-y-3 mb-6"><p className="font-semibold text-lg text-brand-brown">Final Step</p><p className="text-brand-brown/90">Gently swirl the server.</p></div><Button onClick={handleCompleteBrew}>Finish & Enjoy</Button></Card>;
  
  const renderCompletePhase = () => <Card className="text-center"><div className="w-24 h-24 mx-auto bg-brand-green/80 rounded-full flex items-center justify-center mb-4"><svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></div><h2 className="text-2xl font-bold text-brand-brown mb-2">Enjoy!</h2><Button onClick={handleReset}>Brew Another</Button></Card>;

  const renderBrewAppContent = () => {
    switch(currentStep) {
        case 'brewing': return renderBrewingPhase();
        case 'finishing': return renderFinishingPhase();
        case 'complete': return renderCompletePhase();
        case 'setup':
        default:
            return renderSetupPhase();
    }
  }

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brand-brown px-1">Settings & Preferences</h2>
      <Card>
        <h3 className="text-xl font-bold text-brand-brown mb-4">Brew Ratios</h3>
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-1">Default Grams Per Person</label>
                <div className="flex items-center space-x-4">
                   <input type="range" min="15" max="25" value={settings.gramsPerPerson} onChange={e => setSettings(s => ({...s, gramsPerPerson: Number(e.target.value)}))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                   <span className="font-bold text-lg text-brand-brown w-12 text-center">{settings.gramsPerPerson}g</span>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-1">Coffee-to-Water Ratio (g/L)</label>
                <div className="flex items-center space-x-4">
                   <input type="range" min="50" max="80" value={settings.coffeeRatio} onChange={e => setSettings(s => ({...s, coffeeRatio: Number(e.target.value)}))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                   <span className="font-bold text-lg text-brand-brown w-12 text-center">{settings.coffeeRatio}</span>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-brand-brown/80 mb-1">Water Split (Brew Water %)</label>
                <div className="flex items-center space-x-4">
                   <input type="range" min="50" max="70" value={settings.waterSplit} onChange={e => setSettings(s => ({...s, waterSplit: Number(e.target.value)}))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                   <span className="font-bold text-lg text-brand-brown w-12 text-center">{settings.waterSplit}%</span>
                </div>
            </div>
        </div>
      </Card>
      <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-brown">Custom Bloom Plan</h3>
            <Toggle checked={useCustomBloom} onChange={() => setUseCustomBloom(!useCustomBloom)} />
          </div>
          <p className="text-sm text-brand-brown/80 mb-4">Prefer your own method? Toggle this on to override the automatic recipe and set your own bloom schedule.</p>
          {useCustomBloom && (
              <div className="space-y-4 pt-4 border-t border-brand-brown/10">
                  <div>
                    <label className="block text-sm font-medium text-brand-brown/80 mb-2">Number of Pours</label>
                    <div className="flex items-center space-x-4">
                      <input type="range" min="2" max="5" value={customBloomConfig.count} onChange={e => handleCustomBloomCountChange(Number(e.target.value))} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                      <span className="font-bold text-lg text-brand-brown w-8 text-center">{customBloomConfig.count}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-brand-brown/80">Pour Durations (seconds)</label>
                    {customBloomConfig.durations.map((duration, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <span className="w-16 text-sm text-brand-brown">Pour {index + 1}:</span>
                            <input type="number" value={duration} onChange={e => handleCustomBloomDurationChange(index, Number(e.target.value))} className="w-full text-center font-semibold text-brand-brown bg-brand-brown/10 rounded-lg p-2 border border-transparent focus:border-brand-tan focus:ring-0"/>
                        </div>
                    ))}
                  </div>
              </div>
          )}
      </Card>
    </div>
  );

  const renderInfoPage = () => (
    <div className="space-y-6 text-brand-brown">
        <h2 className="text-2xl font-bold px-1">About & Stats</h2>
        <Card>
          <h3 className="text-xl font-bold mb-4">Brew Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-brown/10 rounded-lg">
              <div className="flex items-center">
                <Users className="w-6 h-6 mr-3 text-brand-brown/80" />
                <span className="font-bold">Your Brews</span>
              </div>
              <span className="font-mono text-2xl font-bold">{personalBrews}</span>
            </div>
          </div>
        </Card>
        <Card>
            <h3 className="text-xl font-bold mb-2">How It Works</h3>
            <div className="space-y-4 text-brand-brown/90">
                <div>
                    <h4 className="font-bold text-brand-brown">☕ The Golden Ratio</h4>
                    <p>Our brewing formula is based on proven coffee science:</p>
                    <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                        <li><strong>65g coffee per 1000ml water:</strong> Optimal strength for iced coffee.</li>
                        <li><strong>60:40 water split:</strong> 60% hot brewing water, 40% ice for immediate cooling.</li>
                        <li><strong>2x-3x bloom ratio:</strong> Water per pour should be 2-3 times coffee weight.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-brand-brown">⏱️ Adaptive Timing</h4>
                    <p>The app intelligently adjusts brewing parameters:</p>
                    <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
                        <li><strong>Pour Count:</strong> Varies between 2-4 cycles based on coffee amount.</li>
                        <li><strong>Pour Duration:</strong> Adjusts between 45-55 seconds for optimal extraction.</li>
                        <li><strong>Water Distribution:</strong> Ensures proper water-to-coffee ratio per pour.</li>
                    </ul>
                </div>
            </div>
        </Card>
        <Card>
            <h3 className="text-xl font-bold">Update Log</h3>
            <ul className="list-disc list-inside mt-2 text-brand-brown/80 space-y-1">
                <li><span className="font-semibold text-brand-brown">v2.5.0 (Final Fix):</span> Corrected navigation logic and restored Info page content.</li>
                <li><span className="font-semibold text-brand-brown">v2.4.0 (Nav Fix):</span> Corrected navigation logic for settings and info tabs.</li>
                <li><span className="font-semibold text-brand-brown">v2.3.0 (Community):</span> Added personal brew counter.</li>
                <li><span className="font-semibold text-brand-brown">v2.2.0 (Platform):</span> Restructured for multiple brew methods.</li>
            </ul>
        </Card>
    </div>
  );

  const renderIcedV60Guide = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-bold text-brand-brown">Iced V60 Pour-Over</h2>
            <p className="text-brand-brown/80 mt-1">A bright, clean, and complex iced coffee, brewed hot directly over ice to lock in delicate flavors.</p>
        </div>
        {
          {
            'app': renderBrewAppContent(),
            'settings': renderSettings(),
            'info': renderInfoPage()
          }[currentPage]
        }
    </div>
  );
  
  const renderComingSoon = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-bold text-brand-brown">More Guides Coming Soon</h2>
            <p className="text-brand-brown/80 mt-1">We're busy testing and perfecting new recipes. Here's what's next on our list!</p>
        </div>
        <Card>
            <ul className="space-y-3">
                {['V60 (Hot)', 'Iced Moka Pot', 'Moka Pot (Hot)', 'Cold Brew'].map(method => (<li key={method} className="p-4 bg-brand-brown/10 rounded-lg font-semibold text-brand-brown/80">{method}</li>))}
            </ul>
        </Card>
    </div>
  );
  
  const BottomNavItem = ({ icon: Icon, label, pageName }) => (
    <button onClick={() => setCurrentPage(pageName)} className={`flex flex-col items-center justify-center space-y-1 transition-colors w-full pt-2 ${currentPage === pageName ? 'text-brand-brown' : 'text-brand-brown/60 hover:text-brand-brown'}`}>
        <Icon />
        <span className="text-xs font-medium">{label}</span>
        {currentPage === pageName && <div className="w-1/2 h-1 bg-brand-tan rounded-full mt-1"></div>}
    </button>
  );

  return (
    <div className="container mx-auto max-w-lg p-4 pb-28">
        <div className="flex space-x-2 border-b-2 border-brand-brown/10 mb-8">
            <button onClick={() => setActiveBrewMethod('iced-v60')} className={`font-semibold pb-3 px-4 -mb-0.5 border-b-4 transition-colors ${activeBrewMethod === 'iced-v60' ? 'text-brand-brown border-brand-tan' : 'text-brand-brown/60 border-transparent hover:border-brand-tan/50'}`}>Iced V60</button>
            <button onClick={() => setActiveBrewMethod('coming-soon')} className={`font-semibold pb-3 px-4 -mb-0.5 border-b-4 transition-colors ${activeBrewMethod === 'coming-soon' ? 'text-brand-brown border-brand-tan' : 'text-brand-brown/60 border-transparent hover:border-brand-tan/50'}`}>More Coming Soon</button>
        </div>
        <main>
            {activeBrewMethod === 'iced-v60' ? renderIcedV60Guide() : renderComingSoon()}
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-md border-t border-black/10 shadow-t-sm"><nav className="max-w-lg mx-auto flex justify-around items-center h-20 px-4"><BottomNavItem icon={Coffee} label="Brew" pageName="app" /><BottomNavItem icon={SlidersHorizontal} label="Settings" pageName="settings" /><BottomNavItem icon={Info} label="Info" pageName="info" /></nav></div>
    </div>
  );
}

export default BrewerApp;
