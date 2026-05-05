import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Sun, Moon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-transparent border-b border-border/50 relative z-20'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div>
                    <h1 className='text-2xl font-bold text-white'>Job<span className='text-[#F83002]'>Connect</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-6 text-gray-300'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-white transition-colors">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-white transition-colors">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-white transition-colors">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                {/* Removed the placeholder Avatar from here */}
                                <Link to="/login"><Button variant="outline" className="rounded-md border-border bg-transparent text-white hover:bg-secondary">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-primary hover:bg-primary/90 text-white rounded-md">Signup</Button></Link>
                                <div className="flex items-center gap-2 text-gray-400 ml-2">
                                    <Sun className="h-5 w-5 cursor-pointer hover:text-white" />
                                    <Moon className="h-4 w-4 cursor-pointer hover:text-white" />
                                </div>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-card border-border">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium text-white'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-muted-foreground'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-white'>
                                                        <User2 className="w-4 h-4"/>
                                                        <Button variant="link" className="p-0 text-current"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-white mt-2'>
                                                <LogOut className="w-4 h-4"/>
                                                <Button onClick={logoutHandler} variant="link" className="p-0 text-current">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar