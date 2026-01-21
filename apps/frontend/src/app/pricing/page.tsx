'use client';

import { Pricing } from '@/app/(landing)/components/Pricing';
import { Navbar } from '@/components/Navbar';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
            <Navbar />
            <div className="pt-24">
                <Pricing />
            </div>
        </div>
    );
}
