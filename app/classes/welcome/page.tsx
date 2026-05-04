'use client'
import './welcome.css'
import BackgroundImages from "@/app/components/backgroundImages/backgroundImages";
import RotatingSun from '@/app/homeComponents/rotatingSun/rotatingSun';
import { Suspense } from 'react';

export default function Welcome() {

    return (
        <div className="welcome-page">
            <BackgroundImages />
            <RotatingSun />
            <Suspense fallback={<div className="welcome-card"></div>}>
                <Welcome />
            </Suspense>
        </div>
    )
}