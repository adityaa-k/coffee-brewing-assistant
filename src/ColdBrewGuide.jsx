import React, { useState, useEffect, useMemo } from 'react';

// --- ICONS ---
const Coffee = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8c0-2.21-1.79-4-4-4s-4 1.79-4 4v3h8v-3z" /><path d="M6 8v3a6 6 0 0 0 6 6h2c3.31 0 6-2.69 6-6V8" /><path d="M4 15h14" /></svg>
);
const Droplet = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>
);
const SettingsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

const Card = ({ children, className = '' }) => <div className={`bg-white/50 backdrop-blur-sm border border-black/5 shadow-md rounded-2xl p-6 transition-all duration-300 ${className}`}>{children}</div>;
const Button = ({ children, onClick, disabled = false, className = '' }) => <button onClick={onClick} disabled={disabled} className={`w-full flex items-center justify-center text-center font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${className} ${disabled ? 'bg-brand-tan/50 text-brand-brown/70 cursor-not-allowed' : 'bg-brand-tan text-brand-brown hover:bg-brand-tan/80 shadow-sm hover:shadow-lg focus:ring-brand-tan/50'}`}>{children}</button>;

function ColdBrewGuide() {
    const getInitialState = (key, defaultValue) => {
        try { if (typeof window !== 'undefined') { const item = window.localStorage.getItem(key); return item ? JSON.parse(item) : defaultValue; } } catch (error) { console.error(error); } return defaultValue;
    };

    const [brewType, setBrewType] = useState('concentrate');
    const [strength, setStrength] = useState('medium');
    const [coffee, setCoffee] = useState(100);
    const [water, setWater] = useState(500);
    const [activeSteepTime, setActiveSteepTime] = useState(16);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [reminderFeedback, setReminderFeedback] = useState('');
    const [grinderInfo, setGrinderInfo] = useState('');
    const [reminderStatus, setReminderStatus] = useState('');
    const [grinderStatus, setGrinderStatus] = useState('');

    const [ratios, setRatios] = useState(() => getInitialState('cba_coldBrewRatios', {
        concentrate: 5,
        light: 18,
        medium: 15,
        strong: 12
    }));

    useEffect(() => {
        try { if (typeof window !== 'undefined') localStorage.setItem('cba_coldBrewRatios', JSON.stringify(ratios)); } catch (e) { console.error(e); }
    }, [ratios]);

    const currentRatio = useMemo(() => {
        if (brewType === 'concentrate') return ratios.concentrate;
        return ratios[strength];
    }, [brewType, strength, ratios]);

    const handleCoffeeChange = (e) => {
        const coffeeAmount = Number(e.target.value);
        setCoffee(coffeeAmount);
        setWater(Math.round(coffeeAmount * currentRatio));
    };

    const handleWaterChange = (e) => {
        const waterAmount = Number(e.target.value);
        setWater(waterAmount);
        setCoffee(Math.round(waterAmount / currentRatio));
    };
    
    useEffect(() => {
        setWater(Math.round(coffee * currentRatio));
    }, [brewType, strength, currentRatio]);
    
    const handleReminderClick = () => {
        setIsModalOpen(true);
        setReminderStatus('');
    };
    
    const handleRatioChange = (type, value) => {
        setRatios(prev => ({...prev, [type]: Number(value)}));
    };

    const handleNetlifyFormSubmit = (formData, formName, setStatus) => {
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ 'form-name': formName, ...formData }).toString()
        })
        .then(() => setStatus('Thank you for your feedback!'))
        .catch((error) => setStatus(`Error: ${error.toString()}`));
    };

    const handleGrinderSubmit = (e) => {
        e.preventDefault();
        handleNetlifyFormSubmit({ grinder: grinderInfo }, 'grinder-submission', setGrinderStatus);
    };

    const handleReminderSubmit = (e) => {
        e.preventDefault();
        handleNetlifyFormSubmit({ feedback: reminderFeedback }, 'reminder-feedback', setReminderStatus);
        setTimeout(() => setIsModalOpen(false), 2000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-brand-brown">Cold Brew Guide</h2>
                <p className="text-brand-brown/80 mt-1">The easiest way to make smooth, low-acid coffee. Perfect for hot days or a make-ahead brew.</p>
            </div>

            <Card>
                <h3 className="text-xl font-bold text-brand-brown mb-4">1. Choose Your Style</h3>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setBrewType('concentrate')} className={`py-3 rounded-lg font-semibold transition-colors ${brewType === 'concentrate' ? 'bg-brand-tan text-brand-brown shadow' : 'bg-brand-brown/10 text-brand-brown'}`}>Concentrate</button>
                    <button onClick={() => setBrewType('ready')} className={`py-3 rounded-lg font-semibold transition-colors ${brewType === 'ready' ? 'bg-brand-tan text-brand-brown shadow' : 'bg-brand-brown/10 text-brand-brown'}`}>Ready to Drink</button>
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-brand-brown">2. Set Your Ratio</h3>
                    <button onClick={() => setShowSettings(!showSettings)} className="text-brand-brown/60 hover:text-brand-brown transition-colors"><SettingsIcon /></button>
                </div>

                {showSettings && (
                    <div className="space-y-4 p-4 mb-4 bg-brand-brown/5 rounded-lg">
                        <h4 className="font-bold text-center text-brand-brown mb-2">Customize Ratios (1:X)</h4>
                        <div>
                            <label className="block text-sm font-medium text-brand-brown/80 mb-1">Concentrate (1:{ratios.concentrate})</label>
                            <input type="range" min="3" max="8" value={ratios.concentrate} onChange={(e) => handleRatioChange('concentrate', e.target.value)} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-brown/80 mb-1">Light (1:{ratios.light})</label>
                            <input type="range" min="16" max="20" value={ratios.light} onChange={(e) => handleRatioChange('light', e.target.value)} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-brown/80 mb-1">Medium (1:{ratios.medium})</label>
                            <input type="range" min="13" max="17" value={ratios.medium} onChange={(e) => handleRatioChange('medium', e.target.value)} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-brown/80 mb-1">Strong (1:{ratios.strong})</label>
                            <input type="range" min="10" max="14" value={ratios.strong} onChange={(e) => handleRatioChange('strong', e.target.value)} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                        </div>
                    </div>
                )}

                {brewType === 'concentrate' ? (
                    <p className="text-center text-brand-brown/80 mb-4">Using a <strong>1:{ratios.concentrate}</strong> coffee to water ratio.</p>
                ) : (
                    <div className="mb-4">
                        <div className="flex justify-between font-semibold text-brand-brown/80 px-2 mb-2">
                            <span>Strong</span>
                            <span>Medium</span>
                            <span>Light</span>
                        </div>
                        <input type="range" min="0" max="2" value={{'strong': 0, 'medium': 1, 'light': 2}[strength]} onChange={(e) => setStrength(['strong', 'medium', 'light'][e.target.value])} className="w-full h-2 bg-brand-brown/20 rounded-lg appearance-none cursor-pointer accent-brand-green" />
                        <p className="text-center text-brand-brown/80 mt-2">Current Strength: <strong>{strength.charAt(0).toUpperCase() + strength.slice(1)}</strong> (1:{currentRatio} ratio)</p>
                    </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-brand-brown/80 mb-1">Coffee (g)</label>
                        <div className="relative"><Coffee className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown/50" size={20} /><input type="number" value={coffee} onChange={handleCoffeeChange} className="w-full pl-10 p-3 font-bold text-lg text-brand-brown bg-brand-brown/10 rounded-lg border-transparent focus:border-brand-tan focus:ring-0" /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-brown/80 mb-1">Water (g)</label>
                        <div className="relative"><Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-brown/50" size={20} /><input type="number" value={water} onChange={handleWaterChange} className="w-full pl-10 p-3 font-bold text-lg text-brand-brown bg-brand-brown/10 rounded-lg border-transparent focus:border-brand-tan focus:ring-0" /></div>
                    </div>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-brand-brown mb-4">3. Grind Your Coffee</h3>
                <p className="text-brand-brown/90 mb-4">Recommended grind setting for cold brew is <strong>medium-coarse to coarse</strong>.</p>
                
                <div className="my-6 flex justify-center">
                    <img src="/cold-brew-grind.png" alt="A close-up photo showing the ideal coarse grind size for cold brew coffee, similar in texture to coarse sea salt." className="w-full max-w-xs h-auto rounded-lg shadow-md" />
                </div>

                
                <form name="grinder-submission" onSubmit={handleGrinderSubmit} data-netlify="true">
                    <input type="hidden" name="form-name" value="grinder-submission" />
                    <label className="block text-sm font-medium text-brand-brown/80 mb-1">To help us build a grind size guide, what grinder do you use?</label>
                    <div className="flex gap-2">
                        <input type="text" name="grinder" value={grinderInfo} onChange={(e) => setGrinderInfo(e.target.value)} placeholder="e.g., Timemore C3, Baratza Encore" className="w-full p-2 bg-brand-brown/10 rounded-lg border-transparent focus:border-brand-tan focus:ring-0" />
                        <button type="submit" className="px-4 py-2 bg-brand-tan text-brand-brown font-bold rounded-lg shadow-sm hover:bg-brand-tan/80 transition-colors">Submit</button>
                    </div>
                </form>
                {grinderStatus && <p className="text-sm text-brand-green mt-2">{grinderStatus}</p>}
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-brand-brown mb-4">4. Choose Steep Time</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {[12, 16, 20, 24, 48].map(time => (
                        <button key={time} onClick={() => setActiveSteepTime(time)} className={`py-3 rounded-lg font-semibold transition-colors text-center ${activeSteepTime === time ? 'bg-brand-tan text-brand-brown shadow' : 'bg-brand-brown/10 text-brand-brown'}`}>{time} hrs</button>
                    ))}
                </div>
                <div className="mt-6">
                    <Button onClick={handleReminderClick}>Set Reminder</Button>
                </div>
            </Card>

            {brewType === 'concentrate' && (
                <Card>
                    <h3 className="text-xl font-bold text-brand-brown mb-4">5. Usage & Storage</h3>
                    <p className="text-brand-brown/90 mb-2">Your concentrate is ready! You can store it in a sealed container in the fridge for up to 14 days.</p>
                    <p className="text-brand-brown/80">To serve, dilute it with water or milk. A good starting point is a <strong>1:1 or 1:2 ratio</strong> of concentrate to liquid. Experiment to find what you like best!</p>
                </Card>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-brand-cream rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        {reminderStatus ? (
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-brand-brown mb-4">Thank You!</h3>
                                <p className="text-brand-brown/80">{reminderStatus}</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-brand-brown mb-4">Help Us Build Reminders!</h3>
                                <form name="reminder-feedback" onSubmit={handleReminderSubmit} data-netlify="true">
                                    <input type="hidden" name="form-name" value="reminder-feedback" />
                                    <p className="text-brand-brown/80 mb-4">We're building a feature to send you a notification when your cold brew is ready. What's the best way to remind you?</p>
                                    <textarea name="feedback" value={reminderFeedback} onChange={(e) => setReminderFeedback(e.target.value)} placeholder="e.g., A push notification, an email, a calendar event..." className="w-full p-2 h-24 bg-brand-brown/10 rounded-lg border-transparent focus:border-brand-tan focus:ring-0 mb-4"></textarea>
                                    <Button type="submit">Send Suggestion</Button>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="w-full text-center mt-2 text-brand-brown/60 hover:text-brand-brown transition-colors">Cancel</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ColdBrewGuide;
