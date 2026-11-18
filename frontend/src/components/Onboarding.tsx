import { Waves } from "lucide-react";
import { useState } from "react";

const storageKey = 'onboardingStarted';

export  default function Onboarding({onStart}: {onStart?: () => void}) {

   
    return (
        <main className="flex items-center justify-center min-h-screen bg-[#f4f6fb]">
            <section>
               <div className="relative h-[390px] overflow-hidden bg-[#4964ed]">
               <div className="absolute -right-3 -top-12 h-28 w-28 rounded-full border-[14px] border-white/10" />
               <Waves className="absolute left-[-8px] top-20 h-24 w-24 text-white/20" strokeWidth={1.4} />
               <Waves className="absolute bottom-14 right-[-4px] h-24 w-24 text-white/20" strokeWidth={1.4} />
               
               </div>
               <div className="p-7">
                <p>A little more focus</p>
                <h1 className="text-3xl font-bold">Manage What You Do</h1>
                <p className="mt-4 text-lg">The best way to manage what you have to do. Don't forget your plans.</p>
                <button onClick={onStart} className="px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Get Started</button>
               </div>
            </section>  
        </main>
    );
}