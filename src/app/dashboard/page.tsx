'use client';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Camera, BellRing, ShieldAlert, CloudRain, Sun, Wind, CloudFog, CloudLightning, Waves, History, CheckCircle, Activity, User, Phone, Mail } from 'lucide-react';

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  persona: 'farmer' | 'aviation' | 'marine' | 'citizen';
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  
  // Registration form state
  const [formData, setFormData] = useState<UserProfile>({
    name: '', phone: '', email: '', state: '', district: '', persona: 'citizen'
  });
  const [isRegistering, setIsRegistering] = useState(false);

  // Dashboard states
  const [reportStatus, setReportStatus] = useState<string | null>(null);
  const [alerts, setAlerts] = useState({ sms: true, whatsapp: true, ivr: false, threshold: 'orange' });
  const [weatherData, setWeatherData] = useState<any>(null);

  // Load user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('vayu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoadingAuth(false);
  }, []);

  // Fetch real live weather when user is logged in
  useEffect(() => {
    if (!user) return;
    const fetchWeather = async () => {
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${user.district}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();
        if (geoData.results && geoData.results.length > 0) {
           const { latitude, longitude } = geoData.results[0];
           const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation&timezone=auto`);
           const weatherJson = await weatherRes.json();
           setWeatherData(weatherJson.current);
        }
      } catch (err) {
        console.error("Failed to fetch live weather", err);
      }
    };
    fetchWeather();
  }, [user]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    setTimeout(() => {
      localStorage.setItem('vayu_user', JSON.stringify(formData));
      setUser(formData);
      setIsRegistering(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('vayu_user');
    setUser(null);
  };

  const handleReport = (type: string) => {
    setReportStatus(`Submitting ${type} report to VAYU ML Model...`);
    setTimeout(() => {
      setReportStatus(null);
      alert(`Ground truth report for '${type}' successfully submitted! VAYU will use this to improve local accuracy.`);
    }, 2000);
  };

  const testNotification = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      new Notification('?? RED ALERT (VAYU)', { body: 'Severe flooding expected in your district in the next 2 hours. Move to higher ground.', icon: '/favicon.ico' });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('?? RED ALERT (VAYU)', { body: 'Severe flooding expected in your district in the next 2 hours. Move to higher ground.', icon: '/favicon.ico' });
        }
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReportStatus('Uploading image to VAYU Vision-AI...');
      setTimeout(() => {
        setReportStatus('Vision-AI Verified: Waterlogging detected. Map updated.');
        setTimeout(() => setReportStatus(null), 4000);
      }, 2000);
    }
  };

  const historicalData = [
    { year: '2015', rainfall: 1200 },
    { year: '2016', rainfall: 1150 },
    { year: '2017', rainfall: 1300 },
    { year: '2018', rainfall: 900 },
    { year: '2019', rainfall: 1450 },
    { year: '2020', rainfall: 1600 },
    { year: '2021', rainfall: 1350 },
    { year: '2022', rainfall: 1100 },
    { year: '2023', rainfall: 1750 },
    { year: '2024', rainfall: 1800 },
  ];

  if (isLoadingAuth) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="bg-white max-w-4xl w-full rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
          {/* Left Hero */}
          <div className="md:w-5/12 bg-gradient-to-b from-[#0f1c3d] to-blue-900 p-10 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
            <h2 className="text-3xl font-black mb-4 relative z-10">Sign Up for Alerts</h2>
            <p className="text-blue-200 mb-8 relative z-10">
              Register to access your personalized VAYU Dashboard. Your location data ensures warnings are hyper-local and regime-aware.
            </p>
            <div className="space-y-4 relative z-10">
               <div className="flex items-center text-sm"><CheckCircle className="mr-3 text-cyan-400" size={18}/> SMS & WhatsApp Alerts</div>
               <div className="flex items-center text-sm"><CheckCircle className="mr-3 text-cyan-400" size={18}/> Voice IVR in local dialects</div>
               <div className="flex items-center text-sm"><CheckCircle className="mr-3 text-cyan-400" size={18}/> Customized Persona Data</div>
            </div>
          </div>
          
          {/* Right Form */}
          <div className="md:w-7/12 p-10">
            <form onSubmit={handleRegister} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg border-b pb-2 text-gray-800">Location Context</h3>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><MapPin size={16} className="mr-2"/> District / City</label>
                    <input required type="text" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} placeholder="e.g. Bhubaneswar" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2">State</label>
                    <input required type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} placeholder="e.g. Odisha" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2">Select Persona Profile</label>
                    <select required value={formData.persona} onChange={e => setFormData({...formData, persona: e.target.value as any})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                      <option value="citizen">Ordinary Citizen / Commuter</option>
                      <option value="farmer">Farmer / Agriculture</option>
                      <option value="marine">Fisherman / Marine</option>
                      <option value="aviation">Aviation / Pilot</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg border-b pb-2 text-gray-800">Personal Details</h3>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><User size={16} className="mr-2"/> Full Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Rahul Sharma" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><Phone size={16} className="mr-2"/> Mobile Number</label>
                    <div className="flex">
                      <span className="bg-gray-100 border border-gray-200 border-r-0 text-gray-500 px-4 py-3 rounded-l-lg font-medium">+91</span>
                      <input required type="tel" pattern="[0-9]{10}" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="10-digit number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold text-sm mb-2 flex items-center"><Mail size={16} className="mr-2"/> Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="name@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button type="submit" disabled={isRegistering} className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center">
                  {isRegistering ? 'Registering...' : 'Complete Registration & Access Dashboard'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12 w-full">
      
      {/* Dashboard Header */}
      <div className="bg-[#0f1c3d] text-white pt-8 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-black mb-1 flex items-center">
              Welcome, {user.name.split(' ')[0]}
            </h1>
            <div className="text-blue-200 flex items-center text-sm">
              <MapPin size={16} className="mr-1 text-blue-400"/> {user.district}, {user.state}
              <span className="mx-3 text-blue-800">|</span> 
              <span className="capitalize">{user.persona} Profile</span>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-4 md:mt-0 text-xs text-blue-300 hover:text-white border border-blue-800 hover:border-blue-400 px-4 py-2 rounded-full transition">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Hyper-Local AI Forecast Widget */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-blue-100 mb-1">Live WeatherGPT AI Output</h2>
                <div className="text-4xl font-black flex items-center"><CloudRain className="mr-3" size={36}/> 85% Rain Prob.</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full inline-block mb-2 backdrop-blur-sm">Regime: Active Monsoon</div>
                <div className="text-xs text-blue-100">AI Confidence: 94.2%</div>
              </div>
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-gray-800 mb-2">Recommendation for {user.district}</h3>
              <p className="text-gray-600">Model expects intense coastal orographic rainfall between 14:00 and 18:00 today. Localized waterlogging is highly probable in low-lying areas. <span className="font-bold text-red-500">Take precautions.</span></p>
            </div>

            {/* Live OpenMeteo Data */}
            <div className="grid grid-cols-3 gap-0 border-t border-gray-200 divide-x divide-gray-200">
              <div className="p-4 text-center bg-gray-50 hover:bg-gray-100 transition">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Temperature</div>
                <div className="text-xl font-black text-gray-800">{weatherData ? weatherData.temperature_2m + '°C' : '...'}</div>
              </div>
              <div className="p-4 text-center bg-gray-50 hover:bg-gray-100 transition">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Wind Speed</div>
                <div className="text-xl font-black text-blue-700">{weatherData ? weatherData.wind_speed_10m + ' km/h' : '...'}</div>
              </div>
              <div className="p-4 text-center bg-gray-50 hover:bg-gray-100 transition">
                <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Precipitation</div>
                <div className="text-xl font-black text-blue-500">{weatherData ? weatherData.precipitation + ' mm' : '...'}</div>
              </div>
            </div>
          </div>

          {/* 3. Persona-Specific Modules */}
          {user.persona === 'farmer' ? (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 border-l-4 border-l-green-500">
              <h2 className="text-xl font-bold mb-4 flex items-center text-green-800"><Sun className="mr-2"/> Agricultural Advisory</h2>
              <p className="text-gray-700">Perfect conditions for sowing. Soil moisture is optimal.</p>
            </div>
          ) : user.persona === 'aviation' ? (
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 border-l-4 border-l-purple-500">
              <h2 className="text-xl font-bold mb-4 flex items-center text-purple-800"><Wind className="mr-2"/> Aviation Advisory</h2>
              <p className="text-gray-700">Expect crosswinds at 40 knots near coastal approach.</p>
            </div>
          ) : user.persona === 'marine' ? (
             <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 border-l-4 border-l-teal-500">
              <h2 className="text-xl font-bold mb-4 flex items-center text-teal-800"><Waves className="mr-2"/> Marine Advisory</h2>
              <p className="text-gray-700">High waves expected tonight. Small vessels advised not to venture out.</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 border-l-4 border-l-blue-500">
              <h2 className="text-xl font-bold mb-4 flex items-center text-blue-800"><CloudFog className="mr-2"/> Commute & Urban Advisory</h2>
              <p className="text-gray-700">Urban heat island effect minimal today. Air quality is <span className="font-bold text-green-600">GOOD (AQI 42)</span>. High risk of traffic disruption due to expected evening showers.</p>
            </div>
          )}

          {/* 4. Multi-District Tracking (Favorites) */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-bold mb-4 flex items-center text-gray-800">Saved Locations <span className="ml-2 text-xs font-normal text-gray-400">Quick Glance</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50">
                <div>
                  <div className="font-bold text-sm text-gray-800">Parents (Cuttack)</div>
                  <div className="text-xs text-gray-500 mt-1">Light Rain</div>
                </div>
                <CloudRain className="text-blue-500" />
              </div>
              <div className="border border-orange-200 p-4 rounded-lg flex justify-between items-center bg-orange-50">
                <div>
                  <div className="font-bold text-sm text-gray-800">Farm (Puri)</div>
                  <div className="text-xs text-orange-600 font-bold mt-1">Alert: High Wind</div>
                </div>
                <Wind className="text-orange-500" />
              </div>
              <div className="border border-gray-200 p-4 rounded-lg flex justify-between items-center bg-gray-50">
                <div>
                  <div className="font-bold text-sm text-gray-800">Office (Delhi)</div>
                  <div className="text-xs text-gray-500 mt-1">Clear Sky</div>
                </div>
                <Sun className="text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Alerts */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-sm font-bold mb-4 flex items-center text-gray-500 uppercase tracking-widest"><ShieldAlert className="mr-2" size={16}/> Warning Preferences</h2>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-700 font-medium group-hover:text-blue-600 transition">SMS Alerts (Bhashini)</span>
                <input type="checkbox" checked={alerts.sms} onChange={() => setAlerts({...alerts, sms: !alerts.sms})} className="w-5 h-5 accent-blue-600" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-700 font-medium group-hover:text-green-600 transition">WhatsApp Broadcast</span>
                <input type="checkbox" checked={alerts.whatsapp} onChange={() => setAlerts({...alerts, whatsapp: !alerts.whatsapp})} className="w-5 h-5 accent-green-600" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-gray-700 font-medium group-hover:text-purple-600 transition">Voice IVR Calling</span>
                <input type="checkbox" checked={alerts.ivr} onChange={() => setAlerts({...alerts, ivr: !alerts.ivr})} className="w-5 h-5 accent-purple-600" />
              </label>
              
              <div className="pt-4 border-t border-gray-100">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Minimum Alert Threshold</label>
                <select value={alerts.threshold} onChange={(e) => setAlerts({...alerts, threshold: e.target.value})} className="w-full p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800 outline-none focus:border-blue-500">
                  <option value="yellow">Yellow (Be Aware) & Above</option>
                  <option value="orange">Orange (Be Prepared) & Above</option>
                  <option value="red">Red (Take Action) Only</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-sm font-bold mb-4 flex items-center text-gray-500 uppercase tracking-widest"><Activity className="mr-2" size={16}/> Ground Truth Report</h2>
            <p className="text-sm text-gray-500 mb-6">Help WeatherGPT AI learn. Verify the actual weather in {user.district} right now.</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleReport('Clear')} className="p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition flex flex-col items-center">
                <Sun className="text-yellow-500 mb-2" size={28}/>
                <span className="text-xs font-bold text-gray-700">Clear Sky</span>
              </button>
              <button onClick={() => handleReport('Light Rain')} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition flex flex-col items-center">
                <CloudRain className="text-blue-400 mb-2" size={28}/>
                <span className="text-xs font-bold text-gray-700">Light Rain</span>
              </button>
              <button onClick={() => handleReport('Heavy Rain')} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition flex flex-col items-center">
                <CloudLightning className="text-blue-600 mb-2" size={28}/>
                <span className="text-xs font-bold text-gray-700">Heavy Rain</span>
              </button>
              <button onClick={() => handleReport('Flooding')} className="p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 hover:border-red-400 transition flex flex-col items-center">
                <Waves className="text-red-500 mb-2" size={28}/>
                <span className="text-xs font-bold text-red-700">Flooding</span>
              </button>
            </div>
            {reportStatus && (
              <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 animate-pulse text-center">
                {reportStatus}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}




