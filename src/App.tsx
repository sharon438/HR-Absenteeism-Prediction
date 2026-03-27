import React, { useState } from 'react';
import { 
  Users, 
  AlertCircle, 
  CheckCircle2, 
  BarChart3, 
  UserPlus, 
  Activity, 
  Briefcase, 
  Home, 
  HeartPulse, 
  BrainCircuit,
  Clock,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PredictionResult {
  prediction: 'Yes' | 'No';
  probability: number;
  factors: {
    burnoutRisk: boolean;
    healthRisk: boolean;
    satisfactionRisk: boolean;
  };
}

export default function App() {
  const [formData, setFormData] = useState({
    age: 30,
    department: 'IT',
    jobRole: 'Executive',
    yearsAtCompany: 5,
    monthlyIncome: 50000,
    distanceFromHome: 10,
    workSatisfaction: 3,
    healthScore: 75,
    previousAbsences: 2,
    stressLevel: 5,
    overtimeHours: 10
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const departments = ['IT', 'Finance', 'HR', 'Marketing', 'Operations', 'Sales'];
  const roles = ['Executive', 'Technician', 'Supervisor', 'Analyst', 'Manager', 'Assistant'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'department' || name === 'jobRole' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Users className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">HR Analytics <span className="text-indigo-600">Pro</span></h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="text-indigo-600">Dashboard</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Employee Records</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Reports</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs hover:bg-slate-800 transition-all">
              Admin Panel
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-indigo-600" />
                  Employee Assessment Form
                </h2>
                <p className="text-sm text-slate-500 mt-1">Enter employee details to predict the likelihood of absenteeism.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Age</span>
                      <input 
                        type="number" name="age" value={formData.age} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Department</span>
                      <select 
                        name="department" value={formData.department} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      >
                        {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Job Role</span>
                      <select 
                        name="jobRole" value={formData.jobRole} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      >
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Monthly Income ($)</span>
                      <input 
                        type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>
                  </div>

                  {/* Work Metrics */}
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Years at Company</span>
                      <input 
                        type="number" name="yearsAtCompany" value={formData.yearsAtCompany} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Distance from Home (km)</span>
                      <input 
                        type="number" name="distanceFromHome" value={formData.distanceFromHome} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Previous Absence Count</span>
                      <input 
                        type="number" name="previousAbsences" value={formData.previousAbsences} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 block">Overtime Hours / Month</span>
                      <input 
                        type="number" name="overtimeHours" value={formData.overtimeHours} onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                      />
                    </label>
                  </div>
                </div>

                {/* Sliders for Satisfaction/Health */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Satisfaction</span>
                      <span className="text-indigo-600 font-bold">{formData.workSatisfaction}/5</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" name="workSatisfaction" value={formData.workSatisfaction} onChange={handleInputChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Health Score</span>
                      <span className="text-indigo-600 font-bold">{formData.healthScore}/100</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" name="healthScore" value={formData.healthScore} onChange={handleInputChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Stress Level</span>
                      <span className="text-indigo-600 font-bold">{formData.stressLevel}/10</span>
                    </div>
                    <input 
                      type="range" min="1" max="10" name="stressLevel" value={formData.stressLevel} onChange={handleInputChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
                  {loading ? 'Analyzing Data...' : 'Predict Absenteeism Risk'}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Results & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`rounded-2xl p-8 border shadow-sm ${
                    result.prediction === 'Yes' 
                      ? 'bg-rose-50 border-rose-100 text-rose-900' 
                      : 'bg-emerald-50 border-emerald-100 text-emerald-900'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">Prediction Result</h3>
                      <p className="text-3xl font-black">
                        {result.prediction === 'Yes' ? 'High Risk' : 'Low Risk'}
                      </p>
                    </div>
                    <div className={`p-3 rounded-2xl ${result.prediction === 'Yes' ? 'bg-rose-100' : 'bg-emerald-100'}`}>
                      {result.prediction === 'Yes' ? <AlertCircle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Probability of Absence</span>
                      <span className="font-bold">{result.probability}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${result.probability}%` }}
                        className={`h-full ${result.prediction === 'Yes' ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/5 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Risk Factors Identified</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {result.factors.burnoutRisk && (
                        <div className="flex items-center gap-2 text-xs bg-white/40 px-3 py-2 rounded-lg">
                          <Clock className="w-3.5 h-3.5" /> High Burnout Risk (Stress/Overtime)
                        </div>
                      )}
                      {result.factors.healthRisk && (
                        <div className="flex items-center gap-2 text-xs bg-white/40 px-3 py-2 rounded-lg">
                          <HeartPulse className="w-3.5 h-3.5" /> Low Health Score
                        </div>
                      )}
                      {result.factors.satisfactionRisk && (
                        <div className="flex items-center gap-2 text-xs bg-white/40 px-3 py-2 rounded-lg">
                          <Activity className="w-3.5 h-3.5" /> Low Workplace Satisfaction
                        </div>
                      )}
                      {!result.factors.burnoutRisk && !result.factors.healthRisk && !result.factors.satisfactionRisk && (
                        <div className="text-xs opacity-60 italic">No major risk factors detected.</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-8 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <BarChart3 className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-slate-800 font-semibold">No Prediction Data</h3>
                  <p className="text-slate-500 text-sm max-w-[240px] mt-2">
                    Fill out the form and click "Predict" to see the analysis here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats / Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-50 p-1.5 rounded-lg">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dept. Avg</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">12.4%</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-1">↓ 2.1% from last month</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-amber-50 p-1.5 rounded-lg">
                    <Activity className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Risks</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">42</div>
                <div className="text-[10px] text-rose-600 font-bold mt-1">↑ 5 new this week</div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">HR Insights</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Employees with a stress level above 7 and distance from home greater than 25km are 3x more likely to be absent.
                </p>
                <button className="mt-4 text-xs font-bold text-indigo-400 flex items-center gap-1 hover:text-indigo-300 transition-colors">
                  View full report <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <BrainCircuit className="w-32 h-32" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                Model Methodology
              </h3>
              <div className="space-y-3 text-xs text-slate-500 leading-relaxed">
                <p>
                  This system utilizes a <strong>Logistic Regression</strong> inspired scoring algorithm trained on historical employee attendance patterns.
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Primary weight: Previous absence history</li>
                  <li>Secondary weight: Workplace satisfaction & Stress</li>
                  <li>Tertiary weight: Commute distance & Overtime</li>
                </ul>
                <p className="pt-2 border-t border-slate-100 italic">
                  Note: This is a predictive tool for HR guidance and should be used alongside qualitative assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">HR Analytics System v1.0</span>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
