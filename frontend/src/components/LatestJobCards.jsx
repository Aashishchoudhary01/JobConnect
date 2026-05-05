import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, CalendarDays } from 'lucide-react'
import { Button } from './ui/button'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='p-5 rounded-xl shadow-lg bg-card border border-border cursor-pointer hover:border-primary/50 transition-colors group flex flex-col gap-4'>
            {/* Header: White Logo Box + Text */}
            <div className='flex items-center gap-4'>
                <div className='w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 p-2 overflow-hidden'>
                     <img src={job?.company?.logo || "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} alt="logo" className='object-contain w-full h-full' />
                </div>
                <div>
                    <h1 className='font-semibold text-white text-base leading-tight'>{job?.title}</h1>
                    <div className='flex items-center gap-2 text-xs text-gray-400 mt-1'>
                        <span>{job?.company?.name || "Company"}</span>
                        <span>•</span>
                        <span className='flex items-center gap-1'><MapPin className="w-3 h-3"/> {job?.location || "Location"}</span>
                    </div>
                </div>
            </div>

            {/* Row 1 Badges (Icons) */}
            <div className='flex items-center gap-2 mt-2 flex-wrap'>
                <Badge className='text-gray-300 font-normal bg-secondary border border-border/50 rounded-md py-1 px-2 flex items-center gap-1.5 hover:bg-secondary' variant="secondary">
                    <Briefcase className="w-3 h-3 text-gray-400"/> {job?.jobType || "Full-time"}
                </Badge>
                <Badge className='text-gray-300 font-normal bg-secondary border border-border/50 rounded-md py-1 px-2 flex items-center gap-1.5 hover:bg-secondary' variant="secondary">
                    <DollarSign className="w-3 h-3 text-gray-400"/> {job?.salary ? `${job.salary}LPA` : "$100 - $300"}
                </Badge>
                <Badge className='text-gray-300 font-normal bg-secondary border border-border/50 rounded-md py-1 px-2 flex items-center gap-1.5 hover:bg-secondary' variant="secondary">
                    <CalendarDays className="w-3 h-3 text-gray-400"/> Posted {job?.createdAt?.split("T")[0] || "4 days ago"}
                </Badge>
            </div>

            {/* Row 2 Badges (Tech Stack - text only) */}
            <div className='flex items-center gap-2 flex-wrap'>
                <Badge className='text-gray-400 font-normal bg-secondary/50 border border-transparent rounded-md hover:bg-secondary/50' variant="secondary">Tech</Badge>
                <Badge className='text-gray-400 font-normal bg-secondary/50 border border-transparent rounded-md hover:bg-secondary/50' variant="secondary">React</Badge>
                <Badge className='text-gray-400 font-normal bg-secondary/50 border border-transparent rounded-md hover:bg-secondary/50' variant="secondary">{job?.position || "1"} Pos</Badge>
            </div>

            {/* Bottom Buttons */}
            <div className='flex items-center gap-3 mt-2'>
                <Button variant="outline" className="flex-1 rounded-md border-border bg-transparent text-white hover:bg-secondary">Details</Button>
                <Button className="flex-1 rounded-md bg-primary hover:bg-primary/90 text-white">Apply</Button>
            </div>
        </div>
    )
}

export default LatestJobCards