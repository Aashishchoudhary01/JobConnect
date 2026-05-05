import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-grid relative overflow-hidden min-h-[500px] flex items-center justify-center'>
            <div className="hero-glow"></div>
            <div className='flex flex-col gap-6 my-10 relative z-10 w-full'>
                <span className='mx-auto px-5 py-2 rounded-full bg-secondary/50 border border-border text-gray-300 font-medium text-sm tracking-wide'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-5xl md:text-6xl font-bold tracking-tight text-white'>
                    Search, Apply & <br /> Get Your <span className='text-primary'>Dream Job</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
                    JobConnect is a job portal that connects job seekers with the right opportunities and helps employers find top talent. Discover jobs, apply easily, and grow your career—all in one place.
                </p>
                <div className='flex w-full max-w-2xl bg-secondary/80 border border-border rounded-full items-center pl-6 pr-2 py-2 mx-auto mt-4'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent text-white placeholder:text-gray-500'
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-background/50 hover:bg-background border border-border text-gray-300 h-10 w-10 p-0 flex items-center justify-center shrink-0">
                        <Search className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection