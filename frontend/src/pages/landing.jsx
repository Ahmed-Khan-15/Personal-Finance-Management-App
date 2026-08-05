import { Link } from "react-router-dom";
import SpecularButton from "../components/SpecularButton";
import StrokeText from "../components/StrokeText";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#023b49] text-slate-100 selection:bg-[#318097] selection:text-white relative overflow-hidden flex flex-col justify-between">
      
      {/* ---------------- BACKGROUND GLOW EFFECTS ---------------- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#318097]/30 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#2d748a]/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3d718020_1px,transparent_1px),linear-gradient(to_bottom,#3d718020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      
      

      {/* ---------------- HERO SECTION ---------------- */}
<main className="container mx-auto px-6 py-12 lg:py-20 flex-1 grid gap-16 lg:grid-cols-12 items-center relative z-10">

  {/* LEFT COLUMN */}
  <div className="lg:col-span-7 flex flex-col items-start">

    <div className="w-full mb-6">
  <StrokeText
    text="Track. Analyze. Grow."
    strokeColor="#5bb8d3"
    fillColor="#ffffff"
    fontSize={40}
    letterSpacing={0}
    strokeWidth={1.2}
    drawDuration={1.2}
    fillDelay={0.2}
    trigger="mount"
    fillMode="wipe"
  />
</div>

    <p className="text-slate-300 mb-6 max-w-xl text-lg sm:text-xl leading-relaxed">
      Keep every rupee under control with a modern personal finance manager.
      Track income and expenses, organize transactions into categories,
      automate recurring payments, and understand your spending through
      beautiful dashboards and portfolio insights.
    </p>

    <div className="flex flex-wrap gap-3 mb-10">

      <span className="rounded-full bg-[#2d748a]/70 px-4 py-2 text-sm text-slate-100">
        ✓ Dashboard Overview
      </span>

      <span className="rounded-full bg-[#2d748a]/70 px-4 py-2 text-sm text-slate-100">
        ✓ Recurring Transactions
      </span>

      <span className="rounded-full bg-[#2d748a]/70 px-4 py-2 text-sm text-slate-100">
        ✓ Portfolio Analysis
      </span>

      <span className="rounded-full bg-[#2d748a]/70 px-4 py-2 text-sm text-slate-100">
        ✓ Secure Login
      </span>

    </div>

    <div className="flex flex-wrap items-center gap-4 mb-12">

      <Link to="/signup">
        <SpecularButton
          baseColor="#318097"
          textColor="#ffffff"
          size="lg"
          followMouse
        >
          Get Started
        </SpecularButton>
      </Link>

      <Link to="/login">
        <button className="px-6 py-3.5 rounded-xl border border-[#4B7B89] bg-[#2d748a]/50 hover:bg-[#2d748a] text-slate-100 font-medium transition-all duration-200 backdrop-blur-md shadow-sm">
          Sign In
        </button>
      </Link>

    </div>

  </div>

  {/* RIGHT COLUMN */}
  <div className="lg:col-span-5 relative">

    <div className="relative rounded-2xl border border-[#4B7B89] bg-[#2d748a] p-6 backdrop-blur-xl shadow-2xl shadow-black/30">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#3D7180] pb-4 mb-6">

        <div>
          <span className="text-xs text-slate-300">
            Monthly Summary
          </span>

          <div className="text-2xl font-bold text-white mt-1">
            Rs. 42,650
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Saved Rs. 12,450
        </span>

      </div>

      {/* Progress */}

      <div className="space-y-4 mb-6">

        <div className="flex justify-between text-xs text-slate-300">

          <span>Monthly Expenses</span>

          <span className="text-white">
            Rs. 28,400 / Rs. 40,000
          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-[#025165] overflow-hidden border border-[#3D7180] p-0.5">

          <div className="h-full rounded-full bg-gradient-to-r from-[#318097] to-cyan-400 w-[71%]" />

        </div>

      </div>

      {/* Recent Activity */}

      <div className="space-y-3">

        <span className="text-xs uppercase tracking-wider text-slate-300">
          Recent Activity
        </span>

        <div className="flex items-center justify-between rounded-xl border border-[#3D7180] bg-[#4ca5c775] p-3">

          <div className="flex items-center gap-3">

            

            <div>

              <div className="text-xs font-semibold text-white">
                Lunch
              </div>

              <div className="text-[10px] text-slate-200">
                Food • Today
              </div>

            </div>

          </div>

          <span className="text-red-300 font-semibold text-xs">
            -Rs. 750
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#3D7180] bg-[#4ca5c775] p-3">

          <div className="flex items-center gap-3">

            

            <div>

              <div className="text-xs font-semibold text-white">
                Salary
              </div>

              <div className="text-[10px] text-slate-200">
                Income • Yesterday
              </div>

            </div>

          </div>

          <span className="text-emerald-300 font-semibold text-xs">
            +Rs. 85,000
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#3D7180] bg-[#4ca5c775] p-3">

          <div className="flex items-center gap-3">

            

            <div>

              <div className="text-xs font-semibold text-white">
                Netflix Subscription
              </div>

              <div className="text-[10px] text-slate-200">
                Recurring • Monthly
              </div>

            </div>

          </div>

          <span className="text-red-300 font-semibold text-xs">
            -Rs. 1,100
          </span>

        </div>

      </div>

    </div>

  </div>

</main>

      {/* ---------------- FEATURE CARDS GRID ---------------- */}
      <section id="features" className="container mx-auto px-6 py-12 relative z-10 border-t border-[#3D7180]/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-5 rounded-2xl border border-[#4B7B89] bg-[#2d748a]/60 backdrop-blur-sm hover:border-cyan-400/50 transition-all group">
            
            <h3 className="text-white font-semibold text-base mb-1">Transaction Tracking</h3>
            <p className="text-slate-200 text-xs leading-relaxed">
              Categorize and monitor your daily cash flow effortlessly.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#4B7B89] bg-[#2d748a]/60 backdrop-blur-sm hover:border-cyan-400/50 transition-all group">
            
            <h3 className="text-white font-semibold text-base mb-1">Automated Bills</h3>
            <p className="text-slate-200 text-xs leading-relaxed">
              Never miss subscriptions or recurring monthly obligations.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#4B7B89] bg-[#2d748a]/60 backdrop-blur-sm hover:border-cyan-400/50 transition-all group">
            
            <h3 className="text-white font-semibold text-base mb-1">Portfolio Summary</h3>
            <p className="text-slate-200 text-xs leading-relaxed">
              Consolidate investments, cash, and debt into one clear view.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#4B7B89] bg-[#2d748a]/60 backdrop-blur-sm hover:border-cyan-400/50 transition-all group">
  
  <h3 className="text-white font-semibold text-base mb-1">
    Secure Authentication
  </h3>
  <p className="text-slate-200 text-xs leading-relaxed">
    JWT authentication and encrypted passwords keep your financial data protected.
  </p>
</div>

        </div>
      </section>

     

    </div>
  );
}